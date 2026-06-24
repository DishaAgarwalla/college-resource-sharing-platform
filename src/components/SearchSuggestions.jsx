import { useState, useEffect, useRef } from 'react';
import './SearchSuggestions.css';

const SearchSuggestions = ({ 
  suggestions, 
  onSelect, 
  query, 
  isVisible, 
  onClose,
  recentSearches = [] 
}) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const listRef = useRef(null);

  useEffect(() => {
    setSelectedIndex(-1);
  }, [query]);

  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const items = listRef.current.children;
      if (items[selectedIndex]) {
        items[selectedIndex].scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  const handleKeyDown = (e) => {
    if (!isVisible) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          onSelect(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        onClose();
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, selectedIndex, suggestions]);

  if (!isVisible || suggestions.length === 0) return null;

  return (
    <div className="search-suggestions">
      {recentSearches.length > 0 && query.length === 0 && (
        <div className="suggestions-section">
          <div className="suggestions-section-title">
            <span>🕐 Recent Searches</span>
          </div>
          {recentSearches.map((item, index) => (
            <div
              key={`recent-${index}`}
              className={`suggestion-item ${index === selectedIndex - suggestions.length ? 'selected' : ''}`}
              onClick={() => onSelect(item)}
            >
              <span className="suggestion-icon">🔍</span>
              <span>{item}</span>
              <span className="suggestion-remove" onClick={(e) => {
                e.stopPropagation();
                // Remove from recent searches
              }}>×</span>
            </div>
          ))}
        </div>
      )}

      {query.length > 0 && (
        <div className="suggestions-section">
          <div className="suggestions-section-title">
            <span>🔍 Suggestions</span>
          </div>
          {suggestions.map((item, index) => (
            <div
              key={`suggestion-${index}`}
              className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
              onClick={() => onSelect(item)}
            >
              <span className="suggestion-icon">📌</span>
              <span className="suggestion-text">{item}</span>
              {item.includes(query) && (
                <span className="suggestion-match">
                  {item.toLowerCase().indexOf(query.toLowerCase()) !== -1 && (
                    <>
                      {item.substring(0, item.toLowerCase().indexOf(query.toLowerCase()))}
                      <strong>{query}</strong>
                      {item.substring(item.toLowerCase().indexOf(query.toLowerCase()) + query.length)}
                    </>
                  )}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchSuggestions;