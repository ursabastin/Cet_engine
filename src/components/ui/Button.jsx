import React from 'react';

export default function Button({ 
  label, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  disabled = false, 
  fullWidth = false,
  children
}) {
  let bg = 'var(--accent-primary)';
  let color = '#fff';
  let border = 'none';
  let shadow = 'var(--shadow-glow)';

  if (variant === 'secondary') {
    bg = 'var(--glass-bg)';
    color = 'var(--accent-primary)';
    border = 'var(--glass-border)';
    shadow = 'none';
  } else if (variant === 'ghost') {
    bg = 'transparent';
    color = 'var(--text-secondary)';
    border = '1px solid transparent';
    shadow = 'none';
  } else if (variant === 'danger') {
    bg = 'var(--accent-danger)';
    color = '#fff';
    border = 'none';
    shadow = 'none';
  } else if (variant === 'warning') {
    bg = 'var(--accent-warning)';
    color = '#fff';
    border = 'none';
    shadow = 'none';
  }

  let padding = '8px 16px';
  let fontSize = '14px';
  if (size === 'sm') {
    padding = '6px 12px';
    fontSize = '12px';
  } else if (size === 'lg') {
    padding = '12px 24px';
    fontSize = '16px';
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: bg,
        color: color,
        border: border,
        borderRadius: 'var(--radius-md)',
        padding: padding,
        fontSize: fontSize,
        fontWeight: 600,
        fontFamily: 'var(--font-display)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        width: fullWidth ? '100%' : 'auto',
        opacity: disabled ? 0.4 : 1,
        transition: 'var(--transition-fast)',
        boxShadow: shadow,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px'
      }}
      onMouseEnter={(e) => {
        if (!disabled && variant === 'ghost') {
          e.currentTarget.style.border = 'var(--glass-border-hover)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && variant === 'ghost') {
          e.currentTarget.style.border = '1px solid transparent';
        }
      }}
    >
      {label || children}
    </button>
  );
}
