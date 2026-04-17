import "@/styles/ThemeSwitch.css";
import { useState, useEffect } from "react";

export default function ThemeSwitch({ isDarkMode, onSave, onClose }) {
    const [newTheme, setNewTheme] = useState(isDarkMode);

    const handleToggle = () => {
        setNewTheme(!newTheme);
    };

    const handleSave = () => {
        onSave(newTheme);
        onClose();
    };

    const handleCancel = () => {
        if (isDarkMode) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
        onClose();
    };

    useEffect(() => {
        if (newTheme) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [newTheme]);

    return (
        <div
            className="overlay"
            onClick={onClose}
        >
            <div
                className="switch-block"
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
                    <button
                        className="cancel-btn"
                        onClick={handleCancel}
                    >
                        CANCEL
                    </button>
                    <button
                        className="save-btn"
                        onClick={handleSave}
                    >
                        SAVE
                    </button>
                </div>
            </div>
        </div>
    );
}
