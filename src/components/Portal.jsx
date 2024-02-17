import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { createWrapperAndAppendToBody } from "../constants/Helpers";

const Portal = ({ children, wrapperElement, wrapperElementId }) => {
  const [wrapper, setWrapper] = useState(null);

  useEffect(() => {
    let element = document.getElementById(wrapperElementId);
    // if element is not found with wrapperElementId or wrapperElementId is not provided,
    // create and append to body
    if (!element) {
      element = createWrapperAndAppendToBody(wrapperElement, wrapperElementId);
    }
    setWrapper(element);
  }, [wrapperElementId, wrapperElement]);

  // wrapper state will be null on the first render.
  if (wrapper === null) return null;

  return createPortal(children, wrapper);
};

export default Portal;
