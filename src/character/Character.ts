import players from "../player/Players";
import CharacterTest from "./CharacterTest";


class Character {
    characters = {};

    constructor() {

    }

    init() {
        this.registerCharacter("test", CharacterTest);
    }

    setPlayerCharacter(player : number, name: string) {
        if (!this.characters[name]) {
            throw new Error(`Character with name ${name} does not exist.`);
        }
        
        players.setPlayerCharacter(player, this.characters[name]);
    }

    registerCharacter(name: string, character: any) {
        if (this.characters[name]) {
            throw new Error(`Character with name ${name} already exists.`);
        }
        this.characters[name] = new character();
    }

}

export default Character;