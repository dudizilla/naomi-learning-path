import "@/styles/LetterTile.css"
import { useEffect, useState } from "react";

export default function LetterTile({ letter = "", status = "empty", position}) {
    
    const [showStatus, setShowStatus] = useState("empty")

    useEffect(() => {
        if (status !== "empty") {
            const timer = setTimeout(() => {
                setShowStatus(status)
            }, position*350)
            return () => clearTimeout(timer)
        }
        else {
            setShowStatus("empty")
        }
    }, [status,position])
    
    return (
        <div className={`letter-board__item ${showStatus}`}>
            {letter}
        </div>
    );
}