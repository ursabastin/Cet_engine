import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';
import StatusChip from '../ui/StatusChip';
import { useMockLoader } from '../../hooks/useMockLoader';

export default function MockCard({ mock, index }) {
  const navigate = useNavigate();
  const { getMockStatus } = useMockLoader();
  const [isHovered, setIsHovered] = useState(false);

  const status = getMockStatus(mock.id);
  
  let percentage = 0;
  let scoreText = '0/0';
  let isCompleted = status === 'completed';
  let isInProgress = status === 'in_progress';
  
  const savedStr = localStorage.getItem(`attempt_${mock.id}`);
  if (savedStr) {
    try {
      const attempt = JSON.parse(savedStr);
      if (attempt.result) {
        percentage = attempt.result.percentage;
        scoreText = `${attempt.result.earnedMarks}/${attempt.result.totalMarks}`;
      } else if (attempt.responses) {
        const answered = Object.keys(attempt.responses).length;
        percentage = (answered / mock.totalQuestions) * 100;
      }
    } catch (e) {}
  }

  const isMock18 = mock.id === 'FULL-MOCK-18';
  let typeBadgeVariant = isCompleted ? 'success' : (isInProgress ? 'warning' : 'primary');
  let typeBadgeLabel = isMock18 ? 'English + Reasoning' : 'Full Mock';
  
  const handleAction = () => {
    if (isCompleted) {
      navigate(`/results/${mock.id}`);
    } else {
      navigate(`/mock/${mock.id}`);
    }
  };

  return (
    <div 
      className={`glass ${isHovered ? 'glass-hover' : ''}`}
      style={{
        width: '100%',
        cursor: 'pointer',
        padding: 'var(--space-lg)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-md)',
        animationDelay: `${index * 40}ms`,
        animationName: 'cardEntrance',
        animationDuration: '400ms',
        animationFillMode: 'both',
        borderColor: isCompleted ? 'rgba(16, 185, 129, 0.2)' : undefined 
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleAction}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Badge label={typeBadgeLabel} variant={typeBadgeVariant} />
        <span className="font-mono text-secondary" style={{ fontSize: '13px' }}>
          {mock.id.replace('FULL-MOCK-', 'Mock ')}
        </span>
      </div>

      <div className="font-display text-primary" style={{ fontWeight: 700, fontSize: '18px' }}>
        {mock.displayName}
      </div>

      <div className="font-body text-tertiary" style={{ fontSize: '13px' }}>
        {mock.totalQuestions} Questions · {Math.round(mock.durationSeconds / 60)} min · {mock.totalMarks} Marks
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
        {mock.subjects.map(sub => (
          <Badge key={sub} label={sub.charAt(0).toUpperCase() + sub.slice(1).replace('_', ' ')} variant={sub} />
        ))}
      </div>

      {status !== 'not_started' && (
        <div style={{ marginTop: 'var(--space-sm)' }}>
          <ProgressBar value={percentage} variant={isCompleted ? 'success' : 'primary'} showLabel />
        </div>
      )}

      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: 'var(--space-sm)' }}>
        <StatusChip status={status} score={scoreText} />
      </div>

      <div style={{ marginTop: 'var(--space-sm)' }}>
        <Button 
          label={isCompleted ? 'Review' : (isInProgress ? 'Resume' : 'Start Mock')} 
          variant={isCompleted ? 'ghost' : (isInProgress ? 'warning' : 'primary')}
          fullWidth
          onClick={(e) => {
            e.stopPropagation();
            handleAction();
          }}
        />
      </div>

      <style>{`
        @keyframes cardEntrance {
          0% { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
