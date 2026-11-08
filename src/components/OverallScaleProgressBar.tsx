import React from 'react';
import { ScaleDefinition } from '../types/clinical';
import { CheckCircle2, CircleDashed } from 'lucide-react';

interface OverallScaleProgressBarProps {
  scales: ScaleDefinition[];
  activeScaleIndex: number;
  responses: Record<string, number>;
  onSelectScale: (index: number) => void;
}

export const OverallScaleProgressBar: React.FC<OverallScaleProgressBarProps> = ({
  scales,
  activeScaleIndex,
  responses,
  onSelectScale,
}) => {
  // Only evaluate clinical questionnaire scales (exclude demographics and dashboard)
  const clinicalScales = scales.filter(
    (s) => s.type !== 'demographics' && s.type !== 'dashboard'
  );

  let totalQuestions = 0;
  let totalAnswered = 0;

  const scaleStats = clinicalScales.map((scale) => {
    const qCount = scale.questions.length;
    let answered = 0;
    scale.questions.forEach((q) => {
      if (responses[q.id] !== undefined) {
        answered++;
      }
    });

    totalQuestions += qCount;
    totalAnswered += answered;

    const percentage = qCount > 0 ? Math.round((answered / qCount) * 100) : 0;
    const isCompleted = answered === qCount;
    const isCurrent = scales[activeScaleIndex]?.type === scale.type;

    return {
      scale,
      originalIndex: scales.findIndex((s) => s.type === scale.type),
      answered,
      qCount,
      percentage,
      isCompleted,
      isCurrent,
    };
  });

  const overallPercentage =
    totalQuestions > 0 ? Math.round((totalAnswered / totalQuestions) * 100) : 0;

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 space-y-4 mb-6 animate-fadeIn">
      {/* Top row: Overall progress label and numerical count */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse"></span>
          <span className="text-xs sm:text-sm font-bold text-white">
            شريط الإنجاز الشامل للمقاييس السريرية
          </span>
          <span className="text-xs text-slate-400 font-mono">
            ({totalAnswered} من {totalQuestions} سؤالاً)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-purple-300">
            نسبة الإنجاز الكلية:
          </span>
          <span className="text-base sm:text-lg font-black font-mono tabular-nums text-purple-400">
            {overallPercentage}%
          </span>
        </div>
      </div>

      {/* Primary Overall Master Progress Bar */}
      <div className="w-full bg-black/40 rounded-full h-2.5 p-0.5 border border-white/5 overflow-hidden">
        <div
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(168,85,247,0.4)]"
          style={{ width: `${overallPercentage}%` }}
        />
      </div>

      {/* Grid of Individual Scales Progress Bars */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
        {scaleStats.map((stat) => (
          <button
            key={stat.scale.type}
            type="button"
            onClick={() => onSelectScale(stat.originalIndex)}
            className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer flex flex-col justify-between ${
              stat.isCurrent
                ? 'bg-purple-600/20 border-purple-500/50 shadow-sm shadow-purple-950'
                : stat.isCompleted
                ? 'bg-emerald-950/15 border-emerald-500/30 hover:bg-emerald-950/30'
                : 'bg-white/5 border-white/5 hover:bg-white/10'
            }`}
          >
            {/* Header: Scale name + completion icon */}
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-bold text-white truncate">
                {stat.scale.shortCode}
              </span>
              {stat.isCompleted ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : (
                <CircleDashed className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              )}
            </div>

            {/* Individual Progress Bar */}
            <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden mb-1.5">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  stat.isCompleted
                    ? 'bg-emerald-400'
                    : stat.isCurrent
                    ? 'bg-purple-400'
                    : 'bg-indigo-400'
                }`}
                style={{ width: `${stat.percentage}%` }}
              />
            </div>

            {/* Scale stats counter */}
            <div className="flex justify-between items-center text-[11px] font-mono tabular-nums">
              <span className="text-slate-400">
                {stat.answered}/{stat.qCount}
              </span>
              <span
                className={`font-semibold ${
                  stat.isCompleted
                    ? 'text-emerald-400'
                    : stat.isCurrent
                    ? 'text-purple-300'
                    : 'text-slate-300'
                }`}
              >
                {stat.percentage}%
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
