import React, { useState, useEffect } from 'react';
import {
  COGNITIVE_DISTORTIONS,
  CognitiveDistortion,
  ThoughtRecordEntry,
  BehavioralActivityEntry,
} from '../types/clinical';
import {
  Brain,
  ListFilter,
  Plus,
  Trash2,
  Calendar,
  Smile,
  CheckCircle2,
  HelpCircle,
  FileDown,
  Sparkles,
  TrendingDown,
  Activity,
  ArrowRight,
  RefreshCw,
  Award,
} from 'lucide-react';

const INITIAL_THOUGHT_RECORDS: ThoughtRecordEntry[] = [
  {
    id: 'tr_sample_1',
    date: '2026-11-06',
    situation: 'تأخر الرد على رسالة مهمة أرسلتها إلى رئيس الفريق في العمل',
    automaticThought: 'هو يتجاهلني متعمداً ولن يعتمد اقتراحي أبداً، أنا دائماً أقصر ولا أحد يثق في كفاءتي.',
    distortionId: 'mind_reading',
    emotion: 'قلق وإحباط وعجز',
    emotionIntensityBefore: 85,
    evidenceFor: 'لم يجب منذ ساعتين رغم أنه متصل بالإنترنت.',
    evidenceAgainst: 'هو مشغول بمراجعة الميزانية اليوم، وفي السابق كان يثني على تقاريري ولم يشتكِ مني قط.',
    alternativeThought: 'تأخر الرد يعود في الغالب لضغط مهامه اليومية وليس تجاهلا شخصياً، وسيتواصل معي حين يفرغ.',
    emotionIntensityAfter: 30,
  },
  {
    id: 'tr_sample_2',
    date: '2026-11-05',
    situation: 'الشعور بالإرهاق بعد يوم عمل شاق وعدم القدرة على إكمال التمرين الرياضي',
    automaticThought: 'إذا لم أتدرب 45 دقيقة كاملة فأنا متكاسل وفشلت بالكامل في برنامجي الصحي.',
    distortionId: 'all_or_nothing',
    emotion: 'تأنيب ضمير وشعور بالنقص',
    emotionIntensityBefore: 75,
    evidenceFor: 'توقفت عن التمرين بعد 10 دقائق فقط.',
    evidenceAgainst: 'جسمي مجهد بدنياً بعد 9 ساعات عمل، وممارسة 10 دقائق أفضل بكثير من الصفر المطلق.',
    alternativeThought: 'الالتزام هو متصل مرن، والإنصات لإشارات التعب البدني هو حكمة وقائية وليس فشلاً.',
    emotionIntensityAfter: 20,
  },
];

const INITIAL_BEHAVIORAL_ACTIVITIES: BehavioralActivityEntry[] = [
  {
    id: 'act_1',
    day: 'السبت',
    timeSlot: '08:00 صباحاً',
    activityName: 'المشي في الهواء الطلق لمدة 20 دقيقة مع التركيز الذهني الحسي',
    category: 'pleasure',
    masteryScore: 6,
    pleasureScore: 8,
    completed: true,
    notes: 'شعرت بتحسن ملحوظ في هدوء التنفس ووضوح التفكير',
  },
  {
    id: 'act_2',
    day: 'الأحد',
    timeSlot: '05:00 مساءً',
    activityName: 'ترتيب وتنظيم مكتب العمل وفرز المعاملات المتراكمة',
    category: 'mastery',
    masteryScore: 9,
    pleasureScore: 5,
    completed: true,
    notes: 'قلل الفوضى البصرية ورفع الشعور بالإنجاز والسيطرة',
  },
  {
    id: 'act_3',
    day: 'الاثنين',
    timeSlot: '07:30 مساءً',
    activityName: 'مكالمة هاتفية عفوية مع صديق مقرب أو قريب مفضل',
    category: 'social',
    masteryScore: 5,
    pleasureScore: 8,
    completed: false,
    notes: 'خطوة لكسر العزلة الاجتماعية التلقائية',
  },
  {
    id: 'act_4',
    day: 'الثلاثاء',
    timeSlot: '09:00 مساءً',
    activityName: 'قراءة 10 صفحات من كتاب مفضل بعيداً عن شاشات الهاتف',
    category: 'routine',
    masteryScore: 7,
    pleasureScore: 7,
    completed: false,
  },
];

interface CbtModuleProps {
  theme?: 'dark' | 'light';
}

