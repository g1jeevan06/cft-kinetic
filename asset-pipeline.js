// CFT Kinetic asset runtime: lightweight LOD, texture-quality and PBR preparation.
// Source GLB/KTX2/HDR files can be dropped in later without changing the exhibit system.
(function () {
  const CFT = window.CFT = window.CFT || {};
  const stats = root => {
    let triangles = 0, meshes = 0;
    root.traverse(o => {
      if (!o.isMesh) return;
      meshes++;
      const index = o.geometry && o.geometry.index;
      triangles += index ? index.count / 3 : (o.geometry && o.geometry.attributes.position ? o.geometry.attributes.position.count / 3 : 0);
    });
    return { meshes, triangles: Math.round(triangles) };
  };
  const setTextureQuality = (texture, maxAnisotropy) => {
    if (!texture || !texture.isTexture) return;
    texture.anisotropy = Math.min(maxAnisotropy || 8, texture.anisotropy || maxAnisotropy || 8);
    if (texture.generateMipmaps !== false) texture.minFilter = 1008; // LinearMipmapLinearFilter
    texture.magFilter = 1006; // LinearFilter
    texture.needsUpdate = true;
  };
  CFT.ASSET_PIPELINE = {
    version: 1,
    paths: { models: 'models/optimized/', textures: 'assets/textures/', hdr: 'assets/hdr/' },
    formats: { model: 'GLB + Meshopt/Draco', texture: 'KTX2/Basis Universal', environment: 'HDR/EXR + PMREM' },
    notes: 'The runtime falls back to the current procedural models and RoomEnvironment when optimized source assets are absent.'
  };
  CFT.prepareAsset = function (root, THREE, options) {
    if (!root || root.userData.cftAssetPrepared) return root && root.userData.cftAssetRuntime;
    const o = Object.assign({ maxAnisotropy: 8, mediumDistance: 22, lowDistance: 34 }, options);
    const meshes = [], medium = [], low = [];
    root.traverse(node => {
      if (!node.isMesh) return;
      node.frustumCulled = true;
      node.castShadow = node.receiveShadow = true;
      meshes.push(node);
      const materialList = Array.isArray(node.material) ? node.material : [node.material];
      materialList.forEach(material => {
        if (!material) return;
        ['map', 'normalMap', 'roughnessMap', 'metalnessMap', 'aoMap', 'emissiveMap'].forEach(k => setTextureQuality(material[k], o.maxAnisotropy));
      });
      const index = node.geometry && node.geometry.index;
      const triangles = index ? index.count / 3 : (node.geometry && node.geometry.attributes.position ? node.geometry.attributes.position.count / 3 : 0);
      // Tiny screws, cables and decorative fragments are the first safe details to drop at distance.
      if (triangles < 180) medium.push(node);
      if (triangles < 520) low.push(node);
    });
    const original = new Map(meshes.map(node => [node, node.visible]));
    let current = 'high';
    const apply = distance => {
      const next = distance >= o.lowDistance ? 'low' : distance >= o.mediumDistance ? 'medium' : 'high';
      if (next === current) return;
      current = next;
      meshes.forEach(node => node.visible = original.get(node));
      if (next === 'medium') medium.forEach(node => { node.visible = false; });
      if (next === 'low') low.forEach(node => { node.visible = false; });
    };
    const runtime = { stats: stats(root), meshes, apply, get level() { return current; } };
    root.userData.cftAssetPrepared = true;
    root.userData.cftAssetRuntime = runtime;
    return runtime;
  };
})();
