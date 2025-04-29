import SceneBase from './SceneBase.js';
import Scenes from './Scenes.js';
import AssetHandler from '../util/AssetHandler.js';

export default class SceneLoading extends SceneBase {
    constructor() {
        super();
    }

    display(p) {
        p.background(0);
        p.fill(255);
        p.textAlign(p.CENTER);
        p.textSize(32);
        p.text('Loading...', p.width / 2, p.height / 2);
        //loading box
        var loadBox = {
            height: 80,
            width: p.width / 2,
            x: p.width / 2,
            y: p.height / 2 + 100,
        }
        p.rect(loadBox.x, loadBox.y, loadBox.width, loadBox.height);
        //ehh I could have just done stroke
        p.fill(0);
        p.rect(loadBox.x, loadBox.y, loadBox.width - 10, loadBox.height - 10);

        //actual loading bar
        p.fill(255);
        p.rect(loadBox.x, loadBox.y, loadBox.width - 20, loadBox.height - 20);
        AssetHandler.loadAsset(AssetHandler.loadedNum, () => {
            AssetHandler.loadedNum++;
        });
        p.text(`${AssetHandler.loadedNum}/${AssetHandler.assetList.length}`, loadBox.x, loadBox.y + 100);
        
        if (AssetHandler.loadedNum >= AssetHandler.assetList.length) {
            Scenes.setScene('game');
            return;
        }
    }
}