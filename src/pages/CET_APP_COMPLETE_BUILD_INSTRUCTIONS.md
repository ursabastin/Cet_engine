# CET Practice App — Complete Build Instructions
### Full Stack · React + Vite + Electron · Glassmorphism Design System
### Build from Skeleton → Complete Application

---

> ## BEFORE YOU WRITE A SINGLE LINE OF CODE
> Read this entire document first. Every section connects to the next.
> The build order in Part 3 is mandatory — do not skip ahead.
> The design system in Part 2 applies to every single component built.
> The data wiring in Part 4 is the backbone — UI built before this is broken UI.

---

## PART 1 — PROJECT TRUTH

### 1.1 — What Exists Right Now

```
Cet_engine/
├── data set/                          ← 51 topic JSON files — READ ONLY
│   ├── Computer/   (12 files)
│   ├── English/    (15 files)
│   ├── GK/         (10 files)
│   └── Reasoning/  (14 files)
├── practice_pool/mocks/
│   ├── full_mocks/                    ← 19 mock JSON files — READ ONLY
│   └── subject_wise_mocks/            ← empty, will be populated later
├── src/
│   ├── backend/mock_generator.py      ← DO NOT TOUCH
│   ├── pages/         (6 empty files)
│   ├── components/    (empty structure)
│   ├── context/       (3 empty files)
│   ├── hooks/         (3 empty files)
│   ├── utils/         (4 empty files)
│   └── data/          (3 empty files)
├── CET_MOCK_ENGINE_BACKEND_LOGIC.md
└── CET_QUESTION_GENERATION_MASTER_INSTRUCTIONS.md
```

### 1.2 — Data File Naming Reality

The `data set/` folder uses these exact file names.
Map them correctly — do not assume names from the backend logic doc:

```
ENGLISH (15 files):
  tenses.json · active_passive_voice.json · modal_verbs.json
  reading_comprehension.json · synonyms_antonyms.json · articles.json
  conjunctions_connectives.json · direct_indirect_speech.json
  sentence_types.json · idioms_phrases.json · fill_in_the_blanks.json
  sentence_correction.json · para_jumbles.json
  one_word_substitution.json · cloze_test.json

REASONING (14 files):
  number_letter_series.json · coding_decoding.json · blood_relations.json
  data_interpretation.json · analogies.json · seating_arrangement.json
  syllogisms.json · direction_sense.json · age_problems.json
  averages_simplification.json · profit_loss.json · percentages.json
  symbolic_inequalities.json · calendar_days.json

GK (10 files):
  current_affairs.json · indian_polity.json · economy_business.json
  sports.json · science_technology.json · indian_history.json
  geography.json · awards_honours.json · government_schemes.json
  miscellaneous.json

COMPUTER (12 files):
  full_forms.json · io_devices.json · memory_types.json
  software_types.json · networking_basics.json
  internet_browser_ecommerce.json · father_history_computer.json
  computer_generations.json · data_units.json · file_extensions.json
  malware_antivirus_firewall.json · binary_logic_gates.json

MOCKS (19 files):
  FULL-MOCK-01.json through FULL-MOCK-19.json
  (Mock 18 = English + Reasoning only, 50 questions, 40 minutes)
  (Mock 19 = uses all remaining questions from pool)
```

### 1.3 — Mock Test Facts (From Our Notes)

```
Total mocks built:         19
Full mocks (4 subjects):   Mocks 01–17
Mock 18:                   English + Reasoning only · 50 questions · 40 minutes
Mock 19:                   All remaining questions · structure TBD from JSON
All questions used:        Yes — every question from data set is allocated
Subject-wise mocks:        Not yet built — folder exists, empty
```

---

## PART 2 — THE DESIGN SYSTEM

### 2.1 — Design Language: Glassmorphism

The entire application uses glassmorphism. This is not optional and not partial.
Every surface, every card, every panel, every modal uses glass.

**What glassmorphism means in this app:**
- Frosted glass surfaces — semi-transparent backgrounds with backdrop blur
- Layered depth — elements sit at different visual depths through varying opacity and blur
- Luminous borders — thin borders that glow subtly, giving the illusion of glass edges
- The background bleeds through every element slightly
- No flat opaque cards anywhere in the application

### 2.2 — CSS Variables — The Complete Design Token Set

Define all of these in `index.css` at the `:root` level.
Every component uses ONLY these variables — no hardcoded colors anywhere.

