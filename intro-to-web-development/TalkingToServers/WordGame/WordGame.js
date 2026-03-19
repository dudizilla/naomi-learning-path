//user types
// when it reaches 5 letters and enter, validates the word

// check if it's a word
// check index by index if the letter matches
// if it doesn't, check if there are letters that exist in the word

//make array, remove item if exists in user output
// to avois marking 2 letters that are the same even though there's only one

VALIDATE_URL = "https://words.dev-apis.com/validate-word";
WORD_URL = "https://words.dev-apis.com/word-of-the-day";

let currentRow = 0;
let word = "";
let rowComplete = false;

const letterBoxes = document.querySelectorAll('.letter-box');


function isLetter(letter){
    return /^[a-zA-Z]$/.test(letter);
}

function emptyWord(){
    word = "";
}

function removeLastLetter(){
    word = word.substring(0,word.length-1);
}

function findRowBoxes(){
    const rowStart = currentRow * 5;
    const rowBoxes = [];

    for (let i = rowStart; i < rowStart + 5; i++) {
            rowBoxes.push(letterBoxes[i]);
    }

    return rowBoxes;
}

async function isWordOfTheDay(row) {

    const promise = await fetch(WORD_URL);
    const response = await promise.json();
    const wordOfTheDay = String(response.word);

    const guess = word.toUpperCase();
    const answer = wordOfTheDay.toUpperCase();

    console.log(`Guess is: "${guess}", Answer is: "${answer}"`); 
    console.log(guess === answer);
    console.log("remainingLetter before loop:", wordOfTheDay.split(""));

    let remainingLetter = answer.split("");
    let boxColors = ["gray", "gray", "gray", "gray", "gray"];

    for (let i=0;i<5;i++){
        if (guess[i] == answer[i]){
            boxColors[i] = "green";
            remainingLetter[i] = null;
        }
    }

    for (let i=0;i<5;i++){
        if (boxColors[i] === "gray"){
            let indexAnswer = remainingLetter.indexOf(guess[i]);
            if (indexAnswer != -1){
                boxColors[i] = "yellow";
                remainingLetter[indexAnswer] = null;
            }
        }
    }

    for (let i=0;i<5;i++){
        row[i].style.backgroundColor = boxColors[i];
        row[i].style.color = "#ebe7e7";
        row[i].disabled = true;
    }

}

async function checkWord(rowBoxes){
    console.log(`The word is ${word}`);

    const promise = await fetch(VALIDATE_URL,{
        method: "POST",
        body: JSON.stringify({"word": word})
    });

    const response = await promise.json();

    if (response.validWord){
        await isWordOfTheDay(rowBoxes);

        currentRow++;
        emptyWord();
        if (currentRow<6) {
            letterBoxes[currentRow * 5].focus();
        }

    }

    else{
        console.log("Not a valid word!");
        emptyWord();

        for(let i=0;i<5;i++){
            rowBoxes[i].value = "";
            letterBoxes[currentRow * 5].focus();
        }
        return; 
    }
}

function handleLetter(event,key,index,box){
    console.log("Matched letter!" + key);

    event.preventDefault();

    if (word.length < 5){
        word+=key;
        box.value = key;
        console.log(word);

        if ((index + 1) % 5 !== 0) 
            letterBoxes[index + 1].focus();
    }
    
    else event.preventDefault();
}

function handleBackspace(index,box){
    console.log("Backspace detected");

    box.value = "";

    if (index % 5 !== 0) {
        letterBoxes[index - 1].focus();
        removeLastLetter();
    }
}

function handleEnter(){
    console.log("Enter detected");
    
    const rowBoxes = findRowBoxes();
    const allFilled = rowBoxes.every(b => b.value !== '');
    console.log(allFilled);

    if (allFilled) {
        checkWord(rowBoxes);
    }
}

letterBoxes.forEach(
    (box, index) =>
        {
            box.addEventListener('keyup', function(event) {
                const key = event.key;

                 const boxRow = Math.floor(index / 5);
                 console.log(boxRow + " " + currentRow);

                if (boxRow > currentRow || key === " "){
                    event.preventDefault();
                    return;
                }
                
                if (isLetter(key)) {
                    handleLetter(event,key,index,box);
                }
                
                else if (key === 'Backspace') {
                    handleBackspace(index,box);
                }
                
                else if (key === 'Enter') {
                    handleEnter();
                }

                else event.preventDefault();

    });
});