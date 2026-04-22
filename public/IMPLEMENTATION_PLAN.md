# CET Mock Test — Implementation Plan
**Stack:** React + Vite + Tailwind CSS
**Theme:** Paper White (ChatGPT-style) — `#F9F9F8` background, `#171717` text

---

## Project Folder Structure

```
cet/
├── .agent/
│   └── skills/                    ← Antigravity skills (auto-installed)
├── public/
│   └── data/
│       ├── english/               ← all english JSON files here
│       ├── gk/                    ← all GK JSON files here
│       ├── computer/              ← all computer JSON files here
│       └── reasoning/             ← all reasoning JSON files here
├── src/
│   ├── components/
│   │   ├── CalendarWidget.jsx     ← 8-day strip, top-right corner
│   │   ├── Timer.jsx              ← countdown, auto-submit
│   │   ├── QuestionCard.jsx       ← question + 4 options
│   │   ├── QuestionPalette.jsx    ← numbered grid, color-coded
│   │   ├── SubjectTabs.jsx        ← English / Reasoning / GK / Computer
│   │   ├── ProgressRing.jsx       ← SVG circle chart for results
│   │   └── ConfirmDialog.jsx      ← modal for back/submit confirm
│   ├── pages/
│   │   ├── Home.jsx               ← landing screen
│   │   ├── TestScreen.jsx         ← test + timer + navigation
│   │   └── Results.jsx            ← score breakdown
│   ├── utils/
│   │   ├── questionSelector.js    ← random question picker
│   │   ├── testConfig.js          ← mode configs
│   │   ├── storageHelper.js       ← localStorage read/write
│   │   └── seedRandom.js          ← date-based seeded random
│   ├── hooks/
│   │   └── useTimer.js            ← timer hook with auto-submit
│   ├── App.jsx                    ← router + global state
│   ├── index.css                  ← Tailwind + custom CSS vars
│   └── main.jsx
├── package.json
├── vite.config.js
└── tailwind.config.js
```

---

## Design System — Paper White Theme

All sizes are fixed. Do not deviate.

```css
/* index.css */
:root {
  --bg-primary:     #F9F9F8;   /* page background */
  --bg-card:        #FFFFFF;   /* card background */
  --bg-hover:       #F0F0EF;   /* hover state */
  --border:         #E5E5E4;   /* all borders */
  --text-primary:   #171717;   /* headings */
  --text-secondary: #6B6B6B;   /* subtext */
  --accent-blue:    #1A73E8;   /* selected answer, active tab */
  --accent-green:   #34A853;   /* correct / answered */
  --accent-amber:   #FBBC04;   /* skipped */
  --accent-red:     #EA4335;   /* timer warning */
  --shadow-card:    0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04);
}
```

### Size Reference

| Element | Size |
|---|---|
| Page heading | 28px, font-weight 600 |
| Section heading | 20px, font-weight 600 |
| Body text | 15px, font-weight 400 |
| Caption / label | 13px, font-weight 400 |
| Icon size (nav) | 20px |
| Icon size (small) | 16px |
| Card border-radius | 12px |
| Card padding | 24px |
| Button height | 40px |
| Button padding | 12px 20px |
| Question number chip | 32x32px |
| Calendar day box | 36x48px |
| Font family | Inter, system-ui, sans-serif |

---

## Component Specs

### `CalendarWidget.jsx`
- Position: fixed top-right corner of Home screen
- Shows 8 days: April 21 to April 28
- Each day = vertical card with:
  - Day name (Mon, Tue...)
  - Date number (21, 22...)
  - Status dot: green (done), blue (today), gray (upcoming)
- Click a past/today day → opens that day's daily mock
- Click a future day → shows "Not unlocked" toast

```jsx
// Props: onDaySelect(dateString)
// State: reads localStorage for completed days
```

### `Timer.jsx`
- Props: `totalSeconds`, `onExpire`, `hidden`
- Displays `MM:SS` format
- Color: `var(--text-secondary)` → turns `var(--accent-red)` at 10 min
- Uses `useTimer` hook
- Hidden entirely when `mode === 'practice'`

### `QuestionCard.jsx`
- Props: `question`, `selectedAnswer`, `onSelect`, `readOnly`
- Shows:
  - Subject badge (top-left, colored by subject)
  - Question number (e.g., "Q 42")
  - Question text (15px, line-height 1.6)
  - 4 option buttons labeled A / B / C / D
- Option button states:
  - Default: white bg, border
  - Hover: `--bg-hover`
  - Selected: `--accent-blue` bg, white text
  - Correct (readOnly): `--accent-green` bg
  - Wrong (readOnly): `--accent-red` bg, strike-through

### `QuestionPalette.jsx`
- Props: `totalQuestions`, `answers`, `currentQ`, `onJump`
- 10-column grid
- Each cell = 32x32px rounded square
- Color:
  - Gray = not visited
  - Blue = current question
  - Green = answered
  - Amber = skipped
  - Purple = marked for review
- Legend shown below the grid

### `SubjectTabs.jsx`
- Props: `activeSubject`, `onSwitch`, `progress`
- Four tabs: English (Q1–60) / Reasoning (Q61–120) / GK (Q121–160) / Computer (Q161–200)
- Active tab: `--accent-blue` underline, bold
- Each tab shows mini badge: answered count

---

## Page Specs

### `Home.jsx` (Screen 1)

**Layout:**
```
[Header: "CET Practice"]          [CalendarWidget]

[Card: Daily Mock Test]           [Card: Practice Mode]
 "Today's Test"                    "Practice Anytime"
 200 Questions                     200 Questions
 ⏱ 150 Minutes                    ∞ No Time Limit
 English 60 | Reasoning 60        English 60 | Reasoning 60
 GK 40 | Computer 40              GK 40 | Computer 40
 [Start Today's Test →]           [Start Practice →]
```

