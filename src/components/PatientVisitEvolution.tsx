import React from 'react';
import { AssessmentResult } from '../types/clinical';
import { VisitRecord } from '../services/clinicalDatabase';
import {
  TrendingDown,
  TrendingUp,
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle2,
  FileText,
  Activity,
  History,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface PatientVisitEvolutionProps {
  currentAssessment: AssessmentResult;
  pastVisits: VisitRecord[];
  onSelectVisit?: (assessment: AssessmentResult) => void;
  theme?: 'dark' | 'light';
}

interface TimelinePoint {
  id: string;
  dateStr: string;
  timestampMs: number;
  score: number;
  severityLabel: string;
  severityColor: string;
  caseTitle: string;
  doctorNotes: string;
  assessmentData: AssessmentResult;
  isCurrent: boolean;
}

export const PatientVisitEvolution: React.FC<PatientVisitEvolutionProps> = ({
  currentAssessment,
  pastVisits,
  onSelectVisit,
  theme = 'dark',
}) => {
  // Build normalized chronological points (Earliest -> Latest -> Current)
  const allPoints: TimelinePoint[] = [];

  pastVisits.forEach((v, idx) => {
    let dateStr = 'زيارة سابقة';
    let timeMs = Date.now() - (idx + 1) * 86400000 * 7; // fallback 7 days intervals

    if (v.timestamp) {
      if (typeof v.timestamp.toDate === 'function') {
        const d = v.timestamp.toDate();
        dateStr = d.toLocaleDateString('ar-SA', { month: 'short', day: 'numeric', year: 'numeric' });
        timeMs = d.getTime();
      } else if (v.timestamp instanceof Date) {
        dateStr = v.timestamp.toLocaleDateString('ar-SA', { month: 'short', day: 'numeric', year: 'numeric' });
        timeMs = v.timestamp.getTime();
      }
    }

    allPoints.push({
      id: v.id,
      dateStr,
      timestampMs: timeMs,
      score: v.assessmentData?.calibratedScore ?? 50,
      severityLabel: v.assessmentData?.severityLabel ?? 'متوسط',
      severityColor: v.assessmentData?.severityColor ?? 'text-amber-400',
      caseTitle: v.caseTitle || v.assessmentData?.demographics?.caseTitle || 'زيارة سريرية سابقة',
      doctorNotes: v.doctorNotes || '',
      assessmentData: v.assessmentData,
      isCurrent: false,
    });
  });

  // Sort past visits by date ascending
  allPoints.sort((a, b) => a.timestampMs - b.timestampMs);

  // Add current assessment as the latest point
  allPoints.push({
    id: 'current_eval',
    dateStr: 'اليوم (الفحص الحالي)',
    timestampMs: Date.now(),
    score: currentAssessment.calibratedScore,
    severityLabel: currentAssessment.severityLabel,
    severityColor: currentAssessment.severityColor,
    caseTitle: currentAssessment.demographics.caseTitle || 'الفحص والتشخيص الجاري',
    doctorNotes: currentAssessment.doctorOverride?.clinicalNotes || '',
    assessmentData: currentAssessment,
    isCurrent: true,
  });

  const totalPoints = allPoints.length;
  const firstPoint = allPoints[0];
  const lastPoint = allPoints[allPoints.length - 1];

  // Calculate clinical delta
  const scoreDiff = lastPoint.score - firstPoint.score;
  const isImproved = scoreDiff <= 0;
  const absChange = Math.abs(scoreDiff);

  // SVG Chart dimensions
  const chartWidth = 600;
  const chartHeight = 200;
  const paddingX = 50;
  const paddingY = 30;

  const getCoordinates = (index: number, score: number) => {
    const x =
      totalPoints <= 1
        ? chartWidth / 2
        : paddingX + (index / (totalPoints - 1)) * (chartWidth - paddingX * 2);
    // Y inverted: 100% score is near top, 0% score is near bottom
    const y = chartHeight - paddingY - (score / 100) * (chartHeight - paddingY * 2);
    return { x, y };
  };

  const pointsCoords = allPoints.map((pt, idx) => ({
    ...pt,
    ...getCoordinates(idx, pt.score),
  }));

  // Build SVG path
  const linePath = pointsCoords.reduce((acc, curr, idx) => {
    return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
  }, '');

  // Build area fill path under line
  const areaPath =
    pointsCoords.length > 0
      ? `${linePath} L ${pointsCoords[pointsCoords.length - 1].x} ${chartHeight - paddingY} L ${pointsCoords[0].x} ${chartHeight - paddingY} Z`
      : '';

  return (
    <div
      className={`p-6 sm:p-7 rounded-3xl border transition-all space-y-6 ${
        theme === 'dark'
          ? 'bg-gradient-to-b from-[#0c1126] to-[#070b18] border-indigo-500/30 shadow-2xl'
          : 'bg-white border-indigo-100 shadow-xl'
      }`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-indigo-500/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`text-base sm:text-lg font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                مقارنة الزيارات وتطور الأعراض السريرية عبر الزمن
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                سجل Firebase
              </span>
            </div>
            <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} mt-0.5`}>
              تتبع المسار الطولي لدرجة المعايرة ونمط استجابة المريض ({currentAssessment.demographics.name}) للتدخلات.
            </p>
          </div>
        </div>

        {/* Progress Improvement Badge */}
        {totalPoints > 1 && (
          <div
            className={`px-4 py-2 rounded-2xl border text-xs font-bold flex items-center gap-2 ${
              isImproved
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                : 'bg-rose-500/15 border-rose-500/30 text-rose-400'
            }`}
          >
            {isImproved ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
            <span>
              {isImproved ? `تحسن إيجابي: انخفاض ${absChange}% في شدة الأعراض` : `ارتفاع ملحوظ: +${absChange}%`}
            </span>
          </div>
        )}
      </div>

      {/* SVG Timeline Trend Chart */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-[11px] text-slate-400 px-1 font-mono">
          <span>المنحنى الطولي للدرجة الموزونة (0% - 100%)</span>
          <span>إجمالي الزيارات المسجلة: {totalPoints}</span>
        </div>

        <div
          className={`relative p-4 rounded-2xl border overflow-x-auto ${
            theme === 'dark' ? 'bg-black/30 border-white/5' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-44 overflow-visible">
            <defs>
              <linearGradient id="scoreAreaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#818cf8" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#818cf8" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Reference horizontal guide lines */}
            {/* 100% line */}
            <line
              x1={paddingX}
              y1={paddingY}
              x2={chartWidth - paddingX}
              y2={paddingY}
              stroke={theme === 'dark' ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)'}
              strokeDasharray="4 4"
            />
            {/* 55% Severe cut-off line */}
            <line
              x1={paddingX}
              y1={chartHeight - paddingY - (55 / 100) * (chartHeight - paddingY * 2)}
              x2={chartWidth - paddingX}
              y2={chartHeight - paddingY - (55 / 100) * (chartHeight - paddingY * 2)}
              stroke="rgba(244, 63, 94, 0.25)"
              strokeDasharray="3 3"
            />
            {/* Baseline 0% line */}
            <line
              x1={paddingX}
              y1={chartHeight - paddingY}
              x2={chartWidth - paddingX}
              y2={chartHeight - paddingY}
              stroke={theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}
            />

            {/* Area Fill */}
            {totalPoints > 1 && <path d={areaPath} fill="url(#scoreAreaGradient)" />}

            {/* Connecting Stroke */}
            {totalPoints > 1 && (
              <path
                d={linePath}
                fill="none"
                stroke="#6366f1"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Data Dots and Text Overlays */}
            {pointsCoords.map((pt, idx) => (
              <g key={pt.id} className="cursor-pointer group">
                {/* Glow ring for current visit */}
                {pt.isCurrent && (
                  <circle cx={pt.x} cy={pt.y} r="10" fill="#a855f7" opacity="0.3" className="animate-ping" />
                )}

                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={pt.isCurrent ? 7 : 5}
                  fill={pt.isCurrent ? '#a855f7' : '#6366f1'}
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  className="transition-transform group-hover:scale-125"
                />

                {/* Score Tag above node */}
                <text
                  x={pt.x}
                  y={pt.y - 12}
                  textAnchor="middle"
                  fill={pt.isCurrent ? '#c084fc' : (theme === 'dark' ? '#e2e8f0' : '#1e293b')}
                  fontSize="11"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  {pt.score}%
                </text>

                {/* Date Tag beneath axis */}
                <text
                  x={pt.x}
                  y={chartHeight - 8}
                  textAnchor="middle"
                  fill={theme === 'dark' ? '#94a3b8' : '#64748b'}
                  fontSize="9.5"
                  fontFamily="sans-serif"
                >
                  {pt.dateStr}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Longitudinal Comparison Data Table */}
      <div className="space-y-3">
        <div className="text-xs font-bold text-slate-400 flex items-center gap-2">
          <History className="w-4 h-4 text-purple-400" />
          <span>جدول مقارنة الزيارات وتطور المقاييس:</span>
        </div>

        <div className="space-y-2.5">
          {allPoints.map((pt, idx) => (
            <div
              key={pt.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
                pt.isCurrent
                  ? 'border-purple-500/40 bg-purple-500/10 shadow-lg'
                  : theme === 'dark'
                  ? 'border-white/5 bg-white/5 hover:border-white/15'
                  : 'border-slate-200 bg-white hover:shadow-sm'
              }`}
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span
                    className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg border ${
                      pt.isCurrent
                        ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                        : 'bg-white/10 text-slate-300 border-white/10'
                    }`}
                  >
                    {pt.isCurrent ? 'الزيارة الحالية' : `زيارة #${idx + 1}`}
                  </span>
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{pt.dateStr}</span>
                  </span>
                  <span className={`text-xs font-bold ${pt.severityColor}`}>
                    ({pt.severityLabel})
                  </span>
                </div>

                <div className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {pt.caseTitle}
                </div>

                {pt.doctorNotes && (
                  <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} leading-relaxed`}>
                    <strong className="text-indigo-400">ملاحظات الطبيب: </strong>
                    {pt.doctorNotes}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                <div className={`p-2.5 rounded-xl border text-center ${theme === 'dark' ? 'bg-black/30 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="text-[10px] text-slate-500">الدرجة الموزونة</div>
                  <div className="text-lg font-black font-mono text-purple-400">
                    {pt.score}%
                  </div>
                </div>

                {!pt.isCurrent && onSelectVisit && (
                  <button
                    type="button"
                    onClick={() => onSelectVisit(pt.assessmentData)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-1 cursor-pointer ${
                      theme === 'dark'
                        ? 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                        : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>استعراض</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
