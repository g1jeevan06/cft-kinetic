# Optimized 3D asset pipeline

The runtime is ready for production exports without changing the exhibit catalogue. Drop optimized assets into the paths in `assets/asset-manifest.json` and register them from the model loader when the source files are available.

## Export targets

1. Blender or 3ds Max: apply transforms, clean hidden geometry, create collision meshes and bake PBR maps.
2. Export GLB with Draco or Meshopt compression. Keep one named asset per exhibit in `models/optimized/`.
3. Convert large color, normal, roughness, metalness and AO maps to KTX2/Basis Universal in `assets/textures/`.
4. Export a studio HDR/EXR environment to `assets/hdr/`. The existing PMREM path turns it into a filtered environment map for reflections and image based lighting.
5. Supply LOD meshes when available. Until then, `asset-pipeline.js` applies distance based detail reduction to small meshes, frustum culling, shadow flags, mipmap filtering and anisotropy.

## Current browser behavior

`fromModel()` calls `CFT.prepareAsset()` for every loaded installation. At medium distance (22 m) tiny meshes are hidden; at low distance (34 m) the remaining small detail meshes are hidden. The existing 44 m exhibit visibility cull still prevents off-screen animation work. Models remain procedural fallbacks today because this repository does not yet contain optimized GLB, KTX2 or HDR/EXR binaries.

`RoomEnvironment` plus PMREM remains the safe local fallback, so reflective PBR materials continue to render when no HDR file has been supplied. Replacing the fallback with the approved studio HDR only requires wiring that file into the same environment setup.

## Asset checklist

- [ ] `models/optimized/*.glb` exported and reviewed in the browser
- [ ] Draco or Meshopt compression verified
- [ ] KTX2/Basis textures supplied with correct color spaces
- [ ] HDR/EXR environment supplied and PMREM generated
- [ ] LOD0/LOD1/LOD2 or source mesh groups reviewed at 10 m, 22 m and 34 m
- [ ] Collision and interaction bounds checked against the floor plan
