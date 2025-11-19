import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const variant = isDark ? 'btn-outline-light' : 'btn-outline-dark';

  return (
    <button type="button" className={`btn btn-sm ${variant} theme-toggle`} onClick={toggleTheme} aria-pressed={!isDark}>
      {isDark ? 'Switch to Light' : 'Switch to Dark'} mode
    </button>
  );
};

export default ThemeToggle;
