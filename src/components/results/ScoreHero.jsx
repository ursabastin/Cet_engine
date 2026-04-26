import React, { useEffect, useState } from 'react';

export default function ScoreHero({ score, totalMarks, percentage }) {
  const [animatedPct, setAnimatedPct] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 4);
      setAnimatedPct(percentage * easeOut);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setAnimatedPct(percentage);
      }
    };
    
    requestAnimationFrame(animate);
  }, [percentage]);

  const getMessage = (pct) => {
    if (pct >= 90) return "Outstanding! 🎯";
    if (pct >= 75) return "Great Performance!";
    if (pct >= 60) return "Good effort — review weak topics";
    if (pct >= 40) return "Keep practicing — you'll improve";
    return "Focus needed — review all topics";
  };

  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedPct / 100) * circumference;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 'var(--space-2xl) 0' }}>
      <div style={{ position: 'relative', width: '160px', height: '160px' }}>
        <svg width="160" height="160" style={{ transform: 'rotate(-90deg)' }}>
          <circle 
            cx="80" cy="80" r={radius}
            fill="transparent"
            stroke="var(--glass-border)"
            strokeWidth="8"
          />
          <circle 
            cx="80" cy="80" r={radius}
            fill="transparent"
            stroke="var(--accent-primary)"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div className="font-display text-primary" style={{ fontSize: '28px', fontWeight: 700 }}>
            {score}/{totalMarks}
          </div>
          <div className="font-display text-secondary" style={{ fontSize: '14px', fontWeight: 500 }}>
            {Math.round(animatedPct)}%
          </div>
        </div>
      </div>
      
      <div className="font-display text-primary" style={{ fontSize: '18px', fontWeight: 600, marginTop: 'var(--space-md)' }}>
        {getMessage(percentage)}
      </div>
    </div>
  );
}
