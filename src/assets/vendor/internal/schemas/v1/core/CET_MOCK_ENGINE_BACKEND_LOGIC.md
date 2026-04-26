# CET Mock Test Engine — Backend Logic Instructions
### MAH-BHMCT / BCA / BBA / BMS / BBM CET 2026
### Version 1.0 — Complete Backend Specification

---

> ## PURPOSE OF THIS DOCUMENT
> This document defines the complete backend logic for the CET Mock Test Engine.
> Two test types exist: the Full Mock Test and the Subject-Wise Mock Test.
> Every rule here is mandatory. The engine must implement all logic exactly as specified.
> No approximations. No shortcuts. No alternative interpretations.

---

## PART 1 — THE DATASET FOUNDATION

### 1.1 — Total Question Pool

```
Subject          Topics    Questions
English            15         540
Reasoning          14         560
General Knowledge  10         360
Computer Basics    12         360
─────────────────────────────────
TOTAL              51       1,820
```

### 1.2 — Per-Subject Topic Inventory

The engine must load and index ALL questions at startup.
Questions are stored in the following file structure:

```
practice_pool/
├── english/
│   ├── tenses.json                     (60 questions)
│   ├── active_passive_voice.json       (50 questions)
│   ├── modal_verbs.json                (40 questions)
│   ├── reading_comprehension.json      (60 questions)
│   ├── synonyms_antonyms.json          (50 questions)
│   ├── articles.json                   (30 questions)
│   ├── conjunctions_connectives.json   (30 questions)
│   ├── direct_indirect_speech.json     (40 questions)
│   ├── sentence_types.json             (30 questions)
│   ├── idioms_phrases.json             (30 questions)
│   ├── fill_in_the_blanks.json         (30 questions)
│   ├── sentence_correction.json        (40 questions)
│   ├── para_jumbles.json               (20 questions)
│   ├── one_word_substitution.json      (20 questions)
│   └── cloze_test.json                 (40 questions)
│
├── reasoning/
│   ├── number_letter_series.json       (60 questions)
│   ├── coding_decoding.json            (60 questions)
│   ├── blood_relations.json            (40 questions)
│   ├── data_interpretation.json        (60 questions)
│   ├── analogies.json                  (50 questions)
│   ├── seating_arrangement.json        (40 questions)
│   ├── syllogisms.json                 (40 questions)
│   ├── direction_sense.json            (20 questions)
│   ├── age_problems.json               (30 questions)
│   ├── averages_simplification.json    (40 questions)
│   ├── profit_loss.json                (40 questions)
│   ├── percentages.json                (40 questions)
│   ├── symbolic_inequalities.json      (20 questions)
│   └── calendar_days.json              (20 questions)
│
├── general_knowledge/
│   ├── current_affairs.json            (80 questions)
│   ├── indian_polity_constitution.json (50 questions)
│   ├── economy_business.json           (40 questions)
│   ├── sports.json                     (35 questions)
│   ├── science_technology.json         (35 questions)
│   ├── indian_history_freedom.json     (25 questions)
│   ├── geography_india_world.json      (25 questions)
│   ├── awards_honours.json             (20 questions)
│   ├── government_schemes.json         (30 questions)
│   └── miscellaneous.json              (20 questions)
│
└── computer/
    ├── full_forms.json                  (50 questions)
    ├── input_output_devices.json        (40 questions)
    ├── memory_types.json                (40 questions)
    ├── software_types.json              (35 questions)
    ├── networking_basics.json           (35 questions)
    ├── internet_browser_ecommerce.json  (30 questions)
    ├── father_history_computer.json     (20 questions)
    ├── computer_generations.json        (20 questions)
    ├── data_units.json                  (20 questions)
    ├── file_extensions.json             (20 questions)
    ├── malware_antivirus_firewall.json  (25 questions)
    └── binary_logic_gates.json          (25 questions)
```

---

## PART 2 — MARKING SCHEME

### 2.1 — Universal Marking Rules (Both Test Types)

```
Correct answer   →  +1 mark
Wrong answer     →   0 marks  (NO negative marking)
Unattempted      →   0 marks
```

### 2.2 — Full Mock Test Scoring

```
Total questions  →  100
Total marks      →  100
Passing marks    →  No official cutoff — percentile based
Time             →  120 minutes (7200 seconds)
Time per Q avg   →  72 seconds
```

**Section-wise marks breakdown:**

```
┌─────────────────────────┬───────────┬───────────┬──────────────┬──────────────┐
│ Section                 │ Questions │ Marks     │ Time (ideal) │ Mark/Q       │
├─────────────────────────┼───────────┼───────────┼──────────────┼──────────────┤
│ English Language        │    30     │    30     │   36 min     │     1        │
│ Reasoning (V+A)         │    30     │    30     │   36 min     │     1        │
│ General Knowledge       │    20     │    20     │   24 min     │     1        │
│ Computer Basics         │    20     │    20     │   24 min     │     1        │
├─────────────────────────┼───────────┼───────────┼──────────────┼──────────────┤
│ TOTAL                   │   100     │   100     │  120 min     │     —        │
└─────────────────────────┴───────────┴───────────┴──────────────┴──────────────┘
```

### 2.3 — Subject-Wise Mock Test Scoring

```
Total questions  →  50
Total marks      →  50
Time             →  30 minutes (1800 seconds)
Time per Q avg   →  36 seconds
```

**Section A and Section B breakdown:**

```
┌───────────────┬───────────┬───────────┬──────────────┐
│ Section       │ Questions │ Marks     │ Time (ideal) │
├───────────────┼───────────┼───────────┼──────────────┤
│ Section A     │    25     │    25     │   15 min     │
│ Section B     │    25     │    25     │   15 min     │
├───────────────┼───────────┼───────────┼──────────────┤
│ TOTAL         │    50     │    50     │   30 min     │
└───────────────┴───────────┴───────────┴──────────────┘
```

