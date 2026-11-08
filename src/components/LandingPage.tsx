import React from 'react';
import { Stethoscope, Building2, Brain, Activity } from 'lucide-react';

interface LandingPageProps {
  onOpenStaffLogin: () => void;
  theme: 'dark' | 'light';
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenStaffLogin, theme }) => {
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#050811] text-white' : 'bg-slate-50 text-slate-900'}`}>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <img 
          src="/hero_banner_psychocontext.jpg" 
          alt="Hero Banner" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
        
        <div className="relative z-10 text-center px-4 space-y-6">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
            PsychoContext <br /> <span className="text-indigo-400">نظام الموازنة السريرية</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto">
            منصة متقدمة لدعم اتخاذ القرار الطبي، تحليل الحالة العاطفية، وإدارة السجلات السريرية بدقة واحترافية.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button 
              onClick={onOpenStaffLogin}
              className="flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold transition shadow-xl cursor-pointer"
            >
              <Stethoscope className="w-5 h-5" />
              دخول الطبيب المعالج
            </button>
            <button 
              onClick={onOpenStaffLogin}
              className="flex items-center gap-2 px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white rounded-2xl font-bold transition shadow-xl cursor-pointer"
            >
              <Building2 className="w-5 h-5" />
              دخول مدير العيادة
            </button>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8">
        <div className={`p-8 rounded-3xl border ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-white border-slate-200 shadow-sm'}`}>
          <Brain className="w-10 h-10 text-purple-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">تحليل دقيق</h3>
          <p className="text-sm opacity-80">تحليل متقدم لنبرة الصوت وسرعة الكلام لتقدير الحالة العاطفية.</p>
        </div>
        <div className={`p-8 rounded-3xl border ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-white border-slate-200 shadow-sm'}`}>
          <Activity className="w-10 h-10 text-indigo-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">تتبع التطور</h3>
          <p className="text-sm opacity-80">رسوم بيانية توضح مسار الحالة وتحسن الأعراض عبر الزمن.</p>
        </div>
        <div className={`p-8 rounded-3xl border ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-white border-slate-200 shadow-sm'}`}>
          <Building2 className="w-10 h-10 text-amber-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">إدارة متكاملة</h3>
          <p className="text-sm opacity-80">نظام إدارة صلاحيات ومواعيد وتقارير طبية مؤمنة بالكامل.</p>
        </div>
      </section>
    </div>
  );
};
