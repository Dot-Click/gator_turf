'use client';
import {useEffect,useRef,useState} from 'react';
import {ArrowUpRight} from 'lucide-react';
import {applications} from '@/lib/brand';

export function ApplicationShowcase(){
 const root=useRef<HTMLElement>(null);
 const [progress,setProgress]=useState(0);
 const [animated,setAnimated]=useState(false);
 useEffect(()=>{
  const motion=window.matchMedia('(prefers-reduced-motion: reduce), (max-height: 700px)');
  let frame=0;
  const update=()=>{frame=0;const el=root.current;if(!el||motion.matches)return;const stage=el.querySelector<HTMLElement>('.showcase-pin');const range=el.offsetHeight-(stage?.offsetHeight||window.innerHeight);const top=document.querySelector('.nav')?.getBoundingClientRect().height||64;setProgress(Math.max(0,Math.min(applications.length-1,(-el.getBoundingClientRect().top+top)/Math.max(1,range)*(applications.length-1))));};
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
  const preference=()=>{setAnimated(!motion.matches);schedule();};
  preference();window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);motion.addEventListener('change',preference);
  return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);motion.removeEventListener('change',preference);};
 },[]);
 const active=Math.round(progress);
 return <section ref={root} className={'application-showcase'+(animated?' is-animated':'')} aria-labelledby="applications-heading">
  <div className="showcase-pin">
   <div className="showcase-heading"><span className="section-index">03 / ENDLESS POSSIBILITIES</span><h2 id="applications-heading">Where will <span>your green go?</span></h2><p>Thoughtful surfaces for the way you live, work and play.</p></div>
   <div className="showcase-stage">
    {applications.map((app,index)=>{const distance=index-progress;const opacity=Math.max(0,Math.min(1,(0.65-Math.abs(distance))/0.4));return <article key={app.slug} className={"showcase-slide "+(index%2===0?"image-right":"image-left")} aria-hidden={animated&&active!==index} inert={animated&&active!==index} style={animated?{visibility:Math.abs(distance)>1?'hidden':'visible'}:undefined}>
     <div className="showcase-copy" style={animated?{opacity,transform:`translateY(${distance*65}px)`}:undefined}><span className="showcase-number">0{index+1} / 0{applications.length}</span><h3>{app.name}</h3><p>{app.description}</p><a className="text-link" href={'/applications/'+app.slug+'/'}>Explore this space <ArrowUpRight size={18}/></a></div>
     <div className="showcase-image" style={animated?{opacity:Math.max(0,Math.min(1,(0.95-Math.abs(distance))/0.25)),transform:`translateY(${distance*650}px) rotate(${(index%2===0?1:-1)*distance*4}deg)`}:undefined}><img src={app.image} alt={app.name} loading="lazy"/><span>{app.short}</span></div>
    </article>})}
   </div>
   <div className="showcase-progress" aria-hidden="true">{applications.map((a,i)=><span key={a.slug} className={i===active?'current':''}/>)}</div>
  </div>
 </section>
}
