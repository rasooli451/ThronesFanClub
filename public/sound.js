

const clickSound = new Audio('/sounds/swordHit.mp3');
const buttonSound = new Audio('/sounds/slash1-94367.mp3');


document.addEventListener("click", ()=>{
  const soundClone = clickSound.cloneNode();
    soundClone.play();
})


document.querySelectorAll('button,input,a,textarea').forEach(element => {
  if (!element.classList.contains("nosound")){
    element.addEventListener('click', (e) => {
      const soundClone = buttonSound.cloneNode();
      soundClone.play();
      e.stopPropagation();
    });
  }  
  });