---

## PART 3 — FULL MOCK TEST — COMPLETE SPECIFICATION

### 3.1 — How Many Full Mocks Can Be Built

```
English:   540 questions ÷ 30 per mock = 18.0 mocks possible
Reasoning: 560 questions ÷ 30 per mock = 18.6 mocks possible
GK:        360 questions ÷ 20 per mock = 18.0 mocks possible
Computer:  360 questions ÷ 20 per mock = 18.0 mocks possible

Bottleneck subject = English and GK at 18 mocks
TOTAL FULL MOCKS AVAILABLE = 18 (with zero question repeats)
PLANNED MOCKS = 15 (keeps 3 mocks worth as reserve/buffer)
```

### 3.2 — Question Distribution Per Full Mock

#### English — 30 Questions Per Mock

```
┌──────────────────────────────────┬───────────────┬─────────────┐
│ Topic                            │ Qs per Mock   │ Priority    │
├──────────────────────────────────┼───────────────┼─────────────┤
│ tenses                           │      4        │ must_do     │
│ active_passive_voice             │      3        │ must_do     │
│ modal_verbs                      │      2        │ must_do     │
│ reading_comprehension            │      5        │ must_do     │
│ synonyms_antonyms                │      3        │ high        │
│ articles                         │      2        │ high        │
│ conjunctions_connectives         │      2        │ high        │
│ direct_indirect_speech           │      2        │ high        │
│ sentence_types                   │      2        │ high        │
│ sentence_correction              │      2        │ high        │
│ fill_in_the_blanks               │      1        │ moderate    │
│ idioms_phrases                   │      1        │ moderate    │
│ para_jumbles                     │      1        │ moderate    │
├──────────────────────────────────┼───────────────┼─────────────┤
│ TOTAL                            │     30        │             │
└──────────────────────────────────┴───────────────┴─────────────┘

Note: cloze_test and one_word_substitution rotate in on alternating mocks.
Mocks 1,3,5,7,9,11,13,15 → include cloze_test (replace idioms_phrases)
Mocks 2,4,6,8,10,12,14   → include one_word_substitution (replace para_jumbles)
```

#### Reasoning — 30 Questions Per Mock

```
┌──────────────────────────────────┬───────────────┬─────────────┐
│ Topic                            │ Qs per Mock   │ Priority    │
├──────────────────────────────────┼───────────────┼─────────────┤
│ number_letter_series             │      4        │ must_do     │
│ coding_decoding                  │      4        │ must_do     │
│ data_interpretation              │      5        │ must_do     │
│ analogies                        │      3        │ must_do     │
│ averages_simplification          │      3        │ must_do     │
│ blood_relations                  │      3        │ must_do     │
│ seating_arrangement              │      3        │ high        │
│ syllogisms                       │      2        │ high        │
│ profit_loss                      │      2        │ high        │
│ percentages                      │      2        │ high        │
├──────────────────────────────────┼───────────────┼─────────────┤
│ Rotating (1 slot per mock):      │               │             │
│  direction_sense                 │      1        │ high        │
│  age_problems                    │      1        │ high        │
│  symbolic_inequalities           │      1        │ moderate    │
│  calendar_days                   │      1        │ moderate    │
├──────────────────────────────────┼───────────────┼─────────────┤
│ TOTAL                            │     30*       │             │
└──────────────────────────────────┴───────────────┴─────────────┘

*The rotating slot fills the 30th question:
Mocks 1,5,9,13    → direction_sense
Mocks 2,6,10,14   → age_problems
Mocks 3,7,11,15   → symbolic_inequalities
Mocks 4,8,12      → calendar_days
```

#### General Knowledge — 20 Questions Per Mock

```
┌──────────────────────────────────┬───────────────┬─────────────┐
│ Topic                            │ Qs per Mock   │ Priority    │
├──────────────────────────────────┼───────────────┼─────────────┤
│ current_affairs                  │      5        │ must_do     │
│ indian_polity_constitution       │      3        │ high        │
│ economy_business                 │      3        │ high        │
│ government_schemes               │      2        │ high        │
│ sports                           │      2        │ high        │
│ science_technology               │      2        │ high        │
│ awards_honours                   │      1        │ moderate    │
│ indian_history_freedom           │      1        │ moderate    │
│ geography_india_world            │      1        │ moderate    │
├──────────────────────────────────┼───────────────┼─────────────┤
│ TOTAL                            │     20        │             │
└──────────────────────────────────┴───────────────┴─────────────┘

Note: miscellaneous rotates in on mocks 5, 10, 15 (replacing awards_honours)
```

#### Computer Basics — 20 Questions Per Mock

```
┌──────────────────────────────────┬───────────────┬─────────────┐
│ Topic                            │ Qs per Mock   │ Priority    │
├──────────────────────────────────┼───────────────┼─────────────┤
│ full_forms                       │      4        │ must_do     │
│ input_output_devices             │      3        │ must_do     │
│ memory_types                     │      3        │ must_do     │
│ software_types                   │      2        │ must_do     │
│ networking_basics                │      2        │ must_do     │
│ internet_browser_ecommerce       │      2        │ high        │
│ malware_antivirus_firewall       │      2        │ high        │
│ binary_logic_gates               │      1        │ moderate    │
│ data_units                       │      1        │ high        │
├──────────────────────────────────┼───────────────┼─────────────┤
│ TOTAL                            │     20        │             │
└──────────────────────────────────┴───────────────┴─────────────┘

Note: father_history_computer, computer_generations, file_extensions
rotate in on mocks 4, 8, 12 (one each, replacing binary_logic_gates slot)
```

---

### 3.3 — Difficulty Distribution Per Full Mock

Every full mock must maintain this distribution:

