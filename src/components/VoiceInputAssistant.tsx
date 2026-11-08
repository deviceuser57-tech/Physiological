import React, { useState, useEffect, useRef } from 'react';
import { Question } from '../types/clinical';
import { matchSpeechToChoice, MatchResult } from '../utils/speechMatcher';
import { Mic, MicOff, Volume2, Sparkles, AlertCircle, Play } from 'lucide-react';

interface VoiceInputAssistantProps {
  currentQuestion: Question;
  onSelectOption: (questionId: string, choiceIndex: number) => void;
  onAutoAdvance?: () => void;
  theme?: 'dark' | 'light';
}

export const VoiceInputAssistant: React.FC<VoiceInputAssistantProps> = ({
  currentQuestion,
  onSelectOption,
  onAutoAdvance,
  theme = 'dark',
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [autoAdvanceEnabled, setAutoAdvanceEnabled] = useState(true);
  const [isSupported, setIsSupported] = useState(true);

  const recognitionRef = useRef<any>(null);
  const autoAdvanceTimerRef = useRef<any>(null);

  useEffect(() => {
    // Check if Web Speech API is supported
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'ar-SA';
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 3;

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }

        const trimmed = currentTranscript.trim();
        if (trimmed) {
          setTranscript(trimmed);
          handleProcessVoice(trimmed);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setErrorMessage('تم رفض إذن الوصول إلى الميكروفون. يرجى تفعيل الإذن من إعدادات المتصفح.');
          setIsListening(false);
        } else if (event.error === 'no-speech') {
          // ignore silent pause
        } else {
          setErrorMessage(`حدث تنبيه صوتي: ${event.error}`);
        }
      };

      recognition.onend = () => {
        // If still supposed to be listening (e.g. continuous mode)
        if (isListening) {
          try {
            recognition.start();
          } catch {
            setIsListening(false);
          }
        } else {
          setIsListening(false);
        }
      };

      recognitionRef.current = recognition;
    } catch (e) {
      console.warn('Speech recognition setup failed', e);
      setIsSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
      }
    };
  }, []);

  // Process and match voice
  const handleProcessVoice = (spokenText: string) => {
    const match = matchSpeechToChoice(spokenText, currentQuestion);
    if (match) {
      setMatchResult(match);
      setErrorMessage(null);
      // Auto fill the question choice!
      onSelectOption(currentQuestion.id, match.choiceIndex);

      // Auto advance to next question if enabled
      if (autoAdvanceEnabled && onAutoAdvance) {
        if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
        autoAdvanceTimerRef.current = setTimeout(() => {
          onAutoAdvance();
          setTranscript('');
          setMatchResult(null);
        }, 1100);
      }
    }
  };

  const toggleListening = () => {
    setErrorMessage(null);

    if (!isSupported) {
      // If native SpeechRecognition isn't available, provide helpful prompt or simulate
      setErrorMessage('متصفحك لا يدعم التعرف الصوتي المباشر (Web Speech API). ننصح باستخدام متصفح Chrome أو Edge أو Safari.');
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
      setIsListening(false);
    } else {
      setTranscript('');
      setMatchResult(null);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
          setIsListening(true);
        } catch (e) {
          console.warn('Start failed', e);
          setIsListening(true);
        }
      }
    }
  };

  // Quick Simulation Helper for testing or when mic is disabled
  const handleSimulateVoice = (samplePhrase: string) => {
    setTranscript(samplePhrase);
    handleProcessVoice(samplePhrase);
  };

  return (
    <div className={`p-4 sm:p-5 rounded-2xl ${theme === 'dark' ? 'bg-[#090e24] border-purple-500/30' : 'bg-purple-50 border-purple-200 shadow-sm'} border space-y-3.5 transition-all`}>
      {/* Top Header Row */}
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={toggleListening}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-md ${
              isListening
                ? 'bg-rose-600 text-white animate-pulse ring-4 ring-rose-500/30'
                : 'bg-purple-600 hover:bg-purple-500 text-white'
            }`}
            title={isListening ? 'إيقاف الاستماع' : 'تشغيل الميكروفون للإجابة الصوتية'}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs sm:text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                الإجابة الصوتية عبر الميكروفون (Speech-to-Text)
              </span>
              <span className={`text-[10px] ${theme === 'dark' ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' : 'bg-purple-100 text-purple-700 border-purple-200'} px-2 py-0.5 rounded-full font-mono`}>
                تعبئة تلقائية
              </span>
            </div>
            <p className={`text-[11px] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} mt-0.5`}>
              {isListening
                ? 'الميكروفون نشط.. تحدّث بكلمات مثل "أبداً"، "تقريباً كل يوم"، "لا أشعر بالحزن"، أو "الخيار الأول"'
                : 'اضغط على زر الميكروفون وتحدّث بإجابتك ليتم تحديد البديل والانتقال تلقائياً.'}
            </p>
          </div>
        </div>

        {/* Auto-Advance Hands-free Toggle */}
        <label className={`flex items-center gap-2 cursor-pointer text-xs select-none ${theme === 'dark' ? 'bg-white/5 hover:bg-white/10 border-white/5 text-slate-300' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600 shadow-sm'} px-3 py-1.5 rounded-xl border transition-colors`}>
          <input
            type="checkbox"
            checked={autoAdvanceEnabled}
            onChange={(e) => setAutoAdvanceEnabled(e.target.checked)}
            className="w-3.5 h-3.5 accent-purple-500 rounded"
          />
          <span className="text-[11px] font-medium">
            الانتقال التلقائي للسؤال التالي بعد التعرف
          </span>
        </label>
      </div>

      {/* Voice Status Waves / Live Transcript */}
      {isListening && (
        <div className={`flex items-center gap-3 p-3 rounded-xl ${theme === 'dark' ? 'bg-purple-950/30 border-purple-500/30' : 'bg-purple-100 border-purple-200'} border`}>
          <div className="flex items-center gap-1 shrink-0">
            <span className="w-1.5 h-4 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-1.5 h-6 bg-pink-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-1.5 h-3 bg-indigo-400 rounded-full animate-bounce"></span>
          </div>
          <div className="flex-1 text-xs text-slate-200 truncate">
            {transcript ? (
              <span className={`font-medium ${theme === 'dark' ? 'text-purple-200' : 'text-purple-800'}`}>
                سمعت: &ldquo;{transcript}&rdquo;
              </span>
            ) : (
              <span className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} animate-pulse`}>
                جاري الاستماع لصوتك.. تفضل بالتحدث
              </span>
            )}
          </div>
        </div>
      )}

      {/* Recognized Match Feedback Card */}
      {matchResult && (
        <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-700'} border flex items-center justify-between gap-3 text-xs animate-fadeIn`}>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <span className="font-bold">تم التعرف والتعبئة بنجاح:</span>{' '}
              <span className={`${theme === 'dark' ? 'text-white' : 'text-slate-900'} underline underline-offset-2`}>
                {matchResult.matchedText}
              </span>
              <span className={`text-[11px] ${theme === 'dark' ? 'text-emerald-400/80' : 'text-emerald-600/80'} mr-2 font-mono`}>
                ({matchResult.reason})
              </span>
            </div>
          </div>
          {autoAdvanceEnabled && (
            <span className={`text-[10px] ${theme === 'dark' ? 'bg-emerald-500/20' : 'bg-emerald-100'} px-2 py-0.5 rounded font-mono shrink-0`}>
              الانتقال جارٍ...
            </span>
          )}
        </div>
      )}

      {/* Error / Fallback info */}
      {errorMessage && (
        <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-amber-500/10 border-amber-500/25 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-800'} border text-xs flex items-center justify-between gap-2`}>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
            <span>{errorMessage}</span>
          </div>
        </div>
      )}

      {/* Quick Voice Simulation Buttons (Allows instant testing with 1 click) */}
      <div className={`flex flex-wrap items-center gap-1.5 pt-1 text-[11px] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
        <span className="flex items-center gap-1">
          <Volume2 className="w-3.5 h-3.5 text-purple-400" />
          <span>أمثلة سريعة للتجربة الصوتية:</span>
        </span>
        {currentQuestion.choices.slice(0, 4).map((choice, idx) => {
          const label = typeof choice === 'string' ? choice : choice.text;
          const shortLabel = label.split(' ')[0] + ' ' + (label.split(' ')[1] || '');
          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleSimulateVoice(label)}
              className={`px-2 py-0.5 rounded-md ${theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border-white/5' : 'bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border-slate-200 shadow-sm'} border transition-colors cursor-pointer flex items-center gap-1 font-mono text-[10px]`}
            >
              <Play className="w-2.5 h-2.5 text-purple-400" />
              <span>&ldquo;{shortLabel}...&rdquo;</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
