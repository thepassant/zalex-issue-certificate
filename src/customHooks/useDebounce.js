import { useEffect, useRef } from "react";
import debounce from "lodash/debounce";

const useDebounce = (callback, delay) => {
  const debouncedFn = useRef(debounce(callback, delay));

  useEffect(() => {
    debouncedFn.current = debounce(callback, delay);
  }, [delay, callback]);

  return debouncedFn.current;
};
export default useDebounce;
