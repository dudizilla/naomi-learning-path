import "@/styles/ThemeSwitch.css";
import { useState, useEffect, useRef } from "react";

export default function ThemeSwitch({ isDarkMode, onSave, onClose }) {
  const [newTheme, setNewTheme] = useState(isDarkMode);
  const modalRef = useRef(null);

  useEffect(() => {
    const modalElement = modalRef.current;
    if (!modalElement) return;
    const focusableElements = modalElement.querySelectorAll(
      'button, [href], input, [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    firstElement?.focus();

    const handleTabKeyPress = (event) => {
      if (event.key === "Tab") {
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    const handleEscapeKeyPress = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    modalElement.addEventListener("keydown", handleTabKeyPress);
    modalElement.addEventListener("keydown", handleEscapeKeyPress);

    return () => {
      modalElement.removeEventListener("keydown", handleTabKeyPress);
      modalElement.removeEventListener("keydown", handleEscapeKeyPress);
    };
  }, []);

  const handleToggle = () => {
    setNewTheme(!newTheme);
  };

  const handleSave = () => {
    onSave(newTheme);
    onClose();
  };

  const addDark = (boolTheme) => {
    if (boolTheme) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };

  const handleCancel = () => {
    addDark(isDarkMode);
    onClose();
  };

  useEffect(() => {
    addDark(newTheme);
  }, [newTheme]);

  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="switch-block"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="switch-block__title">THEME</h2>
        <input
          type="checkbox"
          className="theme-switch"
          checked={newTheme}
          onChange={handleToggle}
        />
        <div className="button-block">
          <button className="cancel-btn" onClick={handleCancel}>
            CANCEL
          </button>
          <button className="save-btn" onClick={handleSave}>
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
}
