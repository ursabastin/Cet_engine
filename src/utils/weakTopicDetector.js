export function analyzeWeakTopics(result, mock) {
  // Optional extension: find the topics with lowest correct % 
  const topicStats = {};
  
  if (mock.sections) {
    mock.sections.forEach(section => {
      section.questions.forEach(q => {
        if (q.missing) return;
        const topic = q.topic;
        if (!topicStats[topic]) topicStats[topic] = { correct: 0, total: 0, subject: section.subject };
        topicStats[topic].total++;
        if (result.responses && result.responses[q.id] === q.answer) {
          topicStats[topic].correct++;
        }
      });
    });
  }

  const topicsArray = Object.entries(topicStats).map(([topic, stats]) => ({
    topic,
    subject: stats.subject,
    percentage: (stats.correct / stats.total) * 100,
    ...stats
  }));

  topicsArray.sort((a, b) => a.percentage - b.percentage);
  return topicsArray;
}