```
┌────────────────┬───────────┬──────────────────────────────────────────┐
│ Difficulty     │ Questions │ How distributed across sections          │
├────────────────┼───────────┼──────────────────────────────────────────┤
│ Easy           │    60     │ English:18  Reasoning:18  GK:12  CMP:12  │
│ Medium         │    30     │ English: 9  Reasoning: 9  GK: 6  CMP: 6  │
│ Hard           │    10     │ English: 3  Reasoning: 3  GK: 2  CMP: 2  │
├────────────────┼───────────┼──────────────────────────────────────────┤
│ TOTAL          │   100     │                                          │
└────────────────┴───────────┴──────────────────────────────────────────┘
```

**Selection rule:** When pulling questions from a topic for a mock, apply this filter:
```
Pull (60% of that topic's allocation) from difficulty = "easy"
Pull (30% of that topic's allocation) from difficulty = "medium"
Pull (10% of that topic's allocation) from difficulty = "hard"

Example — tenses gets 4 Qs per mock:
  2 easy (50% → nearest to 60%)
  1 medium (25% → nearest to 30%)
  1 hard (25% → nearest to 10%, rotates across mocks)

Rounding rule: always round easy UP, hard DOWN when rounding fractions.
```

---

### 3.4 — The Pre-Planned 15 Full Mocks

Each mock is pre-assigned a question slot range per topic.
The engine uses these ranges to pull without overlap.

**Algorithm for pre-planning:**

```
For each topic:
  Sort all questions in that topic by difficulty (easy first, medium next, hard last)
  Subdivide into 15 equal slots (or as equal as possible given question counts)
  Each mock gets one slot — guaranteed unique, no repeats

Formula for slot size:
  slot_size = floor(topic_total / 15)
  remainder = topic_total mod 15
  Mocks 1 through remainder get (slot_size + 1) questions from this topic
  Mocks (remainder+1) through 15 get (slot_size) questions from this topic
```

**Pre-planned slot sizes per topic:**

```
ENGLISH:
Topic                          Total  Slot(M1-M15)  Per Mock
tenses                           60      4 per mock       4
active_passive_voice             50      3-4 per mock    3*
modal_verbs                      40      2-3 per mock    2*
reading_comprehension            60      4 per mock       4**
synonyms_antonyms                50      3-4 per mock    3*
articles                         30      2 per mock       2
conjunctions_connectives         30      2 per mock       2
direct_indirect_speech           40      2-3 per mock    2*
sentence_types                   30      2 per mock       2
sentence_correction              40      2-3 per mock    2*
fill_in_the_blanks               30      2 per mock       2
idioms_phrases                   30      2 per mock       2
para_jumbles                     20      1-2 per mock    1*
one_word_substitution            20      1-2 per mock    1*
cloze_test                       40      2-3 per mock    2*

*These topics have remainder — see remainder distribution table below
**RC gives 4 Qs per mock but RC questions are passage-linked (see set-based rule)

REASONING:
number_letter_series             60      4 per mock       4
coding_decoding                  60      4 per mock       4
blood_relations                  40      2-3 per mock    2*
data_interpretation              60      4 per mock       4**
analogies                        50      3-4 per mock    3*
seating_arrangement              40      2-3 per mock    2*
syllogisms                       40      2-3 per mock    2*
direction_sense                  20      1-2 per mock    1*
age_problems                     30      2 per mock       2
averages_simplification          40      2-3 per mock    2*
profit_loss                      40      2-3 per mock    2*
percentages                      40      2-3 per mock    2*
symbolic_inequalities            20      1-2 per mock    1*
calendar_days                    20      1-2 per mock    1*

**DI gives 5 Qs per mock but DI questions are set-linked (see set-based rule)

GENERAL KNOWLEDGE:
current_affairs                  80      5-6 per mock    5*
indian_polity_constitution       50      3-4 per mock    3*
economy_business                 40      2-3 per mock    2*
sports                           35      2-3 per mock    2*
science_technology               35      2-3 per mock    2*
indian_history_freedom           25      1-2 per mock    1*
geography_india_world            25      1-2 per mock    1*
awards_honours                   20      1-2 per mock    1*
government_schemes               30      2 per mock       2
miscellaneous                    20      1-2 per mock    1*

COMPUTER:
full_forms                       50      3-4 per mock    3*
input_output_devices             40      2-3 per mock    2*
memory_types                     40      2-3 per mock    2*
software_types                   35      2-3 per mock    2*
networking_basics                35      2-3 per mock    2*
internet_browser_ecommerce       30      2 per mock       2
father_history_computer          20      1-2 per mock    1*
computer_generations             20      1-2 per mock    1*
data_units                       20      1-2 per mock    1*
file_extensions                  20      1-2 per mock    1*
malware_antivirus_firewall       25      1-2 per mock    1*
binary_logic_gates               25      1-2 per mock    1*
```

---

### 3.5 — Set-Based Question Rule

Set-based questions (RC passages, DI sets, Seating Arrangement sets) cannot be split across mocks. An entire set travels together.

**Reading Comprehension:**
```
6 passages × 10 questions each = 60 questions
Each mock gets questions from exactly 1 passage (picks 5 out of 10 questions from that passage)
Passage assignment per mock:
  Mock 1  → RC-01 (Q1–Q5)
  Mock 2  → RC-01 (Q6–Q10)
  Mock 3  → RC-02 (Q1–Q5)
  Mock 4  → RC-02 (Q6–Q10)
  Mock 5  → RC-03 (Q1–Q5)
  Mock 6  → RC-03 (Q6–Q10)
  Mock 7  → RC-04 (Q1–Q5)
  Mock 8  → RC-04 (Q6–Q10)
  Mock 9  → RC-05 (Q1–Q5)
  Mock 10 → RC-05 (Q6–Q10)
  Mock 11 → RC-06 (Q1–Q5)
  Mock 12 → RC-06 (Q6–Q10)
  Mock 13 → RC-01 (Q1–Q5) ← cycles back, 15 mocks > 12 half-passages
  Mock 14 → RC-02 (Q1–Q5)
  Mock 15 → RC-03 (Q1–Q5)
```

