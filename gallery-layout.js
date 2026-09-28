// Numbering and tier placement follow the supplied museum reference.
(function(){
  CFT.ATRIUM_SCALE=1.6;
  CFT.floorLevel=(y,floor=0.75)=>Math.max(0,Math.min(2,Math.floor((y-floor+0.38)/4.4)));
  CFT.FLOOR_NAMES=['Ground Gallery','Middle Gallery','Upper Gallery'];
  const tiers=[[2,3,4,5,23,24,25,26,27],[15,16,17,18,19,20,21,22],[6,7,8,9,10,11,12,13,14]],spots={};
  tiers.forEach((numbers,level)=>{
    numbers.slice(0,4).forEach((n,i)=>spots[n]={x:-17,z:12-i*8,face:'+x',level});
    numbers.slice(4).forEach((n,i)=>spots[n]={x:17,z:12-i*7,face:'-x',level});
  });
  spots[1]={x:0,z:0,face:'+z',level:1,central:true};
  CFT.LAYOUT.rooms=CFT.EXHIBITS.map((e,i)=>{
    const p=spots[i+1];e.floorLevel=p.level;e.floorName=CFT.FLOOR_NAMES[p.level];e.wing=p.central?'North':p.x<0?'West':'East';
    return {id:e.id,x0:p.x-(p.central?5:2.5),x1:p.x+(p.central?5:2.5),z0:p.z-(p.central?5:2.8),z1:p.z+(p.central?5:2.8),face:p.face,level:p.level,elevation:p.level*4.4,central:!!p.central,openGallery:true};
  });
  CFT.MUSEUM_INFO.layout='Three tiers surround central DNA and reception. Ground: 02–05 and 23–27. Middle: 15–22 plus central 01. Upper: 06–14. Twin stair flights connect the levels.';
  CFT.MUSEUM_INFO.dimensions=CFT.MUSEUM_INFO.dimensions.map(row=>row[0]==='Central lobby'?['Central atrium','42 m square, three gallery tiers']:row[0]==='Project halls'?['Project displays','27 across three tiers']:row);
  CFT.NARRATION.welcome='Welcome to CFT Kinetic Museum. Explore three gallery levels around the central DNA installation. Use the stairs or choose a project from the floor map.';
  CFT.galleryRoute=function(from,to,world){
    const ground=world.FLOOR,level=p=>CFT.floorLevel(p.y,ground);
    const segment=(a,b,l)=>{
      const y=ground+l*4.4;
      const path=CFT.findWalkPath(a,b,(x,z)=>{
        const h=world.floorAt(x,z,y);
        return h!==null && Math.abs(h-y)<0.3?h:null;
      },world.HALL);
      return path?path.map(p=>({...p,y})):null;
    };
    const a=level(from),b=level(to);
    if(a===b)return segment(from,to,a)||[];
    for(const side of [from.x<0?-1:1,from.x<0?1:-1]){
      const endpoints=[{x:side*11.2,z:14.7,y:ground},{x:side*11.2,z:0,y:ground+4.4},{x:side*11.2,z:-15.4,y:ground+8.8}];
      let current=from,result=[],ok=true;
      for(let l=a;l!==b;l+=Math.sign(b-a)){
        const path=segment(current,endpoints[l],l);
        if(!path){ok=false;break;}
        result.push(...path);current=endpoints[l+Math.sign(b-a)];result.push(current);
      }
      if(ok){const last=segment(current,to,b);if(last)return [...result,...last.slice(1)];}
    }
    return [];
  };
})();
