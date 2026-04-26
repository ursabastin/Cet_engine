# CET Question Database — Master Generation Instructions
### MAH-BHMCT / BCA / BBA / BMS / BBM CET 2026
### Version 2.0 — STRICT ENFORCEMENT EDITION

---

> ## ⛔ READ THIS BEFORE ANYTHING ELSE
>
> This document is the **single source of truth** for every question generation session.
> Every rule in this document is **mandatory and non-negotiable**.
> If any rule conflicts with what seems logical in the moment — **this document wins**.
> There are no exceptions. There is no flexibility. There is no interpretation.
> A session that does not follow every rule in this document has **failed** and must restart.

---

## PART 1 — THE LOCKED TOPIC PLAN

### 1.1 — What "Locked" Means

The topic plan below is **permanently fixed**. It cannot be changed during generation.

**HARD RULE 1 — NO NEW TOPICS**
You are **strictly forbidden** from creating any topic that does not appear in this list.
If you think a topic is missing, you are wrong. Do not add it. Do not suggest it. Do not create a file for it.
The plan has 51 topics. The output will have exactly 51 topic files. Not 52. Not 50. Exactly 51.

**HARD RULE 2 — NO SKIPPING TOPICS**
Every single topic in this list must be generated. You cannot skip a topic because it seems redundant, similar to another, or difficult to write. Every topic gets its own file. Every topic gets its exact question count.

**HARD RULE 3 — NO MERGING TOPICS**
Two topics cannot be merged into one file. `averages_simplification.json` and `profit_loss.json` are two separate files. `synonyms_antonyms.json` and `fill_in_the_blanks.json` are two separate files. Every topic in this list = one file = its own question count.

---

### 1.2 — The 51 Topic Master List

#### SUBJECT 1 — ENGLISH — 15 Topics — 540 Questions Total

| Topic Code | File Name | Questions |
|---|---|---|
| ENG-01 | `tenses.json` | 60 |
| ENG-02 | `active_passive_voice.json` | 50 |
| ENG-03 | `modal_verbs.json` | 40 |
| ENG-04 | `reading_comprehension.json` | 60 |
| ENG-05 | `synonyms_antonyms.json` | 50 |
| ENG-06 | `articles.json` | 30 |
| ENG-07 | `conjunctions_connectives.json` | 30 |
| ENG-08 | `direct_indirect_speech.json` | 40 |
| ENG-09 | `sentence_types.json` | 30 |
| ENG-10 | `idioms_phrases.json` | 30 |
| ENG-11 | `fill_in_the_blanks.json` | 30 |
| ENG-12 | `sentence_correction.json` | 40 |
| ENG-13 | `para_jumbles.json` | 20 |
| ENG-14 | `one_word_substitution.json` | 20 |
| ENG-15 | `cloze_test.json` | 40 |
| | **ENGLISH TOTAL** | **540** |

#### SUBJECT 2 — REASONING — 14 Topics — 540 Questions Total

| Topic Code | File Name | Questions |
|---|---|---|
| RSN-01 | `number_letter_series.json` | 60 |
| RSN-02 | `coding_decoding.json` | 60 |
| RSN-03 | `blood_relations.json` | 40 |
| RSN-04 | `data_interpretation.json` | 60 |
| RSN-05 | `analogies.json` | 50 |
| RSN-06 | `seating_arrangement.json` | 40 |
| RSN-07 | `syllogisms.json` | 40 |
| RSN-08 | `direction_sense.json` | 20 |
| RSN-09 | `age_problems.json` | 30 |
| RSN-10 | `averages_simplification.json` | 40 |
| RSN-11 | `profit_loss.json` | 40 |
| RSN-12 | `percentages.json` | 40 |
| RSN-13 | `symbolic_inequalities.json` | 20 |
| RSN-14 | `calendar_days.json` | 20 |
| | **REASONING TOTAL** | **560** |

#### SUBJECT 3 — GENERAL KNOWLEDGE — 10 Topics — 360 Questions Total

| Topic Code | File Name | Questions |
|---|---|---|
| GK-01 | `current_affairs.json` | 80 |
| GK-02 | `indian_polity_constitution.json` | 50 |
| GK-03 | `economy_business.json` | 40 |
| GK-04 | `sports.json` | 35 |
| GK-05 | `science_technology.json` | 35 |
| GK-06 | `indian_history_freedom.json` | 25 |
| GK-07 | `geography_india_world.json` | 25 |
| GK-08 | `awards_honours.json` | 20 |
| GK-09 | `government_schemes.json` | 30 |
| GK-10 | `miscellaneous.json` | 20 |
| | **GK TOTAL** | **360** |

#### SUBJECT 4 — COMPUTER BASICS — 12 Topics — 360 Questions Total

| Topic Code | File Name | Questions |
|---|---|---|
| CMP-01 | `full_forms.json` | 50 |
| CMP-02 | `input_output_devices.json` | 40 |
| CMP-03 | `memory_types.json` | 40 |
| CMP-04 | `software_types.json` | 35 |
| CMP-05 | `networking_basics.json` | 35 |
| CMP-06 | `internet_browser_ecommerce.json` | 30 |
| CMP-07 | `father_history_computer.json` | 20 |
| CMP-08 | `computer_generations.json` | 20 |
| CMP-09 | `data_units.json` | 20 |
| CMP-10 | `file_extensions.json` | 20 |
| CMP-11 | `malware_antivirus_firewall.json` | 25 |
| CMP-12 | `binary_logic_gates.json` | 25 |
| | **COMPUTER TOTAL** | **360** |

---

### 1.3 — Grand Total Verification

| Subject | Topics | Questions |
|---|---|---|
| English | 15 | 540 |
| Reasoning | 14 | 560 |
| General Knowledge | 10 | 360 |
| Computer Basics | 12 | 360 |
| **GRAND TOTAL** | **51** | **1,820** |

**This number — 1,820 — is the only acceptable final count.**
If the final count is 1,819 or 1,821 — something went wrong. Find it and fix it.

---

## PART 2 — THE SESSION PLAN

### 2.1 — What a Session Is

A session is a **single generation run** that produces question files.

**HARD RULE 4 — EXACTLY 5 TOPICS PER SESSION**
Every session covers exactly 5 topics from the same subject.
Not 4. Not 6. Not "5 topics but I'll add one more because it fits."
Exactly 5 topics. The only exception is the final session of a subject
if that subject has fewer than 5 remaining topics.

**HARD RULE 5 — ONE SUBJECT PER SESSION**
A session never mixes topics from two different subjects.
Session 1 is English only. Session 4 is Reasoning only.
You cannot do 3 English topics and 2 Reasoning topics in one session.

**HARD RULE 6 — SESSIONS ARE SEQUENTIAL**
You cannot do Session 3 before Session 2 is complete.
Topics within a subject are processed in numeric order — ENG-01 before ENG-02.
No skipping ahead. No reordering.

---

### 2.2 — The 11 Session Plan — Locked and Final

```
┌─────────┬─────────────────┬──────────────────────────────────────────────────────────────┬───────────┐
│ Session │ Subject         │ Topics (Exact)                                               │ Total Qs  │
├─────────┼─────────────────┼──────────────────────────────────────────────────────────────┼───────────┤
│    1    │ English         │ ENG-01  ENG-02  ENG-03  ENG-04  ENG-05                      │    260    │
│    2    │ English         │ ENG-06  ENG-07  ENG-08  ENG-09  ENG-10                      │    170    │
│    3    │ English         │ ENG-11  ENG-12  ENG-13  ENG-14  ENG-15                      │    160    │
│    4    │ Reasoning       │ RSN-01  RSN-02  RSN-03  RSN-04  RSN-05                      │    270    │
│    5    │ Reasoning       │ RSN-06  RSN-07  RSN-08  RSN-09  RSN-10                      │    170    │
│    6    │ Reasoning       │ RSN-11  RSN-12  RSN-13  RSN-14                              │    140    │
│    7    │ GK              │ GK-01   GK-02   GK-03   GK-04   GK-05                       │    240    │
│    8    │ GK              │ GK-06   GK-07   GK-08   GK-09   GK-10                       │    120    │
│    9    │ Computer        │ CMP-01  CMP-02  CMP-03  CMP-04  CMP-05                      │    170    │
│   10    │ Computer        │ CMP-06  CMP-07  CMP-08  CMP-09  CMP-10                      │    110    │
│   11    │ Computer        │ CMP-11  CMP-12                                               │     50    │
└─────────┴─────────────────┴──────────────────────────────────────────────────────────────┴───────────┘
```