**Data Interpretation:**
```
12 sets × 5 questions each = 60 questions
Each mock gets exactly 1 complete DI set (all 5 questions from that set)
DI assignment per mock:
  Mock 1  → DI-01 (all 5 Qs)
  Mock 2  → DI-02 (all 5 Qs)
  Mock 3  → DI-03 (all 5 Qs)
  Mock 4  → DI-04 (all 5 Qs)
  Mock 5  → DI-05 (all 5 Qs)
  Mock 6  → DI-06 (all 5 Qs)
  Mock 7  → DI-07 (all 5 Qs)
  Mock 8  → DI-08 (all 5 Qs)
  Mock 9  → DI-09 (all 5 Qs)
  Mock 10 → DI-10 (all 5 Qs)
  Mock 11 → DI-11 (all 5 Qs)
  Mock 12 → DI-12 (all 5 Qs)
  Mock 13 → DI-01 (all 5 Qs) ← cycles back
  Mock 14 → DI-03 (all 5 Qs)
  Mock 15 → DI-05 (all 5 Qs)
```

**Seating Arrangement:**
```
8 sets × 5 questions each = 40 questions
Each mock gets exactly 1 complete SA set (all 5 questions from that set) when SA appears.
SA appears in all 15 mocks (3 questions per mock normally, but full sets = 5 Qs)
→ Therefore SA contributes 5 questions on mocks where it rotates in:
  Mocks 1,3,5,7,9,11,13,15 → SA appears (alternating), pulls full set of 5 Qs
  Mocks where SA appears → reduce other reasoning topics by 2 to compensate

SA mock assignment:
  Mock 1  → SA-01   Mock 3  → SA-02   Mock 5  → SA-03   Mock 7  → SA-04
  Mock 9  → SA-05   Mock 11 → SA-06   Mock 13 → SA-07   Mock 15 → SA-08
```

---

### 3.6 — Question Order Within a Mock

```
Full mock question order:
  Q1  – Q30   → English Language (in this internal order: easy → medium → hard)
  Q31 – Q60   → Reasoning (same internal order)
  Q61 – Q80   → General Knowledge (same internal order)
  Q81 – Q100  → Computer Basics (same internal order)
```

**Internal section ordering:**
```
Within each section, questions are ordered:
  First:   all easy questions (shuffled randomly within easy)
  Second:  all medium questions (shuffled randomly within medium)
  Last:    all hard questions (shuffled randomly within hard)

This mirrors how the real CET exam presents questions —
students gain confidence through early easy questions.
```

---

### 3.7 — Mock Test Object Structure

```json
{
  "mock_id": "FULL-MOCK-01",
  "mock_type": "full_mock",
  "mock_number": 1,
  "total_questions": 100,
  "total_marks": 100,
  "duration_seconds": 7200,
  "negative_marking": false,
  "marks_per_correct": 1,
  "marks_per_wrong": 0,
  "sections": [
    {
      "section_id": "S1",
      "subject": "english",
      "question_numbers": "1-30",
      "total_questions": 30,
      "total_marks": 30,
      "questions": ["ENG-TENSE-001", "ENG-TENSE-005", "..."]
    },
    {
      "section_id": "S2",
      "subject": "reasoning",
      "question_numbers": "31-60",
      "total_questions": 30,
      "total_marks": 30,
      "questions": ["RSN-SERIES-001", "RSN-CODE-003", "..."]
    },
    {
      "section_id": "S3",
      "subject": "general_knowledge",
      "question_numbers": "61-80",
      "total_questions": 20,
      "total_marks": 20,
      "questions": ["GK-CURR-001", "GK-POLITY-004", "..."]
    },
    {
      "section_id": "S4",
      "subject": "computer",
      "question_numbers": "81-100",
      "total_questions": 20,
      "total_marks": 20,
      "questions": ["CMP-FF-001", "CMP-IOD-003", "..."]
    }
  ],
  "status": "not_started",
  "created_at": "[timestamp]"
}
```

---

### 3.8 — The 15 Pre-Planned Full Mocks — Master Table

```
┌──────┬─────────────────────────────────────────────────────────────────────────────┐
│ Mock │ Special Features                                                            │
├──────┼─────────────────────────────────────────────────────────────────────────────┤
│  1   │ SA-01 set, DI-01 set, RC-01(Q1-5), Direction sense slot, Cloze rotates in  │
│  2   │ No SA, DI-02 set, RC-01(Q6-10), Age problems slot, OWS rotates in          │
│  3   │ SA-02 set, DI-03 set, RC-02(Q1-5), Symbolic inequalities slot, Cloze in    │
│  4   │ No SA, DI-04 set, RC-02(Q6-10), Calendar days slot, OWS in                 │
│  5   │ SA-03 set, DI-05 set, RC-03(Q1-5), Direction sense slot, Cloze in          │
│  6   │ No SA, DI-06 set, RC-03(Q6-10), Age problems slot, OWS in                  │
│  7   │ SA-04 set, DI-07 set, RC-04(Q1-5), Symbolic inequalities slot, Cloze in    │
│  8   │ No SA, DI-08 set, RC-04(Q6-10), Calendar days slot, OWS in                 │
│  9   │ SA-05 set, DI-09 set, RC-05(Q1-5), Direction sense slot, Cloze in          │
│  10  │ No SA, DI-10 set, RC-05(Q6-10), Age problems slot, OWS in                  │
│  11  │ SA-06 set, DI-11 set, RC-06(Q1-5), Symbolic inequalities slot, Cloze in    │
│  12  │ No SA, DI-12 set, RC-06(Q6-10), Calendar days slot, OWS in                 │
│  13  │ SA-07 set, DI-01 set, RC-01(Q1-5) cycle, Direction sense slot, Cloze in    │
│  14  │ No SA, DI-03 set, RC-02(Q1-5) cycle, Age problems slot, OWS in             │
│  15  │ SA-08 set, DI-05 set, RC-03(Q1-5) cycle, Symbolic inequalities slot, Cloze │
└──────┴─────────────────────────────────────────────────────────────────────────────┘
```

