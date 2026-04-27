import React, { createContext, useContext, useState } from 'react';
import { useMock } from './MockContext';
import { calculateScore } from '../utils/scoreCalculator';

const AttemptContext = createContext();

export function AttemptProvider({ children }) {
  const { getMockById, updateMockStatus } = useMock();
  const [currentAttempt, setCurrentAttempt] = useState(null);
  const [explanationTokens, setExplanationTokens] = useState(() => {
    const saved = localStorage.getItem('global_explanation_tokens');
    return saved !== null ? parseInt(saved, 10) : 30;
  });

  const useExplanationToken = () => {
    if (explanationTokens > 0) {
      const newTokens = explanationTokens - 1;
      setExplanationTokens(newTokens);
      localStorage.setItem('global_explanation_tokens', newTokens);
      return true;
    }
    return false;
  };

  const addExplanationTokens = (amount) => {
    setExplanationTokens(prev => {
      const newTokens = prev + amount;
      localStorage.setItem('global_explanation_tokens', newTokens);
      return newTokens;
    });
  };

  const startAttempt = (mockId) => {
    const mock = getMockById(mockId);
    if (!mock) return;
    
    const savedStr = localStorage.getItem(`attempt_${mockId}`);
    let attempt;
    if (savedStr) {
      try {
        attempt = JSON.parse(savedStr);
        if (attempt.status === 'completed') return;
      } catch (e) {
        attempt = null;
      }
    }

    if (!attempt) {
      attempt = {
        mockId,
        status: 'in_progress',
        responses: {},
        reviewMarked: {},
        timePerQuestion: {},
        timeRemaining: mock.duration_seconds,
        startedAt: new Date().toISOString()
      };
    }
    
    setCurrentAttempt(attempt);
    updateMockStatus(mockId, 'in_progress');
    localStorage.setItem(`attempt_${mockId}`, JSON.stringify(attempt));
  };

  const recordQuestionTime = (questionId, seconds) => {
    if (!currentAttempt) return;
    setCurrentAttempt(prev => {
      const currentTime = prev.timePerQuestion?.[questionId] || 0;
      const updated = {
        ...prev,
        timePerQuestion: { ...prev.timePerQuestion, [questionId]: currentTime + seconds }
      };
      localStorage.setItem(`attempt_${prev.mockId}`, JSON.stringify(updated));
      return updated;
    });
  };

  const saveResponse = (questionId, option) => {
    if (!currentAttempt) return;
    setCurrentAttempt(prev => {
      const updated = {
        ...prev,
        responses: { ...prev.responses, [questionId]: option }
      };
      localStorage.setItem(`attempt_${prev.mockId}`, JSON.stringify(updated));
      return updated;
    });
  };

  const markForReview = (questionId) => {
    if (!currentAttempt) return;
    setCurrentAttempt(prev => {
      const isMarked = !!prev.reviewMarked[questionId];
      const updated = {
        ...prev,
        reviewMarked: { ...prev.reviewMarked, [questionId]: !isMarked }
      };
      localStorage.setItem(`attempt_${prev.mockId}`, JSON.stringify(updated));
      return updated;
    });
  };

  const updateTimeRemaining = (seconds) => {
    if (!currentAttempt) return;
    setCurrentAttempt(prev => {
      const updated = { ...prev, timeRemaining: seconds };
      localStorage.setItem(`attempt_${prev.mockId}`, JSON.stringify(updated));
      return updated;
    });
  };

  const submitAttempt = () => {
    if (!currentAttempt) return null;
    const mock = getMockById(currentAttempt.mockId);
    const result = calculateScore(mock, currentAttempt);
    
    const updated = {
      ...currentAttempt,
      status: 'completed',
      submittedAt: new Date().toISOString(),
      result
    };
    
    setCurrentAttempt(updated);
    updateMockStatus(updated.mockId, 'completed');
    localStorage.setItem(`attempt_${updated.mockId}`, JSON.stringify(updated));
    addExplanationTokens(5);
    return updated;
  };

  const value = {
    currentAttempt,
    startAttempt,
    saveResponse,
    markForReview,
    recordQuestionTime,
    updateTimeRemaining,
    submitAttempt,
    explanationTokens,
    useExplanationToken
  };

  return <AttemptContext.Provider value={value}>{children}</AttemptContext.Provider>;
}

export function useAttempt() {
  return useContext(AttemptContext);
}
