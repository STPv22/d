import SceneBase from "./SceneBase.js";

import { resHeight, resWidth} from "../sketch.js";
import CharacterBase, { characterBase } from "../character/characterBase.js";
import World from "../stage/World.js";

export default class SceneGame extends SceneBase {
    constructor() {
        super();
        this.renderer3d = null;
    }

    display(p) {
        if (!this.renderer3d) this.renderer3d = p.createGraphics(resWidth, resHeight, p.WEBGL);
        this.renderer3d.angleMode(p.DEGREES);
        var cam = this.renderer3d.createCamera();
        cam.setPosition(0, -100, 800);
        cam.lookAt(0, 0, 0);
        //3d rendering
        this.renderer3d.background(220);
        this.renderer3d.normalMaterial();

        World.createSolid(this.renderer3d, p.width, 100, 100, 0, 100, 0);
        
        var s = CharacterBase.update(this.renderer3d);

        p.image(this.renderer3d, 0, 0);

        //2d overlay
        p.fill(0);
        p.textSize(30);
        p.text(`FrameRate: ${Math.round(p.frameRate())}`, 150, 50);

        return s;
    }
}