> **Note:** Session 6 has 4 topics because Reasoning has 14 topics total (14 = 5+5+4).
> Session 11 has 2 topics because they are the final 2 Computer topics.
> These are the only two sessions with fewer than 5 topics, and this is intentional and correct.

---

### 2.3 — What Happens at the Start of Every Session

Before writing a single question, the session must:

**STEP 1 — State the session number out loud**
"This is Session [N]."

**STEP 2 — List the exact topics being covered**
Write out each topic code, file name, and exact question count:
```
Session 1 — English
  ENG-01 | tenses.json                | 60 questions
  ENG-02 | active_passive_voice.json  | 50 questions
  ENG-03 | modal_verbs.json           | 40 questions
  ENG-04 | reading_comprehension.json | 60 questions
  ENG-05 | synonyms_antonyms.json     | 50 questions
  TOTAL THIS SESSION: 260 questions
```

**STEP 3 — Confirm no topics are being added or removed**
Explicitly state: "No topics are being added. No topics are being removed."

**STEP 4 — Begin generation in topic order**
Start with the first topic. Complete it fully before moving to the next.
Do not write 10 questions for Topic 1, then 10 for Topic 2, then back to Topic 1.
Complete Topic 1 entirely. Then Topic 2 entirely. Then Topic 3. And so on.

---

### 2.4 — What Happens at the End of Every Session

Before the session is closed, verify:

**VERIFICATION CHECKLIST — MANDATORY**
```
[ ] Topic 1 file produced — exact question count matches plan
[ ] Topic 2 file produced — exact question count matches plan
[ ] Topic 3 file produced — exact question count matches plan
[ ] Topic 4 file produced — exact question count matches plan
[ ] Topic 5 file produced — exact question count matches plan
[ ] No extra files produced beyond the 5 planned topics
[ ] No topic from a future session was touched
[ ] Every file is named exactly as per the file naming plan
[ ] Every question has all mandatory fields — zero fields missing
[ ] IDs are sequential with no gaps and no duplicates
[ ] mock_used is [] in every single question
[ ] Difficulty ratio is approximately 60% easy / 30% medium / 10% hard
```

If any checkbox is not ticked — do not close the session. Fix the issue first.

---

## PART 3 — THE MANDATORY QUESTION FORMAT

### 3.1 — The JSON Structure

Every question — without exception — must follow this exact structure:

```json
{
  "id": "ENG-TENSE-001",
  "subject": "english",
  "topic": "tenses",
  "subtopic": "present_perfect_continuous",
  "question": "She _______ in this company since 2018.",
  "options": {
    "A": "works",
    "B": "is working",
    "C": "has been working",
    "D": "worked"
  },
  "answer": "C",
  "explanation": "Use Present Perfect Continuous (has/have + been + V-ing) when an action started in the past and is still continuing. 'Since 2018' is the clue — it marks a specific starting point that continues to now. Option A (works) is Simple Present — no indication of ongoing duration. Option D (worked) is Simple Past — implies the action is over.",
  "difficulty": "easy",
  "priority": "must_do",
  "frequency": "3-4/shift",
  "year_seen": ["2024", "2025"],
  "tags": ["grammar", "tenses", "fill_blank", "present_perfect_continuous"],
  "question_type": "fill_in_blank",
  "mock_used": []
}
```

---

### 3.2 — Field-by-Field Rules

#### Field: `id`

**Format:** `[SUBJECT]-[TOPIC_SHORTCODE]-[NUMBER]`

```
Subject codes:
  ENG  = English
  RSN  = Reasoning
  GK   = General Knowledge
  CMP  = Computer

Topic shortcodes (use exactly these — no variations):
  English:
    TENSE, VOICE, MODAL, RC, SYNANT, ART, CONJ,
    SPEECH, SENTTYPE, IDIOM, FIB, SENTCOR, PARA, OWS, CLOZE

  Reasoning:
    SERIES, CODE, BLOOD, DI, ANALOG, SEAT, SYL,
    DIR, AGE, AVG, PL, PERCENT, SYMINEQ, CAL

  General Knowledge:
    CURR, POLITY, ECO, SPORT, SCI, HIST, GEO, AWARD, SCHEME, MISC

  Computer:
    FF, IOD, MEM, SOFT, NET, INET, HIST, GEN, UNIT, EXT, MAL, BIN
```

**Number:** Always 3 digits, zero-padded. Starts at 001. Goes to the exact question count.
```
ENG-TENSE-001
ENG-TENSE-002
...
ENG-TENSE-060   ← last question, stops here. never ENG-TENSE-061.
```

**HARD RULE 7 — IDs NEVER SKIP**
If the plan says 60 questions, IDs go from 001 to 060. No gaps. No jumps.
If ID 045 is accidentally skipped, the file is invalid.

**HARD RULE 8 — IDs NEVER REPEAT**
Within a topic file, every ID is unique. Across all files, every ID is unique.
ENG-TENSE-001 cannot appear in any file other than tenses.json.

---

#### Field: `subject`

Must be exactly one of these four strings — no variations, no capitalization:
```
"english"
"reasoning"
"general_knowledge"
"computer"
```

---

#### Field: `topic`

Must exactly match the file name without `.json`. No spaces. Underscores only.
```
✅ "tenses"
✅ "active_passive_voice"
✅ "indian_polity_constitution"
❌ "Active Passive Voice"
❌ "tenses_grammar"
❌ "polity"
```

---

#### Field: `subtopic`

Must be a specific sub-area within the topic. Never leave this as the topic name itself.
```
✅ "present_perfect_continuous"   — for tenses
✅ "simple_past_passive"          — for active_passive_voice
✅ "fundamental_rights"           — for indian_polity_constitution
✅ "logic_gates_and"              — for binary_logic_gates
❌ "tenses"                       — this is the topic, not a subtopic
❌ "general"                      — this is meaningless
❌ "misc"                         — this is meaningless
```

Every topic must have multiple subtopics spread across its questions.
No subtopic should account for more than 40% of questions in a file.
Spread is mandatory — see Part 4 for topic-specific subtopic lists.

---

#### Field: `question`

Rules:
- Written in plain English — Class 12 Maharashtra board reading level
- Fill-in-blank questions use exactly this: `_______` (7 underscores)
- Never embed the answer in the question text
- Never use "all of the above" or "none of the above" as a concept in the question
- Maximum 2 sentences for the question stem
- If the question references a passage or set, include `"passage_id"` or `"set_id"` as an additional field

---

#### Field: `options`

Rules:
- Always exactly 4 options: A, B, C, D
- Never "All of the above"
- Never "None of the above"
- Never two options that mean exactly the same thing
- All 4 options must be the same type (all words, all numbers, all sentences — never mixed)
- Wrong options must represent real mistakes a student makes — not obviously wrong fillers
- The correct answer must not be longer or shorter than wrong options in a way that gives it away

---

#### Field: `answer`

Must be exactly one of: `"A"` `"B"` `"C"` `"D"`
No other format. Not `"option A"`. Not `"C) has been working"`. Just the letter.

