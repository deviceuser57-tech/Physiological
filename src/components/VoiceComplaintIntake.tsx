import React, { useState, useEffect, useRef } from 'react';
import { AiScaleRecommendation, DemographicContext } from '../types/clinical';
import { analyzePatientComplaint } from '../utils/aiRecommender';
import {
  Mic,
  MicOff,
  Sparkles,
  Timer,
  Check,
  AlertCircle,
  Stethoscope,
  Volume2,
  Play,
  RotateCcw,
} from 'lucide-react';

interface VoiceComplaintIntakeProps {
  demographics: DemographicContext;
  onApplyRecommendation: (rec: AiScaleRecommendation) => void;
  onComplaintChange: (text: string) => void;
  theme?: 'dark' | 'light';
}

export const VoiceComplaintIntake: React.FC<VoiceComplaintIntakeProps> = ({
  demographics,
  onApplyRecommendation,
  onComplaintChange,
  theme = 'dark',
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(180); // 3 minutes = 180 seconds
  const [complaintText, setComplaintText] = useState(demographics.voiceComplaint || '');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<AiScaleRecommendation | null>(
    demographics.aiRecommendation || null
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [extractedNotice, setExtractedNotice] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const timerIntervalRef = useRef<any>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'ar-SA';
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript + ' ';
        }

        const trimmed = currentTranscript.trim();
        if (trimmed) {
          setComplaintText(trimmed);
          onComplaintChange(trimmed);
        }
      };

      recognition.onerror = (event: any) => {
        if (event.error === 'not-allowed') {
          setErrorMessage('تم حظر الوصول إلى الميكروفون. يرجى السماح بالإذن في المتصفح.');
          stopRecording();
        }
      };

      recognition.onend = () => {
        if (isRecording) {
          try {
            recognition.start();
          } catch {}
        }
      };

      recognitionRef.current = recognition;
    } catch (e) {
      console.warn('Speech setup failed', e);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isRecording, onComplaintChange]);

  const startRecording = () => {
    setErrorMessage(null);
    setSecondsRemaining(180);
    setIsRecording(true);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.warn('Speech start', e);
      }
    }

    // Start 3-minute countdown timer
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          stopRecording();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }
  };

  const handleAnalyze = async () => {
    if (!complaintText.trim()) {
      setErrorMessage('يرجى التحدث بالشكوى أولاً أو كتابتها في الحقل لتحليلها بالذكاء الاصطناعي.');
      return;
    }

    setIsAnalyzing(true);
    setErrorMessage(null);
    setExtractedNotice(null);

    try {
      const rec = await analyzePatientComplaint(complaintText, demographics);
      setAiResult(rec);
      // Auto-apply extracted demographics if they exist to discharge data into the model immediately
      if (rec.extractedData && Object.keys(rec.extractedData).length > 0) {
        onApplyRecommendation(rec);
        const namePart = rec.extractedData.name ? `للمريض (${rec.extractedData.name})` : '';
        const agePart = rec.extractedData.age ? `، عمره ${rec.extractedData.age} سنة` : '';
        const titlePart = rec.extractedData.caseTitle ? ` بعنوان: "${rec.extractedData.caseTitle}"` : '';
        setExtractedNotice(`✓ تم استخراج وتعبئة كافة البيانات المتاحة ${namePart}${agePart}${titlePart} بنجاح في نموذج الحالة أدناه.`);
      } else {
        onApplyRecommendation(rec);
        setExtractedNotice('✓ تم تحليل الشكوى واقتراح بطارية المقاييس بنجاح.');
      }
    } catch (err) {
      setErrorMessage('تعذر إكمال التحليل الآلي، يرجى المحاولة مرة أخرى.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleApply = () => {
    if (aiResult) {
      onApplyRecommendation(aiResult);
      setExtractedNotice('✓ تم اعتماد وتطبيق التوصيات على بطارية المقاييس ونموذج الحالة.');
    }
  };

  // Format seconds mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Sample quick complaints
  const sampleComplaints = [
    {
      title: 'حالة حسام (صدمة وانفصال وتقاعد)',
      text: 'ذكر إسمه حسام عمرة 47 سنه تعرض لخيانة من زوجتة أصيب علي أثرها بصدمة عصبية بعد زواج 20 عام وتعرض لفقد وظيفتة مما أدي إلي انه انفصل عن زوجتة ويعاني من ملل شديد وضجر دائم منذ تقاعدي، أشعر بأن حياتي أصبحت فارغة تماماً من الهدف وأنني أصبحت عالة على من حولي وضعف تركيزي.',
    },
    {
      title: 'شكوى توتر وقلق حاد',
      text: 'أشعر بإرهاق شديد منذ أسبوعين مع خفقان مستمر وتسارع بضربات القلب، وضيق تنفس عند التفكير بالعمل والالتزامات، ونومي متقطع وغير مريح.',
    },
    {
      title: 'شكوى عسر مزاج ويأس معرفي',
      text: 'أشعر بالحزن طوال اليوم وفقدت متعة أي شيء، ولدي إحساس كبير بالفشل والذنب تجاه أسرتي، وأشعر أن المستقبل مسدود ولا فائدة من المحاولة.',
    },
  ];

  return (
    <div className={`p-5 sm:p-6 rounded-2xl border ${theme === 'dark' ? 'bg-[#090d22] border-indigo-500/30' : 'bg-white border-slate-200 shadow-sm'} space-y-5 animate-fadeIn transition-colors duration-300`}>
      {/* Section Header */}
      <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'} pb-4`}>
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse"></span>
            <h3 className={`text-sm sm:text-base font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              شكوى المريض الحرة بالصوت (نافذة استماع حتى ٣ دقائق)
            </h3>
          </div>
          <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} mt-1 leading-relaxed`}>
            يتيح للمريض التحدث بحديث حر وعفوي عما يؤرقه، ليقوم الذكاء الاصطناعي باستخلاص الأعراض واقتراح المقاييس الأنسب على الطبيب مع بقاء القرار النهائي الكامل للطبيب المعالج.
          </p>
        </div>

        {/* Timer display */}
        <div className={`flex items-center gap-2 font-mono text-xs ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'} px-3 py-1.5 rounded-xl border shrink-0`}>
          <Timer className="w-4 h-4 text-purple-400" />
          <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>الوقت المتبقي:</span>
          <span
            className={`font-bold tabular-nums ${
              isRecording ? 'text-purple-500 animate-pulse' : (theme === 'dark' ? 'text-white' : 'text-slate-900')
            }`}
          >
            {formatTime(secondsRemaining)}
          </span>
        </div>
      </div>

      {/* Recording Control & Audio Visualizer Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          type="button"
          onClick={isRecording ? stopRecording : startRecording}
          className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-lg w-full sm:w-auto ${
            isRecording
              ? 'bg-rose-600 hover:bg-rose-500 text-white ring-4 ring-rose-500/30 animate-pulse'
              : 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-950/50'
          }`}
        >
          {isRecording ? (
            <>
              <MicOff className="w-4 h-4" />
              <span>إيقاف الاستماع الصوتي</span>
            </>
          ) : (
            <>
              <Mic className="w-4 h-4" />
              <span>بدء تسجيل الشكوى الصوتية (3 دقائق)</span>
            </>
          )}
        </button>

        {isRecording && (
          <div className="flex-1 flex items-center gap-2 text-xs text-purple-300">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
            <span>المايكروفون يستمع لصوت المريض الآن.. تحدّث بحرية عن مشاعرك وأعراضك</span>
          </div>
        )}

        <div className="flex items-center gap-2 mr-auto w-full sm:w-auto">
          <button
            type="button"
            onClick={handleAnalyze}
            disabled={isAnalyzing || !complaintText.trim()}
            className={`flex-1 sm:flex-none px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer ${
              !complaintText.trim()
                ? 'bg-white/5 text-slate-500 border border-white/5 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-md'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{isAnalyzing ? 'جاري التحليل السريري...' : 'تحليل الشكوى واقتراح المقاييس للطبيب'}</span>
          </button>
        </div>
      </div>

      {/* Transcript Text Area (Editable & Real-Time) */}
      <div className="space-y-1.5">
        <div className={`flex justify-between items-center text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
          <span>نص شكوى المريض المنطوقة (يمكن التعديل أو الكتابة المباشرة هنا):</span>
          {complaintText && (
            <button
              type="button"
              onClick={() => {
                setComplaintText('');
                onComplaintChange('');
                setAiResult(null);
              }}
              className={`text-[11px] ${theme === 'dark' ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'} flex items-center gap-1 cursor-pointer`}
            >
              <RotateCcw className="w-3 h-3" />
              <span>مسح النص</span>
            </button>
          )}
        </div>
        <textarea
          rows={3}
          value={complaintText}
          onChange={(e) => {
            setComplaintText(e.target.value);
            onComplaintChange(e.target.value);
          }}
          placeholder="تحدث بصوتك عبر الميكروفون أو اكتب هنا تفاصيل الشكوى (مثال: أعاني من أرق مستمر، تعب سريع، خفقان، مشاعر حزن، توتر في العمل، لوم مستمر لنفسي...)"
          className={`w-full ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'} border rounded-xl p-3.5 text-xs sm:text-sm focus:outline-none focus:border-purple-500 transition-colors leading-relaxed`}
        />
      </div>

      {/* Sample presets for fast testing */}
      <div className={`flex flex-wrap items-center gap-2 text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} pt-1`}>
        <span className="flex items-center gap-1 text-[11px]">
          <Volume2 className="w-3.5 h-3.5 text-purple-400" />
          <span>نماذج شكاوى جاهزة للتجربة السريعة:</span>
        </span>
        {sampleComplaints.map((item, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setComplaintText(item.text);
              onComplaintChange(item.text);
            }}
            className={`px-2.5 py-1 rounded-lg ${theme === 'dark' ? 'bg-white/5 border-white/5 text-slate-300 hover:text-white hover:bg-white/10' : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200 hover:text-slate-900'} border transition-colors text-[11px] flex items-center gap-1 cursor-pointer`}
          >
            <Play className="w-2.5 h-2.5 text-purple-400" />
            <span>{item.title}</span>
          </button>
        ))}
      </div>

      {errorMessage && (
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {extractedNotice && (
        <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm flex items-center gap-2.5 animate-fadeIn">
          <Sparkles className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>{extractedNotice}</span>
        </div>
      )}

      {/* AI Recommendation Consultation Output Card */}
      {aiResult && (
        <div className={`p-5 rounded-2xl ${theme === 'dark' ? 'bg-indigo-950/40 border-indigo-500/40' : 'bg-indigo-50 border-indigo-200 shadow-xl'} border-2 space-y-4 animate-fadeIn`}>
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shrink-0">
                <Stethoscope className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'} flex items-center gap-2`}>
                  <span>اقتراح الذكاء الاصطناعي الاستشاري الموجه للطبيب</span>
                  <span className={`text-[10px] ${theme === 'dark' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-100 text-indigo-700'} px-2 py-0.5 rounded font-mono`}>
                    توصية استرشادية
                  </span>
                </h4>
                <p className={`text-[11px] ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} mt-0.5`}>
                  بناءً على تحليل الشكوى الصوتية لـ ({demographics.name || 'المريض'}).
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleApply}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-950/40"
            >
              <Check className="w-4 h-4" />
              <span>تطبيق توصية المقاييس المقترحة</span>
            </button>
          </div>

          {/* Primary extracted symptoms */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <div className={`text-xs font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                المظاهر العيادية والأعراض المستخلصة:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {aiResult.primarySymptoms.map((sym, idx) => (
                  <span
                    key={idx}
                    className={`text-[11px] ${theme === 'dark' ? 'bg-white/5 border-white/10 text-slate-200' : 'bg-white border-slate-200 text-slate-700'} px-2.5 py-1 rounded-lg border`}
                  >
                    {sym}
                  </span>
                ))}
              </div>
            </div>

            {aiResult.extractedData && (
              <div className="space-y-1.5">
                <div className={`text-xs font-semibold ${theme === 'dark' ? 'text-emerald-300' : 'text-emerald-700'} flex items-center gap-1`}>
                  <Sparkles className="w-3 h-3" />
                  <span>بيانات ديموغرافية مستخرجة آلياً:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {aiResult.extractedData.name && (
                    <span className={`text-[10px] ${theme === 'dark' ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' : 'bg-emerald-50 text-emerald-700 border-emerald-200'} px-2 py-0.5 rounded border`}>
                      الاسم: {aiResult.extractedData.name}
                    </span>
                  )}
                  {aiResult.extractedData.age && (
                    <span className={`text-[10px] ${theme === 'dark' ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' : 'bg-emerald-50 text-emerald-700 border-emerald-200'} px-2 py-0.5 rounded border`}>
                      العمر: {aiResult.extractedData.age}
                    </span>
                  )}
                  {aiResult.extractedData.gender && (
                    <span className={`text-[10px] ${theme === 'dark' ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' : 'bg-emerald-50 text-emerald-700 border-emerald-200'} px-2 py-0.5 rounded border`}>
                      النوع: {aiResult.extractedData.gender === 'male' ? 'ذكر' : 'أنثى'}
                    </span>
                  )}
                  {aiResult.extractedData.social && (
                    <span className={`text-[10px] ${theme === 'dark' ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' : 'bg-emerald-50 text-emerald-700 border-emerald-200'} px-2 py-0.5 rounded border`}>
                      الحالة: {aiResult.extractedData.social}
                    </span>
                  )}
                  {aiResult.extractedData.job && (
                    <span className={`text-[10px] ${theme === 'dark' ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' : 'bg-emerald-50 text-emerald-700 border-emerald-200'} px-2 py-0.5 rounded border`}>
                      العمل: {aiResult.extractedData.job}
                    </span>
                  )}
                  {(aiResult.voiceTone || aiResult.extractedData.voiceTone) && (
                    <span className={`text-[10px] ${theme === 'dark' ? 'bg-amber-500/10 text-amber-300 border-amber-500/20' : 'bg-amber-50 text-amber-700 border-amber-200'} px-2 py-0.5 rounded border flex items-center gap-1`}>
                      <Volume2 className="w-2.5 h-2.5" />
                      النبرة: {aiResult.voiceTone || aiResult.extractedData.voiceTone}
                    </span>
                  )}
                  {(aiResult.speechRate || aiResult.extractedData.speechRate) && (
                    <span className={`text-[10px] ${theme === 'dark' ? 'bg-blue-500/10 text-blue-300 border-blue-500/20' : 'bg-blue-50 text-blue-700 border-blue-200'} px-2 py-0.5 rounded border flex items-center gap-1`}>
                      <Timer className="w-2.5 h-2.5" />
                      السرعة: {aiResult.speechRate || aiResult.extractedData.speechRate}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Clinical Justification Rationale */}
          <div className={`p-3.5 rounded-xl ${theme === 'dark' ? 'bg-black/20 border-white/5 text-slate-300' : 'bg-slate-50 border-slate-100 text-slate-600'} border space-y-1 text-xs`}>
            <div className={`font-bold ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-700'}`}>التعليل السريري لاقتراح الاختبارات:</div>
            <p className="leading-relaxed">{aiResult.rationale}</p>
          </div>

          {/* Recommended Scales Flags Preview */}
          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
            <span className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} font-semibold`}>المقاييس المقترح تفعيلها:</span>
            {aiResult.recommendedScales.phq9 && (
              <span className={`px-2.5 py-0.5 ${theme === 'dark' ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' : 'bg-indigo-50 text-indigo-700 border-indigo-200'} rounded font-mono font-bold border`}>
                PHQ-9 (السريري)
              </span>
            )}
            {aiResult.recommendedScales.bdi2 && (
              <span className={`px-2.5 py-0.5 ${theme === 'dark' ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' : 'bg-purple-50 text-purple-700 border-purple-200'} rounded font-mono font-bold border`}>
                BDI-II (المعرفي)
              </span>
            )}
            {aiResult.recommendedScales.dass21 && (
              <span className={`px-2.5 py-0.5 ${theme === 'dark' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-amber-50 text-amber-700 border-amber-200'} rounded font-mono font-bold border`}>
                DASS-21 (التوتر والقلق)
              </span>
            )}
            {aiResult.recommendedScales.gds15 && (
              <span className={`px-2.5 py-0.5 ${theme === 'dark' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-emerald-50 text-emerald-700 border-emerald-200'} rounded font-mono font-bold border`}>
                GDS-15 (الرضا العام)
              </span>
            )}
          </div>

          {/* Doctor Authority Disclaimer */}
          <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-purple-950/20 border-purple-500/20 text-purple-300' : 'bg-purple-50 border-purple-200 text-purple-800'} border text-xs flex items-center gap-2`}>
            <AlertCircle className="w-4 h-4 shrink-0 text-purple-400" />
            <span>
              <strong>تأكيد سيادي للطبيب:</strong> توصيات الذكاء الاصطناعي استرشادية، وتعبئة البيانات تلقائياً توفر الوقت، وللطبيب الصلاحية الكاملة في المراجعة والتعديل النهائي.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