```css
:root {
  /* ── BACKGROUND LAYERS ─────────────────────────────────── */
  --bg-base:           the deepest background of the app
                       dark mode: deep navy/slate, e.g. #0a0f1e
                       light mode: soft pearl/silver, e.g. #e8eaf0

  --bg-mesh-1:         first gradient layer for mesh background
  --bg-mesh-2:         second gradient layer for mesh background
  --bg-mesh-3:         third gradient layer — creates the depth illusion

  /* ── GLASS SURFACES ────────────────────────────────────── */
  --glass-bg:          rgba of white or dark at 8–12% opacity
                       dark:  rgba(255,255,255,0.08)
                       light: rgba(255,255,255,0.55)

  --glass-bg-hover:    slightly higher opacity on hover
                       dark:  rgba(255,255,255,0.13)
                       light: rgba(255,255,255,0.72)

  --glass-bg-active:   even higher opacity when selected/active
                       dark:  rgba(255,255,255,0.18)
                       light: rgba(255,255,255,0.85)

  --glass-bg-deep:     deeper glass for modals and overlays
                       dark:  rgba(10,15,30,0.75)
                       light: rgba(232,234,240,0.80)

  --glass-blur:        12px   (standard blur for cards)
  --glass-blur-heavy:  24px   (for modals and overlays)
  --glass-blur-light:  6px    (for subtle elements like chips)

  /* ── GLASS BORDERS ─────────────────────────────────────── */
  --glass-border:      1px solid rgba(255,255,255,0.15)
  --glass-border-hover:1px solid rgba(255,255,255,0.30)
  --glass-border-glow: 1px solid rgba(accent-color, 0.40)

  /* ── ACCENT COLORS ─────────────────────────────────────── */
  --accent-primary:    the main brand accent
                       suggested: #6366f1 (indigo) or pulled from system
  --accent-primary-glow: rgba(99,102,241,0.25)
  --accent-secondary:  complementary accent
  --accent-success:    for correct answers, completed states
  --accent-danger:     for wrong answers, destructive actions
  --accent-warning:    for in-progress, review-marked states
  --accent-info:       for informational highlights

  /* ── TEXT ───────────────────────────────────────────────── */
  --text-primary:      highest contrast text
  --text-secondary:    subdued labels and descriptions
  --text-tertiary:     hints, placeholders, meta info
  --text-inverse:      text on dark buttons in light mode

  /* ── SUBJECT COLORS ─────────────────────────────────────── */
  /* Each subject has its own glass tint — used for badges and highlights */
  --subject-english:      rgba(99,102,241,0.20)    indigo tint
  --subject-english-solid: #6366f1
  --subject-reasoning:    rgba(16,185,129,0.20)    emerald tint
  --subject-reasoning-solid: #10b981
  --subject-gk:           rgba(245,158,11,0.20)    amber tint
  --subject-gk-solid:     #f59e0b
  --subject-computer:     rgba(139,92,246,0.20)    violet tint
  --subject-computer-solid: #8b5cf6

  /* ── SPACING ────────────────────────────────────────────── */
  --space-xs:   4px
  --space-sm:   8px
  --space-md:   16px
  --space-lg:   24px
  --space-xl:   32px
  --space-2xl:  48px
  --space-3xl:  64px

  /* ── RADIUS ─────────────────────────────────────────────── */
  --radius-sm:   8px
  --radius-md:   12px
  --radius-lg:   16px
  --radius-xl:   24px
  --radius-pill: 999px

  /* ── SHADOWS ────────────────────────────────────────────── */
  --shadow-glass: 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)
  --shadow-glow:  0 0 24px rgba(accent-primary, 0.20)
  --shadow-deep:  0 24px 64px rgba(0,0,0,0.20)

  /* ── TRANSITIONS ────────────────────────────────────────── */
  --transition-fast:   150ms cubic-bezier(0.4, 0, 0.2, 1)
  --transition-base:   250ms cubic-bezier(0.4, 0, 0.2, 1)
  --transition-slow:   400ms cubic-bezier(0.4, 0, 0.2, 1)

  /* ── TYPOGRAPHY ─────────────────────────────────────────── */
  --font-display:  'Outfit', sans-serif       (headings, numbers, labels)
  --font-body:     'Inter', sans-serif        (body text, options, explanations)
  --font-mono:     'JetBrains Mono', monospace (question IDs, codes)
}
```

### 2.3 — The Background Mesh

The app background is not a solid color. It is a layered gradient mesh that creates depth.
This goes on the `body` element and stays fixed — it never scrolls.

```
Three radial gradients positioned at different corners:
  Top-left:     accent-primary at low opacity (12–15%)
  Bottom-right: accent-secondary at low opacity (10–12%)
  Center:       a very subtle glow at 5–8% opacity

The gradients are large (60–80vw radius) and soft.
They do not move. They are the atmospheric layer everything else sits on top of.
Add a very subtle noise texture overlay at 3–4% opacity for tactile depth.
```

### 2.4 — System Theme Integration

The app reads the OS theme preference using:
```
@media (prefers-color-scheme: dark)  → dark variable set
@media (prefers-color-scheme: light) → light variable set
```

All CSS variables are defined twice — once for dark, once for light.
The dark set is the default (most students will use this app at night).
The light set overrides within the media query.
No JavaScript theme toggle is needed — the OS controls it.

### 2.5 — The Glass Component Mixin

Every glass surface in the app uses this exact combination:
```css
background:      var(--glass-bg);
backdrop-filter: blur(var(--glass-blur));
-webkit-backdrop-filter: blur(var(--glass-blur));
border:          var(--glass-border);
border-radius:   var(--radius-lg);
box-shadow:      var(--shadow-glass);
```

On hover, transition to:
```css
background:  var(--glass-bg-hover);
border:      var(--glass-border-hover);
transition:  var(--transition-base);
```

This mixin is the foundation of every card, panel, modal, and surface.

### 2.6 — Typography Rules

Import these fonts from Google Fonts in index.html:
```
Outfit: weights 400, 500, 600, 700
Inter: weights 400, 500
JetBrains Mono: weight 400
```

Usage rules:
```
--font-display at 700: page headings, score numbers, timer
--font-display at 600: card titles, section headers, button text
--font-display at 500: labels, badge text, nav items
--font-body   at 400:  question text, option text, explanations
--font-body   at 500:  emphasis within body text
--font-mono   at 400:  question IDs, option letters (A B C D)
```

### 2.7 — Animation Rules

Every animation in the app follows these rules:

**Page transitions:** Fade + subtle upward slide. New page fades in from 96% opacity and translateY(8px) to 100% opacity and translateY(0). Duration: 300ms. Easing: ease-out.

**Card entrance:** When the home grid loads, cards animate in with staggered delay. Each card: fade from 0 to 1, translateY from 16px to 0. Delay increases by 40ms per card. Duration 400ms each.

**Hover states:** Border brightness and background opacity change only. No scale, no lift, no translateY. Duration: 150ms. This keeps it subtle and professional.

