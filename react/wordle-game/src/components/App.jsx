"use client";
import { useState, useEffect } from "react";
import Header from "./Header";
import GameBoard from "./GameBoard";
import InfoBlock from "./InfoBlock";
import Keyboard from "./Keyboard";

export default function App() {
    const initialBoard = Array.from({ length: 6 }, () => Array(5).fill(""));

    const [tiles, setTiles] = useState(initialBoard);
    const [currentRow, setCurrentRow] = useState(0);
    const [currentCol, setCurrentCol] = useState(0);

    const handleKeyPress = (key) => {
        if (currentRow > 5) return;

        if (key === "BACKSPACE") {
            if (currentCol > 0) {
                const newTiles = structuredClone(tiles);
                newTiles[currentRow][currentCol - 1] = "";
                setTiles(newTiles);
                setCurrentCol(currentCol - 1);
            }
        } 
        else if (key === "ENTER") {
            // TODO: Add word validation
            // if (currentCol === 5) {
            //     setCurrentRow(currentRow + 1);
            //     setCurrentCol(0);
            // }
        } 
        else {
            if (currentCol < 5) {
                const isLetter = /^[a-zA-Z]$/.test(key);
                if (!isLetter) {
                    return;
                }
                const newTiles = structuredClone(tiles);
                newTiles[currentRow][currentCol] = key;
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
    }, [tiles]);

    return (
        <>
            <Header />
            <InfoBlock />
            <GameBoard tiles={tiles} />
            <Keyboard onKeyPress={handleKeyPress} />
        </>
    );
}
