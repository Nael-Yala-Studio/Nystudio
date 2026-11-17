const menu=document.querySelector('#menu');const nav=document.querySelector('#nav');menu.addEventListener('click',()=>{nav.classList.toggle('open');menu.setAttribute('aria-expanded',nav.classList.contains('open'));menu.setAttribute('aria-label',nav.classList.contains('open')?'Fermer le menu':'Ouvrir le menu')});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));document.querySelector('#year').textContent=new Date().getFullYear();document.querySelector('#contact-form').addEventListener('submit',e=>{e.preventDefault();const d=new FormData(e.currentTarget);const subject=encodeURIComponent('Demande de projet — '+(d.get('company')||d.get('name')));const body=encodeURIComponent(`Nom : ${d.get('name')}\nEntreprise : ${d.get('company')}\nE-mail : ${d.get('email')}\nBesoin : ${d.get('need')}\n\nProjet :\n${d.get('message')}`);location.href=`mailto:contact@nystudio.fr?subject=${subject}&body=${body}`});


// La méthode met en relief chaque étape avec une transition 3D.
const methodSection=document.querySelector('#methode');
const methodSteps=[...document.querySelectorAll('.steps article')];
if(methodSection&&methodSteps.length){
  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let currentStep=0;
  let timer=null;
  const showStep=(index)=>{
    methodSteps.forEach((step,i)=>{
      step.classList.toggle('is-active',i===index);
      step.classList.toggle('is-past',i<index);
      step.setAttribute('aria-current',i===index?'step':'false');
    });
  };
  showStep(0);
  if(!reduceMotion){
    const start=()=>{if(timer===null)timer=window.setInterval(()=>{currentStep=(currentStep+1)%methodSteps.length;showStep(currentStep);},2400);};
    const stop=()=>{if(timer!==null){window.clearInterval(timer);timer=null;}};
    const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>entry.isIntersecting?start():stop());},{threshold:.35});
    observer.observe(methodSection);
  }
}
