import { useState, useEffect, useMemo } from 'react';
import {
  AssessmentResult,
  BDI2_QUESTIONS,
  DASS21_QUESTIONS,
  DemographicContext,
  GAD7_QUESTIONS,
  GDS15_QUESTIONS,
  ISI_QUESTIONS,
  PHQ9_QUESTIONS,
  PSS10_QUESTIONS,
  ScaleDefinition,
  ClinicalMemoryCase,
} from './types/clinical';
import { calculateAssessment } from './utils/psychometrics';
import { auth, signInWithGoogle, logout } from './lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { clinicalDatabase } from './services/clinicalDatabase';
import { Navbar } from './components/Navbar';
import { DemographicsStep } from './components/DemographicsStep';
import { QuestionnaireStep } from './components/QuestionnaireStep';
import { DashboardView } from './components/DashboardView';
import { InfoModals } from './components/InfoModals';
import { OverallScaleProgressBar } from './components/OverallScaleProgressBar';
import { CbtModule } from './components/CbtModule';
import { ClinicalMemoryBankView } from './components/ClinicalMemoryBankView';
import { ClinicalCloudDatabaseView } from './components/ClinicalCloudDatabaseView';
import { StaffLoginModal } from './components/StaffLoginModal';
import { clinicalAuthService, ClinicalStaffUser } from './services/clinicalAuth';
import { ShieldAlert, X } from 'lucide-react';

const INITIAL_DEMOGRAPHICS: DemographicContext = {
  caseTitle: '',
  name: 'أحمد',
  age: 28,
  gender: 'male',
  social: 'single',
  city: 'القاهرة',
  district: 'إمبابة',
  living: 'family',
  job: 'employed',
  economy: 'average',
  health: 'healthy',
  acuteStressors: [],
  usePhq9: true,
  useBdi2: true,
  useDass: true,
  useGds: true,
  useGad7: true,
  useIsi: true,
  usePss10: true,
};

