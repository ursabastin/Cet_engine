# CET Mock Test — Antigravity Agent Prompt

Copy and paste this entire prompt into Google Antigravity to start the build.

---

## PROMPT

You are building a CET mock test practice web application called **CET Practice** inside a folder named `cet`.

Read the two attached files first:
- `EXECUTION_PLAN.md` — your timeline and task order
- `IMPLEMENTATION_PLAN.md` — exact file structure, component specs, design tokens, data shapes, and navigation logic

Follow the execution plan phase by phase. Do not skip phases or combine them. Complete each phase fully before moving to the next.

---

### Project Specs

**Tech Stack:**
- React + Vite (JavaScript, not TypeScript)
- Tailwind CSS for styling
- `@google/genai` for Gemini Flash API
- No backend server — all client-side
- No external UI libraries (build everything from scratch using Tailwind)

**Theme:** Paper White — exactly like ChatGPT's light mode
- Background: `#F9F9F8`
- Cards: `#FFFFFF` with `border: 1px solid #E5E5E4` and `box-shadow: 0 1px 3px rgba(0,0,0,0.08)`
- Font: Inter, 15px base
- All sizes, paddings, and font sizes must match the Design System table in IMPLEMENTATION_PLAN.md exactly

**DO NOT use** any colored backgrounds, gradients, or dark themes. Paper white only.

---

### Phase 1 — Setup

Run these commands:

```bash
npm create vite@latest cet -- --template react
cd cet
npm install
npm install tailwindcss @tailwindcss/vite
npm install @google/genai
git init && git add . && git commit -m "init"
```

Configure Tailwind with the custom CSS variables from IMPLEMENTATION_PLAN.md.
Set Inter as the default font via Google Fonts import in `index.html`.
Create the full folder structure from IMPLEMENTATION_PLAN.md.

---

### Phase 2 — Data Layer

Create these utility files exactly as specified in IMPLEMENTATION_PLAN.md:
- `src/utils/questionSelector.js`
- `src/utils/testConfig.js`
- `src/utils/storageHelper.js`
- `src/utils/seedRandom.js`
- `src/hooks/useTimer.js`

**Critical rules for question data:**
- Question JSON files will be placed in `public/data/english/`, `public/data/gk/`, `public/data/computer/`, `public/data/reasoning/`
- Each JSON file may have a different internal structure — normalize every question into this shape:

```js
{
  id: string,           // unique: subject_filename_index
  subject: string,      // 'english' | 'gk' | 'computer' | 'reasoning'
  topic: string,        // derived from filename (no extension)
  question: string,
  options: string[],    // always 4 options
  correct: number,      // index 0-3 of correct option
}
```

- Use seeded random (mulberry32 algorithm) for daily mock selection so the same date always gives the same questions
- For practice mode, use `Math.random()` (fresh each time)

---

### Phase 3 — Home Screen

Build `src/pages/Home.jsx` with this exact layout:

**Top bar:**
- Left: App title "CET Practice" in 28px, weight 600
- Right: `CalendarWidget` component

**CalendarWidget (inside top-right corner):**
- Shows exactly 8 days: April 21, 2026 to April 28, 2026
- Each day = small vertical card: Day abbreviation + Date number + status dot
- Status: green dot = completed (from localStorage), blue dot = today, gray dot = upcoming
- Clicking a day that is today or in the past opens that day's Daily Mock
- Clicking a future day shows a small inline message "Available on [date]"

**Main content — two cards side by side:**

Card 1: Daily Mock Test
- Icon: 📋 (large, 32px)
- Heading: "Daily Mock Test" (20px, 600)
- Subheading: "Exam-style timed test" (13px, secondary color)
- Pill badges: "200 Questions" | "150 Minutes"
- Subject breakdown list:
  - English — 60 questions
  - Reasoning — 60 questions
  - General Knowledge — 40 questions
  - Computer — 40 questions
- Button: "Start Today's Test →" (full-width, blue background, white text, 40px height)

Card 2: Practice Mode
- Icon: 🎯 (large, 32px)
- Heading: "Practice Mode" (20px, 600)
- Subheading: "No pressure, no timer" (13px, secondary color)
- Pill badges: "200 Questions" | "No Time Limit"
- Same subject breakdown as Card 1
- Button: "Start Practice →" (full-width, outlined blue, 40px height)

Both cards: equal width, 24px padding, 12px border-radius, white background.

---

### Phase 4 — Test Screen

Build `src/pages/TestScreen.jsx`.

**Header (fixed top, full width):**
- Left: Home icon button (🏠, 20px) — clicking shows ConfirmDialog asking "Exit test? Your progress will be saved."
- Center: Test title ("Daily Mock Test — Apr 21" or "Practice Mode")
- Right: Timer component (daily only) or text "Practice Mode" (no timer)

**Subject Tabs (below header, full width):**
- Four tabs: English (Q1–60) | Reasoning (Q61–120) | GK (Q121–160) | Computer (Q161–200)
- Active tab: blue underline border, bold text
- Each tab has a mini badge showing "answered / total" for that subject

