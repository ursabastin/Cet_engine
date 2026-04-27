import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAttempt } from '../hooks/useAttempt';
import { useMockLoader } from '../hooks/useMockLoader';
import TimerBar from '../components/test/TimerBar';
import QuestionPanel from '../components/test/QuestionPanel';
import QuestionPalette from '../components/test/QuestionPalette';
import NavigationRow from '../components/test/NavigationRow';
import SubmitConfirmModal from '../components/modals/SubmitConfirmModal';

export default function TestInterface() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getMockById } = useMockLoader();
  const { currentAttempt, saveResponse, markForReview, recordQuestionTime, submitAttempt } = useAttempt();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const mock = getMockById(id);

  useEffect(() => {
    if (!mock || !currentAttempt || currentAttempt.mockId !== id) {
      if (currentAttempt?.status === 'completed') {
        navigate(`/results/${id}`);
      } else {
        navigate(`/mock/${id}`);
      }
    }
  }, [mock, currentAttempt, id, navigate]);

  const flatQuestions = [];
  if (mock?.sections) {
    mock.sections.forEach(s => {
      s.questions.forEach(q => flatQuestions.push(q));
    });
  }

  const currentQuestion = flatQuestions[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === flatQuestions.length - 1;
  const currentSelection = currentAttempt?.responses[currentQuestion?.id];

  // TRACK TIME PER QUESTION
  useEffect(() => {
    if (!currentQuestion || !recordQuestionTime) return;
    
    const startTime = Date.now();
    
    return () => {
      const endTime = Date.now();
      const secondsSpent = Math.floor((endTime - startTime) / 1000);
      if (secondsSpent > 0) {
        recordQuestionTime(currentQuestion.id, secondsSpent);
      }
    };
  }, [currentIndex, currentQuestion?.id]);

  if (!mock || !currentAttempt) return null;

  const handleOptionSelect = (option) => {
    saveResponse(currentQuestion.id, option);
  };

  const handleClear = () => {
    saveResponse(currentQuestion.id, null);
  };

  const handlePrevious = () => {
    if (!isFirst) setCurrentIndex(prev => prev - 1);
  };

  const handleNext = () => {
    if (!isLast) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setShowSubmitModal(true);
    }
  };

  const handleMarkReview = () => {
    markForReview(currentQuestion.id);
    handleNext();
  };

  const handleAutoSubmit = () => {
    submitAttempt();
    navigate(`/results/${id}`);
  };

  const handleConfirmSubmit = () => {
    submitAttempt();
    navigate(`/results/${id}`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', overflow: 'hidden', position: 'absolute', top: 0, left: 0 }}>
      <TimerBar 
        mockName={mock.displayName}
        durationSeconds={currentAttempt.timeRemaining}
        onExpire={handleAutoSubmit}
        mockId={id}
        onSubmit={() => setShowSubmitModal(true)}
      />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <div style={{ flex: '0 0 320px', height: '100%', position: 'relative', zIndex: 5 }}>
          <QuestionPalette 
            mock={mock}
            attempt={currentAttempt}
            currentIndex={currentIndex}
            onNavigate={setCurrentIndex}
          />
        </div>

        <div style={{ flex: 1, height: '100%', overflow: 'hidden', position: 'relative' }}>
          <QuestionPanel 
            question={currentQuestion}
            index={currentIndex}
            selectedOption={currentSelection}
            onOptionSelect={handleOptionSelect}
            totalQuestions={flatQuestions.length}
          />
        </div>
      </div>

      <NavigationRow 
        onPrevious={handlePrevious}
        onNext={handleNext}
        onMarkReview={handleMarkReview}
        onClear={handleClear}
        isFirst={isFirst}
        isLast={isLast}
        hasSelection={!!currentSelection}
      />

      {showSubmitModal && (
        <SubmitConfirmModal 
          attempt={currentAttempt}
          mock={mock}
          onConfirm={handleConfirmSubmit}
          onCancel={() => setShowSubmitModal(false)}
        />
      )}
    </div>
  );
}
