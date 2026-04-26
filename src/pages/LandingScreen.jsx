import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function LandingScreen() {
  const navigate = useNavigate();
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('cet_visited');
    if (hasVisited) {
      navigate('/home', { replace: true });
    }
  }, [navigate]);

  const handleStart = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      localStorage.setItem('cet_visited', 'true');
      navigate('/home');
    }, 600);
  };

  return (
    <div style={{ 
      height: '100vh', 
      width: '100vw', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      background: 'var(--bg-base)', 
      zIndex: 5000,
      opacity: isFadingOut ? 0 : 1,
      transition: 'opacity 600ms ease-out',
      overflow: 'hidden'
    }}>
      <div style={{ position: 'absolute', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', top: '-10%', left: '-10%', filter: 'blur(60px)' }} />
      <div style={{ position: 'absolute', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)', bottom: '-20%', right: '-10%', filter: 'blur(60px)' }} />

      <div className="glass-deep" style={{ 
        padding: 'var(--space-2xl)', 
        borderRadius: 'var(--radius-xl)', 
        maxWidth: '540px', 
        width: '90%', 
        textAlign: 'center', 
        position: 'relative',
        animation: 'fadeInUp 800ms ease-out forwards'
      }}>
        <div style={{ 
          width: '80px', 
          height: '80px', 
          background: 'var(--glass-bg-active)', 
          border: '1px solid var(--accent-primary)', 
          borderRadius: '24px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          margin: '0 auto var(--space-xl) auto',
          boxShadow: '0 0 30px rgba(99,102,241,0.3)'
        }}>
          <span style={{ fontSize: '36px' }}>🚀</span>
        </div>

        <h1 className="font-display text-primary" style={{ fontSize: '32px', fontWeight: 800, marginBottom: 'var(--space-md)', letterSpacing: '-0.02em' }}>
          CET Engine Pro
        </h1>
        
        <p className="font-body text-secondary" style={{ fontSize: '16px', lineHeight: 1.6, marginBottom: 'var(--space-2xl)' }}>
          Master the CET exams with our advanced mock engine. Featuring real-time analytics, weak topic detection, and a gorgeous distraction-free environment.
        </p>

        <Button label="Enter Application" variant="primary" size="lg" fullWidth onClick={handleStart} />
      </div>
    </div>
  );
}
