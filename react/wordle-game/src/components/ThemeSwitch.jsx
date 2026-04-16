import React from "react";
import "@/styles/ThemeSwitch.css";

export default function ThemeSwitch({ isDarkMode, toggleTheme, onClose }) {
    return (
        <div className="overlay" onClick={onClose}>
            <div className="switch-block" onClick={(e) => e.stopPropagation()}>
                <h2 className="switch-block__title">THEME</h2>
                    <input 
                        type="checkbox" 
                        className="theme-switch"
                        checked={isDarkMode} 
                        onChange={toggleTheme} 
                    />
                <div className="button-block">
                    <button className="cancel-btn" onClick={onClose}>
                        CANCEL
                    </button>
                    <button className="save-btn" onClick={toggleTheme}>
                        SAVE
                    </button>
                </div>
            </div>
        </div>
    );
}