Distribution rule across each topic file:
```
Answer A: approximately 25% of questions
Answer B: approximately 25% of questions
Answer C: approximately 25% of questions
Answer D: approximately 25% of questions
```
No correct answer letter should appear more than 35% of the time in any file.
This prevents pattern recognition by students.

---

#### Field: `explanation`

This is the most important field for learning. It must follow this exact structure:

**STRUCTURE:**
```
Sentence 1: State the rule or concept that makes the correct answer right.
Sentence 2: Apply that rule to this specific question to show why C (or whichever) is correct.
Sentence 3: Explain why one specific wrong option is wrong — name it explicitly.
Sentence 4 (optional): Give the exam tip, shortcut, or memory trick if one exists.
```

**HARD RULE 9 — NEVER SAY JUST "OPTION X IS CORRECT"**
An explanation that only says "Option B is correct because it is the right answer" is invalid.
It will be rejected. The explanation must teach the rule.

**Examples of BAD explanations — these will be rejected:**
```
❌ "The answer is C because has been working is the correct form."
❌ "Option A is wrong. Option B is wrong. Option D is wrong. So C is correct."
❌ "Present Perfect Continuous is used here."
```

**Examples of GOOD explanations — this is the standard:**
```
✅ "Present Perfect Continuous (has/have + been + V-ing) is used when an action
   started in the past and is still continuing at the time of speaking. 'Since 2018'
   signals a specific point in the past with continuation to now — the defining
   trigger for this tense. Option A (works) is Simple Present, which describes habits
   or facts, not ongoing actions with a starting point. Option D (worked) is Simple
   Past, implying the action is already over — contradicted by 'since'."
```

**Length:** Minimum 2 sentences. Maximum 5 sentences. No bullet points inside explanations.

---

#### Field: `difficulty`

Must be exactly one of three strings:
```
"easy"    → correct answer reachable in under 20 seconds by a prepared student
"medium"  → requires 30–60 seconds of thinking, applying a rule, or a short calculation
"hard"    → requires 60–90 seconds, multi-step reasoning, or catches a very common misconception
```

**HARD RULE 10 — THE 60/30/10 RATIO IS MANDATORY**

Every topic file must maintain this exact ratio:
```
60% easy   → if a file has 60 questions: 36 easy, 18 medium, 6 hard
30% medium → if a file has 40 questions: 24 easy, 12 medium, 4 hard
10% hard   → if a file has 20 questions: 12 easy, 6 medium, 2 hard
```

Acceptable tolerance: ±2 questions per tier. Not more.
If a file has 60 questions and 40 are marked "easy" — the file is invalid.

---

#### Field: `priority`

Must be exactly one of three strings based on frequency data:
```
"must_do"   → topic appears 3+ times per exam shift (highest frequency)
"high"      → topic appears 2 times per exam shift
"moderate"  → topic appears 1 time per exam shift
```

Priority values per topic (use exactly these):
```
English:
  must_do  → tenses, active_passive_voice, modal_verbs, reading_comprehension
  high     → synonyms_antonyms, articles, conjunctions_connectives,
             direct_indirect_speech, sentence_types, sentence_correction
  moderate → idioms_phrases, fill_in_the_blanks, para_jumbles,
             one_word_substitution, cloze_test

Reasoning:
  must_do  → number_letter_series, coding_decoding, blood_relations,
             data_interpretation, analogies, averages_simplification
  high     → seating_arrangement, syllogisms, direction_sense,
             age_problems, profit_loss, percentages
  moderate → symbolic_inequalities, calendar_days

General Knowledge:
  must_do  → current_affairs
  high     → indian_polity_constitution, economy_business, sports,
             science_technology, government_schemes
  moderate → indian_history_freedom, geography_india_world,
             awards_honours, miscellaneous

Computer:
  must_do  → full_forms, input_output_devices, memory_types,
             software_types, networking_basics
  high     → internet_browser_ecommerce, father_history_computer,
             computer_generations, data_units, file_extensions,
             malware_antivirus_firewall
  moderate → binary_logic_gates
```

---

#### Field: `frequency`

Use exactly these frequency strings from exam research:
```
"5-7/shift"   → current_affairs only
"3-4/shift"   → must_do topics
"2-3/shift"   → high priority topics
"1-2/shift"   → moderate topics
"1/shift"     → low frequency topics
```

---

#### Field: `year_seen`

Array of strings. Only use years where this topic type actually appeared:
```
["2024", "2025"]     → for topics confirmed in both years
["2025"]             → for topics only confirmed in 2025
["2024"]             → for topics only confirmed in 2024
```
Do not put `["2026"]` — that is the exam we are preparing for, not one we have data from.

---

#### Field: `tags`

Array of lowercase strings. Minimum 3 tags. Maximum 6 tags.
Always include:
1. The subject name
2. The topic name
3. The specific concept being tested
4. The question_type

```json
"tags": ["english", "tenses", "present_perfect_continuous", "fill_in_blank", "since_for"]
"tags": ["reasoning", "analogies", "word_analogy", "workplace_relationship"]
"tags": ["general_knowledge", "current_affairs", "isro", "space_mission", "2025"]
"tags": ["computer", "full_forms", "networking", "http", "protocol"]
```

For GK current_affairs, always include the year as a tag:
```json
"tags": ["general_knowledge", "current_affairs", "2025", "sports", "olympics"]
```

---

#### Field: `question_type`

Must be exactly one of these strings — no variations:
```
"fill_in_blank"       → blank to fill with correct word/phrase
"mcq_direct"          → direct factual question with 4 options
"identify_error"      → find the error in underlined parts A/B/C/D
"odd_one_out"         → which option does not belong
"passage_based"       → question based on a reading passage (requires passage_id)
"arrange_sequence"    → put items in correct order
"analogy"             → A:B :: C:?
"series_completion"   → find next or missing term in series
"true_false_mcq"      → which conclusion follows from given statements
"conversion"          → convert between formats (binary/decimal/voice/speech)
"match_column"        → match items from List I to List II
"set_based"           → part of a puzzle/arrangement set (requires set_id)
```

---

#### Field: `mock_used`

**HARD RULE 11 — ALWAYS EMPTY ARRAY**
This field is ALWAYS `[]` when generated.
Never pre-fill this field. Never put mock names here.
The application fills this field automatically when assigning questions to mocks.
A question file with any non-empty `mock_used` value is invalid and will break the app.

---

### 3.3 — Special Fields for Set-Based Questions

For Reading Comprehension (ENG-04):
```json
"passage_id": "RC-01"
```

For Cloze Test (ENG-15):
```json
"cloze_id": "CL-01"
```

For Data Interpretation (RSN-04):
```json
"set_id": "DI-01"
```

For Seating Arrangement (RSN-06):
```json
"set_id": "SA-01"
```

These fields are additional — they do not replace any mandatory field.

---

## PART 4 — TOPIC-SPECIFIC GENERATION RULES

### 4.1 — English Topics

---

#### ENG-01 — Tenses — 60 Questions

**Subtopics to cover (spread questions across ALL of these):**
```
simple_present             → 4 questions
present_continuous         → 4 questions
present_perfect            → 6 questions
present_perfect_continuous → 6 questions
simple_past                → 6 questions
past_continuous            → 4 questions
past_perfect               → 6 questions
past_perfect_continuous    → 4 questions
simple_future              → 6 questions
future_continuous          → 4 questions
future_perfect             → 6 questions
future_perfect_continuous  → 4 questions
mixed_tenses               → 10 questions (multi-tense identification)
```

**Rules specific to tenses:**
- Every fill_in_blank question must contain a time clue word in the sentence:
  `since, for, yesterday, tomorrow, already, yet, just, when, while, by the time, ago, last, next, soon, always, usually, now, at the moment, by tomorrow, before, after`
- Do not write a question without a time clue — time clues are how students identify tense
- Mix question types: fill_in_blank (70%), identify_error (30%)
- No two questions can use the same sentence structure. Vary subjects, verbs, and contexts.
- Contexts to use across questions: school, office, travel, family, sports, cooking, shopping, news events

