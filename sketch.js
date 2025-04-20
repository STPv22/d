import World from "./stage/World.js";
import Scenes from "./scenes/Scenes.js";

//1080p resolution
export var resWidth = 1920;
export var resHeight = 1080;

new p5((p) => {
  p.setup = () => {
    //took mt a minute to figure out how to get the canvas to scale properly while keeping the resolution
    //this is the best solution I could come up with
    p.createCanvas(resWidth, resHeight);
    p.pixelDensity(1);
    p.angleMode(p.DEGREES);
    p.rectMode(p.CENTER);
    p.frameRate(60);
    var resizeLogic = p.windowHeight / resHeight;
    document.querySelectorAll("canvas").forEach((canvas) => {
      canvas.style.transform = `scale(${resizeLogic}) translate(-50%, 0)`;
      canvas.style.transformOrigin = "0 0";
      canvas.style.position = "absolute";
      canvas.style.left = "50%";
      canvas.style.top = "0px";
    });
  }
  
  p.draw = () => {
    p.clear();

    Scenes.display(p);
  }
  
});