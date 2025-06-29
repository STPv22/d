import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder, UniversalCamera } from "@babylonjs/core";
import * as GUI from '@babylonjs/gui'

import SceneBase from './SceneBase';
import stageList from "../stage/Stages";
import Character from "../character/Character";
import players from "../player/Players";

class SceneMain extends SceneBase {
    constructor(engine, scene) {
        super();

        this.engine = engine;
        this.scene = scene;
    }

    initScene(): void {
         //layers

        var camera: UniversalCamera = new UniversalCamera("Camera", new Vector3(0, 0, -100), this.scene);
        camera.fov = 0.8;
        var light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), this.scene);

        var character = new Character();
        character.init();

        players.addPlayer();
        character.setPlayerCharacter(0, "test");

        players.renderToScene(this.scene);

        stageList.setParams({scene: this.scene});
        stageList.init({scene: this.scene});

        stageList.currentSelection.run(this.scene);
    }
}

export default SceneMain;