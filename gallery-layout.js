// The entire collection is displayed in the atrium, split across two levels.
(function(){
  CFT.ATRIUM_SCALE=1.6;
  const spots=[];
  for(const level of [0,1]) {
    for(const side of [-1,1]) for(const z of [-16,-9,-2,5,12]) spots.push({x:side*17,z,face:side<0?'+x':'-x',level});
    for(const x of level?[-8,0,8]:[-12,-4,4,12]) spots.push({x,z:-18.3,face:'+z',level});
  }
  CFT.LAYOUT.rooms=CFT.EXHIBITS.map((e,i)=>{
    const p=spots[i];e.floorLevel=p.level;e.floorName=p.level?'Upper Gallery':'Ground Gallery';e.wing=p.face==='+z'?'North':p.x<0?'West':'East';
    return {id:e.id,x0:p.x-2.5,x1:p.x+2.5,z0:p.z-2.8,z1:p.z+2.8,face:p.face,level:p.level,elevation:p.level*4.4,openGallery:true};
  });
  CFT.MUSEUM_INFO.layout='All 27 projects are displayed around the central atrium: 14 on the ground floor and 13 on the upper gallery, linked by the twin staircases.';
  CFT.MUSEUM_INFO.dimensions=CFT.MUSEUM_INFO.dimensions.map(row=>row[0]==='Central lobby'?['Central atrium','42 m square, two gallery floors']:row[0]==='Project halls'?['Project displays','14 ground floor / 13 upper gallery']:row);
  CFT.NARRATION.welcome='Welcome to the Kinetic Atrium. Explore fourteen projects on the ground floor, then take either staircase to the thirteen upper-gallery displays.';
  CFT.galleryRoute=function(from,to,world){
    const ground=world.FLOOR,upper=ground+4.4;
    const level=p=>p.y>ground+3.8?1:0;
    const segment=(a,b,l)=>{
      const y=l?upper:ground;
      const path=CFT.findWalkPath(a,b,(x,z)=>{
        const h=world.floorAt(x,z,y);
        return h!==null && Math.abs(h-y)<0.3?h:null;
      },world.HALL);
      return path?path.map(p=>({...p,y})):null;
    };
    const a=level(from),b=level(to);
    if(a===b)return segment(from,to,a)||[];
    for(const side of [from.x<0?-1:1,from.x<0?1:-1]){
      const low={x:side*11.2,z:14.7,y:ground},high={x:side*11.2,z:-0.8,y:upper};
      const first=segment(from,a?high:low,a),last=segment(b?high:low,to,b);
      if(first&&last)return [...first,a?low:high,...last.slice(1)];
    }
    return [];
  };
})();
