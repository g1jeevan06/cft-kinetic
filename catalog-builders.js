// Bind each hall to its source model, or a plainly labelled display reservation.
(function () {
  const T = THREE, originals = Object.assign({}, CFT.EXHIBIT_BUILDERS);
  function reservation(data) {
    const group = new T.Group(), canvas = document.createElement('canvas'); canvas.width = 1024; canvas.height = 640;
    const c = canvas.getContext('2d'); c.fillStyle = '#101922'; c.fillRect(0, 0, 1024, 640);
    c.fillStyle = data.accent; c.fillRect(70, 65, 90, 7); c.font = '28px sans-serif';
    c.fillText('CRAFTECH360 / HALL '+String(data.hallNumber).padStart(2,'0'),70,145);
    let font = 66; c.font = font+'px sans-serif';
    while (c.measureText(data.name).width > 880 && font > 24) c.font = (--font)+'px sans-serif';
    c.fillStyle = '#F2F5F7'; c.fillText(data.name,70,280);
    c.font = '32px sans-serif'; c.fillStyle = '#A8B7C6'; c.fillText('MODEL COMING SOON',70,410);
    c.font = '24px sans-serif'; c.fillText('Explore the collection • Press E for project details',70,510);
    const tex = new T.CanvasTexture(canvas); tex.encoding = T.sRGBEncoding;
    const frame = new T.Mesh(new T.BoxGeometry(3.8,2.4,0.16),new T.MeshStandardMaterial({color:0x1A232E,roughness:0.65})); frame.position.y=2.1; group.add(frame);
    const face = new T.Mesh(new T.PlaneGeometry(3.6,2.25),new T.MeshBasicMaterial({map:tex})); face.position.set(0,2.1,0.09); group.add(face);
    const stem = new T.Mesh(new T.CylinderGeometry(0.07,0.1,1.0,12),frame.material); stem.position.y=0.55; group.add(stem);
    return {group,radius:2.1,size:{w:3.8,h:3.3,d:0.2},update(){},pending:true};
  }
  CFT.EXHIBITS.forEach(data => {
    CFT.EXHIBIT_BUILDERS[data.id] = options => {
      if (data.sourceId && originals[data.sourceId]) return originals[data.sourceId](options);
      if (CFT.MODELS[data.id] && CFT.buildSourceModel) return CFT.buildSourceModel(data.id, options);
      return reservation(data);
    };
  });
})();
