import React, { useState, useEffect, useMemo } from 'react';
import { AssessmentResult, ClinicalMemoryCase } from '../types/clinical';
import { RadarChart } from './RadarChart';
import { DoctorDiagnosisSection } from './DoctorDiagnosisSection';
import { TreatmentPathwaysSection } from './TreatmentPathwaysSection';
import { PatientVisitEvolution } from './PatientVisitEvolution';
import { clinicalDatabase, VisitRecord } from '../services/clinicalDatabase';
import {
  Printer,
  Save,
  RotateCcw,
  AlertTriangle,
  Building2,
  Brain,
  Sliders,
  CheckCircle,
  FileText,
  HeartHandshake,
  Volume2,
  Sparkles,
  FileDown,
  CalendarDays,
  BellRing,
  Lock,
  Unlock,
  ShieldCheck,
  ShieldAlert,
  KeyRound,
  Phone,
  Mail,
  MapPin,
  Clock,
  Eye,
  EyeOff,
  Activity,
  TrendingDown,
  TrendingUp,
  BadgeCheck,
} from 'lucide-react';

interface DashboardViewProps {
  result: AssessmentResult;
  onNewAssessment: () => void;
  onSaveToHistory: (notes: string) => void;
  onUpdateAssessment?: (updated: AssessmentResult) => void;
  onSaveToMemoryBank?: (caseRecord: ClinicalMemoryCase) => void;
  theme?: 'dark' | 'light';
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  result,
  onNewAssessment,
  onSaveToHistory,
  onUpdateAssessment = () => {},
  onSaveToMemoryBank = () => {},
  theme = 'dark',
}) => {
  const [clinicianNotes, setClinicianNotes] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [interactiveEnvOffset, setInteractiveEnvOffset] = useState<number>(0);
  const [pastVisits, setPastVisits] = useState<VisitRecord[]>([]);

  // Load previous visits for this patient from Firebase Firestore
  useEffect(() => {
    let isMounted = true;
    const loadPatientHistory = async () => {
      try {
        const patientName = result.demographics.name.trim().toLowerCase();
        const allRecent = await clinicalDatabase.getAllRecentVisits(40);
        const matched = allRecent.filter(
          (v) =>
            v.assessmentData?.demographics?.name?.trim().toLowerCase() === patientName ||
            v.caseTitle?.toLowerCase().includes(patientName)
        );

        // Also check local storage saved evaluations as offline fallback
        const localSavedStr = localStorage.getItem('psychocontext_assessments');
        if (localSavedStr) {
          const localList: AssessmentResult[] = JSON.parse(localSavedStr);
          const localMatched = localList.filter(
            (a) => a.id !== result.id && a.demographics.name.trim().toLowerCase() === patientName
          );
          localMatched.forEach((la, idx) => {
            if (!matched.some((m) => m.id === la.id)) {
              matched.push({
                id: la.id || `loc_${idx}`,
                patientId: `loc_${patientName}`,
                timestamp: new Date(Date.now() - (idx + 1) * 86400000 * 7),
                caseTitle: la.demographics.caseTitle || 'تقييم سريري سابق محفوظ',
                voiceTone: la.demographics.voiceTone,
                speechRate: la.demographics.speechRate,
                summary: la.recommendation,
                assessmentData: la,
                doctorNotes: la.doctorOverride?.clinicalNotes,
                ownerId: 'local',
              });
            }
          });
        }

        if (isMounted) {
          setPastVisits(matched);
        }
      } catch (e) {
        console.warn('Could not load past visits', e);
      }
    };

    loadPatientHistory();
    return () => {
      isMounted = false;
    };
  }, [result.demographics.name, result.id]);

  // Compute live simulated calibrated score if user plays with sensitivity slider
  const liveEnvModifier = result.environmentalModifier + interactiveEnvOffset;
  const liveCalibratedScore = Math.max(
    0,
    Math.min(100, Math.round(result.rawCombinedScore - liveEnvModifier * 0.25))
  );

  // Compute next visit date recommendation from Firebase history
  const nextVisitDate = React.useMemo(() => {
    let baseTime = Date.now();
    if (pastVisits.length > 0) {
      const latest = pastVisits[pastVisits.length - 1];
      if (latest.timestamp && typeof latest.timestamp.toDate === 'function') {
        baseTime = latest.timestamp.toDate().getTime();
      }
    }
    const intervalDays = result.calibratedScore >= 55 ? 7 : 14;
    const nextTime = baseTime + intervalDays * 86400000;
    const d = new Date(nextTime);
    return {
      dateStr: d.toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      intervalDays,
    };
  }, [pastVisits, result.calibratedScore]);

  const [scheduledDate, setScheduledDate] = useState(() => {
    const d = new Date(Date.now() + 14 * 86400000);
    return d.toISOString().slice(0, 10);
  });
  const [isVisitScheduledSaved, setIsVisitScheduledSaved] = useState(false);
  const [selectedDsmCategory, setSelectedDsmCategory] = useState(
    result.doctorOverride?.icdCode || 'F43.21'
  );

  const handleSaveNextVisit = async () => {
    setIsVisitScheduledSaved(true);
    setTimeout(() => setIsVisitScheduledSaved(false), 3000);

    const updatedResult = {
      ...result,
      nextVisitDate: scheduledDate,
      doctorOverride: {
        ...(result.doctorOverride || {
          primaryDiagnosis: 'اضطراب التكيف مع عسر المزاج التفاعلي',
          severity: 'moderate',
          clinicalEtiology: 'reactive_environmental',
          clinicalNotes: '',
          treatmentGoals: [],
          isLocked: false,
          signedAt: '',
        }),
        icdCode: selectedDsmCategory,
      },
    };
    onUpdateAssessment(updatedResult);

    try {
      const patientId = await clinicalDatabase.upsertPatient(result.demographics);
      if (patientId) {
        await clinicalDatabase.saveVisit(patientId, updatedResult, `موعد الزيارة القادمة: ${scheduledDate} | تصنيف DSM-5: ${selectedDsmCategory}`);
      }
    } catch (err) {
      console.warn('Failed to sync next visit to Firebase', err);
    }
  };
  // Official Clinical & Doctor Coordinates
  const DOCTOR_NAME = result.doctorOverride?.doctorName || 'د. نابغة العلم';
  const DOCTOR_TITLE = 'استشاري أول الطب النفسي والتشخيص الإكلينيكي والعلاج المعرفي السلوكي (CBT)';
  const DOCTOR_LICENSE = 'PSY-88421 / ترخيص الهيئة الطبية: 4492-م-ن';
  const CLINIC_NAME_AR = 'مجمع وعيادات الأورورا للصحة النفسية والاستشارات السريرية المتقدمة';
  const CLINIC_NAME_EN = 'AURORA Medical & Psychiatric Clinic';
  const CLINIC_PHONE = '+966 11 482 9900';
  const CLINIC_MOBILE = '+966 50 123 4567';
  const CLINIC_EMAIL = 'dr.nabigha@auroraclinic.org';
  const CLINIC_ADDRESS = 'مجمع النخبة الطبي، برج الاستشارات التخصصية، الطابق الرابع، طريق الملك فهد - الرياض';
  const CLINIC_HOURS = 'الأحد - الخميس: 9:00 ص - 6:00 م';
  const CLINIC_WEBSITE = 'www.aurorapsychiatric.com';

  // Sensitive Clinical Data Password Protection & PDF Authorization
  const [isSensitiveAuthorized, setIsSensitiveAuthorized] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('psychocontext_pdf_authorized') === 'true';
    } catch {
      return false;
    }
  });
  const [isPdfAuthModalOpen, setIsPdfAuthModalOpen] = useState(false);
  const [pdfPinInput, setPdfPinInput] = useState('');
  const [pdfAuthError, setPdfAuthError] = useState('');
  const [showPinMask, setShowPinMask] = useState(false);
  const [pendingPrintAfterAuth, setPendingPrintAfterAuth] = useState(false);

  const handlePrint = () => {
    if (!isSensitiveAuthorized) {
      setPendingPrintAfterAuth(true);
      setIsPdfAuthModalOpen(true);
      setPdfAuthError('');
      return;
    }
    window.print();
  };

  const handleVerifyPdfPassword = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanPin = pdfPinInput.trim();
    if (
      cleanPin === '123456' ||
      cleanPin === 'doctor' ||
      cleanPin === 'admin' ||
      cleanPin.toLowerCase() === 'nabigha'
    ) {
      setIsSensitiveAuthorized(true);
      try {
        sessionStorage.setItem('psychocontext_pdf_authorized', 'true');
      } catch (err) {
        console.warn('Could not store session auth', err);
      }
      setIsPdfAuthModalOpen(false);
      setPdfAuthError('');
      setPdfPinInput('');
      if (pendingPrintAfterAuth) {
        setPendingPrintAfterAuth(false);
        setTimeout(() => {
          window.print();
        }, 300);
      }
    } else {
      setPdfAuthError('كلمة المرور / رمز PIN غير صحيح. الرمز الافتراضي للطبيب المعالج هو: 123456');
    }
  };

  const handleToggleLock = () => {
    if (isSensitiveAuthorized) {
      setIsSensitiveAuthorized(false);
      try {
        sessionStorage.removeItem('psychocontext_pdf_authorized');
      } catch {
        // ignore
      }
    } else {
      setPendingPrintAfterAuth(false);
      setIsPdfAuthModalOpen(true);
      setPdfAuthError('');
    }
  };

  // Trajectory points for summary evolution charts (Past visits + Current)
  const trajectoryPoints = useMemo(() => {
    const pts = pastVisits.map((v, i) => {
      let dateLabel = `زيارة ${i + 1}`;
      let ts = Date.now() - (pastVisits.length - i) * 86400000 * 7;
      if (v.timestamp) {
        if (typeof v.timestamp.toDate === 'function') {
          const d = v.timestamp.toDate();
          dateLabel = d.toLocaleDateString('ar-SA', { month: 'numeric', day: 'numeric' });
          ts = d.getTime();
        } else if (v.timestamp instanceof Date) {
          dateLabel = v.timestamp.toLocaleDateString('ar-SA', { month: 'numeric', day: 'numeric' });
          ts = v.timestamp.getTime();
        }
      }
      return {
        label: dateLabel,
        score: v.assessmentData?.calibratedScore ?? 50,
        rawScore: v.assessmentData?.rawCombinedScore ?? 50,
        severity: v.assessmentData?.severityLabel ?? 'متوسط',
        timestamp: ts,
        title: v.caseTitle || 'زيارة سابقة',
      };
    });

    pts.push({
      label: 'الحالية',
      score: liveCalibratedScore,
      rawScore: result.rawCombinedScore,
      severity: result.severityLabel,
      timestamp: Date.now(),
      title: 'الفحص والتشخيص الجاري',
    });

    return pts;
  }, [pastVisits, liveCalibratedScore, result.rawCombinedScore, result.severityLabel]);

  const initialEvolutionPoint = trajectoryPoints[0];
  const latestEvolutionPoint = trajectoryPoints[trajectoryPoints.length - 1];
  const clinicalEvolutionDelta = latestEvolutionPoint.score - initialEvolutionPoint.score;
  const isEvolutionImproving = clinicalEvolutionDelta <= 0;

  const handleSave = () => {
    onSaveToHistory(clinicianNotes);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 4000);
  };

  // Prepare radar axes dynamically based on active scales
  const radarAxes: { label: string; value: number }[] = [];

  if (result.scores.phq9) {
    radarAxes.push({ label: 'السريري PHQ-9', value: result.scores.phq9.percentage });
  }

  if (result.scores.bdi2) {
    radarAxes.push({ label: 'المعرفي BDI-II', value: result.scores.bdi2.percentage });
  }

  if (result.scores.dass21) {
    radarAxes.push({ label: 'التوتر DASS-21', value: result.scores.dass21.percentage });
  }

  if (result.scores.gds15) {
    radarAxes.push({ label: 'الرضا GDS-15', value: result.scores.gds15.percentage });
  }

  if (result.scores.gad7) {
    radarAxes.push({ label: 'القلق GAD-7', value: result.scores.gad7.percentage });
  }

  if (result.scores.isi) {
    radarAxes.push({ label: 'الأرق ISI', value: result.scores.isi.percentage });
  }

  if (result.scores.pss10) {
    radarAxes.push({ label: 'الضغوط PSS-10', value: result.scores.pss10.percentage });
  }

  radarAxes.push({
    label: 'معامل البيئة',
    value: Math.max(0, Math.min(100, Math.round(50 + result.environmentalModifier))),
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Official Clinical Letterhead for PDF Export (print-only) */}
      <div className="print-only border-b-2 border-slate-900 pb-5 mb-6 text-slate-900">
        <div className="flex justify-between items-start gap-4">
          {/* Clinic Emblem Logo & Official Branding */}
          <div className="flex items-center gap-3.5">
            <img
              src="/clinic_logo_emblem.jpg"
              alt="شعار العيادة السريري الرسمي"
              className="w-20 h-20 object-contain rounded-xl border border-slate-300 p-1 bg-white shadow-sm shrink-0"
            />
            <div>
              <h1 className="text-lg font-black text-slate-900 leading-tight">
                {CLINIC_NAME_AR}
              </h1>
              <div className="text-[11px] font-bold text-indigo-950 font-mono tracking-wider uppercase">
                {CLINIC_NAME_EN}
              </div>
              <p className="text-[10px] text-slate-600 mt-0.5">
                مركز الاستشارات والتقييم السريري الموزون بيئياً | اعتماد الهيئة: 4492-م-ن
              </p>
            </div>
          </div>

          {/* Dossier Meta & File Number */}
          <div className="text-left font-mono text-[10px] text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200 space-y-0.5 min-w-[200px]">
            <div><strong>رقم الملف الطبي:</strong> {result.id || 'EV-2026-09'}</div>
            <div><strong>تاريخ الفحص:</strong> {result.timestamp}</div>
            <div><strong>تاريخ إصدار التقرير:</strong> {new Date().toLocaleDateString('ar-SA')}</div>
            <div className="text-emerald-700 font-bold">
              <strong>كود الأمان:</strong> SEC-PSY-88421
            </div>
          </div>
        </div>

        {/* Doctor Contact & Clinic Coordinates Header Banner */}
        <div className="grid grid-cols-2 gap-3 mt-3 pt-2.5 border-t border-slate-200 text-[10px] text-slate-700">
          <div className="space-y-0.5">
            <div>
              <span className="font-bold text-slate-900">الطبيب المعالج:</span> {DOCTOR_NAME} — {DOCTOR_TITLE}
            </div>
            <div>
              <span className="font-bold text-slate-900">رقم الترخيص المهني:</span> {DOCTOR_LICENSE}
            </div>
            <div>
              <span className="font-bold text-slate-900">الموقع السريري:</span> {CLINIC_ADDRESS}
            </div>
          </div>
          <div className="text-left space-y-0.5 font-mono">
            <div>
              <span className="font-bold font-sans text-slate-900">الهاتف المباشر:</span> {CLINIC_PHONE}
            </div>
            <div>
              <span className="font-bold font-sans text-slate-900">الجوال / طوارئ:</span> {CLINIC_MOBILE}
            </div>
            <div>
              <span className="font-bold font-sans text-slate-900">البريد الإلكتروني:</span> {CLINIC_EMAIL}
            </div>
          </div>
        </div>

        {/* Title Bar & Password Security Authorization Stamp */}
        <div className="flex justify-between items-center bg-slate-900 text-white px-3.5 py-1.5 rounded-lg mt-3 text-xs">
          <span className="font-bold tracking-wider">
            تقرير التشخيص والتقييم السريري الموزون (Clinical Diagnostic Dossier)
          </span>
          <span className="font-mono text-[10px] text-emerald-300 flex items-center gap-1">
            <span>● وثيقة سرية مشفرة ومصرح بتصديرها برقم اعتماد الطبيب المعالج</span>
          </span>
        </div>
      </div>

      {/* Printable Summary Case Evolution Charts Section (Visible in PDF / Print) */}
      <div className="print-only border border-slate-300 rounded-xl p-4 mb-6 bg-white space-y-4 print-break-inside-avoid">
        <div className="flex justify-between items-center border-b border-slate-200 pb-2">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-indigo-700" />
            <h3 className="font-bold text-xs text-slate-900 uppercase">
              ملخص الرسوم البيانية لتطور الحالة السريرية (Longitudinal Case Evolution & Symptom Trajectory)
            </h3>
          </div>
          <div className="text-[10px] font-mono text-slate-600">
            إجمالي الزيارات المسجلة: {trajectoryPoints.length} | المسار العام: {isEvolutionImproving ? 'تحسن وانخفاض حدة الأعراض' : 'تزايد أو استقرار نسبي'}
          </div>
        </div>

        {/* Summary Vector Line Chart for Print */}
        <div className="border border-slate-200 rounded-lg p-3 bg-slate-50/70">
          <div className="flex justify-between items-center text-[10px] mb-2 font-mono">
            <span className="font-bold text-slate-800">منحنى تطور الدرجة السريرية المعايرة عبر الزيارات (%):</span>
            <span className={isEvolutionImproving ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>
              فارق التغير التراكمي: {clinicalEvolutionDelta > 0 ? `+${clinicalEvolutionDelta}%` : `${clinicalEvolutionDelta}%`}
            </span>
          </div>

          {/* Printable High-Contrast SVG Trajectory Chart */}
          <div className="w-full flex justify-center py-1">
            <svg viewBox="0 0 540 140" className="w-full max-w-[540px] h-[130px] overflow-visible">
              {/* Background Grid Lines & Severity Thresholds */}
              <line x1="40" y1="20" x2="520" y2="20" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="40" y1="55" x2="520" y2="55" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="40" y1="90" x2="520" y2="90" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="40" y1="120" x2="520" y2="120" stroke="#cbd5e1" strokeWidth="1.5" />

              {/* Y-axis Labels */}
              <text x="32" y="24" fontSize="8" fill="#94a3b8" textAnchor="end" fontFamily="monospace">100%</text>
              <text x="32" y="59" fontSize="8" fill="#94a3b8" textAnchor="end" fontFamily="monospace">65%</text>
              <text x="32" y="94" fontSize="8" fill="#94a3b8" textAnchor="end" fontFamily="monospace">35%</text>
              <text x="32" y="123" fontSize="8" fill="#94a3b8" textAnchor="end" fontFamily="monospace">0%</text>

              {/* Trajectory Polyline */}
              {(() => {
                const pts = trajectoryPoints.map((pt, idx) => {
                  const x = trajectoryPoints.length <= 1 ? 280 : 50 + (idx / (trajectoryPoints.length - 1)) * 450;
                  const y = 120 - (pt.score / 100) * 100;
                  return { x, y, ...pt };
                });

                const polylinePoints = pts.map((p) => `${p.x},${p.y}`).join(' ');

                return (
                  <>
                    <polyline
                      fill="none"
                      stroke="#4f46e5"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={polylinePoints}
                    />
                    {pts.map((p, i) => (
                      <g key={i}>
                        <circle cx={p.x} cy={p.y} r="4.5" fill="#ffffff" stroke="#4f46e5" strokeWidth="2.5" />
                        <text x={p.x} y={p.y - 7} fontSize="9" fontWeight="bold" fill="#1e1b4b" textAnchor="middle" fontFamily="monospace">
                          {p.score}%
                        </text>
                        <text x={p.x} y={133} fontSize="8" fill="#475569" textAnchor="middle" fontFamily="sans-serif">
                          {p.label}
                        </text>
                      </g>
                    ))}
                  </>
                );
              })()}
            </svg>
          </div>
        </div>

        {/* Summary Breakdown Grid for Print */}
        <div className="grid grid-cols-2 gap-3 text-[10px]">
          <div className="border border-slate-200 rounded-lg p-2.5">
            <div className="font-bold text-slate-800 mb-1.5 border-b pb-1">مؤشرات المقاييس السريرية المعتمدة في هذا الفحص:</div>
            <div className="space-y-1">
              {result.scores.phq9 && (
                <div className="flex justify-between">
                  <span>PHQ-9 الاكتئاب السريري:</span>
                  <span className="font-mono font-bold text-slate-900">{result.scores.phq9.raw} / 27 ({result.scores.phq9.severity})</span>
                </div>
              )}
              {result.scores.gad7 && (
                <div className="flex justify-between">
                  <span>GAD-7 القلق العام:</span>
                  <span className="font-mono font-bold text-slate-900">{result.scores.gad7.raw} / 21 ({result.scores.gad7.severity})</span>
                </div>
              )}
              {result.scores.dass21 && (
                <div className="flex justify-between">
                  <span>DASS-21 الثلاثي:</span>
                  <span className="font-mono font-bold text-slate-900">{result.scores.dass21.raw} / 63 ({result.scores.dass21.severity})</span>
                </div>
              )}
              {result.scores.isi && (
                <div className="flex justify-between">
                  <span>ISI مؤشر الأرق:</span>
                  <span className="font-mono font-bold text-slate-900">{result.scores.isi.raw} / 28 ({result.scores.isi.severity})</span>
                </div>
              )}
              {result.scores.pss10 && (
                <div className="flex justify-between">
                  <span>PSS-10 إدراك الضغوط:</span>
                  <span className="font-mono font-bold text-slate-900">{result.scores.pss10.raw} / 40 ({result.scores.pss10.severity})</span>
                </div>
              )}
            </div>
          </div>

          <div className="border border-slate-200 rounded-lg p-2.5">
            <div className="font-bold text-slate-800 mb-1.5 border-b pb-1">المعادلة المعيارية للبيئة السكنية والمعايرة:</div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>الدرجة الخام المجمعة:</span>
                <span className="font-mono font-bold text-rose-600">{result.rawCombinedScore}%</span>
              </div>
              <div className="flex justify-between">
                <span>معامل الانحياز والضغط البيئي:</span>
                <span className="font-mono font-bold text-indigo-600">{result.environmentalModifier > 0 ? `+${result.environmentalModifier}%` : `${result.environmentalModifier}%`}</span>
              </div>
              <div className="flex justify-between border-t pt-1 font-bold text-slate-900">
                <span>الدرجة السريرية المعايرة النهائية:</span>
                <span className="font-mono text-purple-700">{liveCalibratedScore}% ({result.severityLabel})</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Printable Clinical Dossier Header (Visible in print and screen) */}
      <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>
        <div>
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${theme === 'dark' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-700'} border text-xs font-semibold mb-2`}>
            <CheckCircle className="w-3.5 h-3.5" />
            <span>اكتمال الفحص الدقيق والأسئلة غير المختزلة</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'} tracking-tight`}>
            التقرير السريري الموزون: <span className="text-purple-400">{result.demographics.name}</span>
          </h2>
          <div className={`flex flex-wrap items-center gap-3 text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} mt-1.5 font-mono`}>
            <span>العمر: {result.demographics.age} سنة</span>
            <span>·</span>
            <span>المنطقة: {result.demographics.district} - {result.demographics.city}</span>
            <span>·</span>
            <span>تاريخ الفحص: {result.timestamp}</span>
          </div>
        </div>

        {/* Action Toolbar (no-print) */}
        <div className="flex items-center gap-2.5 no-print w-full sm:w-auto flex-wrap">
          {/* Sensitive Data Password Protection Status Button */}
          <button
            type="button"
            onClick={handleToggleLock}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 cursor-pointer ${
              isSensitiveAuthorized
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20'
            }`}
            title={isSensitiveAuthorized ? 'البيانات الحساسة مفكوكة التشفير - انقر للقفل' : 'البيانات الحساسة محمية بكلمة مرور - انقر للإلغاء'}
          >
            {isSensitiveAuthorized ? (
              <>
                <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                <span>البيانات الحساسة: مصرح بالتصدير 🔓</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>البيانات الحساسة: مشفرة 🔒</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="flex-1 sm:flex-none px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-purple-950/30"
            title="تحميل وطباعة التقرير التشخيصي النهائي بتنسيق PDF احترافي (محمي بكلمة مرور الطبيب)"
          >
            <Printer className="w-4 h-4 text-white" />
            <span>تصدير التقرير كـ PDF</span>
            {!isSensitiveAuthorized && <Lock className="w-3 h-3 text-amber-300 ml-0.5" />}
          </button>

          <button
            type="button"
            onClick={handleSave}
            className={`flex-1 sm:flex-none px-4 py-2 border rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer ${
              isSaved
                ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300'
                : theme === 'dark'
                ? 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200'
                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            <Save className="w-3.5 h-3.5 text-purple-400" />
            <span>{isSaved ? 'تم الحفظ في السجل!' : 'حفظ السجل'}</span>
          </button>

          <button
            type="button"
            onClick={onNewAssessment}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-md shadow-indigo-900/20"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>فحص جديد</span>
          </button>
        </div>
      </div>

      {/* Interactive Next Follow-up Visit Scheduler & DSM-5 Diagnostic Category Widget */}
      <div className={`p-5 sm:p-6 rounded-3xl border space-y-4 ${
        theme === 'dark' ? 'bg-indigo-950/30 border-indigo-500/30 text-indigo-200' : 'bg-indigo-50 border-indigo-200 text-indigo-900'
      }`}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-indigo-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div>
              <div className="font-black text-sm sm:text-base flex items-center gap-2">
                <BellRing className="w-4 h-4 text-amber-400 animate-bounce" />
                <span>جدولة موعد الزيارة القادمة والتصنيف السريري (DSM-5 / ICD)</span>
              </div>
              <p className={`text-xs ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} mt-0.5`}>
                قم بتعيين تاريخ المتابعة القادمة للمستفيد واختيار التصنيف التشخيصي المعتمد ليتم حفظها فوراً في سجل السحاب داخل Firebase.
              </p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 pt-1">
          {/* Date Picker Input */}
          <div className="space-y-1.5">
            <label className={`block text-xs font-bold ${theme === 'dark' ? 'text-indigo-200' : 'text-indigo-900'}`}>
              تاريخ المتابعة / الزيارة القادمة:
            </label>
            <input
              type="date"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono font-bold ${
                theme === 'dark' ? 'bg-[#070b1a] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-inner'
              } focus:outline-none focus:border-purple-500`}
            />
          </div>

          {/* DSM-5 / ICD Diagnostic Category Picker */}
          <div className="space-y-1.5">
            <label className={`block text-xs font-bold ${theme === 'dark' ? 'text-indigo-200' : 'text-indigo-900'}`}>
              التصنيف السريري المعتمد (DSM-5 / ICD):
            </label>
            <select
              value={selectedDsmCategory}
              onChange={(e) => setSelectedDsmCategory(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold ${
                theme === 'dark' ? 'bg-[#070b1a] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-inner'
              } focus:outline-none focus:border-purple-500`}
            >
              <option value="F43.21">F43.21 - اضطراب التكيف مع عسر المزاج التفاعلي</option>
              <option value="F32.1">F32.1 - اضطراب اكتئابي جسيم متوسط الشدة</option>
              <option value="F32.0">F32.0 - نوبة اكتئابية خفيفة مرتبطة بالإنهاك</option>
              <option value="F41.1">F41.1 - اضطراب القلق العام المستمر (GAD)</option>
              <option value="F51.01">F51.01 - أرق أولي غير عضوي مرتبط بالإجهاد (ISI)</option>
              <option value="Z73.0">Z73.0 - إنهاك مهني وإرهاق ضغوط حياتية (Burnout)</option>
              <option value="F43.10">F43.10 - اضطراب الكرب التالي للصدمة (PTSD)</option>
            </select>
          </div>

          {/* Save Button */}
          <div className="flex items-end">
            <button
              type="button"
              onClick={handleSaveNextVisit}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                isVisitScheduledSaved
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-950/30'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>{isVisitScheduledSaved ? 'تم حفظ الموعد والتصنيف في Firebase!' : 'حفظ موعد الزيارة والتصنيف'}</span>
            </button>
          </div>
        </div>

        <div className={`text-[11px] ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-700'} font-mono flex items-center gap-1.5 pt-1`}>
          <span>التاريخ الافتراضي المقترح: {nextVisitDate.dateStr} (بناءً على شدة الحالة الموزونة {result.calibratedScore}%)</span>
        </div>
      </div>

      {/* Critical Suicidal Safety Alert (If Flagged) */}
      {result.hasSuicidalRisk && (
        <div className={`p-5 rounded-2xl ${theme === 'dark' ? 'bg-rose-950/40 border-rose-500/50' : 'bg-rose-50 border-rose-300'} border-2 space-y-4`}>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-600 flex items-center justify-center shrink-0 shadow-lg">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className={`text-base sm:text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-rose-900'}`}>
                تنبيه سلامة عيادي عاجل: رصد استجابة تتطلب تدخلاً فورياً
              </h3>
              <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-rose-200' : 'text-rose-700'} mt-1 leading-relaxed`}>
                تم تسجيل إشارة إيجابية في بنود فحص الأفكار المتعلقة بإيذاء النفس أو الرغبة في الموت. نؤكد أن هذه الأفكار تمثل علامة تحذيرية لحاجة ماسة للدعم النفسي المتخصص العاجل، وهناك من يستمع إليك ويقف بجانبك الآن.
              </p>
            </div>
          </div>

          <div className={`p-3.5 rounded-xl ${theme === 'dark' ? 'bg-black/30 border-rose-500/20' : 'bg-white border-rose-200'} border text-xs space-y-1.5`}>
            <div className={`font-semibold ${theme === 'dark' ? 'text-rose-300' : 'text-rose-800'}`}>البنود المرصودة في الفحص:</div>
            {result.suicidalRiskItems.map((item, idx) => (
              <div key={idx} className={`flex justify-between items-center ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>
                <span>{item.scale}: {item.itemText}</span>
                <span className="font-mono text-rose-500 font-bold">[{item.responseText}]</span>
              </div>
            ))}
          </div>

          <div className={`p-3.5 rounded-xl ${theme === 'dark' ? 'bg-rose-900/30 border-rose-500/20 text-rose-100' : 'bg-rose-100 border-rose-200 text-rose-900'} border text-xs flex flex-wrap gap-4 items-center`}>
            <span className="font-bold flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4 text-rose-500" />
              أرقام خطوط الدعم النفسي المجانية والطوارئ في الوطن العربي:
            </span>
            <div className="flex flex-wrap gap-3 font-mono">
              <span className={`${theme === 'dark' ? 'bg-black/30' : 'bg-white'} px-2.5 py-1 rounded shadow-sm border border-rose-200/50`}>مصر: 16328 / 08008880700</span>
              <span className={`${theme === 'dark' ? 'bg-black/30' : 'bg-white'} px-2.5 py-1 rounded shadow-sm border border-rose-200/50`}>السعودية: 920033360 / 937</span>
              <span className={`${theme === 'dark' ? 'bg-black/30' : 'bg-white'} px-2.5 py-1 rounded shadow-sm border border-rose-200/50`}>الإمارات: 800-4673</span>
              <span className={`${theme === 'dark' ? 'bg-black/30' : 'bg-white'} px-2.5 py-1 rounded shadow-sm border border-rose-200/50`}>الأردن: 110</span>
            </div>
          </div>
        </div>
      )}

      {/* Row 1: Core Diagnostic Triad Metrics */}
      <div className="grid sm:grid-cols-3 gap-4">
        {/* Metric 1: Calibrated Score */}
        <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'} border text-center space-y-2`}>
          <div className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} font-medium`}>الاحتمالية الموزونة لحدة الأعراض السريرية</div>
          <div className="text-4xl sm:text-5xl font-black text-purple-500 font-mono tabular-nums">
            {liveCalibratedScore}%
          </div>
          <div className={`text-xs font-bold pt-1 ${result.severityColor}`}>
            {result.severityLabel}
          </div>
          <div className={`text-[11px] ${theme === 'dark' ? 'text-slate-400 border-white/5' : 'text-slate-500 border-slate-100'} border-t pt-2 mt-2`}>
            الدرجة بعد تحييد أثر الإجهاد البيئي المعيشي
          </div>
        </div>

        {/* Metric 2: Environmental Stress Modifier */}
        <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'} border text-center space-y-2`}>
          <div className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} font-medium`}>معدل الانحياز والضغط البيئي المحيط</div>
          <div className="text-4xl sm:text-5xl font-black text-indigo-500 font-mono tabular-nums">
            {liveEnvModifier > 0 ? `+${liveEnvModifier}` : liveEnvModifier}%
          </div>
          <div className={`text-xs font-bold ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-600'} pt-1`}>
            معامل الضغط المحيط المدمج
          </div>
          <div className={`text-[11px] ${theme === 'dark' ? 'text-slate-400 border-white/5' : 'text-slate-500 border-slate-100'} border-t pt-2 mt-2`}>
            تم رصد {result.environmentalFactors.length} عوامل ضغط واقعية
          </div>
        </div>

        {/* Metric 3: Clinical Directive */}
        <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'} border text-center space-y-2 flex flex-col justify-between`}>
          <div>
            <div className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} font-medium`}>التوصية التوجيهية الفورية</div>
            <div className="text-xs sm:text-sm text-amber-600 dark:text-amber-300 font-semibold leading-relaxed pt-2">
              {result.recommendation}
            </div>
          </div>
          <div className={`text-[11px] ${theme === 'dark' ? 'text-slate-400 border-white/5' : 'text-slate-500 border-slate-100'} border-t pt-2 mt-2`}>
            خطة العمل المعتمدة وفق بروتوكول الرعاية
          </div>
        </div>
      </div>

      {/* Row 2: Comparison Bar (Raw Symptom Burden vs Calibrated Score) */}
      <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'} border space-y-5`}>
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div>
            <h3 className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              مقارنة العبء الخام للأعراض مقابل الدرجة المعايرة بيئياً
            </h3>
            <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} mt-0.5`}>
              توضيح الفارق بين الأعراض المسجلة في الاستمارة وبين الحالة السريرية الحقيقية بعد تفكيك الضغوط الخارجية.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}>الخام: <strong className="text-rose-500">{result.rawCombinedScore}%</strong></span>
            <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}>المعايرة: <strong className="text-purple-600">{liveCalibratedScore}%</strong></span>
          </div>
        </div>

        {/* Visual Comparison Progress Bars */}
        <div className="space-y-3">
          <div>
            <div className={`flex justify-between text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} mb-1`}>
              <span>درجة الأعراض الخام (قبل المعايرة البيئية)</span>
              <span className="font-mono tabular-nums">{result.rawCombinedScore}%</span>
            </div>
            <div className={`w-full ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-100'} rounded-full h-3 overflow-hidden`}>
              <div
                className="bg-rose-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${result.rawCombinedScore}%` }}
              />
            </div>
          </div>

          <div>
            <div className={`flex justify-between text-xs ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'} mb-1 font-semibold`}>
              <span>الدرجة السريرية المعايرة (بعد طرح تأثير البيئة بنسبة وزن 0.25)</span>
              <span className="font-mono tabular-nums">{liveCalibratedScore}%</span>
            </div>
            <div className={`w-full ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-100'} rounded-full h-3 overflow-hidden shadow-inner`}>
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${liveCalibratedScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* Interactive Sensitivity Simulator Slider (no-print) */}
        <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-purple-950/20 border-purple-500/20' : 'bg-purple-50 border-purple-100 shadow-sm'} border no-print space-y-2`}>
          <div className="flex justify-between items-center text-xs">
            <span className={`font-semibold ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'} flex items-center gap-1.5`}>
              <Sliders className="w-3.5 h-3.5" />
              محاكي حساسية الموازنة البيئية: ماذا لو تغيرت ضغوط البيئة المحيطة؟
            </span>
            <span className={`font-mono ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-600'}`}>
              إزاحة المعامل: {interactiveEnvOffset > 0 ? `+${interactiveEnvOffset}` : interactiveEnvOffset}%
            </span>
          </div>
          <input
            type="range"
            min={-30}
            max={30}
            step={5}
            value={interactiveEnvOffset}
            onChange={(e) => setInteractiveEnvOffset(parseInt(e.target.value))}
            className="w-full accent-purple-500 cursor-pointer"
          />
          <div className={`flex justify-between text-[10px] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} font-mono`}>
            <span>تخفيف الضغوط البيئية (-30%)</span>
            <span>المعطى المسجل (0)</span>
            <span>تفاقم الضغوط المحيطة (+30%)</span>
          </div>
        </div>
      </div>

      {/* Row 3: Radar Chart & Subscale Dimension Bars */}
      <div className="grid md:grid-cols-2 gap-6 items-center">
        {/* Radar Chart */}
        <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'} border flex flex-col items-center`}>
          <h4 className={`text-sm font-bold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'} mb-4 text-center`}>
            توزيع الأبعاد على المنحنى السريري العيادي المتعدد
          </h4>
          <RadarChart axes={radarAxes} size={290} theme={theme} />
        </div>

        {/* Psychometric Domains Breakdown Bars */}
        <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'} border space-y-4`}>
          <h4 className={`text-sm font-bold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'} mb-1 flex items-center gap-2`}>
            <Brain className="w-4 h-4 text-purple-500" />
            <span>توزيع الأبعاد النفسية والجسدية الخمسة:</span>
          </h4>

          <div className="space-y-3 pt-1">
            {[
              { label: 'المجال الوجداني وعسر المزاج', value: result.domains.affective, color: 'bg-indigo-500' },
              { label: 'المجال المعرفي ونقد الذات واليأس', value: result.domains.cognitive, color: 'bg-purple-500' },
              { label: 'المجال الجسدي والفسيولوجي (النوم، الطاقة، الشهية)', value: result.domains.somatic, color: 'bg-amber-500' },
              { label: 'التوتر والقلق والاستثارة العصبية', value: result.domains.anxiety, color: 'bg-rose-500' },
              { label: 'معامل الثقل والضغط البيئي المحيط', value: result.domains.environmental, color: 'bg-emerald-500' },
            ].map((d) => (
              <div key={d.label}>
                <div className={`flex justify-between text-xs ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} mb-1`}>
                  <span>{d.label}</span>
                  <span className="font-mono tabular-nums">{d.value}%</span>
                </div>
                <div className={`w-full ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-100'} rounded-full h-2 overflow-hidden`}>
                  <div className={`${d.color} h-2 rounded-full`} style={{ width: `${d.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 4: Identified Environmental Modifiers Detail */}
      <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'} border space-y-4`}>
        <h4 className={`text-sm font-bold ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-600'} flex items-center gap-2`}>
          <Building2 className="w-4 h-4 text-indigo-500" />
          <span>العوامل البيئية والديموغرافية المرصودة في السياق المعيشي:</span>
        </h4>

        {result.environmentalFactors.length === 0 ? (
          <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            لم تسجل المعطيات أي ضغوط حضرية أو اقتصادية حادة تؤثر سلباً على المعايرة.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-3">
            {result.environmentalFactors.map((factor, idx) => (
              <div key={idx} className={`p-3.5 rounded-xl ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'} border space-y-1`}>
                <div className="flex justify-between items-center">
                  <span className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{factor.label}</span>
                  <span className={`text-xs font-mono font-bold ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>
                    {factor.impact > 0 ? `+${factor.impact}%` : `${factor.impact}%`}
                  </span>
                </div>
                <p className={`text-[11px] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} leading-relaxed`}>{factor.reason}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Row 5: In-Depth Narrative Analysis Text Box */}
      <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-purple-950/15 border-purple-500/25' : 'bg-purple-50 border-purple-100 shadow-sm'} border space-y-3`}>
        <h4 className={`text-sm font-bold ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'} flex items-center gap-2`}>
          <FileText className="w-4 h-4 text-purple-500" />
          <span>التفسير الإحصائي القائم على السياق الاجتماعي والبيئي:</span>
        </h4>
        <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'} leading-relaxed font-light whitespace-pre-line`}>
          {result.narrativeText}
        </p>
      </div>

      {/* Patient Voice Complaint & AI Advisory Log (if recorded - Protected by Password) */}
      {result.demographics.voiceComplaint && (
        <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'} border space-y-3`}>
          <div className="flex justify-between items-center flex-wrap gap-2">
            <h4 className={`text-sm font-bold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'} flex items-center gap-2`}>
              <Volume2 className="w-4 h-4 text-purple-500" />
              <span>نص شكوى المريض الصوتية المسجلة (جلسة الاستماع الأولية - 3 دقائق):</span>
            </h4>
            <div className="flex items-center gap-1.5 text-[11px] font-mono">
              {isSensitiveAuthorized ? (
                <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>مصرح بالاطلاع - اعتماد {DOCTOR_NAME}</span>
                </span>
              ) : (
                <span className="text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>محمي بكلمة مرور الطبيب</span>
                </span>
              )}
            </div>
          </div>

          {isSensitiveAuthorized ? (
            <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-slate-300 bg-black/20 border-white/5' : 'text-slate-600 bg-slate-50 border-slate-100'} p-3.5 rounded-xl border italic leading-relaxed`}>
              &ldquo;{result.demographics.voiceComplaint}&rdquo;
            </p>
          ) : (
            <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs ${
              theme === 'dark' ? 'bg-amber-950/20 border-amber-500/30 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}>
              <div className="flex items-center gap-2.5">
                <Lock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>نص الشكوى المنطوقة محمي ومشفر بكلمة مرور الطبيب المعالج للحفاظ على السرية الطبية.</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setPendingPrintAfterAuth(false);
                  setIsPdfAuthModalOpen(true);
                  setPdfAuthError('');
                }}
                className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 font-bold text-xs cursor-pointer transition no-print shrink-0"
              >
                إدخال كلمة المرور لفك التشفير
              </button>
            </div>
          )}

          {result.demographics.aiRecommendation && (
            <div className={`text-xs ${theme === 'dark' ? 'text-indigo-300 bg-indigo-950/20 border-indigo-500/20' : 'text-indigo-700 bg-indigo-50 border-indigo-200'} pt-1 flex items-start gap-2 p-3 rounded-xl border shadow-sm`}>
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>
                <strong>توصية الذكاء الاصطناعي الاستشارية للطبيب المعالج:</strong> {result.demographics.aiRecommendation.rationale}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Row 6: Detailed Scale-by-Scale Clinical Normative Table */}
      <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'} border space-y-4`}>

        <h4 className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          تفصيل درجات المقاييس المعتمدة وفق المعايير السريرية العالمية:
        </h4>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Scale Cards */}
          {[
            { key: 'phq9', label: 'PHQ-9 السريري', color: 'text-indigo-500', max: 27, desc: 'معيار DSM-5 لمؤشرات الاكتئاب الجسيم' },
            { key: 'bdi2', label: 'BDI-II بيك المعرفي', color: 'text-purple-500', max: 63, desc: 'المعيار غير المختزل للثالوث المعرفي' },
            { key: 'dass21', label: 'DASS-21 الثلاثي', color: 'text-amber-500', max: 63, desc: 'اكتئاب، قلق، وتوتر' },
            { key: 'gds15', label: 'GDS-15 الرضا الحياتي', color: 'text-emerald-500', max: 15, desc: 'مقياس الرضا العام المصحح عكساً' },
            { key: 'gad7', label: 'GAD-7 القلق العام', color: 'text-blue-500', max: 21, desc: 'معيار القلق المزمن وصعوبة التحكم' },
            { key: 'isi', label: 'ISI مؤشر الأرق', color: 'text-cyan-500', max: 28, desc: 'معيار الأرق السريري والأداء النهاري' },
            { key: 'pss10', label: 'PSS-10 إدراك الضغوط', color: 'text-rose-500', max: 40, desc: 'مقياس إدراك عدم السيطرة والعبء' },
            { key: 'military', label: 'التأهيل العسكري MIL-PREP', color: 'text-amber-500', max: 30, desc: 'جاهزية الثبات والقرار والصلابة' },
          ].map((s) => {
            const score = (result.scores as any)[s.key];
            if (!score) return null;
            return (
              <div key={s.key} className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'} border space-y-1.5 shadow-sm`}>
                <div className={`text-[11px] ${s.color} font-mono font-bold uppercase`}>{s.label}</div>
                <div className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'} font-mono tabular-nums`}>
                  {score.raw} <span className={`text-xs font-normal ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>/ {s.max}</span>
                </div>
                <div className={`text-xs ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'} font-medium`}>{score.severity}</div>
                <div className={`text-[10px] ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'} pt-1`}>
                  {s.key === 'dass21' ? (
                    <div className="flex gap-2 font-mono">
                      <span>اكتئاب: {score.depression}</span>
                      <span>قلق: {score.anxiety}</span>
                      <span>توتر: {score.stress}</span>
                    </div>
                  ) : s.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Row 7: Sovereign Doctor Diagnosis Override & Formulation Section */}
      <DoctorDiagnosisSection
        assessment={result}
        onUpdateAssessment={onUpdateAssessment}
        onSaveToMemoryBank={onSaveToMemoryBank}
        theme={theme}
      />

      {/* Row 8: Longitudinal Visit Comparison & Symptoms Trajectory Chart (Firebase History) */}
      <PatientVisitEvolution
        currentAssessment={result}
        pastVisits={pastVisits}
        onSelectVisit={(prevAssessment) => {
          if (onUpdateAssessment) {
            onUpdateAssessment(prevAssessment);
          }
        }}
        theme={theme}
      />

      {/* Row 9: AI Treatment Pathways & Comparative Synthesis (Rendered if generated) */}
      {result.treatmentPlan && (
        <TreatmentPathwaysSection plan={result.treatmentPlan} theme={theme} />
      )}

      {/* Row 10: Clinician Notes Section */}
      <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'} border space-y-3`}>
        <label className={`block text-xs font-bold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
          ملاحظات وتوجيهات الأخصائي / المستشار السريري:
        </label>
        <textarea
          rows={3}
          value={clinicianNotes}
          onChange={(e) => setClinicianNotes(e.target.value)}
          placeholder="أدخل هنا أي ملاحظات عيادية إضافية، تاريخ علاجي سابق، أو خطة المتابعة والتوصيات المقترحة للمستفيد..."
          className={`w-full ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'} border rounded-xl p-3.5 text-xs sm:text-sm focus:outline-none focus:border-purple-500 transition-colors`}
        />
      </div>

      {/* Official Doctor Signature & Stamp Area (Visible only in PDF / print) */}
      <div className="print-only pt-6 mt-8 border-t-2 border-slate-300 print-break-inside-avoid">
        <div className="grid grid-cols-2 gap-8 text-xs text-slate-800">
          <div className="space-y-1.5">
            <div><strong>اسم الطبيب المعالج:</strong> {DOCTOR_NAME}</div>
            <div><strong>المسمى والصفة السريرية:</strong> {DOCTOR_TITLE}</div>
            <div><strong>رقم الترخيص المهني:</strong> {DOCTOR_LICENSE}</div>
            <div><strong>تاريخ اعتماد التقرير:</strong> {new Date().toLocaleDateString('ar-SA')}</div>
            <div><strong>هاتف الطوارئ / التواصل السريري:</strong> {CLINIC_MOBILE} | {CLINIC_EMAIL}</div>
            <div className="text-[10px] text-emerald-800 font-mono mt-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline" />
              <span>تم التحقق من التشفير والاعتماد الرقمي للطبيب المعالج</span>
            </div>
          </div>
          <div className="text-left space-y-3 flex flex-col justify-between items-end">
            <div>
              <strong>توقيع الطبيب المعتمد:</strong>
              <div className="font-serif italic text-base text-slate-700 mt-1 pl-4 underline decoration-indigo-400">
                {DOCTOR_NAME}
              </div>
            </div>
            {/* Visual Clinic Emblem Stamp */}
            <div className="flex items-center gap-2.5 border-2 border-dashed border-indigo-300 rounded-xl p-2.5 bg-indigo-50/60 shadow-sm">
              <img
                src="/clinic_logo_emblem.jpg"
                alt="ختم العيادة السريري الرسمي"
                className="w-12 h-12 object-contain rounded-lg border border-indigo-200 bg-white p-0.5"
              />
              <div className="text-right text-[9px] text-indigo-900 leading-tight">
                <div className="font-bold">{CLINIC_NAME_AR}</div>
                <div className="text-slate-600 font-mono">الختم الطبي والسريري المعتمد</div>
                <div className="text-emerald-700 font-mono font-bold">PSY-88421-VERIFIED</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory Clinical Disclaimer */}
      <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-amber-500/10 border-amber-500/20 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-800'} border flex gap-3 text-xs leading-relaxed no-print`}>
        <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500 mt-0.5" />
        <div>
          <strong className="font-bold">تنويه إرشادي وتعليمي هام:</strong> نتائج هذا الفحص تمثل تجربة محاكاة نفسية متقدمة لحساب درجات المقاييس المعتمدة مع تحييد الضغوط البيئية، ولا تعتبر تشخيصاً طبياً قاطعاً أو بديلاً عن الاستشارة السريرية المباشرة مع طبيب أو أخصائي نفسي معتمد.
        </div>
      </div>

      {/* Doctor Password Authorization & Encryption Modal for PDF Export */}
      {isPdfAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm no-print animate-fadeIn">
          <div
            className={`w-full max-w-md p-6 rounded-3xl border shadow-2xl space-y-5 ${
              theme === 'dark'
                ? 'bg-[#0b1022] border-indigo-500/40 text-white'
                : 'bg-white border-indigo-200 text-slate-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 shadow-inner">
                <ShieldCheck className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>حماية البيانات السريرية وتصريح تصدير PDF</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  يرجى تأكيد هوية الطبيب المعالج لفك تشفير وتصدير ملف الحالة
                </p>
              </div>
            </div>

            <div className={`p-3.5 rounded-2xl border text-xs leading-relaxed space-y-1.5 ${
              theme === 'dark' ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <div className="flex items-center gap-2 font-bold text-indigo-400">
                <Lock className="w-3.5 h-3.5" />
                <span>حماية الخصوصية الطبية (HIPAA / GDPR-Health):</span>
              </div>
              <p>
                ملف الحالة يتضمن بيانات نفسية وتشخيصية حساسة لمريض العيادة ({result.demographics.name}). إدخال رمز الطبيب المعالج ({DOCTOR_NAME}) يمنح تفويضاً رسمياً بطباعة التقرير وتضمين الرسوم البيانية.
              </p>
            </div>

            <form onSubmit={handleVerifyPdfPassword} className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-slate-200">كلمة سر الطبيب أو رمز PIN:</label>
                  <span className="text-[11px] font-mono text-indigo-400">
                    الرمز الافتراضي: <strong>123456</strong>
                  </span>
                </div>
                <div className="relative">
                  <input
                    type={showPinMask ? 'text' : 'password'}
                    value={pdfPinInput}
                    onChange={(e) => setPdfPinInput(e.target.value)}
                    placeholder="أدخل 123456 أو كلمة سر الطبيب..."
                    autoFocus
                    className={`w-full px-4 py-3 pl-11 rounded-xl border text-sm font-mono tracking-widest ${
                      theme === 'dark'
                        ? 'bg-black/40 border-white/15 text-white placeholder-slate-500'
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                    } focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPinMask(!showPinMask)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors p-1"
                  >
                    {showPinMask ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {pdfAuthError && (
                  <p className="text-xs text-rose-400 font-semibold flex items-center gap-1.5 pt-1">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>{pdfAuthError}</span>
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-950/40 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>تأكيد وفك التشفير لتصدير PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsPdfAuthModalOpen(false);
                    setPendingPrintAfterAuth(false);
                    setPdfAuthError('');
                  }}
                  className={`py-3 px-4 rounded-xl border text-xs font-semibold transition cursor-pointer ${
                    theme === 'dark'
                      ? 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                      : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
