import React from 'react';
import { useTimer } from '../../hooks/useTimer';
import Button from '../ui/Button';

export default function TimerBar({ mockName, durationSeconds, onExpire, mockId, onSubmit }) {
  const { formattedTime, timeRemaining } = useTimer(durationSeconds, onExpire, mockId);
  
  let timeColor = 'var(--text-primary)';
  if (timeRemaining < 300) {
    timeColor = 'var(--accent-danger)';
  } else if (timeRemaining < 600) {
    timeColor = 'var(--accent-warning)';
  }

  return (
    <div className="glass" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', height: '60px', borderRadius: 0, borderBottom: 'var(--glass-border)', zIndex: 10 }}>
      <div className="font-display text-secondary" style={{ fontWeight: 600, fontSize: '16px' }}>
        {mockName}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xl)' }}>
        <div className="font-display" style={{ fontWeight: 700, fontSize: '24px', fontFamily: 'var(--font-mono)', color: timeColor, transition: 'color var(--transition-slow)' }}>
          {formattedTime}
        </div>
        <Button label="Submit Mock" variant="danger" onClick={onSubmit} size="sm" />
      </div>
    </div>
  );
}
