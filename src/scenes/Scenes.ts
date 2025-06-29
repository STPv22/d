import ClassList from "../util/ClassList";
import SceneMain from "./SceneMain";

//why the HELL didn't I use the built in scene stuff???

var sceneList = new ClassList(SceneMain, "main");

sceneList.createInitFunction(({engine, scene}) => {
    engine = engine;
    scene = scene;
    new SceneMain(engine, scene).display();
});

export default sceneList;