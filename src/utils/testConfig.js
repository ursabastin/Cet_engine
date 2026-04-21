export const DAILY_MOCK = {
  label: 'Strategic Practice Session',
  totalQuestions: 200,
  timerSeconds: 210 * 60,  // 3 hours 30 minutes (210 minutes)
  distribution: {
    english: 60,
    reasoning: 60,
    gk: 40,
    computer: 40,
  }
}

export const PRACTICE_MODE = {
  label: 'Practice Mode',
  totalQuestions: 300,
  timerSeconds: null,       // no timer
  distribution: {
    english: 90,
    reasoning: 90,
    gk: 60,
    computer: 60,
  }
}

export const SUBJECTS = ['english', 'reasoning', 'gk', 'computer'];

export const SUBJECT_COLORS = {
  english: 'accent-blue',
  reasoning: 'purple-600', // Note: using tailwind colors or custom vars?
  gk: 'accent-green',
  computer: 'accent-amber'
};

// Map to custom CSS variables if possible
export const SUBJECT_CSS_VARS = {
  english: 'var(--accent-blue)',
  reasoning: '#9333ea', // Purple-600
  gk: 'var(--accent-green)',
  computer: 'var(--accent-amber)'
};
