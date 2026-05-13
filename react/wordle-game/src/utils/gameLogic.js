import { MAX_GUESSES, WORD_LENGTH } from "@/constants/game";
export function createBoard(filler) {
  return Array.from({ length: MAX_GUESSES }, () =>
    Array(WORD_LENGTH).fill(filler),
  );
}

export function evaluateGuess(guess, word, currentRow, status, keyStatus) {
  const newStatus = structuredClone(status);
  const newKeyStatus = { ...keyStatus };
  const isWin = guess === word.toUpperCase();

  if (isWin) {
    for (let i = 0; i < WORD_LENGTH; i++) newStatus[currentRow][i] = "correct";
  } else {
    const remainingLetters = word.toUpperCase().split("");
    for (let i = 0; i < WORD_LENGTH; i++) {
      if (guess[i] === word[i].toUpperCase()) {
        newStatus[currentRow][i] = "correct";
        remainingLetters[i] = null;
      }
    }
    for (let i = 0; i < WORD_LENGTH; i++) {
      if (newStatus[currentRow][i] === "empty") {
        let indexAnswer = remainingLetters.indexOf(guess[i]);
        if (indexAnswer !== -1 && newStatus[currentRow][i] !== "correct") {
          newStatus[currentRow][i] = "present";
          remainingLetters[indexAnswer] = null;
        } else {
          newStatus[currentRow][i] = "absent";
        }
      }
    }
  }
  for (let i = 0; i < WORD_LENGTH; i++) {
    const letter = guess[i];
    const letterStatus = newStatus[currentRow][i];
    const currentKeyStatus = newKeyStatus[letter];

    if (letterStatus === "correct") {
      newKeyStatus[letter] = "correct";
    } else if (letterStatus === "present" && currentKeyStatus !== "correct") {
      newKeyStatus[letter] = "present";
    } else if (
      letterStatus === "absent" &&
      !["correct", "present"].includes(currentKeyStatus)
    ) {
      newKeyStatus[letter] = "absent";
    }
  }
  return { newStatus, newKeyStatus, isWin };
}
