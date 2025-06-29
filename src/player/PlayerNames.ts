

export var names = [];
export var nameSettings = {};

export var defaultSettings = {
    controller: null,
    keyboard: {
        
    }
}

export function getExistingNames() {
    var localNames = localStorage.getItem("playerNames")|| "[]";
    var localSettings = localStorage.getItem("playerNameSettings") || "{}";
    if (localNames) {
        names = JSON.parse(localNames);
    }
    if (localSettings) {
        nameSettings = JSON.parse(localSettings);
    }
}

export function addName(name: string) {
    if (names.includes(name)) {
        throw new Error(`Name ${name} already exists.`);
    }
    names.push(name);
    nameSettings[name] = defaultSettings;
    localStorage.setItem("playerNameSettings", JSON.stringify(nameSettings));
    localStorage.setItem("playerNames", JSON.stringify(names));
}