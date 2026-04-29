import "@/styles/InfoBlock.css";
import { useState, useEffect } from "react";
import { MESSAGE_DISPLAY_DURATION } from "@/constants/game";

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
      }, MESSAGE_DISPLAY_DURATION);

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
