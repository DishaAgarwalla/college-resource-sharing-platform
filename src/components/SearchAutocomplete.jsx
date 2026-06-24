import { useState, useEffect, useRef } from 'react';
import './SearchAutocomplete.css';

const SearchAutocomplete = ({ 
  items, 
  onSelect, 
  placeholder = 'Search...',
  value,
  onChange,
  loading = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value || '');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (value !== undefined) {
      setSearchTerm(value);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = items.filter(item =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 10));
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [searchTerm, items]);

  const handleSelect = (item) => {
    setSearchTerm(item);
    setIsOpen(false);
    if (onSelect) onSelect(item);
    if (onChange) onChange(item);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!isOpen) return;

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
        if (selectedIndex >= 0) {
          handleSelect(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  return (
    <div className="search-autocomplete" ref={wrapperRef}>
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          ref={inputRef}
          type="text"
          className="search-autocomplete-input"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (onChange) onChange(e.target.value);
          }}
          onFocus={() => searchTerm.length > 0 && setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />
        {loading && <span className="search-loading-spinner"></span>}
        {searchTerm && (
          <button 
            className="search-clear"
            onClick={() => {
              setSearchTerm('');
              setIsOpen(false);
              if (onChange) onChange('');
            }}
          >
            ×
          </button>
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="autocomplete-dropdown">
          {suggestions.map((item, index) => (
            <div
              key={index}
              className={`autocomplete-item ${index === selectedIndex ? 'selected' : ''}`}
              onClick={() => handleSelect(item)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <span className="autocomplete-icon">📌</span>
              <span className="autocomplete-text">{item}</span>
              {searchTerm && (
                <span className="autocomplete-match">
                  {item.toLowerCase().includes(searchTerm.toLowerCase()) && (
                    <>
                      {item.substring(0, item.toLowerCase().indexOf(searchTerm.toLowerCase()))}
                      <strong>{searchTerm}</strong>
                      {item.substring(item.toLowerCase().indexOf(searchTerm.toLowerCase()) + searchTerm.length)}
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

export default SearchAutocomplete;