import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      <span className="theme-toggle-icon">
        {isDark ? '🌙' : '☀️'}
      </span>
    </button>
  );
};