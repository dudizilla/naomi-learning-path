import { MAX_GUESSES, WORD_LENGTH } from "@/constants/game";
function createBoard(filler) {
  return Array.from({ length: MAX_GUESSES }, () =>
    Array(WORD_LENGTH).fill(filler),
  );
}
