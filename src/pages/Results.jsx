import React from 'react';
import ProgressRing from '../components/ProgressRing';

export default function Results({ questions, answers, timeSpent = {}, onHome, onReview }) {
  const [status, setStatus] = React.useState('processing'); // 'processing' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = React.useState('');

  const subjects = ['english', 'reasoning', 'gk', 'computer'];
  const idealTimes = { english: 35, reasoning: 85, gk: 20, computer: 25 };

  React.useEffect(() => {
    autoProcessAndSave();
  }, []);

  const autoProcessAndSave = async () => {
    try {
      // 1. Get Session Stats for Linking
      const mockHistory = JSON.parse(localStorage.getItem('cet_mock_history') || '[]');
      const practiceHistory = JSON.parse(localStorage.getItem('cet_practice_history') || '[]');
      const totalSessionsSoFar = mockHistory.length + practiceHistory.length;
      
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).replace(/[:\s]/g, '-');
      const dateStr = now.toISOString().split('T')[0];
      const displayTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
      
      const subjectName = questions[0]?.subject?.toUpperCase() || 'GENERAL';
      const mockNum = questions[0]?.topicMeta?.id || 'P';
      const sessionId = `CET-${dateStr.replace(/-/g, '')}-${timeStr}`;
      
      const fileName = `Result_${dateStr}_${timeStr}_${subjectName}_Mock_${mockNum}`;

      let attempted = 0;
      const totalCorrect = questions.reduce((sum, q, idx) => {
        const userChoice = answers[idx];
        const isAttempted = userChoice !== undefined && userChoice !== null;
        if (isAttempted) attempted++;
        const selectedLetter = String.fromCharCode(65 + userChoice);
        return sum + (isAttempted && selectedLetter === q.correct ? 1 : 0);
      }, 0);
      
      const accuracy = attempted > 0 ? Math.round((totalCorrect / attempted) * 100) : 0;
      
      const analysisData = questions.map((q, idx) => {
        const time = timeSpent[idx] || 0;
        const target = idealTimes[q.subject] || 60;
        const diff = target - time;
        return {
          id: idx + 1,
          subject: q.subject,
          topic: q.topic,
          text: q.text,
          userAnswer: q.options[answers[idx]] || 'Skipped',
          correctAnswer: q.options[q.correct.charCodeAt(0) - 65],
          isCorrect: answers[idx] !== undefined && String.fromCharCode(65 + answers[idx]) === q.correct,
          timeTaken: time,
          targetTime: target,
          explanation: q.explanation || {}
        };
      });

      const sessionContext = {
        SESSION_ID: sessionId,
        TIMESTAMP: now.toISOString(),
        DISPLAY_TIME: `${dateStr} | ${displayTime}`,
        SUBJECT: subjectName,
        MOCK_NUMBER: mockNum,
        PASSION_ATTEMPT_INDEX: totalSessionsSoFar + 1
      };

      // 1. JSON Format
      const json = JSON.stringify({ 
        CONTEXT: sessionContext,
        METRICS: { score: totalCorrect, total: questions.length, attempted, accuracy: `${accuracy}%` },
        DETAILS: analysisData 
      }, null, 2);

      // 2. MD Format
      const md = `# 📊 SESSION REPORT: ${subjectName} MOCK ${mockNum}\n` +
        `> **Connection Key:** \`${sessionId}\`\n\n` +
        `## 🎫 Session Identity\n` +
        `- **Date & Time:** ${dateStr} @ ${displayTime}\n` +
        `- **Subject:** ${subjectName}\n` +
        `- **Mock ID:** ${mockNum}\n` +
        `- **Passion Attempt #:** ${sessionContext.PASSION_ATTEMPT_INDEX}\n\n` +
        `## 📈 Results\n` +
        `| Metric | Value |\n| :--- | :--- |\n| Score | ${totalCorrect}/${questions.length} |\n| Accuracy | **${accuracy}%** |\n| Attempted | ${attempted} |\n\n` +
        `## 📑 Subject Mastery\n` +
        subjects.map(s => {
          const subData = analysisData.filter(d => d.subject.toLowerCase() === s);
          if (subData.length === 0) return null;
          const subCorrect = subData.filter(d => d.isCorrect).length;
          const subAcc = Math.round((subCorrect/subData.length)*100);
          return `- **${s.toUpperCase()}**: ${subAcc}% Mastery`;
        }).filter(Boolean).join('\n') + 
        `\n\n## 🧠 Explanation Pathway\n` +
        analysisData.map(d => {
          let exp = d.explanation.concept ? `\n> **Concept:** ${d.explanation.concept}` : '';
          return `### Q${d.id}: ${d.isCorrect ? '✅' : (d.userAnswer === 'Skipped' ? '⚪' : '❌')}\n**Question:** ${d.text}\n**Selected:** ${d.userAnswer} | **Correct:** ${d.correctAnswer}${exp}\n---`;
        }).join('\n');

      // 3. TXT Format
      const txt = `==================================================\n` +
        `CET ENGINE PERFORMANCE ARCHIVE\n` +
        `==================================================\n` +
        `ID       : ${sessionId}\n` +
        `TIME     : ${dateStr} ${displayTime}\n` +
        `SUBJECT  : ${subjectName}\n` +
        `MOCK #   : ${mockNum}\n` +
        `ATTEMPT  : ${sessionContext.PASSION_ATTEMPT_INDEX}\n` +
        `--------------------------------------------------\n` +
        `SCORE    : ${totalCorrect}/${questions.length} (${accuracy}% Accuracy)\n` +
        `==================================================\n\n` +
        `QUESTION LOG:\n` +
        analysisData.map(d => `[${d.id.toString().padStart(2, '0')}] ${d.isCorrect ? 'RIGHT' : (d.userAnswer === 'Skipped' ? 'SKIP ' : 'WRONG')} | ${d.subject.toUpperCase()}`).join('\n');

      if (window.electronAPI?.saveAnalysis) {
        const res = await window.electronAPI.saveAnalysis({
          fileName: fileName,
          md, txt, json
        });
        if (res.success) setStatus('success');
        else throw new Error(res.error);
      } else {
        setStatus('success'); // Fallback for browser (already saved to localStorage)
      }
    } catch (err) {
      setErrorMsg(err.message);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#050A18] flex items-center justify-center p-6 relative overflow-hidden font-outfit">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[20%] w-[30%] h-[30%] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-2xl w-full text-center relative z-10">
        {status === 'processing' && (
          <div className="animate-in fade-in duration-500">
            <div className="w-16 h-16 border-[5px] border-white/5 border-t-blue-500 rounded-full animate-spin mx-auto mb-8 shadow-[0_0_30px_rgba(37,99,235,0.2)]"></div>
            <h1 className="text-3xl font-black !text-white mb-3 italic tracking-tighter">Processing Session Data...</h1>
            <p className="text-white/40 text-[11px] font-black uppercase tracking-[0.4em]">System Interface v1.3 · Knowledge Base Export</p>
          </div>
        )}

        {status === 'success' && (
          <div className="animate-in zoom-in-95 duration-500 bg-white/[0.02] backdrop-blur-3xl border border-white/10 p-12 rounded-[3rem] shadow-2xl">
            <div className="w-24 h-24 bg-green-500/20 text-green-400 rounded-3xl flex items-center justify-center mx-auto mb-10 border border-green-500/30 shadow-[0_0_40px_rgba(16,185,129,0.1)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h1 className="text-4xl font-black !text-white mb-3 italic tracking-tighter uppercase">Sync Successful</h1>
            <p className="text-white/50 text-sm font-medium mb-12 leading-relaxed max-w-md mx-auto">
              Your examination analysis has been securely archived within your decentralized knowledge repository.
              <span className="font-black !text-blue-400 block mt-6 px-6 py-3 bg-blue-600/10 rounded-2xl border border-blue-500/20 inline-block text-[10px] tracking-widest uppercase">
                Academics/Entrance_Test/Analysis_Archived
              </span>
            </p>
            
            <div className="flex flex-col gap-5 max-w-sm mx-auto">
              <button onClick={onHome} className="h-16 bg-blue-600 text-white font-black rounded-2xl hover:brightness-125 transition-all shadow-[0_0_40px_rgba(37,99,235,0.3)] active:scale-[0.98] uppercase text-xs tracking-widest">
                Return to Command Center
              </button>
              <button onClick={onReview} className="h-12 text-white/40 font-black text-[10px] uppercase tracking-widest hover:text-white transition-colors">
                Review Questions Offline
              </button>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="animate-in shake-in duration-500 bg-red-600/5 backdrop-blur-2xl border border-red-600/20 p-12 rounded-[3rem]">
            <div className="text-7xl mb-8">⚠️</div>
            <h1 className="text-3xl font-black !text-white mb-3 italic tracking-tighter uppercase">Export Failed</h1>
            <p className="text-white/40 text-sm mb-12 font-medium">{errorMsg}</p>
            <button onClick={onHome} className="h-16 px-12 bg-white/10 text-white font-black rounded-2xl border border-white/10 hover:bg-white/20 transition-all active:scale-[0.98] uppercase text-xs tracking-widest">
              Emergency Termination
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
