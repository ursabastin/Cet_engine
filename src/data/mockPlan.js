export const MOCK_PLAN = Array.from({ length: 19 }, (_, i) => {
  const num = i + 1;
  const idStr = num.toString().padStart(2, '0');
  
  if (num === 18) {
    return {
      id: `FULL-MOCK-18`,
      displayName: `Mock Test 18`,
      type: 'mixed_mock',
      subjects: ['english', 'reasoning'],
      totalQuestions: 50,
      totalMarks: 50,
      durationSeconds: 2400,
    };
  }
  
  if (num === 19) {
    return {
      id: `FULL-MOCK-19`,
      displayName: `Final Reserve Mock`,
      type: 'full_mock',
      subjects: ['english', 'reasoning', 'gk', 'computer'],
      totalQuestions: 100, 
      totalMarks: 100,
      durationSeconds: 7200,
    };
  }

  return {
    id: `FULL-MOCK-${idStr}`,
    displayName: `Full Mock Test ${num}`,
    type: 'full_mock',
    subjects: ['english', 'reasoning', 'gk', 'computer'],
    totalQuestions: 100,
    totalMarks: 100,
    durationSeconds: 7200,
  };
});