---

## PART 4 — SUBJECT-WISE MOCK TEST — COMPLETE SPECIFICATION

### 4.1 — Purpose

Subject-wise mocks are for **targeted reinforcement** before the entrance test.
A student who is weak in Reasoning takes a Reasoning subject-wise mock.
These are shorter, faster, and focused — not a full simulation.

```
Time:       30 minutes (1800 seconds)
Questions:  50
Marks:      50
Sections:   2 (Section A and Section B)
Structure:  25 questions per section
```

### 4.2 — Section A vs Section B — Definition

```
SECTION A — CONCEPT REINFORCEMENT
  Purpose:   Test one or two specific topics deeply
  Style:     Topic-focused, subtopic-varied
  Questions: 25
  Difficulty: 70% easy, 25% medium, 5% hard
  Ideal for: Students who just finished studying a topic

SECTION B — SPEED & APPLICATION
  Purpose:   Mixed questions from across the full subject
  Style:     Broad coverage, faster pace
  Questions: 25
  Difficulty: 50% easy, 35% medium, 15% hard
  Ideal for: Speed practice and recall under time pressure
```

### 4.3 — How Many Subject-Wise Mocks Per Subject

```
English   (540 questions ÷ 50 per mock) = 10 Subject-Wise Mocks
Reasoning (560 questions ÷ 50 per mock) = 11 Subject-Wise Mocks
GK        (360 questions ÷ 50 per mock) =  7 Subject-Wise Mocks
Computer  (360 questions ÷ 50 per mock) =  7 Subject-Wise Mocks

TOTAL SUBJECT-WISE MOCKS = 35
```

### 4.4 — Subject-Wise Mock Structure Per Subject

#### English — 10 Subject-Wise Mocks

```
┌──────┬────────────────────────────────────────────────────────────────────────┐
│ SWM  │ Section A Focus (25 Qs)          │ Section B Topics (25 Qs, mixed)    │
├──────┼───────────────────────────────────┼────────────────────────────────────┤
│ E-01 │ tenses (all 12 forms)             │ Mixed: synonyms, articles, FIB,    │
│      │                                   │ sentence correction, idioms        │
├──────┼───────────────────────────────────┼────────────────────────────────────┤
│ E-02 │ active_passive_voice              │ Mixed: tenses, modal verbs,        │
│      │                                   │ direct speech, conjunctions        │
├──────┼───────────────────────────────────┼────────────────────────────────────┤
│ E-03 │ modal_verbs + conjunctions        │ Mixed: articles, sentence types,   │
│      │                                   │ fill blanks, synonyms              │
├──────┼───────────────────────────────────┼────────────────────────────────────┤
│ E-04 │ reading_comprehension (2 passages)│ Mixed: voice, tenses, idioms,      │
│      │                                   │ OWS, sentence correction           │
├──────┼───────────────────────────────────┼────────────────────────────────────┤
│ E-05 │ synonyms_antonyms + vocabulary    │ Mixed: cloze, para jumbles,        │
│      │                                   │ tenses, modal verbs, articles      │
├──────┼───────────────────────────────────┼────────────────────────────────────┤
│ E-06 │ sentence_correction + error det.  │ Mixed: voice, speech, conjunctions,│
│      │                                   │ sentence types, synonyms           │
├──────┼───────────────────────────────────┼────────────────────────────────────┤
│ E-07 │ direct_indirect_speech            │ Mixed: tenses, voice, modal verbs, │
│      │                                   │ articles, fill blanks              │
├──────┼───────────────────────────────────┼────────────────────────────────────┤
│ E-08 │ idioms + OWS + para jumbles       │ Mixed: RC passage (1), cloze,      │
│      │                                   │ synonyms, sentence correction      │
├──────┼───────────────────────────────────┼────────────────────────────────────┤
│ E-09 │ articles + sentence types         │ Mixed: tenses, coding, modal,      │
│      │                                   │ conjunctions, fill blanks          │
├──────┼───────────────────────────────────┼────────────────────────────────────┤
│ E-10 │ cloze_test (full 2 passages)      │ Full mixed English — all 15 topics │
│      │ + fill_in_the_blanks              │ represented (revision mock)        │
└──────┴───────────────────────────────────┴────────────────────────────────────┘
```

#### Reasoning — 11 Subject-Wise Mocks

