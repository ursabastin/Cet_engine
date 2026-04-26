import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function NavRail() {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredTab, setHoveredTab] = useState(null);

  const tabs = [
    { id: 'mocks', label: 'Mock Tests', path: '/home' },
    { id: 'practice', label: 'Subject Practice', path: '/home' },
    { id: 'progress', label: 'My Progress', path: '/home' },
    { id: 'guide', label: 'Study Guide', path: '/home' },
  ];

  const activeTabId = tabs.find(t => t.path === location.pathname)?.id || 'mocks';

  return (
    <div className="glass" style={{ display: 'flex', alignItems: 'flex-end', padding: '0 24px', height: '48px', borderRadius: '0', borderTop: 'var(--glass-border)', borderBottom: 'var(--glass-border)', position: 'relative', boxShadow: 'none', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
      <div style={{ display: 'flex', gap: '24px', height: '100%', position: 'relative' }}>
        {tabs.map(tab => {
          const isActive = activeTabId === tab.id;
          const isHovered = hoveredTab === tab.id;
          return (
            <div 
              key={tab.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                padding: '0 8px',
                cursor: 'pointer',
                transition: 'background-color var(--transition-base), color var(--transition-base)',
                color: isActive ? 'var(--accent-primary)' : isHovered ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: 500,
                fontFamily: 'var(--font-display)',
                backgroundColor: isActive || isHovered ? 'var(--glass-bg)' : 'transparent',
                borderTopLeftRadius: 'var(--radius-sm)',
                borderTopRightRadius: 'var(--radius-sm)'
              }}
              onClick={() => navigate(tab.path)}
              onMouseEnter={() => setHoveredTab(tab.id)}
              onMouseLeave={() => setHoveredTab(null)}
            >
              {tab.label}
              {isActive && (
                <div 
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: 'var(--accent-primary)'
                  }} 
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
