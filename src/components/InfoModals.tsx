import React from 'react';
import { X, BookOpen, Compass, CheckCircle, Trash2, Calendar, FileText } from 'lucide-react';
import { AssessmentResult, OFFICIAL_SCALE_REFERENCES } from '../types/clinical';

interface InfoModalsProps {
  activeModal: 'calibration' | 'scales' | 'guidelines' | 'history' | null;
  onClose: () => void;
  savedAssessments: AssessmentResult[];
  onSelectSaved: (assessment: AssessmentResult) => void;
  onDeleteSaved: (id: string) => void;
}

export const InfoModals: React.FC<InfoModalsProps> = ({
  activeModal,
  onClose,
  savedAssessments,
  onSelectSaved,
  onDeleteSaved,
}) => {
  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-[#080d1e] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {activeModal === 'calibration' && <Compass className="w-5 h-5 text-indigo-400" />}
            {activeModal === 'scales' && <BookOpen className="w-5 h-5 text-purple-400" />}
            {activeModal === 'guidelines' && <CheckCircle className="w-5 h-5 text-emerald-400" />}
            {activeModal === 'history' && <FileText className="w-5 h-5 text-amber-400" />}

            <h3 className="text-base sm:text-lg font-bold text-white">
              {activeModal === 'calibration' && 'منهجية المعايرة السريرية والموازنة البيئية'}
              {activeModal === 'scales' && 'المقاييس النفسية المعتمدة علمياً'}
              {activeModal === 'guidelines' && 'دليل المستشار لتفسير النتائج'}
              {activeModal === 'history' && 'سجل الفحوصات والتقييمات المحفوظة'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-slate-300 leading-relaxed custom-scrollbar">
          {activeModal === 'calibration' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-indigo-200">
                <strong>لماذا نحتاج للمعايرة البيئية؟</strong>
                <p className="mt-1 text-xs">
                  العديد من المقاييس الغربية صُممت في بيئات مستقرة مادياً وذات كثافة سكانية منخفضة. في المجتمعات ذات الأعباء الاقتصادية والكثافة الحضرية المرتفعة، قد يعاني الفرد من اضطراب النوم أو الإرهاق كاستجابة طبيعية للضغوط وليس كمرض بيولوجي داخلي.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white mb-2">معادلة الموازنة الإحصائية:</h4>
                <div className="p-3 bg-white/5 rounded-xl font-mono text-xs text-purple-300 direction-ltr text-center">
                  Calibrated Score = Raw Score - (Environmental Stress Modifier × 0.25)
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white">المتغيرات المؤثرة في معامل الضغط المحيط:</h4>
                <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-400">
                  <li><strong>الكثافة الحضرية والازدحام (+15%):</strong> المناطق السكنية المكتظة تعزز مستويات التحفيز الحسي وتزيد إفراز الكورتيزول.</li>
                  <li><strong>الضائقة المادية والديون (+15%):</strong> تولد قلقاً مستقبلياً مزمناً يحاكي أعراض عسر المزاج.</li>
                  <li><strong>البطالة وفقدان العمل (+10%):</strong> ترتبط بانهيار الروتين اليومي ومشاعر نقص الجدوى الذاتية.</li>
                  <li><strong>الأمراض الجسدية المزمنة (+12%):</strong> تستنزف الطاقة البدنية وترفع درجات الأعراض الجسدية (Somatic).</li>
                  <li><strong>العزلة السكنية والانفصال (+8%):</strong> غياب شبكة الدعم المجتمعي يقلل من مناعة مواجهة الأزمات.</li>
                </ul>
              </div>
            </div>
          )}

          {activeModal === 'scales' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/30 text-purple-200 text-xs leading-relaxed">
                <strong>المرجعيات الأكاديمية والتقنين السريري للمقاييس المعتمدة:</strong>
                <p className="mt-1 text-slate-300">
                  جميع المقاييس السبعة المدرجة في المنصة معتمدة دولياً ومقننة في البيئات السريرية العربية، مع الاحتفاظ ببنودها القياسية، أوزانها النسبية، ومعايير القطع (Cut-offs) الأصلية.
                </p>
              </div>

              {OFFICIAL_SCALE_REFERENCES.map((scale) => (
                <div
                  key={scale.code}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 hover:border-purple-500/30 transition-all"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 border-b border-white/5 pb-2">
                    <div>
                      <span className="font-bold text-white text-sm">
                        {scale.arabicName} ({scale.code})
                      </span>
                      <div className="text-[11px] text-purple-400 font-mono">
                        {scale.englishName}
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                      {scale.authorsYear}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div>
                      <span className="text-slate-400 font-semibold">التوثيق العلمي: </span>
                      <span className="text-slate-300 font-mono text-[11px] italic">
                        {scale.citation}
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                      <div className="bg-black/30 p-2 rounded-lg border border-white/5">
                        <span className="text-indigo-300 font-semibold">مدى الدرجات: </span>
                        <span className="text-slate-300">{scale.scoringRange}</span>
                      </div>
                      <div className="bg-black/30 p-2 rounded-lg border border-white/5">
                        <span className="text-amber-300 font-semibold">نقاط القطع: </span>
                        <span className="text-slate-300">{scale.cutOffs}</span>
                      </div>
                    </div>

                    <div className="pt-1 text-[11px] text-slate-300">
                      <span className="text-slate-400 font-semibold">المجال السريري: </span>
                      <span>{scale.clinicalDomain}</span>
                    </div>

                    <div className="pt-1 text-[11px] text-emerald-300 bg-emerald-950/20 p-2 rounded-lg border border-emerald-500/20">
                      <span className="font-semibold">المعايرة والتقنين العربي: </span>
                      <span>{scale.standardNormsArabic}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeModal === 'guidelines' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-300">
                <strong>التفريق بين الاكتئاب التفاعلي والاكتئاب الداخلي:</strong>
                <p className="mt-1 text-xs">
                  عندما تكون الدرجة الخام مرتفعة بينما الدرجة المعايرة منخفضة، يشير ذلك إلى أن الحالة هي رد فعل طبيعي لظروف بيئية قاهرة، والعلاج الأفضل يكون بالدعم الاجتماعي وحل المشكلات بدلاً من الدوائي السريع.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white">توجيهات التدخل السريري المقترحة:</h4>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-400">
                  <li><strong>الدرجة 0-20%:</strong> تعزيز التدابير الوقائية وروتين النوم والرياضة.</li>
                  <li><strong>الدرجة 21-55%:</strong> استشارة إرشادية وتخفيف منغصات البيئة والعلاج السلوكي المعرفي (CBT).</li>
                  <li><strong>الدرجة &gt; 55%:</strong> إحالة طبية نفسية شاملة لتقييم الحاجة إلى خطة علاجية متكاملة.</li>
                </ul>
              </div>
            </div>
          )}

          {activeModal === 'history' && (
            <div className="space-y-3">
              {savedAssessments.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-xs">
                  لا توجد فحوصات محفوظة في السجل المحلي حتى الآن. يمكنك حفظ أي فحص بعد إتمامه.
                </div>
              ) : (
                savedAssessments.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/40 transition-colors flex justify-between items-center gap-4"
                  >
                    <div className="space-y-1 cursor-pointer flex-1" onClick={() => onSelectSaved(item)}>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{item.demographics.name}</span>
                        <span className="text-[11px] text-purple-400 font-mono">
                          درجة معايرة: {item.calibratedScore}%
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-2 font-mono">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.timestamp}</span>
                        <span>·</span>
                        <span>{item.demographics.city}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectSaved(item)}
                        className="px-3 py-1.5 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 rounded-lg text-xs font-semibold transition cursor-pointer"
                      >
                        عرض التقرير
                      </button>
                      <button
                        onClick={() => onDeleteSaved(item.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-white/5 transition cursor-pointer"
                        title="حذف الفحص"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/10 hover:bg-white/15 text-slate-200 rounded-xl text-xs font-semibold transition cursor-pointer"
          >
            إغلاق النافذة
          </button>
        </div>
      </div>
    </div>
  );
};
