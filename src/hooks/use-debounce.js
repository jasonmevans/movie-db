import { useState, useEffect } from 'react';

/**
 * Adapted from https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci
 */
export default function useDebounce(value = '', timeout) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const t = window.setTimeout(() => {
      setDebouncedValue(value);
    }, timeout);

    return () => {
      window.clearTimeout(t);
    }
  }, [value, timeout]);

  return debouncedValue;
}
