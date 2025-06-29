
import { defaultSettings, names, nameSettings } from './PlayerNames';

class Players {
    players: any[] = [];
    scene: any;
    defaultPlayer = {
        name: null,
        settings: defaultSettings,
    }

    constructor() {}

    addPlayer() {
        this.players.push(this.defaultPlayer);

        return this.players.length - 1;
    }

    renderToScene(scene) {
        this.scene = scene;

        //temp
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i]['character']) {
                this.players[i]['character'].run(scene);
            }
        }
    }

    setPlayerCharacter(player : number, character : any) {

        this.players[player]['character'] = character;

    }

    setPlayerName(player: number, name: string) {
        if (!this.players[player]) {
            throw new Error(`Player ${player} does not exist.`);
        }
        this.players[player]['name'] = name;
        this.players[player]['settings'] = nameSettings[name] || defaultSettings;
    }
}

var players = new Players();
export default players;