import React, { useState, useEffect } from 'react';
import Timer from '../components/Timer';
import QuestionCard from '../components/QuestionCard';
import QuestionPalette from '../components/QuestionPalette';
import ConfirmDialog from '../components/ConfirmDialog';

export default function TestScreen({ 
  questions, 
  mode, 
  date, 
  type,
  onSubmit, 
  onExit,
  readOnly = false,
  initialAnswers = {}
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(initialAnswers);
  const [skipped, setSkipped] = useState([]);
  const [visited, setVisited] = useState(new Set([0]));
  const [reviewMarked, setReviewMarked] = useState([]);
  const [dialog, setDialog] = useState(null);
  
  // Time Tracking State
  const [timeSpent, setTimeSpent] = useState({});
  const [entryTime, setEntryTime] = useState(Date.now());

  // Auto-hide Palette State
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [paletteTimeout, setPaletteTimeout] = useState(null);

  const total = questions.length;
  const currentQuestion = questions[currentIndex];

  // Track time spent per question
  useEffect(() => {
    const now = Date.now();
    const elapsed = Math.floor((now - entryTime) / 1000);
    
    // Save time for the PREVIOUS index before updating entryTime for the NEW index
    // We use a temporary variable to avoid closure issues with currentIndex
    // But since this effect runs when currentIndex changes, we need to know the OLD index.
    // Actually, a better way is to use a ref or update on every index change.
  }, [currentIndex]);

  useEffect(() => {
    setVisited(prev => new Set([...prev, currentIndex]));
  }, [currentIndex]);

  // Handle click outside to close palette
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isPaletteOpen && !e.target.closest('aside') && !e.target.closest('.palette-trigger')) {
        setIsPaletteOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isPaletteOpen]);

  const handlePaletteEnter = () => {
    if (paletteTimeout) clearTimeout(paletteTimeout);
    setIsPaletteOpen(true);
  };

  const handlePaletteLeave = () => {
    const timeout = setTimeout(() => {
      setIsPaletteOpen(false);
    }, 2000);
    setPaletteTimeout(timeout);
  };

  const updateTimeSpent = (index) => {
    const now = Date.now();
    const elapsed = Math.floor((now - entryTime) / 1000);
    setTimeSpent(prev => ({
      ...prev,
      [index]: (prev[index] || 0) + elapsed
    }));
    setEntryTime(now);
  };

  const handleJump = (idx) => {
    updateTimeSpent(currentIndex);
    setCurrentIndex(idx);
  };

  const handleSelect = (optionIdx) => {
    if (readOnly) return;
    setAnswers(prev => ({ ...prev, [currentIndex]: optionIdx }));
    if (skipped.includes(currentIndex)) {
      setSkipped(prev => prev.filter(i => i !== currentIndex));
    }
  };

  const topicHeaders = questions.map((q, idx) => {
    const currentName = q.topicMeta?.name || 'General Questions';
    const prevName = idx > 0 ? (questions[idx-1].topicMeta?.name || 'General Questions') : null;
    
    if (idx === 0 || currentName !== prevName) {
      return { idx, name: currentName };
    }
    return null;
  }).filter(Boolean);

  const handleNext = () => {
    if (currentIndex < total - 1) {
      updateTimeSpent(currentIndex);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      updateTimeSpent(currentIndex);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSkip = () => {
    if (answers[currentIndex] === undefined && !skipped.includes(currentIndex)) {
      setSkipped(prev => [...prev, currentIndex]);
    }
    handleNext();
  };

  const handleMarkReview = () => {
    if (reviewMarked.includes(currentIndex)) {
      setReviewMarked(prev => prev.filter(i => i !== currentIndex));
    } else {
      setReviewMarked(prev => [...prev, currentIndex]);
    }
  };

  const handleSubmitRequest = () => {
    const now = Date.now();
    const elapsed = Math.floor((now - entryTime) / 1000);
    const finalTimeSpent = {
      ...timeSpent,
      [currentIndex]: (timeSpent[currentIndex] || 0) + elapsed
    };

    const unanswered = total - Object.keys(answers).length;
    setDialog({
      title: 'Submit Test?',
      message: unanswered > 0 
        ? `You have ${unanswered} unanswered questions remaining. Are you sure you want to finish?`
        : 'Are you ready to submit your test and see the results?',
      confirmText: 'Submit',
      onConfirm: () => { 
        setDialog(null); 
        onSubmit(answers, finalTimeSpent); 
      }
    });
  };

  const handleExitRequest = () => {
    setDialog({
      title: 'Exit Test?',
      message: 'Are you sure you want to exit? Your progress will be saved.',
      confirmText: 'Exit',
      onConfirm: () => { setDialog(null); onExit(answers); }
    });
  };

  return (
    <div className="h-screen bg-[#050A18] flex flex-col overflow-hidden select-none font-outfit relative">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.05),transparent_70%)] pointer-events-none"></div>

      {/* Header */}
      <header className="h-16 bg-white/[0.02] backdrop-blur-xl border-b border-white/10 px-6 flex items-center justify-between flex-shrink-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={handleExitRequest} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/60 hover:text-white transition-all group">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </button>
          <div className="flex flex-col">
            <h1 className="text-[11px] font-black text-white leading-none mb-1 uppercase tracking-[0.2em] italic">
              {mode === 'endurance' ? `SYLLABUS ENDURANCE MOCK — ${questions[0]?.subject.toUpperCase()}` : (type === 'B' ? 'UNLIMITED PRACTICE SESSION' : `STRATEGIC MOCK TEST — ${date}`)}
            </h1>
            <span className="text-[9px] uppercase font-bold text-blue-400 tracking-[0.1em] opacity-60">
              System Interface v1.3 · Live Examination
            </span>
          </div>
        </div>
        <Timer totalSeconds={mode === 'endurance' ? 25 * 60 : (type === 'B' ? null : 240 * 60)} hidden={type === 'B' || readOnly} onExpire={() => onSubmit(answers)} />
      </header>

      {/* Main Body Area */}
      <div className="flex-grow flex overflow-hidden relative">
        <div onMouseEnter={handlePaletteEnter} className="absolute left-0 top-0 bottom-0 w-6 z-[60] cursor-e-resize palette-trigger"></div>
        <aside onMouseEnter={handlePaletteEnter} onMouseLeave={handlePaletteLeave} className={`fixed left-0 top-16 bottom-0 bg-[#0A0F1E]/95 backdrop-blur-2xl border-r border-white/10 transition-all duration-500 ease-in-out flex-shrink-0 overflow-hidden z-[55] shadow-2xl ${isPaletteOpen ? 'w-80 opacity-100 translate-x-0' : 'w-0 opacity-0 -translate-x-full'}`}>
          <div className="w-80 h-full">
            <QuestionPalette questions={questions} total={total} currentIndex={currentIndex} answers={answers} skipped={skipped} visited={visited} reviewMarked={reviewMarked} onJump={handleJump} />
          </div>
        </aside>
        <main className="flex-grow overflow-y-auto">
          <div className="min-h-full p-2 md:p-6 flex flex-col items-center">
            <div className="w-full max-w-5xl">
              {/* Topic Separator Header */}
              {currentQuestion?.topicMeta && (
                <div className="mb-6 flex items-center gap-4 px-4 py-3 rounded-xl bg-blue-500/5 border border-blue-500/20 animate-in slide-in-from-top-2 duration-500">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                  <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.25em]">
                    Current Topic: {(currentQuestion.topicMeta.name || 'General Section').replace(/_/g, ' ')} 
                    <span className="ml-4 text-white/30">({currentQuestion.topicMeta.count ?? '—'} QUESTIONS IN THIS SECTION)</span>
                  </span>
                </div>
              )}
              <QuestionCard question={currentQuestion} index={currentIndex} total={total} selectedAnswer={answers[currentIndex]} onSelect={handleSelect} isPractice={mode === 'practice'} readOnly={readOnly} />
            </div>
          </div>
        </main>
      </div>

      <footer className="h-20 bg-white/[0.02] backdrop-blur-xl border-t border-white/10 flex-shrink-0 flex items-center px-10 z-50">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={handleBack} disabled={currentIndex === 0} className="h-12 px-10 rounded-xl border border-white/10 bg-white/5 text-white/80 font-black text-xs uppercase tracking-widest hover:bg-white/10 disabled:opacity-20 transition-all active:scale-95">Previous</button>
            {!readOnly && <button onClick={handleSkip} className="h-12 px-10 rounded-xl border border-white/10 bg-white/5 text-white/80 font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95">Skip</button>}
          </div>
          <div className="flex items-center gap-4">
            {!readOnly && <button onClick={handleMarkReview} className={`h-12 px-8 rounded-xl border font-black text-xs uppercase tracking-widest transition-all active:scale-95 ${reviewMarked.includes(currentIndex) ? 'bg-purple-600/20 border-purple-500 text-purple-400' : 'border-white/10 bg-white/5 text-white/60 hover:text-white'}`}>{reviewMarked.includes(currentIndex) ? '★ Marked' : 'Review'}</button>}
            <button onClick={handleNext} disabled={currentIndex === total - 1} className="h-12 px-12 rounded-xl bg-blue-600 text-white font-black text-xs uppercase tracking-[0.2em] hover:brightness-125 disabled:opacity-20 transition-all active:scale-[0.98]">Next</button>
            {!readOnly && currentIndex >= total * 0.8 && (
              <button onClick={handleSubmitRequest} className="h-12 px-10 rounded-xl bg-green-600 text-white font-black text-xs uppercase tracking-widest hover:brightness-125 ml-6 animate-in fade-in slide-in-from-right-4 duration-500 active:scale-[0.98]">Submit Test</button>
            )}
          </div>
        </div>
      </footer>
      <ConfirmDialog isOpen={!!dialog} title={dialog?.title} message={dialog?.message} confirmText={dialog?.confirmText} onConfirm={dialog?.onConfirm} onCancel={() => setDialog(null)} />
    </div>
  );
}
