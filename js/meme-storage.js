function saveToStorage(key, val) {
    if(loadFromStorage(key) === null) initStorage(key)
    localStorage.setItem(key, JSON.stringify(val))
    
}

function loadFromStorage(key) {
    var val = JSON.parse(localStorage.getItem(key))
    if(val === null){
        initStorage(key)  
        val = loadFromStorage(key)
    } 
    return val
}
function initStorage(key){
     localStorage.setItem(key, JSON.stringify([]))
}