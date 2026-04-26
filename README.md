<div align="center">
  <h1>CET Engine 2026</h1>
  <p><strong>Strategic Command Center for CET Examination Preparation</strong></p>
  <p><em>Version 1.0.0</em></p>
</div>

<hr>

<h2>About the Application</h2>
<blockquote>
  An offline-first, high-performance Desktop application built for serious CET 2026 aspirants. It provides an immersive, distraction-free environment for taking full-length mock exams, practicing topic-specific questions, and gaining deep analytical insights into exam performance.
</blockquote>

<h2>Core Features</h2>

<table>
  <tr>
    <td><b>🖥️ Industry-Standard CBT Interface</b></td>
    <td>Mirrors real-world Computer-Based Testing (CBT) engines (e.g., TCS iON). Features an interactive Question Palette, precision timers, "Mark for Review" mechanics, and standard navigation controls.</td>
  </tr>
  <tr>
    <td><b>📚 Vast Question Bank</b></td>
    <td>Bundled with a read-only dataset featuring 19 Full-Length Mock Exams and 51 specialized topic datasets across English, Reasoning, General Knowledge, and Computer.</td>
  </tr>
  <tr>
    <td><b>💾 Smart Persistence</b></td>
    <td>Test sessions are continuously saved locally. If the application is closed mid-test, users can seamlessly resume exactly where they left off without data loss.</td>
  </tr>
  <tr>
    <td><b>📊 Deep Analytics & Insights</b></td>
    <td>A dedicated Results Dashboard generates instant performance reviews. Analyzes total scores, subject breakdowns, accuracy by difficulty, and automatically detects "Weak Topics".</td>
  </tr>
  <tr>
    <td><b>✨ Glassmorphism UI</b></td>
    <td>Built with a custom Glassmorphism design system using raw CSS Variables for a sleek, premium, and distraction-free visual experience.</td>
  </tr>
</table>

<h2>How to Use & Run</h2>

<table>
  <thead>
    <tr>
      <th>Action</th>
      <th>Command / Instruction</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Prerequisites</b></td>
      <td>Install Node.js (v16+)</td>
      <td>Ensure Node.js and npm are installed on your machine.</td>
    </tr>
    <tr>
      <td><b>Installation</b></td>
      <td><kbd>npm install</kbd></td>
      <td>Downloads and installs all required dependencies.</td>
    </tr>
    <tr>
      <td><b>Development Server</b></td>
      <td><kbd>npm run electron:dev</kbd></td>
      <td>Launches the application in development mode with live hot-reloading for both React and the Electron shell.</td>
    </tr>
    <tr>
      <td><b>Production Build</b></td>
      <td><kbd>npm run electron:build</kbd></td>
      <td>Compiles the application and generates a standalone Windows Installer executable (.exe) inside the <code>dist_electron/</code> directory.</td>
    </tr>
  </tbody>
</table>

<h2>Architecture & Data Flow</h2>

<details>
  <summary><b>View Directory Structure & Data Rules</b></summary>
  <br>
  <ul>
    <li><code>/data set/</code> & <code>/practice_pool/</code>: The static, read-only JSON database. <b>Never modify these directly.</b></li>
    <li><code>/src/components/</code>: Modular UI elements (TestInterface, QuestionPalette).</li>
    <li><code>/src/context/</code>: Global React Contexts (AttemptContext handles active test persistence).</li>
    <li><code>/electron/main.js</code>: Native window logic and IPC communications.</li>
  </ul>
  <p><i>The engine builds an instance of the mock in memory and tracks responses via React Context, persisting them to the browser's <code>localStorage</code>. This protects the core JSON data while keeping the app lightning fast.</i></p>
</details>

<h2>Technology Stack</h2>

<table>
  <tr>
    <th>Category</th>
    <th>Technologies Used</th>
  </tr>
  <tr>
    <td><b>Frontend Framework</b></td>
    <td>React 19, React Router v7</td>
  </tr>
  <tr>
    <td><b>Build System</b></td>
    <td>Vite</td>
  </tr>
  <tr>
    <td><b>Desktop Container</b></td>
    <td>Electron</td>
  </tr>
  <tr>
    <td><b>Styling & Icons</b></td>
    <td>Tailwind CSS v4, Custom CSS Variables, Lucide React</td>
  </tr>
</table>

<hr>

<h2>🏆 Credits & Architecture</h2>

<blockquote>
This application was conceptualized, architected, and built by a highly specialized three-entity team:
<br><br>
<b>1. Sebastin Richard</b> — Provided the raw logic, complete skeleton design, comprehensive application architecture, and explained exactly how the engine must operate.<br>
<b>2. Google Antigravity IDE</b> — The primary engineering AI agent that autonomously wrote and assembled the complete application codebase.<br>
<b>3. Claude AI</b> — The strategic advisor AI that provided step-by-step guidance, planning, and tactical oversight.
</blockquote>

<div align="center">
  <p>Copyright © 2026 Sebastin Richard. All rights reserved.</p>
</div>
