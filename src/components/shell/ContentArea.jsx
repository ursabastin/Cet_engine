import React from 'react';

export default function ContentArea({ children }) {
  return (
    <div 
      style={{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: 'var(--space-xl)',
        position: 'relative'
      }}
    >
      {children}
    </div>
  );
}
