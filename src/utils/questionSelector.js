/**
 * STRATEGY CONFIGURATION (Wiz Academy 8-Day Prep)
 * Only include topics mentioned by the teacher + connecting topics.
 * These keys must match public/data/manifest.json exactly.
 */
export const PRIORITY_TOPICS = {
  english: [
    'tenses', 'reading_speed_drills', 'sentence_correction', 'articles', 
    'synonyms_antonyms', 'vocabulary_in_context', 'idioms_phrases', 
    'one_word_substitution', 'para_jumbles', 'cloze_test', 'error_detection', 
    'fill_in_the_blanks', 'subject_verb_agreement'
  ],
  reasoning: [
    'number_series', 'series_number_alphabet_', 'coding_decoding', 'blood_relations', 
    'bar_graphs', 'case_di', 'line_graphs', 'pie_charts', 'tables', 'averages', 
    'simplification', 'profit_loss', 'seating_arrangement_linear_circular_', 
    'puzzles_box_floor_scheduling_', 'syllogism', 'direction_sense', 
    'clocks_calendars', 'ratio_proportion', 'percentages'
  ],
  computer: [
    'computer_generations', 'father_history', 'file_extensions', 'input_output_devices', 
    'memory_ram_rom_', 'hardware_vs_software', 'networking_basics', 'www', 
    'cybersecurity_awareness', 'shortcuts', 'operating_systems', 
    'basic_logic_flow_of_execution', 'ip_http', 'email_basics'
  ],
  gk: [
    'gk_current_affairs', 'constitution_basics', 'gk_economy_business', 
    'gk_sports_events', 'gk_science_tech', 'gk_history_culture', 
    'gk_geography_trade', 'gk_awards_honours', 'gk_miscellaneous'
  ]
};

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
    const manifestResponse = await fetch('data/manifest.json');
    if (!manifestResponse.ok && manifestResponse.status !== 0) throw new Error('Manifest not found');
    const manifest = await manifestResponse.json();
    
    // FILTER: Only use topics from the Wiz Academy strategy
    const strategyFiles = manifest[subject].filter(file => 
      PRIORITY_TOPICS[subject].includes(file)
    );
    
    if (strategyFiles.length === 0) return [];
    
    const fetchPromises = strategyFiles.map(file => 
      fetch(`data/practice_pool/${subject}/topics/${file}.json`)
        .then(res => res.json())
        .then(data => data.map((q, idx) => ({ ...q, _filename: file, _index: idx })))
        .catch(() => [])
    );

    const results = await Promise.all(fetchPromises);
    const allQuestions = results.flat();

    if (allQuestions.length === 0) return [];

    let pool = [...allQuestions];
    let offset = 0;

    if (seedStr && !seedStr.includes('practice')) {
      const dayMap = {
        '2026-04-21': 0, '2026-04-22': 1, '2026-04-23': 2, '2026-04-24': 3,
        '2026-04-25': 4, '2026-04-26': 5, '2026-04-27': 6, '2026-04-28': 7
      };
      const dayIdx = dayMap[seedStr] || 0;
      const setIdx = seedStr.includes('A') ? 0 : 1;
      offset = (dayIdx * 2 + setIdx) * count;
    } else if (seedStr) {
      let seed = 0;
      for (let i = 0; i < seedStr.length; i++) {
        seed = (seed << 5) - seed + seedStr.charCodeAt(i);
        seed |= 0;
      }
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.abs(seed % (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
        seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      }
    }

    const selected = [];
    for (let i = 0; i < count; i++) {
      const q = pool[(offset + i) % pool.length];
      selected.push(normalizeQuestion(q, q._filename, subject));
    }

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
