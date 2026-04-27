import React, { useEffect, useState } from 'react';
import { Clock, CheckCircle, Timer } from 'lucide-react';

export default function ScoreHero({ score, totalMarks, percentage, duration, timeSpent, submittedAt }) {
  const [animatedPct, setAnimatedPct] = useState(0);

  useEffect(() => {
    const durationAnim = 1200;
    const startTimeAnim = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTimeAnim;
      const progress = Math.min(elapsed / durationAnim, 1);
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

  const formatTime = (seconds) => {
    if (!seconds) return '00:00';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

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
      <div style={{ position: 'relative', width: '160px', height: '160px', marginBottom: 'var(--space-md)' }}>
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
      
      <div className="font-display text-primary" style={{ fontSize: '18px', fontWeight: 600, marginBottom: 'var(--space-xl)' }}>
        {getMessage(percentage)}
      </div>

      <div style={{ 
        display: 'flex', 
        gap: 'var(--space-lg)', 
        padding: 'var(--space-md) var(--space-xl)', 
        borderRadius: 'var(--radius-lg)', 
        background: 'var(--glass-bg)', 
        backdropFilter: 'blur(var(--glass-blur))',
        border: 'var(--glass-border)',
        boxShadow: 'var(--shadow-glass)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '4px' }}>
            <Clock size={14} /> Total Time
          </div>
          <div className="font-display text-primary" style={{ fontSize: '16px', fontWeight: 600 }}>
            {Math.floor(duration / 60)}m
          </div>
        </div>
        
        <div style={{ width: '1px', background: 'var(--glass-border)' }} />
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '4px' }}>
            <Timer size={14} /> Time Spent
          </div>
          <div className="font-display text-primary" style={{ fontSize: '16px', fontWeight: 600 }}>
            {formatTime(timeSpent)}
          </div>
        </div>

        <div style={{ width: '1px', background: 'var(--glass-border)' }} />

        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '4px' }}>
            <CheckCircle size={14} /> Completed
          </div>
          <div className="font-display text-primary" style={{ fontSize: '16px', fontWeight: 600 }}>
            {submittedAt ? new Date(submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}
          </div>
        </div>
      </div>
    </div>
  );
}
