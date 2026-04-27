export function calculateScore(mock, attempt) {
  let totalMarks = 0;
  let earnedMarks = 0;
  let totalQuestions = 0;
  let correctCount = 0;
  let wrongCount = 0;
  let skippedCount = 0;

  const subjectBreakdown = {};

  if (mock.sections) {
    mock.sections.forEach(section => {
      const sub = section.subject;
      if (!subjectBreakdown[sub]) {
        subjectBreakdown[sub] = { correct: 0, wrong: 0, skipped: 0, marks: 0, total: 0, timeTaken: 0 };
      }
      
      section.questions.forEach(q => {
        if (q.missing) return;
        totalQuestions++;
        totalMarks += mock.marks_per_correct;
        subjectBreakdown[sub].total++;

        // Track time spent on this specific question
        const qTime = attempt.timePerQuestion?.[q.id] || 0;
        subjectBreakdown[sub].timeTaken += qTime;

        const response = attempt.responses[q.id];
        if (!response) {
          skippedCount++;
          subjectBreakdown[sub].skipped++;
        } else if (response === q.answer) {
          correctCount++;
          earnedMarks += mock.marks_per_correct;
          subjectBreakdown[sub].correct++;
          subjectBreakdown[sub].marks += mock.marks_per_correct;
        } else {
          wrongCount++;
          earnedMarks -= mock.marks_per_wrong || 0;
          subjectBreakdown[sub].wrong++;
          subjectBreakdown[sub].marks -= mock.marks_per_wrong || 0;
        }
      });
    });
  }
  
  return {
    totalMarks,
    earnedMarks,
    percentage: totalMarks > 0 ? (earnedMarks / totalMarks) * 100 : 0,
    totalQuestions,
    correctCount,
    wrongCount,
    skippedCount,
    subjectBreakdown
  };
}
