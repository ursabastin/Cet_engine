import React from 'react';
import Badge from '../ui/Badge';
import { TOPIC_LABELS } from '../../data/topicMap';

export default function TopicTable({ weakTopics }) {
  return (
    <div className="glass" style={{ borderRadius: 'var(--radius-lg)', width: '100%', overflow: 'hidden' }}>
      <div style={{ padding: 'var(--space-lg)' }}>
        <h2 className="font-display text-primary" style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>
          Topic Performance
        </h2>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--glass-bg)' }}>
              <th className="font-display text-primary" style={{ padding: 'var(--space-sm) var(--space-lg)', fontWeight: 500, fontSize: '12px', borderBottom: 'var(--glass-border)' }}>Topic</th>
              <th className="font-display text-primary" style={{ padding: 'var(--space-sm) var(--space-lg)', fontWeight: 500, fontSize: '12px', borderBottom: 'var(--glass-border)' }}>Subject</th>
              <th className="font-display text-primary" style={{ padding: 'var(--space-sm) var(--space-lg)', fontWeight: 500, fontSize: '12px', borderBottom: 'var(--glass-border)' }}>Correct</th>
              <th className="font-display text-primary" style={{ padding: 'var(--space-sm) var(--space-lg)', fontWeight: 500, fontSize: '12px', borderBottom: 'var(--glass-border)' }}>Wrong</th>
              <th className="font-display text-primary" style={{ padding: 'var(--space-sm) var(--space-lg)', fontWeight: 500, fontSize: '12px', borderBottom: 'var(--glass-border)' }}>Score %</th>
            </tr>
          </thead>
          <tbody>
            {weakTopics.map(topic => {
              const wrong = topic.total - topic.correct;
              let bg = 'transparent';
              if (topic.percentage < 50) bg = 'rgba(239, 68, 68, 0.05)';
              else if (topic.percentage >= 80) bg = 'rgba(16, 185, 129, 0.05)';

              return (
                <tr key={topic.topic} style={{ background: bg }}>
                  <td className="font-body text-secondary" style={{ padding: 'var(--space-sm) var(--space-lg)', borderBottom: 'var(--glass-border)', fontSize: '14px' }}>
                    {TOPIC_LABELS[topic.topic] || topic.topic.replace(/_/g, ' ')}
                  </td>
                  <td style={{ padding: 'var(--space-sm) var(--space-lg)', borderBottom: 'var(--glass-border)' }}>
                    <Badge label={topic.subject.substring(0, 3).toUpperCase()} variant={topic.subject} />
                  </td>
                  <td className="font-body text-secondary" style={{ padding: 'var(--space-sm) var(--space-lg)', borderBottom: 'var(--glass-border)', fontSize: '14px' }}>{topic.correct}</td>
                  <td className="font-body text-secondary" style={{ padding: 'var(--space-sm) var(--space-lg)', borderBottom: 'var(--glass-border)', fontSize: '14px' }}>{wrong}</td>
                  <td className="font-mono text-primary" style={{ padding: 'var(--space-sm) var(--space-lg)', borderBottom: 'var(--glass-border)', fontSize: '14px' }}>{Math.round(topic.percentage)}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
