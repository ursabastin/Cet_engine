import React from 'react';
import AnalyticsView from '../components/AnalyticsView';

export default function Home({ onStartTest, onBack }) {
  const [showAnalysis, setShowAnalysis] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  // Load actual history for stats
  const history = React.useMemo(() => {
    try {
      const mockHistory = JSON.parse(localStorage.getItem('cet_mock_history') || '[]');
      const practiceHistory = JSON.parse(localStorage.getItem('cet_practice_history') || '[]');
      return { mocks: mockHistory, practice: practiceHistory };
    } catch (e) {
      return { mocks: [], practice: [] };
    }
  }, []);

  const totalAttempted = history.mocks.length + history.practice.length;

  const subjectStats = [
    { label: 'GK', count: 460, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'ENG', count: 411, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'REAS', count: 361, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { label: 'COMP', count: 327, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  ];

  return (
    <div className="h-screen bg-bg-primary flex overflow-hidden relative font-outfit">
      {/* Background Blobs for Glass Visibility */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[20%] w-[30%] h-[30%] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Content Area */}
      <div className="flex h-full w-full overflow-hidden relative z-10">
        
        {/* Main Live Dashboard (FULL WIDTH) */}
        <div className="flex-grow flex flex-col p-4 md:p-12 overflow-y-auto">
          {/* Top Branding with Back Button */}
          <div className="relative group ml-2 mt-4 flex-shrink-0 flex items-center gap-8 mb-12">
            <button 
              onClick={onBack}
              className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:border-blue-500 transition-all active:scale-90 group/back"
              title="Return to Welcome Screen"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover/back:-translate-x-1 transition-transform text-white">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="flex flex-col">
              <div className="flex items-center gap-6">
                <h1 className="text-5xl font-black !text-white tracking-tighter uppercase italic leading-none">
                  CET 2026 <span className="text-blue-600">Live Engine</span>
                </h1>
                <button 
                  onClick={() => setShowAnalysis(true)}
                  className="px-6 py-3 rounded-xl bg-blue-600/10 border border-blue-500/30 text-blue-400 font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all active:scale-95 flex items-center gap-3 group/analysis shadow-lg shadow-blue-900/10"
                >
                  <span className="text-lg group-hover/analysis:rotate-12 transition-transform">📊</span>
                  Analytical View
                </button>
              </div>
              <p className="text-white/40 text-[11px] font-black uppercase tracking-[0.4em] mt-2">
                Dynamic Question Delivery · Full Syllabus Integration
              </p>
            </div>
          </div>

          <div className="flex-grow w-full max-w-6xl mx-auto py-8">
            <h2 className="text-sm font-black text-blue-500 uppercase tracking-[0.4em] mb-10 flex items-center gap-6">
              <span className="w-16 h-[1px] bg-blue-500/30"></span>
              Topic Mastery Hub
            </h2>
            
            <MasteryHub onStartTest={onStartTest} />
          </div>
        </div>

      </div>

      {/* Analysis Modal */}
      {showAnalysis && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-[#050A18]/90 backdrop-blur-xl" onClick={() => setShowAnalysis(false)}></div>
          
          <div className="relative w-full max-w-5xl bg-[#0A0F1D]/80 border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="p-8 pb-4 flex items-center justify-between border-b border-white/5 bg-white/5 backdrop-blur-3xl">
              <div>
                <h2 className="text-2xl font-black text-white tracking-tighter uppercase italic">Engine <span className="text-blue-500">Analytics</span></h2>
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] mt-1">Live performance tracking · Variation 51</p>
              </div>
              <button 
                onClick={() => setShowAnalysis(false)}
                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-500 hover:border-red-400 transition-all text-white/40 hover:text-white group/close"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover/close:rotate-90 transition-transform"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>

            {/* Modal Content - Full Analytics Suite */}
            <div className="flex-grow overflow-y-auto p-8 scrollbar-hide">
              <AnalyticsView />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MasteryHub({ onStartTest }) {
  const [manifest, setManifest] = React.useState(null);
  const [mockPlan, setMockPlan] = React.useState(null);
  const [openSubject, setOpenSubject] = React.useState('reasoning');
  const [showGate, setShowGate] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const bust = Date.now();
    // Load both manifest and the pre-planned mock blueprint with cache busting
    Promise.all([
      fetch(`data/manifest.json?v=${bust}`).then(res => {
        if (!res.ok) throw new Error('Manifest not found');
        return res.json();
      }),
      fetch(`data/mock_plan.json?v=${bust}`).then(res => {
        if (!res.ok) throw new Error('Mock Blueprint not found');
        return res.json();
      })
    ]).then(([manifestData, planData]) => {
      setManifest(manifestData);
      setMockPlan(planData);
    }).catch(err => {
      console.error('Error loading engine data:', err);
      setError(err.message);
    });
  }, []);

  if (error) return (
    <div className="p-12 rounded-3xl border border-red-500/20 bg-red-500/5 text-center">
      <div className="text-red-400 font-black uppercase tracking-widest text-xs mb-2">Engine Synchronisation Failed</div>
      <div className="text-white/40 text-[10px] font-bold uppercase">{error}</div>
      <button onClick={() => window.location.reload()} className="mt-6 px-6 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase hover:bg-white/10">Re-Initialize</button>
    </div>
  );

  if (!manifest || !mockPlan) return (
    <div className="p-20 flex flex-col items-center justify-center text-center">
      <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-6"></div>
      <div className="text-white/20 uppercase font-black tracking-widest text-[10px] animate-pulse">Synchronizing Engine Blueprint...</div>
    </div>
  );

  const subjects = [
    { id: 'reasoning', label: 'Reasoning', icon: 'M12 20V10M18 20V4M6 20V16', color: 'text-purple-400', border: 'border-purple-500/20', bg: 'bg-purple-500/5', glow: 'shadow-[0_0_40px_rgba(168,85,247,0.1)]' },
    { id: 'english', label: 'English', icon: 'M12 19l7-7-7-7m-7 14l7-7-7-7', color: 'text-blue-400', border: 'border-blue-500/20', bg: 'bg-blue-500/5', glow: 'shadow-[0_0_40px_rgba(59,130,246,0.1)]' },
    { id: 'gk', label: 'General Knowledge', icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9', color: 'text-emerald-400', border: 'border-emerald-500/20', bg: 'bg-emerald-500/5', glow: 'shadow-[0_0_40px_rgba(16,185,129,0.1)]' },
    { id: 'computer', label: 'Computer Basics', icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z', color: 'text-amber-400', border: 'border-amber-500/20', bg: 'bg-amber-500/5', glow: 'shadow-[0_0_40px_rgba(245,158,11,0.1)]' }
  ];

  // Logic to render the pre-planned mocks for the open subject
  const getPacks = (subjectId) => {
    if (!mockPlan || !mockPlan[subjectId]) return [];
    return mockPlan[subjectId].map(mock => {
      const topicLabels = mock.topics.map(t => t.name.replace(/_/g, ' '));
      return {
        ...mock,
        title: `Subject Mock ${mock.id}`,
        topicSummary: topicLabels.slice(0, 3).join(', ') + (topicLabels.length > 3 ? ' ...' : ''),
        fullTopicNames: topicLabels.join(', '),
        duration: "25m 00s",
        questions: 50
      };
    });
  };

  return (
    <div className="w-full flex flex-col gap-6 relative">
      {/* Subject Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {subjects.map(sub => (
          <button 
            key={sub.id}
            onClick={() => setOpenSubject(sub.id)}
            className={`relative p-5 py-6 rounded-2xl border transition-all duration-500 flex items-center gap-4 group ${
              openSubject === sub.id 
                ? `${sub.border} ${sub.bg} ${sub.glow} translate-y-[-2px]` 
                : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 ${sub.color} group-hover:scale-110 transition-transform`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d={sub.icon} />
              </svg>
            </div>
            <div className="flex flex-col items-start overflow-hidden">
              <span className="text-white font-black text-sm tracking-tight uppercase italic truncate w-full text-left">{sub.label}</span>
              <span className="text-white/20 text-[7px] font-black uppercase tracking-[0.2em]">{manifest[sub.id].length} Targets Found</span>
            </div>
          </button>
        ))}
      </div>

      {/* The Mastery Map & Endurance Packs */}
      <div className={`transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden ${openSubject ? 'max-h-[8000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        {openSubject && (
          <div className="space-y-12">
            {/* Endurance Packs Section */}
            <div className="p-8 rounded-3xl border border-blue-500/20 bg-blue-600/5 backdrop-blur-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] translate-x-32 translate-y-[-32px]"></div>
              
              <div className="flex items-center gap-8 mb-8 relative z-10">
                <h3 className="text-xl font-black text-white tracking-tighter uppercase italic flex-shrink-0">
                  {openSubject.replace(/_/g, ' ')} <span className="text-blue-500">Subject Mocks</span>
                </h3>
                <div className="h-px w-full bg-gradient-to-r from-blue-500/20 to-transparent"></div>
                <div className="flex-shrink-0 px-4 py-1.5 rounded-lg bg-blue-600 border border-blue-400/30 text-[9px] font-black text-white uppercase tracking-widest">
                  50 Qs · 25 Mins
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
                {getPacks(openSubject).map(pack => (
                  <button 
                    key={pack.id}
                    onClick={() => setShowGate(pack)}
                    className="p-6 h-44 rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.1] hover:border-blue-500/30 transition-all text-left flex flex-col group/pack shadow-xl relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded bg-blue-500/20 flex items-center justify-center">
                          <span className="text-blue-400 font-black text-[10px] italic">{pack.id}</span>
                        </div>
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Module</span>
                      </div>
                      <span className="text-[8px] font-bold text-blue-400 uppercase tracking-widest">{pack.duration}</span>
                    </div>
                    
                    <span className="text-white/80 font-bold text-xs uppercase tracking-tight mb-2 line-clamp-3 leading-snug group-hover/pack:text-blue-400 transition-colors">
                      {pack.topicSummary}
                    </span>
                    
                    <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[7px] font-black text-white/10 uppercase tracking-[0.2em]">Syllabus Pack</span>
                      <div className="flex items-center gap-2">
                         <span className="text-[9px] font-black text-white">50</span>
                         <span className="text-[7px] font-bold text-white/20 uppercase tracking-widest">Items</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Individual Topics Section */}
            <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-3xl">
              <div className="flex items-center gap-8 mb-8">
                <h3 className="text-xl font-black text-white tracking-tighter uppercase italic flex-shrink-0">
                  Topic <span className="text-white/30">Mastery Bank</span>
                </h3>
                <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {manifest[openSubject].map(topic => (
                  <button 
                    key={topic}
                    onClick={() => onStartTest('topic', topic, 'T', openSubject)}
                    className="p-5 h-24 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/10 transition-all text-left flex flex-col justify-between group/topic"
                  >
                    <span className="text-white font-black text-[11px] group-hover/topic:text-blue-400 transition-colors uppercase tracking-tight line-clamp-2">
                      {topic.replace(/_/g, ' ')}
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="text-[7px] font-black text-white/10 uppercase tracking-widest group-hover/topic:text-white/30 transition-colors">Study Target</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover/topic:opacity-100 transition-all text-blue-500 translate-x-[-10px] group-hover/topic:translate-x-0">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mastery Gate Pop-up */}
      {showGate && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={() => setShowGate(null)}></div>
          <div className="relative w-full max-w-xl bg-[#0A0F1D] border border-blue-500/30 rounded-3xl shadow-[0_0_120px_rgba(59,130,246,0.25)] p-12 text-center animate-in zoom-in-95 duration-300 overflow-hidden">
            {/* Visual background element */}
            <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-blue-600/5 rounded-full blur-3xl"></div>
            
            <div className="w-20 h-20 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-10 relative">
              <div className="absolute inset-0 animate-ping bg-blue-500/5 rounded-2xl"></div>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 relative z-10">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            
            <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic mb-6">
              Simulation <span className="text-blue-500">Initiated</span>
            </h2>
            
            <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 mb-10 text-left relative">
              <span className="absolute top-4 left-4 text-[9px] font-black text-blue-500/40 uppercase tracking-[0.3em]">Simulation Matrix</span>
              <div className="mt-8 space-y-3">
                {showGate.topics.map((t, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] font-black text-white/70 uppercase tracking-tight italic truncate pr-4">
                      {t.name.replace(/_/g, ' ')}
                    </span>
                    <span className="text-xs font-black text-blue-400 tabular-nums">
                      {t.count} <span className="text-[9px] text-white/20 uppercase font-bold">Qs</span>
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-[9px] font-bold text-white/40 leading-relaxed mt-6 italic text-center">
                "You must master these specific topics first for better challenge and endurance."
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="flex flex-col p-6 rounded-2xl bg-blue-600/5 border border-blue-500/20">
                <span className="text-[9px] font-black text-blue-400/60 uppercase tracking-widest mb-2">Sim Duration</span>
                <span className="text-2xl font-black text-white tracking-tighter">25:00 <span className="text-[9px] text-white/30">MINS</span></span>
              </div>
              <div className="flex flex-col p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-2">Task Load</span>
                <span className="text-2xl font-black text-white tracking-tighter">50 <span className="text-[9px] text-white/30">QS</span></span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button 
                onClick={() => {
                  onStartTest('endurance', showGate.topics, showGate.id, openSubject);
                  setShowGate(null);
                }}
                className="w-full py-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest transition-all shadow-[0_20px_40px_rgba(37,99,235,0.4)] active:scale-[0.98] text-base"
              >
                Launch Simulation
              </button>
              <button 
                onClick={() => setShowGate(null)}
                className="w-full py-4 rounded-xl text-white/20 hover:text-white/50 font-black uppercase tracking-widest transition-all text-[9px]"
              >
                Abort & Return to Study
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
