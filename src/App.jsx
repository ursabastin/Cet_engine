import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { MockProvider } from './context/MockContext';
import { AttemptProvider } from './context/AttemptContext';
import ShellLayout from './components/shell/ShellLayout';
import LandingScreen from './pages/LandingScreen.jsx';
import Home from './pages/Home.jsx';
import MockStartScreen from './pages/MockStartScreen.jsx';
import TestInterface from './pages/TestInterface.jsx';
import ResultsScreen from './pages/ResultsScreen.jsx';
import SolutionsScreen from './pages/SolutionsScreen.jsx';

export default function App() {
  return (
    <ThemeProvider>
      <MockProvider>
        <AttemptProvider>
          <HashRouter>
            <ShellLayout>
              <Routes>
                <Route path="/" element={<LandingScreen />} />
                <Route path="/home" element={<Home />} />
                <Route path="/mock/:id" element={<MockStartScreen />} />
                <Route path="/test/:id" element={<TestInterface />} />
                <Route path="/results/:id" element={<ResultsScreen />} />
                <Route path="/solutions/:id" element={<SolutionsScreen />} />
              </Routes>
            </ShellLayout>
          </HashRouter>
        </AttemptProvider>
      </MockProvider>
    </ThemeProvider>
  );
}
