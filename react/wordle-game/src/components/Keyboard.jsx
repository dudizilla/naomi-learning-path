"use client";
import "@/styles/Keyboard.css";

// Notice the curly braces around onKeyPress!
export default function Keyboard({ onKeyPress }) {
    const keyboardLayout = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["ENTER", "Z", "X", "C", "V", "B", "N", "M",  "BACKSPACE"],
    ];

    return (
        <section className="keyboard">
            {keyboardLayout.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((letter) => (
                        <button
                            className={`keyboard__button ${
                                letter === "BACKSPACE" || letter === "ENTER"
                                    ? "special-key"
                                    : "normal-key"
                            }`}
                            key={letter}
                            onClick={() => onKeyPress(letter)}
                        >
                            {letter}
                        </button>
                    ))}
                </div>
            ))}
        </section>
    );
}