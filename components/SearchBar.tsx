
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useRef } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onRandom: () => void;
  isLoading: boolean;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onRandom, isLoading, theme, onToggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
      setQuery(''); // Clear input
      setIsOpen(false); // Close modal
    }
  };

  const openSearch = () => {
    setIsOpen(true);
  };

  return (
    <>
      {/* Main Navigation Buttons */}
      <div className="navigation-controls">
        <button 
          onClick={openSearch} 
          className="nav-button" 
          disabled={isLoading}
          aria-label="Search"
        >
          Search
        </button>
        <button 
          onClick={onRandom} 
          className="nav-button" 
          disabled={isLoading}
          aria-label="Random topic"
        >
          Random
        </button>
        <button
          onClick={onToggleTheme}
          className="nav-button icon-only"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? (
             <svg className="theme-icon" viewBox="0 0 24 24">
               <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
             </svg>
          ) : (
             <svg className="theme-icon" viewBox="0 0 24 24">
               <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 0 0 0 1.41.996.996 0 0 0 1.41 0l1.06-1.06c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06z"/>
             </svg>
          )}
        </button>
      </div>

      {/* Search Modal Popup */}
      {isOpen && (
        <div className="search-modal-overlay" onClick={() => setIsOpen(false)}>
          <div 
            className="search-modal-content" 
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="search-modal-title"
          >
            <h2 id="search-modal-title" className="visually-hidden">Search for a topic</h2>
            <form onSubmit={handleSubmit} className="modal-form">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What are you looking for?"
                className="modal-search-input"
                disabled={isLoading}
              />
              <div className="modal-actions">
                <button 
                  type="button" 
                  onClick={() => setIsOpen(false)} 
                  className="modal-cancel-btn"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="modal-submit-btn" 
                  disabled={!query.trim() || isLoading}
                >
                  Go
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;
