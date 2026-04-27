import React from 'react';
import Badge from '../ui/Badge';
import OptionButton from './OptionButton';

export default function QuestionPanel({ 
  question, 
  index, 
  selectedOption, 
  onOptionSelect,
  isResultView = false,
  totalQuestions
}) {
  if (!question) return <div>Loading...</div>;

  const renderQuestionText = (text) => {
    if (!text) return null;
    const parts = text.split(/_{3,}/);
    if (parts.length > 1) {
      return parts.map((part, i, arr) => (
        <React.Fragment key={i}>
          {part}
          {i < arr.length - 1 && (
            <span style={{ 
              display: 'inline-block', 
              width: '80px', 
              height: '3px', 
              backgroundColor: 'var(--accent-primary)', 
              margin: '0 4px', 
              verticalAlign: 'middle' 
            }} />
          )}
        </React.Fragment>
      ));
    }
    return text;
  };

  const options = ['A', 'B', 'C', 'D'];

  const questionContent = (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
        <div className="font-display text-tertiary" style={{ fontWeight: 600, fontSize: '14px' }}>
          Question {index + 1} of {totalQuestions}
        </div>
        <Badge label={question.topic?.replace(/_/g, ' ') || 'General'} variant="info" />
      </div>

      <div className="font-body text-primary" style={{ fontSize: '17px', fontWeight: 500, lineHeight: 1.6, marginBottom: 'var(--space-lg)', whiteSpace: 'pre-wrap' }}>
        {renderQuestionText(question.question)}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
        {options.map(opt => {
          if (!question.options || !question.options[opt]) return null;
          
          let isCorrect = false;
          let isWrong = false;
          
          if (isResultView) {
            if (opt === question.answer) isCorrect = true;
            if (selectedOption === opt && opt !== question.answer) isWrong = true;
          }

          return (
            <OptionButton 
              key={opt}
              optionLabel={opt}
              optionText={question.options[opt]}
              isSelected={selectedOption === opt}
              onClick={() => onOptionSelect(opt)}
              isResultView={isResultView}
              isCorrect={isCorrect}
              isWrong={isWrong}
            />
          );
        })}
      </div>
    </>
  );

  if (question.passage) {
    return (
      <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
        {/* Left: Passage */}
        <div style={{ 
          flex: 1, 
          borderRight: '1px solid var(--glass-border)', 
          padding: 'var(--space-xl)', 
          overflowY: 'auto',
          background: 'rgba(255,255,255,0.02)'
        }}>
          <div className="font-display text-tertiary" style={{ fontSize: '11px', fontWeight: 600, marginBottom: 'var(--space-sm)', letterSpacing: '1px' }}>
            PASSAGE
          </div>
          <div className="font-body text-secondary" style={{ fontSize: '15px', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
            {question.passage}
          </div>
        </div>

        {/* Right: Question & Options */}
        <div style={{ flex: 1, padding: 'var(--space-xl)', overflowY: 'auto' }}>
          {questionContent}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 'var(--space-xl)', maxWidth: '800px', margin: '0 auto', height: '100%', overflowY: 'auto' }}>
      {questionContent}
    </div>
  );
}
