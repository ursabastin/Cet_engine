/**
 * LIVE ENGINE CONFIGURATION
 * Now pulls from ALL topics registered in the manifest for a truly comprehensive, live experience.
 */
export const PRIORITY_TOPICS = null; // Setting to null to trigger "Full Pool" mode

/**
 * Normalizes a question object for the UI.
 */
function normalizeQuestion(q, filename, subject) {
  // 1. Normalize Options (can be strings or objects)
  const rawOptions = q.options || [];
  const options = rawOptions.slice(0, 4).map(opt => {
    if (typeof opt === 'string') return opt;
    if (opt && typeof opt === 'object' && opt.text) return opt.text;
    return String(opt || '');
  });

  // 2. Identify Correct Index
  let correctIndex = -1;

  // Case A: correct_option exists (A, B, C, D)
  if (q.correct_option) {
    const map = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
    correctIndex = map[q.correct_option.toUpperCase()];
  }

  // Case B: correct_answer or answer exists (as string)
  if (correctIndex === -1) {
    const correctStr = q.correct_answer || q.answer || '';
    correctIndex = options.indexOf(correctStr);
  }

  // Case C: correct_index exists
  if (correctIndex === -1 && q.correct_index !== undefined) {
    correctIndex = parseInt(q.correct_index);
  }

  // Default fallback
  if (correctIndex === -1) correctIndex = 0;

  // 3. Normalize Subject
  let displaySubject = q.subject || subject;
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
 * Picks N random questions for a subject, filtered by Wiz Academy strategy.
 */
export async function pickQuestions(subject, count, seedStr = null) {
  try {
    const manifestResponse = await fetch('manifest.json');
    if (!manifestResponse.ok && manifestResponse.status !== 0) throw new Error('Manifest not found');
    const manifest = await manifestResponse.json();
    
    // FILTER: Use all topics if PRIORITY_TOPICS is null
    const strategyFiles = PRIORITY_TOPICS 
      ? manifest[subject].filter(file => PRIORITY_TOPICS[subject].includes(file))
      : manifest[subject];
    
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

    let pool = [...allQuestions];

    // LIVE RANDOMIZATION: Fisher-Yates Shuffle with high-entropy seed
    let seed = Date.now() + Math.random();
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    // Always pick unique subset from shuffled pool
    const selected = pool.slice(0, count).map(q => 
      normalizeQuestion(q, q._filename, subject)
    );

    return selected;

    return selected;
  } catch (error) {
    console.error('Error picking questions:', error);
    return [];
  }
}

/**
 * Generates a full mock test based on the provided configuration and seed.
 * Compatible with both Strategic Mock and Practice Mode.
 */
export async function loadFullTest(config, seedStr = '2026-04-21_A') {
  const distribution = config.distribution || {
    english: 60,
    reasoning: 60,
    gk: 40,
    computer: 40
  };

  const subjects = ['english', 'reasoning', 'gk', 'computer'];
  const fetchPromises = subjects.map(sub => 
    pickQuestions(sub, distribution[sub], seedStr)
  );
  
  const results = await Promise.all(fetchPromises);
  const allQuestions = results.flat();
  
  return allQuestions;
}
