import { getScaledX, getScaledY, getScaledZ } from '../scaledres.js';

export default class World {
    constructor() {
        this.hitboxes = [];
    }

    createSolid(p, x, y, z, posx, posy, posz) {
        var info = {
            width: x,
            height: y,
            depth: z,
            x: posx,
            y: posy,
            z: posz,
        }
        p.push();
        p.translate(getScaledX(p, posx), getScaledY(p, posy), getScaledZ(p, posz));
        p.box(getScaledX(p, x), getScaledY(p, y), getScaledZ(p, z));
        p.pop();
        this.hitboxes.push(info);
    }
}