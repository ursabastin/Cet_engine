import { PRIORITY_TOPICS } from './questionSelector';
import { getAttemptedIds } from './historyHelper';

/**
 * Normalizes a question object for the UI.
 */
function normalizeQuestion(q, filename, subject) {
  const rawOptions = q.options || [];
  const options = rawOptions.slice(0, 4).map(opt => {
    if (typeof opt === 'string') return opt;
    if (opt && typeof opt === 'object' && opt.text) return opt.text;
    return String(opt || '');
  });

  let correctIndex = -1;
  if (q.correct_option) {
    const map = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
    correctIndex = map[q.correct_option.toUpperCase()];
  }
  if (correctIndex === -1) {
    const correctStr = q.correct_answer || q.answer || '';
    correctIndex = options.indexOf(correctStr);
  }
  if (correctIndex === -1 && q.correct_index !== undefined) {
    correctIndex = parseInt(q.correct_index);
  }
  if (correctIndex === -1) correctIndex = 0;

  let displaySubject = subject; // Force use of the requested subject for consistent grouping
  if (displaySubject.toLowerCase().includes('general') || displaySubject.toLowerCase() === 'gk') {
    displaySubject = 'gk';
  }

  return {
    id: q.id || Math.floor(Math.random() * 1000000),
    subject: displaySubject.toLowerCase(),
    topic: filename.split('.')[0].replace(/_/g, ' '),
    text: q.question_text || q.question || q.text || '',
    options: options,
    correct: correctIndex
  };
}

/**
 * PRACTICE TEST SELECTOR (280 Questions)
 */
export async function getPracticeQuestions(subject, count, seedStr) {
  try {
    const manifestResponse = await fetch('manifest.json');
    const manifest = await manifestResponse.json();
    
    const strategyFiles = manifest[subject].filter(file => 
      PRIORITY_TOPICS[subject].includes(file)
    );
    
    if (strategyFiles.length === 0) return [];
    
    const fetchPromises = strategyFiles.map(file => 
      fetch(`practice_pool/${subject}/topics/${file}.json`)
        .then(res => res.json())
        .then(data => data.map((q, idx) => ({ ...q, _filename: file, _index: idx })))
        .catch(() => [])
    );

    const results = await Promise.all(fetchPromises);
    const allQuestions = results.flat();

    if (allQuestions.length === 0) return [];

    // SMART EXHAUSTION LOGIC
    const attemptedIds = getAttemptedIds();
    const freshPool = allQuestions.filter(q => !attemptedIds.includes(q.id));
    const attemptedPool = allQuestions.filter(q => attemptedIds.includes(q.id));

    const dayMap = {
      '2026-04-22': 0, '2026-04-23': 1, '2026-04-24': 2, '2026-04-25': 3,
      '2026-04-26': 4, '2026-04-27': 5, '2026-04-28': 6
    };
    const dayIdx = dayMap[seedStr] || 0;
    const steps = { english: 90, reasoning: 90, gk: 60, computer: 60 };
    const offset = dayIdx * (steps[subject] || count);

    const selected = [];
    
    // 1. Pick from Fresh Pool first (Sequential - FROM THE END)
    if (freshPool.length > 0) {
      const len = freshPool.length;
      for (let i = 0; i < count && selected.length < count; i++) {
        // Pick from the end backwards based on offset
        const index = (len - 1 - offset - i);
        // Standard positive modulo to handle negative wraps
        const wrappedIndex = ((index % len) + len) % len;
        const q = freshPool[wrappedIndex];
        if (q) selected.push(normalizeQuestion(q, q._filename, subject));
      }
    }

    // 2. Fallback to Attempted Pool (Randomized per Day) if needed
    if (selected.length < count && attemptedPool.length > 0) {
      let seed = dayIdx; 
      const shuffledAttempted = [...attemptedPool].sort(() => {
        seed = (seed * 1103515245 + 12345) & 0x7fffffff;
        return (seed % 3) - 1;
      });
      while (selected.length < count && shuffledAttempted.length > 0) {
        const q = shuffledAttempted.pop();
        selected.push(normalizeQuestion(q, q._filename, subject));
      }
    }

    while (selected.length < count) {
      const q = allQuestions[Math.floor(Math.random() * allQuestions.length)];
      selected.push(normalizeQuestion(q, q._filename, subject));
    }
    return selected;
  } catch (error) {
    console.error('Practice Selector Error:', error);
    return [];
  }
}

export async function loadPracticeTest(config, date) {
  // Use 'A' seed component if we want IDENTICAL questions to the mock (just more of them)
  // User said "Even though they are both going to have the same question on the same day"
  const seed = `${date}_A`; 
  const subjects = ['english', 'reasoning', 'gk', 'computer'];
  const fetchPromises = subjects.map(sub => 
    getPracticeQuestions(sub, config.distribution[sub], seed)
  );
  const results = await Promise.all(fetchPromises);
  return results.flat();
}
