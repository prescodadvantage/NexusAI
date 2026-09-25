'use strict';
// Keep visible editorial copy free of dash punctuation. Code, URLs and form values are untouched.
(()=>{
 const clean=s=>s.replace(/\s*[\u2013\u2014]\s*/g,', ').replace(/\s+-\s+/g,', ').replace(/([A-Za-z])[-\u2011]([A-Za-z])/g,'$1 $2');
 function visit(node){
  if(node.nodeType===3){if(node.parentElement?.closest('script,style,code,pre,textarea,input,svg'))return;const value=clean(node.nodeValue);if(value!==node.nodeValue)node.nodeValue=value;return;}
  if(node.nodeType!==1)return;
  for(const key of ['title','aria-label','placeholder','alt'])if(node.hasAttribute(key)){const old=node.getAttribute(key),value=clean(old);if(value!==old)node.setAttribute(key,value);}
  node.childNodes.forEach(visit);
 }
 const start=()=>{visit(document.body);new MutationObserver(records=>records.forEach(record=>{if(record.type==='characterData')visit(record.target);else record.addedNodes.forEach(visit);})).observe(document.body,{childList:true,subtree:true,characterData:true});};
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
