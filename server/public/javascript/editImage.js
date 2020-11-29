/**
 * use fabric.js to add mask sticker on the photo 
 */
//Reference: http://fabricjs.com/custom-control-render
    
    // adjust the canvas size
    function resizeCanvas() {
      let canvas = document.getElementById("c");
      const ctx = canvas.getContext("2d");
      w = canvas.width = window.innerWidth * 0.95;
      h = canvas.height = window.innerHeight * 0.65;
    }

    // Turning to the share page
    function toShare() {
      const saveEle = document.getElementById("c");
      sessionStorage.removeItem("imgdata");
      sessionStorage.setItem("imgdata", saveEle.toDataURL("image/jpeg"));
      window.location.href = "./share.html";
    }

    //load User's photo
    function loadImage() {
      // load image from Sesson (which as been converted to base 64) 
      var value = sessionStorage.getItem("imgdata");
      const imgEle = new Image();
      value = value == null ? "../img/Thomas.png" : value;
      imgEle.src = value;
      if (imgEle.complete) {
        console.log(imgEle.width, imgEle.height);
      } else {
        imgEle.onload = function () {
          console.log(imgEle.width, imgEle.height);
        };
      }
      return value;
    }

    // Determine an appropriate zoom ratio according to the size of the current image and the size of the largest border
    function AutoResizeImage(maxWidth, maxHeight, w, h) {
      var hRatio;
      var wRatio;
      var Ratio = 1;
      wRatio = maxWidth / w;
      hRatio = maxHeight / h;
      if (maxWidth == 0 && maxHeight == 0) {
        Ratio = 1;
      } else if (maxWidth == 0) {
        if (hRatio < 1) Ratio = hRatio;
      } else if (maxHeight == 0) {
        if (wRatio < 1) Ratio = wRatio;
      } else if (wRatio < 1 || hRatio < 1) {
        Ratio = wRatio <= hRatio ? wRatio : hRatio;
      }
      return Ratio;
    }


    // choose mask
    function chooseMask(event) {
      if (event.target.nodeName == "IMG") {
        const imgElement = event.target;
        var imgInstance = new fabric.Image(imgElement, {
          left: 100,
          top: 100,
          angle: 0,
          opacity: 0.85,
        });
        canvas.add(imgInstance);
        canvas.setActiveObject(imgInstance);
      }
    }


    // return to last page
    function back() {
      const url = "./checkMask.html";
      window.location.href = url;
    }

    //add a delete Icon
    const deleteIcon =
      "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";
    var img = document.createElement("img");
    img.src = deleteIcon;

    //Render delete Icon
    function renderIcon(ctx, left, top, styleOverride, fabricObject) {
      var size = this.cornerSize;
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
      ctx.drawImage(img, -size / 2, -size / 2, size, size);
      ctx.restore();
    }

    // bind the delete function to allow user delete the sticker
    fabric.Object.prototype.controls.deleteControl = new fabric.Control({
      x: 0.5,
      y: -0.5,
      offsetY: 16,
      cursorStyle: "pointer",
      mouseUpHandler: deleteObject,
      render: renderIcon,
      cornerSize: 24,
    });

    function deleteObject(eventData, target) {
      var canvas = target.canvas;
      canvas.remove(target);
      canvas.requestRenderAll();
    }


    //add event to the "choose-list" element so user can choose the mask
    document
      .getElementById("choose-list")
      .addEventListener("click", chooseMask);

    // Register the function of automatically resizecanvas size to the global
    window.addEventListener("resize", resizeCanvas, false);

    // Call the resizecanvas function when the page is loading
    resizeCanvas();

    // load the photo user just taken when the page is loading
    drawBackground();

    //create the canvas object as fabric canvas
    var canvas = (this.__canvas = new fabric.Canvas("c"));
    
    // load the photo user just taken
    function drawBackground() {
      const imgEle = loadImage();
      fabric.Image.fromURL(imgEle, function (oImg) {
        let canvasEle = document.getElementById("c");
        let radio = AutoResizeImage(
          canvasEle.clientWidth,
          canvasEle.clientHeight,
          oImg.getElement().width,
          oImg.getElement().height
        );
        // scale image down, and flip it, before adding it onto canvas
        oImg.scale(radio);
        oImg.selectable = false;
        canvas.add(oImg);
      });
    }
    // save the photo and go out
    function Save() {
      const saveEle = document.getElementById("c");
      Canvas2Image.saveAsPNG(
        saveEle,
        saveEle.clientWidth,
        saveEle.clientHeight
      );
      const url = "./back.html";
      window.location.href = url;
    }