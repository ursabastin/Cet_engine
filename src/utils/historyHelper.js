/**
 * Manages tracking of attempted questions to enable "Smart Exhaustion" logic.
 */

const STORAGE_KEY = 'cet_attempted_ids';

export function getAttemptedIds() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch (e) {
    return [];
  }
}

export function saveAttemptedIds(newIds) {
  try {
    const existing = getAttemptedIds();
    const combined = Array.from(new Set([...existing, ...newIds]));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(combined));
  } catch (e) {
    console.error('Error saving attempted IDs:', e);
  }
}

export function isAttempted(id) {
  const attempted = getAttemptedIds();
  return attempted.includes(id);
}
