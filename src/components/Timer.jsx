import React from 'react';
import { useTimer } from '../hooks/useTimer';

export default function Timer({ totalSeconds, onExpire, hidden }) {
  const { formattedTime, isWarning } = useTimer(totalSeconds, onExpire);

  if (hidden) return null;

  return (
    <div className={`flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2.5 rounded-2xl backdrop-blur-md shadow-2xl ${
      isWarning ? 'border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.1)]' : ''
    }`}>
      <span className="text-[10px] font-black !text-white/40 uppercase tracking-[0.2em]">Time Remaining</span>
      <span className={`text-2xl font-black tabular-nums tracking-tighter ${
        isWarning ? 'text-red-500 animate-pulse' : '!text-white'
      }`}>
        {formattedTime}
      </span>
    </div>
  );
}