export default function App() {
  const [demographics, setDemographics] = useState<DemographicContext>(INITIAL_DEMOGRAPHICS);
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const stored = localStorage.getItem('psychocontext_theme');
      return (stored as 'dark' | 'light') || 'dark';
    } catch {
      return 'dark';
    }
  });
  const [activeScaleIndex, setActiveScaleIndex] = useState(0);
  const [questionPointer, setQuestionPointer] = useState(0);
  const [doctorFinalizedResult, setDoctorFinalizedResult] = useState<AssessmentResult | null>(null);
  const [savedAssessments, setSavedAssessments] = useState<AssessmentResult[]>([]);
  const [customMemoryCases, setCustomMemoryCases] = useState<ClinicalMemoryCase[]>([]);
  const [activeModal, setActiveModal] = useState<'calibration' | 'scales' | 'guidelines' | 'history' | null>(null);
  const [demographicsError, setDemographicsError] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState<'assessment' | 'cbt' | 'memory' | 'database'>('assessment');
  const [isSyncing, setIsSyncing] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [clinicalStaff, setClinicalStaff] = useState<ClinicalStaffUser | null>(() => clinicalAuthService.getCurrentStaff());
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setAuthError(null);
    try {
      const res = await signInWithGoogle();
      if (res?.error === 'popup-blocked') {
        setAuthError('popup-blocked');
      } else if (res?.error) {
        setAuthError(res.error);
      }
    } catch {
      // Gracefully handled inside signInWithGoogle
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Load saved assessments and memory cases from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('psychocontext_assessments');
      if (stored) {
        setSavedAssessments(JSON.parse(stored));
      }
      const storedCases = localStorage.getItem('psychocontext_memory_cases');
      if (storedCases) {
        setCustomMemoryCases(JSON.parse(storedCases));
      }
    } catch (e) {
      console.warn('Failed to load local storage data', e);
    }
  }, []);

  // Persist theme
  useEffect(() => {
    localStorage.setItem('psychocontext_theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
    }
  }, [theme]);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Construct dynamic scale sequences
  const scaleSequences: ScaleDefinition[] = useMemo(() => {
    const list: ScaleDefinition[] = [
      {
        type: 'demographics',
        title: 'السياق والديموغرافيا',
        shortCode: 'INFO',
        description: 'المرحلة الأولية لفحص متغيرات السياق وتحديد بطارية المقاييس',
        maxScore: 0,
        questions: [],
      },
    ];

    if (demographics.usePhq9) {
      list.push({
        type: 'phq9',
        title: 'مقياس PHQ-9 السريري',
        shortCode: 'PHQ-9',
        description: 'المعيار التشخيصي العالمي لمؤشرات الاكتئاب السريري',
        maxScore: 27,
        questions: PHQ9_QUESTIONS,
      });
    }

    if (demographics.useBdi2) {
      list.push({
        type: 'bdi2',
        title: 'مقياس بيك BDI-II المعرفي',
        shortCode: 'BDI-II',
        description: 'النسخة الأصلية غير المختزلة للثالوث المعرفي ونقد الذات',
        maxScore: 63,
        questions: BDI2_QUESTIONS,
      });
    }

    if (demographics.useDass) {
      list.push({
        type: 'dass21',
        title: 'مقياس DASS-21 للأعراض',
        shortCode: 'DASS-21',
        description: 'تقييم ثلاثي الأبعاد للاكتئاب، القلق، والتوتر والاستثارة',
        maxScore: 63,
        questions: DASS21_QUESTIONS,
      });
    }

    if (demographics.useGds) {
      list.push({
        type: 'gds15',
        title: 'مقياس GDS-15 الشامل',
        shortCode: 'GDS-15',
        description: 'مقياس الرضا العام والمعنويات مع التصحيح المعكوس',
        maxScore: 15,
        questions: GDS15_QUESTIONS,
      });
    }

    if (demographics.useGad7) {
      list.push({
        type: 'gad7',
        title: 'مقياس GAD-7 للقلق',
        shortCode: 'GAD-7',
        description: 'المعيار المعتمد لفحص اضطراب القلق العام والتوتر',
        maxScore: 21,
        questions: GAD7_QUESTIONS,
      });
    }

    if (demographics.useIsi) {
      list.push({
        type: 'isi',
        title: 'مؤشر ISI للأرق',
        shortCode: 'ISI',
        description: 'مؤشر شدة الأرق واضطرابات جودة النوم السريرية',
        maxScore: 28,
        questions: ISI_QUESTIONS,
      });
    }

    if (demographics.usePss10) {
      list.push({
        type: 'pss10',
        title: 'مقياس PSS-10 للضغوط',
        shortCode: 'PSS-10',
        description: 'مقياس إدراك الضغوط الحياتية وعدم القدرة على السيطرة',
        maxScore: 40,
        questions: PSS10_QUESTIONS,
      });
    }

    list.push({
      type: 'dashboard',
      title: 'تقرير التشخيص الموزون',
      shortCode: 'REPORT',
      description: 'التقرير السريري الشامل والموازنة البيئية وقرار الطبيب',
      maxScore: 100,
      questions: [],
    });

    return list;
  }, [
    demographics.usePhq9,
    demographics.useBdi2,
    demographics.useDass,
    demographics.useGds,
    demographics.useGad7,
    demographics.useIsi,
    demographics.usePss10,
  ]);

  const currentScale = scaleSequences[activeScaleIndex] || scaleSequences[0];

  // Calculated Assessment Result
  const currentAssessmentResult = useMemo(() => {
    const raw = calculateAssessment(demographics, responses);
    if (doctorFinalizedResult) {
      return {
        ...raw,
        doctorOverride: doctorFinalizedResult.doctorOverride,
        treatmentPlan: doctorFinalizedResult.treatmentPlan,
      };
    }
    return raw;
  }, [demographics, responses, doctorFinalizedResult]);

  // Handle Response Selection
  const handleSelectOption = (questionId: string, choiceIndex: number) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: choiceIndex,
    }));
  };

  // Demographics Submission
  const handleDemographicsSubmit = () => {
    if (!demographics.name.trim()) {
      setDemographicsError('يرجى إدخال الاسم أو الرمز المستعار للمتابعة.');
      return;
    }
    if (!demographics.city.trim() || !demographics.district.trim()) {
      setDemographicsError('يرجى كتابة المدينة والحي السكني بدقة لتنشيط محرك الموازنة البيئية.');
      return;
    }
    const hasAnyScale =
      demographics.usePhq9 ||
      demographics.useBdi2 ||
      demographics.useDass ||
      demographics.useGds ||
      demographics.useGad7 ||
      demographics.useIsi ||
      demographics.usePss10;

    if (!hasAnyScale) {
      setDemographicsError('يرجى تحديد مقياس واحد على الأقل من بطارية الاختبارات للبدء.');
      return;
    }
    setDemographicsError('');
    setActiveScaleIndex(1);
    setQuestionPointer(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Next Question / Scale Logic
  const handleNextQuestion = () => {
    if (questionPointer < currentScale.questions.length - 1) {
      setQuestionPointer((prev) => prev + 1);
    } else {
      // Advance to next scale
      if (activeScaleIndex < scaleSequences.length - 1) {
        setActiveScaleIndex((prev) => prev + 1);
        setQuestionPointer(0);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Previous Question / Scale Logic
  const handlePrevQuestion = () => {
    if (questionPointer > 0) {
      setQuestionPointer((prev) => prev - 1);
    } else if (activeScaleIndex > 0) {
      const prevScaleIdx = activeScaleIndex - 1;
      const prevScale = scaleSequences[prevScaleIdx];
      setActiveScaleIndex(prevScaleIdx);
      if (prevScale.questions.length > 0) {
        setQuestionPointer(prevScale.questions.length - 1);
      } else {
        setQuestionPointer(0);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Jump directly to a question within current scale
  const handleJumpToQuestion = (qIdx: number) => {
    setQuestionPointer(qIdx);
  };

  // Reset Assessment
  const handleReset = () => {
    setResponses({});
    setDoctorFinalizedResult(null);
    setActiveScaleIndex(0);
    setQuestionPointer(0);
    setActiveView('assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Save to History & Sync to Cloud
  const handleSaveToHistory = async (notes: string) => {
    const assessmentToSave: AssessmentResult = {
      ...currentAssessmentResult,
      id: `eval_${Date.now()}`,
      narrativeText: notes
        ? `${currentAssessmentResult.narrativeText}\n\n[ملاحظات المستشار]: ${notes}`
        : currentAssessmentResult.narrativeText,
    };

    const updated = [assessmentToSave, ...savedAssessments.slice(0, 19)];
    setSavedAssessments(updated);
    
    // 1. Local Persistence
    try {
      localStorage.setItem('psychocontext_assessments', JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save assessment to storage', e);
    }

    // 2. Cloud Persistence (Sync if logged in)
    if (user) {
      setIsSyncing(true);
      try {
        const patientId = await clinicalDatabase.upsertPatient(demographics);
        if (patientId) {
          await clinicalDatabase.saveVisit(patientId, assessmentToSave, notes);
          console.info('Successfully synced assessment to clinical database');
        }
      } catch (err) {
        console.error('Cloud sync failed', err);
      } finally {
        setIsSyncing(false);
      }
    }
  };

  // Save to Memory Bank
  const handleSaveToMemoryBank = (caseRecord: ClinicalMemoryCase) => {
    setCustomMemoryCases((prev) => {
      const updated = [caseRecord, ...prev.filter((c) => c.id !== caseRecord.id)];
      try {
        localStorage.setItem('psychocontext_memory_cases', JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to store memory case', e);
      }
      return updated;
    });
  };

  // Restore saved assessment
  const handleSelectSaved = (saved: AssessmentResult) => {
    setDemographics(saved.demographics);
    setResponses(saved.responses);
    setDoctorFinalizedResult(saved);
    setActiveModal(null);
    setActiveView('assessment');
    setActiveScaleIndex(scaleSequences.length - 1); // Go to report dashboard
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete saved assessment
  const handleDeleteSaved = (id: string) => {
    const updated = savedAssessments.filter((a) => a.id !== id);
    setSavedAssessments(updated);
    try {
      localStorage.setItem('psychocontext_assessments', JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to delete item', e);
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#050811] text-slate-100' : 'bg-slate-50 text-slate-900'} flex flex-col selection:bg-purple-600 selection:text-white relative transition-colors duration-300`}>
      {/* Background Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden no-print">
        <div className={`absolute w-[600px] h-[600px] ${theme === 'dark' ? 'bg-indigo-600/5' : 'bg-indigo-600/10'} rounded-full blur-[140px] -top-40 -right-40`} />
        <div className={`absolute w-[700px] h-[700px] ${theme === 'dark' ? 'bg-purple-600/5' : 'bg-purple-600/10'} rounded-full blur-[160px] -bottom-40 -left-40`} />
      </div>

      {/* Navigation Top Bar */}
      <Navbar
        onOpenModal={(modal) => setActiveModal(modal)}
        onReset={handleReset}
        onGoToAssessment={() => {
          setActiveView('assessment');
        }}
        onGoToCbt={() => setActiveView('cbt')}
        onGoToMemory={() => setActiveView('memory')}
        onGoToDatabase={() => setActiveView('database')}
        activeView={activeView}
        historyCount={savedAssessments.length}
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        user={user}
        onLogin={handleLogin}
        onLogout={logout}
        isLoggingIn={isLoggingIn}
        clinicalStaff={clinicalStaff}
        onOpenStaffLogin={() => setIsStaffModalOpen(true)}
      />

      {/* Pop-up blocked or auth error helper banner */}
      {authError === 'popup-blocked' && (
        <div className="relative z-40 max-w-4xl w-full mx-auto px-4 sm:px-6 pt-4 animate-fadeIn no-print">
          <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-amber-950/40 border-amber-500/40 text-amber-200' : 'bg-amber-50 border-amber-300 text-amber-900'} shadow-lg backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3`}>
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold text-sm">تم حظر النافذة المنبثقة من قبل المتصفح (Pop-up Blocked)</strong>
                <p className="text-xs mt-1 leading-relaxed opacity-90">
                  غالباً ما تحظر المتصفحات النوافذ التلقائية. يُرجى النقر على أيقونة النوافذ المنبثقة في شريط عنوان المتصفح (أعلى الشاشة) واختيار <span className="underline font-bold">"السماح دائماً بالنوافذ المنبثقة لهذا الموقع"</span>، ثم النقر على زر إعادة المحاولة.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              <button
                onClick={handleLogin}
                className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition cursor-pointer shadow"
              >
                إعادة المحاولة الآن
              </button>
              <button
                onClick={() => setAuthError(null)}
                className="p-1.5 text-amber-400 hover:text-white rounded-lg transition cursor-pointer"
                title="إغلاق التنبيه"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Container */}
      <main className="relative z-10 flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className={`w-full rounded-3xl ${theme === 'dark' ? 'bg-[#090d20]/80' : 'bg-white shadow-xl'} backdrop-blur-xl border ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'} shadow-2xl p-6 sm:p-10 transition-colors duration-300`}>
          {/* Active View 1: Cognitive Behavioral Therapy (CBT) Module */}
          {activeView === 'cbt' && <CbtModule theme={theme} />}

          {/* Active View 2: Clinical Memory Bank & Learning Dossiers */}
          {activeView === 'memory' && (
            <ClinicalMemoryBankView customCases={customMemoryCases} theme={theme} />
          )}

          {/* Active View 3: Clinical Cloud Database (Sync View) */}
          {activeView === 'database' && (
            <ClinicalCloudDatabaseView 
              theme={theme} 
              onLoadVisit={handleSelectSaved}
            />
          )}

          {/* Active View 4: Clinical Assessment & Sovereign Diagnostic Report */}
          {activeView === 'assessment' && (
            <>
              {/* Step Navigation Tabs Strip */}
              <div className={`flex items-center justify-between border-b ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'} pb-5 mb-8 overflow-x-auto gap-3 no-print custom-scrollbar`}>
                {scaleSequences.map((sec, idx) => {
                  const isActive = idx === activeScaleIndex;
                  const isPassed = idx < activeScaleIndex;

                  return (
                    <button
                      key={sec.type}
                      type="button"
                      onClick={() => {
                        // Allow navigating backwards or jumping if completed
                        if (idx <= activeScaleIndex || idx === 0) {
                          setActiveScaleIndex(idx);
                          setQuestionPointer(0);
                        }
                      }}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                        isActive
                          ? 'bg-purple-600/25 border border-purple-500/40 text-purple-300 opacity-100 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                          : isPassed
                          ? `${theme === 'dark' ? 'bg-white/5 border border-white/5 text-slate-300' : 'bg-slate-100 border border-slate-200 text-slate-600'} hover:opacity-100 opacity-80`
                          : `opacity-35 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'} hover:opacity-50`
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-md flex items-center justify-center font-mono text-[10px] ${
                          isActive ? 'bg-purple-500 text-white' : (theme === 'dark' ? 'bg-white/10 text-slate-300' : 'bg-slate-200 text-slate-500')
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <span>{sec.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Step View Content */}
              <div id="step-content-area">
                {currentScale.type === 'demographics' && (
                  <DemographicsStep
                    data={demographics}
                    onChange={setDemographics}
                    onSubmit={handleDemographicsSubmit}
                    errorMessage={demographicsError}
                    theme={theme}
                  />
                )}

                {currentScale.type !== 'demographics' && currentScale.type !== 'dashboard' && (
                  <>
                    <OverallScaleProgressBar
                      scales={scaleSequences}
                      activeScaleIndex={activeScaleIndex}
                      responses={responses}
                      onSelectScale={(scaleIdx) => {
                        setActiveScaleIndex(scaleIdx);
                        setQuestionPointer(0);
                      }}
                    />
                    <QuestionnaireStep
                      scale={currentScale}
                      questionIndex={questionPointer}
                      totalQuestions={currentScale.questions.length}
                      responses={responses}
                      onSelectOption={handleSelectOption}
                      onNext={handleNextQuestion}
                      onPrev={handlePrevQuestion}
                      onJumpToQuestion={handleJumpToQuestion}
                      canGoPrev={questionPointer > 0 || activeScaleIndex > 0}
                      theme={theme}
                    />
                  </>
                )}

                {currentScale.type === 'dashboard' && (
                  <DashboardView
                    result={currentAssessmentResult}
                    onNewAssessment={handleReset}
                    onSaveToHistory={handleSaveToHistory}
                    onUpdateAssessment={(updated) => setDoctorFinalizedResult(updated)}
                    onSaveToMemoryBank={handleSaveToMemoryBank}
                    theme={theme}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </main>

      {/* Information & History Modals */}
      <InfoModals
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
        savedAssessments={savedAssessments}
        onSelectSaved={handleSelectSaved}
        onDeleteSaved={handleDeleteSaved}
      />

      {/* Staff Role & ID/Password Login Modal */}
      <StaffLoginModal
        isOpen={isStaffModalOpen}
        onClose={() => setIsStaffModalOpen(false)}
        onStaffChange={(staff) => setClinicalStaff(staff)}
        theme={theme}
      />

      {/* Quiet Footer */}
      <footer className={`relative z-10 border-t ${theme === 'dark' ? 'border-white/5' : 'border-slate-200'} py-6 text-center text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} no-print`}>
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div>PsychoContext · منصة المعايرة السريرية والموازنة البيئية للمقاييس النفسية</div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>7 مقاييس معتمدة أكاديمياً</span>
            <span>·</span>
            <span>وحدة CBT وإعادة الهيكلة</span>
            <span>·</span>
            <span>السيادة السريرية الكاملة للطبيب</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
