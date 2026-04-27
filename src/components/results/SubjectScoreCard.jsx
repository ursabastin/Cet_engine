import React from 'react';
import Badge from '../ui/Badge';
import ProgressBar from '../ui/ProgressBar';

export default function SubjectScoreCard({ subjectKey, label, stats, totalMarks }) {
  const percentage = (stats.marks / totalMarks) * 100;
  
  return (
    <div className="glass" style={{ padding: 'var(--space-lg)', borderRadius: 'var(--radius-md)' }}>
      <Badge label={label} variant={subjectKey} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 'var(--space-sm) 0' }}>
        <div className="font-display" style={{ fontSize: '24px', fontWeight: 700, color: `var(--subject-${subjectKey}-solid)` }}>
          {stats.marks} / {totalMarks}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: 'var(--text-secondary)' }}>
           <span>{Math.floor((stats.timeTaken || 0) / 60)}m {Math.floor((stats.timeTaken || 0) % 60)}s</span>
        </div>
      </div>

      <ProgressBar value={percentage} variant={subjectKey} />

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-md)', fontSize: '12px', fontFamily: 'var(--font-body)', color: 'var(--text-tertiary)' }}>
        <span>Correct: {stats.correct}</span>
        <span>Wrong: {stats.wrong}</span>
        <span>Skipped: {stats.skipped}</span>
      </div>
    </div>
  );
}
