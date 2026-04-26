import React, { useState } from 'react';
import { MOCK_PLAN } from '../data/mockPlan';
import MockCard from '../components/cards/MockCard';
import Badge from '../components/ui/Badge';
import { useMockLoader } from '../hooks/useMockLoader';

export default function Home() {
  const [filter, setFilter] = useState('All');
  const { getMockStatus } = useMockLoader();

  const filteredMocks = MOCK_PLAN.filter(mock => {
    if (filter === 'Full Mock') return mock.type === 'full_mock';
    if (filter === 'Mixed') return mock.type === 'mixed_mock';
    return true;
  });

  const totalMocks = MOCK_PLAN.length;
  let completedCount = 0;
  let totalScorePercentage = 0;
  let scoredMocks = 0;

  MOCK_PLAN.forEach(mock => {
    const status = getMockStatus(mock.id);
    if (status === 'completed') {
      completedCount++;
      const savedStr = localStorage.getItem(`attempt_${mock.id}`);
      if (savedStr) {
        try {
          const attempt = JSON.parse(savedStr);
          if (attempt.result) {
            totalScorePercentage += attempt.result.percentage;
            scoredMocks++;
          }
        } catch (e) {}
      }
    }
  });

  const avgScore = scoredMocks > 0 ? Math.round(totalScorePercentage / scoredMocks) : 0;

  return (
    <div style={{ animation: 'fadeInUp 300ms ease-out forwards' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xl)' }}>
        <h1 className="font-display text-primary" style={{ fontSize: '28px', fontWeight: 700, margin: 0 }}>
          Mock Tests
        </h1>
        <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
          {['All', 'Full Mock', 'Mixed'].map(f => (
            <div 
              key={f} 
              onClick={() => setFilter(f)}
              style={{
                cursor: 'pointer',
                opacity: filter === f ? 1 : 0.6,
                transition: 'opacity var(--transition-fast)'
              }}
            >
              <Badge label={f} variant={filter === f ? 'primary' : 'default'} />
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-lg)', marginBottom: 'var(--space-xl)' }}>
        <div className="glass" style={{ flex: 1, padding: 'var(--space-md)', textAlign: 'center', borderRadius: 'var(--radius-md)' }}>
          <div className="font-display text-primary" style={{ fontSize: '32px', fontWeight: 700 }}>{totalMocks}</div>
          <div className="font-body text-secondary" style={{ fontSize: '13px' }}>Total Mocks</div>
        </div>
        <div className="glass" style={{ flex: 1, padding: 'var(--space-md)', textAlign: 'center', borderRadius: 'var(--radius-md)' }}>
          <div className="font-display" style={{ fontSize: '32px', fontWeight: 700, color: 'var(--accent-success)' }}>{completedCount}</div>
          <div className="font-body text-secondary" style={{ fontSize: '13px' }}>Completed</div>
        </div>
        <div className="glass" style={{ flex: 1, padding: 'var(--space-md)', textAlign: 'center', borderRadius: 'var(--radius-md)' }}>
          <div className="font-display" style={{ fontSize: '32px', fontWeight: 700, color: 'var(--accent-primary)' }}>{avgScore}%</div>
          <div className="font-body text-secondary" style={{ fontSize: '13px' }}>Avg Score</div>
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: 'var(--space-lg)', 
        width: '100%' 
      }}>
        {filteredMocks.map((mock, idx) => (
          <MockCard key={mock.id} mock={mock} index={idx} />
        ))}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
