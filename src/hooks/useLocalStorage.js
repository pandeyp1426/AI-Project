import { useCallback, useState } from 'react';
import { readStored, writeStored } from '../utils/storage.js';

export default function useLocalStorage(key, fallback, validate) {
  const [state, setState] = useState(() => readStored(key, fallback, validate));
  const save = useCallback((next) => {
    const value = typeof next === 'function' ? next(state.value) : next;
    if (!validate(value)) return false;
    const result = writeStored(key, value);
    setState({ value, warning: result.warning });
    return result.ok;
  }, [key, state.value, validate]);
  return [state.value, save, state.warning];
}
