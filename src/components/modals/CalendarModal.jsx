import React from 'react';
import { createPortal } from 'react-dom';
import { X, Calendar } from 'lucide-react';

export default function CalendarModal({ onClose }) {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const hourHeight = 60; // px per hour

  const days = [
    { name: 'Sun 26', id: 'sun' },
    { name: 'Mon 27', id: 'mon' },
    { name: 'Tue 28', id: 'tue' }
  ];

  const events = [
    // Sunday
    { day: 'sun', start: 15, end: 17, title: 'Mock Test 1', type: 'mock' },
    { day: 'sun', start: 17.25, end: 19.25, title: 'Mock Test 2', type: 'mock' },
    { day: 'sun', start: 19.5, end: 21.5, title: 'Mock Test 3', type: 'mock' },
    { day: 'sun', start: 22.25, end: 24, title: 'Mock 4 (part 1)', type: 'mock' },
    
    // Monday
    { day: 'mon', start: 0, end: 0.25, title: 'Mock 4 (part 2)', type: 'mock' },
    { day: 'mon', start: 0.5, end: 2.5, title: 'Mock Test 5', type: 'mock' },
    { day: 'mon', start: 2.5, end: 4, title: 'Review Window', type: 'review' },
    { day: 'mon', start: 4, end: 9.5, title: 'Ideal Sleep', type: 'sleep' },
    { day: 'mon', start: 10, end: 12, title: 'Mock Test 6', type: 'mock' },
    { day: 'mon', start: 12.25, end: 14.25, title: 'Mock Test 7', type: 'mock' },
    { day: 'mon', start: 15, end: 17, title: 'Mock Test 8', type: 'mock' },
    { day: 'mon', start: 17.25, end: 19.25, title: 'Mock Test 9', type: 'mock' },
    { day: 'mon', start: 19.5, end: 21.5, title: 'Mock Test 10', type: 'mock' },
    { day: 'mon', start: 22.25, end: 24, title: 'Mock 11 (part 1)', type: 'mock' },

    // Tuesday
    { day: 'tue', start: 0, end: 0.25, title: 'Mock 11 (part 2)', type: 'mock' },
    { day: 'tue', start: 0.5, end: 2.5, title: 'Mock Test 12', type: 'mock' },
    { day: 'tue', start: 2.5, end: 4, title: 'Review Window', type: 'review' },
    { day: 'tue', start: 4, end: 9.5, title: 'Ideal Sleep', type: 'sleep' },
    { day: 'tue', start: 10, end: 12, title: 'Mock Test 13', type: 'mock' },
    { day: 'tue', start: 12.16, end: 14.16, title: 'Mock Test 14', type: 'mock' },
    { day: 'tue', start: 14.75, end: 16.75, title: 'Mock Test 15', type: 'mock' },
    { day: 'tue', start: 16.9, end: 18.9, title: 'Mock Test 16', type: 'mock' },
    { day: 'tue', start: 19.1, end: 19.75, title: 'Mock 18 (Speed)', type: 'mock' },
    { day: 'tue', start: 20.5, end: 22.5, title: 'Mock Test 17', type: 'mock' },
    { day: 'tue', start: 22.66, end: 24, title: 'Mock 19 (part 1)', type: 'mock' },
  ];

  const getColor = (type) => {
    switch(type) {
      case 'mock': return 'rgba(99, 102, 241, 0.2)'; // Primary accent
      case 'review': return 'rgba(245, 158, 11, 0.2)'; // Warning accent
      case 'sleep': return 'rgba(100, 116, 139, 0.2)'; // Neutral
      default: return 'rgba(255, 255, 255, 0.1)';
    }
  };

  const getBorderColor = (type) => {
    switch(type) {
      case 'mock': return 'var(--accent-primary)';
      case 'review': return 'var(--accent-warning)';
      case 'sleep': return 'var(--text-tertiary)';
      default: return 'var(--glass-border)';
    }
  };

  const modalContent = (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.85)', zIndex: 99999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      backdropFilter: 'blur(8px)'
    }}>
      <div className="glass-deep" style={{ 
        width: '90%', maxWidth: '1000px', height: '85vh', 
        borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column',
        overflow: 'hidden', border: '1px solid var(--glass-border)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}>
        {/* Header */}
        <div style={{ padding: 'var(--space-md) var(--space-lg)', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Calendar size={20} color="var(--accent-primary)" />
            <h2 className="font-display text-primary" style={{ fontSize: '18px', margin: 0 }}>Battle Plan Calendar</h2>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        {/* Calendar Body */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Day Headers */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--glass-border)', paddingLeft: '60px' }}>
            {days.map(day => (
              <div key={day.id} style={{ flex: 1, padding: 'var(--space-sm)', textAlign: 'center', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '14px', borderLeft: '1px solid var(--glass-border)' }}>
                {day.name}
              </div>
            ))}
          </div>
          
          {/* Scrollable Grid */}
          <div style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
            <div style={{ position: 'relative', height: `${24 * hourHeight}px` }}>
              
              {/* Hour Lines & Labels */}
              {hours.map(hour => (
                <div key={hour} style={{ position: 'absolute', top: `${hour * hourHeight}px`, width: '100%', display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ width: '60px', textAlign: 'right', paddingRight: '8px', fontSize: '11px', color: 'var(--text-tertiary)', transform: 'translateY(-6px)' }}>
                    {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
                  </div>
                  <div style={{ flex: 1 }} />
                </div>
              ))}

              {/* Day Columns */}
              <div style={{ display: 'flex', position: 'absolute', top: 0, left: '60px', right: 0, bottom: 0 }}>
                {days.map((day, idx) => (
                  <div key={day.id} style={{ flex: 1, borderLeft: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
                    {/* Events for this day */}
                    {events.filter(e => e.day === day.id).map((e, i) => (
                      <div key={i} style={{
                        position: 'absolute',
                        top: `${e.start * hourHeight}px`,
                        height: `${(e.end - e.start) * hourHeight}px`,
                        left: '4px', right: '4px',
                        background: getColor(e.type),
                        borderLeft: `3px solid ${getBorderColor(e.type)}`,
                        borderRadius: '4px',
                        padding: '4px 8px',
                        fontSize: '11px',
                        color: 'var(--text-primary)',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column'
                      }}>
                        <span style={{ fontWeight: 600 }}>{e.title}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
