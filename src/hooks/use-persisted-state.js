import { useState, useEffect } from 'react';

/**
 * Adapted from https://dev.to/selbekk/persisting-your-react-state-in-9-lines-of-code-9go
 */
export default function usePersistedState(key, defaultValue) {
  const [state, setState] = useState(
    () => JSON.parse(localStorage.getItem(key)) || defaultValue
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}
