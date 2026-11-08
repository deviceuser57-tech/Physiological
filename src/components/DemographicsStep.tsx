import React from 'react';
import { DemographicContext, AiScaleRecommendation } from '../types/clinical';
import { Sliders, Compass, AlertCircle, CheckCircle2, Sparkles, ShieldCheck, Volume2, Timer } from 'lucide-react';
import { VoiceComplaintIntake } from './VoiceComplaintIntake';

interface DemographicsStepProps {
  data: DemographicContext;
  onChange: (updated: DemographicContext) => void;
  onSubmit: () => void;
  errorMessage?: string;
  theme?: 'dark' | 'light';
}

export const DemographicsStep: React.FC<DemographicsStepProps> = ({
  data,
  onChange,
  onSubmit,
  errorMessage,
  theme = 'dark',
}) => {
  const updateField = <K extends keyof DemographicContext>(key: K, value: DemographicContext[K]) => {
    onChange({ ...data, [key]: value });
  };

  const toggleStressor = (stressor: string) => {
    const current = data.acuteStressors || [];
    if (current.includes(stressor)) {
      updateField('acuteStressors', current.filter((s) => s !== stressor));
    } else {
      updateField('acuteStressors', [...current, stressor]);
    }
  };

  const handleApplyAiRecommendation = (rec: AiScaleRecommendation) => {
    const autoFilled: string[] = [];
    const ext = rec.extractedData || {};

    if (ext.caseTitle) autoFilled.push('caseTitle');
    if (ext.name) autoFilled.push('name');
    if (ext.age) autoFilled.push('age');
    if (ext.gender) autoFilled.push('gender');
    if (ext.social) autoFilled.push('social');
    if (ext.job) autoFilled.push('job');
    if (ext.economy) autoFilled.push('economy');
    if (ext.health) autoFilled.push('health');
    if (ext.acuteStressors && ext.acuteStressors.length > 0) autoFilled.push('acuteStressors');
    if (ext.voiceTone) autoFilled.push('voiceTone');
    if (ext.speechRate) autoFilled.push('speechRate');

    onChange({
      ...data,
      ...ext,
      voiceTone: ext.voiceTone || rec.voiceTone || data.voiceTone,
      speechRate: ext.speechRate || rec.speechRate || data.speechRate,
      usePhq9: rec.recommendedScales.phq9,
      useBdi2: rec.recommendedScales.bdi2,
      useDass: rec.recommendedScales.dass21,
      useGds: rec.recommendedScales.gds15,
      useGad7: rec.recommendedScales.gad7 ?? data.useGad7,
      useIsi: rec.recommendedScales.isi ?? data.useIsi,
      usePss10: rec.recommendedScales.pss10 ?? data.usePss10,
      aiRecommendation: rec,
      autoFilledFields: autoFilled,
    });
  };

  const isAutoFilled = (field: string) => data.autoFilledFields?.includes(field);

  const getFieldClass = (field: string, baseClass: string) => {
    if (isAutoFilled(field)) {
      if (theme === 'dark') {
        return `${baseClass} bg-emerald-500/10 border-emerald-500/30 ring-1 ring-emerald-500/20`;
      } else {
        return `${baseClass} bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]`;
      }
    }
    return baseClass;
  };

  const commonDistricts = [
    'إمبابة (كثافة عالية)',
    'شبرا (كثافة عالية)',
    'عين شمس (كثافة عالية)',
    'دار السلام (كثافة عالية)',
    'المعادي (هادئ)',
    'التجمع الخامس (هادئ)',
    'الشيخ زايد (هادئ)',
    'الرحاب (هادئ)',
  ];

  const hasAnyScaleSelected =
    data.usePhq9 ||
    data.useBdi2 ||
    data.useDass ||
    data.useGds ||
    data.useGad7 ||
    data.useIsi ||
    data.usePss10;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Intro Header */}
      <div className="border-r-4 border-indigo-500 pr-4">
        <h2 className={`text-xl sm:text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'} tracking-tight`}>
          المرحلة الأولية: فحص متغيرات السياق وتحديد بطارية المقاييس
        </h2>
        <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} mt-1.5 leading-relaxed`}>
          تُسجل معطيات الواقع المعيشي والشكوى الصوتية الحرة للمريض، ليقترح الذكاء الاصطناعي المقاييس الأنسب استرشادياً، ويبقى للطبيب المعالج كامل القرار السيادي في اختيار وتحديد الاختبارات قبل البدء.
        </p>
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs sm:text-sm flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 3-Minute Voice Complaint Intake Section */}
      <VoiceComplaintIntake
        demographics={data}
        onApplyRecommendation={handleApplyAiRecommendation}
        onComplaintChange={(text) => updateField('voiceComplaint', text)}
        theme={theme}
      />

      {/* Selection of Tests / Clinical Battery Before Starting */}
      <div className={`p-5 rounded-2xl border ${theme === 'dark' ? 'bg-indigo-950/20 border-indigo-500/30' : 'bg-indigo-50/50 border-indigo-200 shadow-sm'} space-y-4 transition-colors duration-300`}>
        <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b ${theme === 'dark' ? 'border-white/5' : 'border-indigo-100'} pb-3`}>
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-purple-400" />
            <h3 className={`text-sm sm:text-base font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              تحديد واختيار المقاييس السريرية قبل بدء الفحص:
            </h3>
          </div>
          <div className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg border ${theme === 'dark' ? 'text-purple-300 bg-purple-500/10 border-purple-500/20' : 'text-purple-700 bg-purple-50 border-purple-200'}`}>
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>قرار الطبيب النهائي في الاختيار والتعديل</span>
          </div>
        </div>

        <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} leading-relaxed`}>
          حدد المقاييس التي ترغب في إدراجها ضمن جلسة التقييم السريري الحالية (يمكنك تفعيل مقياس واحد أو أكثر حسب رؤيتك الطبية):
        </p>

        {/* 4 Scale Cards Grid */}
        <div className="grid sm:grid-cols-2 gap-3.5 pt-1">
          {/* PHQ-9 Card */}
          <label
            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
              data.usePhq9
                ? 'border-indigo-500 bg-indigo-600/15 shadow-sm'
                : theme === 'dark'
                ? 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:border-white/20'
                : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50 shadow-sm'
            }`}
          >
            <input
              type="checkbox"
              checked={data.usePhq9}
              onChange={(e) => updateField('usePhq9', e.target.checked)}
              className="w-4 h-4 mt-1 accent-indigo-500 rounded cursor-pointer"
            />
            <div className="space-y-1 flex-1">
              <div className="flex justify-between items-center">
                <span className={`font-bold text-sm ${theme === 'dark' || data.usePhq9 ? 'text-white' : 'text-slate-900'}`}>استبيان صحة المريض (PHQ-9)</span>
                <span className={`text-[10px] font-mono ${theme === 'dark' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-50 text-indigo-700'} px-2 py-0.5 rounded`}>
                  9 أسئلة
                </span>
              </div>
              <p className={`text-xs ${theme === 'dark' || data.usePhq9 ? 'text-slate-300' : 'text-slate-600'} leading-relaxed`}>
                المعيار العالمي وفق DSM-5 للأعراض الاكتئابية الجسدية (النوم، الشهية، الطاقة، والتركيز).
              </p>
              {data.aiRecommendation?.recommendedScales.phq9 && (
                <div className={`flex items-center gap-1 text-[11px] ${theme === 'dark' ? 'text-amber-300' : 'text-amber-600'} pt-1 font-semibold`}>
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>مقترح من الذكاء الاصطناعي بناءً على الشكوى الصوتية</span>
                </div>
              )}
            </div>
          </label>

          {/* BDI-II Card */}
          <label
            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
              data.useBdi2
                ? 'border-purple-500 bg-purple-600/15 shadow-sm'
                : theme === 'dark'
                ? 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:border-white/20'
                : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50 shadow-sm'
            }`}
          >
            <input
              type="checkbox"
              checked={data.useBdi2}
              onChange={(e) => updateField('useBdi2', e.target.checked)}
              className="w-4 h-4 mt-1 accent-purple-500 rounded cursor-pointer"
            />
            <div className="space-y-1 flex-1">
              <div className="flex justify-between items-center">
                <span className={`font-bold text-sm ${theme === 'dark' || data.useBdi2 ? 'text-white' : 'text-slate-900'}`}>مقياس بيك للاكتئاب (BDI-II)</span>
                <span className={`text-[10px] font-mono ${theme === 'dark' ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-50 text-purple-700'} px-2 py-0.5 rounded`}>
                  21 سؤالاً
                </span>
              </div>
              <p className={`text-xs ${theme === 'dark' || data.useBdi2 ? 'text-slate-300' : 'text-slate-600'} leading-relaxed`}>
                المعيار الذهبي غير المختزل للثالوث المعرفي (النظرة للذات، مشاعر الفشل والذنب، والتشاؤم المستقبلي).
              </p>
              {data.aiRecommendation?.recommendedScales.bdi2 && (
                <div className={`flex items-center gap-1 text-[11px] ${theme === 'dark' ? 'text-amber-300' : 'text-amber-600'} pt-1 font-semibold`}>
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>مقترح من الذكاء الاصطناعي بناءً على الشكوى الصوتية</span>
                </div>
              )}
            </div>
          </label>

          {/* DASS-21 Card */}
          <label
            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
              data.useDass
                ? 'border-amber-500 bg-amber-600/15 shadow-sm'
                : theme === 'dark'
                ? 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:border-white/20'
                : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50 shadow-sm'
            }`}
          >
            <input
              type="checkbox"
              checked={data.useDass}
              onChange={(e) => updateField('useDass', e.target.checked)}
              className="w-4 h-4 mt-1 accent-amber-500 rounded cursor-pointer"
            />
            <div className="space-y-1 flex-1">
              <div className="flex justify-between items-center">
                <span className={`font-bold text-sm ${theme === 'dark' || data.useDass ? 'text-white' : 'text-slate-900'}`}>مقياس الأعراض الثلاثي (DASS-21)</span>
                <span className={`text-[10px] font-mono ${theme === 'dark' ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-50 text-amber-700'} px-2 py-0.5 rounded`}>
                  21 سؤالاً
                </span>
              </div>
              <p className={`text-xs ${theme === 'dark' || data.useDass ? 'text-slate-300' : 'text-slate-600'} leading-relaxed`}>
                تقييم دقيق يفرّق بين عوارض القلق الفسيولوجي، نوبات الذعر، والتوتر والاستثارة العصبية.
              </p>
              {data.aiRecommendation?.recommendedScales.dass21 && (
                <div className={`flex items-center gap-1 text-[11px] ${theme === 'dark' ? 'text-amber-300' : 'text-amber-600'} pt-1 font-semibold`}>
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>مقترح من الذكاء الاصطناعي بناءً على الشكوى الصوتية</span>
                </div>
              )}
            </div>
          </label>

          {/* GDS-15 Card */}
          <label
            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
              data.useGds
                ? 'border-emerald-500 bg-emerald-600/15 shadow-sm'
                : theme === 'dark'
                ? 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:border-white/20'
                : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50 shadow-sm'
            }`}
          >
            <input
              type="checkbox"
              checked={data.useGds}
              onChange={(e) => updateField('useGds', e.target.checked)}
              className="w-4 h-4 mt-1 accent-emerald-500 rounded cursor-pointer"
            />
            <div className="space-y-1 flex-1">
              <div className="flex justify-between items-center">
                <span className={`font-bold text-sm ${theme === 'dark' || data.useGds ? 'text-white' : 'text-slate-900'}`}>مقياس الرضا العام (GDS-15)</span>
                <span className={`text-[10px] font-mono ${theme === 'dark' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-50 text-emerald-700'} px-2 py-0.5 rounded`}>
                  15 سؤالاً
                </span>
              </div>
              <p className={`text-xs ${theme === 'dark' || data.useGds ? 'text-slate-300' : 'text-slate-600'} leading-relaxed`}>
                مقياس الرضا الحياتي والتفاؤل مع نظام التصحيح المعكوس الدقيق ونوعية المعيشة.
              </p>
              {data.aiRecommendation?.recommendedScales.gds15 && (
                <div className={`flex items-center gap-1 text-[11px] ${theme === 'dark' ? 'text-amber-300' : 'text-amber-600'} pt-1 font-semibold`}>
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>مقترح من الذكاء الاصطناعي بناءً على الشكوى الصوتية</span>
                </div>
              )}
            </div>
          </label>

          {/* GAD-7 Card */}
          <label
            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
              data.useGad7
                ? 'border-blue-500 bg-blue-600/15 shadow-sm'
                : theme === 'dark'
                ? 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:border-white/20'
                : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50 shadow-sm'
            }`}
          >
            <input
              type="checkbox"
              checked={data.useGad7}
              onChange={(e) => updateField('useGad7', e.target.checked)}
              className="w-4 h-4 mt-1 accent-blue-500 rounded cursor-pointer"
            />
            <div className="space-y-1 flex-1">
              <div className="flex justify-between items-center">
                <span className={`font-bold text-sm ${theme === 'dark' || data.useGad7 ? 'text-white' : 'text-slate-900'}`}>مقياس القلق العام (GAD-7)</span>
                <span className={`text-[10px] font-mono ${theme === 'dark' ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-50 text-blue-700'} px-2 py-0.5 rounded`}>
                  7 أسئلة
                </span>
              </div>
              <p className={`text-xs ${theme === 'dark' || data.useGad7 ? 'text-slate-300' : 'text-slate-600'} leading-relaxed`}>
                المعيار المعتمد لفحص القلق المعمم، صعوبة إيقاف الأفكار المقلقة، والتوتر العضلي.
              </p>
              {data.aiRecommendation?.recommendedScales.gad7 && (
                <div className={`flex items-center gap-1 text-[11px] ${theme === 'dark' ? 'text-amber-300' : 'text-amber-600'} pt-1 font-semibold`}>
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>مقترح من الذكاء الاصطناعي بناءً على الشكوى الصوتية</span>
                </div>
              )}
            </div>
          </label>

          {/* ISI Card */}
          <label
            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
              data.useIsi
                ? 'border-cyan-500 bg-cyan-600/15 shadow-sm'
                : theme === 'dark'
                ? 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:border-white/20'
                : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50 shadow-sm'
            }`}
          >
            <input
              type="checkbox"
              checked={data.useIsi}
              onChange={(e) => updateField('useIsi', e.target.checked)}
              className="w-4 h-4 mt-1 accent-cyan-500 rounded cursor-pointer"
            />
            <div className="space-y-1 flex-1">
              <div className="flex justify-between items-center">
                <span className={`font-bold text-sm ${theme === 'dark' || data.useIsi ? 'text-white' : 'text-slate-900'}`}>مؤشر شدة الأرق (ISI)</span>
                <span className={`text-[10px] font-mono ${theme === 'dark' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-cyan-50 text-cyan-700'} px-2 py-0.5 rounded`}>
                  7 أسئلة
                </span>
              </div>
              <p className={`text-xs ${theme === 'dark' || data.useIsi ? 'text-slate-300' : 'text-slate-600'} leading-relaxed`}>
                تقييم صعوبات النوم، الاستيقاظ المبكر، وتأثير قلة النوم على الأداء النهاري والتركيز.
              </p>
              {data.aiRecommendation?.recommendedScales.isi && (
                <div className={`flex items-center gap-1 text-[11px] ${theme === 'dark' ? 'text-amber-300' : 'text-amber-600'} pt-1 font-semibold`}>
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>مقترح من الذكاء الاصطناعي بناءً على الشكوى الصوتية</span>
                </div>
              )}
            </div>
          </label>

          {/* PSS-10 Card */}
          <label
            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
              data.usePss10
                ? 'border-rose-500 bg-rose-600/15 shadow-sm'
                : theme === 'dark'
                ? 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:border-white/20'
                : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50 shadow-sm'
            }`}
          >
            <input
              type="checkbox"
              checked={data.usePss10}
              onChange={(e) => updateField('usePss10', e.target.checked)}
              className="w-4 h-4 mt-1 accent-rose-500 rounded cursor-pointer"
            />
            <div className="space-y-1 flex-1">
              <div className="flex justify-between items-center">
                <span className={`font-bold text-sm ${theme === 'dark' || data.usePss10 ? 'text-white' : 'text-slate-900'}`}>مقياس إدراك الضغوط (PSS-10)</span>
                <span className={`text-[10px] font-mono ${theme === 'dark' ? 'bg-rose-500/20 text-rose-300' : 'bg-rose-50 text-rose-700'} px-2 py-0.5 rounded`}>
                  10 أسئلة
                </span>
              </div>
              <p className={`text-xs ${theme === 'dark' || data.usePss10 ? 'text-slate-300' : 'text-slate-600'} leading-relaxed`}>
                قياس مدى إدراك الفرد لمواقف حياته كأحداث خارجة عن السيطرة ومثقلة بالمصاعب.
              </p>
              {data.aiRecommendation?.recommendedScales.pss10 && (
                <div className={`flex items-center gap-1 text-[11px] ${theme === 'dark' ? 'text-amber-300' : 'text-amber-600'} pt-1 font-semibold`}>
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>مقترح من الذكاء الاصطناعي بناءً على الشكوى الصوتية</span>
                </div>
              )}
            </div>
          </label>
        </div>

        {!hasAnyScaleSelected && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>تنبيه: يجب اختيار مقياس واحد على الأقل للبدء بالفحص.</span>
          </div>
        )}
      </div>

      {/* Row 0: Case Title / Model Title */}
      <div className="animate-fadeIn">
        <label className={`block text-xs font-bold ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-700'} mb-1.5 flex items-center gap-2`}>
          <Sparkles className="w-3.5 h-3.5" />
          <span>عنوان النموذج / تشخيص الحالة الأولي المستنتج</span>
        </label>
        <input
          type="text"
          value={data.caseTitle || ''}
          onChange={(e) => updateField('caseTitle', e.target.value)}
          placeholder="سيتم اقتراح عنوان بناءً على الشكوى (مثال: حالة اكتئاب ناتجة عن صدمة عصبية وفقدان وظيفة)"
          className={getFieldClass('caseTitle', `w-full ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'} border rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 text-sm font-bold transition-all shadow-inner`)}
        />
      </div>

      {/* Row 1: Basic Identity */}
      <div className="grid sm:grid-cols-4 gap-4">
        <div className="sm:col-span-2">
          <label className={`block text-xs font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'} mb-1.5`}>
            الاسم الأول أو الرمز المستعار
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => updateField('name', e.target.value)}
            placeholder="مثال: أحمد أو م. ع."
            className={getFieldClass('name', `w-full ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'} border rounded-xl px-4 py-2.5 focus:outline-none focus:border-purple-500 text-sm transition-colors`)}
          />
        </div>

        <div>
          <label className={`block text-xs font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'} mb-1.5`}>العمر (سنة)</label>
          <input
            type="number"
            min={12}
            max={100}
            value={data.age || ''}
            onChange={(e) => updateField('age', parseInt(e.target.value) || 0)}
            className={getFieldClass('age', `w-full ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} border rounded-xl px-4 py-2.5 focus:outline-none focus:border-purple-500 text-sm transition-colors font-mono tabular-nums`)}
          />
        </div>

        <div>
          <label className={`block text-xs font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'} mb-1.5`}>الجنس</label>
          <select
            value={data.gender}
            onChange={(e) => updateField('gender', e.target.value as any)}
            className={getFieldClass('gender', `w-full ${theme === 'dark' ? 'bg-[#0a1024] border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} border rounded-xl px-3 py-2.5 focus:outline-none focus:border-purple-500 text-sm`)}
          >
            <option value="male">ذكر</option>
            <option value="female">أنثى</option>
            <option value="unspecified">غير محدد</option>
          </select>
        </div>
      </div>

      {/* Row 2: Location & Urban Friction */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className={`block text-xs font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'} mb-1.5`}>المدينة الحالية</label>
          <input
            type="text"
            value={data.city}
            onChange={(e) => updateField('city', e.target.value)}
            placeholder="مثال: القاهرة، الرياض، عمان..."
            className={getFieldClass('city', `w-full ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'} border rounded-xl px-4 py-2.5 focus:outline-none focus:border-purple-500 text-sm transition-colors`)}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={`block text-xs font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'} mb-1.5 flex justify-between items-center`}>
            <span>الحي السكني أو المنطقة (لتحديد الكثافة الحضرية والضغوط)</span>
            <span className="text-[11px] text-slate-400 font-normal">اكتب أو اختر</span>
          </label>
          <input
            type="text"
            value={data.district}
            onChange={(e) => updateField('district', e.target.value)}
            placeholder="مثال: إمبابة، شبرا، المعادي، التجمع، حي شعبي مكتظ، أو ضاحية هادئة"
            className={getFieldClass('district', `w-full ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'} border rounded-xl px-4 py-2.5 focus:outline-none focus:border-purple-500 text-sm transition-colors`)}
          />
          {/* Quick tags */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {commonDistricts.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => updateField('district', d.split(' ')[0])}
                className={`text-[11px] ${theme === 'dark' ? 'text-slate-400 hover:text-purple-300 bg-white/5 hover:bg-white/10' : 'text-slate-500 hover:text-purple-600 bg-slate-100 hover:bg-slate-200'} px-2 py-0.5 rounded transition-colors cursor-pointer`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Social & Living Arrangement */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={`block text-xs font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'} mb-1.5`}>الحالة الاجتماعية الحالية</label>
          <select
            value={data.social}
            onChange={(e) => updateField('social', e.target.value as any)}
            className={getFieldClass('social', `w-full ${theme === 'dark' ? 'bg-[#0a1024] border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} border rounded-xl px-4 py-2.5 focus:outline-none focus:border-purple-500 text-sm`)}
          >
            <option value="single">أعزب / عزباء</option>
            <option value="married">متزوج / متزوجة</option>
            <option value="separated">منفصل / مطلّق</option>
            <option value="widowed">أرمل / أرملة</option>
          </select>
        </div>

        <div>
          <label className={`block text-xs font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'} mb-1.5`}>كيفية النمط الإقامي والمعيشي</label>
          <select
            value={data.living}
            onChange={(e) => updateField('living', e.target.value as any)}
            className={getFieldClass('living', `w-full ${theme === 'dark' ? 'bg-[#0a1024] border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} border rounded-xl px-4 py-2.5 focus:outline-none focus:border-purple-500 text-sm`)}
          >
            <option value="family">أعيش مع العائلة / الأبناء وشركاء الدعم</option>
            <option value="alone">أعيش بمفردي تماماً (عزلة سكنية)</option>
            <option value="roommates">مغترب / سكن مشترك ومؤقت</option>
          </select>
        </div>
      </div>

      {/* Row 4: Work & Economy */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={`block text-xs font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'} mb-1.5`}>حالة العمل والنشاط المهني</label>
          <select
            value={data.job}
            onChange={(e) => updateField('job', e.target.value as any)}
            className={getFieldClass('job', `w-full ${theme === 'dark' ? 'bg-[#0a1024] border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} border rounded-xl px-4 py-2.5 focus:outline-none focus:border-purple-500 text-sm`)}
          >
            <option value="employed">موظف مستقر / عمل دائم</option>
            <option value="freelancer">عمل حر / نشاط غير مستقر ماديّاً</option>
            <option value="unemployed">عاطل عن العمل / أبحث حالياً بنشاط</option>
            <option value="student">طالب / طالبة علم</option>
            <option value="retired">متقاعد عن العمل</option>
          </select>
        </div>

        <div>
          <label className={`block text-xs font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'} mb-1.5`}>الحالة والوضعية الاقتصادية الحالية</label>
          <select
            value={data.economy}
            onChange={(e) => updateField('economy', e.target.value as any)}
            className={getFieldClass('economy', `w-full ${theme === 'dark' ? 'bg-[#0a1024] border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} border rounded-xl px-4 py-2.5 focus:outline-none focus:border-purple-500 text-sm`)}
          >
            <option value="good">مستقرة ومريحة ومغطية للمتطلبات</option>
            <option value="average">متوسطة وتغطي الالتزامات بصعوبة أو جهد</option>
            <option value="stressful">أمر بضائقة وأزمة مادية ضاغطة ومقلقة للغاية</option>
          </select>
        </div>
      </div>

      {/* Row 5: Physical Health */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="sm:col-span-1">
          <label className={`block text-xs font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'} mb-1.5`}>الحالة الصحية الجسدية</label>
          <select
            value={data.health}
            onChange={(e) => updateField('health', e.target.value as any)}
            className={getFieldClass('health', `w-full ${theme === 'dark' ? 'bg-[#0a1024] border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} border rounded-xl px-4 py-2.5 focus:outline-none focus:border-purple-500 text-sm`)}
          >
            <option value="healthy">سليم معافى</option>
            <option value="chronic">اعتلالات مزمنة</option>
            <option value="acute">وعكة صحية حادة</option>
          </select>
        </div>

        <div>
          <label className={`block text-xs font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'} mb-1.5 flex items-center gap-1.5`}>
            <Volume2 className="w-3.5 h-3.5 text-amber-500" />
            <span>نبرة الصوت (مستنتجة)</span>
          </label>
          <input
            type="text"
            value={data.voiceTone || ''}
            onChange={(e) => updateField('voiceTone', e.target.value)}
            placeholder="مثال: متهدجة، قلقة، خافتة..."
            className={getFieldClass('voiceTone', `w-full ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'} border rounded-xl px-4 py-2.5 focus:outline-none focus:border-purple-500 text-sm transition-colors`)}
          />
        </div>

        <div>
          <label className={`block text-xs font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'} mb-1.5 flex items-center gap-1.5`}>
            <Timer className="w-3.5 h-3.5 text-blue-500" />
            <span>سرعة الكلام (مستنتجة)</span>
          </label>
          <input
            type="text"
            value={data.speechRate || ''}
            onChange={(e) => updateField('speechRate', e.target.value)}
            placeholder="مثال: بطيئة جداً، سريعة مضطربة..."
            className={getFieldClass('speechRate', `w-full ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'} border rounded-xl px-4 py-2.5 focus:outline-none focus:border-purple-500 text-sm transition-colors`)}
          />
        </div>
      </div>

      {/* Row 6: Acute Stressors Multi-select */}
      <div className={getFieldClass('acuteStressors', `p-4 rounded-2xl ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'} border space-y-3`)}>
        <label className={`block text-xs font-bold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
          هل تعرضت خلال الأشهر الستة الماضية لأي من الضغوط الطارئة التالية؟ (اختياري)
        </label>
        <div className="grid sm:grid-cols-2 gap-2 text-xs">
          {[
            'فقدان أو وفاة شخص قريب وعزيز',
            'تراكم ديون حادة أو التزامات مالية طارئة',
            'انفصال، طلاق أو خلافات عائلية حادة',
            'فقدان وظيفة أو نزاع مهني ضاغط',
            'تغيير مكان السكن أو الغربة والابتعاد عن الأهل',
            'إجراء عملية جراحية أو أزمة صحية عائلية',
          ].map((item) => {
            const isChecked = (data.acuteStressors || []).includes(item);
            return (
              <label
                key={item}
                className={`p-2.5 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-colors ${
                  isChecked
                    ? 'border-purple-500 bg-purple-500/10 text-purple-200'
                    : theme === 'dark'
                    ? 'border-white/5 bg-white/5 text-slate-300 hover:bg-white/10'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleStressor(item)}
                  className="rounded text-purple-600 focus:ring-0 accent-purple-500"
                />
                <span>{item}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Action Footer */}
      <div className={`flex items-center justify-between border-t ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'} pt-6`}>
        <div className="text-xs text-slate-400 flex items-center gap-2">
          <Compass className="w-4 h-4 text-purple-400" />
          <span>المقاييس والمعايير المختارة ستُنشئ تسلسل الفحص المخصص فورياً.</span>
        </div>
        <button
          type="button"
          onClick={onSubmit}
          disabled={!hasAnyScaleSelected}
          className={`px-6 py-3 font-bold rounded-xl text-sm transition shadow-lg flex items-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-purple-400 ${
            hasAnyScaleSelected
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-purple-950/40'
              : theme === 'dark'
              ? 'bg-white/5 text-slate-500 border border-white/5 cursor-not-allowed'
              : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
          }`}
        >
          <span>بدء الفحص السريري المعتمد</span>
          <span aria-hidden="true">←</span>
        </button>
      </div>
    </div>
  );
};

