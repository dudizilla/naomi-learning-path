import "@/styles/LetterTile.css"


export default function LetterTile(props) {
    return (
        <input
            type="text"
            className={`letter-board__item ${props.status}`} 
            maxLength="1"
            value={props.letter}
        />
    );
}
