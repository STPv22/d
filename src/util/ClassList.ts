
class ClassList {
    content = {};
    defaultParams = {};
    currentSelectedName: string = 'default';
    currentSelection = this.content[this.currentSelectedName];
    initfunction;

    updateSelection() {
        this.currentSelection = this.content[this.currentSelectedName];
    }

    constructor(defaultValue : any, name : string) {
        this.content[name] = defaultValue;
        this.currentSelectedName = name;
        this.updateSelection();
    }

    setSelected(name: string) {
        if (this.content[name]) {
            this.currentSelectedName = name;
            this.updateSelection();
        } else {
            console.warn(`Content with name ${name} does not exist.`);
        }
    }

    setParams(params: Object) {
        this.defaultParams = params || {};
        this.updateSelection();
    }

    createInitFunction(func: Function) {
        if (this.initfunction) {
            console.warn("Init function already exists. Overwriting.");
        }
        this.initfunction = func;
    }

    init(params: Object) {
        if (this.initfunction) {
            this.initfunction(params);
        } else {
            this.content['default'] = new this.content['default'](params);
            this.updateSelection();
        }
    }

    addContent(value, name : string) {
        if (this.content[name]) {
            console.warn(`Content with name ${name} already exists. Overwriting.`);
        }
        this.content[name] = new value(this.defaultParams);
        this.updateSelection();
    }
}

export default ClassList;