import React, { useState, useEffect } from 'react';
import { Trophy, Target, Activity, History } from 'lucide-react';
import { MOCK_PLAN } from '../../data/mockPlan';
import { useMockLoader } from '../../hooks/useMockLoader';
import { SUBJECTS } from '../../data/subjectConfig';

export default function ProgressView() {
  const { allMocks, getMockStatus } = useMockLoader();
  const [externalHistory, setExternalHistory] = useState([]);

  useEffect(() => {
    // Load external legacy data if available (from version 1.0 filesystem saves)
    if (window.electronAPI && window.electronAPI.getAnalysisData) {
      window.electronAPI.getAnalysisData().then(data => {
        if (data && data.length > 0) {
          setExternalHistory(data);
        }
      });
    }
  }, []);

  let completedCount = 0;
  let totalScorePercentage = 0;
  let scoredMocks = 0;
  let totalCorrect = 0;
  let totalAttemptedQuestions = 0;
  let totalTimeSpentSeconds = 0;
  const history = [];
  const globalSubjects = {};

  // Use allMocks from context if available, otherwise fallback to plan
  const mockSource = allMocks && allMocks.length > 0 ? allMocks : MOCK_PLAN;

  // 1. Process LocalStorage Data (Current Engine)
  mockSource.forEach(mock => {
    const mockId = mock.mock_id || mock.id;
    const status = getMockStatus(mockId);
    
    if (status === 'completed') {
      completedCount++;
      const savedStr = localStorage.getItem(`attempt_${mockId}`);
      if (savedStr) {
        try {
          const attempt = JSON.parse(savedStr);
          if (attempt.result) {
            totalScorePercentage += attempt.result.percentage;
            scoredMocks++;
            
            const attemptedInMock = attempt.result.correctCount + attempt.result.wrongCount;
            totalCorrect += attempt.result.correctCount;
            totalAttemptedQuestions += attemptedInMock;
            
            const timeSpent = (mock.duration_seconds || mock.durationSeconds || 0) - attempt.timeRemaining;
            totalTimeSpentSeconds += Math.max(0, timeSpent);

            if (attempt.result.subjectBreakdown) {
              Object.entries(attempt.result.subjectBreakdown).forEach(([sub, stats]) => {
                if (!globalSubjects[sub]) {
                  globalSubjects[sub] = { correct: 0, total: 0, attempted: 0, marks: 0 };
                }
                globalSubjects[sub].correct += stats.correct;
                globalSubjects[sub].total += stats.total;
                globalSubjects[sub].attempted += (stats.correct + stats.wrong);
                globalSubjects[sub].marks += stats.marks;
              });
            }

            history.push({
              name: mock.displayName || mock.name,
              score: attempt.result.earnedMarks,
              total: attempt.result.totalMarks,
              percentage: attempt.result.percentage,
              timeSpentStr: `${Math.floor(timeSpent/60)}m ${timeSpent%60}s`,
              date: attempt.submittedAt ? new Date(attempt.submittedAt).toLocaleDateString() : 'Recent'
            });
          }
        } catch (e) {}
      }
    }
  });

  // 2. Process External Legacy Data (Version 1.0)
  externalHistory.forEach(item => {
    // Map legacy structure to current structure
    const rawTimestamp = item.CONTEXT?.TIMESTAMP || item.submittedAt;
    const legacySubmittedAt = rawTimestamp && !isNaN(new Date(rawTimestamp).getTime()) 
      ? new Date(rawTimestamp).toISOString() 
      : new Date().toISOString();
      
    const legacyMockName = item.CONTEXT 
      ? `${item.CONTEXT.SUBJECT} Mock ${item.CONTEXT.MOCK_NUMBER || ''}`.trim() 
      : (item.mockName || 'Legacy Mock');

    const legacyPercentage = item.METRICS?.accuracy 
      ? (parseFloat(item.METRICS.accuracy) || 0) 
      : (parseFloat(item.percentage) || 0);

    const legacyScore = Number(item.METRICS?.score ?? item.earnedMarks ?? 0);
    const legacyTotal = Number(item.METRICS?.total ?? item.totalMarks ?? 100);
    const legacyAttempted = Number(item.METRICS?.attempted ?? (Number(item.correctCount || 0) + Number(item.wrongCount || 0)) ?? 0);
    
    // Sum time taken from details if available
    let legacyTimeSpent = 0;
    if (item.DETAILS && Array.isArray(item.DETAILS)) {
      legacyTimeSpent = item.DETAILS.reduce((acc, d) => acc + (Number(d.timeTaken) || 0), 0);
    } else {
      legacyTimeSpent = Number(item.timeSpentSeconds) || 0;
    }

    // Only add if not already in history (prevent duplicates)
    const historyId = `${legacyMockName}_${new Date(legacySubmittedAt).toLocaleDateString()}`;
    if (!history.find(h => `${h.name}_${h.date}` === historyId)) {
      totalScorePercentage += legacyPercentage;
      scoredMocks++;
      
      totalCorrect += legacyScore;
      totalAttemptedQuestions += legacyAttempted;
      totalTimeSpentSeconds += legacyTimeSpent;

      // Subject breakdown for legacy data
      if (item.CONTEXT?.SUBJECT) {
        let sub = item.CONTEXT.SUBJECT.toLowerCase().trim();
        // Handle variations
        if (sub.includes('general') || sub === 'gk' || sub === 'general_knowledge') sub = 'gk';
        if (sub.includes('reasoning')) sub = 'reasoning';
        if (sub.includes('english')) sub = 'english';
        if (sub.includes('computer')) sub = 'computer';

        if (!globalSubjects[sub]) {
          globalSubjects[sub] = { correct: 0, total: 0, attempted: 0, marks: 0 };
        }
        globalSubjects[sub].correct += legacyScore;
        globalSubjects[sub].total += legacyTotal;
        globalSubjects[sub].attempted += legacyAttempted || legacyTotal; // Fallback to total if attempted is 0
        globalSubjects[sub].marks += legacyScore;
      }

      history.push({
        name: legacyMockName,
        score: legacyScore,
        total: legacyTotal,
        percentage: legacyPercentage,
        timeSpentStr: `${Math.floor(legacyTimeSpent/60)}m ${legacyTimeSpent%60}s`,
        date: new Date(legacySubmittedAt).toLocaleDateString(),
        isLegacy: true
      });
    }
  });

  const avgScore = scoredMocks > 0 ? (totalScorePercentage / scoredMocks) : 0;
  const accuracy = totalAttemptedQuestions > 0 ? ((totalCorrect / totalAttemptedQuestions) * 100) : 0;
  const speedPerQuestion = totalAttemptedQuestions > 0 ? (totalTimeSpentSeconds / totalAttemptedQuestions) : 0;
  
  // Normalize rank based on Average Score Percentage
  let rank = 'Genin';
  let rankColor = '#94A3B8'; // Slate
  
  if (scoredMocks === 0) {
    rank = 'New Recruit';
    rankColor = '#94A3B8';
  } else if (avgScore >= 95) {
    rank = 'S-Rank (Kage)';
    rankColor = '#F59E0B'; // Amber
  } else if (avgScore >= 85) {
    rank = 'A-Rank (Jonin)';
    rankColor = '#10B981'; // Emerald
  } else if (avgScore >= 70) {
    rank = 'B-Rank (Chunin)';
    rankColor = '#3B82F6'; // Blue
  } else if (avgScore >= 50) {
    rank = 'C-Rank (Genin)';
    rankColor = '#8B5CF6'; // Violet
  } else {
    rank = 'Academy Student';
    rankColor = '#EF4444'; // Red
  }

  return (
    <div style={{ animation: 'fadeInUp 300ms ease-out forwards', paddingBottom: 'var(--space-2xl)' }}>
      {/* Big 3 Stats */}
      <div style={{ display: 'flex', gap: 'var(--space-lg)', marginBottom: 'var(--space-2xl)' }}>
        <div className="glass" style={{ flex: 1, padding: 'var(--space-xl)', textAlign: 'center', borderRadius: 'var(--radius-lg)' }}>
          <Target size={32} color="var(--accent-success)" style={{ margin: '0 auto 12px' }} />
          <div style={{ fontSize: '40px', fontWeight: 'bold', color: 'var(--accent-success)' }}>{Math.round(accuracy)}%</div>
          <div style={{ fontSize: '14px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Overall Accuracy</div>
        </div>
        <div className="glass" style={{ flex: 1, padding: 'var(--space-xl)', textAlign: 'center', borderRadius: 'var(--radius-lg)' }}>
          <Activity size={32} color="var(--accent-primary)" style={{ margin: '0 auto 12px' }} />
          <div style={{ fontSize: '40px', fontWeight: 'bold', color: 'var(--accent-primary)' }}>{Math.round(speedPerQuestion)}s</div>
          <div style={{ fontSize: '14px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Avg Time / Question</div>
        </div>
        <div className="glass" style={{ flex: 1, padding: 'var(--space-xl)', textAlign: 'center', borderRadius: 'var(--radius-lg)', borderTop: `3px solid ${rankColor}` }}>
          <Trophy size={32} color={rankColor} style={{ margin: '0 auto 12px' }} />
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: rankColor, marginBottom: '8px' }}>{rank}</div>
          <div style={{ fontSize: '14px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Performance Tier</div>
        </div>
      </div>

      {/* Subject Mastery Overview */}
      {Object.keys(globalSubjects).length > 0 && (
        <div style={{ marginBottom: 'var(--space-2xl)' }}>
          <h3 className="font-display text-primary" style={{ fontSize: '20px', marginBottom: 'var(--space-md)' }}>Subject Mastery Overview</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-md)' }}>
            {Object.entries(globalSubjects).map(([sub, stats]) => {
              const subAccuracy = stats.attempted > 0 ? Math.round((stats.correct / stats.attempted) * 100) : 0;
              return (
                <div key={sub} className="glass" style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '8px', textTransform: 'uppercase' }}>{SUBJECTS[sub]?.shortLabel || sub.replace(/_/g, ' ')}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: subAccuracy >= 75 ? 'var(--accent-success)' : subAccuracy >= 50 ? 'var(--accent-warning)' : 'var(--accent-error)' }}>
                      {subAccuracy}%
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {stats.correct} / {stats.total} right
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <h3 className="font-display text-primary" style={{ fontSize: '20px', marginBottom: 'var(--space-md)' }}>Attempt History</h3>
      
      {history.length === 0 ? (
        <div className="glass" style={{ textAlign: 'center', padding: 'var(--space-2xl)', color: 'var(--text-secondary)', borderRadius: 'var(--radius-lg)' }}>
          No mock tests completed yet. Start your training!
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {history.slice().reverse().map((h, i) => (
            <div key={i} className="glass" style={{ padding: 'var(--space-lg)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--text-primary)' }}>{h.name}</div>
                  {h.isLegacy && (
                    <div style={{ 
                      fontSize: '10px', 
                      background: 'rgba(255,255,255,0.1)', 
                      padding: '2px 6px', 
                      borderRadius: '4px', 
                      color: 'var(--text-tertiary)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>Legacy</div>
                  )}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{h.date}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: h.percentage >= 80 ? 'var(--accent-success)' : h.percentage >= 50 ? 'var(--accent-warning)' : 'var(--accent-error)' }}>
                  {Math.round(h.percentage)}%
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{h.score} / {h.total} marks • {h.timeSpentStr}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
