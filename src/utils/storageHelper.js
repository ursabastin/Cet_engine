const KEYS = {
  COMPLETED_DAYS: 'cet_completed_days',
  MOCK_HISTORY: 'cet_mock_history',
  PRACTICE_HISTORY: 'cet_practice_history',
  DAILY_PREFIX: 'cet_daily_',
  PARTIAL_RESULTS: 'cet_partial_results'
};

export function saveTestResult(mode, date, type, score, total, timeTaken, answers, subjectScores, timeSpentPerQuestion) {
  try {
    const key = mode === 'daily' ? KEYS.MOCK_HISTORY : KEYS.PRACTICE_HISTORY;
    const history = JSON.parse(localStorage.getItem(key) || '[]');
    
    const result = {
      id: `${date}_${type}_${Date.now()}`,
      date,
      type, // 'A', 'B', or 'P'
      score,
      total,
      timeTaken,
      subjectScores,
      timeSpentPerQuestion,
      timestamp: new Date().toISOString()
    };

    history.push(result);
    localStorage.setItem(key, JSON.stringify(history));

    // Also mark day as complete if it's a daily mock
    if (mode === 'daily') {
      // Logic for Day progress: A and B both must be complete for day to be "Done"
      // But for simplicity, we track how many mocks for that date are in history
      const dayMocks = history.filter(h => h.date === date && (h.type === 'A' || h.type === 'B'));
      if (dayMocks.length >= 2) {
        const completed = getCompletedDays();
        if (!completed.includes(date)) {
          completed.push(date);
          localStorage.setItem(KEYS.COMPLETED_DAYS, JSON.stringify(completed));
        }
      }
      
      // Clear partial results for this mock once finished
      const partials = JSON.parse(localStorage.getItem(KEYS.PARTIAL_RESULTS) || '{}');
      delete partials[`${date}_${type}`];
      localStorage.setItem(KEYS.PARTIAL_RESULTS, JSON.stringify(partials));
    }
  } catch (e) {
    console.error('Failed to save test result', e);
  }
}

export function savePartialResult(date, type, answers) {
  try {
    const partials = JSON.parse(localStorage.getItem(KEYS.PARTIAL_RESULTS) || '{}');
    partials[`${date}_${type}`] = {
      answers,
      timestamp: Date.now(),
      count: Object.keys(answers).length
    };
    localStorage.setItem(KEYS.PARTIAL_RESULTS, JSON.stringify(partials));
  } catch (e) {
    console.error('Failed to save partial result', e);
  }
}

export function getDayProgress(date) {
  try {
    const history = getMockHistory();
    const completedMocks = history.filter(h => h.date === date && (h.type === 'A' || h.type === 'B')).map(h => h.type);
    
    const partials = JSON.parse(localStorage.getItem(KEYS.PARTIAL_RESULTS) || '{}');
    let partialCount = 0;
    if (partials[`${date}_A`] && !completedMocks.includes('A')) partialCount += 0.5;
    if (partials[`${date}_B`] && !completedMocks.includes('B')) partialCount += 0.5;

    const totalDone = completedMocks.length;
    const progress = (totalDone / 2) * 100;
    
    // Calculate internal % if only partially done
    let detailedPercent = progress;
    if (totalDone < 2) {
      if (partials[`${date}_A`] && !completedMocks.includes('A')) {
        detailedPercent += (partials[`${date}_A`].count / 200) * 50;
      }
      if (partials[`${date}_B`] && !completedMocks.includes('B')) {
        detailedPercent += (partials[`${date}_B`].count / 200) * 50;
      }
    }

    return {
      completed: completedMocks, // ['A', 'B']
      percent: Math.min(Math.round(detailedPercent), 100),
      isDone: completedMocks.length >= 2
    };
  } catch (e) {
    return { completed: [], percent: 0, isDone: false };
  }
}

export function getMockHistory() {
  try {
    return JSON.parse(localStorage.getItem(KEYS.MOCK_HISTORY) || '[]');
  } catch (e) {
    return [];
  }
}

export function getCompletedDays() {
  try {
    const data = localStorage.getItem(KEYS.COMPLETED_DAYS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function isDayComplete(dateStr) {
  return getCompletedDays().includes(dateStr);
}
