import { User } from 'firebase/auth';
import { ClinicalStaffUser } from '../services/clinicalAuth';
import {
  Activity,
  RotateCcw,
  Brain,
  Database,
  BookOpen,
  Sun,
  Moon,
  LogIn,
  LogOut,
  LayoutList,
  Stethoscope,
  Building2,
  KeyRound,
  ShieldCheck,
  Cpu,
} from 'lucide-react';

interface NavbarProps {
  onOpenModal: (type: 'calibration' | 'scales' | 'guidelines' | 'history') => void;
  onReset: () => void;
  onGoToAssessment: () => void;
  onGoToCbt: () => void;
  onGoToMemory: () => void;
  onGoToDatabase: () => void;
  onGoToPermissions: () => void;
  onGoToSettings: () => void;
  onGoToPatients: () => void;
  onGoToAppointments: () => void;
  onGoToWorkspace: () => void;
  activeView: 'assessment' | 'cbt' | 'memory' | 'database' | 'permissions' | 'settings' | 'patients' | 'appointments' | 'workspace';
  historyCount: number;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
  isLoggingIn?: boolean;
  clinicalStaff: ClinicalStaffUser | null;
  onOpenStaffLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenModal,
  onReset,
  onGoToAssessment,
  onGoToCbt,
  onGoToMemory,
  onGoToDatabase,
  onGoToPermissions,
  onGoToSettings,
  onGoToPatients,
  onGoToAppointments,
  onGoToWorkspace,
  activeView,
  historyCount,
  theme,
  onToggleTheme,
  user,
  onLogin,
  onLogout,
  isLoggingIn = false,
  clinicalStaff,
  onOpenStaffLogin,
}) => {
  return (
    <header className={`relative z-50 border-b ${theme === 'dark' ? 'border-white/10 bg-[#070b19]/90' : 'border-slate-200 bg-white/90'} backdrop-blur-md sticky top-0 no-print transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={onGoToAssessment}
          className="flex items-center gap-2.5 text-right cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-1"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-950/50">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <span className={`text-base sm:text-lg font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'} group-hover:text-indigo-500 transition-colors whitespace-nowrap shrink-0`}>
            PsychoContext <span className={`font-normal text-xs sm:text-sm mr-1.5 hidden lg:inline ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>| الموازنة السريرية</span>
          </span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className={`flex items-center gap-2 sm:gap-4 text-xs sm:text-sm font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} overflow-x-auto custom-scrollbar`}>
          <button
            onClick={onGoToAssessment}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeView === 'assessment'
                ? 'bg-purple-600/20 border border-purple-500/40 text-purple-600 font-bold'
                : `hover:bg-black/5`
            }`}
          >
            الفحص السريري
          </button>

          <button
            onClick={onGoToCbt}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeView === 'cbt'
                ? 'bg-indigo-600/25 border border-indigo-500/40 text-indigo-500 font-bold'
                : `hover:bg-black/5`
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CBT</span>
            <span className="sm:hidden">علاجي</span>
          </button>

          {user && (
            <button
              onClick={onGoToDatabase}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                activeView === 'database'
                  ? 'bg-amber-600/25 border border-amber-500/40 text-amber-600 font-bold'
                  : `hover:bg-black/5`
              }`}
            >
              <LayoutList className="w-3.5 h-3.5" />
              <span>السجلات السحابية</span>
            </button>
          )}

          {clinicalStaff?.role === 'doctor' && (
            <>
              <button
                onClick={onGoToPermissions}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  activeView === 'permissions'
                    ? 'bg-rose-600/25 border border-rose-500/40 text-rose-600 font-bold'
                    : `hover:bg-black/5`
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>الصلاحيات</span>
              </button>
              <button
                onClick={onGoToWorkspace}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  activeView === 'workspace'
                    ? 'bg-purple-600/25 border border-purple-500/40 text-purple-400 font-bold'
                    : `hover:bg-black/5`
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>مستودع الدرايف والـ AI</span>
              </button>
            </>
          )}

          <button onClick={onGoToPatients} className={`px-3 py-1.5 rounded-xl transition-all ${activeView === 'patients' ? 'bg-indigo-600/20 text-indigo-500 font-bold' : ''}`}>المرضى</button>
          <button onClick={onGoToAppointments} className={`px-3 py-1.5 rounded-xl transition-all ${activeView === 'appointments' ? 'bg-indigo-600/20 text-indigo-500 font-bold' : ''}`}>المواعيد</button>
          {clinicalStaff?.role === 'clinic_manager' && (
            <button onClick={onGoToSettings} className={`px-3 py-1.5 rounded-xl transition-all ${activeView === 'settings' ? 'bg-indigo-600/20 text-indigo-500 font-bold' : ''}`}>الإعدادات</button>
          )}

          <button
            onClick={onGoToMemory}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeView === 'memory'
                ? 'bg-emerald-600/25 border border-emerald-500/40 text-emerald-600 font-bold'
                : `hover:bg-black/5`
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">بنك الذاكرة</span>
            <span className="sm:hidden">ذاكرة</span>
          </button>

          <button
            onClick={() => onOpenModal('history')}
            className={`hover:text-indigo-500 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1 px-2 py-1`}
          >
            <span>السجل</span>
            {historyCount > 0 && (
              <span className="font-mono text-[11px] text-purple-600">({historyCount})</span>
            )}
          </button>
        </nav>

        {/* Zone 3: Actions & Profile */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Clinical Role Badge & ID/PIN Authentication Switcher */}
          {clinicalStaff ? (
            <button
              onClick={onOpenStaffLogin}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition cursor-pointer shadow-sm ${
                clinicalStaff.role === 'doctor'
                  ? 'bg-purple-500/15 border-purple-500/30 text-purple-300 hover:bg-purple-500/25'
                  : 'bg-amber-500/15 border-amber-500/30 text-amber-300 hover:bg-amber-500/25'
              }`}
              title="تغيير صلاحية الكادر السريري أو تسجيل الخروج"
            >
              {clinicalStaff.role === 'doctor' ? (
                <Stethoscope className="w-3.5 h-3.5 text-purple-400" />
              ) : (
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
              )}
              <span className="hidden sm:inline">{clinicalStaff.displayName}</span>
              <span className="sm:hidden">{clinicalStaff.role === 'doctor' ? 'طبيب' : 'مدير'}</span>
            </button>
          ) : (
            <button
              onClick={onOpenStaffLogin}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition cursor-pointer ${
                theme === 'dark'
                  ? 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
              title="تسجيل الدخول بالمعرف وكلمة المرور للطبيب أو مدير العيادة"
            >
              <KeyRound className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">دخول الكادر (PIN)</span>
              <span className="sm:hidden">الكادر</span>
            </button>
          )}

          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-amber-400 hover:bg-white/10' : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'} transition-all cursor-pointer`}
            title={theme === 'dark' ? 'الوضع المضيء' : 'الوضع المظلم'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {user ? (
            <div className="flex items-center gap-2">
              <div className="hidden md:flex flex-col items-end text-[10px] leading-tight text-slate-400">
                <span className="font-bold text-slate-200 truncate max-w-[80px]">{user.displayName}</span>
                <button onClick={onLogout} className="text-rose-400 hover:underline cursor-pointer">خروج</button>
              </div>
              <img
                src={user.photoURL || ''}
                alt="Profile"
                className="w-8 h-8 rounded-full border border-indigo-500/50"
              />
            </div>
          ) : (
            <button
              onClick={onLogin}
              disabled={isLoggingIn}
              className={`px-3 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-indigo-900/40 ${
                isLoggingIn
                  ? 'bg-indigo-700/60 text-indigo-200 cursor-wait'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer'
              }`}
            >
              {isLoggingIn ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>جاري الفتح...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-3.5 h-3.5" />
                  <span>دخول الطبيب</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
