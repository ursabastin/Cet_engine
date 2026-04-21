# CET Mock Test — Execution Plan
**Project Folder:** `cet/`
**AI Tool:** Google Antigravity + Gemini Flash
**Target:** Complete in 2 hours
**Exam Reference:** MAH BMS/BBA CET (Maharashtra CET Cell)

---

## Step 0 — Before You Start (Do This First)

### Install Antigravity Awesome Skills

Run this inside the `cet/` folder after `git init`:

```bash
# Install the full skills library into your Antigravity workspace
npx antigravity-awesome-skills --antigravity

# Also install Google Gemini-specific skills
npx antigravity-awesome-skills install --tag gemini
```

This puts skills inside `.agent/skills/` — Antigravity auto-reads them.

---

## Exam Format Reference (What We're Simulating)

Based on MAH BMS/BBA CET official pattern:

| Subject | Real Exam (100Q) | Our Mock (200Q) |
|---|---|---|
| English | 40 | 60 |
| Reasoning | 30 | 60 |
| General Knowledge | 15 | 40 |
| Computer | 15 | 40 |
| **Total** | **100** | **200** |

- No negative marking
- Duration: 150 minutes (daily mock) / No limit (practice mode)
- All MCQ (4 options, 1 correct)

---

## Phase 1 — Project Setup (0:00 – 0:15)

**Tasks:**
- `npm create vite@latest cet -- --template react`
- `cd cet && npm install`
- `npm install tailwindcss @tailwindcss/vite`
- `npm install @google/genai`
- `git init && git add . && git commit -m "init"`
- Run `npx antigravity-awesome-skills --antigravity`
- Set up Tailwind config with paper-white theme tokens
- Create folder structure (src/components, src/pages, src/utils, public/data)

**Output:** Running dev server at localhost:5173

---

## Phase 2 — Data Layer (0:15 – 0:30)

**Tasks:**
- Move all JSON question files into `public/data/english/`, `public/data/gk/`, `public/data/computer/`, `public/data/reasoning/`
- Write `src/utils/questionSelector.js`:
  - Load all JSONs for a subject
  - Randomly pick N questions
  - Shuffle options per question
  - Seed by day (so each day's daily mock is consistent)
- Write `src/utils/testConfig.js`:
  - Export daily mock config (60E + 60R + 40C + 40GK, 150 min)
  - Export practice config (60E + 60R + 40C + 40GK, no timer)
- Write `src/utils/storageHelper.js`:
  - Save answers to localStorage
  - Track completed dates for the calendar

**Output:** Data pipeline functional and testable in browser console

---

## Phase 3 — Home Screen (0:30 – 0:50)

**Tasks:**
- Build `src/pages/Home.jsx`
- Calendar widget (top-right corner):
  - 8 days: April 21 → April 28
  - Each day = small square
  - Green = completed, Gray = pending, Blue = today
  - Click a day → opens that day's daily mock
- Daily Mock Test card:
  - Title, question count breakdown (60E / 60R / 40C / 40GK)
  - Timer badge showing "150 min"
  - "Start Today's Test" button → goes to TestScreen (daily mode)
- Practice Mode card:
  - Title, "No Time Limit", same 200Q breakdown
  - "Start Practice" button → goes to TestScreen (practice mode)
- Paper white background (`#F9F9F8`), Inter font, clean card shadows

**Output:** Home screen renders correctly, both buttons navigate

---

## Phase 4 — Test Screen (0:50 – 1:25)

**Tasks:**
- Build `src/pages/TestScreen.jsx`
- Layout: Three columns
  - Left sidebar: Subject tabs (English / Reasoning / GK / Computer)
  - Center: Question card
  - Right sidebar: Question palette (number grid 1–200)
- Timer component (top-right in header):
  - Countdown from 150:00 for daily mock
  - Hidden for practice mode
  - Turns red when < 10 minutes
  - Auto-submits on timeout
- Question card:
  - Question number + subject tag
  - Question text
  - 4 option buttons (A/B/C/D)
  - Selected = highlighted blue, Saved = green, Skipped = amber
- Navigation bar (bottom):
  - Back button
  - Skip button
  - Next button
  - Mark for Review toggle
  - Submit button (shows only from Q150+)
- Question palette:
  - Color-coded: Answered (green) / Skipped (amber) / Not visited (gray) / Marked (blue)
  - Click any number → jump to that question
- Back to Home: Top-left home icon with confirmation dialog

**Output:** Full test screen functional with state tracking

---

## Phase 5 — Results Screen (1:25 – 1:40)

**Tasks:**
- Build `src/pages/Results.jsx`
- Show:
  - Total score (correct / 200)
  - Time taken
  - Subject breakdown table (Correct / Wrong / Skipped per subject)
  - Progress ring per subject (SVG circle chart)
- Action buttons:
  - "Review Answers" → goes back to TestScreen in read-only mode
  - "Back to Home" → returns to Home screen
- Mark the day as completed in localStorage

**Output:** Results render after submit

---

## Phase 6 — Polish + Final Check (1:40 – 2:00)

**Tasks:**
- Verify calendar correctly marks today
- Test daily mock timer auto-submit
- Test practice mode (no timer visible)
- Test back navigation (Home icon → confirm dialog → Home)
- Test question palette colors updating in real time
- Test tab switching between subjects (questions filter correctly)
- Fix any layout breaks on smaller screens
- Add loading spinner while questions are fetched from JSON
- Final theme pass: all text sizes, card sizes, icon sizes consistent with ChatGPT paper-white look

---

## Navigation Map

```
Home Screen
├── Calendar Icon (top-right) → Click Day → Daily Mock (that day's seed)
├── Daily Mock Card → Start → TestScreen (mode=daily, timer=150min)
│   └── TestScreen → Submit → ResultsScreen → Back to Home
└── Practice Card → Start → TestScreen (mode=practice, no timer)
    └── TestScreen → Submit → ResultsScreen → Back to Home

TestScreen internal:
├── Subject Tab (English) → filters questions 1-60
├── Subject Tab (Reasoning) → filters questions 61-120
├── Subject Tab (GK) → filters questions 121-160
├── Subject Tab (Computer) → filters questions 161-200
├── Question Palette → click any number → jump
├── Back → Previous Question
├── Next → Next Question
├── Skip → Mark amber, move to next
└── Home Icon → confirm dialog → Home
```

---

## Risk Flags

- JSON files may have inconsistent structure → normalize in `questionSelector.js`
- Large number of JSON files (400+) → lazy-load by subject, not all at once
- Calendar day seeding → use date string as seed for reproducible random selection
- Timer in React → use `useRef` for interval, clear on unmount

