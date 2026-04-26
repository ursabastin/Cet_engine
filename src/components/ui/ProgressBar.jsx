import React from 'react';

export default function ProgressBar({ value = 0, variant = 'default', showLabel = false }) {
  let color = 'var(--accent-primary)';
  if (variant === 'success') color = 'var(--accent-success)';
  if (variant === 'warning') color = 'var(--accent-warning)';
  if (variant === 'danger') color = 'var(--accent-danger)';
  if (variant === 'english') color = 'var(--subject-english-solid)';
  if (variant === 'reasoning') color = 'var(--subject-reasoning-solid)';
  if (variant === 'gk') color = 'var(--subject-gk-solid)';
  if (variant === 'computer') color = 'var(--subject-computer-solid)';

  const pct = Math.max(0, Math.min(100, value));

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
      <div 
        style={{
          flex: 1,
          height: '6px',
          background: 'var(--glass-bg)',
          borderRadius: 'var(--radius-pill)',
          border: 'var(--glass-border)',
          overflow: 'hidden'
        }}
      >
        <div 
          style={{
            height: '100%',
            width: `${pct}%`,
            background: color,
            borderRadius: 'var(--radius-pill)',
            transition: 'width var(--transition-slow)'
          }}
        />
      </div>
      {showLabel && (
        <span style={{ fontSize: '13px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
          {Math.round(pct)}%
        </span>
      )}
    </div>
  );
}
