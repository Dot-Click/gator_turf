import {flushSync} from 'react-dom';
import type {Product} from '@/components/catalog';
type FilterOptions=Record<string,{value:string,label:string}[]>;
type ToolContext={registerTool:(tool:{name:string,title:string,description:string,inputSchema:object,annotations:object,execute:(input:unknown)=>unknown},options:{signal:AbortSignal})=>void|Promise<void>};
export function registerCatalogTool(products:Product[],filters:FilterOptions,setSelected:(v:Record<string,string>)=>void){
const context=(document as Document&{modelContext?:ToolContext}).modelContext;
if(!context?.registerTool)return;
const lifecycle=new AbortController();
const tool={name:'filter_turf_products',title:'Filter Gator Turf products',description:'Apply product filters to the visible catalog and return the matching products. This only changes the displayed selection; it does not submit a quote or place an order.',inputSchema:{type:'object',properties:Object.fromEntries(Object.entries(filters).map(([key,opts])=>[key,{type:'string',enum:[...new Set(opts.map(o=>o.value))]}])),additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute(input:unknown){
if(!input||typeof input!=='object'||Array.isArray(input))throw new Error('Provide a filter object.');
const values={application:'all',weight:'all',space:'all',color:'all'} as Record<string,string>;
for(const [key,value] of Object.entries(input)){if(!filters[key]||typeof value!=='string'||!filters[key].some(o=>o.value===value))throw new Error('Invalid product filter: '+key);values[key]=value;}
const matches=products.filter(p=>Object.values(values).every(v=>v==='all'||p.tags.includes(v)));
flushSync(()=>setSelected(values));
return {filters:values,count:matches.length,products:matches.map(p=>({name:p.title,path:p.path}))};
}};
try{void Promise.resolve(context.registerTool(tool,{signal:lifecycle.signal})).catch(()=>{});}catch{}
return ()=>lifecycle.abort();
}