**Difficulty distribution for 60 questions:**
```
Easy   → 36 questions (straightforward time clue, simple sentence)
Medium → 18 questions (ambiguous time clue, negative sentence)
Hard   →  6 questions (mixed tense in compound sentence, tricky clue)
```

---

#### ENG-02 — Active / Passive Voice — 50 Questions

**Subtopics to cover:**
```
simple_present_passive      → 5 questions
simple_past_passive         → 8 questions
simple_future_passive       → 5 questions
present_continuous_passive  → 5 questions
past_continuous_passive     → 4 questions
present_perfect_passive     → 5 questions
past_perfect_passive        → 4 questions
modal_passive               → 6 questions  (must/should/can + be + past participle)
identify_voice              → 8 questions  (is this active or passive?)
```

**Rules:**
- Types: convert active to passive (40%), fill in blank with correct form (35%), identify which voice is used (25%)
- Never use the same verb twice in conversion questions
- Agent (by + noun) must appear in at least 30% of questions

---

#### ENG-03 — Modal Verbs — 40 Questions

**Modals to cover (each must appear at least 3 times):**
```
can, could, may, might, must, should, would, will,
shall, ought to, used to, need to, dare to
```

**Question distribution:**
```
Choose the correct modal from 4 options → 24 questions (60%)
Identify the wrongly used modal        → 8 questions  (20%)
State the meaning of modal in context  → 8 questions  (20%)
```

**Meanings to test for each modal:**
```
can      → ability, permission, possibility
could    → past ability, polite request, possibility
may      → permission, possibility
might    → remote possibility, suggestion
must     → obligation, strong deduction, prohibition (must not)
should   → advice, expectation, mild obligation
would    → conditional, polite request, past habit
will     → future, determination, promise
shall    → formal future, offer, suggestion (shall we?)
ought to → moral obligation (stronger than should)
used to  → past habit (no longer true)
need to  → necessity
```

---

#### ENG-04 — Reading Comprehension — 60 Questions (6 Passages × 10 Questions)

**The 6 passages — topics are fixed:**
```
RC-01 → Social awareness (education of girls, child labour, etc.)  — EASY
RC-02 → Environment (climate change, deforestation, pollution)     — EASY
RC-03 → Business and commerce (startups, trade, economy)           — MEDIUM
RC-04 → Science and technology (AI, space, medical advances)       — MEDIUM
RC-05 → Indian culture and heritage (festivals, art, history)      — MEDIUM
RC-06 → Global issues (global warming, world health, diplomacy)    — HARD
```

**10 question types per passage — mandatory distribution:**
```
Q1  → Main idea / central theme                 → mcq_direct
Q2  → Inference (what can be concluded)         → passage_based
Q3  → Inference (what the author implies)       → passage_based
Q4  → Vocabulary in context (word meaning)      → passage_based
Q5  → Vocabulary in context (word meaning)      → passage_based
Q6  → Factual retrieval (directly stated)       → passage_based
Q7  → Factual retrieval (directly stated)       → passage_based
Q8  → Factual retrieval (directly stated)       → passage_based
Q9  → Tone / attitude of the author             → passage_based
Q10 → Best title for the passage                → mcq_direct
```

**Passage rules:**
- Length: 180–250 words exactly
- Reading level: Class 10–11 English — no academic jargon
- Every passage must be original — do not copy or closely paraphrase real published text
- Passage must be self-contained — answerable without outside knowledge
- Add `"passage_id": "RC-01"` through `"RC-06"` to every question in that passage
- Add `"passage_text": "[full passage text here]"` to the first question of each passage only

---

#### ENG-05 — Synonyms & Antonyms — 50 Questions

**Distribution:**
```
Synonyms  → 25 questions
Antonyms  → 25 questions
```

**Word difficulty levels:**
```
Easy   (30 questions) → words every Class 10 student knows: brave, happy, ancient, cruel
Medium (15 questions) → words seen in newspapers: arduous, benevolent, placid, verbose
Hard   (5 questions)  → less common but valid Class 12 words: sycophant, loquacious, tenacious
```

**Rules:**
- No word appears more than once across all 50 questions
- All 4 options must be the same part of speech as the target word
- Distractors must be plausible — commonly confused with the correct answer

---

#### ENG-06 — Articles — 30 Questions

**Subtopics:**
```
a_vs_an                     → 8 questions   (a before consonant sound, an before vowel sound)
the_specific_reference      → 8 questions   (use of 'the' for specific/known nouns)
zero_article                → 6 questions   (no article with plural/abstract nouns)
article_with_proper_nouns   → 4 questions   (rivers, mountains, newspapers take 'the')
mixed_article_fill          → 4 questions   (multiple blanks in one sentence)
```

---

#### ENG-07 — Conjunctions & Connectives — 30 Questions

**Words to cover:**
```
Coordinating:  and, but, or, nor, for, yet, so
Subordinating: although, because, since, while, when, if, unless, until,
               after, before, as soon as, provided that, even though
Correlative:   either/or, neither/nor, both/and, not only/but also
Connectives:   however, therefore, moreover, furthermore, nevertheless,
               consequently, meanwhile, otherwise, in addition, on the contrary
```

---

#### ENG-08 — Direct / Indirect Speech — 40 Questions

**Subtopics:**
```
statement_to_indirect      → 12 questions  (said that, told that)
question_to_indirect       → 10 questions  (asked if/whether, asked what/where/when)
command_to_indirect        → 8 questions   (told/ordered/requested to)
exclamation_to_indirect    → 5 questions   (exclaimed with joy/sorrow that)
indirect_to_direct         → 5 questions   (reverse conversion)
```

**Tense change rules that must be tested:**
```
Simple Present    → Simple Past
Present Cont.     → Past Cont.
Present Perfect   → Past Perfect
Simple Past       → Past Perfect
will              → would
can               → could
may               → might
```

---

#### ENG-09 — Sentence Types — 30 Questions

**Subtopics:**
```
identify_simple            → 8 questions   (one independent clause)
identify_compound          → 8 questions   (two independent clauses joined by coordinator)
identify_complex           → 8 questions   (one independent + one dependent clause)
convert_simple_to_compound → 3 questions
convert_simple_to_complex  → 3 questions
```

---

#### ENG-10 — Idioms & Phrases — 30 Questions

**Must cover idioms from these categories:**
```
Body part idioms         → 6 questions  (turn a blind eye, cost an arm and a leg)
Animal idioms            → 5 questions  (let the cat out of the bag, raining cats and dogs)
Colour idioms            → 4 questions  (in the red, green with envy, out of the blue)
Number idioms            → 3 questions  (on cloud nine, at sixes and sevens)
Business/money idioms    → 5 questions  (in the black, break the bank, foot the bill)
General common idioms    → 7 questions  (burn bridges, bite the bullet, hit the nail)
```

**No idiom to be repeated across questions.**

---

#### ENG-11 — Fill in the Blanks — 30 Questions

**Types:**
```
Single blank vocabulary → 12 questions
Single blank grammar    → 10 questions  (preposition, article, conjunction, tense)
Double blank            → 8 questions   (both blanks must fit simultaneously)
```

---

#### ENG-12 — Sentence Correction — 40 Questions

**Error types to cover:**
```
Subject-verb agreement       → 8 questions
Wrong preposition            → 6 questions
Tense error                  → 6 questions
Article error                → 5 questions
Pronoun-antecedent error     → 5 questions
Misplaced modifier           → 4 questions
Parallelism error            → 4 questions
Double negative              → 3 questions
Redundancy / pleonasm        → 3 questions
```

---

#### ENG-13 — Para Jumbles — 20 Questions

