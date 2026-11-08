import React, { useState, useEffect } from 'react';
import { Question, ScaleDefinition } from '../types/clinical';
import { ArrowRight, ArrowLeft, CheckCircle2, LayoutGrid, HelpCircle } from 'lucide-react';
import { VoiceInputAssistant } from './VoiceInputAssistant';

interface QuestionnaireStepProps {
  scale: ScaleDefinition;
  questionIndex: number;
  totalQuestions: number;
  responses: Record<string, number>;
  onSelectOption: (questionId: string, choiceIndex: number) => void;
  onNext: () => void;
  onPrev: () => void;
  onJumpToQuestion: (index: number) => void;
  canGoPrev: boolean;
  theme?: 'dark' | 'light';
}

export const QuestionnaireStep: React.FC<QuestionnaireStepProps> = ({
  scale,
  questionIndex,
  totalQuestions,
  responses,
  onSelectOption,
  onNext,
  onPrev,
  onJumpToQuestion,
  canGoPrev,
  theme = 'dark',
}) => {
  const [showMatrix, setShowMatrix] = useState(false);
  const [validationError, setValidationError] = useState(false);

  const currentQ: Question = scale.questions[questionIndex];
  const currentValue = responses[currentQ.id];
  const isAnswered = currentValue !== undefined;

  // Clear validation error when an option is selected
  useEffect(() => {
    setValidationError(false);
  }, [questionIndex, currentValue]);

  // Handle keyboard 1, 2, 3, 4 shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if inside input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) return;

      const num = parseInt(e.key);
      if (!isNaN(num) && num >= 1 && num <= currentQ.choices.length) {
        onSelectOption(currentQ.id, num - 1);
      } else if (e.key === 'Enter') {
        if (responses[currentQ.id] !== undefined) {
          onNext();
        } else {
          setValidationError(true);
        }
      } else if (e.key === 'ArrowRight' && canGoPrev) {
        onPrev();
      } else if (e.key === 'ArrowLeft' && responses[currentQ.id] !== undefined) {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQ, responses, canGoPrev, onSelectOption, onNext, onPrev]);

  const handleNextClick = () => {
    if (responses[currentQ.id] === undefined) {
      setValidationError(true);
      return;
    }
    onNext();
  };

  // Helper to compute clinical points for display
  const getPointsForChoice = (choiceIdx: number) => {
    if (scale.type === 'gds15') {
      if (currentQ.reverse) {
        return choiceIdx === 1 ? 1 : 0;
      }
      return choiceIdx === 0 ? 1 : 0;
    }
    return choiceIdx;
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Speech-to-Text Microphone Assistant */}
      <VoiceInputAssistant
        currentQuestion={currentQ}
        onSelectOption={onSelectOption}
        onAutoAdvance={handleNextClick}
        theme={theme}
      />

      {/* Top Scale Status Bar */}
      <div className={`p-4 rounded-2xl ${theme === 'dark' ? 'glass-card border-white/5' : 'bg-indigo-50 border-indigo-100 shadow-sm'} border flex flex-wrap justify-between items-center gap-3 transition-colors duration-300`}>
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
          <span className={`text-xs ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-600'}`}>المقياس النشط:</span>
          <strong className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{scale.title}</strong>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowMatrix(!showMatrix)}
            className={`flex items-center gap-1.5 text-xs ${theme === 'dark' ? 'text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border-white/5' : 'text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border-slate-200'} px-2.5 py-1 rounded-lg border transition-colors cursor-pointer shadow-sm`}
            title="استعراض شبكة الأسئلة"
          >
            <LayoutGrid className={`w-3.5 h-3.5 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-500'}`} />
            <span>خريطة الأسئلة ({Object.keys(responses).filter((k) => scale.questions.some((q) => q.id === k)).length}/{totalQuestions})</span>
          </button>

          <span className={`text-xs font-mono tabular-nums ${theme === 'dark' ? 'bg-white/5 text-slate-300 border-white/5' : 'bg-white text-slate-600 border-slate-200'} px-2.5 py-1 rounded-lg border shadow-sm`}>
            {questionIndex + 1} / {totalQuestions}
          </span>
        </div>
      </div>

      {/* Question Navigation Matrix Dropdown */}
      {showMatrix && (
        <div className={`p-4 rounded-2xl ${theme === 'dark' ? 'bg-[#0a0f26] border-indigo-500/30' : 'bg-white border-slate-200 shadow-xl'} border space-y-3 transition-all duration-300`}>
          <div className={`flex justify-between items-center text-xs ${theme === 'dark' ? 'text-slate-300 border-white/5' : 'text-slate-600 border-slate-100'} border-b pb-2`}>
            <span className="font-semibold">الانتقال السريع لأي سؤال في هذا المقياس:</span>
            <div className="flex items-center gap-3 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> مكتمل
              </span>
              <span className="flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-slate-600' : 'bg-slate-200'}`}></span> متبقٍ
              </span>
            </div>
          </div>
          <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-11 gap-1.5">
            {scale.questions.map((q, idx) => {
              const answered = responses[q.id] !== undefined;
              const isCurrent = idx === questionIndex;
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => {
                    onJumpToQuestion(idx);
                    setShowMatrix(false);
                  }}
                  className={`h-8 rounded-lg text-xs font-mono tabular-nums font-semibold transition-all cursor-pointer ${
                    isCurrent
                      ? 'ring-2 ring-purple-400 bg-purple-600 text-white shadow-lg'
                      : answered
                      ? theme === 'dark'
                        ? 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/40'
                        : 'bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                      : theme === 'dark'
                      ? 'bg-white/5 border border-white/5 text-slate-400 hover:bg-white/10'
                      : 'bg-slate-50 border border-slate-200 text-slate-400 hover:bg-slate-100'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Progress Line */}
      <div className={`w-full ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-100'} rounded-full h-1.5 overflow-hidden`}>
        <div
          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-1.5 transition-all duration-300"
          style={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Main Question Card */}
      <div className={`p-6 sm:p-8 rounded-3xl ${theme === 'dark' ? 'glass-card border-white/5 shadow-2xl' : 'bg-white border-slate-200 shadow-md'} border space-y-6 transition-all duration-300`}>
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1">
            <span className={`text-[11px] ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'} font-semibold tracking-wider block uppercase`}>
              السؤال رقم {questionIndex + 1} من {totalQuestions}
            </span>
            <h3 className={`font-semibold text-lg sm:text-xl leading-relaxed ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {currentQ.text}
            </h3>
          </div>
          <span className={`text-[10px] ${theme === 'dark' ? 'bg-purple-500/10 text-purple-300 border-purple-500/20' : 'bg-purple-50 text-purple-600 border-purple-200'} border px-2 py-0.5 rounded font-mono uppercase tracking-wider shrink-0`}>
            {scale.shortCode}
          </span>
        </div>

        {/* Options Grid */}
        <div className="grid gap-3 pt-2">
          {currentQ.choices.map((choiceText, scoreIdx) => {
            const isSelected = currentValue === scoreIdx;
            const points = getPointsForChoice(scoreIdx);

            return (
              <label
                key={scoreIdx}
                onClick={() => onSelectOption(currentQ.id, scoreIdx)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 select-none ${
                  isSelected
                    ? 'border-purple-500 bg-purple-600/15 shadow-[0_0_20px_rgba(168,85,247,0.2)] text-purple-100 font-bold'
                    : theme === 'dark'
                    ? 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:border-white/20'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-white hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'border-purple-400 bg-purple-500 text-white'
                        : 'border-slate-400 bg-transparent'
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                  <span className={`text-sm sm:text-base leading-relaxed ${isSelected ? (theme === 'dark' ? 'text-white' : 'text-purple-900') : ''}`}>
                    {typeof choiceText === 'string' ? choiceText : choiceText.text}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[11px] font-mono ${theme === 'dark' ? 'text-slate-400 bg-black/20 border-white/5' : 'text-slate-500 bg-slate-100 border-slate-200'} px-2 py-0.5 rounded border`}>
                    الوزن: {points}ن
                  </span>
                  <span className={`hidden sm:inline-block text-[10px] ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'} font-mono`}>
                    [{scoreIdx + 1}]
                  </span>
                </div>
              </label>
            );
          })}
        </div>

        {validationError && (
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm flex items-center gap-2 animate-shake">
            <HelpCircle className="w-4 h-4 shrink-0 text-amber-400" />
            <span className={theme === 'dark' ? 'text-amber-300' : 'text-amber-700'}>يرجى اختيار البديل السلوكي الأقرب لحالتك للمتابعة.</span>
          </div>
        )}
      </div>

      {/* Bottom Step Actions */}
      <div className={`flex justify-between items-center border-t ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'} pt-6`}>
        <button
          type="button"
          onClick={onPrev}
          disabled={!canGoPrev}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-2 cursor-pointer ${
            canGoPrev
              ? theme === 'dark'
                ? 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 shadow-sm'
              : 'opacity-30 cursor-not-allowed text-slate-500'
          }`}
        >
          <ArrowRight className="w-4 h-4" />
          <span>السابق</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleNextClick}
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl text-sm transition shadow-lg shadow-purple-950/40 flex items-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            <span>
              {questionIndex === totalQuestions - 1 ? 'الانتقال للقسم التالي' : 'السؤال التالي'}
            </span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
