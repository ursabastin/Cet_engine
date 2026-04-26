import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import { useAttempt } from '../../context/AttemptContext';
import { generateMockingSentence } from '../../utils/sentenceGenerator';

export default function QuestionPalette({ 
  mock, 
  attempt, 
  currentIndex, 
  onNavigate, 
  onSubmit 
}) {
  const [activeSectionId, setActiveSectionId] = useState(mock.sections[0]?.section_id);

  // Flatten questions to get global index
  const flatQuestions = [];
  mock.sections.forEach(s => {
    s.questions.forEach(q => flatQuestions.push({ ...q, section_id: s.section_id }));
  });

  const { explanationTokens, useExplanationToken } = useAttempt();
  const [showExplanation, setShowExplanation] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [mockingSentence, setMockingSentence] = useState("");
  const [unlockedExplanations, setUnlockedExplanations] = useState({});

  useEffect(() => {
    // Auto update active section based on currentIndex
    const currentQ = flatQuestions[currentIndex];
    if (currentQ && currentQ.section_id !== activeSectionId) {
      setActiveSectionId(currentQ.section_id);
    }
    // Auto-hide explanation when switching questions
    setShowExplanation(false);
    setShowConfirmModal(false);
  }, [currentIndex]);

  const handleToggleExplanation = () => {
    if (showExplanation) {
      setShowExplanation(false);
      return;
    }

    const currentQ = flatQuestions[currentIndex];
    if (unlockedExplanations[currentQ.id]) {
      setShowExplanation(true);
      return;
    }

    setMockingSentence(generateMockingSentence());
    setShowConfirmModal(true);
  };

  const handleConfirmUnlock = () => {
    if (useExplanationToken()) {
      const currentQ = flatQuestions[currentIndex];
      setUnlockedExplanations(prev => ({ ...prev, [currentQ.id]: true }));
      setShowExplanation(true);
      setShowConfirmModal(false);
    } else {
      alert("Out of Explanation Tokens! Finish a mock test to earn 5 more.");
      setShowConfirmModal(false);
    }
  };

  const getCellState = (qId, idx) => {
    if (idx === currentIndex) return 'current';
    if (attempt.reviewMarked[qId]) return 'review';
    if (attempt.responses[qId]) return 'answered';
    return 'not_visited';
  };

  const getCellStyle = (state) => {
    switch(state) {
      case 'current':
        return { border: '2px solid var(--accent-primary)', color: 'var(--accent-primary)', background: 'var(--glass-bg)' };
      case 'answered':
        return { background: 'rgba(16, 185, 129, 0.25)', color: 'var(--accent-success)', border: 'none' };
      case 'review':
        return { background: 'rgba(245, 158, 11, 0.25)', color: 'var(--accent-warning)', border: 'none' };
      case 'not_visited':
      default:
        return { background: 'var(--glass-bg)', color: 'var(--text-tertiary)', border: 'none' };
    }
  };

  const activeSection = mock.sections.find(s => s.section_id === activeSectionId);
  const sectionStartIndex = flatQuestions.findIndex(q => q.section_id === activeSectionId);

  return (
    <div className="glass-deep" style={{ display: 'flex', flexDirection: 'column', height: '100%', borderRight: 'var(--glass-border)', padding: 'var(--space-md)', borderRadius: 0 }}>
      <div className="font-display text-secondary" style={{ fontSize: '13px', fontWeight: 600, marginBottom: 'var(--space-sm)' }}>
        Question Palette
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-xs)', marginBottom: 'var(--space-md)', flexWrap: 'wrap' }}>
        {mock.sections.map(s => (
          <div 
            key={s.section_id}
            onClick={() => setActiveSectionId(s.section_id)}
            style={{
              padding: '2px 8px',
              borderRadius: 'var(--radius-pill)',
              fontSize: '11px',
              fontWeight: 500,
              cursor: 'pointer',
              background: activeSectionId === s.section_id ? 'var(--accent-primary-glow)' : 'var(--glass-bg)',
              color: activeSectionId === s.section_id ? 'var(--accent-primary)' : 'var(--text-secondary)'
            }}
          >
            {s.subject.substring(0, 4).toUpperCase()}
          </div>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', alignContent: 'start' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px' }}>
          {activeSection?.questions.map((q, idx) => {
            const globalIdx = sectionStartIndex + idx;
            const state = getCellState(q.id, globalIdx);
            return (
              <div 
                key={q.id}
                onClick={() => onNavigate(globalIdx)}
                style={{
                  ...getCellStyle(state),
                  height: '44px',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500,
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                {globalIdx + 1}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ marginTop: 'var(--space-md)' }}>
        <button 
          onClick={handleToggleExplanation}
          style={{ width: '100%', padding: '8px', background: showExplanation ? 'var(--accent-primary-glow)' : 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: showExplanation ? 'var(--accent-primary)' : 'var(--text-secondary)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontFamily: 'var(--font-display)', fontSize: '12px', fontWeight: 600, transition: 'all 0.2s' }}
        >
          {showExplanation ? 'Hide Explanation' : `View Jutsu/Explanation (${explanationTokens} left)`}
        </button>
      </div>

      {showExplanation && flatQuestions[currentIndex]?.explanation && (
        <div className="glass" style={{ marginTop: 'var(--space-sm)', padding: 'var(--space-md)', borderRadius: 'var(--radius-sm)', fontSize: '12px', color: 'var(--text-secondary)', maxHeight: '150px', overflowY: 'auto', lineHeight: '1.5' }}>
          <strong style={{ color: 'var(--accent-primary)', display: 'block', marginBottom: '4px' }}>Secret Scroll (Explanation):</strong>
          {flatQuestions[currentIndex].explanation}
        </div>
      )}

      <div style={{ marginTop: 'var(--space-md)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '11px', fontFamily: 'var(--font-body)', color: 'var(--text-tertiary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-success)' }} /> Answered</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-warning)' }} /> Review</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--glass-bg)' }} /> Not Visited</div>
      </div>

      {showConfirmModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(0,0,0,0.8)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="glass-deep" style={{ padding: 'var(--space-2xl)', maxWidth: '400px', textAlign: 'center' }}>
            <h2 style={{ color: 'var(--accent-error)', marginBottom: 'var(--space-md)', fontFamily: 'var(--font-display)' }}>
              Hold on, Shinobi!
            </h2>
            <p style={{ color: 'var(--text-primary)', fontSize: '18px', marginBottom: 'var(--space-lg)', fontStyle: 'italic' }}>
              "{mockingSentence}"
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: 'var(--space-xl)' }}>
              Unlocking this explanation will cost <strong style={{ color: 'var(--accent-primary)' }}>1 Attempt Token</strong>. You currently have {explanationTokens}.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <Button variant="primary" onClick={() => setShowConfirmModal(false)} style={{ width: '100%' }}>
                I'll Use My Brain (Cancel)
              </Button>
              <Button variant="secondary" onClick={handleConfirmUnlock} style={{ width: '100%' }}>
                I'm Weak, Show Me (Use 1 Token)
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
