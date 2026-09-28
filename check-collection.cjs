const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const read = name => fs.readFileSync(path.join(__dirname, name), 'utf8');
const html = read('index.html');
const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m => m[1]);
scripts.forEach((s,i) => new vm.Script(s, {filename:'inline-'+i}));
const ctx = vm.createContext({}); ctx.window = ctx;
vm.runInContext(scripts.find(s => s.includes('CFT.EXHIBITS = [')), ctx);
ctx.CFT.DRAWINGS = {};
for (const f of ['catalog.js','drawing-catalog.js','navigation.js','atrium.js','gallery-layout.js']) vm.runInContext(read(f), ctx);
new vm.Script(read('catalog-builders.js'));
const c = ctx.CFT;
for(const x of [-7,7]) {
  let y=0.75;
  for(let z=9;z>=-0.1;z-=0.05) {
    const h=c.atriumHeight(x,z,y,0.75);
    assert.equal(typeof h,'number'); assert(h-y<=0.221); y=h;
  }
  assert(Math.abs(y-5.15)<0.001);
  for(let z=0;z<=9;z+=0.05) {
    const h=c.atriumHeight(x,z,y,0.75);
    assert.equal(typeof h,'number'); assert(y-h<=0.221); y=h;
  }
}
assert.equal(c.atriumHeight(10,-6,0.75,0.75),undefined,'walk beneath balcony');
assert.equal(c.atriumHeight(10,-6,5.15,0.75),5.15,'walk on balcony');
assert.equal(c.atriumHeight(5.5,-6,5.15,0.75),null,'inner railing blocks');
assert.equal(c.atriumHeight(0,-9.8,5.15,0.75),null,'back railing blocks');
assert.equal(c.EXHIBITS.length,27);
assert.equal(new Set(c.EXHIBITS.map(e => e.id)).size,27);
assert.equal(c.EXHIBITS.filter(e => e.pendingModel).length,15);
assert.equal(c.EXHIBITS[26].name,'NOVA SPIN');
assert.equal(c.EXHIBITS[11].sourceId,'tri-helix');
assert.equal(c.EXHIBITS[12].sourceId,null);
const rooms = c.LAYOUT.rooms, bounds = c.LAYOUT.building;
rooms.forEach((r,i) => {
  assert.equal(r.id,c.EXHIBITS[i].id);
  assert(r.x0>=bounds.x0 && r.x1<=bounds.x1 && r.z0>=bounds.z0 && r.z1<=bounds.z1);
  rooms.slice(i+1).filter(s=>s.level===r.level).forEach(s => assert(!(r.x0<s.x1 && r.x1>s.x0 && r.z0<s.z1 && r.z1>s.z0),'overlapping halls'));
  if(r.level){
    const x=(r.x0+r.x1)/2+(r.face==='+x'?2.2:r.face==='-x'?-2.2:0);
    const z=(r.z0+r.z1)/2+(r.face==='+z'?1.8:0);
    assert.equal(c.atriumHeight(x/1.6,z/1.6,5.15,0.75),5.15,'upper exhibit landing '+r.id);
  }
});
assert.equal(rooms.filter(r=>r.level===0).length,14);
assert.equal(rooms.filter(r=>r.level===1).length,13);
const galleryWorld={FLOOR:0.75,HALL:c.LAYOUT.promenade,floorAt(x,z,y=0.75){
  const h=c.atriumHeight(x/1.6,z/1.6,y,0.75);
  if(h===null)return null;
  for(const r of rooms)if(r.level===(y>4.55?1:0)&&Math.hypot(x-(r.x0+r.x1)/2,z-(r.z0+r.z1)/2)<1.7)return null;
  if(Math.hypot(x,z)<5.7)return null;
  return h===undefined?0.75:h;
}};
for(const r of rooms.filter(r=>r.level)){
  const to={x:(r.x0+r.x1)/2+(r.face==='+x'?2.2:r.face==='-x'?-2.2:0),z:(r.z0+r.z1)/2+(r.face==='+z'?1.8:0),y:5.15};
  assert(c.galleryRoute({x:0,z:20,y:0.75},to,galleryWorld).length>2,'stair route to '+r.id);
  assert(c.galleryRoute(to,{x:0,z:20,y:0.75},galleryWorld).length>2,'return route from '+r.id);
}
Object.values(c.DRAWING_PAGES).flat().forEach(f => assert(fs.existsSync(path.join(__dirname,f)), f));
assert(c.activityAvailable(c.EXHIBITS[12],'diagram'));
assert(!c.activityAvailable(c.EXHIBITS[26],'video'));
const area = {x0:-20,x1:20,z0:-20,z1:20};
const floor = (x,z) => Math.abs(x)>=20 || Math.abs(z)>=20 || (Math.abs(x)<2 && Math.abs(z)<9) ? null : 0;
const route = c.findWalkPath({x:-12,z:0},{x:12,z:0},floor,area);
assert(route && route.length>2,'must route around obstacle');
for(let i=1;i<route.length;i++) {
  const a=route[i-1],b=route[i],n=Math.ceil(Math.hypot(b.x-a.x,b.z-a.z)/.1);
  for(let j=0;j<=n;j++) assert.notEqual(floor(a.x+(b.x-a.x)*j/n,a.z+(b.z-a.z)*j/n),null);
}
assert.equal(c.findWalkPath({x:-12,z:0},{x:12,z:0},(x,z)=>Math.abs(x)<2?null:floor(x,z),area),null);
assert.equal(c.findWalkPath({x:-12,z:12},{x:12,z:12},floor,area).length,2);
console.log('PASS: script syntax, 27 unique halls, model aliases, drawing assets, hall bounds, eligible progress, obstacle routing, stair ascent/descent, upper landing, balcony clearance and railings.');
