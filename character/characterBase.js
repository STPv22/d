import { getScaledX, getScaledY, getScaledZ } from "../scaledres.js";

export default class characterBase {
  constructor(p) {
    this.name = "tsukasa";

    this.upPressed = false;
    this.rightPressed = false;
    this.leftPressed = false;
    this.downPressed = false;
    this.initialized = true;
  }

  update(p) {
    this.handleKeyPressed();

    p.push();
    p.translate(getScaledX(p, 0), getScaledY(p, -10), getScaledZ(p, 0));
    p.box(100, 100, 100);
    p.pop();
  }

  handleKeyPressed() {
    onkeydown = (event) => {
      if (event.key == "ArrowUp") {
          this.upPressed = true;
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