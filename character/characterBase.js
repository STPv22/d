import Scenes from "../scenes/Scenes.js";
import AssetHandler from "../util/AssetHandler.js";
import { findClosestGreater, findClosestLess } from "../util/Math.js";

export class characterBase {
  constructor(p) {
    this.name = "Tsukasa";
    this.characterId = "test";
    this.currentAnimation = "idle";
    this.animationFrame = 0;
    this.doubleCheckList = [];

    this.characterModelData = null;
    this.characterModel = null;
    this.characterAnimations = {};

    this.initialized = false;

    this.maxFallSpeed = 1;
    this.fastFallMultiplier = 60; //meant to be percentage

    this.posX = 0;
    this.posY = -100;
    this.posZ = 0;

    this.velX = 0;
    this.velY = 0;
    this.velZ = 0;

    this.width = 180;
    this.height = 250;
    this.depth = 150;

    AssetHandler.regAsset(`models/${this.characterId}.json`, (res) => {
      res.json()
      .then((json) => {
        console.log("Loaded character model", this.characterId);
        this.characterModel = json;
      })
    });

    AssetHandler.regAsset(`animations/${this.characterId}/idle.json`, (res) => {
      res.json()
      .then((animjson) => {
        this.characterAnimations["idle"] = animjson;
        console.log("Loaded character animation", this.characterId);
      });
    });


    this.upPressed = false;
    this.rightPressed = false;
    this.leftPressed = false;
    this.downPressed = false;
    this.initialized = true;
  }

