import React from 'react';
import AnalyticsView from '../components/AnalyticsView';

export default function Home({ onStartTest, onBack }) {
  const [selectedDate, setSelectedDate] = React.useState('2026-04-21');
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
    { label: 'GK', count: 415, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'ENG', count: 370, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'REAS', count: 311, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { label: 'COMP', count: 282, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  ];

  return (
    <div className="h-screen bg-bg-primary flex overflow-hidden relative font-outfit">
      {/* Background Blobs for Glass Visibility */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[20%] w-[30%] h-[30%] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Content Area */}
      <div className="flex h-full w-full overflow-hidden relative z-10">
        
        {/* Main Roadmap Dashboard (LEFT) */}
        <div className="flex-grow flex flex-col p-4 md:p-6 overflow-y-auto">
          {/* Top Branding with Back Button */}
          <div className="relative group ml-2 mt-4 flex-shrink-0 flex items-center gap-6 mb-8">
            <button 
              onClick={onBack}
              className="w-10 h-10 rounded-full border border-border-custom flex items-center justify-center hover:bg-bg-hover transition-all active:scale-90 group/back"
              title="Return to Welcome Screen"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover/back:-translate-x-1 transition-transform">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="flex flex-col">
              <h1 className="text-4xl font-black !text-white tracking-tighter uppercase italic">
                Strategic <span className="!text-blue-600">Roadmap</span>
              </h1>
              <p className="text-text-secondary text-[10px] font-black uppercase tracking-[0.3em] opacity-50 mt-1">
                8-Day Session Plan · 16 Practice Sets
              </p>
            </div>
          </div>

          <div key={selectedDate} className="animate-[fadeInUp_0.5s_ease-out] flex-grow flex flex-col items-center">
            {selectedDate === '2026-04-29' ? (
              <AnalyticsView />
            ) : (
              <div className="w-full px-2 flex flex-col">

                {/* 16-Card Practice Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full mb-8">
                  {['2026-04-21', '2026-04-22', '2026-04-23', '2026-04-24', '2026-04-25', '2026-04-26', '2026-04-27', '2026-04-28'].map((date, idx) => (
                    <React.Fragment key={date}>
                      <SessionTile 
                        date={date} 
                        type="A" 
                        dayNum={idx + 1}
                        onClick={() => onStartTest('daily', date, 'A')}
                      />
                      <SessionTile 
                        date={date} 
                        type="B" 
                        dayNum={idx + 1}
                        onClick={() => onStartTest('daily', date, 'B')}
                      />
                    </React.Fragment>
                  ))}
                </div>
                
                <div className="flex items-center gap-6 mt-2 opacity-50">
                  <div className="w-12 h-[1px] bg-border-custom"></div>
                  <p className="text-[9px] font-black text-text-secondary uppercase tracking-[0.4em]">
                    Wiz Academy Selection Pool Active
                  </p>
                  <div className="w-12 h-[1px] bg-border-custom"></div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Practice Mock Sidebar (RIGHT) */}
        <div className={`transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] relative flex flex-col border-l border-white/10 ${isSidebarOpen ? 'w-[440px] opacity-100' : 'w-16 opacity-100 bg-[#050A18]'}`}>
          
          {/* Toggle Button */}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0A0F1D] border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all z-50 group"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={`text-white transition-transform duration-500 ${isSidebarOpen ? 'rotate-0' : 'rotate-180'}`}>
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <div className={`h-full flex flex-col p-8 overflow-y-auto scrollbar-hide transition-all duration-700 ${isSidebarOpen ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}>
            <div className="mb-8">
              <h3 className="text-2xl font-black text-text-primary tracking-tighter uppercase italic mb-1">
                Practice <span className="text-blue-600">Mocks</span>
              </h3>
              <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest opacity-60 leading-tight mb-6">
                Full-Length Simulations · 56-Topic Isolated Pool
              </p>

              {/* Subject Statistics Grid */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                {subjectStats.map((stat) => (
                  <div key={stat.label} className={`p-3 rounded-2xl border border-white/5 ${stat.bg} flex flex-col`}>
                    <span className="text-[9px] font-black uppercase tracking-widest opacity-40">{stat.label}</span>
                    <span className={`text-lg font-black ${stat.color}`}>{stat.count}</span>
                  </div>
                ))}
                
                {/* Analysis Toggle Card */}
                <button 
                  onClick={() => setShowAnalysis(true)}
                  className="col-span-2 p-4 rounded-2xl border border-blue-500/20 bg-blue-600/5 hover:bg-blue-600/10 transition-all group flex items-center justify-between"
                >
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase tracking-widest text-blue-400 opacity-60">Usage Analysis</span>
                    <span className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">Trace Question History</span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-blue-500/30 transition-all">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <button 
                  key={num}
                  onClick={() => onStartTest('daily', `2026-04-2${num}`, 'MOCK')}
                  className="w-full relative p-7 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] flex flex-col gap-1 hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_50px_rgba(37,99,235,0.15)] transition-all group active:scale-95 text-left overflow-hidden h-36"
                >
                  {/* Subtle Gradient Glow */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl group-hover:bg-blue-600/10 transition-colors"></div>

                  {/* Top Right: Mock Number */}
                  <div className="absolute top-5 right-6 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-text-primary/40 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all shadow-sm">
                    {num}
                  </div>

                  {/* Center: System Signature (Logo) */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] group-hover:opacity-10 transition-all duration-700 pointer-events-none">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" className="text-blue-600">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                    </svg>
                  </div>

                  <div className="relative z-10 mt-auto">
                    <h4 className="text-sm font-black text-text-primary uppercase tracking-tight mb-0.5 italic">Mock Test {num}</h4>
                    <p className="text-[10px] text-text-secondary font-black uppercase tracking-[0.2em] opacity-40 group-hover:text-blue-600 group-hover:opacity-100 transition-all">
                      200 Qs · 210 Min
                    </p>
                  </div>

                  <div className="absolute bottom-5 right-6 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Collapsed State Icon */}
          {!isSidebarOpen && (
            <div className="absolute inset-0 flex flex-col items-center pt-10 gap-8 pointer-events-none">
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-500 font-black italic">P</div>
              <div className="flex flex-col gap-4 opacity-20">
                {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 rounded-lg bg-white/10"></div>)}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Analysis Modal */}
      {showAnalysis && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowAnalysis(false)}></div>
          
          <div className="relative w-full max-w-2xl bg-[#0A0F1D] border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="p-8 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-white tracking-tighter uppercase italic">Question <span className="text-blue-500">Trace Analysis</span></h2>
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] mt-1">Global usage across 16 mock tests</p>
              </div>
              <button 
                onClick={() => setShowAnalysis(false)}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all text-white/40 hover:text-white"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-grow overflow-y-auto p-8 pt-0 scrollbar-hide">
              <div className="space-y-6">
                
                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Unique Questions', val: '1,378', color: 'text-blue-400' },
                    { label: 'Mock Attempts', val: history.mocks.length, color: 'text-emerald-400' },
                    { label: 'Practice Sets', val: history.practice.length, color: 'text-purple-400' }
                  ].map(s => (
                    <div key={s.label} className="p-4 rounded-3xl bg-white/[0.03] border border-white/5">
                      <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">{s.label}</p>
                      <p className={`text-xl font-black ${s.color}`}>{s.val}</p>
                    </div>
                  ))}
                </div>

                {/* Analysis Table */}
                <div className="rounded-3xl border border-white/5 bg-white/[0.02] overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="p-4 text-[10px] font-black text-white/20 uppercase tracking-widest">Attempt Trace</th>
                        <th className="p-4 text-[10px] font-black text-white/20 uppercase tracking-widest">Type</th>
                        <th className="p-4 text-[10px] font-black text-white/20 uppercase tracking-widest">Overlap Rate</th>
                        <th className="p-4 text-[10px] font-black text-white/20 uppercase tracking-widest">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs">
                      {history.mocks.length > 0 ? history.mocks.slice(-6).map((row, i) => (
                        <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                          <td className="p-4 font-black text-white italic">Mock {row.type} - {row.date}</td>
                          <td className="p-4 text-white/50">Full Mock</td>
                          <td className="p-4 text-blue-400 font-bold">{Math.min(i * 12, 100)}%</td>
                          <td className="p-4 text-emerald-400 font-black uppercase tracking-tighter">Verified</td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="4" className="p-12 text-center text-white/20 font-black uppercase tracking-[0.2em]">No attempt history found yet</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="p-6 rounded-3xl bg-blue-600/5 border border-blue-500/20">
                  <p className="text-[10px] leading-relaxed text-blue-300/80 font-medium">
                    <span className="font-black text-blue-400 uppercase tracking-widest mr-2">System Note:</span>
                    Practice mode and Mock tests share the 1,378 pool but are tracked separately. Your roadmap remains valid even if questions overlap across modes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SessionTile({ date, type, dayNum, onClick }) {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  
  return (
    <button 
      onClick={onClick}
      className="relative h-44 rounded-[2.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-3xl transition-all group flex flex-col items-center justify-center hover:bg-white/[0.07] hover:border-blue-500/30 hover:shadow-[0_0_80px_rgba(37,99,235,0.15)] hover:-translate-y-1 active:scale-95 text-center overflow-hidden"
    >
      {/* Subtle Gradient Glow */}
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-blue-600/10 rounded-full blur-[80px] group-hover:bg-blue-600/20 transition-all duration-1000"></div>
      
      {/* Top Left: Day & Date (Small, side-by-side) */}
      <div className="absolute top-6 left-7 flex items-baseline gap-2">
        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">DAY {dayNum.toString().padStart(2, '0')}</span>
        <span className="text-[9px] font-bold text-blue-500/50 uppercase tracking-widest">{day} {month}</span>
      </div>
      
      {/* Top Right: SET Identifier (Now in the corner) */}
      <div className="absolute top-6 right-7">
        <span className="text-sm font-black italic text-white group-hover:text-blue-400 transition-all tracking-tighter uppercase">MOCK {type}</span>
      </div>
      
      {/* Center: System Signature (Logo) - The prominent feature */}
      <div className="relative z-10 flex flex-col items-center opacity-[0.05] group-hover:opacity-[0.15] transition-all duration-1000 scale-[2.2] group-hover:scale-[2.5] filter blur-[0.5px] group-hover:blur-0">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-blue-500">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
        </svg>
      </div>
      
      {/* Decorative Bottom Bar */}
      <div className="absolute bottom-6 w-8 h-[2px] bg-white/5 rounded-full group-hover:bg-blue-500 group-hover:w-16 transition-all duration-700"></div>
    </button>
  );
}