**Option selection:** When a student clicks an option, the selected option's background transitions to the active glass state and the circle indicator fills with accent color. Duration: 120ms. Instant feel.

**Timer warning:** When under 5 minutes, the timer text color transitions to danger accent. Smooth color transition over 500ms. No pulsing, no shaking — just the color change.

**Modal entrance:** Overlay fades in (200ms), modal scales from 96% to 100% with fade (250ms). Exit is the reverse.

---

## PART 3 — BUILD ORDER

Build in this exact sequence. Do not start step N+1 until step N is confirmed working.

---

### STEP 1 — main.jsx

**What it does:** Entry point. Mounts the React app into the DOM.

**What to write:**
- Import React
- Import ReactDOM
- Import App from App.jsx
- Import index.css
- Mount App into the div with id="root"
- Nothing else — no providers here yet, those come in Step 4

**Confirm working:** Run the dev server. A blank white or dark screen with no console errors means this step is done.

---

### STEP 2 — index.css

**What it does:** Defines the entire design system. The most important file in the project.

**What to write:**

Section 1 — Google Font imports (Outfit, Inter, JetBrains Mono)

Section 2 — CSS reset:
```
*, *::before, *::after → box-sizing: border-box, margin: 0, padding: 0
html, body → height: 100%, overflow: hidden (the app never window-scrolls)
#root → height: 100%, overflow: hidden
```

Section 3 — All CSS variables from Part 2.2 — dark mode defaults

Section 4 — Light mode overrides inside @media (prefers-color-scheme: light)

Section 5 — The body background mesh:
```
body:
  background-color: var(--bg-base)
  background-image: three radial gradients as described in Part 2.3
  background-attachment: fixed
  font-family: var(--font-body)
  color: var(--text-primary)
```

Section 6 — Scrollbar styling:
```
Custom thin scrollbar for the content area
Width: 4px
Track: transparent
Thumb: var(--glass-bg-hover)
Thumb on hover: var(--accent-primary) at 50% opacity
```

Section 7 — Utility classes:
```
.glass           → the glass mixin from Part 2.5
.glass-hover     → glass mixin with hover state styles
.glass-deep      → for modals (heavy blur, deeper bg)
.text-primary    → var(--text-primary)
.text-secondary  → var(--text-secondary)
.text-tertiary   → var(--text-tertiary)
.font-display    → var(--font-display)
.font-mono       → var(--font-mono)
```

**Confirm working:** The background mesh should be visible. Page has depth and atmosphere.

---

### STEP 3 — App.jsx

**What it does:** Router shell. Defines which page renders at which route.

**What to write:**
- Import BrowserRouter, Routes, Route from react-router-dom
- Import all 6 page components (they are empty — that is fine)
- Define routes:
  ```
  /           → Landing.jsx
  /home       → Home.jsx
  /mock/:id   → MockStartScreen.jsx
  /test/:id   → TestInterface.jsx
  /results/:id → ResultsScreen.jsx
  /solutions/:id → SolutionsScreen.jsx
  ```
- Wrap everything in the context providers (added progressively as contexts are built)
- Apply page transition animation wrapper around the Routes

**Confirm working:** Navigate to / — Landing renders (blank but no crash). Navigate to /home — Home renders (blank).

---

### STEP 4 — Context and Data Loading

Build in this sub-order:

**4A — questionLoader.js (src/utils/)**

This is the most critical utility. It loads question data from `data set/`.

Rules for this file:
- In Electron, file paths are accessed differently than in a browser. Use the correct Electron IPC or filesystem approach configured in vite.config.js
- The loader reads JSON files from `data set/Computer/`, `data set/English/`, `data set/GK/`, `data set/Reasoning/`
- It returns a structured object:
  ```javascript
  {
    english: {
      tenses: [...questions],
      active_passive_voice: [...questions],
      // ... all 15 topics
    },
    reasoning: { /* 14 topics */ },
    gk: { /* 10 topics */ },
    computer: { /* 12 topics */ }
  }
  ```
- Map `io_devices.json` to key `input_output_devices` for consistency
- Map `indian_polity.json` to key `indian_polity_constitution`
- Map `indian_history.json` to key `indian_history_freedom`
- Map `geography.json` to key `geography_india_world`
- Every other file maps directly by its filename without extension

**4B — mockBuilder.js (src/utils/)**

This utility reads from `practice_pool/mocks/full_mocks/`.

What it does:
- Loads a mock JSON file by ID (e.g., FULL-MOCK-01.json)
- Returns the structured mock object with all question IDs
- Resolves question IDs to full question objects using the loaded question pool
- Returns a complete mock ready for the test interface

**4C — MockContext.jsx (src/context/)**

React context that:
- Loads all 19 full mock files on app startup
- Exposes: allMocks, getMockById(id), mockStatus (not_started / in_progress / completed)
- Stores mock completion status in localStorage keyed by mock_id
- Reads back from localStorage on app load so progress persists

**4D — AttemptContext.jsx (src/context/)**

React context that manages an active test attempt:
- currentAttempt: the active attempt object
- responses: map of questionId → selected option
- startAttempt(mockId): initialises a new attempt
- saveResponse(questionId, option): saves a single answer
- markForReview(questionId): toggles review flag
- submitAttempt(): locks responses, calculates score, saves result
- timeRemaining: countdown in seconds
- Persists in-progress attempts to localStorage so a refresh does not lose progress

**4E — ThemeContext.jsx (src/context/)**

Simple context that reads the OS theme preference:
- theme: 'dark' | 'light'
- Updates if the OS theme changes while the app is open (use matchMedia listener)
- This is read-only — the user cannot manually toggle the theme

**4F — Wrap App.jsx with all three providers**

Order: ThemeContext wraps MockContext wraps AttemptContext wraps Router

