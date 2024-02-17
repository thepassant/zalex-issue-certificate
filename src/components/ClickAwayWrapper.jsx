import { useRef } from "react";
import useClickAway from "../customHooks/useClickAway";
const ClickAwayWrapper = ({ children, onClickAwayCallback }) => {
  const wrapperRef = useRef(null);
  useClickAway(wrapperRef, onClickAwayCallback);

  return <span ref={wrapperRef}>{children}</span>;
};
export default ClickAwayWrapper;
