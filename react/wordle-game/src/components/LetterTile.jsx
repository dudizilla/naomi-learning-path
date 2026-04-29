import "@/styles/LetterTile.css";
import { useEffect, useState } from "react";
import { ANIMATION_DELAY_PER_TILE } from "@/constants/game";

export default function LetterTile({
  letter = "",
  status = "empty",
  position,
}) {
  const [showStatus, setShowStatus] = useState("empty");

  useEffect(() => {
    if (status !== "empty") {
      const timer = setTimeout(() => {
        setShowStatus(status);
      }, position * ANIMATION_DELAY_PER_TILE);
      return () => clearTimeout(timer);
    } else {
      setShowStatus("empty");
    }
  }, [status, position]);

  return <div className={`letter-board__item ${showStatus}`}>{letter}</div>;
}
