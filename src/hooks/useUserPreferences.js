import { useState, useEffect } from 'react';

const PREFERENCES_KEY = 'userPreferences';

const defaultPreferences = {
  theme: 'light',
  viewMode: 'grid',
  itemsPerPage: 12,
  defaultSort: 'newest',
  showSearchHistory: true,
  autoSaveSearch: true,
  language: 'en',
  emailNotifications: true,
  resourceNotifications: true,
  soundEnabled: true,
  compactMode: false
};

export const useUserPreferences = () => {
  const [preferences, setPreferences] = useState(defaultPreferences);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(PREFERENCES_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setPreferences({ ...defaultPreferences, ...parsed });
      } catch {
        setPreferences(defaultPreferences);
      }
    }
    setIsLoaded(true);
  }, []);

  const savePreferences = (newPrefs) => {
    const updated = { ...preferences, ...newPrefs };
    setPreferences(updated);
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
    return updated;
  };

  const getPreference = (key) => {
    return preferences[key];
  };

  const updatePreference = (key, value) => {
    return savePreferences({ [key]: value });
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(defaultPreferences));
    return defaultPreferences;
  };

  return {
    preferences,
    isLoaded,
    savePreferences,
    getPreference,
    updatePreference,
    resetPreferences
  };
};

export default useUserPreferences;