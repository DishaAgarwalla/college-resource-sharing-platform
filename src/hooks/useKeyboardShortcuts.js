import { useEffect } from 'react';

export const useKeyboardShortcuts = (shortcuts) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check for Ctrl/Cmd + key
      const isCtrl = event.ctrlKey || event.metaKey;
      
      // Check if input/textarea is focused - don't trigger shortcuts
      const target = event.target;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      Object.keys(shortcuts).forEach(key => {
        const shortcut = shortcuts[key];
        
        // Check if shortcut matches
        let match = false;
        
        if (shortcut.ctrl && !isCtrl) return;
        if (!shortcut.ctrl && isCtrl) return;
        
        if (typeof shortcut.key === 'string') {
          match = event.key.toLowerCase() === shortcut.key.toLowerCase();
        } else if (Array.isArray(shortcut.key)) {
          match = shortcut.key.some(k => event.key.toLowerCase() === k.toLowerCase());
        }
        
        if (match) {
          event.preventDefault();
          shortcut.action(event);
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
};

export default useKeyboardShortcuts;