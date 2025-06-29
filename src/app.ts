import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder, UniversalCamera } from "@babylonjs/core";
import * as GUI from '@babylonjs/gui'
import sceneList from "./scenes/Scenes";


class App {
    constructor() {
        // create the canvas html element and attach it to the webpage
        var canvas = document.createElement("canvas");
        canvas.id = "gameCanvas";
        document.body.appendChild(canvas);

        // initialize babylon scene and engine
        var engine = new Engine(canvas, true);
        var scene = new Scene(engine);
        

        const global2DLayer = GUI.AdvancedDynamicTexture.CreateFullscreenUI("2dLayerFront");
        var fpsCounter =  new GUI.TextBlock("fpsCounter", `FPS: ${engine.getFps().toFixed(2)}`);
        fpsCounter.width = "15%";
        fpsCounter.height = "10%";
        fpsCounter.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        fpsCounter.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        fpsCounter.color = "white";
        global2DLayer.addControl(fpsCounter);

        sceneList.init({engine: engine, scene: scene});
        sceneList.setParams({engine: engine, scene: scene});

        // hide/show the Inspector
        window.addEventListener("keydown", (ev) => {
            // Shift+Ctrl+Alt+I
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && (ev.key === "I" || ev.key === "i")) {
                if (scene.debugLayer.isVisible()) {
                    scene.debugLayer.hide();
                } else {
                    scene.debugLayer.show();
                }
            }
        });

        // run the main render loop
        engine.runRenderLoop(() => {
            scene.render();
        });
    }
}
new App();