**Each question is one set of 4–5 sentences to be arranged.**
- The correct order must be unambiguous
- Use pronoun references and logical connectors as clues
- Include: 10 questions to find complete order, 5 to identify opening sentence, 5 to identify odd sentence out

---

#### ENG-14 — One Word Substitution — 20 Questions

All 20 must be from the high-frequency CET list. Required words to include:
```
Omnivore, Carnivore, Herbivore, Insomniac, Philatelist, Numismatist,
Bibliophile, Egoist, Altruist, Patriot, Atheist, Agnostic,
Contemporaries, Posthumous, Ambidextrous, Unanimous, Infallible,
Autobiography, Plagiarism, Extempore
```

---

#### ENG-15 — Cloze Test — 40 Questions (10 Passages × 4 Blanks Each)

**The 10 passages — topics:**
```
CL-01 → Environment
CL-02 → Education
CL-03 → Health and fitness
CL-04 → Technology
CL-05 → Business and economy
CL-06 → Social issues
CL-07 → Indian culture
CL-08 → Sports
CL-09 → Travel and tourism
CL-10 → Science
```

**Passage rules:**
- 80–100 words with exactly 4 blanks each
- Each blank tests a different type: vocabulary, preposition, conjunction, tense — mix across blanks
- Add `"cloze_id": "CL-01"` through `"CL-10"` to every question
- Add `"passage_text"` to first question of each cloze passage only

---

### 4.2 — Reasoning Topics

---

#### RSN-01 — Number / Letter Series — 60 Questions

**Number series subtopics (35 questions):**
```
arithmetic_progression    → 8 questions   (constant difference)
geometric_progression     → 6 questions   (constant ratio)
difference_of_difference  → 6 questions   (second-level differences)
prime_number_series       → 4 questions
squared_cubed_series      → 5 questions   (1,4,9,16 or 1,8,27,64)
mixed_operations_series   → 6 questions   (alternating +n, ×n patterns)
```

**Letter series subtopics (15 questions):**
```
skip_pattern_series       → 6 questions   (A,C,E,G = skip 1 letter)
reverse_alphabet_series   → 5 questions   (Z,X,V,T)
alpha_numeric_mixed       → 4 questions   (A1,B3,C6,D10)
```

**Wrong term in series (10 questions):**
```
find_wrong_number         → 5 questions
find_wrong_letter         → 5 questions
```

---

#### RSN-02 — Coding-Decoding — 60 Questions

**Subtopics:**
```
letter_shift_forward      → 10 questions  (A→D means +3)
letter_shift_backward     → 8 questions   (A→X means -3)
reverse_alphabet          → 8 questions   (A=Z, B=Y)
number_coding             → 10 questions  (A=1, B=2 or A=26, B=25)
word_substitution         → 8 questions   (cat=rat, dog=man)
symbol_coding             → 8 questions   (@ # $ % replace operations)
conditional_coding        → 8 questions   (if vowel — do this, if consonant — do that)
```

---

#### RSN-03 — Blood Relations — 40 Questions

**Subtopics:**
```
direct_statement          → 16 questions  (A is the brother of B's father)
coded_blood_relation      → 12 questions  (A + B means A is father of B)
pointing_to_photograph    → 12 questions  (pointing to a photo: "She is the wife of...")
```

**Rules:**
- Maximum 3 generations per question
- All names must be Indian and gender-clear
- Every question must be solvable by drawing a simple family tree
- Never create ambiguous gender situations

---

#### RSN-04 — Data Interpretation — 60 Questions (12 Sets × 5 Questions)

**12 sets — data types:**
```
SET-DI-01  → Bar graph (single bar)
SET-DI-02  → Bar graph (double bar — comparison)
SET-DI-03  → Bar graph (stacked)
SET-DI-04  → Line graph (single line)
SET-DI-05  → Line graph (two lines — comparison)
SET-DI-06  → Pie chart (single year)
SET-DI-07  → Pie chart (two years — comparison)
SET-DI-08  → Table (simple 3×4)
SET-DI-09  → Table (complex 5×5)
SET-DI-10  → Table (percentage-based)
SET-DI-11  → Venn diagram (two circles)
SET-DI-12  → Venn diagram (three circles)
```

**5 question types per set:**
```
Q1 → Direct read from data (easiest)
Q2 → Difference between two values
Q3 → Percentage of total
Q4 → Ratio comparison
Q5 → Percentage increase / decrease between years
```

**Data context rules:**
- Use only Indian and realistic contexts: exam scores, crop production, sales figures, population, rainfall, company revenue
- All data must be internally consistent — no mathematical contradictions in the dataset
- Never use real company names, real people's names, or real political figures in DI data

---

#### RSN-05 — Analogies — 50 Questions

**Subtopics:**
```
person_workplace          → 8 questions   (Doctor:Hospital :: Teacher:?)
tool_function             → 6 questions   (Pen:Write :: Knife:?)
part_whole                → 6 questions   (Page:Book :: Petal:?)
cause_effect              → 5 questions   (Fire:Ash :: Flood:?)
degree_intensity          → 5 questions   (Warm:Hot :: Cool:?)
word_antonym_analogy      → 6 questions   (Day:Night :: Question:?)
number_analogy            → 8 questions   (4:16 :: 5:? → 25)
letter_analogy            → 6 questions   (AB:DC :: EF:?)
```

---

#### RSN-06 — Seating Arrangement — 40 Questions (8 Sets × 5 Questions)

**8 sets — types:**
```
SET-SA-01 → Linear single row, all facing same direction
SET-SA-02 → Linear single row, all facing opposite direction
SET-SA-03 → Linear double row, facing each other
SET-SA-04 → Linear double row, facing each other (complex conditions)
SET-SA-05 → Circular, all facing centre
SET-SA-06 → Circular, all facing outward
SET-SA-07 → Circular, mixed facing directions
SET-SA-08 → Floor/box arrangement (6 or 7 floors)
```

**5 question types per set:**
```
Q1 → Who is sitting immediately to the left of X?
Q2 → Who is sitting exactly opposite X?
Q3 → How many people are sitting between X and Y?
Q4 → What is the position of X from the left/right end?
Q5 → Which of the following statements is true?
```

**Person names to use:** A, B, C, D, E, F, G, H or Amit, Priya, Raj, Sneha, Kiran, Meera, Rohit, Tina

---

#### RSN-07 — Syllogisms — 40 Questions

**Every question structure:**
```
Statements: 2 statements (can have 3 for hard questions)
Conclusions: I, II (can have III, IV for hard questions)
```

**Statement combinations to cover:**
```
All-All           → 8 questions
All-Some          → 8 questions
Some-All          → 6 questions
No-All            → 6 questions
No-Some           → 6 questions
Some-Not patterns → 6 questions
```

**Answer option format — always use this structure:**
```
A → Only Conclusion I follows
B → Only Conclusion II follows
C → Both Conclusions I and II follow
D → Neither Conclusion I nor Conclusion II follows
```

For complementary pairs, use:
```
A → Only Conclusion I follows
B → Only Conclusion II follows
C → Either Conclusion I or Conclusion II follows
D → Neither Conclusion I nor Conclusion II follows
```

---

#### RSN-08 — Direction Sense — 20 Questions

**Subtopics:**
```
final_direction           → 8 questions   (which direction is X facing now?)
total_distance            → 6 questions   (how far from starting point?)
shadow_direction          → 3 questions   (morning sun = East, shadow = West)
relative_position         → 3 questions   (where is X relative to Y?)
```

---

#### RSN-09 — Age Problems — 30 Questions

**Subtopics:**
```
present_age_find          → 10 questions  (find current age from conditions)
past_future_age           → 10 questions  (age N years ago / after N years)
ratio_based_age           → 6 questions   (ages are in ratio X:Y)
average_age               → 4 questions   (average age of group)
```

---

#### RSN-10 — Averages & Simplification — 40 Questions

