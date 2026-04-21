import React, { useState } from 'react';
import SupportChat from '../components/SupportChat';

export default function Landing({ onEnter }) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center relative overflow-hidden font-outfit">
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center animate-in fade-in zoom-in duration-1000">
        
        {/* The Spinning Star */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
          <svg 
            width="120" 
            height="120" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="animate-[spin_10s_linear_infinite] drop-shadow-[0_0_15px_rgba(37,99,235,0.5)]"
          >
            <path 
              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
              fill="url(#starGradient)" 
              stroke="white" 
              strokeWidth="0.5"
            />
            <defs>
              <linearGradient id="starGradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3b82f6" />
                <stop offset="1" stopColor="#6366f1" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Branding */}
        <div className="text-center space-y-4">
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-blue-400 mb-2 opacity-100">Official Preparation Portal</span>
            <h1 className="text-7xl font-black tracking-tighter">
              <span className="text-white">CET</span> <span className="text-blue-500">Practise</span>
            </h1>
          </div>
          <p className="text-white/70 text-sm max-w-sm mx-auto font-medium leading-relaxed">
            A deterministic, isolated-pool examination environment designed for the MAH-CET 2026 aspirants.
          </p>
        </div>

        {/* Enter Button */}
        <button 
          onClick={onEnter}
          className="mt-16 group relative px-12 py-5 bg-white/10 border border-white/20 rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 backdrop-blur-xl shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/40 to-indigo-600/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span className="relative z-10 text-white font-black text-xs uppercase tracking-[0.25em] transition-colors drop-shadow-sm">
            Enter Dashboard
          </span>
        </button>

        {/* Version / Year */}
        <div className="mt-24 flex flex-col items-center gap-2">
          <div className="text-white/20 text-[10px] font-black uppercase tracking-widest">
            Build 2026.04.29-α • Production Grade
          </div>
          <div className="text-white/40 text-[9px] font-bold uppercase tracking-wider">
            Contact: cet2026.support@gmail.com
          </div>
        </div>
      </div>

      {/* Floating Support Button */}
      <div className="absolute bottom-8 right-8 z-20 group">
        <div className="absolute inset-0 bg-blue-600/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="relative w-14 h-14 bg-white/5 border border-white/10 rounded-full flex items-center justify-center backdrop-blur-xl hover:scale-110 active:scale-95 transition-all shadow-2xl"
          title="Contact Support"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2C16.75 2 21 6.25 21 11.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40344C11.0108 7.03877 11.7314 6.89662 12.434 6.99368C13.1366 7.09074 13.7828 7.42152 14.2582 7.92723C14.7337 8.43294 15.0113 9.08537 15.04 9.76999C15.04 11.33 12.71 12.11 12.71 12.11M12.71 16H12.72" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {!isChatOpen && (
          <div className="absolute right-16 top-1/2 -translate-y-1/2 px-4 py-2 bg-white/10 border border-white/10 rounded-xl backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            <span className="text-white text-[10px] font-black uppercase tracking-widest">Support Available</span>
          </div>
        )}
      </div>

      {/* Support Chat Overlay */}
      {isChatOpen && <SupportChat onClose={() => setIsChatOpen(false)} />}

      {/* Decorative lines */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
    </div>
  );
}
