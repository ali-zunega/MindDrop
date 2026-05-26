function storageKey(userId) {
  return `minddrop-notes-${userId}`;
}

export function loadNotes(userId, fallback) {
  const key = storageKey(userId);
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  const oldRaw = localStorage.getItem("minddrop-notes");
  if (oldRaw) {
    try {
      const notes = JSON.parse(oldRaw);
      localStorage.setItem(key, JSON.stringify(notes));
      localStorage.removeItem("minddrop-notes");
      return notes;
    } catch {
      // ignore
    }
  }
  return structuredClone(fallback);
}

export function saveNotes(userId, notes) {
  try {
    localStorage.setItem(storageKey(userId), JSON.stringify(notes));
  } catch {
    // ignore
  }
}
