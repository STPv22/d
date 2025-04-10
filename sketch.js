import { getScaledX, getScaledY, getScaledZ } from "./scaledres.js";
import test from "./character/test.js";
import World from "./stage/World.js";

let cam;

let character;
let world;

let frameRateP;

//1080p resolution
export var resWidth = 1920;
export var resHeight = 1080;

new p5((p) => {
  p.setup = () => {
    //took mt a minute to figure out how to get the canvas to scale properly while keeping the resolution
    //this is the best solution I could come up with
    p.createCanvas(resWidth, resHeight, p.WEBGL);
    p.pixelDensity(1);
    var resizeLogic = p.windowHeight / resHeight;
    document.querySelectorAll("canvas").forEach((canvas) => {
      canvas.style.transform = `scale(${resizeLogic}) translate(-50%, 0)`;
      canvas.style.transformOrigin = "0 0";
      canvas.style.position = "absolute";
      canvas.style.left = "50%";
      canvas.style.top = "0px";
    });
   
    p.angleMode(p.DEGREES);

    character = new test(p);
    world = new World();

    p.frameRate(20);
    frameRateP = p.createP();

    cam = p.createCamera();
    cam.setPosition(getScaledX(p, 0), getScaledY(p, -20), getScaledZ(p, 100));
    cam.lookAt(0, getScaledY(p, -10), 0);
    p.normalMaterial();
  }
  
  p.draw = () => {
    p.background(220);
    p.textSize(20);
    frameRateP.html(p.round(p.frameRate()));
  
    world.createSolid(p, 100, 10, 10, 0, 0, 0);
    world.createSolid(p, 10, 20, 10, 20, -10, 0);

    character.update(p, world.hitboxes);
  }
  
});