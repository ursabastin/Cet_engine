import React from 'react';
import Button from '../ui/Button';

export default function NavigationRow({ 
  onPrevious, 
  onNext, 
  onMarkReview, 
  onClear, 
  isFirst, 
  isLast, 
  hasSelection 
}) {
  return (
    <div className="glass" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', height: '64px', borderRadius: 0, borderTop: 'var(--glass-border)', zIndex: 10 }}>
      <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center' }}>
        <Button label="Previous" variant="ghost" onClick={onPrevious} disabled={isFirst} />
        {hasSelection && (
          <Button label="Clear Response" variant="ghost" onClick={onClear} />
        )}
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
        <Button label="Mark for Review & Next" variant="secondary" onClick={onMarkReview} />
        <Button label="Save & Next" variant="primary" onClick={onNext} />
      </div>
    </div>
  );
}
