import "@/styles/InfoBlock.css";
import { useState, useEffect } from "react";

export default function InfoBlock({ loading, displayMessage }) {
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        setShowMessage(true);

        const timer = setTimeout(() => {
      setShowMessage(false);
    }, 2000);

    return () => clearTimeout(timer);
    }, [displayMessage]);

    return (
        <div className="info-block">
            {loading && <span className="loader"> </span>}
            {!loading && displayMessage && showMessage ? (
                <h2 className="info-block__title"> {displayMessage} </h2>
            ) : null}
        </div>
    );
}
