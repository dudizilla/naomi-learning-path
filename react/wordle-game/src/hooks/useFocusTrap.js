import { useEffect } from "react";

export function useFocusTrap(ref, isActive = true) {
  useEffect(() => {
    if (!isActive) return;
    const element = ref.current;
    if (!element) return;
    const focusableElements = element.querySelectorAll(
      'button, [href], input, [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    firstElement?.focus();

    const handleTabKeyPress = (event) => {
      if (event.key === "Tab") {
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    element.addEventListener("keydown", handleTabKeyPress);
    return () => {
      element.removeEventListener("keydown", handleTabKeyPress);
    };
  }, [ref, isActive]);
}
