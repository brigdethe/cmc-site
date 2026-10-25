import variants from './image-variants.json';
import { shouldSaveData } from './data-policy.js';

export function imageSources(src, sizes = '100vw') {
 if (!src || /\.svg(?:\?|$)/i.test(src)) return {src};
 const lowData=shouldSaveData();
 let images=variants[src];
 if (!images && src.startsWith('https://ik.imagekit.io/')) {
  images=(lowData?[320,480,640]:[320,480,768,960,1440,1920]).map(width=>{
   const url=new URL(src);url.searchParams.set('tr',`w-${width},q-${lowData?65:80}`);
   return {width,src:url.href};
  });
 }
 if (!images) return {src};
 const selected=lowData?images.filter(image=>image.width<=640):images;
 const candidates=selected.length?selected:images.slice(0,1);
 return {src:candidates[0].src,srcSet:candidates.map(image=>`${image.src} ${image.width}w`).join(', '),sizes};
}