```
┌──────┬───────────────────────────────────┬────────────────────────────────────┐
│ SWM  │ Section A Focus (25 Qs)           │ Section B Topics (25 Qs, mixed)    │
├──────┼───────────────────────────────────┼────────────────────────────────────┤
│ R-01 │ number_letter_series              │ Mixed: coding, analogies,          │
│      │                                   │ blood relations, direction          │
├──────┼───────────────────────────────────┼────────────────────────────────────┤
│ R-02 │ coding_decoding                   │ Mixed: series, analogies,          │
│      │                                   │ syllogisms, symbolic inequalities  │
├──────┼───────────────────────────────────┼────────────────────────────────────┤
│ R-03 │ blood_relations + direction sense │ Mixed: series, coding,             │
│      │                                   │ age problems, calendar days        │
├──────┼───────────────────────────────────┼────────────────────────────────────┤
│ R-04 │ data_interpretation (3 full sets) │ Mixed: averages, profit loss,      │
│      │                                   │ percentages, simplification        │
├──────┼───────────────────────────────────┼────────────────────────────────────┤
│ R-05 │ analogies                         │ Mixed: syllogisms, blood rel,      │
│      │                                   │ series, symbolic inequalities      │
├──────┼───────────────────────────────────┼────────────────────────────────────┤
│ R-06 │ seating_arrangement (2 full sets) │ Mixed: DI, blood rel, analogies,   │
│      │                                   │ coding, series                     │
├──────┼───────────────────────────────────┼────────────────────────────────────┤
│ R-07 │ syllogisms + symbolic inequalities│ Mixed: direction, age, calendar,   │
│      │                                   │ coding, analogies                  │
├──────┼───────────────────────────────────┼────────────────────────────────────┤
│ R-08 │ averages_simplification           │ Mixed: profit loss, percentages,   │
│      │                                   │ age problems, DI                   │
├──────┼───────────────────────────────────┼────────────────────────────────────┤
│ R-09 │ profit_loss + percentages         │ Mixed: averages, DI, age,          │
│      │                                   │ series, analogies                  │
├──────┼───────────────────────────────────┼────────────────────────────────────┤
│ R-10 │ age_problems + calendar_days      │ Mixed: direction, blood rel,       │
│      │                                   │ syllogisms, symbolic inequalities  │
├──────┼───────────────────────────────────┼────────────────────────────────────┤
│ R-11 │ Full Reasoning Revision           │ All 14 topics represented          │
│      │ (all MUST DO topics, 2 Qs each)   │ (speed mock — 36 sec per Q)        │
└──────┴───────────────────────────────────┴────────────────────────────────────┘
```

#### General Knowledge — 7 Subject-Wise Mocks

```
┌──────┬───────────────────────────────────┬────────────────────────────────────┐
│ SWM  │ Section A Focus (25 Qs)           │ Section B Topics (25 Qs, mixed)    │
├──────┼───────────────────────────────────┼────────────────────────────────────┤
│ G-01 │ current_affairs (Jan 2024-mid 25) │ Mixed: polity, economy, schemes    │
├──────┼───────────────────────────────────┼────────────────────────────────────┤
│ G-02 │ current_affairs (mid 25-Apr 26)   │ Mixed: sports, science, awards     │
├──────┼───────────────────────────────────┼────────────────────────────────────┤
│ G-03 │ indian_polity_constitution        │ Mixed: current affairs, history,   │
│      │                                   │ economy, government schemes        │
├──────┼───────────────────────────────────┼────────────────────────────────────┤
│ G-04 │ economy_business + govt schemes   │ Mixed: polity, sports, science,    │
│      │                                   │ geography, current affairs         │
├──────┼───────────────────────────────────┼────────────────────────────────────┤
│ G-05 │ sports + science_technology       │ Mixed: awards, history, current    │
│      │                                   │ affairs, geography, polity         │
├──────┼───────────────────────────────────┼────────────────────────────────────┤
│ G-06 │ history + geography + awards      │ Mixed: economy, schemes, current   │
│      │                                   │ affairs, sports, science           │
├──────┼───────────────────────────────────┼────────────────────────────────────┤
│ G-07 │ Full GK Revision                  │ All 10 topics represented          │
│      │ (all HIGH topics, 3 Qs each)      │ (pre-exam day revision mock)       │
└──────┴───────────────────────────────────┴────────────────────────────────────┘
```

#### Computer Basics — 7 Subject-Wise Mocks

```
┌──────┬───────────────────────────────────┬────────────────────────────────────┐
│ SWM  │ Section A Focus (25 Qs)           │ Section B Topics (25 Qs, mixed)    │
├──────┼───────────────────────────────────┼────────────────────────────────────┤
│ C-01 │ full_forms (50 abbreviations)     │ Mixed: memory, software, I/O       │
├──────┼───────────────────────────────────┼────────────────────────────────────┤
│ C-02 │ input_output_devices              │ Mixed: full forms, networking,     │
│      │ + memory_types                    │ software, internet                 │
├──────┼───────────────────────────────────┼────────────────────────────────────┤
│ C-03 │ software_types + networking       │ Mixed: memory, I/O, full forms,    │
│      │                                   │ generations, history               │
├──────┼───────────────────────────────────┼────────────────────────────────────┤
│ C-04 │ internet + ecommerce + browser    │ Mixed: networking, full forms,     │
│      │                                   │ malware, data units                │
├──────┼───────────────────────────────────┼────────────────────────────────────┤
│ C-05 │ binary_logic_gates                │ Mixed: data units, file ext,       │
│      │ + data_units                      │ generations, history, malware      │
├──────┼───────────────────────────────────┼────────────────────────────────────┤
│ C-06 │ malware + generations + history   │ Mixed: full forms, memory,         │
│      │ + file_extensions                 │ software, networking, internet     │
├──────┼───────────────────────────────────┼────────────────────────────────────┤
│ C-07 │ Full Computer Revision            │ All 12 topics represented          │
│      │ (all MUST DO topics, 2-3 Qs each) │ (pre-exam day revision mock)       │
└──────┴───────────────────────────────────┴────────────────────────────────────┘
```

---

### 4.5 — Subject-Wise Mock Object Structure

