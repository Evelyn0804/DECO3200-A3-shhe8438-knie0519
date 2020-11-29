
//load image from session
function loadImg() {
    var value = sessionStorage.getItem("imgdata") == null ? '../img/Thomas.png' : sessionStorage.getItem("imgdata");
    const img = document.getElementById('show');
    img.src = value;
}

function back() {
    window.location.href='./editImage.html';
  }

  function goout() {
     const url = "./back.html";
      window.location.href = url;
  }
  loadImg();



//Get the date at the home screen
var td = setInterval(showDate,1000);
function showDate(){
    var today = new Date();
    var month = today.getMonth()+1;
    var day = today.getDate();
    document.getElementById("date").innerHTML=month+"."+day;
}
