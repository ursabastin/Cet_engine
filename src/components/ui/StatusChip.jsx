import React from 'react';

export default function StatusChip({ status, score }) {
  let text = 'Not Attempted';
  let color = 'var(--text-tertiary)';
  let dotColor = 'var(--text-tertiary)';

  if (status === 'in_progress') {
    text = 'In Progress';
    color = 'var(--accent-warning)';
    dotColor = 'var(--accent-warning)';
  } else if (status === 'completed') {
    text = `Score: ${score}`;
    color = 'var(--accent-success)';
    dotColor = 'var(--accent-success)';
  }

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontFamily: 'var(--font-body)', color: color, fontWeight: 500 }}>
      <div 
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: dotColor,
          animation: status === 'in_progress' ? 'pulse 1.5s infinite' : 'none'
        }}
      />
      {text}
      <style>{`
        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
