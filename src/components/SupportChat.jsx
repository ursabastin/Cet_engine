import React, { useState } from 'react';

export default function SupportChat({ onClose }) {
  const [step, setStep] = useState('email'); // 'email' | 'message' | 'sent'
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (step === 'email' && email.includes('@')) {
      setStep('message');
    } else if (step === 'message' && message.trim()) {
      // Simulate sending email to ursabastin@gmail.com
      const subject = `CET 2026 Support Request from ${email}`;
      const body = `From: ${email}\n\nMessage: ${message}`;
      window.location.href = `mailto:ursabastin+cet2026@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStep('sent');
    }
  };

  return (
    <div className="fixed bottom-24 right-8 w-[360px] h-[520px] bg-[#0A0F1E]/95 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col z-50 animate-in slide-in-from-bottom-10 duration-500 border border-white/10">
      
      {/* Header (Instagram Style) */}
      <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-400 via-blue-600 to-purple-600 p-[2px]">
            <div className="w-full h-full rounded-full bg-[#050A18] flex items-center justify-center overflow-hidden border-2 border-[#050A18]">
              <span className="text-[10px] font-black text-blue-400 italic">CET</span>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-black text-white leading-none tracking-tight">System Intelligence</h3>
            <span className="text-[10px] text-green-500 font-bold flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              Operative Access
            </span>
          </div>
        </div>
        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center hover:bg-white/5 rounded-full transition-colors text-white/40 hover:text-white">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Body / Chat Area */}
      <div className="flex-grow p-6 overflow-y-auto flex flex-col gap-5">
        
        {/* Support Message */}
        <div className="max-w-[90%] bg-white/[0.03] border border-white/5 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm backdrop-blur-md">
          <p className="text-[12px] leading-relaxed text-white/80">
            Welcome to CET 2026 Support Interface. 👋 <br /><br />
            To initiate a secure channel, please enter your **valid email address** below.
          </p>
        </div>

        {step === 'message' && (
          <div className="self-end max-w-[85%] bg-blue-600 text-white px-4 py-2.5 rounded-2xl rounded-tr-none shadow-lg shadow-blue-900/20">
            <p className="text-[12px] font-bold tracking-tight">{email}</p>
          </div>
        )}

        {step === 'message' && (
          <div className="max-w-[90%] bg-white/[0.03] border border-white/5 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm">
            <p className="text-[12px] leading-relaxed text-white/80 font-medium">
              Verified. Awaiting your transmission details...
            </p>
          </div>
        )}

        {step === 'sent' && (
          <div className="flex flex-col gap-4 animate-in fade-in duration-500">
            <div className="max-w-[90%] bg-green-500/10 text-green-400 px-4 py-4 rounded-2xl border border-green-500/20">
              <p className="text-[12px] font-black uppercase tracking-widest">✓ Draft Deployed</p>
              <p className="text-[11px] mt-1 opacity-70 leading-relaxed font-medium">
                Internal mail protocol initialized. Please finalize the draft in your system's mail client.
              </p>
            </div>
            
            <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/5">
              <span className="text-[9px] font-black text-blue-400 uppercase tracking-[0.2em] mb-2 block">Manual Backup Hash</span>
              <p className="text-[11px] text-white/60 mb-4 leading-relaxed">If protocol fails, copy the payload below for manual transmission.</p>
              <button 
                onClick={() => {
                  const fullText = `To: ursabastin+cet2026@gmail.com\nSubject: Support Request\n\nFrom: ${email}\n\nMessage: ${message}`;
                  navigator.clipboard.writeText(fullText);
                  alert('Payload copied to memory!');
                }}
                className="w-full py-2.5 bg-blue-600/10 border border-blue-600/20 text-blue-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600/20 transition-all"
              >
                Copy Payload & Address
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer / Input Area */}
      <div className="p-6 bg-white/[0.02] border-t border-white/5 backdrop-blur-xl">
        {step !== 'sent' && (
          <div className="flex flex-col gap-3">
            <div className="relative group">
              <input 
                type={step === 'email' ? 'email' : 'text'}
                placeholder={step === 'email' ? 'Primary Email...' : 'Transmission Content...'}
                value={step === 'email' ? email : message}
                onChange={(e) => step === 'email' ? setEmail(e.target.value) : setMessage(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:ring-2 focus:ring-blue-600/50 outline-none transition-all placeholder:text-white/20"
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 text-white font-black text-[10px] uppercase tracking-widest px-4 py-2 hover:brightness-125 rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-900/40"
              >
                {step === 'email' ? 'Next' : 'Send'}
              </button>
            </div>
            {step === 'email' && (
              <p className="text-[10px] text-white/30 text-center font-bold uppercase tracking-widest">Protocol requires verification</p>
            )}
          </div>
        )}
        {step === 'sent' && (
          <button 
            onClick={onClose}
            className="w-full py-4 bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-white/10 transition-all active:scale-[0.98]"
          >
            Close Interface
          </button>
        )}
      </div>

    </div>
  );
}
