import "@/styles/LetterTile.css"

export default function LetterTile({ letter = "", status = "empty" }) {
    return (
        <div className={`letter-board__item ${status}`}>
            {letter}
        </div>
    );
}