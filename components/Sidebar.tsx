
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

interface SidebarProps {
  history: string[];
  onSelectTopic: (topic: string) => void;
  currentTopic: string;
  onClearHistory: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ history, onSelectTopic, currentTopic, onClearHistory }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>History</h2>
        {history.length > 0 && (
          <button 
            onClick={onClearHistory} 
            className="clear-history-btn"
            aria-label="Clear history"
          >
            Clear
          </button>
        )}
      </div>
      <nav className="history-list-container">
        {history.length === 0 ? (
          <p className="empty-history">Your journey begins here.</p>
        ) : (
          <ul className="history-list">
            {history.map((topic, index) => (
              <li key={`${topic}-${index}`}>
                <button
                  className={`history-item ${topic === currentTopic ? 'active' : ''}`}
                  onClick={() => onSelectTopic(topic)}
                >
                  {topic}
                </button>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
