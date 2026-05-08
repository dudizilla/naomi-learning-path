"use client";
import "@/styles/App.css";
import Header from "./Header";
import GameBoard from "./GameBoard";
import InfoBlock from "./InfoBlock";
import Keyboard from "./Keyboard";
import RestartButton from "./RestartButton";
import ThemeSwitch from "./ThemeSwitch";
import { useWordleGame } from "@/hooks/useWordleGame";
import { useThemeSwitch } from "@/hooks/useThemeSwitch";

export default function App() {
  const {
    isDarkMode,
    showThemeSwitch,
    handleSettings,
    closeSettings,
    saveTheme,
  } = useThemeSwitch();

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
