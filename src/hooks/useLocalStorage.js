import { useCallback, useState } from 'react';
import { readStored, writeStored } from '../utils/storage.js';

export default function useLocalStorage(
  key,
  fallback,
  validate,
  { requirePersistence = false } = {},
) {
  const [state, setState] = useState(() => readStored(key, fallback, validate));
  const save = useCallback(
    (next) => {
      const value = typeof next === 'function' ? next(state.value) : next;
      if (!validate(value)) return false;
      const result = writeStored(key, value);
      // Favorites can work in memory; a saved itinerary must never claim a failed write succeeded.
      setState({
        value: result.ok || !requirePersistence ? value : state.value,
        warning: result.warning,
      });
      return result.ok;
    },
    [key, state.value, validate, requirePersistence],
  );
  return [state.value, save, state.warning];
}
