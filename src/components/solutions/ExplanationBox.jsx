import React from 'react';

export default function ExplanationBox({ explanation }) {
  if (!explanation) return null;

  return (
    <div className="glass" style={{ padding: 'var(--space-lg)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--accent-success)', marginTop: 'var(--space-lg)', background: 'rgba(16, 185, 129, 0.05)' }}>
      <div className="font-display text-primary" style={{ fontSize: '14px', fontWeight: 600, marginBottom: 'var(--space-sm)', color: 'var(--accent-success)' }}>
        Explanation
      </div>
      <div className="font-body text-secondary" style={{ fontSize: '15px', lineHeight: 1.6 }}>
        {explanation}
      </div>
    </div>
  );
}
