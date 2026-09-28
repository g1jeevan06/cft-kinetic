// Grid routing through the promenade; the final path is reduced to clear sightlines.
(function () {
  CFT.findWalkPath = function (start, goal, floorAt, bounds) {
    const clear = (a,b) => {
      const n = Math.ceil(Math.hypot(b.x-a.x,b.z-a.z)/0.3);
      for(let i=0;i<=n;i++) if(floorAt(a.x+(b.x-a.x)*i/Math.max(n,1),a.z+(b.z-a.z)*i/Math.max(n,1))===null) return false;
      return true;
    };
    if(clear(start,goal)) return [start,goal];
    const step=1.5, key=(x,z)=>x+','+z, point=(x,z)=>({x:x*step,z:z*step});
    const nearest = p => {
      const x=Math.round(p.x/step),z=Math.round(p.z/step),list=[];
      for(let a=-2;a<=2;a++)for(let b=-2;b<=2;b++)list.push({x:x+a,z:z+b});
      return list.sort((a,b)=>Math.hypot(a.x*step-p.x,a.z*step-p.z)-Math.hypot(b.x*step-p.x,b.z*step-p.z)).find(q=>clear(p,point(q.x,q.z)));
    };
    const s=nearest(start),g=nearest(goal); if(!s||!g)return null;
    const heap=[], records=new Map(), closed=new Set();
    const push = n => {heap.push(n); let i=heap.length-1;while(i){const p=(i-1)>>1;if(heap[p].f<=n.f)break;heap[i]=heap[p];i=p;}heap[i]=n;};
    const pop = () => {const first=heap[0],last=heap.pop();if(heap.length){let i=0;while(i*2+1<heap.length){let j=i*2+1;if(j+1<heap.length&&heap[j+1].f<heap[j].f)j++;if(heap[j].f>=last.f)break;heap[i]=heap[j];i=j;}heap[i]=last;}return first;};
    const h=(x,z)=>Math.hypot(x-g.x,z-g.z), sk=key(s.x,s.z);
    const initial={...s,g:0,f:h(s.x,s.z),parent:null};records.set(sk,initial);push(initial);
    let found=null;
    for(let count=0;heap.length&&count<16000;count++){
      const n=pop(),nk=key(n.x,n.z);if(closed.has(nk))continue;closed.add(nk);
      if(n.x===g.x&&n.z===g.z){found=n;break;}
      for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]){
        const x=n.x+dx,z=n.z+dz,p=point(x,z),k=key(x,z);
        if(closed.has(k)||p.x<=bounds.x0||p.x>=bounds.x1||p.z<=bounds.z0||p.z>=bounds.z1)continue;
        if(!clear(point(n.x,n.z),p))continue;
        const cost=n.g+Math.hypot(dx,dz),old=records.get(k);if(old&&old.g<=cost)continue;
        const next={x,z,g:cost,f:cost+h(x,z),parent:n};records.set(k,next);push(next);
      }
    }
    if(!found)return null;
    const path=[goal];for(let n=found;n;n=n.parent)path.push(point(n.x,n.z));path.push(start);path.reverse();
    const result=[start];let i=0;
    while(i<path.length-1){let j=path.length-1;while(j>i+1&&!clear(path[i],path[j]))j--;result.push(path[j]);i=j;}
    return result;
  };
})();
