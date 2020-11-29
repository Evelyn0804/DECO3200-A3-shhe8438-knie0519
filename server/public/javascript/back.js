//Get the date at the home screen
var td = setInterval(showDate, 1000);
function showDate() {
  var today = new Date();
  var month = today.getMonth() + 1;
  var day = today.getDate();
  document.getElementById("date").innerHTML = month + "." + day;
}

// Image Slider
const leftArrow = document.querySelector("#left");
const rightArrow = document.querySelector("#right");

const currImg = document.querySelector("#curr-img");

const dots = document.querySelectorAll(".single-dot");

let selectedIndicator = 0;

const resetDots = () => {
  dots.forEach((dot) => dot.classList.remove("active"));
};

const toggleLeftArrow = () => {
  if (selectedIndicator === 0) {
    leftArrow.classList.add("arrow-hidden");
  } else {
    leftArrow.classList.remove("arrow-hidden");
  }
};

const toggleRightArrow = () => {
  if (selectedIndicator === dots.length - 1) {
    rightArrow.classList.add("arrow-hidden");
  } else {
    rightArrow.classList.remove("arrow-hidden");
  }
};

leftArrow.onclick = () => {
  if (selectedIndicator <= 0) {
    toggleLeftArrow();
    return;
  }
  selectedIndicator--;
  toggleLeftArrow();
  toggleRightArrow();
  resetDots();
  currImg.src = `../img/after_${selectedIndicator + 1}.png`;
  dots[selectedIndicator].classList.add("active");
};

rightArrow.onclick = () => {
  if (selectedIndicator >= dots.length) return;
  selectedIndicator++;
  toggleLeftArrow();
  toggleRightArrow();

  resetDots();
  currImg.src = `../img/after_${selectedIndicator + 1}.png`;
  dots[selectedIndicator].classList.add("active");
};

//The hamberger menu
function showMenu() {
  var menu = document.getElementsByClassName("nav-menu")[0];
  var burger = document.getElementsByClassName("burger")[0];
  //change from hamberger to X or change back
  burger.classList.toggle("change");

  //show or hide the menu
  if (menu.style.transform === "translateX(0%)") {
    menu.style.transform = "translateX(-100%)";
  } else {
    menu.style.transform = "translateX(0%)";
  }
}

// Slide to Unlock
document.querySelector('input[type="range"]').onchange = function () {
  var theRange = this.value;
  if (theRange == 100) {
    unlock();
  } else {
    document.init = setInterval(function () {
      if (document.querySelector('input[type="range"]').value != 0) {
        document.querySelector('input[type="range"]').value = theRange--;
      }
    }, 1);
  }
};

// document.querySelector('input[type="range"]').onmousedown = function () {
//   clearInterval(document.init);
// };

function unlock() {
  document.querySelector('input[type="range"]').style.opacity = "1";
  document.getElementById("takeoff").style.display = "block";
}

// progress bar
const progress = document.querySelector('.progress-done');

progress.style.width = progress.getAttribute('data-done') + '%';
progress.style.opacity = 1;

function achievement(){    const url = "./achievement.html";
      window.location.href = url;

}