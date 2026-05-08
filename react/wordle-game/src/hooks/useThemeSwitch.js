import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useState, useEffect } from "react";
export function useThemeSwitch() {
  const [showThemeSwitch, setShowThemeSwitch] = useState(false);
  const [isDarkMode, setIsDarkMode] = useLocalStorage("isDarkMode", false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleSettings = () => {
    setShowThemeSwitch(true);
  };

  const closeSettings = () => {
    setShowThemeSwitch(false);
  };

  const saveTheme = (newValue) => {
    setIsDarkMode(newValue);
  };

  return {
    isDarkMode,
    showThemeSwitch,
    handleSettings,
    closeSettings,
    saveTheme,
  };
}
