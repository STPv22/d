class world {
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
        p.translate(posx, posy, posz);
        p.box(x, y, z);
        p.pop();
        this.hitboxes.push(info);
    }
}

var World = new world();
export default World;