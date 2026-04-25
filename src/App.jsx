import React, { useState } from 'react';
import Home from './pages/Home';
import Landing from './pages/Landing';

export default function App() {
  const [screen, setScreen] = useState('landing');

  return (
    <div className="bg-[#050A18] h-screen overflow-hidden">
      {screen === 'landing' && <Landing onEnter={() => setScreen('home')} />}
      {screen === 'home' && <Home />}
    </div>
  );
}
