"use client";
import { useState, useEffect } from "react";
import Header from "./Header";
import GameBoard from "./GameBoard";
import InfoBlock from "./InfoBlock";
import Keyboard from "./Keyboard";
import "@/styles/App.css";

export default function App() {
    const initialBoard = Array.from({ length: 6 }, () => Array(5).fill(""));

    const [tiles, setTiles] = useState(initialBoard);
    const [guess, setGuess] = useState([]);
    const [currentRow, setCurrentRow] = useState(0);
    const [currentCol, setCurrentCol] = useState(0);
    const [word, setWord] = useState("");
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    const handleKeyPress = (key) => {
        if (currentRow > 5) return;

        if (key === "ENTER") {
            //TODO: Add word validation
            if (currentCol === 5) {
                setCurrentRow(currentRow + 1);
                setGuess([]);
                setCurrentCol(0);
            }
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
                setMessage("Word fetched")
            } catch (error) {
                console.error(error.message);
                setMessage("Could not load word. Try again.")
            } finally {
                setLoading(false);
            }
        };
        fetchWord();
    }, []);

    return (
        <>
            <Header />
            <InfoBlock loading={loading} displayMessage={message} />
            <GameBoard tiles={tiles} />
            <Keyboard onKeyPress={handleKeyPress} />
        </>
    );
}
