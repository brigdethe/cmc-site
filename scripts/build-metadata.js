import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {pageMetadata,metadataFor,sharingImage} from '../src/lib/site-metadata.js';
const escape=value=>value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const template=await readFile('dist/index.html','utf8');
for(const path of [...Object.keys(pageMetadata),'/projects/']){
 const data=metadataFor(path);
 const tags=[['name','description',data.description],['property','og:type','website'],['property','og:site_name','Competition & Markets Center'],['property','og:locale','en_GH'],['property','og:title',data.title],['property','og:description',data.description],['property','og:url',data.url],['property','og:image',sharingImage],['property','og:image:alt','Classical busts and books in a library'],['name','twitter:card','summary_large_image'],['name','twitter:title',data.title],['name','twitter:description',data.description],['name','twitter:image',sharingImage],['name','twitter:image:alt','Classical busts and books in a library']].map(([attribute,key,value])=>`<meta ${attribute}="${key}" content="${escape(value)}"/>`).join('');
 const html=template.replace(/<title>.*?<\/title>/s,`<title>${escape(data.title)}</title>`).replace(/<meta name="description"[^>]*\/>/,'').replace('</head>',`${tags}<link rel="canonical" href="${data.url}"/></head>`);
 const directory=`dist${path==='/'?'':path.replace(/\/$/,'')}`;
 await mkdir(directory,{recursive:true});
 await writeFile(`${directory}/index.html`,html);
}
