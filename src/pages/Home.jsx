import React, { useState } from 'react';
import { MOCK_PLAN } from '../data/mockPlan';
import MockCard from '../components/cards/MockCard';
import Badge from '../components/ui/Badge';
import { useMockLoader } from '../hooks/useMockLoader';
import ProgressView from '../components/views/ProgressView';
import { Trophy, Library } from 'lucide-react';

export default function Home() {
  const [filter, setFilter] = useState('All');
  const [currentView, setCurrentView] = useState('mocks'); // 'mocks' or 'progress'
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2xl)' }}>
        
        {/* Left Side: Title and Progress Card */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xl)' }}>
          <h1 className="font-display text-primary" style={{ fontSize: '32px', fontWeight: 800, margin: 0 }}>
            {currentView === 'mocks' ? 'Mock Tests' : 'My Progress'}
          </h1>
          
          {/* Toggle View Button */}
          <div 
            onClick={() => setCurrentView(currentView === 'mocks' ? 'progress' : 'mocks')}
            className="glass"
            style={{ 
              display: 'flex', alignItems: 'center', gap: '16px',
              padding: '12px 24px', borderRadius: 'var(--radius-md)',
              border: '2px solid rgba(99,102,241,0.3)',
              background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1))',
              cursor: 'pointer', transition: 'all 0.2s',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          >
            {currentView === 'mocks' ? (
              <>
                <Trophy size={24} color="var(--accent-primary)" />
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>My Progress</div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {completedCount} <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>/ {totalMocks} Completed</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Library size={24} color="var(--accent-primary)" />
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Back To</div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Mock Tests
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Right Side: Filters (Only visible in mocks view) */}
        {currentView === 'mocks' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
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
        )}
      </div>

      {currentView === 'mocks' ? (
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
      ) : (
        <ProgressView />
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
