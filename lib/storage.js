export function readJSON(key, fallback) {                                                                  //
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

//Role: Persistence abstraction
// Does:
//
// Safely read/write JSON to localStorage
//
// Provide fallbacks when data is missing or corrupted
//
// Does NOT:
//
// Know cart structure details
//
// Contain business logic
//
// Modify UI
//
// This file exists so storage problems never crash the app.