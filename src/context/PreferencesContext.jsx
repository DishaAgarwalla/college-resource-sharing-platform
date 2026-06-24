import { createContext, useContext } from 'react';
import useUserPreferences from '../hooks/useUserPreferences';

const PreferencesContext = createContext();

export const PreferencesProvider = ({ children }) => {
  const preferences = useUserPreferences();

  return (
    <PreferencesContext.Provider value={preferences}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within PreferencesProvider');
  }
  return context;
};

export default PreferencesContext;