```json
{
  "mock_id": "SWM-ENG-01",
  "mock_type": "subject_wise_mock",
  "mock_number": 1,
  "subject": "english",
  "total_questions": 50,
  "total_marks": 50,
  "duration_seconds": 1800,
  "negative_marking": false,
  "marks_per_correct": 1,
  "marks_per_wrong": 0,
  "sections": [
    {
      "section_id": "A",
      "section_name": "Section A — Concept Reinforcement",
      "focus_topics": ["tenses"],
      "question_numbers": "1-25",
      "total_questions": 25,
      "total_marks": 25,
      "difficulty_distribution": {
        "easy": 18,
        "medium": 6,
        "hard": 1
      },
      "questions": ["ENG-TENSE-001", "ENG-TENSE-002", "..."]
    },
    {
      "section_id": "B",
      "section_name": "Section B — Speed & Application",
      "focus_topics": ["synonyms_antonyms", "articles", "fill_in_the_blanks",
                       "sentence_correction", "idioms_phrases"],
      "question_numbers": "26-50",
      "total_questions": 25,
      "total_marks": 25,
      "difficulty_distribution": {
        "easy": 13,
        "medium": 9,
        "hard": 3
      },
      "questions": ["ENG-SYNANT-001", "ENG-ART-003", "..."]
    }
  ],
  "status": "not_started",
  "created_at": "[timestamp]"
}
```

---

## PART 5 — MOCK ATTEMPT ENGINE

### 5.1 — Attempt Session Object

When a student starts any mock, an attempt session is created:

```json
{
  "attempt_id": "ATT-[USER_ID]-[MOCK_ID]-[TIMESTAMP]",
  "user_id": "[USER_ID]",
  "mock_id": "FULL-MOCK-01",
  "mock_type": "full_mock",
  "started_at": "[ISO timestamp]",
  "duration_seconds": 7200,
  "time_remaining_seconds": 7200,
  "status": "in_progress",
  "current_question_index": 0,
  "responses": [],
  "section_times": {
    "english": null,
    "reasoning": null,
    "general_knowledge": null,
    "computer": null
  }
}
```

### 5.2 — Response Object Per Question

```json
{
  "question_id": "ENG-TENSE-001",
  "question_number": 1,
  "selected_option": "C",
  "is_correct": true,
  "is_attempted": true,
  "is_marked_review": false,
  "time_spent_seconds": 18,
  "marks_awarded": 1
}
```

### 5.3 — Timer Logic

```
Full Mock:
  Total time: 7200 seconds (120 minutes)
  Timer starts when student clicks "Start Mock"
  Timer runs continuously — cannot be paused
  At 0 seconds: auto-submit triggered immediately
  Warning alerts at: 60 min remaining, 30 min remaining, 10 min remaining, 5 min remaining

Subject-Wise Mock:
  Total time: 1800 seconds (30 minutes)
  Section A gets 900 seconds (15 min) — soft limit only (student can continue into B's time)
  Section B gets 900 seconds (15 min) — remaining time from total
  Warning alerts at: 15 min remaining, 5 min remaining, 2 min remaining
  At 0 seconds: auto-submit triggered immediately
```

### 5.4 — Question Navigation Rules

```
Navigation allowed:
  Student can move freely between all questions within a mock
  Can go back to any previously seen question
  Can skip questions and return

Review marking:
  Student can flag any question as "Mark for Review"
  Marked questions appear highlighted in the question palette
  Marked questions with an answer = answered but flagged
  Marked questions without an answer = unanswered and flagged

Question palette states (4 states):
  NOT VISITED    → grey     (not opened yet)
  ANSWERED       → green    (option selected)
  NOT ANSWERED   → red      (opened, no option selected)
  MARKED REVIEW  → purple   (flagged, with or without answer)
```

### 5.5 — Auto-Submit Logic

```
Trigger conditions (any one triggers auto-submit):
  1. Timer reaches 0 seconds
  2. Student clicks "Submit Mock" button

On auto-submit:
  1. Record submitted_at timestamp
  2. Lock all responses — no further changes
  3. Calculate score (see 5.6)
  4. Update mock_used[] on every question object used in this mock
  5. Generate result object
  6. Navigate to results screen
```

### 5.6 — Score Calculation Logic

```
For each question in responses[]:
  if is_attempted == true AND selected_option == question.answer:
    marks_awarded = 1
    correct_count++
  else if is_attempted == true AND selected_option != question.answer:
    marks_awarded = 0
    wrong_count++
  else:
    marks_awarded = 0
    skipped_count++

total_score = correct_count × 1
accuracy = (correct_count / total_attempted) × 100
time_taken = duration_seconds - time_remaining_seconds

Section scores calculated independently using same logic.
```

---

## PART 6 — RESULT & ANALYTICS OBJECT

### 6.1 — Result Object

```json
{
  "result_id": "RES-[ATTEMPT_ID]",
  "attempt_id": "ATT-[USER_ID]-[MOCK_ID]-[TIMESTAMP]",
  "mock_id": "FULL-MOCK-01",
  "mock_type": "full_mock",
  "user_id": "[USER_ID]",
  "submitted_at": "[ISO timestamp]",
  "time_taken_seconds": 6840,

  "overall": {
    "total_questions": 100,
    "attempted": 87,
    "correct": 71,
    "wrong": 16,
    "skipped": 13,
    "score": 71,
    "max_score": 100,
    "percentage": 71.0,
    "accuracy": 81.6
  },

  "by_subject": {
    "english": {
      "total": 30, "attempted": 28, "correct": 22,
      "wrong": 6, "skipped": 2, "score": 22, "percentage": 73.3
    },
    "reasoning": {
      "total": 30, "attempted": 25, "correct": 19,
      "wrong": 6, "skipped": 5, "score": 19, "percentage": 63.3
    },
    "general_knowledge": {
      "total": 20, "attempted": 20, "correct": 17,
      "wrong": 3, "skipped": 0, "score": 17, "percentage": 85.0
    },
    "computer": {
      "total": 20, "attempted": 14, "correct": 13,
      "wrong": 1, "skipped": 6, "score": 13, "percentage": 65.0
    }
  },

  "by_difficulty": {
    "easy":   { "total": 60, "correct": 52, "wrong": 5,  "skipped": 3 },
    "medium": { "total": 30, "correct": 16, "wrong": 8,  "skipped": 6 },
    "hard":   { "total": 10, "correct": 3,  "wrong": 3,  "skipped": 4 }
  },

  "by_topic": {
    "tenses":              { "total": 4, "correct": 3, "wrong": 1, "skipped": 0 },
    "active_passive_voice": { "total": 3, "correct": 2, "wrong": 1, "skipped": 0 }
  },

  "weak_topics": ["reasoning.seating_arrangement", "english.para_jumbles"],
  "strong_topics": ["general_knowledge.current_affairs", "computer.full_forms"],
  "recommended_swm": ["SWM-RSN-06", "SWM-ENG-08"]
}
```

