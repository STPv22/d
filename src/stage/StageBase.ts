import { Mesh, MeshBuilder } from "@babylonjs/core";

class StageBase {
    scene;
    stageObjects : Object = {
        solids: [],
        platforms: [],
        hazards: [],
    };

    constructor(scene) {
        this.scene = scene;
    }

    init() {

    }

    run(scene) {
        this.scene = scene;
        this.init();
    }

    createRect(type : string, x : number, y : number, z : number, width : number, height : number, depth : number) {
        
        var object : Mesh = MeshBuilder.CreateBox(`rect_${this.stageObjects[type].length}`, { width: width, height: height, depth: depth }, this.scene);
        object.position.x = x;
        object.position.y = y; 
        object.position.z = z;

        if (!this.stageObjects[type]) {
            console.error(`Stage type "${type}" does not exist`);
            return;
        }

        this.stageObjects[type].push(object);
    }
}

export default StageBase;