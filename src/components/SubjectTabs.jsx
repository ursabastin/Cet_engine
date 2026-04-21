import React from 'react';

const SUBJECT_CONFIG = [
  { id: 'english', label: 'English', range: [0, 59] },
  { id: 'reasoning', label: 'Reasoning', range: [60, 119] },
  { id: 'gk', label: 'GK', range: [120, 159] },
  { id: 'computer', label: 'Computer', range: [160, 199] },
];

export default function SubjectTabs({ activeSubject, onSwitch, answers }) {
  const getAnsweredCount = (start, end) => {
    let count = 0;
    for (let i = start; i <= end; i++) {
      if (answers[i] !== undefined) count++;
    }
    return count;
  };

  return (
    <div className="flex border-b border-border-custom bg-white w-full overflow-x-auto scrollbar-hide">
      {SUBJECT_CONFIG.map((sub) => {
        const isActive = activeSubject === sub.id;
        const total = sub.range[1] - sub.range[0] + 1;
        const answered = getAnsweredCount(sub.range[0], sub.range[1]);

        return (
          <button
            key={sub.id}
            onClick={() => onSwitch(sub.id, sub.range[0])}
            className={`flex-1 min-w-[120px] py-4 px-2 flex flex-col items-center justify-center relative transition-all ${
              isActive ? 'text-accent-blue font-bold' : 'text-text-secondary font-medium hover:text-text-primary'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm">{sub.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                isActive ? 'bg-accent-blue text-white' : 'bg-bg-hover text-text-secondary'
              }`}>
                {answered}/{total}
              </span>
            </div>
            {isActive && (
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-accent-blue"></div>
            )}
          </button>
        );
      })}
    </div>
  );
}
