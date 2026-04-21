import React from 'react';

export default function TestIntro({ config, date, type, onStart, onBack }) {
  if (!config) return null;

  return (
    <div className="min-h-screen bg-[#050A18] flex items-center justify-center p-6 relative overflow-hidden font-outfit">
      {/* Deep Atmospheric Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.1),transparent_70%)]"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]"></div>

      {/* Main Glass Container */}
      <div className="max-w-5xl w-full bg-white/[0.02] backdrop-blur-[60px] rounded-[3rem] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row relative z-10">
        
        {/* Left Side: Branded Signature Sidebar */}
        <div className="w-full md:w-[400px] bg-gradient-to-br from-blue-600/30 to-transparent p-12 flex flex-col justify-between border-r border-white/5 relative">
          <div className="relative z-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-blue-400"></div>
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.5em]">SYSTEM ACCESS</span>
            </div>
            <h1 className="text-5xl font-black !text-white leading-tight italic tracking-tighter mb-4">
              {type === 'P' ? 'UNLIMITED' : `MOCK ${type}`}
              <span className="block !text-blue-400">PREP</span>
            </h1>
            <p className="!text-white/60 text-[11px] font-bold uppercase tracking-widest leading-relaxed">
              Deterministic Examination Environment<br/>
              Isolated Strategic Practice Pool
            </p>
          </div>

          {/* Large Signature Glow */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.08] pointer-events-none">
            <svg width="320" height="320" viewBox="0 0 24 24" fill="currentColor" className="!text-blue-500">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            </svg>
          </div>

          <div className="relative z-20 space-y-6">
            <div className="flex items-center gap-5 group">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 group-hover:border-blue-400 transition-all shadow-xl backdrop-blur-md">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="!text-blue-400"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div>
                <span className="block text-[9px] font-black !text-white/50 uppercase tracking-widest mb-1">ALLOCATED TIME</span>
                <span className="text-2xl font-black !text-white tracking-tight">{config.duration || '210'} MIN</span>
              </div>
            </div>
            <div className="flex items-center gap-5 group">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 group-hover:border-blue-400 transition-all shadow-xl backdrop-blur-md">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="!text-blue-400"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              </div>
              <div>
                <span className="block text-[9px] font-black !text-white/50 uppercase tracking-widest mb-1">TOTAL CONTENT</span>
                <span className="text-2xl font-black !text-white tracking-tight">{config.totalQuestions} ITEMS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Instructions & Selection */}
        <div className="flex-grow p-12 flex flex-col bg-black/40">
          <div className="flex-grow">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-[11px] font-black !text-white uppercase tracking-[0.4em]">Protocols & Instructions</h2>
              <div className="flex-grow h-[1px] bg-white/20"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {[
                { t: "Mandatory", d: "All questions carry equal weightage." },
                { t: "No Penalty", d: "Zero negative marking implemented." },
                { t: "Live Sync", d: "Continuous state persistence active." },
                { t: "Locked", d: "Avoid refresh to prevent session loss." }
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] transition-all">
                  <span className="text-[9px] font-black !text-blue-400 uppercase tracking-widest block mb-1">{item.t}</span>
                  <p className="!text-white/80 text-xs font-medium leading-relaxed">{item.d}</p>
                </div>
              ))}
            </div>

            <div className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" className="!text-blue-500">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
              </div>
              <h3 className="text-[10px] font-black !text-white/60 uppercase tracking-[0.4em] mb-6">Subject Distribution Matrix</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {config.distribution && Object.entries(config.distribution).map(([sub, count], idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-[9px] font-black !text-blue-400 uppercase tracking-widest mb-1">{sub}</span>
                    <span className="text-xl font-black !text-white">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 flex gap-6">
            <button 
              onClick={onBack}
              className="px-10 py-5 rounded-2xl border border-white/10 text-white/60 font-black text-xs uppercase tracking-widest hover:bg-white/5 hover:text-white transition-all active:scale-95"
            >
              Terminate
            </button>
            <button 
              onClick={onStart}
              className="flex-grow py-5 rounded-2xl bg-blue-600 text-white font-black text-xs uppercase tracking-[0.3em] shadow-[0_0_40px_rgba(37,99,235,0.3)] hover:brightness-125 transition-all active:scale-[0.98] group relative overflow-hidden"
            >
              <span className="relative z-10">Initialize Session</span>
            </button>
          </div>
        </div>

      </div>

      {/* Decorative Signature in background */}
      <div className="absolute bottom-[-10%] left-[-5%] opacity-[0.02] pointer-events-none scale-150">
        <svg width="600" height="600" viewBox="0 0 24 24" fill="currentColor" className="text-blue-500">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
        </svg>
      </div>
    </div>
  );
}
