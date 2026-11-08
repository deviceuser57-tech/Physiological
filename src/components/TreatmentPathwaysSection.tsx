import React from 'react';
import { TreatmentPathwayPlan } from '../types/clinical';
import {
  Brain,
  Pill,
  Home,
  GitCompare,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Clock,
  Sparkles,
} from 'lucide-react';

interface TreatmentPathwaysSectionProps {
  plan: TreatmentPathwayPlan;
  theme?: 'dark' | 'light';
}

export const TreatmentPathwaysSection: React.FC<TreatmentPathwaysSectionProps> = ({ plan, theme = 'dark' }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div className={`flex items-center gap-2 border-b ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'} pb-3`}>
        <Sparkles className="w-5 h-5 text-indigo-400" />
        <h3 className={`text-lg sm:text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          مسارات العلاج المقترحة والتحليل المقارن (AI & Doctor Synthesis)
        </h3>
      </div>

      {/* Comparative Synthesis Card (AI vs Doctor) */}
      <div className={`p-5 rounded-2xl ${theme === 'dark' ? 'bg-gradient-to-br from-purple-950/40 via-indigo-950/20 to-black/40 border-purple-500/30' : 'bg-gradient-to-br from-purple-50 via-indigo-50 to-white border-purple-200 shadow-sm'} border space-y-4`}>
        <div className={`flex items-center gap-2 text-sm font-bold ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}`}>
          <GitCompare className="w-4 h-4 text-purple-400" />
          <span>تحليل المقارنة التوافقية (رأي الذكاء الاصطناعي الأولي vs قرار الطبيب النهائي):</span>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 text-xs">
          {/* AI View */}
          <div className={`p-3.5 rounded-xl ${theme === 'dark' ? 'bg-black/40 border-indigo-500/20' : 'bg-white border-indigo-100 shadow-sm'} border space-y-1.5`}>
            <div className={`font-bold ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-700'} flex items-center gap-1.5`}>
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>الفرز الرقمي الأولي لنظام الذكاء الاصطناعي:</span>
            </div>
            <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} leading-relaxed font-mono`}>
              {plan.comparativeSynthesis.aiPreliminaryAssessment}
            </p>
          </div>

          {/* Doctor View */}
          <div className={`p-3.5 rounded-xl ${theme === 'dark' ? 'bg-black/40 border-purple-500/20' : 'bg-white border-purple-100 shadow-sm'} border space-y-1.5`}>
            <div className={`font-bold ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'} flex items-center gap-1.5`}>
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>التشخيص السريري النهائي المعتمد من الطبيب:</span>
            </div>
            <p className={`${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'} leading-relaxed`}>
              {plan.comparativeSynthesis.doctorFinalFormulation}
            </p>
          </div>
        </div>

        {/* Concordance Summary */}
        <div className={`p-3.5 rounded-xl ${theme === 'dark' ? 'bg-purple-900/20 border-purple-500/20' : 'bg-purple-100 border-purple-200'} border text-xs space-y-1`}>
          <div className={`font-semibold ${theme === 'dark' ? 'text-purple-200' : 'text-purple-800'}`}>خلاصة التوافق والتعلم:</div>
          <p className={`${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'} leading-relaxed`}>
            {plan.comparativeSynthesis.concordanceSummary}
          </p>
          <p className={`text-[11px] ${theme === 'dark' ? 'text-emerald-300' : 'text-emerald-600'} font-medium pt-1`}>
            {plan.comparativeSynthesis.clinicalConsensus}
          </p>
        </div>
      </div>

      {/* 3 Modality Pathways Grid */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Pathway 1: CBT */}
        <div className={`p-5 rounded-2xl ${theme === 'dark' ? 'bg-white/5 border-purple-500/30' : 'bg-white border-purple-200 shadow-sm'} border flex flex-col justify-between space-y-4`}>
          <div className="space-y-3">
            <div className={`flex items-center gap-2 text-sm font-bold ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}`}>
              <Brain className="w-4 h-4 text-purple-400" />
              <span>1. مسار العلاج المعرفي السلوكي (CBT):</span>
            </div>

            <div className="text-xs space-y-2">
              <div className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} font-semibold`}>التشوهات المستهدفة بالعلاج:</div>
              <div className="flex flex-wrap gap-1.5">
                {plan.cbtPlan.targetDistortions.map((dist, idx) => (
                  <span
                    key={idx}
                    className={`text-[11px] px-2 py-0.5 rounded ${theme === 'dark' ? 'bg-purple-500/10 text-purple-200 border-purple-500/20' : 'bg-purple-50 text-purple-700 border-purple-100'} border`}
                  >
                    {dist}
                  </span>
                ))}
              </div>

              <div className={`pt-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} font-semibold`}>التجارب السلوكية المقترحة:</div>
              <ul className={`list-disc list-inside ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} space-y-1 pr-1`}>
                {plan.cbtPlan.suggestedBehavioralExperiments.map((exp, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {exp}
                  </li>
                ))}
              </ul>

              <div className={`pt-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} font-semibold`}>الواجب المنزلي الإرشادي:</div>
              <p className={`${theme === 'dark' ? 'text-slate-300 bg-black/20 border-white/5' : 'text-slate-700 bg-slate-50 border-slate-100'} leading-relaxed text-[11px] p-2.5 rounded-lg border`}>
                {plan.cbtPlan.homeworkPrescription}
              </p>
            </div>
          </div>

          <div className={`pt-3 border-t ${theme === 'dark' ? 'border-white/10 text-purple-300' : 'border-slate-100 text-purple-700'} flex items-center justify-between text-xs font-mono`}>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>المدى التقديري للجلسات:</span>
            </span>
            <span className="font-bold">{plan.cbtPlan.estimatedSessionCount}</span>
          </div>
        </div>

        {/* Pathway 2: Pharmacotherapy Considerations */}
        <div className={`p-5 rounded-2xl ${theme === 'dark' ? 'bg-white/5 border-indigo-500/30' : 'bg-white border-indigo-200 shadow-sm'} border flex flex-col justify-between space-y-4`}>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className={`flex items-center gap-2 text-sm font-bold ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-700'}`}>
                <Pill className="w-4 h-4 text-indigo-400" />
                <span>2. الإرشادات الدوائية الاسترشادية:</span>
              </div>
              <span
                className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                  plan.pharmacotherapyAdvice.indicated
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}
              >
                {plan.pharmacotherapyAdvice.indicated ? 'موصى بمناقشته' : 'غير مطلوب عاجلاً'}
              </span>
            </div>

            <div className="text-xs space-y-2.5">
              <div className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} font-semibold`}>التوجيه الإكلينيكي للطبيب:</div>
              <p className={`${theme === 'dark' ? 'text-slate-200 bg-black/20 border-white/5' : 'text-slate-800 bg-slate-50 border-slate-100'} leading-relaxed p-2.5 rounded-lg border`}>
                {plan.pharmacotherapyAdvice.clinicalGuidance}
              </p>

              <div className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} font-semibold pt-1`}>احتياطات ومحاذير المتابعة:</div>
              <div className={`p-2.5 rounded-lg ${theme === 'dark' ? 'bg-amber-950/20 border-amber-500/20 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-800'} border text-[11px] leading-relaxed flex items-start gap-1.5`}>
                <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-400 mt-0.5" />
                <span>{plan.pharmacotherapyAdvice.monitoringCautions}</span>
              </div>
            </div>
          </div>

          <div className={`pt-3 border-t ${theme === 'dark' ? 'border-white/10 text-slate-400' : 'border-slate-100 text-slate-500'} text-[10px] leading-tight`}>
            * تنبيه: التوجيهات الدوائية للاسترشاد الطبي فقط والوصفة تقع حصرياً تحت المسؤولية المباشرة للطبيب المرخص.
          </div>
        </div>

        {/* Pathway 3: Environmental & Lifestyle */}
        <div className={`p-5 rounded-2xl ${theme === 'dark' ? 'bg-white/5 border-emerald-500/30' : 'bg-white border-emerald-200 shadow-sm'} border flex flex-col justify-between space-y-4`}>
          <div className="space-y-3">
            <div className={`flex items-center gap-2 text-sm font-bold ${theme === 'dark' ? 'text-emerald-300' : 'text-emerald-700'}`}>
              <Home className="w-4 h-4 text-emerald-400" />
              <span>3. الدعم البيئي وتعديل نمط المعيشة:</span>
            </div>

            <div className="text-xs space-y-2">
              <div className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} font-semibold`}>خطوات تخفيف الاحتكاك البيئي:</div>
              <ul className={`list-disc list-inside ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} space-y-1 pr-1`}>
                {plan.environmentalSupportPlan.stressorMitigation.map((st, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {st}
                  </li>
                ))}
              </ul>

              <div className={`pt-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} font-semibold`}>وصفة نمط الحياة (Lifestyle Rx):</div>
              <p className={`${theme === 'dark' ? 'text-slate-200 bg-black/20 border-white/5' : 'text-slate-800 bg-slate-50 border-slate-100'} leading-relaxed text-[11px] p-2.5 rounded-lg border`}>
                {plan.environmentalSupportPlan.lifestylePrescription}
              </p>
            </div>
          </div>

          <div className={`pt-3 border-t ${theme === 'dark' ? 'border-white/10 text-emerald-300' : 'border-slate-100 text-emerald-700'} flex items-center gap-1.5 text-xs font-semibold`}>
            <Lightbulb className="w-3.5 h-3.5 text-emerald-400" />
            <span>تخفيف الضغوط الحياتية يعزز فاعلية CBT بنسبة 40%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
