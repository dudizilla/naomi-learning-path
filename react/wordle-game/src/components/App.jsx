"use client";
import { useState, useEffect } from "react";
import Header from "./Header";
import GameBoard from "./GameBoard";
import InfoBlock from "./InfoBlock";
import Keyboard from "./Keyboard";
import Button from "./Button";
import ThemeSwitch from "./ThemeSwitch";
import "@/styles/App.css";
import "@/constants/game.js";

const MSG_WIN = "🎉 You won!";
const MSG_LOSS_PREFIX = "😞 The word was: ";

const getItemFromLocalStorae = (key, initialValue) => {
  try {
    if (typeof window === "undefined") {
      return initialValue;
    }

    const item = window.localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    } else {
      return initialValue;
    }
  } catch (error) {
    console.error(error);
    return initialValue;
  }
};

function useLocalStorage(key, value) {
  const [storedValue, setStoredValue] = useState(
    getItemFromLocalStorae(key, value),
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default function App() {
  const initialBoard = (filler) =>
    Array.from({ length: MAX_GUESSES }, () => Array(WORD_LENGTH).fill(filler));

  const [tiles, setTiles] = useState(initialBoard(""));
  const [guess, setGuess] = useState([]);
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const [word, setWord] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageTrigger, setMessageTrigger] = useState(0);
  const [status, setStatus] = useState(initialBoard("empty"));
  const [gameWon, setGameWon] = useState(false);
  const [keyStatus, setKeyStatus] = useState({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [showThemeSwitch, setShowThemeSwitch] = useState(false);
  const [isDarkMode, setIsDarkMode] = useLocalStorage("isDarkMode", false);

  const WORD_URL = "https://words.dev-apis.com/word-of-the-day?random=1";
  const VALIDATE_URL = "https://words.dev-apis.com/validate-word";

  function letterEval(guessWord) {
    const newStatus = structuredClone(status);
    const newKeyStatus = { ...keyStatus };

    if (guessWord === word.toUpperCase()) {
      setMessage(MSG_WIN);
      setMessageTrigger((t) => t + 1);
      setGameWon(true);
      for (let i = 0; i < WORD_LENGTH; i++)
        newStatus[currentRow][i] = "correct";
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
      if (currentRow === MAX_GUESSES) {
        setMessage(MSG_LOSS_PREFIX + word);
        setMessageTrigger((t) => t + 1);
      }
    }
    for (let i = 0; i < WORD_LENGTH; i++) {
      const letter = guessWord[i];
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
    setKeyStatus(newKeyStatus);
    setStatus(newStatus);
  }

  const validateWord = async () => {
    const guessWord = guess.join("");
    try {
      const fetchResponse = await fetch(VALIDATE_URL, {
        method: "POST",
        body: JSON.stringify({ word: guessWord }),
      });

      const response = await fetchResponse.json();

      if (response.validWord) {
        setIsAnimating(true);
        letterEval(guessWord);
        setCurrentRow(currentRow + 1);
        setCurrentCol(0);

        setTimeout(() => {
          setIsAnimating(false);
        }, 1800);
      } else {
        setMessage("Not a valid word. Try again.");
        setMessageTrigger((t) => t + 1);
        const newTiles = structuredClone(tiles);
        for (let i = 0; i < WORD_LENGTH; i++) newTiles[currentRow][i] = "";
        setTiles(newTiles);
        setCurrentCol(0);
      }
      setGuess([]);
    } catch (error) {
      setMessage("Could not validate word. Try again.");
      setMessageTrigger((t) => t + 1);
    }

    setLoading(false);
  };

  const handleKeyPress = async (key) => {
    if (showThemeSwitch) return;
    if (isAnimating) return;
    if (currentRow > MAX_GUESSES - 1) return;
    if (gameWon) return;

    if (key === "ENTER") {
      if (currentCol === WORD_LENGTH) {
        setLoading(true);
        await validateWord();
      } else {
        setMessage("Not enough letters");
        setMessageTrigger((t) => t + 1);
      }

      return;
    } else if (key === "BACKSPACE" || key === "⌫") {
      if (currentCol > 0) {
        const newTiles = structuredClone(tiles);
        newTiles[currentRow][currentCol - 1] = "";
        const newGuess = [...guess];
        newGuess.pop();
        setGuess(newGuess);
        setTiles(newTiles);
        setCurrentCol(currentCol - 1);
      }
    } else {
      if (currentCol < WORD_LENGTH) {
        const isLetter = /^[a-zA-Z]$/.test(key);
        if (!isLetter) {
          return;
        }
        if (keyStatus[key] === "absent") {
          return;
        }
        const newTiles = structuredClone(tiles);
        newTiles[currentRow][currentCol] = key;
        setGuess([...guess, key]);
        setTiles(newTiles);
        setCurrentCol(currentCol + 1);
      }
    }
  };

  useEffect(() => {
    const handlePhysicalKey = (event) => {
      const key = event.key.toUpperCase();
      handleKeyPress(key);
    };
    window.addEventListener("keydown", handlePhysicalKey);

    return () => {
      window.removeEventListener("keydown", handlePhysicalKey);
    };
  }, [tiles, guess, isAnimating]);

  const fetchWord = async () => {
    try {
      const response = await fetch(WORD_URL);
      if (!response.ok) {
        throw new Error(response.status);
      }
      const result = await response.json();
      setWord(result.word);
    } catch (error) {
      console.error(error.message);
      setMessage("Could not load word. Try again.");
      setMessageTrigger((t) => t + 1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWord();
  }, []);

  const handleRestart = () => {
    setTiles(initialBoard(""));
    setGuess([]);
    setCurrentRow(0);
    setCurrentCol(0);
    setWord("");
    setLoading(true);
    setMessage("");
    setMessageTrigger((t) => t + 1);
    setStatus(initialBoard("empty"));
    setGameWon(false);
    setKeyStatus({});

    fetchWord();
  };

  const handleSettings = () => {
    setShowThemeSwitch(true);
  };

  const closeSettings = () => {
    setShowThemeSwitch(false);
  };

  const saveTheme = (newValue) => {
    setIsDarkMode(newValue);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  const isSpecialCaseMessage =
    message === MSG_WIN || message.startsWith(MSG_LOSS_PREFIX);

  return (
    <div className="app-container">
      <Header onClick={handleSettings} />
      <InfoBlock
        loading={loading}
        displayMessage={message}
        keepVisible={isSpecialCaseMessage}
        messageTrigger={messageTrigger}
      />
      <GameBoard tiles={tiles} status={status} />
      {isSpecialCaseMessage && <Button onGameRestart={handleRestart} />}
      <Keyboard onKeyPress={handleKeyPress} keyStatus={keyStatus} />
      {showThemeSwitch && (
        <ThemeSwitch
          isDarkMode={isDarkMode}
          onSave={saveTheme}
          onClose={closeSettings}
        />
      )}
    </div>
  );
}
