//loading

window.addEventListener("load", function() {
  
})

window.onload = function() {
  const loader = document.getElementById('loader')
  const body = document.getElementById('body')
  console.log(loader);
  console.log(body);
  loader.classList.add("none")
  body.classList.remove("hidden")  
};

//menu

const menu = document.getElementById('menu')
const listItems = document.getElementById('list_items')    
const items = document.querySelectorAll('.list_item')
const body = document.getElementById('body')

    menu.addEventListener('click', function() {        
        listItems.classList.toggle('nav__items--show')
        menu.classList.toggle('open')       
        body.classList.toggle('hidden') 
    })

    items.forEach(function(item) {
        item.addEventListener('click', function() {        
            listItems.classList.remove('nav__items--show')
            menu.classList.toggle('open')       
            body.classList.toggle('hidden') 
        })
    });

//text

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = null;

function startAnimation() {
  let iteration = 0;

  clearInterval(interval);

  interval = setInterval(() => {
    const h1Element = document.querySelector("h1");
    h1Element.innerText = h1Element.innerText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return h1Element.dataset.value[index];
        }

        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");

    if (iteration >= h1Element.dataset.value.length) {
      clearInterval(interval);
    }

    iteration += 1 / 3;
  }, 30);
}    

//galery

//galery

const track = document.getElementById("image-track");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {

  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  let nextPercentageUnconstrained =0
  let nextPercentage =0
  let percentage = 0

    percentage = (mouseDelta / maxDelta) * -100,
    nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -85);

    if (isNaN(nextPercentage)) {
      nextPercentage=0
    }

    if (isNaN(nextPercentageUnconstrained)) {
      nextPercentageUnconstrained=0
    }

    if (isNaN(percentage)) {
      percentage=0
    }

  track.dataset.percentage = nextPercentage;

  track.animate({
    
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}

/* -- Had to add extra lines for touch events -- */

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);



setInterval(startAnimation, 3000);
console.log("R u ok?");