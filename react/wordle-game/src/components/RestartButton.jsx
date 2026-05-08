import "@/styles/RestartButton.css";

export default function RestartButton({ onGameRestart }) {
  return (
    <button className="restart-button" onClick={onGameRestart}>
      Play Again
    </button>
  );
}
