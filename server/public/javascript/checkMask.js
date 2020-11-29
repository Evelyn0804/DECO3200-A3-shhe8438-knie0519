//Reference: https://learn.ml5js.org/#/tutorials/hello-ml5
let mobilenet; // Trained object
let classifier; // Initialize the Image Classifier method with MobileNet.
let video;
let label = 'Loading model';
let canvas

// Check the trained model has been loaded as the imageClassifier
function modelReady() {
  console.log('Model is ready!!!');
  classifier.load('model.json', customModelReady);
}

//Callback function used to recall the classify function
function customModelReady() {
  console.log('Custom Model is ready!!!');
  label = 'model ready';
  classifier.classify(gotResults);
}

//Callback function used to test videoReady
function videoReady() {
  console.log('Video is ready!!!');
}

//Use the setup() function in p5.js for everything in our program that just runs once. 
function setup() {
  canvas = createCanvas(350, 600);// create a canvas to render our image
  canvas.parent('video_holder');
  video = createCapture(VIDEO);
  video.hide();

  background(0);

  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  classifier = mobilenet.classification(video, videoReady);// call .classify() on our classifier to classify our image
}

//The draw function in p5.js, used to load the webcam video
function draw() {
  background(0);
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, 600, 700);
  pop();
}


// Get the classification: The gotResult() function takes two parameters: 1. error, and 2. results. 
// These get passed along to gotResult() when the .classify() function finishes classifying the image. 
// If there is an error, then an error will be logged. 
// If our classifier manages to recognize the content of the image, then a result will be returned.
function gotResults(error, result) {
  if (error) {
    console.error(error);
  } else {
    label = result[0].label;
    classifier.classify(gotResults);
  }
}

// Hide the mask for prompts before taking a photo 
function hideMask() {
  document.getElementById('overlay').style.display = 'none';
  
}

//Turn to the photo edit page
function toEditImage() {
  // convert the canvas image to base64 and save it to session
  imgData = canvas.canvas.toDataURL('image/jpeg')
  sessionStorage.setItem("imgdata", imgData);
//SessionStorage used to store data locally within the user's browser. 
//The data is deleted when the user closes the specific browser tab.
  let url = "./editImage.html";
  window.location.href=url;
}

// Take a photo
function takePhoto() {
  const ctx = canvas.drawingContext;
  ctx.font = '24px STheiti, SimHei';
  console.log(label)
  

  if (label == 'Mask On') {
    //If user wear a mask, the gift element (claim reward) will be display, borad element (no mask/loading prompts) will be hide
    video.pause();
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('gift').style.display = 'block';
    document.getElementById('nomask').style.display = 'none';
  }
  else if (label == 'Mask Off') {
    //If user didn't wear a mask, the no mask prompts will pop up
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('nomask').style.color = '#CD5B54';
    document.getElementById('nomask').innerText = 'No Mask!! Please try Again';
    // Close the pop up window after delay 2s
    setTimeout(hideMask,2000);
  } else {
    //If it haven't get a result, shows the loading pop up
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('nomask').style.color = '#6a3e3e';
    document.getElementById('nomask').innerText = 'Loading...';
    setTimeout(hideMask,2000);
  }
}

//back to last page
    function back() {
      const url = "./goout.html";
      window.location.href = url;
    }
