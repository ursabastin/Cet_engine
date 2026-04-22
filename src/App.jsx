import React, { useState } from 'react';
import Home from './pages/Home';
import Landing from './pages/Landing';
import TestScreen from './pages/TestScreen';
import Results from './pages/Results';
import { loadMockTest } from './utils/mockSelector';
import { loadPracticeTest } from './utils/practiceSelector';
import { DAILY_MOCK, PRACTICE_MODE } from './utils/testConfig';
import { saveTestResult } from './utils/storageHelper';
import { saveAttemptedIds } from './utils/historyHelper';
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
  const [loadError, setLoadError] = useState(null);

  const startTest = async (mode, topicsOrType = 'A', mockId = null, sub = 'reasoning') => {
    const activeMockId = mockId || topicsOrType; 
    setLoadError(null);
    setScreen('loading');
    setTestMode(mode);
    setAnswers({});
    setReadOnly(false);
    
    try {
      let loadedQuestions = [];
      
      if (mode === 'endurance') {
        // Set an immediate preview config so the loading screen has context
        setCurrentConfig({ 
          totalQuestions: 50, 
          timerSeconds: 25 * 60, 
          distribution: null // Will be populated after fetch
        });

        const bust = Date.now();
        const planRes = await fetch(`data/mock_plan.json?v=${bust}`);
        if (!planRes.ok) throw new Error(`Blueprint Fetch Failed: ${planRes.status}`);
        
        const plan = await planRes.json();
        if (!plan[sub]) throw new Error(`Syllabus for ${sub} not found in blueprint.`);
        
        const mockData = plan[sub].find(m => m.id === parseInt(activeMockId));
        if (!mockData) throw new Error(`Mock Module ${activeMockId} not found.`);

        // Build a clean distribution map with safety guards
        const distMap = {};
        if (mockData.topics) {
          mockData.topics.forEach(t => {
            if (t && t.name) {
              const safeName = String(t.name).replace(/_/g, ' ');
              distMap[safeName] = t.count ?? 0;
            }
          });
        }

        setCurrentConfig(prev => ({ 
          ...(prev || {}),
          distribution: distMap 
        }));

        const topicNames = [...new Set(mockData.topics.map(t => t.name))];
        const topicPromises = topicNames.map(name => 
          fetch(`data/practice_pool/${sub}/topics/${name}.json`).then(r => {
            if (!r.ok) throw new Error(`Topic Data Missing: ${name}`);
            return r.json();
          })
        );
        
        const topicDataArrays = await Promise.all(topicPromises);
        const allQuestionsPool = topicDataArrays.flat();
        
        // Final Stitching with Validation
        loadedQuestions = mockData.questions.map(id => {
          const q = allQuestionsPool.find(item => item.id == id);
          if (!q) console.warn(`Missing Question ID: ${id}`);
          return q;
        }).filter(Boolean);

        if (loadedQuestions.length === 0) throw new Error('Stitching failed: No valid questions found.');

        // Attach Meta
        loadedQuestions = loadedQuestions.map((q, idx) => {
          let cumulative = 0;
          const topicInfo = mockData.topics.find(t => {
            cumulative += t.count;
            return idx < cumulative;
          });
          return { ...q, topicMeta: topicInfo };
        });

        setQuestions(loadedQuestions);
        setScreen('intro');
      } else {
        // Practice/Daily Mode Logic
        const config = mode === 'daily' ? DAILY_MOCK : PRACTICE_MODE;
        setCurrentConfig(config);
        const data = mode === 'daily' 
          ? await loadMockTest(config, type)
          : await loadPracticeTest(config, type);
        
        setQuestions(data);
        setScreen('test');
      }
    } catch (error) {
      console.error('ENGINE_CRASH:', error);
      setLoadError(error.message);
      alert(`Initialization Failed: ${error.message}`);
      setScreen('home');
    }
  };

  const confirmStart = () => {
    if (!questions || questions.length === 0) {
      alert("Critical Error: Question pool is empty. Returning to hub.");
      setScreen('home');
      return;
    }
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
      const correctLetter = q.correct || q.correct_option;
      const isCorrect = selectedLetter === correctLetter;
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
      timeSpentPerQuestion,
      questions
    );

    // TRACK ATTEMPTED QUESTIONS
    saveAttemptedIds(questions.map(q => q.id));

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
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#050A18] p-6 text-center">
          <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-8"></div>
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-2">Synchronizing Simulation</h2>
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] max-w-xs mx-auto">
            Stitching {currentConfig?.totalQuestions || 50} Syllabus Targets into Test Paper...
          </p>
        </div>
      )}

      {screen === 'intro' && (
        <TestIntro 
          config={currentConfig || { totalQuestions: 50, timerSeconds: 1500, distribution: {} }} 
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
      {/* Global Error Portal */}
      {loadError && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 text-white font-outfit">
          <div className="max-w-md w-full bg-red-500/10 border border-red-500/20 rounded-[2rem] p-8 text-center shadow-2xl animate-in fade-in zoom-in duration-500">
            <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-red-500">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <h2 className="text-white font-black text-xl uppercase tracking-tighter mb-2">Engine Failure</h2>
            <p className="text-white/60 text-sm mb-8 leading-relaxed">{loadError}</p>
            <button 
              onClick={() => { setLoadError(null); setScreen('home'); }}
              className="w-full py-4 bg-white text-black font-black text-xs uppercase tracking-widest rounded-xl hover:bg-red-500 hover:text-white transition-all active:scale-95 shadow-xl"
            >
              Emergency Return to Hub
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
