import { useLayoutEffect } from "react";

function useLockScroll({ targetElement = document.body, immediate = true }) {
  useLayoutEffect(() => {
    // Get original element overflow
    const originalStyle = targetElement
      ? window.getComputedStyle(targetElement).overflow
      : "auto";
    if (immediate && targetElement) {
      console.log("prevent scroll");
      // Prevent scrolling on mount
      targetElement.style.overflow = "hidden";
    }
    return () => {
      if (immediate && targetElement) {
        targetElement.style.overflow = originalStyle;
      }
    };
  }, [immediate, targetElement]);
}

export default useLockScroll;
