import React, { useState, useEffect } from 'react';
import { getDayProgress } from '../utils/storageHelper';

const DAYS = [
  { date: '2026-04-21', label: 'Tuesday' },
  { date: '2026-04-22', label: 'Wednesday' },
  { date: '2026-04-23', label: 'Thursday' },
  { date: '2026-04-24', label: 'Friday' },
  { date: '2026-04-25', label: 'Saturday' },
  { date: '2026-04-26', label: 'Sunday' },
  { date: '2026-04-27', label: 'Monday' },
  { date: '2026-04-28', label: 'Tuesday' },
];

export default function CalendarWidget({ onDaySelect, onStartPractice, onStartUnlimited, isVertical = false }) {
  // SET THE SIMULATED "TODAY" DATE FOR TESTING OR REAL-TIME
  // For production: new Date().toISOString().split('T')[0]
  // For testing 21st/22nd transition, we'll use a variable.
  const [today, setToday] = useState('2026-04-20'); 
  const [dayStats, setDayStats] = useState({});
  const [activeDate, setActiveDate] = useState('2026-04-21');

  useEffect(() => {
    // Sync today with real clock (but keep simulated for now if needed)
    const realToday = new Date().toISOString().split('T')[0];
    // For the sake of the user's scenario (21st vs 22nd), let's set it to realToday or 2026-04-20
    setToday(realToday > '2026-04-20' ? realToday : '2026-04-20');

    const updateStats = () => {
      const stats = {};
      DAYS.forEach(d => {
        stats[d.date] = getDayProgress(d.date);
      });
      setDayStats(stats);
    };
    
    updateStats();
    window.addEventListener('storage', updateStats);
    return () => window.removeEventListener('storage', updateStats);
  }, []);

  const handleDayClick = (day, isLocked) => {
    if (isLocked) return;
    setActiveDate(day.date);
    onDaySelect(day.date);
  };

  if (isVertical) {
    return (
      <div className="flex flex-col gap-3 p-4">
        {DAYS.map((day, index) => {
          const stats = dayStats[day.date] || { percent: 0, isDone: false };
          const isActive = day.date === activeDate;
          const dayNum = day.date.split('-')[2];
          
          // LOCKING LOGIC
          const isPast = day.date < today;
          const isFuture = day.date > today;
          const isToday = day.date === today;
          const isLocked = (isPast && !stats.isDone) || isFuture;
          const isDone = stats.isDone;

          return (
            <div
              key={day.date}
              onClick={() => handleDayClick(day, isLocked)}
              className={`group flex items-center gap-4 p-3 rounded-2xl transition-all border-2 ${
                isLocked 
                  ? 'opacity-40 grayscale cursor-not-allowed border-transparent' 
                  : isActive 
                    ? 'bg-blue-600 border-blue-600 shadow-lg translate-x-1 cursor-pointer' 
                    : 'bg-white border-border-custom hover:border-blue-100 hover:bg-blue-50/50 cursor-pointer'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0 transition-colors ${
                isActive ? 'bg-white/20' : 'bg-bg-hover'
              }`}>
                {isLocked ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-text-secondary">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                ) : (
                  <>
                    <span className={`text-[8px] font-black uppercase tracking-tighter ${isActive ? 'text-white/60' : 'text-text-secondary'}`}>
                      {day.label.substring(0, 3)}
                    </span>
                    <span className={`text-lg font-black ${isActive ? 'text-white' : 'text-text-primary'}`}>
                      {dayNum}
                    </span>
                  </>
                )}
              </div>

              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={`font-black text-sm truncate ${isActive ? 'text-white' : 'text-text-primary'}`}>
                    Day {index + 1}
                  </h3>
                  {isDone ? (
                    <span className="bg-green-500 text-white text-[7px] font-black px-1.5 py-0.5 rounded-full uppercase">
                      COMPLETED
                    </span>
                  ) : stats.percent > 0 ? (
                    <span className={`${isActive ? 'bg-white/20' : 'bg-orange-100 text-orange-600'} text-[7px] font-black px-1.5 py-0.5 rounded-full uppercase`}>
                      {stats.percent}% DONE
                    </span>
                  ) : null}
                </div>
                
                <div className="relative w-full h-1 bg-black/5 rounded-full overflow-hidden">
                  <div 
                    className={`absolute left-0 top-0 h-full transition-all duration-1000 ${isActive ? 'bg-white' : 'bg-blue-600'}`}
                    style={{ width: `${stats.percent}%` }}
                  ></div>
                </div>
              </div>

              {!isLocked && (
                <div className={`text-lg transition-transform group-hover:translate-x-1 ${isActive ? 'text-white' : 'text-blue-600'}`}>
                  →
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // Legacy horizontal mode if needed
  return (
    <div className="flex gap-3 p-3 bg-white border border-border-custom rounded-2xl shadow-xl overflow-x-auto">
      {DAYS.map((day) => {
        const dayNum = day.date.split('-')[2];
        const isActive = day.date === activeDate;
        
        return (
          <div
            key={day.date}
            onClick={() => handleDayClick(day)}
            className={`flex flex-col items-center justify-center min-w-[64px] h-[84px] rounded-xl cursor-pointer transition-all ${
              isActive ? 'bg-blue-50 border-2 border-accent-blue scale-105' : 'border border-border-custom bg-bg-primary/30'
            } hover:scale-105 hover:shadow-md active:scale-95`}
          >
            <span className="text-[11px] uppercase text-text-secondary font-black tracking-widest">{day.label.substring(0, 3)}</span>
            <span className="text-xl font-black text-text-primary mt-1">{dayNum}</span>
            <div className={`w-2 h-2 rounded-full mt-2 shadow-sm ${completedDays.includes(day.date) ? 'bg-accent-green' : 'bg-gray-300'}`}></div>
          </div>
        );
      })}
    </div>
  );
}