- Both cards side by side on desktop, stacked on mobile
- Card width: equal 50% minus gap
- Card height: auto, min 280px

### `TestScreen.jsx` (Screen 2)

**Layout:**
```
[🏠 Home] [Test Title + Mode Badge]  [⏱ Timer or "Practice Mode"]
─────────────────────────────────────────────────────────────────
[Subject Tabs: English | Reasoning | GK | Computer]
─────────────────────────────────────────────────────────────────
[Question Palette Sidebar]  |  [Question Card (center)]
 (right side, scrollable)   |
                            |  [Back] [Skip] [Mark Review] [Next]
                            |
                            |  [Submit Test] (shows from Q150+)
```

- Sidebar width: 200px fixed
- Center: flexible, max-width 720px
- Question card: full width of center column

### `Results.jsx` (Screen 3)

**Layout:**
```
[Test Complete ✓]
[Score: 142 / 200]   [Time: 1h 23m]

[Subject Breakdown Table]
 Subject    | Correct | Wrong | Skipped | Accuracy
 English    |   48    |   8   |    4    |   80%
 Reasoning  |   41    |  15   |    4    |   68%
 GK         |   28    |  10   |    2    |   70%
 Computer   |   25    |  11   |    4    |   62%

[4x Progress Rings — one per subject]

[Review Answers]  [Back to Home]
```

---

## Data Layer

### `questionSelector.js`

```js
// Loads JSONs, picks N questions for each subject
// subject: 'english' | 'gk' | 'computer' | 'reasoning'
// count: number of questions to pick
// seed: date string for daily mock reproducibility

async function pickQuestions(subject, count, seed) {
  // 1. Fetch manifest of all JSON files for subject
  // 2. Load all questions from all files
  // 3. Shuffle using seeded random
  // 4. Return first `count` questions, normalized
}

// Normalized question shape:
{
  id: string,
  subject: 'english' | 'gk' | 'computer' | 'reasoning',
  topic: string,         // from filename
  question: string,
  options: [A, B, C, D],
  correct: 'A' | 'B' | 'C' | 'D',
}
```

### `testConfig.js`

```js
export const DAILY_MOCK = {
  label: 'Daily Mock Test',
  totalQuestions: 200,
  timerSeconds: 150 * 60,  // 150 minutes
  distribution: {
    english: 60,
    reasoning: 60,
    gk: 40,
    computer: 40,
  }
}

export const PRACTICE_MODE = {
  label: 'Practice Mode',
  totalQuestions: 200,
  timerSeconds: null,       // no timer
  distribution: {
    english: 60,
    reasoning: 60,
    gk: 40,
    computer: 40,
  }
}
```

### `storageHelper.js`

```js
// Keys in localStorage:
// 'cet_completed_days'  → ['2026-04-21', '2026-04-22', ...]
// 'cet_daily_{date}'    → { answers: {...}, score: 142, time: 5040 }
// 'cet_practice_last'   → { answers: {...}, score: 138, time: null }

export function markDayComplete(dateStr, result) { ... }
export function isDayComplete(dateStr) { ... }
export function saveProgress(mode, date, answers, score, timeTaken) { ... }
```

### `seedRandom.js`

```js
// Simple seeded random (mulberry32)
// Used so each calendar day always shows same questions
function seedRandom(seed) {
  // Convert date string to integer seed
  // Return () => float between 0 and 1
}
```

---

## App State (Global via React Context)

```js
// AppContext:
{
  mode: 'home' | 'test' | 'results',    // current screen
  testMode: 'daily' | 'practice',        // which test type
  testDate: string,                      // which day's test
  questions: [],                         // loaded question array
  answers: { [questionId]: 'A'|'B'|'C'|'D'|'skipped' },
  markedForReview: Set<questionId>,
  currentIndex: number,
  activeSubject: string,
  startTime: Date,
  result: null | { score, timeTaken, breakdown }
}
```

---

## Navigation Logic (Complete)

| From | Action | To |
|---|---|---|
| Home | Click "Start Today's Test" | TestScreen (daily, today's date) |
| Home | Click calendar day | TestScreen (daily, that date) |
| Home | Click "Start Practice" | TestScreen (practice) |
| TestScreen | Click 🏠 → confirm "Yes, exit" | Home (progress saved) |
| TestScreen | Click 🏠 → confirm "No" | Stay in test |
| TestScreen | Click Submit → confirm "Yes" | Results |
| TestScreen | Timer hits 0:00 | Results (auto-submit) |
| Results | Click "Review Answers" | TestScreen (read-only mode) |
| Results | Click "Back to Home" | Home |
| TestScreen (read-only) | Click 🏠 | Home |

---



---

## Install Commands (In Order)

```bash
# 1. Create project
npm create vite@latest cet -- --template react
cd cet

# 2. Install dependencies
npm install
npm install tailwindcss @tailwindcss/vite

# 3. Git init (required for Antigravity)
git init
git add .
git commit -m "init: project setup"

# 4. Start dev server
npm run dev
```

---

## Testing Checklist Before Submitting to Antigravity

- [ ] JSON files load without 404 errors
- [ ] 200 questions load in under 2 seconds
- [ ] Daily mock timer counts down from 150:00
- [ ] Timer auto-submits and goes to results
- [ ] Practice mode has no timer visible
- [ ] Question palette updates colors in real time
- [ ] Subject tabs filter question palette correctly
- [ ] Back navigation shows confirm dialog
- [ ] Calendar shows today highlighted in blue
- [ ] Completed days show green on calendar
- [ ] Results screen shows all four subjects
- [ ] Review mode shows correct answers highlighted

