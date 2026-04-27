export function loadQuestionPool() {
  const files = import.meta.glob('../../data set/**/*.json', { eager: true, import: 'default' });

  const pool = {
    english: {},
    reasoning: {},
    gk: {},
    computer: {}
  };
  
  const idMap = {};

  const subjectMap = {
    'English': 'english',
    'Reasoning': 'reasoning',
    'GK': 'gk',
    'Computer': 'computer'
  };

  for (const path in files) {
    const segments = path.split('/');
    const fileNameWithExt = segments[segments.length - 1];
    const folderName = segments[segments.length - 2];
    const fileName = fileNameWithExt.replace('.json', '');
    
    const subject = subjectMap[folderName];
    if (!subject) continue;

    let key = fileName;
    if (fileName === 'io_devices') key = 'input_output_devices';
    if (fileName === 'indian_polity') key = 'indian_polity_constitution';
    if (fileName === 'indian_history') key = 'indian_history_freedom';
    if (fileName === 'geography') key = 'geography_india_world';

    const questions = files[path];
    
    // Process passages for questions in a set
    if (Array.isArray(questions)) {
      let currentPassage = null;
      let currentSetId = null;
      
      questions.forEach(q => {
        const setId = q.passage_id || q.cloze_id || q.di_set_id;
        
        if (q.passage_text) {
          currentPassage = q.passage_text;
          currentSetId = setId;
          q.passage = currentPassage;
        } else if (setId && setId === currentSetId && currentPassage) {
          q.passage = currentPassage;
        }
        
        if (q && q.id) {
          idMap[q.id] = q;
        }
      });
    }

    pool[subject][key] = questions;
  }

  return { pool, idMap };
}
