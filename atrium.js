// Reference-inspired double-height atrium. Dimensions are in metres.
(function () {
  CFT.buildReferenceAtrium = function (A,M,D,scene,world,T,Geo,FLOOR,TOP,canvasTexture,sign,FONT,plant) {
    const upper=FLOOR+4.4, crown=FLOOR+8.8, roof=FLOOR+17;
    const metal=new T.MeshStandardMaterial({color:0x101820,roughness:0.24,metalness:0.82});
    const stone=new T.MeshStandardMaterial({color:0x344653,roughness:0.19,metalness:0.65});
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
      box(stone,7.0,0.04,0.8,s*9.0,upper+0.02,0);
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
    // Third tier: stairwells remain open; the outer gallery stays continuous.
    [-1,1].forEach(s=>{
      box(metal,4.65,0.3,13,s*10.575,crown-0.15,-6.5);
      box(stone,4.65,0.04,13,s*10.575,crown+0.02,-6.5);
      box(metal,2.85,0.3,4,s*6.825,crown-0.15,-11);
      box(stone,2.85,0.04,4,s*6.825,crown+0.02,-11);
      box(metal,4.25,0.3,10,s*10.775,crown-0.15,5);
      box(stone,4.25,0.04,10,s*10.775,crown+0.02,5);
      rail(s*8.65,0,s*8.65,10,crown);rail(s*8.65,10,s*12.85,10,crown);
      rail(s*8.25,-9,s*8.25,0,crown);rail(s*5.4,-12.8,s*5.4,-9,crown);
      rail(s*12.85,-12.8,s*12.85,10,crown);
      for(let i=0;i<20;i++){
        const h=(i+1)*0.22,z=-0.4-(i+0.5)*0.45;
        box(metal,2.5,h,0.45,s*7,upper+h/2,z);
        box(stone,2.5,0.035,0.44,s*7,upper+h+0.018,z);
        box(warm,2.3,0.025,0.035,s*7,upper+h,z+0.22);
      }
      [s*5.75,s*8.25].forEach(x=>{
        for(let i=0;i<=10;i++)box(metal,0.06,1.1,0.06,x,upper+i*0.44+0.55,-i*0.9);
        const line=new T.LineCurve3(new T.Vector3(x,upper+1.12,0),new T.Vector3(x,crown+1.12,-9));
        A.add(new T.TubeGeometry(line,1,0.045,8),metal,0,0,0);
      });
      // Middle-tier bridge to the DNA podium, accessible from either stair landing.
      box(metal,2.3,0.25,2.0,s*4.6,upper-0.125,0);
      box(stone,2.3,0.025,2.0,s*4.6,upper+0.01,0);
      rail(s*3.5,1,s*5.75,1,upper);rail(s*3.5,-1,s*5.75,-1,upper);
      for(const y of [upper,crown]){
        box(warm,0.07,0.045,22.5,s*8.6,y-0.12,-1.5);
        box(metal,0.36,16.7,0.38,s*12.95,FLOOR+8.35,-5);
        box(blue,0.045,3.0,0.04,s*12.7,y+1.8,-5);
      }
    });
    box(metal,10.8,0.3,3.2,0,crown-0.15,-11.4);
    box(stone,10.8,0.04,3.2,0,crown+0.02,-11.4);
    rail(-5.4,-9.8,5.4,-9.8,crown);rail(-12.85,-12.85,12.85,-12.85,crown);
    box(warm,25.6,0.05,0.08,0,crown-0.14,-9.8);
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
    // Reception below the raised DNA podium; gold light ribbons frame the real model.
    A.add(new T.CylinderGeometry(3.45,3.45,0.28,64),metal,0,upper-0.14,0);
    A.add(new T.TorusGeometry(3.42,0.045,8,100),warm,0,upper+0.025,0,0,Math.PI/2);
    for(let i=0;i<32;i++){
      const a=i/32*Math.PI*2,b=(i+1)/32*Math.PI*2;
      if(Math.abs(Math.cos((a+b)/2))<0.35)continue;
      rail(Math.sin(a)*3.35,Math.cos(a)*3.35,Math.sin(b)*3.35,Math.cos(b)*3.35,upper);
    }
    A.add(new T.CylinderGeometry(2.8,2.9,3.6,64),dark,0,FLOOR+1.8,0);
    A.add(new T.CylinderGeometry(3.2,3.2,1.05,64,1,true,0,Math.PI),metal,0,FLOOR+0.55,0);
    [0.12,1.08].forEach(h=>A.add(new T.TorusGeometry(3.22,0.04,8,64,Math.PI),warm,0,FLOOR+h,0,0,Math.PI/2));
    const brand=canvasTexture(1024,320,(c,w,h)=>{c.fillStyle='#08111A';c.fillRect(0,0,w,h);c.fillStyle='#FFFFFF';c.textAlign='center';c.font=`bold 145px ${FONT.display}`;c.fillText('CFT',w/2,150);c.font=`38px ${FONT.mono}`;c.fillText('KINETIC MUSEUM',w/2,230);});
    const reception=sign(3.8,1.18,brand,true);reception.position.set(0,FLOOR+2.3,2.88);scene.add(reception);
    const crownLogo=sign(6.8,2.12,brand,true);crownLogo.position.set(0,roof-2.0,0.4);scene.add(crownLogo);
    [3.0,4.7,6.6].forEach((r,i)=>{
      A.add(new T.TorusGeometry(r,0.13,12,96),metal,0,roof-0.65-i*0.15,0,0,Math.PI/2);
      A.add(new T.TorusGeometry(r-0.05,0.045,8,96),warm,0,roof-0.8-i*0.15,0,0,Math.PI/2);
    });
    for(let i=0;i<20;i++){
      const a=i*Math.PI/10,x=Math.sin(a)*2.2,z=Math.cos(a)*2.2;
      box(metal,0.014,10.6,0.014,x,upper+5.5,z);
      for(let j=0;j<8;j++)A.add(new T.SphereGeometry(0.035,6,4),j%2?warm:blue,x,upper+0.7+j*1.35,z);
    }
    for(let side=0;side<2;side++){
      const pts=[];
      for(let i=0;i<=160;i++){const t=i/160,a=t*Math.PI*6+side*Math.PI;pts.push(new T.Vector3(Math.sin(a)*1.8,upper+0.4+t*9.5,Math.cos(a)*1.8));}
      A.add(new T.TubeGeometry(new T.CatmullRomCurve3(pts),160,0.10,8),warm,0,0,0);
    }
    world.colliders.push({x:0,z:0,r:3.3,level:0});
    world.kiosks.push({id:'desk',label:'Reception / choose your route',verb:'Explore',pos:new T.Vector3(0,FLOOR+1,3.5),radius:2.5});
    const mapTex=canvasTexture(1024,1024,(c,w,h)=>{
      c.fillStyle='#051526';c.fillRect(0,0,w,h);c.strokeStyle='#174365';c.lineWidth=1;
      for(let i=0;i<32;i++){c.beginPath();c.moveTo(i*32,0);c.lineTo(i*32,h);c.moveTo(0,i*32);c.lineTo(w,i*32);c.stroke();}
      c.strokeStyle='#7BCBFA';c.lineWidth=3;c.strokeRect(200,225,624,565);
      CFT.LAYOUT.rooms.forEach((r,i)=>{if(r.central)return;const x=512+(r.x0+r.x1)*7,z=510+(r.z0+r.z1)*7;c.strokeRect(x-22,z-22,44,44);});
      c.fillStyle='#FFFFFF';c.textAlign='center';c.font=`48px ${FONT.display}`;c.fillText('MUSEUM MAP',512,170);
      c.font=`28px ${FONT.mono}`;c.fillText('27 PROJECTS / THREE GALLERIES',512,865);
      c.fillStyle='#FFD27C';c.beginPath();c.arc(512,745,12,0,Math.PI*2);c.fill();c.font=`24px ${FONT.mono}`;c.fillText('YOU ARE HERE',512,792);
    });
    const mapDisc=new T.Mesh(new T.CircleGeometry(3.7,80),new T.MeshBasicMaterial({map:mapTex}));mapDisc.rotation.x=-Math.PI/2;mapDisc.position.set(0,FLOOR+0.06,10.5);scene.add(mapDisc);
    [3.8,4.0].forEach(r=>A.add(new T.TorusGeometry(r,0.025,8,96),r<4?blue:warm,0,FLOOR+0.07,10.5,0,Math.PI/2));
    world.kiosks.push({id:'map',label:'Museum floor map',verb:'Open map',pos:new T.Vector3(0,FLOOR+0.5,10.5),radius:3.8});
    // Compact palms soften the metal balconies without hiding their exhibit signs.
    const foliage=new T.MeshStandardMaterial({color:0x265536,roughness:0.83,side:T.DoubleSide});
    for(const h of [0,4.4,8.8])for(const x of [-11.8,11.8])for(const z of [-11.8,9.3]){
      A.add(new T.CylinderGeometry(0.32,0.26,0.6,16),metal,x,FLOOR+h+0.3,z);
      A.add(new T.CylinderGeometry(0.045,0.09,1.5,8),M.bark,x,FLOOR+h+1.05,z);
      for(let k=0;k<10;k++){
        const leaf=new T.Shape();leaf.moveTo(0,0);leaf.quadraticCurveTo(0.3,0.45,0,1.35);leaf.quadraticCurveTo(-0.3,0.55,0,0);
        const geo=new T.ShapeGeometry(leaf,8);geo.rotateX(-0.8-(k%3)*0.23);geo.rotateY(k*Math.PI/5);
        A.add(geo,foliage,x,FLOOR+h+1.7,z);
      }
    }
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
    const ax=Math.abs(x),mid=floor+4.4,top=floor+8.8;
    if(y>=mid-0.38 && Math.hypot(x,z)>3.08 && Math.hypot(x,z)<3.7 && Math.abs(z)>1.1)return null;
    // The reception is below a middle-level podium and its two connecting bridges.
    if(y>=mid-0.38 && Math.hypot(x,z)<3.45)return mid;
    if(y>=mid-0.38 && ax>=3.4 && ax<5.8 && Math.abs(z)<0.78)return mid;
    if(y>=mid-0.38 && ax>=3.4 && ax<5.8 && Math.abs(z)<1.15)return null;
    if(y>=mid-0.38 && y<top-0.38 && ax>5.5 && ax<12.55 && Math.abs(z)<=0.4)return mid;
    if(y>floor+0.38 && z>0.4 && z<9 && ((ax>5.4 && ax<=5.75)||(ax>=8.25 && ax<8.6)))return null;
    if(ax>5.75 && ax<8.25 && z>=0 && z<=9)return floor+Math.min(20,Math.floor((9-z)/0.45)+1)*0.22;
    if(y>=mid-0.38 && ax>5.75 && ax<8.25 && z< -0.4 && z>=-9.4)return mid+Math.min(20,Math.floor((-z-0.4)/0.45)+1)*0.22;
    if(y>=mid-0.38 && z< -0.4 && z> -9.4 && ((ax>5.4&&ax<=5.75)||(ax>=8.25&&ax<8.6)))return null;
    if(y<mid-0.38)return undefined;
    const deck=y>=top-0.38?top:mid;
    if(ax>=9 && ax<=12.55 && z>=-0.4 && z<0)return deck;
    if(z>=0 && z<10.35 && ax>8.25 && ax<13.25){
      if(ax<9.0||ax>12.55||z>9.65)return null;
      return deck;
    }
    if(ax<13.25 && z>-13.25 && z<0.4){
      if(ax>12.55 || z< -12.55)return null;
      if(z< -10.15 || (ax>8.6 && z< -0.35) || (ax>5.75 && z<=-9.4))return deck;
      if(ax<5.75 && z< -9.45)return null;
      if(ax>5.05 && ax<5.75)return null;
    }
    return undefined;
  };
})();
