import React from 'react';

export default function TopBar() {
  const examDate = new Date('2026-04-28T00:00:00Z');
  const now = new Date();
  const diffTime = examDate - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  let countdownText;
  let isExamDay = false;
  
  if (diffDays > 0) {
    countdownText = `Exam in ${diffDays} days`;
  } else if (diffDays === 0) {
    countdownText = 'Exam Day!';
    isExamDay = true;
  } else {
    countdownText = 'Exam Completed';
  }

  return (
    <div className="glass" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', height: '56px', borderRadius: '0', borderBottom: 'var(--glass-border)', zIndex: 50, position: 'relative', boxShadow: 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img src="/favicon.svg" alt="Logo" style={{ width: '24px', height: '24px' }} />
        <span className="font-display text-primary" style={{ fontWeight: 600, fontSize: '18px' }}>CET Practice</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {isExamDay ? (
          <span className="font-display" style={{ fontWeight: 500, color: 'var(--accent-success)' }}>{countdownText}</span>
        ) : (
          <span className="font-display text-secondary" style={{ fontWeight: 500 }}>
            {countdownText}
          </span>
        )}
      </div>
    </div>
  );
}
