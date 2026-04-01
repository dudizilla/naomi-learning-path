import "@/styles/LetterTile.css"

export default function LetterTile({letter = "", status = "empty", onLetterChange,id}) {
    return (
        <input
            id = {id}
            type="text"
            className={`letter-board__item ${status}`} 
            maxLength="1"
            value={letter}
            onChange={e => onLetterChange(e.target.value)}
        />
    );
}
