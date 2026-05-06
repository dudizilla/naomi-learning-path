"use client";
import { useState, useEffect } from "react";
import Header from "./Header";
import GameBoard from "./GameBoard";
import InfoBlock from "./InfoBlock";
import Keyboard from "./Keyboard";
import Button from "./Button";
import ThemeSwitch from "./ThemeSwitch";
import "@/styles/App.css";
import {
  MSG_WIN,
  MSG_LOSS_PREFIX,
  WORD_LENGTH,
  MAX_GUESSES,
  VALIDATE_URL,
  ANIMATION_TOTAL_DURATION,
} from "@/constants/game.js";
import { createBoard, evaluateGuess } from "@/utils/gameLogic";
import { fetchWordOfTheDay } from "@/services/wordleApi";

const getItemFromLocalStorage = (key, initialValue) => {
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
    getItemFromLocalStorage(key, value),
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
  const [tiles, setTiles] = useState(createBoard(""));
  const [guess, setGuess] = useState([]);
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const [word, setWord] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageTrigger, setMessageTrigger] = useState(0);
  const [status, setStatus] = useState(createBoard("empty"));
  const [gameWon, setGameWon] = useState(false);
  const [keyStatus, setKeyStatus] = useState({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [showThemeSwitch, setShowThemeSwitch] = useState(false);
  const [isDarkMode, setIsDarkMode] = useLocalStorage("isDarkMode", false);

  function letterEval(guessWord) {
    const { newStatus, newKeyStatus, isWin } = evaluateGuess(
      guessWord,
      word,
      currentRow,
      status,
      keyStatus,
    );
    setKeyStatus(newKeyStatus);
    setStatus(newStatus);

    if (isWin) {
      setMessage(MSG_WIN);
      setMessageTrigger((t) => t + 1);
      setGameWon(true);
    } else {
      if (currentRow === MAX_GUESSES - 1) {
        setMessage(MSG_LOSS_PREFIX + word);
        setMessageTrigger((t) => t + 1);
      }
    }
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
        }, ANIMATION_TOTAL_DURATION);
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

  useEffect(() => {
    fetchWordOfTheDay();
  }, []);

  const handleRestart = () => {
    setTiles(createBoard(""));
    setGuess([]);
    setCurrentRow(0);
    setCurrentCol(0);
    setWord("");
    setLoading(true);
    setMessage("");
    setMessageTrigger((t) => t + 1);
    setStatus(createBoard("empty"));
    setGameWon(false);
    setKeyStatus({});

    fetchWordOfTheDay();
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
