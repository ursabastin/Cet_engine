import React, { useState, useMemo } from 'react';
import { getMockHistory } from '../utils/storageHelper';

export default function AnalyticsView() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedMock, setSelectedMock] = useState(null);

  const history = useMemo(() => {
    try {
      const daily = JSON.parse(localStorage.getItem('cet_mock_history') || '[]');
      const practice = JSON.parse(localStorage.getItem('cet_practice_history') || '[]');
      return [...daily, ...practice].sort((a, b) => new Date(b.timestamp || b.date) - new Date(a.timestamp || a.date));
    } catch (e) {
      return [];
    }
  }, []);

  const stats = useMemo(() => {
    if (history.length === 0) {
      return {
        totalQuestions: 5600,
        completedQuestions: 0,
        accuracy: 0,
        wrongAnswers: 0,
        uniquePoolSize: 2430,
        subjectPerformance: [
          { name: 'English', score: 0, color: 'bg-accent-blue' },
          { name: 'Reasoning', score: 0, color: 'bg-purple-600' },
          { name: 'GK', score: 0, color: 'bg-accent-green' },
          { name: 'Computer', score: 0, color: 'bg-accent-amber' }
        ]
      };
    }

    const totalSolved = history.reduce((acc, curr) => acc + (curr.total || 50), 0);
    const totalCorrect = history.reduce((acc, curr) => acc + (curr.score || 0), 0);
    const avgAccuracy = Math.round((totalCorrect / totalSolved) * 100);

    const subjects = {
      english: { correct: 0, total: 0 },
      reasoning: { correct: 0, total: 0 },
      gk: { correct: 0, total: 0 },
      computer: { correct: 0, total: 0 }
    };

    history.forEach(test => {
      if (test.subjectScores) {
        Object.keys(test.subjectScores).forEach(sub => {
          if (subjects[sub]) {
            subjects[sub].correct += test.subjectScores[sub].correct;
            subjects[sub].total += test.subjectScores[sub].total;
          }
        });
      }
    });

    const getSubScore = (sub) => {
      const s = subjects[sub];
      return s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
    };

    return {
      totalQuestions: 5600,
      completedQuestions: totalSolved,
      accuracy: avgAccuracy,
      wrongAnswers: totalSolved - totalCorrect,
      uniquePoolSize: 2430,
      subjectPerformance: [
        { name: 'English', score: getSubScore('english'), color: 'bg-accent-blue' },
        { name: 'Reasoning', score: getSubScore('reasoning'), color: 'bg-purple-600' },
        { name: 'GK', score: getSubScore('gk'), color: 'bg-accent-green' },
        { name: 'Computer', score: getSubScore('computer'), color: 'bg-accent-amber' }
      ]
    };
  }, [history]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'vault', label: 'Mock Vault', icon: '🗄️' },
    { id: 'subjects', label: 'Subject Mastery', icon: '🎯' }
  ];

  if (selectedMock) {
    return (
      <div className="space-y-8 pb-12 animate-in fade-in duration-500 w-full max-w-6xl">
        <div className="flex items-center justify-between border-b border-white/5 pb-6">
          <button 
            onClick={() => setSelectedMock(null)}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all group"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="group-hover:-translate-x-1 transition-transform"><path d="M19 12H5M5 12l7-7M5 12l7 7"/></svg>
            Back to Vault
          </button>
          <div className="text-right">
            <h3 className="text-xl font-black text-white italic tracking-tighter uppercase">
              Review: {selectedMock.subjectScores ? 'Full Mock' : 'Topic Mastery'}
            </h3>
            <p className="text-[9px] font-black text-blue-500 uppercase tracking-widest mt-1">
              {new Date(selectedMock.timestamp).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[9px] font-black text-white/30 uppercase block mb-1">Score</span>
            <span className="text-2xl font-black text-white">{selectedMock.score} <span className="text-white/20">/ {selectedMock.total}</span></span>
          </div>
          <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/20">
            <span className="text-[9px] font-black text-green-500/60 uppercase block mb-1">Right</span>
            <span className="text-2xl font-black text-green-500">{selectedMock.score}</span>
          </div>
          <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20">
            <span className="text-[9px] font-black text-red-500/60 uppercase block mb-1">Wrong</span>
            <span className="text-2xl font-black text-red-500">{selectedMock.total - selectedMock.score}</span>
          </div>
          <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20">
            <span className="text-[9px] font-black text-blue-500/60 uppercase block mb-1">Accuracy</span>
            <span className="text-2xl font-black text-blue-500">{Math.round((selectedMock.score / selectedMock.total) * 100)}%</span>
          </div>
        </div>

        <div className="space-y-4">
          {(!selectedMock.questions || selectedMock.questions.length === 0) ? (
            <div className="p-12 text-center bg-white/5 rounded-3xl border border-white/10">
              <p className="text-white/40 font-black uppercase tracking-widest text-xs">No question data preserved for this session.</p>
            </div>
          ) : (
            selectedMock.questions.map((q, idx) => {
              const userAnsLetter = String.fromCharCode(65 + selectedMock.answers[idx]);
              const correctAnsLetter = q.correct || q.correct_option;
              const isCorrect = userAnsLetter === correctAnsLetter;

              return (
                <div key={idx} className={`p-8 rounded-[2.5rem] border transition-all ${isCorrect ? 'bg-green-500/[0.02] border-green-500/10' : 'bg-red-500/[0.02] border-red-500/10'}`}>
                  <div className="flex items-start gap-6">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-sm ${isCorrect ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {idx + 1}
                    </div>
                    <div className="flex-grow space-y-6">
                      <p className="text-lg font-bold text-white/90 leading-relaxed tracking-tight">
                        {q.text || q.question_text || q.question || 'Question text missing'}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {['A', 'B', 'C', 'D'].map(letter => {
                          const optionText = q[`option_${letter.toLowerCase()}`] || q[letter] || q.options?.[letter.charCodeAt(0) - 65];
                          const isUserChoice = userAnsLetter === letter;
                          const isCorrectChoice = correctAnsLetter === letter;
                          
                          let bgClass = "bg-white/5 border-white/5";
                          if (isUserChoice && !isCorrect) bgClass = "bg-red-500/20 border-red-500/40 text-red-400";
                          if (isCorrectChoice) bgClass = "bg-green-500/20 border-green-500/40 text-green-400";

                          return (
                            <div key={letter} className={`p-4 rounded-xl border flex items-center gap-4 text-xs font-bold transition-all ${bgClass}`}>
                              <span className="w-6 h-6 rounded bg-black/20 flex items-center justify-center font-black">{letter}</span>
                              <span className="flex-grow">{optionText}</span>
                              {isUserChoice && <span className="text-[10px] uppercase font-black tracking-widest">{isCorrect ? '✅ Correct' : '❌ Your Choice'}</span>}
                              {isCorrectChoice && !isUserChoice && <span className="text-[10px] uppercase font-black tracking-widest">✅ Answer</span>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 w-full max-w-6xl">
      {/* Tab Switcher */}
      <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-3xl w-fit mx-auto sticky top-4 z-50">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 transition-all ${
              activeTab === tab.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' 
                : 'text-white/40 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-8 rounded-[2.5rem] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl backdrop-blur-md">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 mb-2 block">System Performance</span>
              <h2 className="text-3xl font-black text-white italic tracking-tighter">Overall Accuracy: {stats.accuracy}%</h2>
              <p className="text-xs font-medium text-white/50 mt-2 max-w-md">Aggregated data from {history.length} completed simulation cycles.</p>
            </div>
            <div className="flex gap-4">
              <div className="text-center px-8 py-5 bg-white/5 rounded-[2rem] border border-white/10">
                <span className="text-4xl font-black text-white leading-none">{stats.completedQuestions}</span>
                <span className="block text-[9px] font-black uppercase tracking-widest text-white/30 mt-2">Solved</span>
              </div>
              <div className="text-center px-8 py-5 bg-white/5 rounded-[2rem] border border-white/10">
                <span className="text-4xl font-black text-green-500 leading-none">{history.reduce((a,c)=>a+(c.score||0),0)}</span>
                <span className="block text-[9px] font-black uppercase tracking-widest text-white/30 mt-2">Correct</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/[0.03] p-8 rounded-[2rem] border border-white/10">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-3 block">Total Mocks</span>
              <span className="text-4xl font-black text-white">{history.length}</span>
            </div>
            <div className="bg-white/[0.03] p-8 rounded-[2rem] border border-white/10">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-3 block">Total Errors</span>
              <span className="text-4xl font-black text-red-500">{stats.wrongAnswers}</span>
            </div>
            <div className="bg-white/[0.03] p-8 rounded-[2rem] border border-white/10">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-3 block">Completion</span>
              <span className="text-4xl font-black text-blue-500">{Math.round((stats.completedQuestions / stats.totalQuestions) * 100)}%</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'vault' && (
        <div className="space-y-4 animate-in fade-in duration-500">
          {history.length === 0 ? (
            <div className="text-center py-20 bg-white/5 rounded-[2.5rem] border border-white/10">
              <span className="text-4xl mb-4 block">📭</span>
              <p className="text-white/40 font-black uppercase tracking-widest text-[10px]">Vault is Empty. Start a Mock to log data.</p>
            </div>
          ) : (
            history.map((item, idx) => (
              <div 
                key={item.id || idx} 
                onClick={() => setSelectedMock(item)}
                className="bg-white/[0.03] p-6 rounded-[2rem] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-white/[0.05] hover:border-blue-500/30 transition-all cursor-pointer group"
              >
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1">
                    {item.timestamp ? new Date(item.timestamp).toLocaleDateString() : item.date}
                  </span>
                  <h4 className="text-lg font-black text-white italic tracking-tight group-hover:text-blue-400 transition-colors">
                    {item.subjectScores ? 'Full Mock' : (item.id.includes('practice') ? 'Topic Mastery' : `Mock ${item.type}`)}
                  </h4>
                </div>
                
                <div className="flex-grow max-w-md w-full">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                    <span className="text-green-500">✅ {item.score} Right</span>
                    <span className="text-red-500">❌ {(item.total || 50) - item.score} Wrong</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden flex">
                    <div className="h-full bg-green-500" style={{ width: `${(item.score / (item.total || 50)) * 100}%` }}></div>
                    <div className="h-full bg-red-500" style={{ width: `${(((item.total || 50) - item.score) / (item.total || 50)) * 100}%` }}></div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="bg-white/5 px-6 py-3 rounded-2xl border border-white/10">
                    <span className="text-2xl font-black text-white italic">
                      {Math.round((item.score / (item.total || 50)) * 100)}%
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9 18l6-6-6-6"/></svg>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'subjects' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">
          {stats.subjectPerformance.map(sub => (
            <div key={sub.name} className="bg-white/[0.03] p-8 rounded-[2.5rem] border border-white/10">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <span className="text-[10px] font-black text-white/30 uppercase tracking-widest block mb-1">Subject Mastery</span>
                  <h3 className="text-2xl font-black text-white italic tracking-tighter">{sub.name}</h3>
                </div>
                <span className="text-3xl font-black text-white italic">{sub.score}%</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full ${sub.color}`} style={{ width: `${sub.score}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
