import React from 'react';

export default function OptionButton({ 
  optionLabel, 
  optionText, 
  isSelected, 
  onClick, 
  isResultView = false, 
  isCorrect = false, 
  isWrong = false 
}) {
  let bg = 'var(--glass-bg)';
  let border = 'var(--glass-border)';
  let letterBg = 'transparent';
  let letterBorder = 'var(--glass-border)';
  let letterColor = 'var(--text-secondary)';
  let leftBorder = 'none';

  if (isResultView) {
    if (isCorrect) {
      bg = 'rgba(16, 185, 129, 0.15)'; 
      border = '1px solid var(--accent-success)';
      letterBg = 'var(--accent-success)';
      letterBorder = 'none';
      letterColor = '#fff';
    } else if (isWrong) {
      bg = 'rgba(239, 68, 68, 0.15)'; 
      border = '1px solid var(--accent-danger)';
      letterBg = 'var(--accent-danger)';
      letterBorder = 'none';
      letterColor = '#fff';
    }
  } else {
    if (isSelected) {
      bg = 'var(--glass-bg-active)';
      border = '1px solid rgba(99, 102, 241, 0.5)'; 
      letterBg = 'var(--accent-primary)';
      letterBorder = 'none';
      letterColor = '#fff';
      leftBorder = '3px solid var(--accent-primary)';
    }
  }

  return (
    <div 
      className={`glass ${!isResultView ? 'hover:glass-hover' : ''}`}
      onClick={!isResultView ? onClick : undefined}
      style={{
        background: bg,
        border: border,
        borderLeft: leftBorder !== 'none' ? leftBorder : border,
        borderRadius: 'var(--radius-md)',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-md)',
        cursor: !isResultView ? 'pointer' : 'default',
        transition: 'var(--transition-fast)'
      }}
    >
      <div 
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: letterBg,
          border: letterBorder,
          color: letterColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: '14px',
          flexShrink: 0
        }}
      >
        {optionLabel}
      </div>
      <div className="font-body text-primary" style={{ fontSize: '15px' }}>
        {optionText}
      </div>
    </div>
  );
}
