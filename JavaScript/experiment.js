const character = "Coffee";
let timesToRepeat = 10;

let sentence = "";
for(let i =0; i<timesToRepeat; i++){
    sentence += character;
}

console.log(sentence)

let result = "".padStart(timesToRepeat,character)
console.log(result)