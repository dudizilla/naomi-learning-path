import "@/styles/InfoBlock.css";
import { useState, useEffect } from "react";

export default function InfoBlock({
    loading,
    displayMessage,
    keepVisible = false,
    messageTrigger,
}) {
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        setShowMessage(true);

        if (!keepVisible) {
            const timer = setTimeout(() => {
                setShowMessage(false);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [displayMessage, keepVisible, messageTrigger]);

    return (
        <div className="info-block">
            {loading && <span className="loader" />}
            {!loading && displayMessage && showMessage ? (
                <h2 className="info-block__title"> {displayMessage} </h2>
            ) : null}
        </div>
    );
}
