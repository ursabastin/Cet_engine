import React from 'react';

export default function Badge({ label, variant = 'default' }) {
  let color = 'var(--text-secondary)';
  let bg = 'var(--glass-bg)';

  switch (variant) {
    case 'english':
      color = 'var(--subject-english-solid)';
      bg = 'var(--subject-english)';
      break;
    case 'reasoning':
      color = 'var(--subject-reasoning-solid)';
      bg = 'var(--subject-reasoning)';
      break;
    case 'gk':
    case 'general_knowledge':
      color = 'var(--subject-gk-solid)';
      bg = 'var(--subject-gk)';
      break;
    case 'computer':
      color = 'var(--subject-computer-solid)';
      bg = 'var(--subject-computer)';
      break;
    case 'must_do':
    case 'danger':
      color = 'var(--accent-danger)';
      bg = 'rgba(239, 68, 68, 0.2)'; 
      break;
    case 'high':
    case 'warning':
    case 'in_progress':
      color = 'var(--accent-warning)';
      bg = 'rgba(245, 158, 11, 0.2)'; 
      break;
    case 'moderate':
    case 'info':
      color = 'var(--accent-info)';
      bg = 'rgba(59, 130, 246, 0.2)'; 
      break;
    case 'completed':
    case 'success':
      color = 'var(--accent-success)';
      bg = 'rgba(16, 185, 129, 0.2)'; 
      break;
    case 'primary':
      color = 'var(--accent-primary)';
      bg = 'var(--accent-primary-glow)';
      break;
  }

  return (
    <span 
      style={{
        backgroundColor: bg,
        color: color,
        padding: '2px 10px',
        borderRadius: 'var(--radius-pill)',
        fontSize: '11px',
        fontWeight: 500,
        fontFamily: 'var(--font-display)',
        display: 'inline-block',
        whiteSpace: 'nowrap'
      }}
    >
      {label}
    </span>
  );
}
