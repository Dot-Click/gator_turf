'use client';
import {useRef,useState} from 'react';
type TurfProduct={title:string;path:string;image:string;weight:string};
const descriptions=[
 'A soft, versatile finish for lawns, pets and everyday play. Field green and lime green fibers bring a fresh, natural feel to your space.',
 'A fuller, lush finish with field green and olive green tones. Designed for comfortable lawns, pet spaces and active outdoor living.',
 'Rich green tones and a generous two-inch pile create a soft, inviting surface for lawns, pets and spaces made for play.'
];
export function TurfSelector({products}:{products:TurfProduct[]}){
 const [selected,setSelected]=useState(0);
 const [phase,setPhase]=useState<'idle'|'out'|'in'>('idle');
 const next=useRef(0);
 const product=products[selected];
 function choose(index:number){
  if(index===selected&&phase==='idle')return;
  next.current=index;setPhase('out');
 }
 function finish(){if(phase==='out'){setSelected(next.current);setPhase('in')}else if(phase==='in')setPhase('idle')}
 return <section id="turf-collection" className="selection-section turf-selection"><div className="container section">
  <div className="center-heading"><span className="section-index">02 / FIND YOUR GREEN</span><h2>A feel for every space.</h2><p>Explore the textures and tones of our turf collection.</p></div>
  <div className="turf-selector">
   <div className="turf-roll-scene" aria-hidden="true">
    <div className={'turf-roll-motion phase-'+phase+' roll-tone-'+selected} onAnimationEnd={e=>{if(e.target===e.currentTarget)finish()}}><img src="/assets/turf-roll.png" alt="" loading="lazy"/></div>
    <div className={'turf-texture phase-'+phase}><img src={product.image} alt=""/><span>{product.weight} · {product.title}</span></div>
   </div>
   <div className="turf-numbers" role="group" aria-label="Choose a turf product">{products.map((p,i)=><button key={p.path} type="button" aria-label={'Show '+p.title} aria-pressed={i===selected} onClick={()=>choose(i)}><span>0{i+1}</span><span className="number-line"/></button>)}</div>
   <div className={'turf-product-details phase-'+phase} aria-live="polite" aria-atomic="true">
    <span className="eyebrow">THE TURF COLLECTION / 0{selected+1}</span><h3>{product.title}</h3><p>{descriptions[selected]}</p>
    <dl className="turf-specs"><div><dt>Weight</dt><dd>{product.weight}</dd></div><div><dt>Pile height</dt><dd>{['1½ inches','1¾ inches','2 inches'][selected]}</dd></div><div><dt>Available widths</dt><dd>5 ft & 15 ft</dd></div></dl>
    <div className="turf-ctas"><a className="button" href={product.path}>Discover turf</a><a className="text-link" href={'/contact/?product='+encodeURIComponent(product.title)}>Get a sample</a></div>
   </div>
  </div>
  <div className="collection-footer"><span>One collection. So many ways to make it yours.</span><a className="text-link" href="/products-gator-turf/">Explore all 17 products</a></div>
 </div></section>
}