**Confirm working:** Console.log the loaded question pool. Verify all 51 topics load. Verify all 19 mocks load.

---

### STEP 5 — src/data/ Configuration Files

**5A — subjectConfig.js**

Defines the four subjects with their display properties:
```javascript
export const SUBJECTS = {
  english: {
    label: 'English Language',
    shortLabel: 'English',
    color: 'var(--subject-english-solid)',
    tint: 'var(--subject-english)',
    icon: 'the English icon from icons.svg',
    topicsCount: 15,
    questionsPerFullMock: 30,
  },
  reasoning: { /* same structure, 14 topics, 30 Qs per mock */ },
  gk: {
    label: 'General Knowledge',
    /* 10 topics, 20 Qs per mock */
  },
  computer: {
    label: 'Computer Basics',
    /* 12 topics, 20 Qs per mock */
  }
}
```

**5B — topicMap.js**

Maps every topic file name to its display label:
```javascript
export const TOPIC_LABELS = {
  tenses: 'Tenses',
  active_passive_voice: 'Active / Passive Voice',
  modal_verbs: 'Modal Verbs',
  reading_comprehension: 'Reading Comprehension',
  // ... all 51 topics with clean display names
  io_devices: 'Input / Output Devices',
  indian_polity: 'Indian Polity & Constitution',
  // etc.
}
```

**5C — mockPlan.js**

Defines the metadata for all 19 mocks:
```javascript
export const MOCK_PLAN = [
  {
    id: 'FULL-MOCK-01',
    displayName: 'Full Mock Test 1',
    type: 'full_mock',
    subjects: ['english', 'reasoning', 'gk', 'computer'],
    totalQuestions: 100,
    totalMarks: 100,
    durationSeconds: 7200,
  },
  // Mocks 02–17 follow same structure
  {
    id: 'FULL-MOCK-18',
    displayName: 'Mock Test 18',
    type: 'mixed_mock',
    subjects: ['english', 'reasoning'],
    totalQuestions: 50,
    totalMarks: 50,
    durationSeconds: 2400,    // 40 minutes
  },
  {
    id: 'FULL-MOCK-19',
    displayName: 'Final Reserve Mock',
    type: 'full_mock',
    subjects: ['english', 'reasoning', 'gk', 'computer'],
    // question counts from the JSON file itself
  }
]
```

---

### STEP 6 — Shell Components

**6A — TopBar.jsx (src/components/shell/)**

Fixed bar at the very top. 56px height.

Left side:
- App logo/icon from public/icons.svg — 24px, tinted with accent color
- App name "CET Practice" in font-display 600, text-primary

Right side:
- Exam countdown: "Exam in X days" — calculated from hardcoded exam date April 28, 2026
- If exam date has passed: "Exam Day!" in accent-success color
- Font: font-display 500, text-secondary for label, text-primary for number

Styling:
- Glass mixin — but lighter blur (6px) since it is the topmost layer
- Full width, z-index above everything
- Bottom border: var(--glass-border)
- No shadow on the top bar itself

**6B — NavRail.jsx (src/components/shell/)**

Horizontal tab navigation. 48px height. Sits directly below TopBar.

Tabs: Mock Tests · Subject Practice (placeholder, links to /home for now) · My Progress (placeholder) · Study Guide (placeholder for the markdown docs)

Active tab:
- Text: var(--accent-primary)
- Underline indicator: 2px solid var(--accent-primary), bottom of the tab
- Background: var(--glass-bg) — subtle glass tint behind active tab

Inactive tab:
- Text: var(--text-secondary)
- No underline
- On hover: text transitions to var(--text-primary), subtle glass bg appears

The indicator line slides between tabs on navigation — CSS transition on the underline position, not a jumping swap.

Styling:
- Glass mixin with 8px blur
- Top border: var(--glass-border) — to separate from TopBar
- Bottom border: var(--glass-border)

**6C — ContentArea.jsx (src/components/shell/)**

The scrollable container. Takes all remaining height after TopBar and NavRail.

```
height: calc(100vh - 56px - 48px)
overflow-y: auto
overflow-x: hidden
padding: var(--space-xl)
```

Uses the custom scrollbar defined in index.css.
This is the only element in the entire app that scrolls.
Renders {children} — whatever page is active renders inside this.

**6D — Wire shell into App.jsx**

App.jsx renders:
```
ThemeContext
  MockContext
    AttemptContext
      TopBar (outside Router — always visible)
      NavRail (outside Router — always visible)
      ContentArea
        Router
          Routes (all 6 page routes)
```

**Confirm working:** TopBar and NavRail are visible and fixed. Content area below them scrolls independently. Background mesh visible through the glass surfaces.

---

### STEP 7 — UI Primitives (src/components/ui/)

Build these small components before any page — every page uses them.

**7A — Badge.jsx**

Props: label, variant (subject | priority | type | status)

Subject variants use the subject tint variables.
Priority variants: must_do (danger tint), high (warning tint), moderate (info tint).
Status variants: not_started (glass), in_progress (warning tint), completed (success tint).

Styling: pill shape (radius-pill), font-display 500, 11px, padding 2px 10px, glass background tinted with the variant color.

**7B — Button.jsx**

Props: label, variant (primary | secondary | ghost | danger), size (sm | md | lg), onClick, disabled, fullWidth

Primary: filled with accent-primary, white text, subtle glow shadow
Secondary: glass background, accent-primary text, glass border
Ghost: transparent background, text-secondary, glass border on hover only
Danger: filled with accent-danger, white text

All variants: font-display 600, radius-md, transition-fast, pointer cursor
Disabled state: 40% opacity, no pointer events, no hover effect

**7C — ProgressBar.jsx**

Props: value (0–100), variant (default | success | warning | danger), showLabel

