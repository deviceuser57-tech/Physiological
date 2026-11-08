import React, { useState } from 'react';
import {
  AssessmentResult,
  DoctorDiagnosisOverride,
  TreatmentPathwayPlan,
  ClinicalMemoryCase,
} from '../types/clinical';
import {
  ShieldCheck,
  Stethoscope,
  Lock,
  Unlock,
  CheckCircle2,
  Sparkles,
  Edit3,
  AlertCircle,
  FileText,
  Loader2,
} from 'lucide-react';

interface DoctorDiagnosisSectionProps {
  assessment: AssessmentResult;
  onUpdateAssessment: (updated: AssessmentResult) => void;
  onSaveToMemoryBank?: (caseRecord: ClinicalMemoryCase) => void;
  theme?: 'dark' | 'light';
}

const COMMON_DIAGNOSES = [
  { code: 'F43.21', label: 'اضطراب التكيف مع عسر المزاج التفاعلي (F43.21 - Adjustment Disorder)' },
  { code: 'F32.1', label: 'اضطراب اكتئابي جسيم متوسط الشدة (F32.1 - Major Depressive Disorder)' },
  { code: 'F32.0', label: 'نوبة اكتئابية خفيفة مرتبطة بالإنهاك (F32.0 - Mild Depressive Episode)' },
  { code: 'F41.1', label: 'اضطراب القلق العام المستمر (F41.1 - Generalized Anxiety Disorder)' },
  { code: 'F51.01', label: 'أرق أولي غير عضوي مرتبط بالإجهاد (F51.01 - Primary Insomnia)' },
  { code: 'Z73.0', label: 'إنهاك مهني وإرهاق ضغوط حياتية (Z73.0 - Burnout State)' },
  { code: 'CUSTOM', label: 'تشخيص سريري مخصص آخر...' },
];