### 6.2 — Weak Topic Detection Logic

```
After every full mock attempt:
  For each topic where: (correct / total) < 0.50
    → Add to weak_topics[]
    → Map to corresponding Subject-Wise Mock
    → Add that SWM to recommended_swm[]

Recommendation mapping:
  weak topic: tenses              → recommend: SWM-ENG-01
  weak topic: active_passive      → recommend: SWM-ENG-02
  weak topic: seating_arrangement → recommend: SWM-RSN-06
  weak topic: data_interpretation → recommend: SWM-RSN-04
  weak topic: current_affairs     → recommend: SWM-GK-01 or SWM-GK-02
  weak topic: full_forms          → recommend: SWM-CMP-01
  [and so on for all 51 topics]
```

---

## PART 7 — MOCK_USED FIELD UPDATE LOGIC

This is critical. After every completed attempt, the engine must update the `mock_used[]` field on every question that was used.

```
Algorithm:
  On submit:
    For each question_id in attempt.responses[]:
      Load the question object from the JSON file
      Append current mock_id to question.mock_used[]
      Save the updated question object back to file

  Example:
    Before: "mock_used": []
    After mock 1: "mock_used": ["FULL-MOCK-01"]
    After SWM: "mock_used": ["FULL-MOCK-01", "SWM-ENG-01"]

  Question eligibility check (run before building any mock):
    A question is ELIGIBLE for a mock if:
      mock_id NOT in question.mock_used[]
    A question is INELIGIBLE if:
      mock_id already in question.mock_used[]

  HARD RULE: A question can never appear in the same mock twice.
  A question CAN appear in different mock types (full mock and SWM are different).
```

---

## PART 8 — COMPLETE MOCK INVENTORY

### Total Mocks Available

```
┌──────────────────────────┬────────┬────────────────────────────────────────────┐
│ Mock Type                │ Count  │ Details                                    │
├──────────────────────────┼────────┼────────────────────────────────────────────┤
│ Full Mock Tests          │   15   │ 100 Qs, 120 min, all 4 subjects           │
├──────────────────────────┼────────┼────────────────────────────────────────────┤
│ Subject-Wise — English   │   10   │ 50 Qs, 30 min, English only               │
│ Subject-Wise — Reasoning │   11   │ 50 Qs, 30 min, Reasoning only             │
│ Subject-Wise — GK        │    7   │ 50 Qs, 30 min, GK only                    │
│ Subject-Wise — Computer  │    7   │ 50 Qs, 30 min, Computer only              │
├──────────────────────────┼────────┼────────────────────────────────────────────┤
│ TOTAL MOCKS              │   50   │                                            │
└──────────────────────────┴────────┴────────────────────────────────────────────┘
```

### Total Test Time Available to Student

```
Full mocks:    15 × 120 min = 1,800 minutes = 30 hours
Subject mocks: 35 ×  30 min = 1,050 minutes = 17.5 hours
─────────────────────────────────────────────────────
TOTAL PRACTICE TIME:          2,850 minutes = 47.5 hours of exam practice
```

---

## PART 9 — MOCK RELEASE SCHEDULE (RECOMMENDED)

Release mocks progressively — do not give access to all 50 at once.

```
Week 1 (Learning Phase):
  Unlock: SWM-ENG-01, SWM-ENG-02, SWM-RSN-01, SWM-RSN-02, SWM-CMP-01, SWM-GK-01
  Purpose: Learn topics one at a time. No full mocks yet.

Week 2 (Topic Completion Phase):
  Unlock: All remaining Subject-Wise Mocks (SWM)
  Unlock: Full Mock 1 and Full Mock 2
  Purpose: Complete topic coverage. First full simulation experience.

Week 3 (Mock Marathon Phase):
  Unlock: Full Mocks 3–10
  Purpose: Build stamina and speed. Identify weak topics.

Week 4 (Pre-Exam Phase — Final Week):
  Unlock: Full Mocks 11–15
  Unlock: All revision SWMs (E-10, R-11, G-07, C-07)
  Purpose: Peak performance. Pure exam simulation.

Exam Day (Day Before):
  Recommend: SWM-GK-07, SWM-CMP-07 only (light revision, 1 hour total)
  Do NOT recommend: full mocks the day before the exam
```

---

## PART 10 — BACKEND API ENDPOINTS REQUIRED

```
GET  /mocks/full                    → list all 15 full mocks with status
GET  /mocks/subject/:subject        → list all SWMs for a subject
GET  /mocks/:mock_id                → get full mock object with questions
POST /mocks/:mock_id/start          → create attempt session, return attempt_id
PUT  /attempts/:attempt_id/response → save single question response
PUT  /attempts/:attempt_id/submit   → submit mock, trigger scoring, update mock_used
GET  /attempts/:attempt_id/result   → get result object
GET  /users/:user_id/history        → all past attempts with scores
GET  /users/:user_id/analytics      → aggregated weak topics and recommendations
GET  /questions/:subject/available  → questions not yet used in any mock
```

---

*End of Backend Logic Instructions*
*Full Mocks: 15 | Subject-Wise Mocks: 35 | Total Mocks: 50*
*Total Questions: 1,820 | Total Practice Time: 47.5 hours*
