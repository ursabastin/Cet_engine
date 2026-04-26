import React from 'react';
import Badge from '../ui/Badge';
import { TOPIC_LABELS } from '../../data/topicMap';

export default function WeakTopicsCallout({ weakTopics }) {
  const topWeak = weakTopics.filter(t => t.total >= 1 && t.percentage < 60).slice(0, 3);
  
  if (topWeak.length === 0) return null;

  return (
    <div className="glass" style={{ padding: 'var(--space-lg)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--accent-warning)', width: '100%' }}>
      <h3 className="font-display" style={{ color: 'var(--accent-warning)', fontSize: '16px', fontWeight: 600, margin: '0 0 var(--space-xs) 0' }}>
        Recommended Practice
      </h3>
      <div className="font-body text-secondary" style={{ fontSize: '13px', marginBottom: 'var(--space-md)' }}>
        Based on your performance, focus on these topics:
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
        {topWeak.map(topic => (
          <div key={topic.topic} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-sm)', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
              <Badge label={topic.subject.substring(0, 3).toUpperCase()} variant={topic.subject} />
              <span className="font-body text-primary" style={{ fontSize: '14px' }}>
                {TOPIC_LABELS[topic.topic] || topic.topic.replace(/_/g, ' ')}
              </span>
            </div>
            <div className="font-display" style={{ fontSize: '12px', color: 'var(--accent-primary)', cursor: 'pointer' }}>
              Practice Now →
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
