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
    const [messageTrigger, setMessageTrigger] = useState(0);
    const [status, setStatus] = useState(initialBoard("empty"));
    const [gameWon, setGameWon] = useState(false);
    const [keyStatus, setKeyStatus] = useState({});

    const VALIDATE_URL = "https://words.dev-apis.com/validate-word";

    function letterEval(guessWord) {
        const newStatus = structuredClone(status);
        const newKeyStatus = { ...keyStatus };

        if (guessWord === word.toUpperCase()) {
            setMessage("🎉 You won!");
            setMessageTrigger(t => t + 1)
            setGameWon(true);
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
            if (currentRow === 5) {
                setMessage("😞 The word was: " + word);
                setMessageTrigger(t => t + 1)
            }
        }
        for (let i = 0; i < 5; i++) {
            const letter = guessWord[i];
            const letterStatus = newStatus[currentRow][i];
            const currentKeyStatus = keyStatus[letter];

            if (letterStatus === "correct") {
                newKeyStatus[letter] = "correct";
            } else if (
                letterStatus === "present" &&
                currentKeyStatus !== "correct"
            ) {
                newKeyStatus[letter] = "present";
            } else if (
                letterStatus === "absent" &&
                !["correct", "present"].includes(currentKeyStatus)
            ) {
                newKeyStatus[letter] = "absent";
            }
        }
        setKeyStatus(newKeyStatus);
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
                letterEval(guessWord);
                setCurrentRow(currentRow + 1);
                setCurrentCol(0);
            } else {
                setMessage("Not a valid word. Try again.");
                setMessageTrigger(t => t + 1)
                const newTiles = structuredClone(tiles);
                for (let i = 0; i < 5; i++) newTiles[currentRow][i] = "";
                setTiles(newTiles);
                setCurrentCol(0);
            }
            setGuess([]);
        } catch (error) {
            setMessage("Could not validate word. Try again.");
            setMessageTrigger(t => t + 1)
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
            } else {setMessage("Not enough letters");
                setMessageTrigger(t => t + 1)
            }
        
            return
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
                if (keyStatus[key] === "absent") {
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
            } catch (error) {
                console.error(error.message);
                setMessage("Could not load word. Try again.");
                setMessageTrigger(t => t + 1)
            } finally {
                setLoading(false);
            }
        };
        fetchWord();
    }, []);

    const isSpecialCaseMessage = [
        "😞 The word was: " + word,
        "🎉 You won!",
    ].includes(message);

    return (
        <>
            <Header />
            <InfoBlock
                loading={loading}
                displayMessage={message}
                keepVisible={isSpecialCaseMessage}
                messageTrigger={messageTrigger}
            />
            <GameBoard
                tiles={tiles}
                status={status}
            />
            <Keyboard
                onKeyPress={handleKeyPress}
                keyStatus={keyStatus}
            />
        </>
    );
}
