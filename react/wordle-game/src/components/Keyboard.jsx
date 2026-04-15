"use client";
import "@/styles/Keyboard.css";

export default function Keyboard({ onKeyPress, keyStatus = {} }) {
    const keyboardLayout = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
    ];

    return (
        <section className="keyboard">
            {keyboardLayout.map((row, rowIndex) => (
                <div
                    key={rowIndex}
                    className="row"
                >
                    {row.map((letter) => {
                        const isSpecialKey =
                            letter === "⌫" || letter === "ENTER";
                        const status = keyStatus[letter] || "";
                        return (
                            <button
                                className={`keyboard__button ${
                                    isSpecialKey ? "special-key" : ""
                                } ${letter === "⌫" ? "backspace" : ""} ${status}`}
                                key={letter}
                                onClick={() => onKeyPress(letter)}
                            >
                                {letter}
                            </button>
                        );
                    })}
                </div>
            ))}
        </section>
    );
}
