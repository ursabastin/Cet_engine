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
      const totalCorrect = questions.reduce((sum, q, idx) => {
        const selectedLetter = String.fromCharCode(65 + answers[idx]);
        return sum + (selectedLetter === q.correct ? 1 : 0);
      }, 0);
      
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
          isCorrect: String.fromCharCode(65 + answers[idx]) === q.correct,
          timeTaken: time,
          targetTime: target,
          surplus: diff > 0 ? diff : 0,
          deficit: diff < 0 ? Math.abs(diff) : 0,
          explanation: q.explanation || {}
        };
      });

      const dateStr = new Date().toISOString().split('T')[0];
      const timeStr = new Date().toLocaleTimeString().replace(/:/g, '-');
      const baseName = `CET_${dateStr}_Analysis_${timeStr}`;

      // Create MD content (Obsidian Optimized with Backlinks)
      const md = `# CET 2026 Performance Analysis\n\n` +
        `## 📊 Summary\n- **Date:** ${new Date().toLocaleDateString()}\n- **Score:** ${totalCorrect}/${questions.length}\n- **Accuracy:** ${Math.round((totalCorrect/questions.length)*100)}%\n- **Raw Data:** [[${baseName}.json]]\n\n` +
        `## 📑 Subject Performance\n` +
        subjects.map(s => `- #[[${s.toUpperCase()}]] Mastery`).join('\n') + 
        `\n\n## ⏱️ Question-Level Analytics\n| Q# | Subject | Topic | Result | Time | Target | Diff |\n|---|---|---|---|---|---|---|\n` +
        analysisData.map(d => `| ${d.id} | #[[${d.subject}]] | [[${d.topic}]] | ${d.isCorrect ? '✅' : '❌'} | ${d.timeTaken}s | ${d.targetTime}s | ${d.surplus > 0 ? '+' + d.surplus : '-' + d.deficit}s |`).join('\n') +
        `\n\n## 🧠 Question Data Bank\n` +
        analysisData.map(d => {
          let expHtml = '';
          if (d.explanation.concept) expHtml += `> [!INFO] Concept: [[${d.explanation.concept}]]\n`;
          if (d.explanation.step_by_step) {
            expHtml += `\n**Logic Pathway:**\n` + d.explanation.step_by_step.map(s => `1. ${s}`).join('\n');
          }
          return `### Question ${d.id}\n**Topic:** [[${d.topic}]]\n**Text:** ${d.text}\n**Your Answer:** ${d.userAnswer}\n**Correct:** ${d.correctAnswer}\n${expHtml}\n**Time Spent:** ${d.timeTaken}s\n---`;
        }).join('\n');

      const txt = `CET Analysis Summary\nDate: ${new Date().toLocaleString()}\nScore: ${totalCorrect}/${questions.length}\n\n` +
        analysisData.map(d => `Q${d.id} [${d.subject} - ${d.topic}]: ${d.isCorrect ? 'PASS' : 'FAIL'} | Time: ${d.timeTaken}s`).join('\n');

      const json = JSON.stringify({ 
        metadata: { date: dateStr, score: totalCorrect, total: questions.length, baseName },
        details: analysisData 
      }, null, 2);

      if (window.electronAPI?.saveAnalysis) {
        const res = await window.electronAPI.saveAnalysis({
          date: dateStr,
          type: 'EXAM',
          md, txt, json
        });
        if (res.success) {
          setStatus('success');
        } else {
          throw new Error(res.error);
        }
      } else {
        throw new Error('FileSystem Access Denied');
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
            <p className="text-white/40 text-[11px] font-black uppercase tracking-[0.4em]">Encrypting · Syncing · Knowledge Base Export</p>
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
