import { useTheme } from '../context/ThemeContext';

/**
 * Custom hook for dark mode functionality
 * Uses the ThemeContext to provide dark mode state and controls
 * 
 * @returns {Object} { isDark, toggleTheme, setTheme }
 */
export const useDarkMode = () => {
  const { isDark, toggleTheme, setTheme } = useTheme();
  
  return {
    isDark,
    toggleTheme,
    setTheme,
    // Convenience methods
    enableDark: () => setTheme(true),
    enableLight: () => setTheme(false),
  };
};

export default useDarkMode;