export const DoctorDiagnosisSection: React.FC<DoctorDiagnosisSectionProps> = ({
  assessment,
  onUpdateAssessment,
  onSaveToMemoryBank,
  theme = 'dark',
}) => {
  const existingOverride = assessment.doctorOverride;

  const [primaryDiagnosis, setPrimaryDiagnosis] = useState(
    existingOverride?.primaryDiagnosis ||
      (assessment.calibratedScore > 55
        ? 'اضطراب التكيف مع عسر المزاج التفاعلي للضغوط البيئية'
        : 'أعراض إجهاد نفسي تكيفية طبيعية ضمن الحدود السوية')
  );
  const [icdCode, setIcdCode] = useState(existingOverride?.icdCode || 'F43.21');
  const [customDiagnosis, setCustomDiagnosis] = useState('');
  const [severity, setSeverity] = useState<DoctorDiagnosisOverride['severity']>(
    existingOverride?.severity ||
      (assessment.calibratedScore <= 20
        ? 'normal'
        : assessment.calibratedScore <= 55
        ? 'mild'
        : 'moderate')
  );
  const [clinicalEtiology, setClinicalEtiology] = useState<DoctorDiagnosisOverride['clinicalEtiology']>(
    existingOverride?.clinicalEtiology ||
      (assessment.environmentalModifier > 15 ? 'reactive_environmental' : 'mixed')
  );
  const [clinicalNotes, setClinicalNotes] = useState(
    existingOverride?.clinicalNotes ||
      `بناءً على فحص ومقابلة المريض (${assessment.demographics.name}) والاطلاع على تفريغ الشكوى الصوتية، يتبين أن الأعراض مرتبطة بالأساس بالعبء البيئي والاقتصادي في (${assessment.demographics.district}). التقدير السريري يؤيد كون الحالة تفاعلية وقابلة للتحسن السريع مع التدخل السلوكي وتخفيف الضغوط الحياتية دون الحاجة الماسة للدواء في المرحلة الراهنة.`
  );
  const [doctorName, setDoctorName] = useState(existingOverride?.doctorName || 'د. استشاري الطب النفسي');
  const [isLocked, setIsLocked] = useState(existingOverride?.isLocked || false);
  const [isGeneratingPathways, setIsGeneratingPathways] = useState(false);
  const [generationError, setGenerationError] = useState('');

  // Lock and certify diagnosis
  const handleLockDiagnosis = async () => {
    const finalDiagnosisText = icdCode === 'CUSTOM' ? customDiagnosis : primaryDiagnosis;
    const override: DoctorDiagnosisOverride = {
      primaryDiagnosis: finalDiagnosisText,
      icdCode,
      severity,
      clinicalEtiology,
      clinicalNotes,
      treatmentGoals: [
        'إعادة الهيكلة المعرفية للأفكار الكارثية ونقد الذات',
        'تنشيط الأنشطة السارة اليومية (Behavioral Activation)',
        'تحسين بيئة النوم وتخفيف الاحتكاك مع الضغوط البيئية',
      ],
      isLocked: true,
      signedAt: new Date().toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      doctorName,
    };

    const updatedAssessment = {
      ...assessment,
      doctorOverride: override,
    };

    onUpdateAssessment(updatedAssessment);
    setIsLocked(true);

    // Auto-generate comparative pathways and memory case
    await generatePathwaysAndLearning(override, updatedAssessment);
  };

  const handleUnlockDiagnosis = () => {
    setIsLocked(false);
    if (assessment.doctorOverride) {
      onUpdateAssessment({
        ...assessment,
        doctorOverride: {
          ...assessment.doctorOverride,
          isLocked: false,
        },
      });
    }
  };

  const generatePathwaysAndLearning = async (
    override: DoctorDiagnosisOverride,
    currentAss: AssessmentResult
  ) => {
    setIsGeneratingPathways(true);
    setGenerationError('');

    try {
      // Call backend API for AI synthesis and pathways
      const res = await fetch('/api/ai/treatment-pathways', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assessment: currentAss,
          doctorOverride: override,
        }),
      });

      let plan: TreatmentPathwayPlan;

      if (res.ok) {
        plan = await res.json();
      } else {
        // Fallback local high-fidelity clinical synthesis
        plan = generateLocalClinicalPathways(currentAss, override);
      }

      const finalized = {
        ...currentAss,
        treatmentPlan: plan,
      };
      onUpdateAssessment(finalized);

      // Record in Clinical Memory Bank
      const memoryCase: ClinicalMemoryCase = {
        id: `case_${Date.now()}`,
        timestamp: new Date().toLocaleDateString('ar-EG'),
        patientAlias: currentAss.demographics.name,
        age: currentAss.demographics.age,
        gender: currentAss.demographics.gender,
        district: `${currentAss.demographics.district} - ${currentAss.demographics.city}`,
        complaintSummary: currentAss.demographics.voiceComplaint || 'شكوى سريرية مسجلة',
        aiSuggestedScales: Object.entries(currentAss.scores).map(([k]) => k.toUpperCase()),
        aiInitialSeverity: currentAss.severityLabel,
        psychometricScoresSummary: `درجة خام: ${currentAss.rawCombinedScore}% | معايرة بيئية: ${currentAss.calibratedScore}%`,
        doctorFinalDiagnosis: override.primaryDiagnosis,
        doctorSeverity: override.severity,
        doctorClinicalEtiology: override.clinicalEtiology,
        doctorNotes: override.clinicalNotes,
        concordanceStatus:
          override.clinicalEtiology === 'reactive_environmental'
            ? 'متطابق بالكامل'
            : override.severity === 'mild'
            ? 'تعديل جزئي'
            : 'تباين وتشخيص بديل',
        learnedInsight: `أكد الطبيب المعالج على أهمية السياق البيئي وتحديد المنشأ (${
          override.clinicalEtiology === 'reactive_environmental'
            ? 'التفاعلي للضغوط المعيشية'
            : 'البيولوجي والمختلط'
        }) مع تخفيض الاعتماد على التشخيصات الدوائية التلقائية لصالح CBT التكيفي.`,
      };

      if (onSaveToMemoryBank) {
        onSaveToMemoryBank(memoryCase);
      }
    } catch (err: any) {
      console.warn('API pathway generation error, using clinical fallback', err);
      const fallbackPlan = generateLocalClinicalPathways(currentAss, override);
      onUpdateAssessment({
        ...currentAss,
        treatmentPlan: fallbackPlan,
      });
    } finally {
      setIsGeneratingPathways(false);
    }
  };

  return (
    <div className={`p-6 rounded-3xl ${theme === 'dark' ? 'bg-[#0b1028]/90 border-purple-500/30' : 'bg-white border-purple-200 shadow-xl'} border space-y-6 transition-all duration-300`}>
      {/* Header with Doctor Sovereignty Badge */}
      <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b ${theme === 'dark' ? 'border-white/10' : 'border-slate-100'} pb-4`}>
        <div>
          <div className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-purple-500" />
            <h3 className={`text-lg sm:text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              اعتماد وتعديل التشخيص السريري (القرار السيادي للطبيب المعالج)
            </h3>
          </div>
          <p className={`text-xs ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} mt-1`}>
            لا يعتمد النظام على رأي الذكاء الاصطناعي بشكل أعمى؛ بل يمنح الطبيب كامل الصلاحية المستقلة في مراجعة وتعديل التشخيص، وتحديد المنشأ والشدة، وكتابة التعليل العيادي.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isLocked ? (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold shadow-sm">
              <Lock className="w-3.5 h-3.5" />
              <span>معتمد وموثق سريرياً</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-semibold shadow-sm">
              <Edit3 className="w-3.5 h-3.5" />
              <span>قيد التعديل والصياغة</span>
            </span>
          )}
        </div>
      </div>

      {/* AI Preliminary Baseline Reference Box */}
      <div className={`p-4 rounded-2xl ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-indigo-50 border-indigo-100 shadow-sm'} border space-y-2 text-xs transition-colors`}>
        <div className="flex items-center justify-between">
          <span className={`flex items-center gap-1.5 font-semibold ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-700'}`}>
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>التقدير الفرزي الأولي لنظام الذكاء الاصطناعي (للاستئناس فقط):</span>
          </span>
          <span className="font-mono text-purple-600 dark:text-purple-300 font-bold">
            الدرجة الموزونة: {assessment.calibratedScore}%
          </span>
        </div>
        <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'} leading-relaxed`}>
          {assessment.severityLabel} — استجابة بيئية تفاعلية بمقدار ({assessment.environmentalModifier}%).
        </p>
      </div>

      {/* Doctor Input Controls */}
      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Diagnostic Category */}
          <div className="space-y-1.5">
            <label className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'} flex items-center gap-1.5`}>
              <span>التشخيص السريري المعتمد من الطبيب:</span>
            </label>
            <select
              disabled={isLocked}
              value={icdCode}
              onChange={(e) => {
                const code = e.target.value;
                setIcdCode(code);
                const item = COMMON_DIAGNOSES.find((d) => d.code === code);
                if (item && code !== 'CUSTOM') {
                  setPrimaryDiagnosis(item.label);
                }
              }}
              className={`w-full px-3.5 py-2.5 text-xs ${theme === 'dark' ? 'bg-[#070b1a] border-white/10 text-slate-200 focus:border-purple-500' : 'bg-white border-slate-200 text-slate-900 focus:border-purple-500 shadow-inner'} border rounded-xl focus:outline-none disabled:opacity-60 transition-colors`}
            >
              {COMMON_DIAGNOSES.map((diag) => (
                <option key={diag.code} value={diag.code}>
                  {diag.label}
                </option>
              ))}
            </select>
          </div>

          {/* Clinical Etiology */}
          <div className="space-y-1.5">
            <label className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'} flex items-center gap-1.5`}>
              <span>منشأ وطبيعة الاعتلال السريري (Etiology):</span>
            </label>
            <select
              disabled={isLocked}
              value={clinicalEtiology}
              onChange={(e) =>
                setClinicalEtiology(
                  e.target.value as DoctorDiagnosisOverride['clinicalEtiology']
                )
              }
              className={`w-full px-3.5 py-2.5 text-xs ${theme === 'dark' ? 'bg-[#070b1a] border-white/10 text-slate-200 focus:border-purple-500' : 'bg-white border-slate-200 text-slate-900 focus:border-purple-500 shadow-inner'} border rounded-xl focus:outline-none disabled:opacity-60 transition-colors`}
            >
              <option value="reactive_environmental">تفاعلي بيئي محض (نتيجة ظروف ومعيشة ضاغطة)</option>
              <option value="endogenous_biological">بيولوجي داخلي المنشأ (عصبي / كيميائي المنشأ)</option>
              <option value="mixed">مختلط (تفاعل بين القابلية البيولوجية والمحفزات البيئية)</option>
              <option value="situational_crisis">أزمة ظرفية حادة طارئة (صدمة أو فقدان مؤقت)</option>
            </select>
          </div>
        </div>

        {/* Custom diagnosis field if selected */}
        {icdCode === 'CUSTOM' && (
          <div className="space-y-1.5">
            <label className={`text-xs font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>أدخل التشخيص السريري المخصص:</label>
            <input
              type="text"
              disabled={isLocked}
              placeholder="اكتب التسمية التشخيصية المعتمدة لديك بدقة..."
              value={customDiagnosis}
              onChange={(e) => setCustomDiagnosis(e.target.value)}
              className={`w-full px-3.5 py-2 text-xs ${theme === 'dark' ? 'bg-[#070b1a] border-white/10 text-slate-200 focus:border-purple-500' : 'bg-white border-slate-200 text-slate-900 focus:border-purple-500 shadow-inner'} border rounded-xl focus:outline-none disabled:opacity-60 transition-colors`}
            />
          </div>
        )}

        {/* Severity & Doctor Name */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>درجة الشدة العيادية حسب تقدير الطبيب:</label>
            <select
              disabled={isLocked}
              value={severity}
              onChange={(e) =>
                setSeverity(e.target.value as DoctorDiagnosisOverride['severity'])
              }
              className={`w-full px-3.5 py-2.5 text-xs ${theme === 'dark' ? 'bg-[#070b1a] border-white/10 text-slate-200 focus:border-purple-500' : 'bg-white border-slate-200 text-slate-900 focus:border-purple-500 shadow-inner'} border rounded-xl focus:outline-none disabled:opacity-60 transition-colors`}
            >
              <option value="normal">طبيعي سوي (غياب الاضطراب السريري)</option>
              <option value="mild">خفيف (يمكن تدبيره بالرعاية والتوجيه الإرشادي)</option>
              <option value="moderate">متوسط الشدة (يستلزم خطة علاجية سلوكية منتظمة)</option>
              <option value="severe">شديد وحاد (يستوجب خطة تدخل مكثفة ومتابعة حثيثة)</option>
              <option value="severe_with_psychotic">شديد مع مظاهر ذهانية أو خطورة</option>
              <option value="inconclusive">غير حاسم (يحتاج لجلسات متابعة واستقصاء)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>اسم وتوقيع الطبيب المعتمد:</label>
            <input
              type="text"
              disabled={isLocked}
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              className={`w-full px-3.5 py-2.5 text-xs ${theme === 'dark' ? 'bg-[#070b1a] border-white/10 text-slate-200 focus:border-purple-500' : 'bg-white border-slate-200 text-slate-900 focus:border-purple-500 shadow-inner'} border rounded-xl focus:outline-none disabled:opacity-60 transition-colors`}
            />
          </div>
        </div>

        {/* Doctor Formulation and Clinical Notes */}
        <div className="space-y-1.5">
          <label className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'} flex items-center justify-between`}>
            <span>التعليل السريري وصياغة الحالة من واقع فحص الطبيب:</span>
            <span className={`text-[11px] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} font-normal`}>
              (اكتب رؤيتك المستقلة لتوجيه مسارات العلاج)
            </span>
          </label>
          <textarea
            rows={3}
            disabled={isLocked}
            value={clinicalNotes}
            onChange={(e) => setClinicalNotes(e.target.value)}
            className={`w-full p-3.5 text-xs ${theme === 'dark' ? 'bg-[#070b1a] border-white/10 text-slate-200' : 'bg-white border-slate-200 text-slate-900 shadow-inner'} border rounded-xl leading-relaxed focus:outline-none focus:border-purple-500 disabled:opacity-60 transition-colors`}
            placeholder="اكتب خلاصة تقييمك السريري، ملاحظاتك على الشكوى الصوتية، وتوصياتك الخاصة..."
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2">
          <div className="text-xs text-slate-500">
            {isLocked && existingOverride?.signedAt && (
              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                تم الاعتماد والتوثيق بتاريخ: {existingOverride.signedAt}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {isLocked ? (
              <button
                type="button"
                onClick={handleUnlockDiagnosis}
                className={`px-4 py-2 ${theme === 'dark' ? 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'} border rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-sm`}
              >
                <Unlock className="w-3.5 h-3.5 text-amber-500" />
                <span>إعادة فتح التعديل</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleLockDiagnosis}
                disabled={isGeneratingPathways}
                className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-purple-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
              >
                {isGeneratingPathways ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>جارٍ معالجة وتوليد مسارات العلاج...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-emerald-300" />
                    <span>اعتماد التشخيص وتوليد مسارات العلاج والتحليل المقارن</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {generationError && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{generationError}</span>
          </div>
        )}
      </div>
    </div>
  );
};

// Fallback high-fidelity local clinical synthesis
function generateLocalClinicalPathways(
  assessment: AssessmentResult,
  doctorOverride: DoctorDiagnosisOverride
): TreatmentPathwayPlan {
  const isReactive = doctorOverride.clinicalEtiology === 'reactive_environmental';
  const isSevere =
    doctorOverride.severity === 'severe' || doctorOverride.severity === 'severe_with_psychotic';

  return {
    cbtPlan: {
      targetDistortions: [
        'التفكير الحدي (أبيض أو أسود)',
        'التضخيم والكارثية',
        'المرشح الذهني الانتقائي',
      ],
      suggestedBehavioralExperiments: [
        'تجربة التدرج: أداء 15 دقيقة فقط من مهمة مؤجلة ورصد الأثر على المزاج والإنجاز',
        'سجل التفريق بين المشاعر والوقائع: تدوين الأفكار المقلقة والبحث عن دليل ملموس قبل التصديق',
      ],
      homeworkPrescription:
        'تعبئة سجل الأفكار التلقائية خماسي الأعمدة مرتين أسبوعياً عند مواجهة موقف ضاغط، مع تحديد التشوه المعرفي وصياغة الفكرة البديلة.',
      estimatedSessionCount: isSevere
        ? '16 - 20 جلسة علاجية أسبوعية'
        : '8 - 12 جلسة علاجية أسبوعية',
    },
    pharmacotherapyAdvice: {
      indicated: isSevere || (!isReactive && doctorOverride.severity === 'moderate'),
      clinicalGuidance: isSevere
        ? 'تشير معايير التقييم إلى فائدة مناقشة مضادات الاكتئاب من فئة SSRIs/SNRIs كدعامة بيولوجية بالتوازي التام مع CBT لحماية المستفيد من استنزاف النواقل العصبية.'
        : isReactive
        ? 'المنشأ تفاعلي ومرتبط بالبيئة الحياتية؛ يوصى بتجنب البدء العاجل بمضادات الاكتئاب الكيميائية والتركيز على الدعم الإرشادي والتقنيات السلوكية أولاً.'
        : 'يترك التقييم الدوائي للمتابعة السريرية بعد 4 أسابيع من التنشيط السلوكي.',
      monitoringCautions:
        'المراقبة الدقيقة لليقظة، تفاعلات النوم، وأي أعراض ارتدادية خلال الأسابيع الأربعة الأولى.',
    },
    environmentalSupportPlan: {
      stressorMitigation: [
        `موازنة الضجيج والازدحام في (${assessment.demographics.district}) عبر تخصيص أوقات هدوء حسي يومية`,
        'إعادة تنظيم الالتزامات المالية والمهنية لتفادي الإنهاك المستمر',
        'بناء شبكة دعم اجتماعي أسبوعية لتخفيف العزلة السكنية',
      ],
      lifestylePrescription:
        'تنظيم دورة النوم-الاستيقاظ، التعرض لضوء الصباح الطبيعي 20 دقيقة، والمشي الرياضي المعتدل لتعزيز إفراز الإندورفين الطبيعي.',
    },
    comparativeSynthesis: {
      aiPreliminaryAssessment: `الفرز الأولي للذكاء الاصطناعي قدر الدرجة الموزونة بنسبة ${assessment.calibratedScore}% [${assessment.severityLabel}] مع خصم عبء الاحتكاك البيئي (${assessment.environmentalModifier}%).`,
      doctorFinalFormulation: `أقر الطبيب المعالج التشخيص النهائي: [${doctorOverride.primaryDiagnosis}] بدرجة شدة [${doctorOverride.severity}] ومنشأ [${doctorOverride.clinicalEtiology}]. وعلل ذلك: "${doctorOverride.clinicalNotes}"`,
      concordanceSummary: isReactive
        ? 'توافق كامل بين الفرز الأولي وقرار الطبيب؛ كلاهما خلص إلى أن العوارض استجابة تكيفية تفاعلية لضغوط البيئة المحيطة وليست اعتلالاً بيولوجياً عميقاً.'
        : 'أجرى الطبيب تعديلاً تشخيصياً نوعياً دقيقاً، مع التركيز على الأبعاد السريرية التي لا تلتقطها المقاييس الرقمية وحدها.',
      clinicalConsensus:
        'الخطة المعتمدة تضع العلاج المعرفي السلوكي والتنشيط الحياتي كأولوية قصوى وفق رؤية الطبيب المعالج.',
    },
  };
}
