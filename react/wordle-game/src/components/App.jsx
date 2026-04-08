"use client";
import { useState, useEffect } from "react";
import Header from "./Header";
import GameBoard from "./GameBoard";
import InfoBlock from "./InfoBlock";
import Keyboard from "./Keyboard";
import "@/styles/App.css";

export default function App() {
    const initialBoard = (filler) =>
        Array.from({ length: 6 }, () => Array(5).fill(filler));

    const [tiles, setTiles] = useState(initialBoard(""));
    const [guess, setGuess] = useState([]);
    const [currentRow, setCurrentRow] = useState(0);
    const [currentCol, setCurrentCol] = useState(0);
    const [word, setWord] = useState("");
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(initialBoard("empty"));
    const [gameWon, setGameWon] = useState(false)

    const VALIDATE_URL = "https://words.dev-apis.com/validate-word";

    function letterEval(guessWord) {
        const newStatus = structuredClone(status);

        if (guessWord === word.toUpperCase()) {
            setMessage("Congratulations, you won!! ");
            setGameWon(true)
            for (let i = 0; i < 5; i++) newStatus[currentRow][i] = "correct";
        } else {
            const remainingLetters = word.toUpperCase().split("");
            for (let i = 0; i < 5; i++) {
                if (guess[i] === word[i].toUpperCase()) {
                    newStatus[currentRow][i] = "correct";
                    remainingLetters[i] = null;
                }
            }
            for (let i = 0; i < 5; i++) {
                if (newStatus[currentRow][i] === "empty") {
                    let indexAnswer = remainingLetters.indexOf(guess[i]);
                    if (
                        indexAnswer !== -1 &&
                        newStatus[currentRow][i] !== "correct"
                    ) {
                        newStatus[currentRow][i] = "present";
                        remainingLetters[indexAnswer] = null;
                    } else {
                        newStatus[currentRow][i] = "absent";
                    }
                }
            }
        }
        setStatus(newStatus);
    }

    const validateWord = async () => {
        const guessWord = guess.join("");
        try {
            const fetchResponse = await fetch(VALIDATE_URL, {
                method: "POST",
                body: JSON.stringify({ word: guessWord }),
            });

            const response = await fetchResponse.json();

            if (response.validWord) {
                setMessage("Valid word!");
                letterEval(guessWord);
                setCurrentRow(currentRow + 1);
                setCurrentCol(0);
            } else {
                setMessage("Not a valid word. Try again.");
                const newTiles = structuredClone(tiles);
                for (let i = 0; i < 5; i++) newTiles[currentRow][i] = "";
                setTiles(newTiles);
                setCurrentCol(0);
            }
            setGuess([]);
        } catch (error) {
            setMessage("Could not validate word. Try again.");
        }

        setLoading(false);
    };

    const handleKeyPress = async (key) => {
        if (currentRow > 5) return;
        if (gameWon) return;

        if (key === "ENTER") {
            if (currentCol === 5) {
                setLoading(true);
                await validateWord();
            } else setMessage("Not enough letters");
        } else if (key === "BACKSPACE") {
            if (currentCol > 0) {
                const newTiles = structuredClone(tiles);
                newTiles[currentRow][currentCol - 1] = "";
                const newGuess = [...guess];
                newGuess.pop();
                setGuess(newGuess);
                setTiles(newTiles);
                setCurrentCol(currentCol - 1);
            }
        } else {
            if (currentCol < 5) {
                const isLetter = /^[a-zA-Z]$/.test(key);
                if (!isLetter) {
                    return;
                }
                const newTiles = structuredClone(tiles);
                newTiles[currentRow][currentCol] = key;
                setGuess([...guess, key]);
                setTiles(newTiles);
                setCurrentCol(currentCol + 1);
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
    }, [tiles, guess]);

    useEffect(() => {
        const WORD_URL = "https://words.dev-apis.com/word-of-the-day?random=1";
        const fetchWord = async () => {
            try {
                const response = await fetch(WORD_URL);
                if (!response.ok) {
                    throw new Error(response.status);
                }
                const result = await response.json();
                setWord(result.word);
                setMessage("Word fetched");
            } catch (error) {
                console.error(error.message);
                setMessage("Could not load word. Try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchWord();
    }, []);

    return (
        <>
            <Header />
            <InfoBlock
                loading={loading}
                displayMessage={message}
            />
            <GameBoard
                tiles={tiles}
                status={status}
            />
            <Keyboard onKeyPress={handleKeyPress} />
        </>
    );
}
