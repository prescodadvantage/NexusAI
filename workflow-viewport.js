'use strict';
// A small, isolated enhancement for the original compiled React application.
// The viewport and its scene are rendered by React, preserving node drag behavior.
(()=>{
 function attach(){
  const viewport=document.querySelector('.nexus-flow-viewport');if(!viewport||viewport.dataset.enhanced)return;
  viewport.dataset.enhanced='true';
  const scene=viewport.querySelector('.nexus-flow-scene'),panel=viewport.parentElement;
  const bar=document.createElement('div');bar.className='nexus-flow-controls';
  bar.innerHTML='<p>Scroll or swipe to explore the full sequence.</p><button type="button" aria-label="Scroll workflow left">←</button><button type="button" aria-label="Scroll workflow right">→</button><button type="button" aria-label="Return to first workflow node">Start</button><label><input type="checkbox" checked>Follow execution</label>';
  panel.insertBefore(bar,viewport);
  const [left,right,start]=bar.querySelectorAll('button'),follow=bar.querySelector('input');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const move=(amount)=>{follow.checked=false;viewport.scrollBy({left:amount,behavior:reduced.matches?'instant':'smooth'});};
  left.addEventListener('click',()=>move(-viewport.clientWidth*.7));right.addEventListener('click',()=>move(viewport.clientWidth*.7));start.addEventListener('click',()=>move(-viewport.scrollWidth));
  function edges(){left.disabled=viewport.scrollLeft<=1;right.disabled=viewport.scrollLeft+viewport.clientWidth>=viewport.scrollWidth-2;start.disabled=left.disabled;}
  viewport.addEventListener('scroll',edges,{passive:true});
  viewport.addEventListener('wheel',()=>{follow.checked=false;},{passive:true});
  viewport.addEventListener('pointerdown',()=>{follow.checked=false;},{passive:true});
  viewport.addEventListener('keydown',e=>{if(e.target!==viewport)return;let step=0;if(e.key==='ArrowRight')step=180;if(e.key==='ArrowLeft')step=-180;if(e.key==='Home')step=-viewport.scrollWidth;if(e.key==='End')step=viewport.scrollWidth;if(step){e.preventDefault();move(step);}});
  function followNode(){
   if(!follow.checked)return;
   const node=scene.querySelector('[data-executing="true"]');if(!node)return;
   const a=node.getBoundingClientRect(),v=viewport.getBoundingClientRect();
   viewport.scrollLeft+=a.left+a.width/2-v.left-v.width/2;
   viewport.dataset.followTarget=node.dataset.flowNode;
  }
  follow.addEventListener('change',followNode);
  new MutationObserver(followNode).observe(scene,{subtree:true,attributes:true,attributeFilter:['data-executing']});
  document.addEventListener('visibilitychange',followNode);
  function size(){const base=scene.getBoundingClientRect();let width=1400;scene.querySelectorAll('[data-flow-node]').forEach(node=>{width=Math.max(width,node.getBoundingClientRect().right-base.left+70);});scene.style.width=Math.ceil(width)+'px';edges();}
  viewport.addEventListener('pointerup',size);document.addEventListener('mouseup',size);new ResizeObserver(edges).observe(viewport);edges();
 }
 const observer=new MutationObserver(()=>{attach();if(document.querySelector('.nexus-flow-viewport[data-enhanced]'))observer.disconnect();});observer.observe(document.documentElement,{childList:true,subtree:true});attach();
})();
