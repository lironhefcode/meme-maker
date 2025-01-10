const words = [
"apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew", 
"kiwi", "lemon", "mango", "nectarine", "orange", "papaya", "quince", "raspberry", 
"strawberry", "tangerine", "ugli", "vanilla", "watermelon", "xigua", "yellow", "zebra", 
"ant", "bear", "cat", "dog", "elephant", "frog", "goat", "horse", "iguana", "jaguar", 
"kangaroo", "lion", "monkey", "narwhal", "octopus", "penguin", "quokka", "rabbit", 
"snake", "turtle", "unicorn", "vulture", "whale", "x-ray", "yak", "zebra", 
"airplane", "bicycle", "car", "drone", "engine", "ferry", "gondola", "helicopter", 
"icebreaker", "jet", "kayak", "limousine", "motorcycle", "nimbus", "omnibus", "parachute", 
"quad", "rickshaw", "sailboat", "tractor", "unicycle", "van", "wagon", "yacht", 
"zephyr", "algorithm", "binary", "cloud", "database", "encryption", "firewall", 
"gigabyte", "hardware", "internet", "javascript", "keyboard", "logic", "machine", 
"network", "object", "program", "query", "runtime", "server", "token", "update", 
"virtual", "web", "xenon", "yaml", "zip"
]


function getRandomText(){
    let text = ''
    for (let index = 0; index < 3; index++) {
        text += ' ' + words[getRandomInt(0,words.length-1)];
        
    }
    return text
}

function getRandomInt(min,max){
  return  Math.floor(Math.random() * max) + min
}