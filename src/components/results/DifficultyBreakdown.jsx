import React from 'react';
import ProgressBar from '../ui/ProgressBar';

export default function DifficultyBreakdown({ attempt, mock }) {
  const stats = {
    easy: { correct: 0, total: 0 },
    medium: { correct: 0, total: 0 },
    hard: { correct: 0, total: 0 }
  };

  if (mock && mock.sections) {
    mock.sections.forEach(s => {
      s.questions.forEach(q => {
        const diff = q.difficulty || 'medium';
        if (stats[diff]) {
          stats[diff].total++;
          if (attempt.responses[q.id] === q.answer) {
            stats[diff].correct++;
          }
        }
      });
    });
  }

  const renderRow = (label, diffStats, variant) => {
    if (diffStats.total === 0) return null;
    const pct = (diffStats.correct / diffStats.total) * 100;
    
    return (
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'var(--space-sm)' }}>
        <div className="font-body text-secondary" style={{ width: '80px', fontSize: '14px' }}>
          {label}
        </div>
        <div className="font-mono text-tertiary" style={{ width: '60px', fontSize: '12px', textAlign: 'right', marginRight: 'var(--space-md)' }}>
          {diffStats.correct}/{diffStats.total}
        </div>
        <div style={{ flex: 1 }}>
          <ProgressBar value={pct} variant={variant} showLabel />
        </div>
      </div>
    );
  };

  return (
    <div className="glass" style={{ padding: 'var(--space-xl)', borderRadius: 'var(--radius-lg)', width: '100%' }}>
      <h2 className="font-display text-primary" style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 var(--space-lg) 0' }}>
        Performance by Difficulty
      </h2>
      {renderRow('Easy', stats.easy, 'success')}
      {renderRow('Medium', stats.medium, 'warning')}
      {renderRow('Hard', stats.hard, 'danger')}
    </div>
  );
}
