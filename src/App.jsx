import React, { useState } from 'react';
import Home from './pages/Home';
import Landing from './pages/Landing';
import TestScreen from './pages/TestScreen';
import Results from './pages/Results';
import { loadFullTest } from './utils/questionSelector';
import { DAILY_MOCK, PRACTICE_MODE } from './utils/testConfig';
import { saveTestResult } from './utils/storageHelper';
import TestIntro from './components/TestIntro';

export default function App() {
  const [screen, setScreen] = useState('landing'); // 'landing' | 'home' | 'test' | 'results' | 'loading' | 'intro'
  const [testMode, setTestMode] = useState(null); // 'daily' | 'practice'
  const [testDate, setTestDate] = useState(null);
  const [testType, setTestType] = useState(null); // 'A' | 'B' | 'P'
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeSpent, setTimeSpent] = useState({});
  const [readOnly, setReadOnly] = useState(false);
  const [currentConfig, setCurrentConfig] = useState(null);

  const startTest = async (mode, date = null, type = null) => {
    setScreen('loading');
    setTestMode(mode);
    setTestDate(date);
    setTestType(type || 'P');
    setAnswers({});
    setReadOnly(false);

    try {
      const config = mode === 'daily' ? DAILY_MOCK : PRACTICE_MODE;
      setCurrentConfig(config);
      // Use underscore for questionSelector compatibility
      const seed = mode === 'daily' ? `${date}_${type}` : `practice_${Date.now()}`;
      const loadedQuestions = await loadFullTest(config, seed);
      
      if (loadedQuestions.length === 0) {
        throw new Error('No questions found');
      }
      
      setQuestions(loadedQuestions);
      setScreen('intro'); // Go to instructions first
    } catch (error) {
      alert(`Failed to load questions: ${error.message}.`);
      setScreen('home');
    }
  };

  const confirmStart = () => {
    setScreen('test');
  };

  const handleTestSubmit = (finalAnswers, timeSpentPerQuestion) => {
    setAnswers(finalAnswers);
    setTimeSpent(timeSpentPerQuestion);
    
    // Calculate Detailed Scores
    let score = 0;
    const subjectScores = {
      english: { correct: 0, total: 0 },
      reasoning: { correct: 0, total: 0 },
      gk: { correct: 0, total: 0 },
      computer: { correct: 0, total: 0 }
    };

    questions.forEach((q, idx) => {
      const selectedLetter = String.fromCharCode(65 + finalAnswers[idx]);
      const isCorrect = selectedLetter === q.correct;
      if (isCorrect) score++;
      
      const sub = q.subject.toLowerCase();
      if (subjectScores[sub]) {
        subjectScores[sub].total++;
        if (isCorrect) subjectScores[sub].correct++;
      }
    });

    // Save with real data
    saveTestResult(
      testMode, 
      testDate || new Date().toISOString().split('T')[0], 
      testType || 'P', 
      score, 
      questions.length, 
      '3.5h', 
      finalAnswers,
      subjectScores,
      timeSpentPerQuestion
    );

    setScreen('results');
  };

  const handleReview = () => {
    setReadOnly(true);
    setScreen('test');
  };

  const handleExit = (currentAnswers) => {
    setScreen('home');
  };

  return (
    <div className="font-inter text-text-primary bg-bg-primary h-screen overflow-hidden">
      {screen === 'landing' && <Landing onEnter={() => setScreen('home')} />}
      
      {screen === 'home' && <Home onStartTest={startTest} onBack={() => setScreen('landing')} />}
      
      {screen === 'loading' && (
        <div className="min-h-screen flex flex-col items-center justify-center bg-bg-primary p-6 text-center">
          <div className="w-14 h-14 border-[5px] border-accent-blue/10 border-t-accent-blue rounded-full animate-spin mb-6"></div>
          <h2 className="text-xl font-bold text-text-primary mb-2">Generating Test Paper</h2>
          <p className="text-text-secondary text-sm max-w-xs mx-auto">
            Preparing your {currentConfig?.totalQuestions || 200} questions across English, Reasoning, GK, and Computer.
          </p>
        </div>
      )}

      {screen === 'intro' && (
        <TestIntro 
          config={currentConfig} 
          date={testDate} 
          type={testType} 
          onStart={confirmStart} 
          onBack={() => setScreen('home')} 
        />
      )}

      {screen === 'test' && (
        <TestScreen 
          questions={questions}
          mode={testMode}
          date={testDate}
          type={testType}
          readOnly={readOnly}
          initialAnswers={answers}
          onSubmit={handleTestSubmit}
          onExit={handleExit}
        />
      )}

      {screen === 'results' && (
        <Results 
          questions={questions}
          answers={answers}
          timeSpent={timeSpent}
          onHome={() => setScreen('home')}
          onReview={handleReview}
        />
      )}
    </div>
  );
}
