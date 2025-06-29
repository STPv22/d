import { Mesh, MeshBuilder } from "@babylonjs/core";
import CharacterBase from "./CharacterBase";

class CharacterTest extends CharacterBase {

    constructor() {
        super();

        this.name = "Test Character";
    }

    run(scene: any) {
        if (!scene) {
            throw new Error("Scene is not defined.");
        }

        var object : Mesh = MeshBuilder.CreateBox(`rect_${this.characterParts.length}`, { width: 10, height: 20, depth: 10 }, scene);
        
        this.characterParts.push(object);
    }
}

export default CharacterTest;