A thin horizontal bar (6px height, radius-pill).
Track: var(--glass-bg) with glass border.
Fill: gradient from variant color at 80% to variant color at 100% — subtle gradient within the same color family.
Animated: fill width transitions with transition-slow when value changes.

**7D — StatusChip.jsx**

Props: status (not_started | in_progress | completed), score (optional)

not_started: text "Not Attempted", text-tertiary
in_progress: text "In Progress", accent-warning, small dot indicator pulsing
completed: text "Score: X/Y", accent-success

Styling: font-body 400, 12px, inline with a small colored dot to the left.

---

### STEP 8 — MockCard.jsx (src/components/cards/)

This is the centrepiece of the Home screen. Build it with care.

**Card Container:**
```
Glass mixin (full standard)
Width: 100% of grid cell
Cursor: pointer
Transition: border var(--transition-fast), background var(--transition-fast)
On hover: glass-bg-hover, glass-border-hover
```

**Internal layout — top to bottom:**

```
┌─────────────────────────────────────┐  ← glass card
│ [TypeBadge]          [Mock 01]      │  ← top row: badge left, number right
│                                     │
│ Full Mock Test 1                    │  ← title: font-display 700, 18px
│                                     │
│ 100 Questions · 120 min · 100 Marks │  ← info row: font-body 400, 13px, tertiary
│                                     │
│ [English] [Reasoning] [GK] [Comp]   │  ← subject tags: Badge components
│                                     │
│ ████████████░░░░░░░░  71%           │  ← ProgressBar (hidden if not_started)
│                                     │
│ ● Score: 71/100                     │  ← StatusChip
│                                     │
│ ╔═══════════════════════════════╗   │
│ ║        Start Mock             ║   │  ← Button, fullWidth, primary/ghost/warning
│ ╚═══════════════════════════════╝   │
└─────────────────────────────────────┘
```

**Card states:**

Not started:
- TypeBadge: "Full Mock" in accent-primary tint
- ProgressBar: hidden
- StatusChip: "Not Attempted"
- Button: "Start Mock" — primary variant

In progress (attempt exists in localStorage but not submitted):
- TypeBadge: accent-warning tint
- ProgressBar: shows partial progress based on answered questions
- StatusChip: "In Progress" with pulsing dot
- Button: "Resume" — warning variant

Completed:
- TypeBadge: accent-success tint
- ProgressBar: shows final score percentage, success variant
- StatusChip: "Score: 71/100" in success color
- Button: "Review" — ghost variant
- Card border: subtly tinted with success color (var(--accent-success) at 20% opacity)

**Special treatment for Mock 18:**
- TypeBadge says "English + Reasoning" — uses a split gradient badge: half indigo, half emerald
- Info row: "50 Questions · 40 min · 50 Marks"
- Subject tags: only English and Reasoning

---

### STEP 9 — Home.jsx (src/pages/)

**Layout inside ContentArea:**

```
Section 1 — Header Row (not sticky, just first element):
  Left: "Mock Tests" — font-display 700, 28px, text-primary
  Right: Filter pills — "All" · "Full Mock" · "Mixed" — toggle filter

Section 2 — Stats Strip:
  Three glass cards side by side, equal width, with gap
  Card 1: "19" large, "Total Mocks" label
  Card 2: "X" dynamic, "Completed" label — accent-success color for number
  Card 3: "X%" dynamic, "Avg Score" label — accent-primary color for number
  Each stat card: glass mixin, radius-md, padding space-md, text centered

Section 3 — The Mock Grid:
  CSS Grid: grid-template-columns: repeat(3, 1fr)
  Gap: var(--space-lg) both row and column
  Width: 100%
  No fixed height — grows with content (ContentArea handles scroll)
  Map over MOCK_PLAN array filtered by active filter pill
  Render one MockCard per mock
  Staggered entrance animation: card N has animation-delay of N * 40ms
```

**Filter pill logic:**
- All: show all 19 mocks
- Full Mock: show Mocks 01–17 and 19
- Mixed: show Mock 18 only

**Confirm working:** All 19 cards render in a 3-column grid. Scrolling works inside the content area. TopBar and NavRail stay fixed while grid scrolls.

---

### STEP 10 — MockStartScreen.jsx (src/pages/)

Activated when student clicks "Start Mock" on any card.
Route: /mock/:id

**Layout:**

```
Back arrow + "Mock Tests" breadcrumb — top left

Mock title — font-display 700, 32px
Mock subtitle — "4 Subjects · 100 Questions · 120 Minutes"

Instructions Panel — glass card, radius-lg, padding space-xl:
  Heading: "Instructions" — font-display 600, 18px
  List of 6 rules:
    ✓ Each correct answer earns 1 mark
    ✓ No negative marking — wrong answers score 0
    ✓ Unattempted questions score 0
    ✓ Timer starts immediately when you click Begin
    ✓ You cannot pause the timer once started
    ✓ You can navigate freely between all questions

Subject Breakdown Table — glass card, radius-lg:
  For full mocks: 4 rows (one per subject)
  Columns: Subject · Questions · Marks · Ideal Time
  For Mock 18: 2 rows (English, Reasoning)
  Table uses glass-bg for header row, transparent for data rows
  Bottom border between rows using var(--glass-border)

Two buttons — side by side, right-aligned:
  Left: "Go Back" — ghost variant, navigates back to /home
  Right: "Begin Test" — primary variant, large size
         On click: calls startAttempt(mockId) in AttemptContext
                   then navigates to /test/:id
```

---

### STEP 11 — TestInterface.jsx (src/pages/)

The most complex page. Build it in sub-steps.

**11A — Overall Layout Structure**

