import React from 'react';

export default function QuestionPalette({ 
  questions = [],
  total, 
  currentIndex, 
  answers, 
  skipped, 
  visited = [],
  reviewMarked, 
  onJump 
}) {
  const sections = React.useMemo(() => {
    if (!questions || questions.length === 0) return [];
    
    const secs = [];
    let currentSubject = '';
    let start = 0;
    
    questions.forEach((q, idx) => {
      const rawSub = q.subject || 'Unknown';
      const subName = (rawSub.toLowerCase() === 'gk' || rawSub.toLowerCase() === 'general knowledge') 
        ? 'GK' 
        : rawSub.charAt(0).toUpperCase() + rawSub.slice(1);

      if (subName !== currentSubject) {
        if (currentSubject !== '') {
          secs.push({ name: currentSubject, start, end: idx - 1 });
        }
        currentSubject = subName;
        start = idx;
      }
    });

    if (currentSubject !== '') {
      secs.push({ name: currentSubject, start, end: questions.length - 1 });
    }
    return secs;
  }, [questions]);


  // Track which sections are expanded. Default all to true.
  const [expandedSections, setExpandedSections] = React.useState(() => {
    const initial = {};
    ['English', 'Reasoning', 'GK', 'Computer', 'General Knowledge'].forEach(s => { initial[s] = true; });
    return initial;
  });

  // Ensure new sections are also tracked
  React.useEffect(() => {
    setExpandedSections(prev => {
      const next = { ...prev };
      let changed = false;
      sections.forEach(s => {
        if (next[s.name] === undefined) {
          next[s.name] = true;
          changed = true;
        }
      });
      return changed ? next : prev;
    });
  }, [sections]);

  // Auto-expand current section when currentIndex changes
  React.useEffect(() => {
    const currentSection = sections.find(s => currentIndex >= s.start && currentIndex <= s.end);
    if (currentSection && !expandedSections[currentSection.name]) {
      setExpandedSections(prev => ({ ...prev, [currentSection.name]: true }));
    }
  }, [currentIndex, sections]);

  const toggleSection = (name) => {
    setExpandedSections(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const getCellClass = (idx) => {
    const isCurrent = currentIndex === idx;
    const isAnswered = answers[idx] !== undefined;
    const isSkipped = skipped.includes(idx);
    const isVisited = Array.isArray(visited) ? visited.includes(idx) : visited.has(idx);
    const isReview = reviewMarked.includes(idx);

    let base = "w-10 h-10 flex items-center justify-center rounded-xl text-[11px] font-black cursor-pointer transition-all border duration-300 ";
    
    if (isCurrent) {
      base += "bg-blue-600 border-blue-400 !text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] scale-110 z-10 ";
    } else if (isAnswered) {
      base += "bg-green-500/20 border-green-500/40 !text-green-400 ";
    } else if (isSkipped) {
      base += "bg-amber-500/20 border-amber-500/40 !text-amber-400 ";
    } else if (isVisited) {
      base += "bg-white/10 border-white/20 !text-white ";
    } else {
      base += "bg-white/[0.02] border-white/5 !text-white/20 ";
    }

    if (isReview) {
      base += "ring-2 ring-purple-500 ring-offset-2 ring-offset-[#050A18] ";
    }

    return base;
  };

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="h-full flex flex-col bg-black/40 backdrop-blur-3xl border-r border-white/10 select-none w-full relative">
      {/* Header */}
      <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/[0.02] backdrop-blur-md sticky top-0 z-20 shadow-2xl">
        <h3 className="text-[10px] font-black !text-white uppercase tracking-[0.3em]">Question Palette</h3>
        <span className="text-[11px] font-black !text-blue-400 bg-blue-600/10 px-4 py-1.5 rounded-xl border border-blue-500/20 shadow-lg">
          {answeredCount} <span className="opacity-40 mx-1">/</span> {total}
        </span>
      </div>

      <div className="flex-grow overflow-y-auto p-6 space-y-2 scroll-smooth pb-40 scrollbar-hide">
        {sections.map(section => {
          const isExpanded = expandedSections[section.name];
          return (
            <div key={`${section.name}-${section.start}`} className="border-b border-white/5 pb-2">
              <button 
                onClick={() => toggleSection(section.name)}
                className="w-full flex items-center justify-between py-4 group hover:bg-white/[0.02] rounded-xl px-2 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${isExpanded ? 'bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]' : 'bg-white/20'}`}></span>
                  <h4 className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${isExpanded ? '!text-white' : '!text-white/40'}`}>
                    {section.name}
                  </h4>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[9px] font-black !text-white/30 uppercase tracking-widest">
                    {section.end - section.start + 1} ITEMS
                  </span>
                  <span className={`text-[10px] !text-white/40 transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
              </button>
              
              {isExpanded && (
                <div className="grid grid-cols-5 gap-3 pt-3 pb-6 animate-in fade-in slide-in-from-top-2 duration-500">
                  {Array.from({ length: section.end - section.start + 1 }).map((_, i) => {
                    const idx = section.start + i;
                    return (
                      <button 
                        key={`q-${idx}`} 
                        onClick={() => onJump(idx)}
                        className={getCellClass(idx)}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend - Absolute Bottom */}
      <div className="p-8 border-t border-white/10 bg-[#050A18]/80 backdrop-blur-2xl absolute bottom-0 w-full z-20 shadow-[0_-20px_40px_rgba(0,0,0,0.4)]">
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-[9px] font-black uppercase tracking-[0.2em] !text-white/40">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500/40 rounded-sm border border-green-400/30"></div> 
            <span className="!text-green-400/80">Solved</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-amber-500/40 rounded-sm border border-amber-400/30"></div>
            <span className="!text-amber-400/80">Skipped</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-white/10 rounded-sm border border-white/20"></div>
            <span className="!text-white/40">Visited</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 border-2 border-purple-500 rounded-sm bg-purple-500/20"></div>
            <span className="!text-purple-400">Review</span>
          </div>
        </div>
      </div>
    </div>
  );
}
