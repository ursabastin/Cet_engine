import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import CalendarModal from './../modals/CalendarModal';

export default function TopBar() {
  const examDate = new Date('2026-04-28T00:00:00Z');
  const now = new Date();
  const diffTime = examDate - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  let countdownText;
  let isExamDay = false;
  const [showCalendar, setShowCalendar] = useState(false);
  
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
        <img src="./favicon.svg" alt="Logo" style={{ width: '24px', height: '24px' }} />
        <span className="font-display text-primary" style={{ fontWeight: 600, fontSize: '18px' }}>CET Practice</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button 
          onClick={() => setShowCalendar(true)}
          style={{ background: 'transparent', border: '1px solid var(--glass-border)', padding: '4px 8px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}
          title="View Battle Plan Calendar"
        >
          <Calendar size={16} color="var(--accent-primary)" />
          <span style={{ fontSize: '12px', fontFamily: 'var(--font-display)', fontWeight: 600 }}>Schedule</span>
        </button>

        {isExamDay ? (
          <span className="font-display" style={{ fontWeight: 500, color: 'var(--accent-success)' }}>{countdownText}</span>
        ) : (
          <span className="font-display text-secondary" style={{ fontWeight: 500 }}>
            {countdownText}
          </span>
        )}
      </div>

      {showCalendar && <CalendarModal onClose={() => setShowCalendar(false)} />}
    </div>
  );
}