The TestInterface has its own internal layout that overrides ContentArea's scroll:
```
TestInterface fills the entire ContentArea
Its own layout:
  ┌─────────────────────────────────────────────────────┐
  │ TestHeader (fixed, 60px)                            │
  ├────────────────────────────────┬────────────────────┤
  │ QuestionPanel                  │ PalettePanel       │
  │ (70% width, internal scroll)   │ (30% width, fixed) │
  │                                │                    │
  └────────────────────────────────┴────────────────────┘
  │ NavigationRow (fixed, 64px)                         │
  └─────────────────────────────────────────────────────┘
```

**11B — TestHeader (uses TimerBar.jsx component)**

Left: Mock name — font-display 600, 16px, text-secondary
Center: Timer — font-display 700, 24px, font-mono for the digits
  - Format: MM:SS
  - Normal: text-primary
  - Under 10 minutes: text-warning
  - Under 5 minutes: text-danger
  - Smooth color transition between states
Right: "Q 23 / 100" progress — font-display 500, 14px, text-secondary

Glass mixin with 12px blur. Bottom border: var(--glass-border). Z-index above question and palette panels.

**11C — QuestionPanel (uses QuestionPanel.jsx component)**

Left 70% of the test area. Has its own internal scroll.

Structure:

```
Question Header Row:
  Left: "Question 23" — font-display 600, 14px, text-tertiary
  Right: Topic badge — Badge component with topic name
  Both on same line with space-between

[For passage-based questions only:]
Passage Box:
  Glass card with glass-bg (slightly different tint from main card)
  Max-height: 200px, internal scroll
  Scrollbar styled same as ContentArea
  Font: font-body 400, 15px, line-height 1.7, text-secondary
  Label "Passage" in font-display 500, 11px, text-tertiary above the box

Question Text:
  Font: font-body 400, 17px, line-height 1.6, text-primary
  Margin: space-lg top and bottom
  Fill-in-blank underscores: displayed as a short colored line
    using accent-primary with 3px height and 80px width inline

Four Option Buttons (OptionButton.jsx):
  Full-width, stacked vertically, gap: space-sm between each
  Each option:
    Glass card (glass-bg, glass-border, radius-md)
    Left: Option letter circle (A/B/C/D) — 32px circle
      Unselected: glass-bg border, font-mono 400, text-secondary inside
      Selected: filled with accent-primary, white letter inside
    Right: Option text — font-body 400, 15px, text-primary
    Padding: space-md left and right, space-sm top and bottom

  Option states and their styles:
    Default:   glass-bg, glass-border — standard glass
    Hover:     glass-bg-hover, glass-border-hover, cursor pointer
    Selected:  glass-bg-active, border: 1px solid var(--accent-primary) at 50%
               subtle left border accent: 3px solid var(--accent-primary)
    Correct (result view only):
               background: var(--accent-success) at 15% opacity
               border: 1px solid var(--accent-success)
               letter circle: filled with accent-success
    Wrong (result view only):
               background: var(--accent-danger) at 15% opacity
               border: 1px solid var(--accent-danger)
               letter circle: filled with accent-danger
```

**11D — PalettePanel (uses QuestionPalette.jsx component)**

Right 30% of the test area. Fixed position — does not scroll.

```
Panel: glass-deep mixin (heavier glass)
Left border: var(--glass-border)
Padding: space-md all sides
Overflow-y: auto for the grid (the panel itself is fixed height)

Palette Header:
  "Question Palette" — font-display 600, 13px, text-secondary
  Section tabs below (full mocks only):
    Eng | Rsn | GK | Comp — small pill tabs
    Active tab: accent-primary tint
    Click scrolls the grid to that section's questions
    Mock 18: only Eng | Rsn tabs

Question Number Grid:
  display: grid
  grid-template-columns: repeat(5, 1fr) for full mock (100 Qs = 20 rows of 5)
  grid-template-columns: repeat(5, 1fr) for 50-Q mocks (10 rows of 5)
  gap: 4px
  Each cell: 36px × 36px, radius-sm, font-display 500, 12px, centered number
  Cell states:
    Not Visited:   glass-bg, text-tertiary
    Answered:      accent-success at 25% bg, accent-success text
    Not Answered:  accent-danger at 25% bg, accent-danger text
    Marked Review: accent-warning at 25% bg, accent-warning text
    Current Q:     accent-primary border glow, accent-primary text

Palette Legend:
  Four small items below the grid:
  ● Green = Answered
  ● Red = Not Answered
  ● Amber = Marked Review
  ● Grey = Not Visited
  Font: font-body 400, 11px, text-tertiary

Submit Button:
  At the very bottom of the palette panel
  Full-width, danger variant Button component
  Label: "Submit Mock"
  Margin-top: auto (pushes to bottom of panel)
```

**11E — NavigationRow (uses NavigationRow.jsx component)**

Fixed at the bottom of the TestInterface. 64px height.
Glass mixin. Top border: var(--glass-border).

```
Layout: three sections in a row with space-between

Left: "← Previous" — ghost Button, navigates to previous question
      Disabled on Q1

Center: "Clear Response" — text-danger color, font-display 500, 13px
        Removes current selection for this question
        Only visible when current question has a selection

Right: Two buttons side by side:
       "Mark for Review →" — ghost Button, smaller
       "Save & Next →"     — primary Button
       Save & Next saves response AND moves to next question
       On last question: "Save & Next" becomes "Review Answers"
```

**11F — useTimer hook**

In src/hooks/useTimer.js:
- Takes initialSeconds and onExpire callback
- Returns: timeRemaining (seconds), formattedTime (MM:SS string), isExpired
- Decrements every second using setInterval
- Calls onExpire when it hits 0
- Saves timeRemaining to localStorage every 10 seconds for crash recovery
- Clears interval on unmount

