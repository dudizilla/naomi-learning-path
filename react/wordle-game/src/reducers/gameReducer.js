import { WORD_LENGTH, MAX_GUESSES } from "@/constants/game";
import { createBoard, evaluateGuess } from "@/utils/gameLogic";

export const createInitialState = () => ({
  tiles: createBoard(""),
  guess: [],
  currentRow: 0,
  currentCol: 0,
  status: createBoard("empty"),
  gameWon: false,
  keyStatus: {},
  isAnimating: false,
});

export const initialGameState = createInitialState();

export function gameReducer(state = initialGameState, action) {
  switch (action.type) {
    case "ADD_LETTER": {
      if (
        state.isAnimating ||
        state.gameWon ||
        state.currentRow >= MAX_GUESSES ||
        state.currentCol >= WORD_LENGTH ||
        state.keyStatus[action.letter] === "absent"
      )
        return state;
      const newTiles = structuredClone(state.tiles);
      newTiles[state.currentRow][state.currentCol] = action.letter;
      return {
        ...state,
        tiles: newTiles,
        guess: [...state.guess, action.letter],
        currentCol: state.currentCol + 1,
      };
    }
    case "REMOVE_LETTER": {
      if (state.isAnimating || state.gameWon || state.currentCol <= 0)
        return state;
      const newTiles = structuredClone(state.tiles);
      newTiles[state.currentRow][state.currentCol - 1] = "";
      const newGuess = [...state.guess];
      newGuess.pop();
      return {
        ...state,
        tiles: newTiles,
        guess: newGuess,
        currentCol: state.currentCol - 1,
      };
    }
    case "SUBMIT_GUESS": {
      if (state.gameWon) return state;
      const { newStatus, newKeyStatus, isWin } = evaluateGuess(
        action.guessWord,
        action.word,
        state.currentRow,
        state.status,
        state.keyStatus,
      );

      return {
        ...state,
        status: newStatus,
        keyStatus: newKeyStatus,
        gameWon: isWin,
        currentRow: state.currentRow + 1,
        currentCol: 0,
        guess: [],
      };
    }
    case "CLEAR_ROW": {
      const newTiles = structuredClone(state.tiles);
      for (let i = 0; i < WORD_LENGTH; i++) {
        newTiles[state.currentRow][i] = "";
      }
      return {
        ...state,
        tiles: newTiles,
        guess: [],
        currentCol: 0,
      };
    }
    case "SET_ANIMATING":
      return { ...state, isAnimating: action.isAnimating };
    case "RESTART":
      return createInitialState();
    default:
      return state;
  }
}
