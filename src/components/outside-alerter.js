import { useEffect, useRef } from "react";

/**
 * Component that alerts if you click outside of it
 */
export function OutsideAlerter(props) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, props.onClickOutside, props.customId);
  return <div ref={wrapperRef}>{props.children}</div>;
}

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref, func, customId) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event, func) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (!event.target.id.includes(customId)) {
          func?.();
        }
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", (e) => handleClickOutside(e, func));
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", (e) =>
        handleClickOutside(e, func),
      );
    };
  }, [customId, func, ref]);
}
