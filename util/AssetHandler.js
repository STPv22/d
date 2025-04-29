
class assetHandler {
  constructor() {
    this.assetList = [];
    this.loadedNum = 0;
  }

  loadAsset(i, onLoad) {
    if (!this.assetList[i] || this.assetList[i].loaded) return;
    fetch(`./assets/${this.assetList[i].assetPath}`)
      .then((res) => {
        console.log('Fetched asset:', this.assetList[i].assetPath);
        this.assetList[i].asset = res;
        this.assetList[i].onLoad(res);
        this.assetList[i].loaded = true;
        onLoad();
      });
  }

  regAsset(assetLocation, onLoad) {
    if (this.assetList.some((file) => file.assetPath === assetLocation)) {
      console.log('Asset already registered:', assetLocation);
      return;
    }
    var file = {};
    file.assetPath = assetLocation;
    file.loaded = false;
    file.asset = null;
    file.onLoad = onLoad;

    this.assetList.push(file);  
  }
}

var AssetHandler = new assetHandler();
export default AssetHandler;