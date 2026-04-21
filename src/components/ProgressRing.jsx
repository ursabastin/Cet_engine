import React from 'react';

export default function ProgressRing({ percentage, label, color = "var(--accent-blue)" }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex items-center justify-center">
        <svg className="w-20 h-20 transform -rotate-90">
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="var(--bg-hover)"
            strokeWidth="6"
            fill="transparent"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke={color}
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={circumference}
            style={{ strokeDashoffset: offset, transition: 'stroke-dashoffset 0.5s ease-out' }}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-sm font-bold text-text-primary">{Math.round(percentage)}%</span>
      </div>
      <span className="mt-2 text-[11px] font-bold text-text-secondary uppercase tracking-tight">{label}</span>
    </div>
  );
}
