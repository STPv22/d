import StageBase from "./StageBase";


class StageDefault extends StageBase {
    constructor(scene) {
        super(scene);
    }

    init() {
        this.createRect("solids", 0, -55, 0, 200, 80, 30);
    }
}

export default StageDefault; 