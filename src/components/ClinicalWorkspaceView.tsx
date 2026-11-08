import React, { useState, useEffect } from 'react';
import { driveClinicalService, DriveFileItem, KNOWLEDGE_BASE_BRANCHES, HybridQuestion } from '../services/driveClinicalService';
import { clinicalDatabase } from '../services/clinicalDatabase';
import { 
  Bot, 
  KeyRound, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  Cpu,
  Layers,
  HeartPulse,
  Brain,
  Sparkles,
  Database,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  ShieldCheck,
  FileCheck
} from 'lucide-react';

interface ClinicalWorkspaceViewProps {
  theme: 'dark' | 'light';
}

export const ClinicalWorkspaceView: React.FC<ClinicalWorkspaceViewProps> = ({ theme }) => {
  const [activeTab, setActiveTab] = useState<'consultants' | 'transformer'>('consultants');
  const [tokenInput, setTokenInput] = useState('');
  const [accessToken, setAccessToken] = useState<string | null>(() => driveClinicalService.getAccessToken());
  const [files, setFiles] = useState<DriveFileItem[]>([]);
  const [selectedBranch, setSelectedBranch] = useState(KNOWLEDGE_BASE_BRANCHES[3].id); // Affective Medicine default
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'agent'; text: string; agentName?: string }>>([
    { 
      sender: 'agent', 
      text: 'أهلاً بك يا فخامة الطبيب في غرفة المستشارين الإكلينيكيين. تم تفعيل بروتوكول RAG الصارم (Hard Grounding). لا يتم قبول أو استخراج أي معلومة إلا حصرياً من ملفات Google Drive المعتمدة لفرع "طب المشاعر" وبقية البوابات لضمان صفر هلوسة. يمكنك مناقشة الأسئلة وتعديلها (إضافة، حذف، إعادة ترتيب) أدناه قبل الاعتماد النهائي.', 
      agentName: 'الحارس الذكي (RAG Guardian)' 
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [draftQuestions, setDraftQuestions] = useState<HybridQuestion[]>([
    {
      id: "q_rag_1",
      text: "إلى أي مدى تختبر شعوراً مفاجئاً بفقدان السيطرة على الانفعالات الوجدانية؟",
      inherentWeight: 9,
      contextualImportance: 9,
      finalUnifiedWeight: 18,
      reference: "قاعدة المعرفة - ملف الدرايف #1 (طب المشاعر)",
      isDuplicate: false,
      options: ["نادراً جداً", "أحياناً", "غالباً", "بصورة مستمرة"]
    },
    {
      id: "q_rag_2",
      text: "هل تلاحظ أن الأفكار التلقائية السلبية تعيق قدرتك على التفكير المتوازن؟",
      inherentWeight: 8,
      contextualImportance: 8,
      finalUnifiedWeight: 16,
      reference: "قاعدة المعرفة - ملف الدرايف #2 (العلاج المعرفي)",
      isDuplicate: false,
      options: ["لا تعيقني", "تعيقني قليلاً", "تعيقني بشدة"]
    }
  ]);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [draftStructuredData, setDraftStructuredData] = useState<any>(null);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [isMigrated, setIsMigrated] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);

  useEffect(() => {
    if (accessToken) {
      driveClinicalService.listClinicalFiles(accessToken).then(f => setFiles(f));
    }
  }, [accessToken]);

  const handleConnectDrive = (e: React.FormEvent) => {
    e.preventDefault();
    if (tokenInput.trim()) {
      driveClinicalService.setAccessToken(tokenInput.trim());
      setAccessToken(tokenInput.trim());
      driveClinicalService.listClinicalFiles(tokenInput.trim()).then(f => setFiles(f));
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = inputMessage;
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInputMessage('');

    setTimeout(async () => {
      const reply = await driveClinicalService.consultAgents(userMsg, selectedBranch, chatMessages);
      setChatMessages(prev => [...prev, { sender: 'agent', text: reply, agentName: 'فريق المستشارين الإكلينيكيين' }]);
    }, 700);
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    const branchObj = KNOWLEDGE_BASE_BRANCHES.find(b => b.id === selectedBranch) || KNOWLEDGE_BASE_BRANCHES[3];
    const newQ: HybridQuestion = {
      id: `q_cust_${Date.now()}`,
      text: newQuestionText.trim(),
      inherentWeight: 7,
      contextualImportance: 8,
      finalUnifiedWeight: 15,
      reference: `مضاف يدوياً بمعرفة الطبيب - فرع (${branchObj.name})`,
      isDuplicate: false,
      options: ["لا", "نعم قليلاً", "نعم بشدة"]
    };

    setDraftQuestions(prev => [...prev, newQ]);
    setNewQuestionText('');
  };

  const handleDeleteQuestion = (id: string) => {
    setDraftQuestions(prev => prev.filter(q => q.id !== id));
  };

  const handleMoveQuestionUp = (index: number) => {
    if (index === 0) return;
    setDraftQuestions(prev => {
      const arr = [...prev];
      const temp = arr[index];
      arr[index] = arr[index - 1];
      arr[index - 1] = temp;
      return arr;
    });
  };

  const handleMoveQuestionDown = (index: number) => {
    if (index === draftQuestions.length - 1) return;
    setDraftQuestions(prev => {
      const arr = [...prev];
      const temp = arr[index];
      arr[index] = arr[index + 1];
      arr[index + 1] = temp;
      return arr;
    });
  };

  const handleGenerateTransformerDraft = async () => {
    setIsTransforming(true);
    const branchObj = KNOWLEDGE_BASE_BRANCHES.find(b => b.id === selectedBranch) || KNOWLEDGE_BASE_BRANCHES[3];
    const draft = await driveClinicalService.transformToStructuredData(branchObj.name, draftQuestions);
    setDraftStructuredData(draft);
    setIsTransforming(false);
    setActiveTab('transformer');
  };

  const handleMigrateToFirestore = async (e: React.FormEvent) => {
    e.preventDefault();
    setPinError('');
    if (pinInput.trim() !== '123456' && pinInput.trim() !== 'doctor') {
      setPinError('رمز الـ PIN غير صحيح. الرمز الافتراضي للطبيب هو: 123456');
      return;
    }

    try {
      await clinicalDatabase.updateClinicSettings({
        latestHybridScale: draftStructuredData,
        migratedAt: new Date().toISOString()
      });
      setIsMigrated(true);
      setTimeout(() => setIsMigrated(false), 4000);
    } catch (err) {
      setPinError('حدث خطأ أثناء الترحيل إلى Firestore');
    }
  };

  const currentBranchObj = KNOWLEDGE_BASE_BRANCHES.find(b => b.id === selectedBranch) || KNOWLEDGE_BASE_BRANCHES[3];

  return (
    <div className={`p-6 sm:p-8 rounded-3xl ${theme === 'dark' ? 'bg-gradient-to-b from-slate-900/90 to-slate-950/90 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'} border shadow-2xl space-y-6 animate-fadeIn`}>
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-5 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-900/50">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                منصة الحارس الذكي وطبيب التحويل (RAG & Knowledge Governance)
              </h2>
              <p className="text-xs text-indigo-300 font-medium mt-0.5">
                إدارة 5 بوابات رئيسية لقاعدة المعرفة (تضمين "طب المشاعر" Affective Medicine) وتطبيق RAG الصارم.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-black/30 p-1.5 rounded-2xl border border-white/10 w-full md:w-auto">
          <button
            onClick={() => setActiveTab('consultants')}
            className={`flex-1 md:flex-none px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'consultants' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-300 hover:bg-white/5'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>طاولة المستشارين والـ Chatbot</span>
          </button>
          <button
            onClick={() => setActiveTab('transformer')}
            className={`flex-1 md:flex-none px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'transformer' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-300 hover:bg-white/5'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>طبيب التحويل وFirestore (PIN)</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Consultant Workspace & Interactive Chatbot & Question Customizer */}
      {activeTab === 'consultants' && (
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Column (5 Portals & Question Customizer with Reordering): 5 cols */}
          <div className="lg:col-span-5 space-y-5">
            {/* 5 Main Knowledge Base Portals */}
            <div className={`p-4 sm:p-5 rounded-2xl border ${theme === 'dark' ? 'bg-black/40 border-white/10' : 'bg-slate-50 border-slate-200'} space-y-3`}>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs font-bold text-indigo-400">
                  <Brain className="w-4 h-4" />
                  <span>البوابات الخمس الرئيسية لقاعدة المعرفة:</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">نشط</span>
              </div>

              <div className="space-y-2">
                {KNOWLEDGE_BASE_BRANCHES.map(branch => (
                  <button
                    key={branch.id}
                    onClick={() => setSelectedBranch(branch.id)}
                    className={`w-full p-3 rounded-xl border text-right transition flex items-center justify-between cursor-pointer ${
                      selectedBranch === branch.id
                        ? 'border-indigo-500 bg-indigo-600/30 font-bold text-white shadow-md'
                        : 'border-white/5 bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {branch.id === 'affective' ? (
                        <HeartPulse className="w-4 h-4 text-rose-400 shrink-0" />
                      ) : (
                        <Database className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      )}
                      <span className="text-xs">{branch.name}</span>
                    </div>
                    {branch.id === 'affective' && (
                      <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded-full font-mono">جديد</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Customizer (Add, Delete, Reorder) */}
            <div className={`p-4 sm:p-5 rounded-2xl border ${theme === 'dark' ? 'bg-black/40 border-white/10' : 'bg-slate-50 border-slate-200'} space-y-4`}>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <Sparkles className="w-4 h-4" />
                  <span>محرر الأسئلة وصلاحيات التعديل:</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400">({draftQuestions.length} أسئلة في المسودة)</span>
              </div>

              <div className="max-h-60 overflow-y-auto space-y-2.5 pr-1 custom-scrollbar">
                {draftQuestions.map((q, idx) => (
                  <div key={q.id} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start justify-between gap-3 group">
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-lg bg-indigo-600/30 text-indigo-300 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div>
                        <p className="text-xs font-semibold leading-relaxed text-slate-200">{q.text}</p>
                        <span className="text-[10px] text-indigo-400 font-mono block mt-1">المرجع: {q.reference}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleMoveQuestionUp(idx)}
                        disabled={idx === 0}
                        className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                        title="تحريك لأعلى"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveQuestionDown(idx)}
                        disabled={idx === draftQuestions.length - 1}
                        className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                        title="تحريك لأسفل"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteQuestion(q.id)}
                        className="p-1 rounded hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 cursor-pointer"
                        title="حذف السؤال"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddQuestion} className="flex gap-2 pt-1">
                <input
                  type="text"
                  value={newQuestionText}
                  onChange={e => setNewQuestionText(e.target.value)}
                  placeholder="أضف سؤالاً جديداً للمقياس الهجين..."
                  className="flex-1 p-2.5 rounded-xl border text-xs bg-black/50 border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <button type="submit" className="px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold cursor-pointer transition flex items-center gap-1">
                  <Plus className="w-4 h-4" />
                  <span>إضافة</span>
                </button>
              </form>
            </div>

            <button
              onClick={handleGenerateTransformerDraft}
              disabled={isTransforming}
              className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-2xl text-xs shadow-xl flex items-center justify-center gap-2 cursor-pointer transition"
            >
              <Cpu className="w-4 h-4" />
              <span>{isTransforming ? 'جاري تجهيز المسودة...' : 'تسليم لطبيب التحويل (Transformer Physician)'}</span>
            </button>
          </div>

          {/* Right Column (Interactive Chatbot & RAG Inspection): 7 cols */}
          <div className="lg:col-span-7 flex flex-col h-[580px] rounded-2xl border bg-black/50 border-white/10 overflow-hidden shadow-xl">
            <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-2 text-purple-300">
                <Bot className="w-4 h-4 text-purple-400" />
                <span>طاولة المستشارين والـ Chatbot التفاعلي (الفرع النشط: {currentBranchObj.name})</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>RAG Grounded</span>
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 custom-scrollbar">
              {chatMessages.map((m, idx) => (
                <div key={idx} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  {m.agentName && <span className="text-[10px] text-indigo-400 mb-1 font-mono">{m.agentName}</span>}
                  <div className={`p-3.5 rounded-2xl text-xs max-w-[88%] leading-relaxed ${
                    m.sender === 'user' 
                      ? 'bg-indigo-600 text-white rounded-bl-none shadow-md' 
                      : 'bg-white/10 text-slate-200 rounded-br-none border border-white/5'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-3.5 border-t border-white/10 bg-white/5 flex gap-2.5">
              <input
                type="text"
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                placeholder="ناقش فريق المستشارين واطلب تعديل أو ترتيب الأسئلة استناداً لملفات الدرايف..."
                className="flex-1 p-3 rounded-xl border text-xs bg-black/60 border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button type="submit" className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold cursor-pointer transition flex items-center gap-1.5 shadow-md">
                <span>إرسال</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tab 2: Transformer Physician & PIN Verification */}
      {activeTab === 'transformer' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-4 sm:p-5 rounded-2xl bg-purple-950/30 border border-purple-500/30 flex items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-600/30 flex items-center justify-center shrink-0 border border-purple-500/40">
                <FileCheck className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <strong className="block text-sm font-bold text-white">طبيب التحويل (Transformer Physician Console)</strong>
                <p className="text-slate-300 mt-0.5">
                  تحويل مسودات المقاييس الهجينة المعتمدة إلى Structured Data مهيكلة في قاعدة بيانات Firestore، مشروطة بررمز الـ PIN السري للطبيب حصراً.
                </p>
              </div>
            </div>
          </div>

          {!draftStructuredData ? (
            <div className="p-12 text-center border border-dashed border-white/10 rounded-3xl text-slate-400 space-y-3">
              <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
              <p className="text-xs">لا توجد مسودة جاهزة للترحيل. يرجى مناقشة فريق المستشارين وتعديل الأسئلة أولاً ثم النقر على "تسليم لطبيب التحويل".</p>
              <button
                onClick={() => setActiveTab('consultants')}
                className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                العودة لطاولة المستشارين
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Structured JSON Preview */}
              <div className={`p-5 rounded-2xl border ${theme === 'dark' ? 'bg-black/50 border-white/10' : 'bg-slate-50 border-slate-200'} space-y-3`}>
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Database className="w-4 h-4" />
                    <span>البيانات المهيكلة النهائية (Structured JSON):</span>
                  </h3>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">جاهز للترحيل</span>
                </div>
                <div className="p-4 rounded-xl bg-black/70 border border-white/5 font-mono text-[11px] text-slate-300 max-h-80 overflow-y-auto custom-scrollbar leading-relaxed">
                  <pre>{JSON.stringify(draftStructuredData, null, 2)}</pre>
                </div>
              </div>

              {/* PIN Verification & Firestore Write */}
              <div className={`p-5 rounded-2xl border ${theme === 'dark' ? 'bg-black/50 border-white/10' : 'bg-slate-50 border-slate-200'} space-y-4`}>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <KeyRound className="w-4 h-4" />
                  <span>تأكيد هوية الطبيب عبر رمز الـ PIN للكتابة في Firestore</span>
                </div>

                <form onSubmit={handleMigrateToFirestore} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1.5 font-medium">رمز الـ PIN السري للطبيب (الافتراضي: 123456):</label>
                    <input
                      type="password"
                      value={pinInput}
                      onChange={e => setPinInput(e.target.value)}
                      placeholder="أدخل رمز الـ PIN..."
                      className="w-full p-3.5 rounded-xl border font-mono tracking-widest bg-black/60 border-white/10 text-white text-sm"
                      required
                    />
                    {pinError && <p className="text-rose-400 text-[11px] mt-1.5 font-semibold">{pinError}</p>}
                  </div>

                  {isMigrated && (
                    <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                      <span>تم بنجاح اعتماد وتخزين المقياس الهجين في قاعدة بيانات Firestore!</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition text-xs sm:text-sm"
                  >
                    <Database className="w-4 h-4" />
                    <span>اعتماد وتحويل نهائي إلى قاعدة بيانات التطبيق (Firestore)</span>
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