**Confirm working:** Full mock renders all 100 questions in palette. Timer counts down. Selecting options updates palette cell color. Navigation between questions works.

---

### STEP 12 — SubmitConfirmModal.jsx (src/components/modals/)

Triggered when student clicks "Submit Mock" in the palette.

```
Overlay:
  Position: fixed, fills entire viewport
  Background: rgba(0,0,0,0.60) — not a CSS variable, this is a one-time overlay
  Backdrop-filter: blur(4px)
  Z-index: above everything
  Fade in animation: 200ms

Modal Box:
  Glass-deep mixin
  Width: 480px, max-width: 90vw
  Centered (transform translate trick)
  Scale in animation: from 96% to 100%, 250ms, ease-out

Modal Content:
  Heading: "Submit Mock Test?" — font-display 700, 22px, text-primary

  Summary Table:
    Four rows in a glass-bg surface with radius-md:
    Answered:        [count] — accent-success color
    Not Answered:    [count] — accent-danger color
    Marked Review:   [count] — accent-warning color
    Total Questions: [count] — text-primary
    Each row: padding space-sm, bottom border glass-border

  Warning text:
    "Unanswered questions will score 0. This cannot be undone."
    Font: font-body 400, 13px, text-tertiary
    Margin: space-md top

  Button row (right-aligned):
    "Go Back" — ghost, closes modal
    "Submit Now" — danger variant

  Loading state (after Submit Now clicked):
    Replace button row with centered spinner
    Spinner: rotating circle, accent-primary color, 24px
    Text below: "Calculating your score..." — text-secondary
    Duration: 800ms then navigate to results
```

---

### STEP 13 — ResultsScreen.jsx (src/pages/)

Route: /results/:id

**13A — Score Hero Section**

```
Centered at top of results:

Circular progress ring:
  SVG circle, 160px diameter
  Background circle: var(--glass-border) color, stroke-width 8px
  Progress circle: var(--accent-primary), stroke-width 8px
  Stroke-dasharray animation: grows from 0 to final percentage on load
  Animation duration: 1200ms, ease-out

Inside the ring:
  Score fraction "71/100" — font-display 700, 28px
  Percentage "71%" — font-display 500, 14px, text-secondary

Below the ring:
  Performance message based on score:
    90–100%: "Outstanding! 🎯"
    75–89%:  "Great Performance!"
    60–74%:  "Good effort — review weak topics"
    40–59%:  "Keep practicing — you'll improve"
    0–39%:   "Focus needed — review all topics"
  Font: font-display 600, 18px, text-primary
  Margin: space-md top
```

**13B — Subject Score Cards**

Four glass cards in a 2×2 grid (or 4 in a row if width allows):

Each card:
```
Subject color badge at top
Subject name — font-display 600, 15px
Score "22 / 30" — font-display 700, 24px, in subject color
ProgressBar — subject color variant, shows percentage
Three inline stats: Correct · Wrong · Skipped — text-tertiary, 12px
```

For Mock 18: show only 2 subject cards (English and Reasoning).

**13C — Difficulty Breakdown**

Glass card, full width:
Heading: "Performance by Difficulty"

Three rows:
```
Easy:   [score/total] ████████░░░░  75%
Medium: [score/total] ██████░░░░░░  62%
Hard:   [score/total] ███░░░░░░░░░  30%
```
Each row: label left, ProgressBar center, percentage right.
Easy row uses accent-success, Medium uses accent-warning, Hard uses accent-danger for bar color.

**13D — Topic-Wise Table**

Glass card, full width, with internal scroll if many topics:
Heading: "Topic Performance"

Table columns: Topic · Subject · Correct · Wrong · Skipped · Score%

Rows sorted by Score% ascending (weakest topics first).
Row with Score% < 50%: subtle accent-danger tint on the row background.
Row with Score% >= 80%: subtle accent-success tint.
Font: font-body 400, 14px for data, font-display 500, 12px for header.

**13E — Weak Topics Callout**

Glass card with accent-warning left border (3px solid):
Heading: "Recommended Practice" in accent-warning color
Subtext: "Based on your performance, focus on these topics:"

List of up to 3 weakest topics:
Each item: topic name, subject badge, "Practice Now →" link
"Practice Now" is a placeholder for now (subject-wise mocks not built yet)

**13F — Bottom Buttons**

Two buttons side by side:
"View Solutions" — primary, navigates to /solutions/:id
"Back to Mocks"  — ghost, navigates to /home

---

### STEP 14 — SolutionsScreen.jsx (src/pages/)

Route: /solutions/:id

**Sticky header:**
```
"Solutions — Full Mock Test 1"  |  ← Back to Results
Font-display 600, 18px
Score reminder: "Your Score: 71/100"
Glass mixin, stays at top of ContentArea while page scrolls
```

**Question cards — one per question, stacked vertically:**

Each question card:
```
Glass card, radius-lg, padding space-lg
Margin bottom: space-md

Top row:
  Left: Question number "Q 23" — font-display 600, 13px, text-tertiary
  Right: Topic badge + Difficulty chip (easy/medium/hard)

Question text: font-body 400, 16px, line-height 1.6, text-primary

[Passage box if applicable — same as TestInterface style]

Four options:
  Same layout as TestInterface option buttons
  But now frozen (not clickable)
  Student's selected option:
    Correct selection: correct style (success tint)
    Wrong selection:   wrong style (danger tint)
  Correct answer always highlighted in success style
  Options the student did not select: default glass style
  If student did not attempt: all default, correct answer highlighted

Explanation box:
  Glass card inside the question card — slightly different tint
  Label "Explanation" — font-display 600, 12px, accent-primary, uppercase
  Explanation text: font-body 400, 14px, text-secondary, line-height 1.7
  Left border: 3px solid var(--accent-primary)
```

