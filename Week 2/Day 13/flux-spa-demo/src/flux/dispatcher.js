const listeners = new Set();

export function register(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export function dispatch(action) {
  listeners.forEach((listener) => listener(action));
}
