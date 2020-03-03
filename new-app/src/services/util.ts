function generateUUID() {
    let d = new Date().getTime();
    let d2 = (performance && performance.now && (performance.now()*1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;
        if(d > 0){
            r = (d + r)%16 || 0;
            d = Math.floor(d/16);
        } else {
            r = (d2 + r)%16 || 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 || 0x8)).toString(16);
    });
}

function saveToStorage(key:any, value:any) {
    let strValue = JSON.stringify(value);
    localStorage.setItem(key, strValue);
}

function loadFromStorage(key:string) {
   let item = localStorage.getItem(key);
    return JSON.parse(<string>item);
}

export default {
    generateUUID,
    saveToStorage,
    loadFromStorage
}