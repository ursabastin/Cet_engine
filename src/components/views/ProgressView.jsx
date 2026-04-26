import React from 'react';
import { Trophy, Target, Activity } from 'lucide-react';
import { MOCK_PLAN } from '../../data/mockPlan';
import { useMockLoader } from '../../hooks/useMockLoader';

export default function ProgressView() {
  const { getMockStatus } = useMockLoader();

  let completedCount = 0;
  let totalScorePercentage = 0;
  let scoredMocks = 0;
  let totalCorrect = 0;
  let totalAttemptedQuestions = 0;
  let totalTimeSpentSeconds = 0;
  const history = [];
  const globalSubjects = {};

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
            
            const attemptedInMock = attempt.result.correctCount + attempt.result.wrongCount;
            totalCorrect += attempt.result.correctCount;
            totalAttemptedQuestions += attemptedInMock;
            
            const timeSpent = mock.duration_seconds - attempt.timeRemaining;
            totalTimeSpentSeconds += timeSpent;

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
              name: mock.name,
              score: attempt.result.earnedMarks,
              total: attempt.result.totalMarks,
              percentage: attempt.result.percentage,
              timeSpentStr: `${Math.floor(timeSpent/60)}m ${timeSpent%60}s`,
              date: new Date(attempt.submittedAt).toLocaleDateString()
            });
          }
        } catch (e) {}
      }
    }
  });

  const avgScore = scoredMocks > 0 ? Math.round(totalScorePercentage / scoredMocks) : 0;
  const accuracy = totalAttemptedQuestions > 0 ? Math.round((totalCorrect / totalAttemptedQuestions) * 100) : 0;
  const speedPerQuestion = totalAttemptedQuestions > 0 ? Math.round(totalTimeSpentSeconds / totalAttemptedQuestions) : 0;
  
  // Normalize rank based on Average Score Percentage
  let rank = 'Genin';
  let rankColor = 'var(--text-secondary)';
  if (avgScore >= 90) { rank = 'S-Rank (Hokage)'; rankColor = '#F59E0B'; }
  else if (avgScore >= 75) { rank = 'A-Rank (Jonin)'; rankColor = 'var(--accent-success)'; }
  else if (avgScore >= 60) { rank = 'B-Rank (Chunin)'; rankColor = 'var(--accent-primary)'; }

  return (
    <div style={{ animation: 'fadeInUp 300ms ease-out forwards', paddingBottom: 'var(--space-2xl)' }}>
      {/* Big 3 Stats */}
      <div style={{ display: 'flex', gap: 'var(--space-lg)', marginBottom: 'var(--space-2xl)' }}>
        <div className="glass" style={{ flex: 1, padding: 'var(--space-xl)', textAlign: 'center', borderRadius: 'var(--radius-lg)' }}>
          <Target size={32} color="var(--accent-success)" style={{ margin: '0 auto 12px' }} />
          <div style={{ fontSize: '40px', fontWeight: 'bold', color: 'var(--accent-success)' }}>{accuracy}%</div>
          <div style={{ fontSize: '14px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Overall Accuracy</div>
        </div>
        <div className="glass" style={{ flex: 1, padding: 'var(--space-xl)', textAlign: 'center', borderRadius: 'var(--radius-lg)' }}>
          <Activity size={32} color="var(--accent-primary)" style={{ margin: '0 auto 12px' }} />
          <div style={{ fontSize: '40px', fontWeight: 'bold', color: 'var(--accent-primary)' }}>{speedPerQuestion}s</div>
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
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '8px', textTransform: 'uppercase' }}>{sub}</div>
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
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '4px' }}>{h.name}</div>
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
