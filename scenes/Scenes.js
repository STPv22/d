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
    }

    setScene(scene) {
        this.currentScene = this.scene[scene];
    }
}

var Scenes = new scenes();
export default Scenes;