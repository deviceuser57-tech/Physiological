import React, { useState, useEffect } from 'react';
import { ClinicalMemoryCase } from '../types/clinical';
import {
  Brain,
  Database,
  TrendingUp,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  FileDown,
  Sparkles,
  Award,
  BookOpen,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

const INITIAL_MEMORY_CASES: ClinicalMemoryCase[] = [
  {
    id: 'case_seed_1',
    timestamp: '2026-11-04',
    patientAlias: 'محمود (34 سنة)',
    age: 34,
    gender: 'male',
    district: 'إمبابة - الجيزة',
    complaintSummary: 'أرق مستمر منذ شهرين مع ضيق في الصدر وفقدان الطاقة، مرتبط بضغط العمل والديون.',
    aiSuggestedScales: ['PHQ-9', 'ISI', 'PSS-10'],
    aiInitialSeverity: 'أعراض اكتئابية وتوتر حاد (درجة موزونة 62%)',
    psychometricScoresSummary: 'درجة خام: 68% | معايرة بيئية: 54% (خصم +20% كثافة وضغوط مالية)',
    doctorFinalDiagnosis: 'اضطراب التكيف مع عسر المزاج التفاعلي للأزمة الاقتصادية (F43.21)',
    doctorSeverity: 'mild',
    doctorClinicalEtiology: 'reactive_environmental',
    doctorNotes: 'الحالة تفاعلية بحتة؛ المريض لا يعاني من بطء نفسي حركي أو يأس ذاتي، بل إنهاك جسدي ناجم عن العمل 14 ساعة يومياً. لا حاجة لمضادات الاكتئاب.',
    concordanceStatus: 'تعديل جزئي',
    learnedInsight: 'الدرس المكتسب: عند تزامن اضطراب النوم مع ساعات عمل طويلة وضائقة اقتصادية، ينبغي عدم تصنيف نقص الطاقة كعلامة اكتئاب بيولوجي رئيسي، بل إعطاء الأولوية لمقياس ISI وعلاج الأرق والتنشيط السلوكي.',
  },
  {
    id: 'case_seed_2',
    timestamp: '2026-11-02',
    patientAlias: 'سارة (26 سنة)',
    age: 26,
    gender: 'female',
    district: 'المعادي - القاهرة',
    complaintSummary: 'خوف شديد من المقابلات الوظيفية، تسارع ضربات القلب وتوقع الفشل المستمر ولوم الذات.',
    aiSuggestedScales: ['GAD-7', 'BDI-II'],
    aiInitialSeverity: 'قلق معمم وتوتر معرفي متوسط (درجة موزونة 48%)',
    psychometricScoresSummary: 'درجة خام: 45% | معايرة بيئية: 42% (بيئة سكنية مستقرة)',
    doctorFinalDiagnosis: 'اضطراب القلق العام مع تفكير كارثي (F41.1)',
    doctorSeverity: 'moderate',
    doctorClinicalEtiology: 'mixed',
    doctorNotes: 'التشخيص متطابق مع تقرير الذكاء؛ التشوه المعرفي الأساسي هو الكارثية وقراءة الأفكار. موصى بـ 10 جلسات CBT لإعادة الهيكلة المعرفية.',
    concordanceStatus: 'متطابق بالكامل',
    learnedInsight: 'الدرس المكتسب: دقة عالية في ربط بنود قلق المستقبل في BDI-II مع GAD-7 في البيئات منخفضة الاحتكاك الحركي.',
  },
  {
    id: 'case_seed_3',
    timestamp: '2026-10-28',
    patientAlias: 'طارق (42 سنة)',
    age: 42,
    gender: 'male',
    district: 'عين شمس - القاهرة',
    complaintSummary: 'انخفاض الشغف والملل الشديد والشعور بالفراغ بعد فقدان الشراكة التجارية.',
    aiSuggestedScales: ['PHQ-9', 'DASS-21', 'GDS-15'],
    aiInitialSeverity: 'مؤشرات كدر واكتئاب متوسطة (درجة موزونة 55%)',
    psychometricScoresSummary: 'درجة خام: 60% | معايرة بيئية: 48%',
    doctorFinalDiagnosis: 'رد فعل الحزن والحداد التكيفي غير المرضي (Bereavement/Loss)',
    doctorSeverity: 'mild',
    doctorClinicalEtiology: 'situational_crisis',
    doctorNotes: 'رد فعل طبيعي وصحي لفقدان مصدر الرزق والشريك؛ إعطاء وقت للتكيف ومساندة اجتماعية أسبوعية بدلاً من التسمية المرضية.',
    concordanceStatus: 'تباين وتشخيص بديل',
    learnedInsight: 'الدرس المكتسب: التمييز بين عسر المزاج المرضي والحزن الطبيعي بعد الفقدان (Loss-induced grief)؛ يجب توخي الحذر في عدم تحويل ردود الفعل الإنسانية السوية تجاه الخسارة إلى اعتلالات سريرية.',
  },
];

import { clinicalAuthService } from '../services/clinicalAuth';
import { Lock, KeyRound, ShieldAlert, UserCheck, Stethoscope } from 'lucide-react';

interface ClinicalMemoryBankViewProps {
  customCases?: ClinicalMemoryCase[];
  theme?: 'dark' | 'light';
}

export const ClinicalMemoryBankView: React.FC<ClinicalMemoryBankViewProps> = ({ customCases = [], theme = 'dark' }) => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => clinicalAuthService.isMemoryBankUnlocked());
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const currentStaff = clinicalAuthService.getCurrentStaff();

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (clinicalAuthService.unlockMemoryBank(pinInput)) {
      setIsUnlocked(true);
      setPinError('');
      setPinInput('');
    } else {
      setPinError('رمز الأمان غير صحيح. يرجى إدخال رمز الطبيب المعالج المصرح له (الافتراضي: 123456)');
    }
  };

  const handleLock = () => {
    clinicalAuthService.lockMemoryBank();
    setIsUnlocked(false);
  };

  const [cases, setCases] = useState<ClinicalMemoryCase[]>(() => {
    try {
      const stored = localStorage.getItem('psychocontext_memory_cases');
      if (stored) {
        const parsed = JSON.parse(stored);
        return [...customCases, ...parsed.filter((p: ClinicalMemoryCase) => !customCases.some((c) => c.id === p.id))];
      }
      return [...customCases, ...INITIAL_MEMORY_CASES];
    } catch {
      return [...customCases, ...INITIAL_MEMORY_CASES];
    }
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterConcordance, setFilterConcordance] = useState<string>('all');

  useEffect(() => {
    try {
      localStorage.setItem('psychocontext_memory_cases', JSON.stringify(cases));
    } catch (e) {
      console.warn('Failed to save memory cases', e);
    }
  }, [cases]);

  // If customCases prop changes, integrate it
  useEffect(() => {
    if (customCases.length > 0) {
      setCases((prev) => {
        const merged = [...customCases];
        prev.forEach((p) => {
          if (!merged.some((m) => m.id === p.id)) {
            merged.push(p);
          }
        });
        return merged;
      });
    }
  }, [customCases]);

  // Concordance Metrics
  const totalCases = cases.length;
  const fullConcordanceCount = cases.filter((c) => c.concordanceStatus === 'متطابق بالكامل').length;
  const partialConcordanceCount = cases.filter((c) => c.concordanceStatus === 'تعديل جزئي').length;
  const alternativeCount = cases.filter((c) => c.concordanceStatus === 'تباين وتشخيص بديل').length;

  const fullConcordanceRate = totalCases > 0 ? Math.round((fullConcordanceCount / totalCases) * 100) : 0;
  const partialRate = totalCases > 0 ? Math.round((partialConcordanceCount / totalCases) * 100) : 0;

  // Filtered cases
  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.patientAlias.includes(searchTerm) ||
      c.doctorFinalDiagnosis.includes(searchTerm) ||
      c.learnedInsight.includes(searchTerm) ||
      c.district.includes(searchTerm);

    const matchesConcordance =
      filterConcordance === 'all' || c.concordanceStatus === filterConcordance;

    return matchesSearch && matchesConcordance;
  });

  const handleExportMemory = () => {
    const blob = new Blob([JSON.stringify(cases, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `clinical-memory-bank-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // If the memory bank is locked, render the high-security Doctor Lock Screen
  if (!isUnlocked) {
    const isManager = currentStaff?.role === 'clinic_manager';

    return (
      <div className="py-12 px-4 max-w-xl mx-auto animate-fadeIn">
        <div className={`p-8 rounded-3xl border text-center space-y-6 ${
          theme === 'dark' 
            ? 'bg-gradient-to-b from-[#0c1228] to-[#070b19] border-purple-500/30 shadow-2xl shadow-purple-950/40' 
            : 'bg-white border-purple-200 shadow-xl'
        }`}>
          {/* Lock Icon with pulses */}
          <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-purple-500/20 animate-ping opacity-30" />
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-900/50">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border mb-2 text-purple-400 bg-purple-500/10 border-purple-500/20">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>منطقة محمية بالسرية الطبية الحصرية</span>
            </div>
            <h3 className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              بنك الذاكرة السريرية والملفات التعليمية
            </h3>
            <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} mt-2 leading-relaxed max-w-md mx-auto`}>
              يخضع هذا القسم لحماية مشددة ولا يُفتح إلا بمعرفة وموافقة <strong className="text-purple-400">الطبيب المعالج نفسه</strong> للحفاظ على أسرار الحالات والدروس المستفادة.
            </p>
          </div>

          {isManager && (
            <div className={`p-4 rounded-2xl border text-right text-xs space-y-1.5 ${
              theme === 'dark' ? 'bg-amber-950/30 border-amber-500/30 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}>
              <div className="font-bold flex items-center gap-1.5 text-amber-400">
                <AlertCircle className="w-4 h-4" />
                <span>تنبيه لمدير العيادة:</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                أنت مسجل حالياً بصلاحية <strong>[مدير العيادة]</strong>. صلاحياتك مخصصة للجانب الإداري والسجلات، بينما بنك الذاكرة ومقارنة التشخيصات مقتصر حصرياً على الطبيب المعالج.
              </p>
            </div>
          )}

          {/* Unlock PIN / Password Form */}
          <form onSubmit={handleUnlock} className="space-y-4 pt-2">
            <div className="space-y-1.5 text-right">
              <label className={`block text-xs font-bold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                أدخل رمز أمان الطبيب أو كلمة المرور لفك القفل:
              </label>
              <div className="relative">
                <KeyRound className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="رمز الطبيب (الافتراضي: 123456)"
                  className={`w-full pr-10 pl-4 py-3 rounded-xl border text-xs focus:outline-none focus:border-purple-500 font-mono ${
                    theme === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                  autoFocus
                />
              </div>
            </div>

            {pinError && (
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{pinError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-purple-950/40 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>فك قفل بنك الذاكرة والدخول كطبيب</span>
            </button>

            <div className="text-[11px] text-slate-500 flex items-center justify-center gap-2 pt-1 font-mono">
              <Stethoscope className="w-3.5 h-3.5 text-purple-400" />
              <span>الرمز السري المعتمد للطبيب: 123456</span>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>
        <div>
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${theme === 'dark' ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' : 'bg-purple-50 border-purple-200 text-purple-700'} border text-xs font-semibold mb-2`}>
            <Brain className="w-3.5 h-3.5" />
            <span>الذاكرة المرجعية التراكمية ونموذج التعلّم السريري</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'} tracking-tight`}>
            الملف التعليمي وبنك الذاكرة السريرية للذكاء الاصطناعي
          </h2>
          <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} mt-1 max-w-2xl leading-relaxed`}>
            يتعلم النظام باستمرار من مقارنة فرزه الأولي مع القرارات السريرية النهائية للأطباء؛ حيث تُحفظ ملفات الحالات كمرجعية تعليمية لتهذيب النماذج والحد من الإفراط التشخيصي.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={handleLock}
            className={`px-3 py-2 border rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
              theme === 'dark' ? 'bg-rose-500/10 border-rose-500/20 text-rose-300 hover:bg-rose-500/20' : 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100'
            }`}
            title="إعادة قفل بنك الذاكرة فوراً لمنع غير المصرح لهم"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>قفل الذاكرة</span>
          </button>

          <button
            type="button"
            onClick={handleExportMemory}
            className={`px-4 py-2 ${theme === 'dark' ? 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'} border rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-sm`}
          >
            <FileDown className="w-3.5 h-3.5 text-indigo-500" />
            <span>تصدير (JSON)</span>
          </button>
        </div>
      </div>

      {/* Analytics & Concordance KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'} border`}>
          <div className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>إجمالي الحالات المرجعية</div>
          <div className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'} mt-1 font-mono`}>{totalCases}</div>
          <div className={`text-[11px] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} mt-0.5`}>ملف عيادي مخزن ومحلل</div>
        </div>

        <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-emerald-50 border-emerald-200 shadow-sm'} border`}>
          <div className={`text-xs ${theme === 'dark' ? 'text-emerald-300' : 'text-emerald-700'} font-semibold`}>تطابق تشخيصي تام</div>
          <div className="text-2xl font-black text-emerald-500 mt-1 font-mono">
            {fullConcordanceRate}%
          </div>
          <div className={`text-[11px] ${theme === 'dark' ? 'text-emerald-300/80' : 'text-emerald-600'} mt-0.5`}>{fullConcordanceCount} حالات</div>
        </div>

        <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-amber-950/20 border-amber-500/30' : 'bg-amber-50 border-amber-200 shadow-sm'} border`}>
          <div className={`text-xs ${theme === 'dark' ? 'text-amber-300' : 'text-amber-700'} font-semibold`}>تعديل نوعي جزئي</div>
          <div className="text-2xl font-black text-amber-500 mt-1 font-mono">{partialRate}%</div>
          <div className={`text-[11px] ${theme === 'dark' ? 'text-amber-300/80' : 'text-amber-600'} mt-0.5`}>{partialConcordanceCount} حالات</div>
        </div>

        <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-indigo-950/20 border-indigo-500/30' : 'bg-indigo-50 border-indigo-200 shadow-sm'} border`}>
          <div className={`text-xs ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-700'} font-semibold`}>تشخيص بديل وتمايز</div>
          <div className="text-2xl font-black text-indigo-500 mt-1 font-mono">{alternativeCount}</div>
          <div className={`text-[11px] ${theme === 'dark' ? 'text-indigo-300/80' : 'text-indigo-600'} mt-0.5`}>حالات تدريب نوعية</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="بحث بالاسم، الحي، التشخيص، أو الدرس المكتسب..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full px-3.5 py-2 text-xs ${theme === 'dark' ? 'bg-white/5 border-white/10 text-slate-200 focus:border-purple-500' : 'bg-white border-slate-200 text-slate-900 focus:border-purple-500'} border rounded-xl focus:outline-none transition-colors shadow-sm`}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className={`w-3.5 h-3.5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`} />
          <select
            value={filterConcordance}
            onChange={(e) => setFilterConcordance(e.target.value)}
            className={`px-3 py-1.5 text-xs ${theme === 'dark' ? 'bg-[#0b1026] border-white/10 text-slate-200' : 'bg-white border-slate-200 text-slate-900'} border rounded-xl focus:outline-none focus:border-purple-500 shadow-sm transition-colors`}
          >
            <option value="all">جميع مستويات التوافق</option>
            <option value="متطابق بالكامل">متطابق بالكامل</option>
            <option value="تعديل جزئي">تعديل جزئي</option>
            <option value="تباين وتشخيص بديل">تباين وتشخيص بديل</option>
          </select>
        </div>
      </div>

      {/* Cases List */}
      <div className="space-y-4">
        {filteredCases.map((c) => {
          const statusColors = {
            'متطابق بالكامل': theme === 'dark' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' : 'text-emerald-700 bg-emerald-50 border-emerald-200',
            'تعديل جزئي': theme === 'dark' ? 'text-amber-400 bg-amber-500/10 border-amber-500/30' : 'text-amber-700 bg-amber-50 border-amber-200',
            'تباين وتشخيص بديل': theme === 'dark' ? 'text-purple-400 bg-purple-500/10 border-purple-500/30' : 'text-purple-700 bg-purple-50 border-purple-200',
          };

          return (
            <div
              key={c.id}
              className={`p-5 rounded-2xl ${theme === 'dark' ? 'bg-white/5 border-white/10 hover:border-white/20' : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'} border space-y-4 transition-all`}
            >
              {/* Card Header */}
              <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'} pb-3`}>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'} text-sm sm:text-base`}>{c.patientAlias}</span>
                  <span className={`text-xs font-mono ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{c.district}</span>
                  <span className={`text-[11px] font-mono ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>· {c.timestamp}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                      statusColors[c.concordanceStatus as keyof typeof statusColors]
                    }`}
                  >
                    {c.concordanceStatus}
                  </span>
                </div>
              </div>

              {/* Complaint and Scoring Comparison */}
              <div className="grid sm:grid-cols-2 gap-4 text-xs">
                {/* AI Screening Snapshot */}
                <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-black/30 border-indigo-500/20' : 'bg-indigo-50 border-indigo-100'} border space-y-1`}>
                  <div className={`font-bold ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-700'} flex items-center gap-1.5`}>
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                    <span>فرز الذكاء الاصطناعي الأولي:</span>
                  </div>
                  <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} leading-relaxed font-mono`}>{c.aiInitialSeverity}</p>
                  <div className={`text-[11px] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} font-mono pt-1`}>
                    المقاييس: {c.aiSuggestedScales.join(', ')}
                  </div>
                </div>

                {/* Doctor Authoritative Verdict */}
                <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-black/30 border-purple-500/20' : 'bg-purple-50 border-purple-100'} border space-y-1`}>
                  <div className={`font-bold ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'} flex items-center gap-1.5`}>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>التشخيص السريري المعتمد للطبيب:</span>
                  </div>
                  <p className={`${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'} font-bold leading-relaxed`}>
                    {c.doctorFinalDiagnosis}
                  </p>
                  <div className={`text-[11px] ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} leading-relaxed pt-1`}>
                    "{c.doctorNotes}"
                  </div>
                </div>
              </div>

              {/* Machine Learning Insight Block */}
              <div className={`p-3.5 rounded-xl ${theme === 'dark' ? 'bg-indigo-950/20 border-indigo-500/30' : 'bg-indigo-50 border-indigo-100'} border space-y-1.5`}>
                <div className={`flex items-center gap-1.5 text-xs font-bold ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-700'}`}>
                  <BookOpen className="w-4 h-4 text-indigo-500" />
                  <span>الدرس السريري التراكمي المكتسب (AI Clinical Lesson Learned):</span>
                </div>
                <p className={`text-xs ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'} leading-relaxed pr-2 font-medium`}>
                  {c.learnedInsight}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
