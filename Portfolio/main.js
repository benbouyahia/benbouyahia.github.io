const btn=document.querySelector('.menu-btn'),list=document.querySelector('nav ul');
btn.addEventListener('click',()=>{const o=list.classList.toggle('open');btn.setAttribute('aria-expanded',o)});
list.addEventListener('click',e=>{if(e.target.tagName==='A'){list.classList.remove('open');btn.setAttribute('aria-expanded',false)}});
const out=document.getElementById('readout');
document.querySelectorAll('.bar').forEach(b=>{
  const show=()=>{document.querySelectorAll('.bar').forEach(x=>x.classList.remove('on'));b.classList.add('on');
    out.textContent=b.dataset.label+': '+b.dataset.value+' orders (sample data)'};
  b.addEventListener('mouseenter',show);b.addEventListener('focus',show);b.addEventListener('click',show);
});
