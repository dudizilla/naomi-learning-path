"use client";
import { useState, useEffect, useReducer } from "react";
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
  ANIMATION_TOTAL_DURATION,
} from "@/constants/game.js";
import { fetchWordOfTheDay, isValidWord } from "@/services/wordleApi";
import { gameReducer, createInitialState } from "@/reducers/gameReducer";

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
  const [gameState, dispatch] = useReducer(
    gameReducer,
    undefined,
    createInitialState,
  );
  const [word, setWord] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageTrigger, setMessageTrigger] = useState(0);
  const [showThemeSwitch, setShowThemeSwitch] = useState(false);
  const [isDarkMode, setIsDarkMode] = useLocalStorage("isDarkMode", false);

  const showMessage = (msg) => {
    setMessage(msg);
    setMessageTrigger((t) => t + 1);
  };
  const validateWord = async () => {
    const guessWord = gameState.guess.join("");

    try {
      const isWordValid = await isValidWord(guessWord);

      if (isWordValid) {
        dispatch({ type: "SET_ANIMATING", isAnimating: true });
        dispatch({ type: "SUBMIT_GUESS", guessWord, word });

        if (guessWord === word.toUpperCase()) {
          showMessage(MSG_WIN);
        } else {
          if (gameState.currentRow === MAX_GUESSES - 1) {
            showMessage(MSG_LOSS_PREFIX + word);
          }
        }
        setTimeout(() => {
          dispatch({ type: "SET_ANIMATING", isAnimating: false });
        }, ANIMATION_TOTAL_DURATION);
      } else {
        showMessage("Not a valid word. Try again.");
        dispatch({ type: "CLEAR_ROW" });
      }
    } catch (error) {
      showMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = async (key) => {
    if (showThemeSwitch) return;

    if (key === "ENTER") {
      if (gameState.currentCol === WORD_LENGTH) {
        setLoading(true);
        await validateWord();
      } else {
        showMessage("Not enough letters");
      }
    } else if (key === "BACKSPACE" || key === "⌫") {
      dispatch({ type: "REMOVE_LETTER" });
    } else {
      if (gameState.currentCol < WORD_LENGTH) {
        const isLetter = /^[a-zA-Z]$/.test(key);
        if (!isLetter) {
          return;
        }
        if (gameState.keyStatus[key] === "absent") {
          return;
        }
        dispatch({ type: "ADD_LETTER", letter: key });
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
  }, [gameState]);

  useEffect(() => {
    async function fetchWord() {
      try {
        const newWord = await fetchWordOfTheDay();
        setWord(newWord);
      } catch (error) {
        setMessage(error.message);
        setMessageTrigger((t) => t + 1);
      } finally {
        setLoading(false);
      }
    }
    fetchWord();
  }, []);

  const handleRestart = async () => {
    dispatch({ type: "RESTART" });
    showMessage("");
    setLoading(true);

    try {
      const newWord = await fetchWordOfTheDay();
      setWord(newWord);
    } catch (error) {
      showMessage(error.message);
    } finally {
      setLoading(false);
    }
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
      <GameBoard tiles={gameState.tiles} status={gameState.status} />
      {isSpecialCaseMessage && <Button onGameRestart={handleRestart} />}
      <Keyboard onKeyPress={handleKeyPress} keyStatus={gameState.keyStatus} />
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
