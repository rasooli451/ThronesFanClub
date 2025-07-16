

const clickSound = new Audio('/sounds/sword-hit-7160.mp3');
const buttonSound = new Audio('/sounds/slash1-94367.mp3');


document.addEventListener("click", ()=>{
    clickSound.play();
})


document.querySelectorAll('button,input').forEach(element => {
    element.addEventListener('click', (e) => {
      buttonSound.play();
      e.stopPropagation();
    });
  });
