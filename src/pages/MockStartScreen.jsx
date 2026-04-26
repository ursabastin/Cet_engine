import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_PLAN } from '../data/mockPlan';
import { SUBJECTS } from '../data/subjectConfig';
import Button from '../components/ui/Button';
import { useAttempt } from '../hooks/useAttempt';

export default function MockStartScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { startAttempt } = useAttempt();

  const mock = MOCK_PLAN.find(m => m.id === id);

  if (!mock) {
    return <div className="text-primary p-6">Mock not found</div>;
  }

  const handleBegin = () => {
    startAttempt(mock.id);
    navigate(`/test/${mock.id}`);
  };

  const isMock18 = mock.id === 'FULL-MOCK-18';
  const displaySubjects = mock.subjects;

  return (
    <div style={{ animation: 'fadeInUp 300ms ease-out forwards', maxWidth: '800px', margin: '0 auto' }}>
      <div 
        onClick={() => navigate('/home')} 
        className="font-display text-secondary"
        style={{ cursor: 'pointer', marginBottom: 'var(--space-xl)', display: 'inline-block' }}
      >
        ← Mock Tests
      </div>

      <h1 className="font-display text-primary" style={{ fontSize: '32px', fontWeight: 700, margin: '0 0 var(--space-xs) 0' }}>
        {mock.displayName}
      </h1>
      <div className="font-body text-secondary" style={{ fontSize: '15px', marginBottom: 'var(--space-xl)' }}>
        {displaySubjects.length} Subjects · {mock.totalQuestions} Questions · {Math.round(mock.durationSeconds / 60)} Minutes
      </div>

      <div className="glass" style={{ padding: 'var(--space-xl)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-xl)' }}>
        <h2 className="font-display text-primary" style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 var(--space-lg) 0' }}>
          Instructions
        </h2>
        <ul className="font-body text-secondary" style={{ listStyleType: 'none', padding: 0, margin: 0, lineHeight: 1.8 }}>
          <li>✓ Each correct answer earns 1 mark</li>
          <li>✓ No negative marking — wrong answers score 0</li>
          <li>✓ Unattempted questions score 0</li>
          <li>✓ Timer starts immediately when you click Begin</li>
          <li>✓ You cannot pause the timer once started</li>
          <li>✓ You can navigate freely between all questions</li>
        </ul>
      </div>

      <div className="glass" style={{ borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-xl)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--glass-bg)' }}>
              <th className="font-display text-primary" style={{ padding: 'var(--space-md) var(--space-lg)', fontWeight: 600, borderBottom: 'var(--glass-border)' }}>Subject</th>
              <th className="font-display text-primary" style={{ padding: 'var(--space-md) var(--space-lg)', fontWeight: 600, borderBottom: 'var(--glass-border)' }}>Questions</th>
              <th className="font-display text-primary" style={{ padding: 'var(--space-md) var(--space-lg)', fontWeight: 600, borderBottom: 'var(--glass-border)' }}>Marks</th>
              <th className="font-display text-primary" style={{ padding: 'var(--space-md) var(--space-lg)', fontWeight: 600, borderBottom: 'var(--glass-border)' }}>Ideal Time</th>
            </tr>
          </thead>
          <tbody>
            {displaySubjects.map(subKey => {
              const subConfig = SUBJECTS[subKey];
              const subjectQs = subConfig?.questionsPerFullMock || (mock.totalQuestions / displaySubjects.length);
              const subjectMins = Math.round((subjectQs / mock.totalQuestions) * (mock.durationSeconds / 60));
              
              return (
                <tr key={subKey}>
                  <td className="font-body text-secondary" style={{ padding: 'var(--space-md) var(--space-lg)', borderBottom: 'var(--glass-border)' }}>{subConfig ? subConfig.label : subKey}</td>
                  <td className="font-body text-secondary" style={{ padding: 'var(--space-md) var(--space-lg)', borderBottom: 'var(--glass-border)' }}>{subjectQs}</td>
                  <td className="font-body text-secondary" style={{ padding: 'var(--space-md) var(--space-lg)', borderBottom: 'var(--glass-border)' }}>{subjectQs}</td>
                  <td className="font-body text-secondary" style={{ padding: 'var(--space-md) var(--space-lg)', borderBottom: 'var(--glass-border)' }}>{subjectMins} mins</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-md)' }}>
        <Button label="Go Back" variant="ghost" onClick={() => navigate('/home')} />
        <Button label="Begin Test" variant="primary" size="lg" onClick={handleBegin} />
      </div>

    </div>
  );
}
