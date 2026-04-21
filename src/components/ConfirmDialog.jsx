import React from 'react';

export default function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel, confirmText = "Confirm" }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="bg-[#0A0F1E]/90 backdrop-blur-2xl rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-white/10 animate-in fade-in zoom-in duration-300">
        <h3 className="text-xl font-black text-white mb-2 tracking-tight">{title}</h3>
        <p className="text-sm text-white/60 leading-relaxed mb-8 font-medium">{message}</p>
        
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 h-12 rounded-xl font-black text-xs uppercase tracking-widest text-white/40 bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 h-12 rounded-xl font-black text-xs uppercase tracking-widest text-white bg-blue-600 hover:brightness-110 transition-all shadow-xl shadow-blue-900/20"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
