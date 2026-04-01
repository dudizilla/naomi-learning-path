"use client";
import "@/styles/GameBoard.css";
import LetterTile from "./LetterTile";
import { useState } from "react";

export default function GameBoard() {
    const board = Array(6)
        .fill(null)
        .map(() => {
            return Array(5).fill("");
        });

    const [tiles, setTiles] = useState(() => board);

    const handleLetter = (row, col, letter) => {
        console.log(`Received letter '${letter}' for Row ${row}, Col ${col}`);
        const updatedTiles = structuredClone(tiles);
        updatedTiles[row][col] = letter.toUpperCase();
        setTiles(updatedTiles);

        if (letter !== "" && col < 4) {
        const nextId = `${row}-${col + 1}`;
        const nextInput = document.getElementById(nextId);
        
        if (nextInput) {
            nextInput.focus();
        }
    }
    };
    console.log("Current React State:", tiles);

    return (
        <section className="letter-board">
            {tiles.map((row, rowIndex) =>
                row.map((currentLetter, colIndex) => (
                    <LetterTile
                        id = {`${rowIndex}-${colIndex}`}
                        key={`${rowIndex}-${colIndex}`}
                        letter={currentLetter}
                        onLetterChange={(newLetter) =>
                            handleLetter(rowIndex, colIndex, newLetter)
                        }
                    />
                )),
            )}
        </section>
    );
}