**Subtopics:**
```
simple_average            → 10 questions  (average of a set of numbers)
weighted_average          → 6 questions   (different weights for groups)
average_with_replacement  → 6 questions   (one member replaced, average changes)
simplification_bodmas     → 10 questions  (BODMAS: brackets, order, division, mult, add, sub)
approximation             → 8 questions   (find closest value, round numbers)
```

---

#### RSN-11 — Profit & Loss — 40 Questions

**Subtopics:**
```
find_profit_percent       → 8 questions
find_loss_percent         → 6 questions
find_selling_price        → 8 questions   (given CP and profit%)
find_cost_price           → 8 questions   (given SP and profit%)
marked_price_discount     → 6 questions   (MP, discount%, find SP)
successive_profit_loss    → 4 questions   (two transactions)
```

---

#### RSN-12 — Percentages — 40 Questions

**Subtopics:**
```
percent_of_number         → 8 questions
percent_increase_decrease → 8 questions
successive_percent_change → 6 questions
percent_to_fraction       → 6 questions   (convert and use)
population_growth         → 6 questions   (growth rate over years)
marks_percentage          → 6 questions   (scored X out of Y = ?%)
```

---

#### RSN-13 — Symbolic Inequalities — 20 Questions

**Pattern:**
- Define symbols (@ means >, # means <, $ means =, etc.)
- Give 3–4 relationships using symbols
- State 2 conclusions
- Ask which conclusion(s) follow

All 20 questions follow this exact pattern — only the symbols and values change.

---

#### RSN-14 — Calendar & Days — 20 Questions

**Subtopics:**
```
day_of_week_for_date      → 8 questions   (what day was 15 Aug 1947?)
odd_days_method           → 6 questions   (calculate odd days)
leap_year_rules           → 3 questions   (divisible by 4, 100, 400)
days_between_dates        → 3 questions   (how many days between X and Y?)
```

---

### 4.3 — General Knowledge Topics

---

#### GK-01 — Current Affairs — 80 Questions

**Time range: JANUARY 2024 TO APRIL 2026 ONLY**

**HARD RULE 12 — NO EVENTS BEFORE JANUARY 2024**
No current affairs question may reference any event, appointment, award, or record from before January 2024. If an event happened in December 2023 — it does not belong here.

**Distribution across 80 questions:**
```
Government schemes launched 2024–2026         → 15 questions
Space missions ISRO/NASA/ESA 2024–2026        → 10 questions
International summits and host countries      → 10 questions
New appointments (PM, President, Ministers,
  CEOs of major organisations)                → 10 questions
Sports events and winners 2024–2026           → 10 questions
Science discoveries and tech launches         → 10 questions
Awards and honours 2024–2026                  → 10 questions
Bilateral agreements and diplomacy            → 5 questions
```

**Every current affairs question must:**
- Include the year of the event in the explanation
- Use the most recent information available as of April 2026
- Tag with the specific year: `"tags": ["current_affairs", "2025", "space"]`

---

#### GK-02 — Indian Polity & Constitution — 50 Questions

**Subtopics:**
```
preamble                  → 4 questions
fundamental_rights        → 10 questions  (Articles 12–35)
dpsp                      → 5 questions   (Directive Principles, Articles 36–51)
parliament_structure      → 8 questions   (Lok Sabha, Rajya Sabha, sessions)
president_vp_pm           → 8 questions   (powers, election, term)
judiciary                 → 6 questions   (Supreme Court, High Court, original/appellate)
emergency_provisions      → 4 questions   (Articles 352, 356, 360)
amendments                → 3 questions   (procedure, important amendments)
schedules                 → 2 questions   (which schedule covers what)
```

---

#### GK-03 — Economy & Business — 40 Questions

**Subtopics:**
```
rbi_monetary_policy       → 8 questions   (repo rate, reverse repo, CRR, SLR)
banking_basics            → 5 questions   (SEBI, NABARD, functions)
trade_exports_imports     → 6 questions   (India's top exports/imports, trading partners)
gdp_growth                → 4 questions   (India's GDP rate, sectors)
gst_basics                → 5 questions   (slabs, exemptions, launch)
stock_market_basics       → 4 questions   (BSE, NSE, SENSEX, NIFTY)
international_trade       → 4 questions   (WTO, IMF, World Bank basics)
sez_fdi                   → 4 questions   (special economic zones, FDI caps)
```

---

#### GK-04 — Sports — 35 Questions

**Subtopics:**
```
olympics_2024_paris        → 8 questions  (India's medals, host, key events)
cricket_icc_events         → 6 questions  (recent World Cup winners, Indian records)
commonwealth_asian_games   → 5 questions  (recent results)
awards_arjuna_khel_ratna   → 5 questions  (recent recipients)
current_captains           → 4 questions  (cricket, hockey, football India)
stadiums_locations         → 4 questions
sports_terminology         → 3 questions  (terms unique to specific sports)
```

---

#### GK-05 — Science & Technology — 35 Questions

**Subtopics:**
```
isro_missions              → 10 questions (Chandrayaan, Mangalyaan, Gaganyaan, recent)
nasa_esa_missions          → 5 questions
ai_tech_developments       → 5 questions  (recent AI tools, policies, India's AI mission)
inventions_discoveries     → 5 questions  (recent Nobel Prize science, medical advances)
india_tech_policy          → 5 questions  (5G, semiconductor, Digital India milestones)
basic_science_awareness    → 5 questions  (DNA, vaccines, antibiotics — general awareness)
```

---

#### GK-06 — Indian History & Freedom — 25 Questions

**Subtopics:**
```
freedom_fighters           → 6 questions  (Bhagat Singh, Bose, Gandhi, Tilak, Gokhale)
important_events_dates     → 6 questions  (1857, 1919, 1942, 1947)
social_reformers           → 5 questions  (Phule, Ambedkar, Savitribai, Rammohan Roy)
maharashtra_history        → 5 questions  (Shivaji, Peshwas, Maharashtra statehood 1960)
ancient_medieval_india     → 3 questions  (Ashoka, Akbar, Vijayanagara)
```

---

#### GK-07 — Geography — India & World — 25 Questions

**Subtopics:**
```
rivers_dams                → 6 questions  (longest river, tributaries, major dams)
states_capitals            → 5 questions  (including recent reorganization)
india_superlatives         → 6 questions  (longest, highest, largest, smallest)
neighbouring_countries     → 4 questions  (capitals, borders of India's neighbours)
world_geography            → 4 questions  (largest countries, continents, oceans)
```

---

#### GK-08 — Awards & Honours — 20 Questions

**Subtopics:**
```
bharat_ratna_padma         → 5 questions  (recent recipients)
nobel_prizes               → 5 questions  (latest year — Peace, Literature, Science)
sahitya_jnanpith           → 4 questions  (recent recipients)
national_film_awards       → 3 questions  (latest)
international_awards       → 3 questions  (Booker, Pulitzer — recent)
```

---

#### GK-09 — Government Schemes — 30 Questions

**Only currently active schemes as of 2026:**
```
pm_kisan                   → 3 questions
ayushman_bharat            → 3 questions
startup_india              → 2 questions
make_in_india              → 2 questions
digital_india              → 3 questions
swachh_bharat              → 2 questions
beti_bachao_beti_padhao    → 2 questions
pm_awas_yojana             → 2 questions
jal_jeevan_mission         → 2 questions
niti_aayog                 → 3 questions  (function, composition, initiatives)
ministry_mapping           → 6 questions  (which scheme belongs to which ministry)
```

---

#### GK-10 — Miscellaneous — 20 Questions

**Subtopics:**
```
books_authors              → 5 questions  (recent Indian and international books)
language_word_origins      → 4 questions  (etymology, borrowed words in English)
food_origins               → 4 questions  (which dish originated where)
world_records              → 4 questions  (Guinness records — well-known)
fun_facts_general          → 3 questions  (national symbols, official languages, etc.)
```

---

### 4.4 — Computer Topics

---

#### CMP-01 — Full Forms — 50 Questions

**HARD RULE 13 — MANDATORY ABBREVIATION LIST**
All of these abbreviations must appear across the 50 questions.
No abbreviation may appear in more than one question.
No abbreviation outside this list should be used unless it directly supports a listed one.

```
CPU, RAM, ROM, LAN, WAN, MAN, WWW, HTTP, HTTPS, URL,
HTML, CSS, PDF, JPEG, JPG, MP3, MP4, USB, GUI, OS,
BIOS, ALU, CU, DNS, FTP, SMTP, POP3, IMAP, SQL, API,
AI, ML, IoT, VPN, SSD, HDD, MODEM, ISP, IP, MAC,
OCR, UPS, LCD, LED, OLED, CD, DVD, RAID, CAPTCHA, OTP,
ATM, PIN, SIM, GPS, GIF, PNG, EXE, ZIP, XML, JSON
```

**Question type distribution:**
```
Full form → expand (what does X stand for?)      → 25 questions (50%)
Definition → abbreviation (what is the short form?) → 15 questions (30%)
Letter specific (what does the 'P' in X stand for?) → 10 questions (20%)
```

---

#### CMP-02 — Input / Output Devices — 40 Questions

**Input devices to cover:**
```
keyboard, mouse, scanner, microphone, joystick, light pen,
barcode reader, touchpad, webcam, graphics tablet, biometric
```

**Output devices to cover:**
```
monitor, printer (inkjet, laser, dot matrix, thermal), speaker,
plotter, projector, headphones
```

**Both I/O (must appear as trick questions at least 5 times):**
```
touchscreen, modem, hard disk, network card
```

**Question distribution:**
```
Classify as input / output / both  → 15 questions
Which device is used for X task    → 15 questions
Type of printer / monitor / device → 10 questions
```

---

#### CMP-03 — Memory Types — 40 Questions

**Subtopics:**
```
volatile_vs_nonvolatile    → 8 questions  (RAM=volatile, ROM=nonvolatile)
ram_types                  → 6 questions  (DRAM, SRAM, SDRAM)
rom_types                  → 6 questions  (PROM, EPROM, EEPROM)
cache_registers            → 6 questions  (fastest, purpose)
primary_vs_secondary       → 6 questions
flash_memory_sd            → 4 questions
memory_hierarchy           → 4 questions  (order: registers > cache > RAM > HDD)
```

---

#### CMP-04 — Software Types — 35 Questions

**Subtopics:**
```
system_vs_application      → 8 questions
operating_system_types     → 6 questions  (Windows, Linux, macOS, Android, iOS — purpose)
utility_software           → 5 questions  (antivirus, disk cleaner, file manager)
application_software       → 5 questions  (MS Office, browsers, media players)
open_source_proprietary    → 4 questions
freeware_shareware         → 3 questions
compiler_interpreter       → 4 questions  (all/line-by-line, Python/C examples)
```

---

#### CMP-05 — Networking Basics — 35 Questions

**Subtopics:**
```
lan_man_wan                → 6 questions  (scope, examples)
topologies                 → 6 questions  (bus, star, ring, mesh, tree, hybrid)
ip_mac_address             → 5 questions
protocols                  → 8 questions  (TCP/IP, HTTP, FTP, SMTP, DNS — what each does)
devices                    → 6 questions  (hub vs switch vs router vs modem)
client_server_p2p          → 4 questions
```

---

#### CMP-06 — Internet, Browser & E-Commerce — 30 Questions

**Subtopics:**
```
www_vs_internet            → 5 questions  (WWW is a service ON the internet)
url_structure              → 4 questions  (protocol://domain/path)
browser_vs_search_engine   → 4 questions  (different things)
http_https_ssl             → 5 questions
dns_domain_ip              → 4 questions
ecommerce_types            → 5 questions  (B2B, B2C, C2C, digital payments, COD)
cookies_cache_history      → 3 questions
```

---

#### CMP-07 — Father / History of Computer — 20 Questions

**Must cover:**
```
Charles Babbage — Father of Computer, Analytical Engine
Alan Turing — Father of Modern Computer, Turing Machine, Turing Test
Ada Lovelace — First programmer
John von Neumann — Von Neumann architecture
ENIAC — First general purpose electronic computer
TIFRAC — First Indian computer
PARAM — India's supercomputer
UNIVAC — First commercial computer
Tim Berners-Lee — Inventor of WWW
Bill Gates / Steve Jobs — personal computer era (awareness level)
```

---

#### CMP-08 — Computer Generations — 20 Questions

**The 5 generations — every question must test one of these:**
```
1st generation (1940s–50s) → Vacuum tubes → ENIAC, UNIVAC
2nd generation (1950s–60s) → Transistors → smaller, faster, less heat
3rd generation (1960s–70s) → Integrated Circuits (IC) → even smaller
4th generation (1970s–now) → Microprocessors → personal computers
5th generation (now–)      → AI, parallel processing, natural language
```

**Question distribution: 4 questions per generation.**

---

#### CMP-09 — Data Units — 20 Questions

**Units to cover:**
```
Bit → Byte → KB → MB → GB → TB → PB
Exact values:
  1 Byte = 8 bits
  1 KB = 1024 Bytes
  1 MB = 1024 KB
  1 GB = 1024 MB
  1 TB = 1024 GB
```

**Question types:**
```
Convert between units             → 8 questions
Order units smallest to largest   → 4 questions
Storage capacity (CD=700MB,
  DVD=4.7GB, Blu-ray=25GB)        → 5 questions
Which unit is appropriate for X   → 3 questions
```

---

#### CMP-10 — File Extensions — 20 Questions

**Extensions to cover — all of these must appear:**
```
.jpg / .jpeg → image (JPEG)
.png         → image (lossless)
.gif         → animated image
.mp3         → audio
.mp4         → video
.wav         → audio (uncompressed)
.pdf         → document (Adobe)
.docx        → Word document
.xlsx        → Excel spreadsheet
.pptx        → PowerPoint presentation
.txt         → plain text
.exe         → executable / program
.zip         → compressed archive
.rar         → compressed archive
.html        → web page
.css         → stylesheet
.py          → Python code
.java        → Java code
.csv         → comma-separated values
.xml         → markup data
```

---

#### CMP-11 — Malware, Antivirus & Firewall — 25 Questions

**Subtopics:**
```
virus_worm_trojan          → 8 questions  (key differences — exam favourite)
ransomware_spyware_adware  → 5 questions
phishing_social_engineering→ 4 questions
antivirus_purpose          → 3 questions
firewall_types             → 3 questions
encryption_basics          → 2 questions  (symmetric vs asymmetric — definition level)
```

**Virus/Worm/Trojan distinction — must be crystal clear in every relevant explanation:**
```
Virus   → attaches to a file, needs human action to spread
Worm    → self-replicates through network, no human action needed
Trojan  → disguises itself as legitimate software, opens backdoor
```

---

#### CMP-12 — Binary & Logic Gates — 25 Questions

**Binary conversion (20 questions):**
```
decimal_to_binary          → 8 questions  (numbers 1–255)
binary_to_decimal          → 8 questions  (same range)
binary_addition            → 4 questions  (max 8-bit numbers)
```

**Logic gates (15 questions):**
```
AND_gate                   → 3 questions  (truth table, output for given inputs)
OR_gate                    → 2 questions
NOT_gate                   → 2 questions
NAND_gate                  → 2 questions
NOR_gate                   → 2 questions
XOR_gate                   → 2 questions
XNOR_gate                  → 2 questions
```

---

## PART 5 — QUALITY CONTROL — THE 10 CHECKS

Every question must pass all 10 checks before being saved.
A question that fails even one check must be rewritten — not kept with a note.

### CHECK 1 — UNIQUENESS
No two questions in the same file test the same specific fact, use the same sentence stem, or produce the same learning outcome.
Minimum 80% variation across all questions in a file.
If question 23 and question 47 are testing the same concept in the same way — rewrite one of them.

### CHECK 2 — ONE UNAMBIGUOUS CORRECT ANSWER
Only one option is correct. Not "mostly correct." Not "arguably correct." Definitively correct.
If any subject matter expert could argue for two answers — rewrite the question.

### CHECK 3 — PLAUSIBLE DISTRACTORS — ALL 4 OPTIONS
All 4 options must look realistic to a student who has studied but made a common error.
Wrong options must represent real mistakes — not obviously absurd choices.
A student who does NOT know the answer should still need to think before guessing.

### CHECK 4 — NO TRICK OR AMBIGUITY
This is a Class 12 entrance exam — not a puzzle or quiz show.
If a question relies on tricky wording, double negatives in the stem, or unusual phrasing — rewrite it.
Complexity belongs in the concept — not the sentence structure.

### CHECK 5 — PLAIN LANGUAGE
Every question must be readable by a Class 12 Maharashtra board student in their first read.
No unnecessary jargon in the question stem.
If the student needs to read the question twice just to understand what is being asked — rewrite it.

### CHECK 6 — EXPLANATION IS COMPLETE AND EDUCATIONAL
Every explanation must:
- State the rule or concept behind the correct answer (not just "it is correct")
- Apply that rule to this specific question
- Explain why at least one wrong option is wrong — name the option explicitly
- Be understandable when read alone, without seeing the question again
- Minimum 2 sentences. Maximum 5 sentences. Plain English only.

### CHECK 7 — CORRECT DIFFICULTY LABEL
Verify the label is accurate:
```
Easy   → a prepared student answers in under 20 seconds
Medium → requires 30–60 seconds of applying a rule or doing a short calculation
Hard   → requires 60–90 seconds, multi-step logic, or tests a very common misconception
```
Do not label a question Hard just because the topic is complex.
Label it Hard if the specific question would cause errors even for well-prepared students.

### CHECK 8 — FORMAT IS VALID JSON
All fields are present. No field is null or empty.
The id follows naming convention.
mock_used is always [].
question_type is from the approved list — no custom values.
Run a mental JSON validation: would this parse without errors?

### CHECK 9 — SUBTOPIC SPREAD
No subtopic accounts for more than 40% of questions in any file.
If tenses.json has 60 questions, Present Perfect cannot have more than 24 of them.
Check the subtopic distribution before closing a topic file.

### CHECK 10 — ANSWER DISTRIBUTION
Across the file, answers are approximately 25% A, 25% B, 25% C, 25% D.
No letter appears more than 35% of the time.
Check the distribution before closing a topic file and rebalance if needed.

---

## PART 6 — THE GENERATION PROMPT TEMPLATE

Use this exact prompt to start every session. Fill in the brackets. Do not deviate.

```
You are generating questions for the MAH-BHMCT/BCA/BBA/BMS/BBM CET 2026 question database.

This is Session [NUMBER] of 11.

SUBJECT: [english / reasoning / general_knowledge / computer]

TOPICS THIS SESSION:
[Topic Code] | [file_name.json] | [exact number] questions
[Topic Code] | [file_name.json] | [exact number] questions
[Topic Code] | [file_name.json] | [exact number] questions
[Topic Code] | [file_name.json] | [exact number] questions
[Topic Code] | [file_name.json] | [exact number] questions

TOTAL QUESTIONS THIS SESSION: [sum]

STRICT RULES — ALL MANDATORY:
1. Generate ONLY the topics listed above — no new topics, no extra topics
2. Generate EXACTLY the number of questions listed — not one more, not one less
3. Complete each topic fully before starting the next topic
4. Follow the mandatory JSON format — all fields present, no field skipped
5. Maintain 60% easy / 30% medium / 10% hard ratio per topic file
6. All explanations must state the rule AND explain at least one wrong option
7. mock_used is always []
8. IDs are sequential from 001 to [max] — no gaps, no repeats
9. Spread subtopics — no subtopic exceeds 40% of a file
10. Answer letters are distributed: ~25% each of A, B, C, D

GENERAL KNOWLEDGE RULE: Current affairs questions cover JANUARY 2024 to APRIL 2026 only.

OUTPUT FORMAT:
Produce one complete JSON array per topic.
Start each array with a comment line: // [TOPIC_CODE] | [file_name.json] | [N] questions
Do not mix questions from different topics in the same array.
Do not produce any content outside the JSON arrays.
```

---

## PART 7 — SESSION TRACKING

Mark each session complete only when ALL files from that session pass verification.

```
┌─────────┬─────────────────┬──────────────────────────────┬────────┬───────────┬──────────┐
│ Session │ Subject         │ Topics                        │ Q Count│ Status    │ Verified │
├─────────┼─────────────────┼──────────────────────────────┼────────┼───────────┼──────────┤
│    1    │ English         │ ENG-01 to ENG-05             │   260  │ [ ] TODO  │ [ ]      │
│    2    │ English         │ ENG-06 to ENG-10             │   170  │ [ ] TODO  │ [ ]      │
│    3    │ English         │ ENG-11 to ENG-15             │   160  │ [ ] TODO  │ [ ]      │
│    4    │ Reasoning       │ RSN-01 to RSN-05             │   270  │ [ ] TODO  │ [ ]      │
│    5    │ Reasoning       │ RSN-06 to RSN-10             │   170  │ [ ] TODO  │ [ ]      │
│    6    │ Reasoning       │ RSN-11 to RSN-14             │   140  │ [ ] TODO  │ [ ]      │
│    7    │ GK              │ GK-01  to GK-05              │   240  │ [ ] TODO  │ [ ]      │
│    8    │ GK              │ GK-06  to GK-10              │   120  │ [ ] TODO  │ [ ]      │
│    9    │ Computer        │ CMP-01 to CMP-05             │   170  │ [ ] TODO  │ [ ]      │
│   10    │ Computer        │ CMP-06 to CMP-10             │   110  │ [ ] TODO  │ [ ]      │
│   11    │ Computer        │ CMP-11 to CMP-12             │    50  │ [ ] TODO  │ [ ]      │
├─────────┼─────────────────┼──────────────────────────────┼────────┼───────────┼──────────┤
│ TOTAL   │ 4 subjects      │ 51 topics                    │  1,820 │           │          │
└─────────┴─────────────────┴──────────────────────────────┴────────┴───────────┴──────────┘
```

---

## PART 8 — HARD RULES SUMMARY

These are every non-negotiable rule in one place:

| Rule | Description |
|---|---|
| HARD RULE 1 | No new topics. 51 topics only. No additions. |
| HARD RULE 2 | No skipping topics. Every topic gets generated. |
| HARD RULE 3 | No merging topics. Each topic = one file. |
| HARD RULE 4 | Exactly 5 topics per session (except final sessions with remainder). |
| HARD RULE 5 | One subject per session. Never mix subjects. |
| HARD RULE 6 | Sessions are sequential. No skipping ahead. |
| HARD RULE 7 | IDs never skip. No gaps in numbering. |
| HARD RULE 8 | IDs never repeat. Unique across all files. |
| HARD RULE 9 | Explanations never say just "Option X is correct." Always explain the rule. |
| HARD RULE 10 | 60/30/10 difficulty ratio. Tolerance ±2 questions per tier. |
| HARD RULE 11 | mock_used is always []. Never pre-fill. |
| HARD RULE 12 | Current affairs: January 2024 to April 2026 only. |
| HARD RULE 13 | Full forms: use only the 60-item mandatory abbreviation list. |

---

*End of Master Generation Instructions — Version 2.0*
*Total Topics: 51 | Total Questions: 1,820 | Total Mock Tests: 15 | Sessions: 11*
