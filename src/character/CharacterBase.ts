import Character from "./Character";

class CharacterBase {
    name: string;
    characterParts = [];

    constructor() {
    }

    run(scene: any) {
        if (!scene) {
            throw new Error("Scene is not defined.");
        }
    }
}

export default CharacterBase;