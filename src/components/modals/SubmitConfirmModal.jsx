import React, { useState } from 'react';
import Button from '../ui/Button';

export default function SubmitConfirmModal({ attempt, mock, onConfirm, onCancel }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const flatQuestions = [];
  if (mock && mock.sections) {
    mock.sections.forEach(s => {
      s.questions.forEach(q => flatQuestions.push(q));
    });
  }

  const totalQuestions = flatQuestions.length;
  const answeredCount = Object.keys(attempt?.responses || {}).filter(k => attempt.responses[k]).length;
  const reviewCount = Object.values(attempt?.reviewMarked || {}).filter(Boolean).length;
  const notAnsweredCount = totalQuestions - answeredCount;

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onConfirm();
    }, 800);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.60)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 200ms ease-out' }}>
      <div className="glass-deep" style={{ width: '480px', maxWidth: '90vw', padding: 'var(--space-xl)', animation: 'scaleIn 250ms ease-out' }}>
        <h2 className="font-display text-primary" style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 var(--space-lg) 0' }}>
          Submit Mock Test?
        </h2>

        <div className="glass-bg" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: 'var(--space-md)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-sm) var(--space-md)', borderBottom: 'var(--glass-border)' }}>
            <span className="font-body text-secondary">Answered:</span>
            <span className="font-display" style={{ color: 'var(--accent-success)', fontWeight: 600 }}>{answeredCount}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-sm) var(--space-md)', borderBottom: 'var(--glass-border)' }}>
            <span className="font-body text-secondary">Not Answered:</span>
            <span className="font-display" style={{ color: 'var(--accent-danger)', fontWeight: 600 }}>{notAnsweredCount}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-sm) var(--space-md)', borderBottom: 'var(--glass-border)' }}>
            <span className="font-body text-secondary">Marked Review:</span>
            <span className="font-display" style={{ color: 'var(--accent-warning)', fontWeight: 600 }}>{reviewCount}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-sm) var(--space-md)' }}>
            <span className="font-body text-secondary">Total Questions:</span>
            <span className="font-display text-primary" style={{ fontWeight: 600 }}>{totalQuestions}</span>
          </div>
        </div>

        <div className="font-body text-tertiary" style={{ fontSize: '13px', marginBottom: 'var(--space-xl)' }}>
          Unanswered questions will score 0. This cannot be undone.
        </div>

        {isSubmitting ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-sm)', padding: 'var(--space-sm) 0' }}>
            <div style={{ 
              width: '24px', 
              height: '24px', 
              border: '3px solid var(--accent-primary-glow)', 
              borderTopColor: 'var(--accent-primary)', 
              borderRadius: '50%', 
              animation: 'spin 1s linear infinite' 
            }} />
            <div className="font-body text-secondary" style={{ fontSize: '13px' }}>Calculating your score...</div>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-md)' }}>
            <Button label="Go Back" variant="ghost" onClick={onCancel} />
            <Button label="Submit Now" variant="danger" onClick={handleConfirm} />
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
