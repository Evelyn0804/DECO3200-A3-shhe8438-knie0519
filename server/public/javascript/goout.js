//Get the date at the home screen
var td = setInterval(showDate, 1000);
function showDate() {
  var today = new Date();
  var month = today.getMonth() + 1;
  var day = today.getDate();
  document.getElementById("date").innerHTML = month + "." + day;
}


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

//modal
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[closebtn]')
const overlay = document.getElementById('overlay')


overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}

//Hint for novice user
let oriShowLearnMore = localStorage.getItem("showLearnMore"); // show=1；hide=2
!oriShowLearnMore && localStorage.setItem("showLearnMore", "1"); // Save localStorage，it would not clear when refresh the page
let showLearnMore = localStorage.getItem("showLearnMore"); // show=1；hide=2
console.log(showLearnMore);
if (showLearnMore === "1") {
  console.warn('novice user');
  openModal(modal);
  bindModalButtons();
  localStorage.setItem("showLearnMore", "2");
}else if (showLearnMore === "2") {
  console.warn('used');
  bindModalButtons();
}
function bindModalButtons() {
  openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = document.querySelector(button.dataset.modalTarget)
      openModal(modal)
    })
  })
}