  update(p) {
    this.animationFrame++;
    if (!this.characterAnimations[this.currentAnimation] || !this.characterModel) {
      return;
    }
    if (this.animationFrame > this.characterAnimations[this.currentAnimation].animationTime) {
      this.animationFrame = 0;
    }

    if (!this.characterModel) { //For some reason, the model doesnt load sometimes
      return;
    }
    this.handleKeyPressed();

    if (this.upPressed) {
      this.velY -= 0.5;
    }
    if (this.downPressed) {
      this.velY += 0.5;
    }
    if (this.leftPressed) {
      this.velX -= 0.5;
    }
    if (this.rightPressed) {
      this.velX += 0.5;
    }

    //parse the animation and other logic
    this.characterModelData = this.characterModel;
    for (var i = 0; i < this.characterModelData.length; i++) {
      var m = this.characterModelData[i];

      var f = this.characterAnimations[this.currentAnimation].frames;

      var lastFrame = findClosestLess(f, this.animationFrame);
      var lastF = f[lastFrame];
      var nextFrame = findClosestGreater(f, this.animationFrame);
      var nextF = f[nextFrame];
      if (lastF.doFrame != undefined) {
        lastF.parts = f[lastF.doFrame].parts;
      }
      if (nextF.doFrame != undefined) {
        nextF.parts = f[nextF.doFrame].parts;
      }
      if (lastF == undefined || nextF == undefined) { 
        continue;
      } else if (lastFrame == nextFrame) {
        //console.log("same frame");
        m.x = lastF.parts?.[m.id]?.x || m.x;
        m.y = lastF.parts?.[m.id]?.y || m.y;
        m.z = lastF.parts?.[m.id]?.z || m.z;
        m.rotation.x = lastF.parts?.[m.id]?.rotation?.x || m.rotation.x;
        m.rotation.y = lastF.parts?.[m.id]?.rotation?.y || m.rotation.y;
        m.rotation.z = lastF.parts?.[m.id]?.rotation?.z || m.rotation.z;
        m.rotationOrigin.x = lastF.parts?.[m.id]?.rotationOrigin?.x || m.rotationOrigin.x;
        m.rotationOrigin.y = lastF.parts?.[m.id]?.rotationOrigin?.y || m.rotationOrigin.y;
        m.rotationOrigin.z = lastF.parts?.[m.id]?.rotationOrigin?.z || m.rotationOrigin.z;
        m.size.width = lastF.parts?.[m.id]?.size?.width || m.size.width;
        m.size.height = lastF.parts?.[m.id]?.size?.height || m.size.height;
        m.size.depth = lastF.parts?.[m.id]?.size?.depth || m.size.depth;
      } else {
        //console.log("different frame");
        function doStuff(val1, val2, startVal, anim, operator) {
          var fPercentUp = (anim - lastF.time) / (nextF.time - lastF.time);
          var fPercentDown = (nextF.time - anim) / (nextF.time - lastF.time);
          if (operator == "?") {
            if (val1 >= val2) {
              return fPercentDown * val1 ?? startVal;
            } else {
              return fPercentUp * val2 ?? startVal;
            }
          } else if (operator == "|") {
            if (val1 >= val2) {
              return fPercentDown * val1 || startVal;
            } else {
              return fPercentUp * val2 || startVal;
            }
          } else {
            console.error("invalid operator!");
          }
        }
        if (nextF.parts[m.id] && nextF.parts[m.id]) {
          m.x = doStuff(lastF.parts?.[m.id]?.x, nextF.parts?.[m.id]?.x, m.x, this.animationFrame, "|");
          m.y = doStuff(lastF.parts?.[m.id]?.y, nextF.parts?.[m.id]?.y, m.y, this.animationFrame, "|");
          m.z = doStuff(lastF.parts?.[m.id]?.z, nextF.parts?.[m.id]?.z, m.z, this.animationFrame, "|");
          m.rotation.x = doStuff(lastF.parts?.[m.id]?.rotation.x, nextF.parts?.[m.id]?.rotation.x, m.rotation.x, this.animationFrame, "?");
          m.rotation.y = doStuff(lastF.parts?.[m.id]?.rotation.y, nextF.parts?.[m.id]?.rotation.y, m.rotation.y, this.animationFrame, "?");
          m.rotation.z = doStuff(lastF.parts?.[m.id]?.rotation.z, nextF.parts?.[m.id]?.rotation.z, m.rotation.z, this.animationFrame, "?");
          m.rotationOrigin.x = doStuff(lastF.parts?.[m.id]?.rotationOrigin.x, nextF.parts?.[m.id]?.rotationOrigin.x, m.rotationOrigin.x, this.animationFrame, "?");
          m.rotationOrigin.y = doStuff(lastF.parts?.[m.id]?.rotationOrigin.y, nextF.parts?.[m.id]?.rotationOrigin.y, m.rotationOrigin.y, this.animationFrame, "?");
          m.rotationOrigin.z = doStuff(lastF.parts?.[m.id]?.rotationOrigin.z, nextF.parts?.[m.id]?.rotationOrigin.z, m.rotationOrigin.z, this.animationFrame, "?");
          m.size.width = doStuff(lastF.parts?.[m.id]?.size?.width, nextF.parts?.[m.id]?.size?.width, m.size.width, this.animationFrame, "|");
          m.size.height = doStuff(lastF.parts?.[m.id]?.size?.height, nextF.parts?.[m.id]?.size?.height, m.size.height, this.animationFrame, "|");
          m.size.depth = doStuff(lastF.parts?.[m.id]?.size?.depth, nextF.parts?.[m.id]?.size?.depth, m.size.depth, this.animationFrame, "|");
        }
        //console.log(lastF, nextF, this.animationFrame);
        //console.log(m.rotation.y);
      }
      //render character
      p.push();
        p.translate(this.posX, this.posY, this.posZ);

        p.push();
          p.translate(m.x - m.rotationOrigin.x, m.y - m.rotationOrigin.y, m.z - m.rotationOrigin.z);
          p.rotateX(m.rotation.x);
          p.rotateY(m.rotation.y);
          p.rotateZ(m.rotation.z);
          p.translate(m.rotationOrigin.x, m.rotationOrigin.y, m.rotationOrigin.z);
          p.fill(0, 0, 150);
          p.stroke(0);
          switch (m.type) {
            case "box":
              p.box(m.size.width, m.size.height, m.size.depth);
              break;
            default:
              console.log("Unknown model type: " + m.type);
              break;
          }
        p.pop();
      p.pop();
    }
    //console.log("this.characterModelData", this.characterModelData);

    this.velX *= 0.9;

    this.posX += this.velX;
    this.posY += this.velY;
  }

  handleUndefined(check) {
    if (check == (undefined || null || NaN || {})) {
      return true;
    }
    return false;
  }

  handleKeyPressed() {
    onkeydown = (event) => {
      if (event.key == "ArrowUp") {
          this.upPressed = true;
      }
      if (event.key == "ArrowDown") {
        this.downPressed = true;
      }
      if (event.key == "ArrowLeft") {
          this.leftPressed = true;
      }
      if (event.key == "ArrowRight") {
          this.rightPressed = true;
      }
    };
    onkeyup = (event) => {
      if (event.key == "ArrowUp") {
        this.upPressed = false;
      }
      if (event.key == "ArrowDown") {
        this.downPressed = false;
      }
      if (event.key == "ArrowLeft") {
        this.leftPressed = false;
      }
      if (event.key == "ArrowRight") {
        this.rightPressed = false;
      }
    };
  }
}

var CharacterBase = new characterBase();
export default CharacterBase;