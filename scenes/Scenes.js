import SceneLoading from "./SceneLoading.js";
import SceneGame from "./SceneGame.js";

class scenes {
    constructor() {
        this.scene = {
           loading: new SceneLoading(),
           game: new SceneGame(),
        }
        this.currentScene = this.scene.loading;
    }

    display(p) {
        var s = this.currentScene.display(p);
        if ( s == 0 || undefined) {
            this.scene[this.currentScene].reset();
        }
    }

    setScene(scene) {
        this.currentScene = this.scene[scene];
    }
}

var Scenes = new scenes();
export default Scenes;