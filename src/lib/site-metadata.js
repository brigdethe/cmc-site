export const siteOrigin = 'https://cmc-site-peach.vercel.app';
export const sharingImage = `${siteOrigin}/media/cmc-library.jpg`;
export const pageMetadata = {
 '/': {title:'Competition & Markets Center | Ghana', description:'Competition & Markets Center is an Accra-based firm working across competition economics, law and policy.'},
 '/seminar/': {title:'Ghana Competition Law & Policy Seminar | CMC', description:'Explore the first Ghana Competition Law & Policy Seminar, held in Accra on 25 March 2026, with programme highlights, speakers and photographs.'},
 '/register/': {title:'Register Interest in the 2027 Seminar | CMC', description:'Explore attendee and sponsorship interest in the next CMC seminar. Dates and details are to be announced; the interest form is currently a preview.'},
 '/projects/british-lands-hq/': {title:'Projects | Competition & Markets Center', description:'Updates on projects from Competition & Markets Center. More information coming soon.'}
};
export function metadataFor(path){
 const key=path.startsWith('/projects')?'/projects/british-lands-hq/':path==='/'?'/':`${path.replace(/\/$/,'')}/`;
 return {...(pageMetadata[key] || pageMetadata['/']),url:siteOrigin+(pageMetadata[key]?key:'/')};
}
export function updateMetadata(path){
 const data=metadataFor(path);
 document.title=data.title;
 const set=(attribute,key,content)=>{
  let element=document.head.querySelector(`meta[${attribute}="${key}"]`);
  if(!element){element=document.createElement('meta');element.setAttribute(attribute,key);document.head.append(element);}
  element.content=content;
 };
 set('name','description',data.description);
 for(const [key,value] of Object.entries({'og:type':'website','og:site_name':'Competition & Markets Center','og:locale':'en_GH','og:title':data.title,'og:description':data.description,'og:url':data.url,'og:image':sharingImage,'og:image:alt':'Classical busts and books in a library'}))set('property',key,value);
 for(const [key,value] of Object.entries({'twitter:card':'summary_large_image','twitter:title':data.title,'twitter:description':data.description,'twitter:image':sharingImage,'twitter:image:alt':'Classical busts and books in a library'}))set('name',key,value);
 let canonical=document.head.querySelector('link[rel="canonical"]');
 if(!canonical){canonical=document.createElement('link');canonical.rel='canonical';document.head.append(canonical);}
 canonical.href=data.url;
}
