
  

//Get the date at the home screen
var td = setInterval(showDate,1000);
function showDate(){
    var today = new Date();
    var month = today.getMonth()+1;
    var day = today.getDate();
    document.getElementById("date").innerHTML=month+"."+day;
}



//The hamberger menu
function showMenu() {
    var menu = document.getElementsByClassName('nav-menu')[0]
    var burger = document.getElementsByClassName('burger')[0]
    //change from hamberger to X or change back
    burger.classList.toggle("change");

    //show or hide the menu
    if (menu.style.transform === "translateX(0%)") {
        menu.style.transform = "translateX(-100%)"
    } else {
        menu.style.transform = "translateX(0%)"
    }

}

