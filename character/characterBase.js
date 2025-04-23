import Scenes from "../scenes/Scenes.js";
import AssetHandler from "../util/AssetHandler.js";

export class characterBase {
  constructor(p) {
    this.name = "Tsukasa";
    this.characterId = "test";
    this.currentAnimation = "idle";
    this.animationFrame = 0;
    this.doubleCheckList = [];

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

    p.push();
    p.translate(this.posX, this.posY, this.posZ);
    for (var i = 0; i < this.characterModel.length; i++) {
      var m = this.characterModel[i];
      //array.find
      for (var j = 0; j < this.characterAnimations[this.currentAnimation].frames.length; j++) {
        var f = this.characterAnimations[this.currentAnimation].frames[j];

        if (f.doFrame != undefined) {
          f = this.characterAnimations[this.currentAnimation].frames[f.doFrame];
        }

        var anim = f.parts[m.id];

        if (f.time == this.animationFrame) {
          m.rotation.x ??= anim.rotation.x;
          m.rotation.y ??= anim.rotation.y;
          m.rotation.z ??= anim.rotation.z;
          m.rotationOrigin.x ??= anim.rotationOrigin.x;
          m.rotationOrigin.y ??= anim.rotationOrigin.y;
          m.rotationOrigin.z ??= anim.rotationOrigin.z;
          m.size.width ??= anim.size.width;
          m.size.height ??= anim.size.height;
          m.size.depth ??= anim.size.depth;
          m.x ??= anim.x;
          m.y ??= anim.y;
          m.z ??= anim.z;
        }
      }

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
      }
      p.pop();

      this.velX *= 0.9;

      this.posX += this.velX;
      this.posY += this.velY;
      return 1;
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