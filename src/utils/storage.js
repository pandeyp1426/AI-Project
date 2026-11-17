export function readStored(key, fallback, validate, storage) {
  try {
    const target = storage ?? window.localStorage;
    const raw = target.getItem(key);
    if (raw === null) return { value: fallback, warning: '' };
    const parsed = JSON.parse(raw);
    if (!validate(parsed)) throw new Error('Invalid saved data');
    return { value: parsed, warning: '' };
  } catch {
    return { value: fallback, warning: 'Saved data could not be read. You can still use the site and save a fresh copy.' };
  }
}

export function writeStored(key, value, storage) {
  try {
    const target = storage ?? window.localStorage;
    target.setItem(key, JSON.stringify(value));
    return { ok: true, warning: '' };
  } catch {
    return { ok: false, warning: 'Your browser could not save this change. It will work for this visit, but may be lost after a refresh.' };
  }
}
