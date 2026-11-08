import React, { useState, useEffect } from 'react';
import { clinicalDatabase, PatientRecord, VisitRecord } from '../services/clinicalDatabase';
import { User, Calendar, FileText, Search, UserCircle, ArrowRight, ArrowLeft, Clock, LayoutList, Eye } from 'lucide-react';
import { AssessmentResult } from '../types/clinical';

interface ClinicalCloudDatabaseViewProps {
  theme?: 'dark' | 'light';
  onLoadVisit?: (assessment: AssessmentResult) => void;
}

export const ClinicalCloudDatabaseView: React.FC<ClinicalCloudDatabaseViewProps> = ({ theme = 'dark', onLoadVisit }) => {
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [visits, setVisits] = useState<VisitRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [allPatients, allRecentVisits] = await Promise.all([
        clinicalDatabase.getPatients(),
        clinicalDatabase.getAllRecentVisits(30)
      ]);
      setPatients(allPatients);
      setVisits(allRecentVisits);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.caseTitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activePatient = patients.find(p => p.id === selectedPatientId);
  const patientVisits = visits.filter(v => v.patientId === selectedPatientId);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-pulse">
        <LayoutList className="w-12 h-12 text-indigo-500/30 mb-4" />
        <div className="text-slate-400 font-mono text-sm">جاري مزامنة السجلات السحابية...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Search and Toggle Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <LayoutList className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <h2 className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              قاعدة بيانات المرضى والزيارات السريرية
            </h2>
            <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              مزامنة فورية مشفرة للسجلات الطبية والتشخيصات المستخلصة.
            </p>
          </div>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="بحث عن مريض أو عنوان حالة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pr-9 pl-3 py-2 text-xs border rounded-xl focus:outline-none transition-colors ${
              theme === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-indigo-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-500'
            }`}
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Patient Sidebar List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2 mb-1">
            المرضى المسجلون ({filteredPatients.length})
          </div>
          <div className="space-y-2 max-h-[600px] overflow-y-auto custom-scrollbar pr-1">
            {filteredPatients.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedPatientId(p.id)}
                className={`w-full text-right p-4 rounded-2xl border transition-all flex flex-col gap-1.5 group cursor-pointer ${
                  selectedPatientId === p.id 
                    ? 'border-indigo-500 bg-indigo-600/10 shadow-lg' 
                    : theme === 'dark' ? 'border-white/5 bg-white/5 hover:border-white/20' : 'border-slate-100 bg-slate-50 hover:bg-white hover:shadow-sm'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className={`font-bold text-sm ${selectedPatientId === p.id ? 'text-indigo-400' : (theme === 'dark' ? 'text-white' : 'text-slate-900')}`}>
                    {p.name}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${theme === 'dark' ? 'bg-white/10 text-slate-400' : 'bg-slate-200 text-slate-600'}`}>
                    {p.age} سنة
                  </span>
                </div>
                {p.caseTitle && (
                  <div className={`text-[11px] truncate leading-tight ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    {p.caseTitle}
                  </div>
                )}
                <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500 italic">
                  <Clock className="w-3 h-3" />
                  <span>آخر تحديث: {p.updatedAt?.toDate?.()?.toLocaleDateString('ar-SA') || 'جديد'}</span>
                </div>
              </button>
            ))}

            {filteredPatients.length === 0 && (
              <div className="py-10 text-center text-slate-500 text-xs border border-dashed border-white/10 rounded-2xl">
                لا يوجد مرضى مطابقين للبحث.
              </div>
            )}
          </div>
        </div>

        {/* Visits Detail Area */}
        <div className="lg:col-span-8">
          {!selectedPatientId ? (
            <div className={`h-full min-h-[400px] rounded-3xl border border-dashed flex flex-col items-center justify-center p-8 text-center space-y-4 ${theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50'}`}>
              <UserCircle className="w-16 h-16 text-slate-700 opacity-20" />
              <div>
                <h3 className={`text-base font-bold ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>اختر مريضاً من القائمة الجانبية</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-[280px]">لاستعراض تاريخ الزيارات، ملخصات الحالات، وتطور الخطط العلاجية المقترحة.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-fadeIn">
              {/* Selected Patient Header Card */}
              <div className={`p-6 rounded-3xl border ${theme === 'dark' ? 'bg-indigo-950/20 border-indigo-500/30 shadow-2xl shadow-indigo-900/20' : 'bg-white border-indigo-100 shadow-xl shadow-indigo-100/50'}`}>
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                  <div>
                    <h3 className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{activePatient?.name}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1.5 font-mono">
                      <span>الجنس: {activePatient?.gender === 'male' ? 'ذكر' : 'أنثى'}</span>
                      <span>·</span>
                      <span>المدينة: {activePatient?.city} ({activePatient?.district})</span>
                      <span>·</span>
                      <span>العمل: {activePatient?.job}</span>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-2xl text-xs font-bold border ${theme === 'dark' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                    إجمالي الزيارات: {patientVisits.length}
                  </div>
                </div>
                
                {activePatient?.caseTitle && (
                  <div className={`p-3.5 rounded-xl border italic text-xs leading-relaxed ${theme === 'dark' ? 'bg-black/20 border-white/5 text-slate-300' : 'bg-slate-50 border-slate-100 text-slate-600'}`}>
                    &ldquo;{activePatient.caseTitle}&rdquo;
                  </div>
                )}
              </div>

              {/* Visits Timeline */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">
                  <Calendar className="w-3.5 h-3.5" />
                  سجل الزيارات السريرية والملخصات
                </div>

                {patientVisits.map((visit, idx) => (
                  <div 
                    key={visit.id}
                    className={`relative p-5 rounded-2xl border transition-all ${
                      theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'
                    }`}
                  >
                    {/* Date line connector */}
                    {idx < patientVisits.length - 1 && (
                      <div className="absolute top-1/2 -bottom-1/2 right-[-1px] w-[2px] bg-indigo-500/20 hidden lg:block" />
                    )}

                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                          <span className={`text-xs font-bold font-mono px-2.5 py-1 rounded-lg ${theme === 'dark' ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/20' : 'bg-indigo-50 text-indigo-700 border-indigo-100'} border`}>
                            {visit.timestamp?.toDate?.()?.toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {visit.timestamp?.toDate?.()?.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>

                        <div>
                          <div className={`text-sm font-bold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'} flex items-center gap-2`}>
                            <FileText className="w-3.5 h-3.5 text-purple-500" />
                            الملخص السريري للزيارة:
                          </div>
                          <p className={`text-xs mt-1.5 leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                            {visit.summary}
                          </p>
                        </div>

                        {visit.doctorNotes && (
                          <div className={`p-3 rounded-xl text-[11px] ${theme === 'dark' ? 'bg-black/30 text-slate-300' : 'bg-slate-50 text-slate-700'} border border-transparent`}>
                            <strong className="text-indigo-400">ملاحظات الطبيب: </strong>
                            {visit.doctorNotes}
                          </div>
                        )}
                      </div>

                      <div className="w-full sm:w-auto shrink-0 flex flex-col gap-2">
                        {/* Scoring Chips */}
                        <div className={`p-3 rounded-xl text-center space-y-1 ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'} border`}>
                          <div className="text-[10px] text-slate-500">الدرجة الموزونة</div>
                          <div className="text-xl font-black text-purple-500 font-mono">
                            {visit.assessmentData.calibratedScore}%
                          </div>
                          <div className={`text-[9px] font-bold uppercase ${visit.assessmentData.severityColor}`}>
                            {visit.assessmentData.severityLabel}
                          </div>
                        </div>

                        <button
                          onClick={() => onLoadVisit?.(visit.assessmentData)}
                          className={`w-full py-1.5 rounded-lg text-[10px] font-bold border transition-colors flex items-center justify-center gap-1.5 ${
                            theme === 'dark' ? 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          <Eye className="w-3 h-3" />
                          عرض التقرير الكامل
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {patientVisits.length === 0 && (
                  <div className="py-20 text-center space-y-2 opacity-30">
                    <Clock className="w-10 h-10 mx-auto" />
                    <p className="text-xs">لا يوجد سجل زيارات لهذا المريض بعد.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
