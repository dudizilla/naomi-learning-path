"use client";
import { useState, useEffect } from "react";
import Header from "./Header";
import GameBoard from "./GameBoard";
import InfoBlock from "./InfoBlock";
import Keyboard from "./Keyboard";
import RestartButton from "./RestartButton";
import ThemeSwitch from "./ThemeSwitch";
import "@/styles/App.css";
import { useWordleGame } from "@/hooks/useWordleGame";
import { getItemFromLocalStorage } from "@/services/localStorage";

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
  const [showThemeSwitch, setShowThemeSwitch] = useState(false);
  const [isDarkMode, setIsDarkMode] = useLocalStorage("isDarkMode", false);

  const {
    tiles,
    status,
    keyStatus,
    loading,
    message,
    messageTrigger,
    isSpecialCaseMessage,
    handleKeyPress,
    handleRestart,
  } = useWordleGame(showThemeSwitch);

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
      {isSpecialCaseMessage && <RestartButton onGameRestart={handleRestart} />}
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
