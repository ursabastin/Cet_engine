# CET 2026 Mastery Engine (v1.2.0)
## "The Mastery Sprint"

Variation 51 of the CET Simulation Engine, optimized for high-intensity, 7-day preparation cycles. 

### 🚀 Vision (v1.2)
To provide a high-dopamine, distraction-free environment for ADHD-optimized learning. The system focuses on rapid "Test -> Review -> Adjust" cycles, prioritizing active recall over passive study.

### 📊 Data Architecture
The engine is built on a three-tier data hierarchy:
1.  **The Practice Pool**: 70+ JSON topic files containing thousands of categorized questions across English, Reasoning, GK, and Computer.
2.  **The Manifest**: A centralized index (`manifest.json`) that maps every topic to its subject pillar.
3.  **The Mock Blueprint**: Pre-planned endurance simulations (`mock_plan.json`) that stitch together specific question IDs to ensure 100% syllabus coverage.

### 🗄️ Storage & Persistence
*   **Local Vault**: All performance data is stored in the browser's `localStorage`.
*   **Snapshots**: Each test result includes a full snapshot of the questions, user answers, and correct keys, allowing for detailed historical review.
*   **Mistake Banking**: The **Analytical View** allows for a question-by-question deep dive into every failed attempt.

### 🛠️ Key Features
*   **Analytical View**: Positioned in the primary header for instant performance checks.
*   **Subject Pillars**: Interactive hubs for English, Reasoning, GK, and Computer.
*   **Endurance Packs**: 25-minute, 50-question simulations designed to build mental stamina.
*   **Review Mode**: High-contrast feedback showing "Your Choice" vs "Correct Answer".

### ⚡ The 7-Day Protocol
1.  **Research (45m)**: Target a specific topic from the Mastery Bank.
2.  **Simulate (25m)**: Launch an Endurance Pack or Topic Mock.
3.  **Review (20m)**: Use the **Mock Vault** to analyze every "Red" answer.
4.  **Rotate**: Move to the next subject to maintain high dopamine levels.

---
**Status**: Production Ready (v1.2.0)
**Dev Mode**: `npm run dev`
**Build Mode**: `npm run build`
