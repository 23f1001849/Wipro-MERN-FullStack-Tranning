import { createContext, useContext, useMemo, useState } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState('dark');
  const value = useMemo(() => ({ mode, toggle: () => setMode((prev) => (prev === 'dark' ? 'light' : 'dark')) }), [mode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('ThemeProvider missing');
  }
  return ctx;
}
