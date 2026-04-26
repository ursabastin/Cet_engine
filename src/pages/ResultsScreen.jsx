import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMockLoader } from '../hooks/useMockLoader';
import { SUBJECTS } from '../data/subjectConfig';
import { analyzeWeakTopics } from '../utils/weakTopicDetector';
import ScoreHero from '../components/results/ScoreHero';
import SubjectScoreCard from '../components/results/SubjectScoreCard';
import DifficultyBreakdown from '../components/results/DifficultyBreakdown';
import TopicTable from '../components/results/TopicTable';
import WeakTopicsCallout from '../components/results/WeakTopicsCallout';
import Button from '../components/ui/Button';

export default function ResultsScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getMockById } = useMockLoader();

  const mock = getMockById(id);
  const savedStr = localStorage.getItem(`attempt_${id}`);
  
  if (!mock || !savedStr) {
    return <div className="text-primary p-6">Results not found</div>;
  }

  let attempt;
  try {
    attempt = JSON.parse(savedStr);
  } catch (e) {
    return <div className="text-primary p-6">Invalid attempt data</div>;
  }

  const { result } = attempt;
  if (!result) {
    return <div className="text-primary p-6">Attempt not completed yet</div>;
  }

  const weakTopics = analyzeWeakTopics(attempt, mock);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', animation: 'fadeInUp 400ms ease-out forwards', paddingBottom: 'var(--space-2xl)' }}>
      <ScoreHero 
        score={result.earnedMarks} 
        totalMarks={result.totalMarks} 
        percentage={result.percentage} 
      />

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: 'var(--space-lg)', 
        marginBottom: 'var(--space-xl)' 
      }}>
        {mock.sections.map(s => {
          const subStats = result.subjectBreakdown[s.subject] || { correct: 0, wrong: 0, skipped: 0, marks: 0 };
          return (
            <SubjectScoreCard 
              key={s.section_id}
              subjectKey={s.subject}
              label={SUBJECTS[s.subject]?.shortLabel || s.subject}
              stats={subStats}
              totalMarks={s.total_marks}
            />
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-lg)', marginBottom: 'var(--space-xl)' }}>
        <DifficultyBreakdown attempt={attempt} mock={mock} />
        <WeakTopicsCallout weakTopics={weakTopics} />
      </div>

      <div style={{ marginBottom: 'var(--space-xl)' }}>
        <TopicTable weakTopics={weakTopics} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-md)' }}>
        <Button label="Back to Mocks" variant="ghost" onClick={() => navigate('/home')} />
        <Button label="View Solutions" variant="primary" onClick={() => navigate(`/solutions/${id}`)} />
      </div>
    </div>
  );
}
