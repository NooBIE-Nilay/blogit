import { DEBOUNCE_DELAY } from "constants";

import { useRef } from "react";

const useFuncDebounce = func => {
  const timer = useRef(null);
  const debouncedFunc = (...args) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => func(...args), DEBOUNCE_DELAY);
  };

  return debouncedFunc;
};

export default useFuncDebounce;
