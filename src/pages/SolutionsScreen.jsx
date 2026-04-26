import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMockLoader } from '../hooks/useMockLoader';
import QuestionPanel from '../components/test/QuestionPanel';
import ExplanationBox from '../components/solutions/ExplanationBox';
import Button from '../components/ui/Button';

export default function SolutionsScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getMockById } = useMockLoader();

  const mock = getMockById(id);
  const savedStr = localStorage.getItem(`attempt_${id}`);
  
  if (!mock || !savedStr) return <div className="text-primary p-6">Data not found</div>;

  let attempt;
  try {
    attempt = JSON.parse(savedStr);
  } catch (e) {
    return <div className="text-primary p-6">Invalid data</div>;
  }

  const [currentIndex, setCurrentIndex] = useState(0);

  const flatQuestions = [];
  if (mock.sections) {
    mock.sections.forEach(s => {
      s.questions.forEach(q => flatQuestions.push(q));
    });
  }

  const currentQuestion = flatQuestions[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === flatQuestions.length - 1;
  const selectedOption = attempt.responses[currentQuestion?.id] || null;

  const handlePrevious = () => {
    if (!isFirst) setCurrentIndex(prev => prev - 1);
  };

  const handleNext = () => {
    if (!isLast) setCurrentIndex(prev => prev + 1);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', animation: 'fadeInUp 400ms ease-out forwards', paddingBottom: 'var(--space-2xl)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-xl)' }}>
        <div>
          <h1 className="font-display text-primary" style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>
            Solutions Review
          </h1>
          <p className="font-body text-secondary" style={{ margin: 'var(--space-xs) 0 0 0', fontSize: '14px' }}>
            {mock.displayName} • Question {currentIndex + 1} of {flatQuestions.length}
          </p>
        </div>
        <Button label="Back to Results" variant="ghost" onClick={() => navigate(`/results/${id}`)} />
      </div>

      <div className="glass-deep" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <QuestionPanel 
          question={currentQuestion}
          index={currentIndex}
          selectedOption={selectedOption}
          isResultView={true}
          totalQuestions={flatQuestions.length}
        />

        <div style={{ padding: '0 var(--space-xl) var(--space-xl) var(--space-xl)' }}>
          <ExplanationBox explanation={currentQuestion.explanation} />
        </div>

        <div className="glass" style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-md) var(--space-xl)', borderTop: 'var(--glass-border)', borderRadius: 0 }}>
          <Button label="← Previous" variant="ghost" onClick={handlePrevious} disabled={isFirst} />
          <Button label="Next →" variant="primary" onClick={handleNext} disabled={isLast} />
        </div>
      </div>
    </div>
  );
}
