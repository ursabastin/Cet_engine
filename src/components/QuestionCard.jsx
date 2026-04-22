import React, { useState } from 'react';

export default function QuestionCard({ 
  question, 
  index, 
  total, 
  selectedAnswer, 
  onSelect, 
  isPractice,
  readOnly 
}) {
  if (!question) return <div className="p-8 text-center text-text-secondary">Loading question...</div>;

  const subjectColors = {
    english: 'bg-accent-blue',
    reasoning: 'bg-purple-600',
    gk: 'bg-accent-green',
    computer: 'bg-accent-amber'
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-2 animate-in fade-in slide-in-from-bottom-1 duration-300">
      {/* Header Info - Compact */}
      <div className="flex items-center justify-between mb-4 px-2">
        <span className={`px-3 py-1 !text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-lg shadow-xl backdrop-blur-md border border-white/10 ${subjectColors[question.subject] || 'bg-accent-blue'}`}>
          {question.subject}
        </span>
        <span className="text-[10px] font-black !text-white/30 uppercase tracking-[0.2em]">
          Q. {index + 1} <span className="opacity-40 ml-1">/ {total}</span>
        </span>
      </div>

      {/* Question Text - More standard size */}
      <div className="mb-6 px-2">
        <h2 className="text-xl font-bold !text-white leading-relaxed tracking-tight whitespace-pre-wrap" style={{ wordSpacing: '0.1em' }}>
          {(() => {
            const rawText = question.text || question.question_text || question.question || question.q || '';
            return typeof rawText === 'object' ? (rawText.text || JSON.stringify(rawText)) : rawText;
          })()}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-2.5 w-full">
        {question.options.map((option, i) => {
          // Safety: Handle both string and object formats {id, text}
          const optionText = typeof option === 'object' ? (option.text || option.label || JSON.stringify(option)) : option;
          
          const isSelected = selectedAnswer === i;
          const letter = String.fromCharCode(65 + i);
          const correctLetter = question.correct || question.correct_option;
          const isCorrect = readOnly && letter === correctLetter;
          const isWrong = readOnly && isSelected && letter !== correctLetter;

          let borderClass = "border-white/5 bg-white/[0.02]";
          let textClass = "!text-white/60";
          let circleClass = "bg-white/5 !text-white/30 border-white/5";

          if (isSelected && !readOnly) {
            borderClass = "border-blue-500/40 bg-blue-600/10 shadow-[0_0_30px_rgba(37,99,235,0.08)]";
            textClass = "!text-white";
            circleClass = "bg-blue-600 !text-white border-blue-500";
          }

          if (isCorrect) {
            borderClass = "border-green-500/40 bg-green-600/10";
            textClass = "!text-white";
            circleClass = "bg-green-600 !text-white border-green-500";
          } else if (isWrong) {
            borderClass = "border-red-500/40 bg-red-600/10";
            textClass = "!text-white";
            circleClass = "bg-red-600 !text-white border-red-500";
          }

          return (
            <button
              key={i}
              onClick={() => onSelect(i)}
              disabled={readOnly}
              className={`group flex items-center p-3.5 rounded-2xl border backdrop-blur-xl transition-all duration-200 text-left w-full ${borderClass} ${!readOnly && "hover:bg-white/[0.05] hover:border-white/10 hover:translate-x-1"}`}
            >
              <div className={`w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-xl border font-black text-xs mr-5 transition-all duration-200 ${circleClass}`}>
                {letter}
              </div>
              <span className={`text-base font-medium transition-all duration-200 ${textClass}`}>
                {optionText}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
