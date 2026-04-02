"use client";
import "@/styles/Keyboard.css";

export default function Keyboard(handleKeyPress) {
    const keyboardLayout = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["ENTER", "Z", "X", "C", "V", "B", "N", "M",  "BACKSPACE"],
    ];

    function handleLetter(letter) {
        console.log(letter);
    }

    return (
        <section className="keyboard">
            {keyboardLayout.map((row) => (
                <div
                    key={row}
                    className="row"
                >
                    {row.map((letter) => (
                        <button
                            className={`keyboard__button ${
                                letter === "BACKSPACE" || letter === "ENTER"
                                    ? "special-key"
                                    : "normal-key"
                            }`}
                            key={letter}
                            onClick={() => handleLetter(letter)}
                        >
                            {letter}
                        </button>
                    ))}
                </div>
            ))}
        </section>
    );
}
