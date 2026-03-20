VALIDATE_URL = "https://words.dev-apis.com/validate-word";
WORD_URL = "https://words.dev-apis.com/word-of-the-day";

const yellow = "#edca03";
const gray = "#988d8d";
const green = "#0b750b";
const whiteishText = "#ebe7e7";

let currentRow = 0;
let word = "";
let rowComplete = false;
let gameOver = false;

const letterBoxes = document.querySelectorAll(".letter-board__item");
const restartButton = document.querySelector(".restart-button");
const infoBlock = document.querySelector(".info-block");
const messageWrapper = document.querySelector(".info-block__wrapper");
const loader = document.querySelector(".loader");
const heading2 = document.querySelector("h2");

function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
}

function emptyWord() {
    word = "";
}

function removeLastLetter() {
    console.log(`REMOVE LAST LETTER ${word}`);
    word = word.substring(0, word.length - 1);
}

function showLoader() {
    loader.style.display = "block";
}

function hideLoader() {
    loader.style.display = "none";
}

function clearMessage() {
    const existingMessage = messageWrapper.querySelector(".info-block__title");
    if (existingMessage) {
        existingMessage.remove();
    }
}

function displayMessage(message) {
    clearMessage();
    const headingMessage = document.createElement("h2");
    headingMessage.classList.add("info-block__title");
    headingMessage.textContent = message;
    messageWrapper.appendChild(headingMessage);
}

function findRowBoxes() {
    const rowStart = currentRow * 5;
    const rowBoxes = [];

    for (let i = rowStart; i < rowStart + 5; i++) {
        rowBoxes.push(letterBoxes[i]);
    }

    return rowBoxes;
}

function restartGame() {
    location.reload();
}

async function isWordOfTheDay(row) {
    const promise = await fetch(WORD_URL);
    const response = await promise.json();
    const wordOfTheDay = String(response.word);

    const guess = word.toUpperCase();
    const answer = wordOfTheDay.toUpperCase();

    let remainingLetter = answer.split("");
    let boxColors = [gray, gray, gray, gray, gray];

    for (let i = 0; i < 5; i++) {
        if (guess[i] == answer[i]) {
            boxColors[i] = green;
            remainingLetter[i] = null;
        }
    }

    for (let i = 0; i < 5; i++) {
        if (boxColors[i] === gray) {
            let indexAnswer = remainingLetter.indexOf(guess[i]);
            if (indexAnswer != -1) {
                boxColors[i] = yellow;
                remainingLetter[indexAnswer] = null;
            }
        }
    }

    for (let i = 0; i < 5; i++) {
        row[i].style.backgroundColor = boxColors[i];
        row[i].style.color = whiteishText;
        row[i].disabled = true;
    }

    hideLoader();
    const allGreen = boxColors.every((color) => color === green);
    if (allGreen) {
        gameOver = true;
        displayMessage("CONGRATULATIONS, YOU WON! 🥳");
        restartButton.style.visibility = "visible";
        restartButton.addEventListener("click", restartGame);
    }
}

async function checkWord(rowBoxes) {
    console.log(`The word is ${word}`);
    showLoader();
    const promise = await fetch(VALIDATE_URL, {
        method: "POST",
        body: JSON.stringify({ word: word }),
    });

    const response = await promise.json();

    if (response.validWord) {
        await isWordOfTheDay(rowBoxes);
        hideLoader();
        currentRow++;
        emptyWord();
        if (currentRow < 6) {
            letterBoxes[currentRow * 5].focus();
        }
    } else {
        hideLoader();
        displayMessage("Not a valid word! Try again.");
        emptyWord();

        for (let i = 0; i < 5; i++) {
            rowBoxes[i].value = "";
            letterBoxes[currentRow * 5].focus();
        }
        return;
    }
}

function replaceAtIndex(str,index,replacement){
    return str.slice(0,index) + replacement + str.slice(index+replacement.length);
}

function handleLetter(event, key, index, box) {

    //index da box, string
    console.log("Handle letter", box, word);
    event.preventDefault();

    if (word.length < 5) {
        console.log("Passou 1o IF")
        if (word.length===index+1){
            console.log("Entrou no replacement")
            replaceAtIndex(word,index,key);
            console.log(word, "REPLACE")
            box.value = key;
        }
        else{
            word+=key
            console.log(word);
            if ((index + 1) % 5 !== 0) letterBoxes[index + 1].focus();
            box.value = key;
        }
    } else event.preventDefault();
}

function handleBackspace(index, box) {
    console.log("Handle BACKSPACE", box, index);
    box.value = "";
    if (index % 5 !== 0) {
        letterBoxes[index - 1].focus();
    }
    removeLastLetter();
}

function handleEnter() {
    const rowBoxes = findRowBoxes();
    const allFilled = rowBoxes.every((b) => b.value !== "");
    console.log(allFilled);

    if (allFilled) {
        checkWord(rowBoxes);
    }
}

letterBoxes.forEach((box, index) => {
    box.addEventListener("keyup", function (event) {
        const key = event.key;

        clearMessage();

        const boxRow = Math.floor(index / 5);
        console.log(boxRow + " " + currentRow);

        if ((currentRow > 5) & word.length) {
            displayMessage("Oh no, you ran out of guesses :(");
            restartButton.style.visibility = "visible";
        }

        if (gameOver || boxRow > currentRow || key === " ") {
            event.preventDefault();
            return;
        }

        if (isLetter(key)) {
            handleLetter(event, key, index, box);
        } else if (key === "Backspace") {
            handleBackspace(index, box);
        } else if (key === "Enter") {
            handleEnter();
        } else event.preventDefault();
    });
});