export const CbtModule: React.FC<CbtModuleProps> = ({ theme = 'dark' }) => {
  const [activeTab, setActiveTab] = useState<'distortions' | 'thought_record' | 'behavioral_activation'>('distortions');

  // Distortions Library State
  const [selectedDistortionId, setSelectedDistortionId] = useState<string>('all_or_nothing');
  const [distortionSearch, setDistortionSearch] = useState('');

  // Thought Records State
  const [records, setRecords] = useState<ThoughtRecordEntry[]>(() => {
    try {
      const stored = localStorage.getItem('psychocontext_cbt_records');
      return stored ? JSON.parse(stored) : INITIAL_THOUGHT_RECORDS;
    } catch {
      return INITIAL_THOUGHT_RECORDS;
    }
  });

  // New Thought Form State
  const [newSituation, setNewSituation] = useState('');
  const [newAutomaticThought, setNewAutomaticThought] = useState('');
  const [newDistortionId, setNewDistortionId] = useState('catastrophizing');
  const [newEmotion, setNewEmotion] = useState('');
  const [newIntensityBefore, setNewIntensityBefore] = useState(80);
  const [newEvidenceFor, setNewEvidenceFor] = useState('');
  const [newEvidenceAgainst, setNewEvidenceAgainst] = useState('');
  const [newAlternativeThought, setNewAlternativeThought] = useState('');
  const [newIntensityAfter, setNewIntensityAfter] = useState(30);
  const [isAddingRecord, setIsAddingRecord] = useState(false);

  // Behavioral Activation State
  const [activities, setActivities] = useState<BehavioralActivityEntry[]>(() => {
    try {
      const stored = localStorage.getItem('psychocontext_cbt_activities');
      return stored ? JSON.parse(stored) : INITIAL_BEHAVIORAL_ACTIVITIES;
    } catch {
      return INITIAL_BEHAVIORAL_ACTIVITIES;
    }
  });

  // New Activity Form State
  const [newDay, setNewDay] = useState('الأربعاء');
  const [newTimeSlot, setNewTimeSlot] = useState('06:00 مساءً');
  const [newActName, setNewActName] = useState('');
  const [newCategory, setNewCategory] = useState<'pleasure' | 'mastery' | 'routine' | 'social'>('pleasure');
  const [newMastery, setNewMastery] = useState(7);
  const [newPleasure, setNewPleasure] = useState(8);
  const [newActNotes, setNewActNotes] = useState('');
  const [isAddingActivity, setIsAddingActivity] = useState(false);

  // Save to LocalStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('psychocontext_cbt_records', JSON.stringify(records));
    } catch (e) {
      console.warn('LocalStorage save error', e);
    }
  }, [records]);

  useEffect(() => {
    try {
      localStorage.setItem('psychocontext_cbt_activities', JSON.stringify(activities));
    } catch (e) {
      console.warn('LocalStorage save error', e);
    }
  }, [activities]);

  // Handle Add Thought Record
  const handleAddThoughtRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSituation.trim() || !newAutomaticThought.trim() || !newAlternativeThought.trim()) {
      return;
    }

    const newRecord: ThoughtRecordEntry = {
      id: `tr_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      situation: newSituation.trim(),
      automaticThought: newAutomaticThought.trim(),
      distortionId: newDistortionId,
      emotion: newEmotion.trim() || 'توتر وضيق',
      emotionIntensityBefore: newIntensityBefore,
      evidenceFor: newEvidenceFor.trim(),
      evidenceAgainst: newEvidenceAgainst.trim(),
      alternativeThought: newAlternativeThought.trim(),
      emotionIntensityAfter: newIntensityAfter,
    };

    setRecords([newRecord, ...records]);
    setNewSituation('');
    setNewAutomaticThought('');
    setNewEmotion('');
    setNewEvidenceFor('');
    setNewEvidenceAgainst('');
    setNewAlternativeThought('');
    setNewIntensityBefore(80);
    setNewIntensityAfter(30);
    setIsAddingRecord(false);
  };

  const handleDeleteRecord = (id: string) => {
    setRecords(records.filter((r) => r.id !== id));
  };

  // Handle Add Behavioral Activity
  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActName.trim()) return;

    const newAct: BehavioralActivityEntry = {
      id: `act_${Date.now()}`,
      day: newDay,
      timeSlot: newTimeSlot,
      activityName: newActName.trim(),
      category: newCategory,
      masteryScore: newMastery,
      pleasureScore: newPleasure,
      completed: false,
      notes: newActNotes.trim(),
    };

    setActivities([...activities, newAct]);
    setNewActName('');
    setNewActNotes('');
    setIsAddingActivity(false);
  };

  const handleToggleActivity = (id: string) => {
    setActivities(
      activities.map((a) => (a.id === id ? { ...a, completed: !a.completed } : a))
    );
  };

  const handleDeleteActivity = (id: string) => {
    setActivities(activities.filter((a) => a.id !== id));
  };

  // Export CBT dossier as JSON
  const handleExportCbt = () => {
    const data = {
      exportDate: new Date().toISOString(),
      thoughtRecords: records,
      behavioralActivities: activities,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cbt-records-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredDistortions = COGNITIVE_DISTORTIONS.filter(
    (d) =>
      d.arabicName.includes(distortionSearch) ||
      d.englishName.toLowerCase().includes(distortionSearch.toLowerCase()) ||
      d.definition.includes(distortionSearch)
  );

  const activeDistortion =
    COGNITIVE_DISTORTIONS.find((d) => d.id === selectedDistortionId) ||
    COGNITIVE_DISTORTIONS[0];

  // Metrics
  const avgIntensityReduction =
    records.length > 0
      ? Math.round(
          records.reduce(
            (acc, curr) => acc + (curr.emotionIntensityBefore - curr.emotionIntensityAfter),
            0
          ) / records.length
        )
      : 0;

  const completedActivitiesCount = activities.filter((a) => a.completed).length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>
        <div>
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${theme === 'dark' ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' : 'bg-indigo-50 border-indigo-100 text-indigo-700'} border text-xs font-semibold mb-2`}>
            <Brain className="w-3.5 h-3.5" />
            <span>العلاج السلوكي المعرفي القائم على الأدلة (Beck CBT)</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'} tracking-tight`}>
            وحدة العلاج المعرفي السلوكي وإعادة الهيكلة
          </h2>
          <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} mt-1 max-w-2xl leading-relaxed`}>
            منظومة سريرية متكاملة لرصد وتصحيح التشوهات الفكرية التلقائية، وجدولة التنشيط السلوكي لكسر حلقة الانعزال وعسر المزاج.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportCbt}
          className={`px-4 py-2 ${theme === 'dark' ? 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'} border rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-sm`}
        >
          <FileDown className={`w-3.5 h-3.5 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
          <span>تصدير ملف CBT</span>
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className={`flex flex-wrap gap-2 border-b ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'} pb-3`}>
        <button
          type="button"
          onClick={() => setActiveTab('distortions')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'distortions'
              ? 'bg-purple-600/25 border border-purple-500/40 text-purple-600 dark:text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
              : theme === 'dark'
              ? 'bg-white/5 border border-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/10'
              : 'bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Brain className="w-4 h-4 text-purple-500" />
          <span>مكتبة التشوهات المعرفية (8 أنماط)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('thought_record')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'thought_record'
              ? 'bg-indigo-600/25 border border-indigo-500/40 text-indigo-600 dark:text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.2)]'
              : theme === 'dark'
              ? 'bg-white/5 border border-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/10'
              : 'bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-200'
          }`}
        >
          <TrendingDown className="w-4 h-4 text-indigo-500" />
          <span>سجل الأفكار التلقائية وإعادة الهيكلة ({records.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('behavioral_activation')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'behavioral_activation'
              ? 'bg-emerald-600/25 border border-emerald-500/40 text-emerald-600 dark:text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
              : theme === 'dark'
              ? 'bg-white/5 border border-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/10'
              : 'bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Activity className="w-4 h-4 text-emerald-500" />
          <span>جدولة التنشيط السلوكي ({completedActivitiesCount}/{activities.length})</span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* TAB 1: COGNITIVE DISTORTIONS EXPLORER */}
      {/* ============================================================== */}
      {activeTab === 'distortions' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
              تصفح الأنماط الفكرية اللاعقلانية الثمانية الأكثر شيوعاً وفق مدرسة آرون بيك وكريستين باديسكي:
            </p>
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="بحث في التشوهات المعرفية..."
                value={distortionSearch}
                onChange={(e) => setDistortionSearch(e.target.value)}
                className={`w-full px-3.5 py-1.5 text-xs ${theme === 'dark' ? 'bg-white/5 border-white/10 text-slate-200 placeholder:text-slate-500 focus:border-purple-500/50' : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-purple-500'} border rounded-xl focus:outline-none transition-colors`}
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
            {/* List of Distortions */}
            <div className="lg:col-span-5 space-y-2">
              {filteredDistortions.map((d, index) => {
                const isSelected = d.id === selectedDistortionId;
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setSelectedDistortionId(d.id)}
                    className={`w-full p-3.5 rounded-xl border text-right transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'border-purple-500 bg-purple-950/40 shadow-sm text-white'
                        : theme === 'dark'
                        ? 'border-white/5 bg-white/5 text-slate-400 hover:bg-white/10'
                        : 'border-slate-100 bg-slate-50 text-slate-500 hover:bg-white hover:border-slate-200 shadow-sm'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono text-xs shrink-0 ${
                        isSelected ? 'bg-purple-500 text-white' : theme === 'dark' ? 'bg-white/10 text-slate-400' : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className={`font-bold text-sm ${isSelected ? 'text-white' : theme === 'dark' ? 'text-slate-200' : 'text-slate-800'} truncate`}>{d.arabicName}</div>
                      <div className={`text-[11px] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} truncate`}>{d.englishName}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Distortion Deep Dive Card */}
            <div className={`lg:col-span-7 p-6 rounded-2xl ${theme === 'dark' ? 'bg-white/5 border-purple-500/30' : 'bg-white border-purple-200 shadow-xl'} border space-y-5 transition-all duration-300`}>
              <div className={`border-b ${theme === 'dark' ? 'border-white/10' : 'border-slate-100'} pb-4`}>
                <span className="text-[11px] font-mono uppercase text-purple-500 font-semibold tracking-wider">
                  {activeDistortion.englishName}
                </span>
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'} mt-1`}>{activeDistortion.arabicName}</h3>
                <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} mt-2 leading-relaxed`}>
                  {activeDistortion.definition}
                </p>
              </div>

              {/* Patient Example Quote */}
              <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-rose-950/20 border-rose-500/30' : 'bg-rose-50 border-rose-200'} border space-y-2`}>
                <div className={`flex items-center gap-2 text-xs font-bold ${theme === 'dark' ? 'text-rose-300' : 'text-rose-700'}`}>
                  <HelpCircle className="w-4 h-4 text-rose-500" />
                  <span>مثال عيادي من أقوال المستفيدين (الفكرة المشوهة):</span>
                </div>
                <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'} font-mono italic pr-2`}>
                  {activeDistortion.examplePatientStatement}
                </p>
              </div>

              {/* Reframing Strategy */}
              <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-emerald-50 border-emerald-200'} border space-y-2`}>
                <div className={`flex items-center gap-2 text-xs font-bold ${theme === 'dark' ? 'text-emerald-300' : 'text-emerald-700'}`}>
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                  <span>استراتيجية إعادة الهيكلة والمحاكمة المنطقية (Reframing):</span>
                </div>
                <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'} leading-relaxed pr-2`}>
                  {activeDistortion.reframingStrategy}
                </p>
              </div>

              {/* Action: Use in Thought Record */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setNewDistortionId(activeDistortion.id);
                    setActiveTab('thought_record');
                    setIsAddingRecord(true);
                  }}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-md shadow-purple-900/20"
                >
                  <span>تسجيل فكرة تلقائية بهذا النمط</span>
                  <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: 5-COLUMN THOUGHT RECORD */}
      {/* ============================================================== */}
      {activeTab === 'thought_record' && (
        <div className="space-y-6">
          {/* Metrics summary banner */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'} border`}>
              <div className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>إجمالي الأفكار المسجلة</div>
              <div className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'} mt-1 font-mono`}>{records.length}</div>
            </div>
            <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'} border`}>
              <div className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>متوسط خفض شدة الضيق</div>
              <div className="text-2xl font-black text-emerald-500 mt-1 font-mono">
                {avgIntensityReduction}% -
              </div>
            </div>
            <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'} border col-span-2 sm:col-span-1`}>
              <div className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>أكثر التشوهات تكراراً</div>
              <div className="text-sm font-bold text-purple-600 dark:text-purple-300 mt-1 truncate">
                {COGNITIVE_DISTORTIONS.find((d) => d.id === records[0]?.distortionId)?.arabicName ||
                  'التفكير الحدي'}
              </div>
            </div>
          </div>

          {/* Add Record Toggle Button */}
          {!isAddingRecord && (
            <div className="flex justify-between items-center">
              <h3 className={`text-base font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>سجلات الأفكار التلقائية وإعادة التقييم:</h3>
              <button
                type="button"
                onClick={() => setIsAddingRecord(true)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة سجل فكرة جديد</span>
              </button>
            </div>
          )}

          {/* Form to Add New Record */}
          {isAddingRecord && (
            <form
              onSubmit={handleAddThoughtRecord}
              className={`p-5 rounded-2xl ${theme === 'dark' ? 'bg-indigo-950/20 border-indigo-500/40' : 'bg-indigo-50 border-indigo-200 shadow-xl'} border space-y-4 animate-fadeIn`}
            >
              <div className={`flex justify-between items-center border-b ${theme === 'dark' ? 'border-white/10' : 'border-indigo-100'} pb-3`}>
                <h4 className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-indigo-900'} flex items-center gap-2`}>
                  <TrendingDown className="w-4 h-4 text-indigo-500" />
                  <span>نموذج إعادة الهيكلة المعرفية خماسي الأعمدة (Beck 5-Column Record)</span>
                </h4>
                <button
                  type="button"
                  onClick={() => setIsAddingRecord(false)}
                  className={`text-xs ${theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'} cursor-pointer transition-colors`}
                >
                  إلغاء
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* 1. Situation */}
                <div className="space-y-1.5">
                  <label className={`text-xs font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    1. الموقف المثير والحدث الفعلي:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: اجتماع عمل، مكالمة هاتفية، تأخر صديق..."
                    value={newSituation}
                    onChange={(e) => setNewSituation(e.target.value)}
                    className={`w-full px-3 py-2 text-xs ${theme === 'dark' ? 'bg-white/5 border-white/10 text-slate-200 focus:border-indigo-500' : 'bg-white border-slate-200 text-slate-900 focus:border-indigo-500'} border rounded-xl focus:outline-none transition-colors`}
                  />
                </div>

                {/* 2. Automatic Thought */}
                <div className="space-y-1.5">
                  <label className={`text-xs font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    2. الفكرة التلقائية السلبية التي خطرت ببالك:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: سأفشل حتماً، لا أحد يحبني، مستقبلي ضاع..."
                    value={newAutomaticThought}
                    onChange={(e) => setNewAutomaticThought(e.target.value)}
                    className={`w-full px-3 py-2 text-xs ${theme === 'dark' ? 'bg-white/5 border-white/10 text-slate-200 focus:border-indigo-500' : 'bg-white border-slate-200 text-slate-900 focus:border-indigo-500'} border rounded-xl focus:outline-none transition-colors`}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                {/* Distortion Selector */}
                <div className="space-y-1.5">
                  <label className={`text-xs font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>3. نوع التشوه المعرفي:</label>
                  <select
                    value={newDistortionId}
                    onChange={(e) => setNewDistortionId(e.target.value)}
                    className={`w-full px-3 py-2 text-xs ${theme === 'dark' ? 'bg-[#0b1026] border-white/10 text-slate-200 focus:border-indigo-500' : 'bg-white border-slate-200 text-slate-900 focus:border-indigo-500'} border rounded-xl focus:outline-none transition-colors`}
                  >
                    {COGNITIVE_DISTORTIONS.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.arabicName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Emotion */}
                <div className="space-y-1.5">
                  <label className={`text-xs font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>الشعور أو الانفعال المصاحب:</label>
                  <input
                    type="text"
                    placeholder="مثال: حزن، ذعر، خزي، غضب..."
                    value={newEmotion}
                    onChange={(e) => setNewEmotion(e.target.value)}
                    className={`w-full px-3 py-2 text-xs ${theme === 'dark' ? 'bg-white/5 border-white/10 text-slate-200 focus:border-indigo-500' : 'bg-white border-slate-200 text-slate-900 focus:border-indigo-500'} border rounded-xl focus:outline-none transition-colors`}
                  />
                </div>

                {/* Intensity Before */}
                <div className="space-y-1.5">
                  <div className={`flex justify-between text-xs font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    <span>شدة الانفعال قبل ({newIntensityBefore}%):</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={newIntensityBefore}
                    onChange={(e) => setNewIntensityBefore(Number(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Evidence For */}
                <div className="space-y-1.5">
                  <label className={`text-xs font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    4أ. الأدلة الموضوعية المؤيدة للفكرة:
                  </label>
                  <textarea
                    rows={2}
                    placeholder="ما الحقائق الصلبة (وليس المشاعر) التي تدعم هذا الظن؟"
                    value={newEvidenceFor}
                    onChange={(e) => setNewEvidenceFor(e.target.value)}
                    className={`w-full px-3 py-2 text-xs ${theme === 'dark' ? 'bg-white/5 border-white/10 text-slate-200 focus:border-indigo-500' : 'bg-white border-slate-200 text-slate-900 focus:border-indigo-500'} border rounded-xl focus:outline-none transition-colors`}
                  />
                </div>

                {/* Evidence Against */}
                <div className="space-y-1.5">
                  <label className={`text-xs font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    4ب. الأدلة الموضوعية المعارضة للفكرة (نقد الأدلة):
                  </label>
                  <textarea
                    rows={2}
                    placeholder="ما الحقائق والوقائع التي تنفي أو تخفف من صحة الفكرة السلبية؟"
                    value={newEvidenceAgainst}
                    onChange={(e) => setNewEvidenceAgainst(e.target.value)}
                    className={`w-full px-3 py-2 text-xs ${theme === 'dark' ? 'bg-white/5 border-white/10 text-slate-200 focus:border-indigo-500' : 'bg-white border-slate-200 text-slate-900 focus:border-indigo-500'} border rounded-xl focus:outline-none transition-colors`}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                {/* 5. Balanced Alternative Thought */}
                <div className="sm:col-span-2 space-y-1.5">
                  <label className={`text-xs font-semibold ${theme === 'dark' ? 'text-emerald-300' : 'text-emerald-700'}`}>
                    5. الفكرة البديلة المتوازنة والواقعية (Cognitive Restructuring):
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="صياغة فكرة مرنة وعادلة تأخذ جميع الأدلة بعين الاعتبار..."
                    value={newAlternativeThought}
                    onChange={(e) => setNewAlternativeThought(e.target.value)}
                    className={`w-full px-3 py-2 text-xs ${theme === 'dark' ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-100 focus:border-emerald-500' : 'bg-emerald-50 border-emerald-200 text-emerald-900 focus:border-emerald-500'} border rounded-xl focus:outline-none transition-colors shadow-inner`}
                  />
                </div>

                {/* Intensity After */}
                <div className="space-y-1.5">
                  <div className={`flex justify-between text-xs font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    <span>شدة الانفعال بعد ({newIntensityAfter}%):</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={newIntensityAfter}
                    onChange={(e) => setNewIntensityAfter(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingRecord(false)}
                  className={`px-4 py-2 ${theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-slate-300' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600'} border rounded-xl text-xs font-semibold cursor-pointer transition-colors shadow-sm`}
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold cursor-pointer shadow-md"
                >
                  حفظ سجل الأفكار
                </button>
              </div>
            </form>
          )}

          {/* List of Saved Thought Records */}
          <div className="space-y-3.5">
            {records.map((rec) => {
              const distortion = COGNITIVE_DISTORTIONS.find((d) => d.id === rec.distortionId);
              const reduction = rec.emotionIntensityBefore - rec.emotionIntensityAfter;

              return (
                <div
                  key={rec.id}
                  className={`p-5 rounded-2xl ${theme === 'dark' ? 'bg-white/5 border-white/10 hover:border-white/20' : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'} border space-y-4 transition-all`}
                >
                  <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'} pb-3`}>
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-mono ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{rec.date}</span>
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${theme === 'dark' ? 'bg-purple-500/10 text-purple-300 border-purple-500/20' : 'bg-purple-50 text-purple-700 border-purple-100'} border`}>
                        {distortion?.arabicName || 'تشوه معرفي'}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-xs">
                        <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>الانفعال ({rec.emotion}):</span>
                        <span className="text-rose-500 font-mono font-bold">
                          {rec.emotionIntensityBefore}%
                        </span>
                        <ArrowRight className="w-3 h-3 text-slate-500 rotate-180" />
                        <span className="text-emerald-500 font-mono font-bold">
                          {rec.emotionIntensityAfter}%
                        </span>
                        <span className={`text-[11px] font-bold ${theme === 'dark' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-700'} px-1.5 py-0.5 rounded mr-1`}>
                          (تحسن {reduction}%)
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteRecord(rec.id)}
                        className={`text-slate-400 hover:text-rose-500 p-1 transition-colors cursor-pointer`}
                        title="حذف"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <div className={`font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>الموقف الفعلي:</div>
                      <p className={theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}>{rec.situation}</p>
                    </div>

                    <div className="space-y-1">
                      <div className={`font-semibold ${theme === 'dark' ? 'text-rose-300' : 'text-rose-700'}`}>الفكرة التلقائية المشوهة:</div>
                      <p className={`font-mono italic ${theme === 'dark' ? 'text-rose-200/90' : 'text-rose-800'}`}>"{rec.automaticThought}"</p>
                    </div>
                  </div>

                  <div className={`p-3.5 rounded-xl ${theme === 'dark' ? 'bg-emerald-950/20 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'} border space-y-1`}>
                    <div className={`text-[11px] font-bold ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-700'} flex items-center gap-1.5`}>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>الفكرة البديلة المتوازنة والواقعية:</span>
                    </div>
                    <p className={`text-xs ${theme === 'dark' ? 'text-emerald-100' : 'text-emerald-900'} leading-relaxed font-medium`}>
                      {rec.alternativeThought}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: BEHAVIORAL ACTIVATION PLANNER */}
      {/* ============================================================== */}
      {activeTab === 'behavioral_activation' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h3 className={`text-base font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                جدول التنشيط السلوكي وتوليد المتعة والإنجاز (Mastery & Pleasure)
              </h3>
              <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} mt-0.5`}>
                تنشيط الحركة والأنشطة يرفع مستويات الدوبامين ويكسر حلقة الاجترار الاكتئابي التلقائي.
              </p>
            </div>

            {!isAddingActivity && (
              <button
                type="button"
                onClick={() => setIsAddingActivity(true)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-900/20"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة نشاط مجدول</span>
              </button>
            )}
          </div>

          {/* Add Activity Form */}
          {isAddingActivity && (
            <form
              onSubmit={handleAddActivity}
              className={`p-5 rounded-2xl ${theme === 'dark' ? 'bg-emerald-950/20 border-emerald-500/40' : 'bg-emerald-50 border-emerald-200 shadow-xl'} border space-y-4 animate-fadeIn`}
            >
              <div className={`flex justify-between items-center border-b ${theme === 'dark' ? 'border-white/10' : 'border-emerald-100'} pb-3`}>
                <h4 className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-emerald-900'} flex items-center gap-2`}>
                  <Activity className="w-4 h-4 text-emerald-500" />
                  <span>تخطيط نشاط سلوكي جديد</span>
                </h4>
                <button
                  type="button"
                  onClick={() => setIsAddingActivity(false)}
                  className={`text-xs ${theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'} cursor-pointer transition-colors`}
                >
                  إلغاء
                </button>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className={`text-xs font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>اليوم:</label>
                  <select
                    value={newDay}
                    onChange={(e) => setNewDay(e.target.value)}
                    className={`w-full px-3 py-2 text-xs ${theme === 'dark' ? 'bg-[#0b1026] border-white/10 text-slate-200 focus:border-emerald-500' : 'bg-white border-slate-200 text-slate-900 focus:border-emerald-500 shadow-inner'} border rounded-xl focus:outline-none transition-colors`}
                  >
                    {['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'].map(
                      (day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className={`text-xs font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>التوقيت التقريبي:</label>
                  <input
                    type="text"
                    placeholder="مثال: 07:00 صباحاً"
                    value={newTimeSlot}
                    onChange={(e) => setNewTimeSlot(e.target.value)}
                    className={`w-full px-3 py-2 text-xs ${theme === 'dark' ? 'bg-white/5 border-white/10 text-slate-200 focus:border-emerald-500' : 'bg-white border-slate-200 text-slate-900 focus:border-emerald-500 shadow-inner'} border rounded-xl focus:outline-none transition-colors`}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className={`text-xs font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>نوع النشاط:</label>
                  <select
                    value={newCategory}
                    onChange={(e) =>
                      setNewCategory(e.target.value as 'pleasure' | 'mastery' | 'routine' | 'social')
                    }
                    className={`w-full px-3 py-2 text-xs ${theme === 'dark' ? 'bg-[#0b1026] border-white/10 text-slate-200 focus:border-emerald-500' : 'bg-white border-slate-200 text-slate-900 focus:border-emerald-500 shadow-inner'} border rounded-xl focus:outline-none transition-colors`}
                  >
                    <option value="pleasure">متعة وترفيه (Pleasure)</option>
                    <option value="mastery">إنجاز وكفاءة (Mastery)</option>
                    <option value="routine">روتين وعناية ذاتية (Routine)</option>
                    <option value="social">تواصل اجتماعي (Social)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className={`text-xs font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>اسم النشاط السلوكي وتفاصيله:</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: المشي في الحديقة، إعداد وجبة صحية، إنهاء المعاملة العالقة..."
                  value={newActName}
                  onChange={(e) => setNewActName(e.target.value)}
                  className={`w-full px-3 py-2 text-xs ${theme === 'dark' ? 'bg-white/5 border-white/10 text-slate-200 focus:border-emerald-500' : 'bg-white border-slate-200 text-slate-900 focus:border-emerald-500 shadow-inner'} border rounded-xl focus:outline-none transition-colors`}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <div className={`flex justify-between text-xs font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    <span>درجة الإنجاز المتوقعة (Mastery: {newMastery}/10):</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={newMastery}
                    onChange={(e) => setNewMastery(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className={`flex justify-between text-xs font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    <span>درجة المتعة المتوقعة (Pleasure: {newPleasure}/10):</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={newPleasure}
                    onChange={(e) => setNewPleasure(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingActivity(false)}
                  className={`px-4 py-2 ${theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-slate-300' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600'} border rounded-xl text-xs font-semibold cursor-pointer transition-colors shadow-sm`}
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer shadow-md"
                >
                  حفظ النشاط
                </button>
              </div>
            </form>
          )}

          {/* Activities List */}
          <div className="space-y-3">
            {activities.map((act) => {
              const categoryLabels = {
                pleasure: { label: 'متعة وترفيه', color: theme === 'dark' ? 'text-amber-400 bg-amber-500/10' : 'text-amber-700 bg-amber-50' },
                mastery: { label: 'إنجاز وكفاءة', color: theme === 'dark' ? 'text-indigo-400 bg-indigo-500/10' : 'text-indigo-700 bg-indigo-50' },
                routine: { label: 'روتين ذاتي', color: theme === 'dark' ? 'text-blue-400 bg-blue-500/10' : 'text-blue-700 bg-blue-50' },
                social: { label: 'تواصل اجتماعي', color: theme === 'dark' ? 'text-purple-400 bg-purple-500/10' : 'text-purple-700 bg-purple-50' },
              };
              const catInfo = categoryLabels[act.category];

              return (
                <div
                  key={act.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                    act.completed
                      ? theme === 'dark' ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-emerald-50 border-emerald-200'
                      : theme === 'dark' ? 'bg-white/5 border-white/10 hover:border-white/20' : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={act.completed}
                      onChange={() => handleToggleActivity(act.id)}
                      className="w-5 h-5 mt-0.5 accent-emerald-500 rounded cursor-pointer"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border border-transparent ${catInfo.color}`}>
                          {catInfo.label}
                        </span>
                        <span className={`text-xs font-mono ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                          {act.day} · {act.timeSlot}
                        </span>
                      </div>
                      <div
                        className={`text-sm font-semibold ${
                          act.completed ? 'line-through text-slate-400' : theme === 'dark' ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {act.activityName}
                      </div>
                      {act.notes && (
                        <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} leading-relaxed`}>{act.notes}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className={`px-2 py-1 rounded border ${theme === 'dark' ? 'text-indigo-300 bg-indigo-500/10 border-indigo-500/20' : 'text-indigo-700 bg-indigo-50 border-indigo-200'}`}>
                        إنجاز: {act.masteryScore}/10
                      </span>
                      <span className={`px-2 py-1 rounded border ${theme === 'dark' ? 'text-amber-300 bg-amber-500/10 border-amber-500/20' : 'text-amber-700 bg-amber-50 border-amber-200'}`}>
                        متعة: {act.pleasureScore}/10
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteActivity(act.id)}
                      className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer transition-colors"
                      title="حذف"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}

            {activities.length === 0 && (
              <div className={`p-8 rounded-2xl border border-dashed ${theme === 'dark' ? 'border-white/10 text-slate-500' : 'border-slate-200 text-slate-400'} text-center space-y-2`}>
                <Calendar className="w-8 h-8 mx-auto opacity-20" />
                <p className="text-sm">لم يتم جدولة أي أنشطة سلوكية حتى الآن.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
