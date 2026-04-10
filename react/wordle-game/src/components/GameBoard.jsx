"use client";
import "@/styles/GameBoard.css";
import LetterTile from "./LetterTile";

export default function GameBoard({ tiles, status }) {
    return (
        <section className="letter-board">
            {tiles.map((row, rowIndex) =>
                row.map((currentLetter, colIndex) => (
                    <LetterTile
                        key={`${rowIndex}-${colIndex}`}
                        letter={currentLetter}
                        status={status[rowIndex][colIndex]}
                    />
                )),
            )}
        </section>
    );
}