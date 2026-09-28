// Reference-inspired double-height atrium. Dimensions are in metres.
(function () {
  CFT.buildReferenceAtrium = function (A,M,D,scene,world,T,Geo,FLOOR,TOP,canvasTexture,sign,FONT,plant) {
    const upper=FLOOR+4.4, roof=FLOOR+12.5;
    const metal=new T.MeshStandardMaterial({color:0x26343D,roughness:0.34,metalness:0.7});
    const stone=new T.MeshStandardMaterial({color:0xA9B4B9,roughness:0.35,metalness:0.2});
    const dark=new T.MeshStandardMaterial({color:0x101E28,roughness:0.44,metalness:0.3});
    const glass=new T.MeshStandardMaterial({color:0x63B9DC,transparent:true,opacity:0.2,roughness:0.1,metalness:0.1,side:T.DoubleSide,depthWrite:false});
    const blue=new T.MeshBasicMaterial({color:0x49CFFF});
    const warm=new T.MeshBasicMaterial({color:0xFFE0A8});
    warm.toneMapped=false;blue.toneMapped=false;
    const box=(m,w,h,d,x,y,z)=>A.box(m,w,h,d,x,y,z);
    const rail=(x1,z1,x2,z2,y)=>{
      const len=Math.hypot(x2-x1,z2-z1),angle=Math.atan2(x2-x1,z2-z1);
      A.box(glass,0.045,1.03,len,(x1+x2)/2,y+0.57,(z1+z2)/2,angle);
      A.box(metal,0.08,0.07,len,(x1+x2)/2,y+1.13,(z1+z2)/2,angle);
      const n=Math.ceil(len/1.7);
      for(let i=0;i<=n;i++)box(metal,0.065,1.14,0.065,x1+(x2-x1)*i/n,y+0.57,z1+(z2-z1)*i/n);
    };
    box(dark,26.3,0.025,26.3,0,FLOOR+0.015,0);
    for(let x=-12;x<=12;x+=2)for(let z=-12;z<=12;z+=2)
      box(stone,1.96,0.015,1.96,x,FLOOR+0.032,z);
    // U-shaped upper gallery, open at the entrance.
    [-1,1].forEach(s=>{
      box(metal,7.5,0.3,13,s*9.15,upper-0.15,-6.5);
      box(stone,7.5,0.04,13,s*9.15,upper+0.02,-6.5);
      box(metal,4.25,0.3,10,s*10.775,upper-0.15,5);
      box(stone,4.25,0.04,10,s*10.775,upper+0.02,5);
      rail(s*8.65,0,s*8.65,10,upper);rail(s*8.65,10,s*12.85,10,upper);
      box(warm,7.4,0.035,0.06,s*9.15,upper-0.22,0.04);
      rail(s*5.4,-9.8,s*5.4,0,upper);
      rail(s*12.85,-12.8,s*12.85,10,upper);
      rail(s*5.4,0,s*5.75,0,upper);rail(s*8.25,0,s*8.65,0,upper);
      // Twin broad staircases, twenty illuminated treads.
      for(let i=0;i<20;i++){
        const h=(i+1)*0.22,z=9-(i+0.5)*0.45;
        box(metal,2.5,h,0.45,s*7,FLOOR+h/2,z);
        box(stone,2.5,0.035,0.44,s*7,FLOOR+h+0.018,z);
        box(warm,2.3,0.025,0.035,s*7,FLOOR+h, z+0.22);
      }
      [s*5.75,s*8.25].forEach(x=>{
        for(let i=0;i<10;i++){
          const z=9-i*0.9,y=FLOOR+i*0.44;
          box(metal,0.06,1.1,0.06,x,y+0.55,z);
        }
        const curve=new T.LineCurve3(new T.Vector3(x,FLOOR+1.12,9),new T.Vector3(x,upper+1.12,0));
        A.add(new T.TubeGeometry(curve,1,0.045,8),metal,0,0,0);
      });
      [1.2,3.2,5.2,7.2].forEach(z=>{
        const h=(9-z)/9*4.4;
        box(dark,0.045,Math.max(0.3,h-0.3),1.6,s*5.73,FLOOR+h/2,z);
        box(warm,0.055,Math.max(0.2,h-0.65),0.06,s*5.70,FLOOR+h/2,z+0.58);
      });
      // Two-storey wall bays, with portals into the ground-floor promenade.
      [-11,-5,1,7].forEach(z=>{
        box(metal,0.48,12.5,0.5,s*12.9,FLOOR+6.25,z);
        box(warm,0.04,3.3,0.065,s*12.64,FLOOR+2,z);
        box(warm,0.04,3.0,0.065,s*12.64,upper+2,z);
      });
      box(metal,0.45,0.5,26,s*13,upper+3.9,0);
      box(warm,0.06,0.045,25.8,s*12.72,upper+3.62,0);
      plant(A,M,s*4.4,-8.5,FLOOR);
    });
    box(metal,10.8,0.3,3.2,0,upper-0.15,-11.4);
    box(stone,10.8,0.04,3.2,0,upper+0.02,-11.4);
    rail(-5.4,-9.8,5.4,-9.8,upper);rail(-12.85,-12.85,12.85,-12.85,upper);
    // Roof: octagonal luminous coffers, a blue glass skylight and structural grid.
    [-10.8,10.8].forEach(v=>{
      box(metal,4.8,0.22,26.4,v,roof,0);
      box(metal,16.8,0.22,4.8,0,roof,v);
    });
    const skylight=new T.Mesh(new T.CircleGeometry(8.9,8),glass);
    skylight.rotation.x=-Math.PI/2;skylight.position.y=roof+0.14;scene.add(skylight);
    [9.0,10.7,12.0].forEach((r,j)=>{
      const ring=new T.Mesh(new T.RingGeometry(r,r+0.16,8),j===1?warm:metal);
      ring.rotation.x=Math.PI/2;ring.position.y=roof-0.28-j*0.13;scene.add(ring);
    });
    for(let v=-6;v<=6;v+=3){
      const len=2*Math.sqrt(8.4*8.4-v*v);
      box(metal,0.1,0.17,len,v,roof-0.3,0);box(metal,len,0.17,0.1,0,roof-0.3,v);
    }
    // Dark clerestory walls enclose the former roof opening.
    [-13.1,13.1].forEach(v=>{
      box(metal,0.25,roof-TOP,26.4,v,(roof+TOP)/2,0);
      box(metal,26.4,roof-TOP,0.25,0,(roof+TOP)/2,v);
    });
    // Layered ceiling edges and inset service panels give the tall walls scale.
    [8.2,11.5].forEach(h=>{
      box(metal,25.8,0.24,0.45,0,FLOOR+h,-12.8);
      box(warm,25.6,0.04,0.07,0,FLOOR+h-0.15,-12.54);
      [-12.8,12.8].forEach(x=>{
        box(metal,0.45,0.24,25.8,x,FLOOR+h,0);
        box(warm,0.07,0.04,25.6,x-Math.sign(x)*0.27,FLOOR+h-0.15,0);
      });
    });
    for(let x=-12;x<=12;x+=3){
      box(dark,2.7,2.3,0.07,x,FLOOR+9.85,-12.92);
      box(metal,0.22,3,0.25,x-1.3,FLOOR+9.8,-12.72);
      box(warm,0.055,1.7,0.045,x-1.12,FLOOR+9.85,-12.56);
    }
    // Repeated wall panels, recessed blue windows and warm vertical light strips.
    const inset=new T.MeshBasicMaterial({color:0x102535});
    for(let x=-12;x<=12;x+=3){
      box(inset,2.7,3.5,0.08,x,upper+2.05,-12.95);
      box(metal,0.15,3.65,0.18,x-1.35,upper+2.05,-12.8);
      box(warm,0.045,2.8,0.04,x-1.22,upper+2.05,-12.67);
      box(blue,1.9,0.045,0.04,x,upper+0.45,-12.67);
      box(metal,2.3,0.12,0.16,x,upper+3.1,-12.7);
    }
    // Low octagonal directory island keeps the architectural sightline open.
    A.add(new T.CylinderGeometry(3.0,3.25,0.24,8),metal,0,FLOOR+0.12,0);
    A.add(new T.CylinderGeometry(2.9,2.9,0.035,8),dark,0,FLOOR+0.255,0);
    A.add(new T.TorusGeometry(2.9,0.035,6,8),blue,0,FLOOR+0.28,0,0,Math.PI/2);
    box(metal,1.6,0.9,0.7,0,FLOOR+0.7,1.3);
    box(blue,1.45,0.035,0.6,0,FLOOR+1.16,1.3);
    world.colliders.push({x:0,z:0,r:3.3});
    world.kiosks.push({id:'desk',label:'Atrium Directory',verb:'Choose your route',pos:new T.Vector3(0,FLOOR+1,1.3),radius:5.8});
    // Transparent elevator display, offset so the main entrance remains clear.
    const ex=-11.2,ez=11.8;
    A.add(new T.CylinderGeometry(1.45,1.45,8.4,40,1,true),glass,ex,FLOOR+4.2,ez);
    [0.15,4.4,8.3].forEach(h=>{
      A.add(new T.CylinderGeometry(1.5,1.5,0.12,40),metal,ex,FLOOR+h,ez);
      A.add(new T.TorusGeometry(1.44,0.035,8,64),blue,ex,FLOOR+h+0.08,ez,0,Math.PI/2);
    });
    for(let i=0;i<8;i++){
      const a=i*Math.PI/4;box(metal,0.06,8.5,0.06,ex+Math.sin(a)*1.46,FLOOR+4.25,ez+Math.cos(a)*1.46);
    }
    world.colliders.push({x:ex,z:ez,r:1.6});
    const tex=canvasTexture(1536,256,(c,w,h)=>{
      c.fillStyle='#101E28';c.fillRect(0,0,w,h);c.fillStyle='#F2F4F5';
      c.font=`78px ${FONT.display}`;c.fillText('CFT / KINETIC ATRIUM',65,112);
      c.fillStyle='#BDE8FF';c.font=`32px ${FONT.mono}`;c.fillText('27 PROJECTS    /    EXPLORE · LEARN · EXPERIENCE',65,201);
    });
    const label=sign(9,1.5,tex,true);label.position.set(0,upper+2.3,-12.6);scene.add(label);
    [-9,9].forEach(x=>[-8,6].forEach(z=>world.anchors.push({pos:new T.Vector3(x,FLOOR+6,z),color:new T.Color(0xFFE0B0),base:0.65,range:12})));
    world.anchors.push({pos:new T.Vector3(0,roof-1,0),color:new T.Color(0x8DCEFF),base:0.8,range:21});
  };
  // Stairs are solid; balconies can be walked underneath at ground level.
  CFT.atriumHeight = function(x,z,y,floor) {
    const ax=Math.abs(x),up=floor+4.4;
    if(y>floor+0.38 && z>0 && z<9 && ((ax>5.4 && ax<=5.75)||(ax>=8.25 && ax<8.6)))return null;
    if(ax>5.75 && ax<8.25 && z>=0 && z<=9) return floor+Math.min(20,Math.floor((9-z)/0.45)+1)*0.22;
    if(y<up-0.38)return undefined;
    if(ax>=9 && ax<=12.55 && z>=-0.4 && z<0)return up;
    if(z>=0 && z<10.35 && ax>8.25 && ax<13.25){
      if(ax<9.0 || ax>12.55 || z>9.65)return null;
      return up;
    }
    if(ax>5.75 && ax<8.25 && z<0 && z> -0.4)return up;
    if(ax<13.25 && z>-13.25 && z<0.4){
      if(ax>12.55 || z< -12.55)return null;
      if(z< -10.15 || (ax>5.75 && z< -0.35))return up;
      if(ax<5.75 && z< -9.45)return null;
      if(ax>5.05 && ax<5.75)return null;
      if(ax>8.25 && z> -0.35)return null;
    }
    return undefined;
  };
})();