**Body (three-column layout):**
- Left: empty space (no sidebar on left)
- Center (max-width 720px, centered): QuestionCard
- Right sidebar (200px fixed): QuestionPalette

**QuestionCard:**
- Subject badge (top-left of card): colored chip — Blue=English, Purple=Reasoning, Green=GK, Orange=Computer
- Question number: "Q 42 of 200"
- Question text: 15px, 1.6 line height
- Four option buttons stacked vertically (A / B / C / D):
  - Label (A, B, C, D) on the left in a small circle
  - Option text on the right
  - Full button click area
  - Default: white bg, `#E5E5E4` border
  - Hover: `#F0F0EF` bg
  - Selected: `#1A73E8` bg, white text
  - Correct (review mode only): `#34A853` bg
  - Wrong (review mode only): `#EA4335` bg, strike-through on text

**Bottom navigation bar (fixed bottom, inside center area):**
- Left: "← Back" button
- Center: "Skip" button (marks question as skipped, moves to next)
- Center-right: "Mark for Review" toggle button
- Right: "Next →" button
- Far right: "Submit Test" button — only visible when currentIndex >= 150 AND appears grayed until all 200 questions are visited OR answered

**QuestionPalette (right sidebar):**
- Header: "Questions" + fraction (e.g., "142 / 200 answered")
- 10-column grid of numbered squares (32x32px each)
- Colors:
  - Gray = not yet visited
  - White with blue border = current question
  - Green = answered
  - Amber = skipped
  - Purple ring = marked for review
- Legend: four color chips with labels at the bottom of sidebar
- Clicking a number navigates to that question

**Submit flow:**
- Clicking Submit → ConfirmDialog: "Submit test? X questions unanswered."
- On confirm → calculate results → navigate to Results screen
- Timer expiry → auto-confirm → Results screen

---

### Phase 5 — Results Screen

Build `src/pages/Results.jsx`.

**Layout top-to-bottom:**

1. Large checkmark icon (✅, 48px) + "Test Complete"
2. Score row: Big number "142" followed by "/ 200" in secondary color, then "Time: 1h 23m"
3. Subject breakdown table (card with border):
   | Subject | Correct | Wrong | Skipped | Score % |
   Each row has a thin colored left-border matching subject color.
4. Four progress rings (SVG circles, 80px each) side by side:
   - English / Reasoning / GK / Computer
   - Percentage in center, subject name below
5. Two buttons:
   - "Review Answers" — secondary style — goes to TestScreen in read-only mode
   - "Back to Home" — primary blue — goes to Home

---

### Phase 6 — Gemini Flash Hint Feature

In **practice mode only**, add a "💡 Get Hint" button below the question options in QuestionCard.

- Button style: ghost/outline, small (32px height, 13px text)
- On click: call Gemini Flash API with this prompt:

```
You are a helpful exam tutor for Indian competitive exams (MAH CET).
Give a 2-sentence hint for this question that helps the student think about it
without directly revealing the answer. Be concise and educational.

Question: [question text]
Options: A) [opt1]  B) [opt2]  C) [opt3]  D) [opt4]
```

- Model: `gemini-2.0-flash`
- API key from: `import.meta.env.VITE_GEMINI_KEY`
- Show inline below question while loading (spinner), then show hint text in a light amber callout box
- If API fails: show "Hint unavailable" gracefully

**Do NOT show the hint button in daily mock mode.**

---

### App Router (No external router library)

Use a single `mode` state in App.jsx to switch between screens:

```jsx
// App.jsx
const [screen, setScreen] = useState('home'); // 'home' | 'test' | 'results'
const [testConfig, setTestConfig] = useState(null);
const [result, setResult] = useState(null);

// Pass setScreen as a prop to each page
// Home → onStartTest(config) → setScreen('test'), setTestConfig(config)
// TestScreen → onSubmit(result) → setScreen('results'), setResult(result)
// Results → onHome() → setScreen('home')
// Results → onReview() → setScreen('test') with readOnly=true
```

No React Router, no Next.js — pure state-based navigation.

---

### Quality Rules

- Every component must handle loading state (show skeleton or spinner)
- Every API call must have try/catch with visible error fallback
- All localStorage reads must have try/catch (private browsing may block)
- The timer must use `useRef` for the interval — not `useState` — to avoid stale closures
- On mobile (< 768px): sidebar hides, question palette moves below question card
- All icons must be inline SVG or Unicode emoji — no external icon library
- No console.log statements in final code
- All colors must use CSS custom properties, not hardcoded hex values

---

### Final Check Before Done

After all phases are complete, verify:
1. `npm run dev` starts without errors
2. Home screen shows both cards and calendar
3. Clicking "Start Today's Test" loads 200 questions
4. Timer counts down
5. Answering a question turns its palette cell green
6. Submitting shows results
7. "Review Answers" shows correct/wrong colors
8. "Back to Home" returns to home screen
9. In practice mode, no timer is visible
10. The Hint button appears only in practice mode

If anything fails, fix it before reporting done.