Progress as student scrolls through solutions is indicated by the browser's native scroll position — no sticky secondary header needed.

---

### STEP 15 — Landing.jsx (src/pages/)

Route: / — built last because it is the simplest visually but needs the rest of the app to work.

**Full viewport. No TopBar. No NavRail. Just the landing experience.**

```
Background: same mesh as the rest of the app (body styles apply)

Center layout — vertically and horizontally centered:

  App icon from public/icons.svg — 64px, with subtle glow shadow

  Heading: "CET Practice"
  Font: font-display 700, 56px, text-primary
  Optional: subtle gradient on the text using accent colors

  Subheading: "MAH-BHMCT / BCA / BBA / BMS / BBM CET 2026"
  Font: font-display 400, 18px, text-secondary

  Three stat pills in a row:
    "19 Mock Tests"  ·  "1,820 Questions"  ·  "51 Topics"
    Each: glass mixin, radius-pill, font-display 500, 14px, padding space-sm space-md

  Enter button:
    "Start Practicing →"
    Primary Button, large size
    On click: navigate to /home
    On hover: subtle glow shadow using accent-primary-glow

  Bottom note:
    "No internet required · All data stored locally"
    Font: font-body 400, 12px, text-tertiary
```

Entrance animation:
- Icon fades in first (0ms delay)
- Heading fades up after 150ms
- Subheading after 250ms
- Stat pills after 350ms
- Button after 500ms
- Bottom note after 600ms

---

## PART 4 — THE DATA PATH (CRITICAL)

Every data read in the app follows this exact path:

```
data set/ JSON files
    ↓
questionLoader.js (reads and structures the data)
    ↓
MockContext (holds all questions in memory)
    ↓
mockBuilder.js (builds a full mock from IDs in practice_pool/)
    ↓
AttemptContext (manages the active test session)
    ↓
TestInterface / ResultsScreen / SolutionsScreen (display layer)
```

The `data set/` folder is never written to. Only read.
The `practice_pool/` folder is never written to. Only read.
The only writes happen to localStorage — attempt progress and results.

---

## PART 5 — COMPLETE FILE BUILD CHECKLIST

Build each file in this sequence. Mark done before moving on:

```
FOUNDATION:
[ ] index.css — complete design system, all variables, background mesh
[ ] main.jsx — entry point
[ ] App.jsx — router shell (routes only, no logic yet)

DATA LAYER:
[ ] utils/questionLoader.js
[ ] utils/mockBuilder.js
[ ] utils/scoreCalculator.js
[ ] utils/weakTopicDetector.js
[ ] context/ThemeContext.jsx
[ ] context/MockContext.jsx
[ ] context/AttemptContext.jsx
[ ] hooks/useTimer.js
[ ] hooks/useMockLoader.js
[ ] hooks/useAttempt.js
[ ] data/subjectConfig.js
[ ] data/topicMap.js
[ ] data/mockPlan.js

SHELL:
[ ] components/shell/TopBar.jsx
[ ] components/shell/NavRail.jsx
[ ] components/shell/ContentArea.jsx
[ ] Wire shell into App.jsx

UI PRIMITIVES:
[ ] components/ui/Badge.jsx
[ ] components/ui/Button.jsx
[ ] components/ui/ProgressBar.jsx
[ ] components/ui/StatusChip.jsx

HOME:
[ ] components/cards/MockCard.jsx
[ ] pages/Home.jsx

PRE-TEST:
[ ] pages/MockStartScreen.jsx

TEST INTERFACE:
[ ] hooks/useTimer.js (if not done)
[ ] components/test/TimerBar.jsx
[ ] components/test/OptionButton.jsx
[ ] components/test/QuestionPanel.jsx
[ ] components/test/QuestionPalette.jsx
[ ] components/test/NavigationRow.jsx
[ ] components/modals/SubmitConfirmModal.jsx
[ ] pages/TestInterface.jsx

RESULTS:
[ ] components/results/ScoreHero.jsx
[ ] components/results/SubjectScoreCard.jsx
[ ] components/results/DifficultyBreakdown.jsx
[ ] components/results/TopicTable.jsx
[ ] components/results/WeakTopicsCallout.jsx
[ ] pages/ResultsScreen.jsx

SOLUTIONS:
[ ] pages/SolutionsScreen.jsx

LANDING:
[ ] pages/Landing.jsx
```

---

## PART 6 — RULES FOR THE ENTIRE BUILD

```
RULE 1 — System theme always
  No hardcoded hex or rgb values anywhere in component files.
  Only CSS variables. The only place hex values exist is index.css.

RULE 2 — Glass everywhere
  Every surface uses the glass mixin.
  No flat opaque white or dark cards anywhere.
  No solid color backgrounds on any card, panel, or modal.

RULE 3 — Data read-only
  data set/ and practice_pool/ are never written to.
  localStorage is the only writable store.

RULE 4 — No inline styles
  All styling through CSS variables and utility classes.
  Component-specific styles use CSS Modules or styled components —
  never inline style props in JSX.

RULE 5 — Build order is law
  Step N+1 is not started until Step N is confirmed working.
  "Confirmed working" means rendered in browser with no console errors.

RULE 6 — Mock 18 is always a special case
  Every component that renders mock metadata must handle
  Mock 18's unique structure: English + Reasoning only, 50 Qs, 40 min.
  No component should assume all mocks are 100 questions or 4 subjects.

RULE 7 — All questions are used
  The question pool is fully allocated across 19 mocks.
  The app does not need to pick or assign questions.
  It reads pre-built mock JSON files that already have question IDs.
```

---

*End of Complete Build Instructions*
*19 Mocks · 1,820 Questions · 51 Topics · Glassmorphism Design System*
