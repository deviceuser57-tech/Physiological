import React, { useState } from 'react';
import { clinicalAuthService, ClinicalStaffUser, PRESET_STAFF_ACCOUNTS } from '../services/clinicalAuth';
import { X, Shield, Lock, User, KeyRound, Stethoscope, Building2, AlertCircle, CheckCircle2 } from 'lucide-react';

interface StaffLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStaffChange: (staff: ClinicalStaffUser | null) => void;
  theme?: 'dark' | 'light';
}

export const StaffLoginModal: React.FC<StaffLoginModalProps> = ({
  isOpen,
  onClose,
  onStaffChange,
  theme = 'dark',
}) => {
  const [username, setUsername] = useState('doctor');
  const [pin, setPin] = useState('123456');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentStaff = clinicalAuthService.getCurrentStaff();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const res = await clinicalAuthService.loginStaff(username, pin);
    if (res.success && res.user) {
      setSuccess(`تم تسجيل الدخول بنجاح بصلاحية: ${res.user.role === 'doctor' ? 'طبيب معالج' : 'مدير العيادة'}`);
      onStaffChange(res.user);
      setTimeout(() => {
        onClose();
        setSuccess(null);
      }, 900);
    } else {
      setError(res.error || 'فشل تسجيل الدخول. تأكد من صحة المعرف وكلمة المرور.');
    }
  };

  const handleSelectPreset = (account: (typeof PRESET_STAFF_ACCOUNTS)[0]) => {
    setUsername(account.username);
    setPin(account.pin);
  };

  const handleLogout = () => {
    clinicalAuthService.setCurrentStaff(null);
    onStaffChange(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div
        className={`w-full max-w-lg rounded-3xl border shadow-2xl overflow-hidden ${
          theme === 'dark' ? 'bg-[#090d22] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold">بوابة الدخول وتحديد صلاحيات العيادة</h3>
              <p className="text-[11px] text-slate-400">نظام إدارة الأدوار (طبيب معالج / مدير العيادة)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Active Status Box */}
          <div
            className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
              theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  currentStaff?.role === 'doctor'
                    ? 'bg-purple-500/20 text-purple-400'
                    : 'bg-amber-500/20 text-amber-400'
                }`}
              >
                {currentStaff?.role === 'doctor' ? <Stethoscope className="w-5 h-5" /> : <Building2 className="w-5 h-5" />}
              </div>
              <div>
                <div className="text-xs text-slate-400">الحساب الفعّال حالياً:</div>
                <div className="text-sm font-bold">{currentStaff?.displayName || 'غير محدد'}</div>
                <div className="text-[11px] text-purple-400 font-mono">
                  الصلاحية: {currentStaff?.role === 'doctor' ? 'طبيب معالج (كامل الصلاحيات + الذاكرة)' : 'مدير العيادة (إداري)'}
                </div>
              </div>
            </div>
            {currentStaff && (
              <button
                type="button"
                onClick={handleLogout}
                className="text-xs text-rose-400 hover:underline cursor-pointer"
              >
                تسجيل الخروج
              </button>
            )}
          </div>

          {/* Quick Preset Selector Buttons */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-400">اختر نوع الحساب السريري:</div>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleSelectPreset(PRESET_STAFF_ACCOUNTS[0])}
                className={`p-3 rounded-2xl border text-right transition flex items-center gap-2.5 cursor-pointer ${
                  username === 'doctor'
                    ? 'border-purple-500 bg-purple-500/15 shadow-sm'
                    : theme === 'dark'
                    ? 'border-white/5 bg-white/5 hover:bg-white/10'
                    : 'border-slate-200 bg-slate-50 hover:bg-white'
                }`}
              >
                <Stethoscope className="w-4 h-4 text-purple-400 shrink-0" />
                <div>
                  <div className="font-bold text-xs">طبيب معالج (Doctor)</div>
                  <div className="text-[10px] text-slate-400 font-mono">doctor / 123456</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleSelectPreset(PRESET_STAFF_ACCOUNTS[1])}
                className={`p-3 rounded-2xl border text-right transition flex items-center gap-2.5 cursor-pointer ${
                  username === 'manager'
                    ? 'border-amber-500 bg-amber-500/15 shadow-sm'
                    : theme === 'dark'
                    ? 'border-white/5 bg-white/5 hover:bg-white/10'
                    : 'border-slate-200 bg-slate-50 hover:bg-white'
                }`}
              >
                <Building2 className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <div className="font-bold text-xs">مدير العيادة (Manager)</div>
                  <div className="text-[10px] text-slate-400 font-mono">manager / 123456</div>
                </div>
              </button>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5 text-right">
              <label className="block text-xs font-semibold text-slate-300">اسم المعرّف (Username / ID):</label>
              <div className="relative">
                <User className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="مثال: doctor أو manager"
                  className={`w-full pr-10 pl-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-purple-500 ${
                    theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5 text-right">
              <label className="block text-xs font-semibold text-slate-300">كلمة المرور / الرمز السري (PIN / Password):</label>
              <div className="relative">
                <KeyRound className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="أدخل كلمة المرور أو رمز PIN"
                  className={`w-full pr-10 pl-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-purple-500 font-mono ${
                    theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                  required
                />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>{success}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-purple-950/40 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>دخول بالصلاحية المحددة</span>
            </button>
          </form>

          {/* Permissions Matrix Explanation */}
          <div className="p-3.5 rounded-2xl bg-black/30 border border-white/5 space-y-2 text-[11px] text-slate-400 leading-relaxed">
            <div className="font-bold text-slate-300">مصفوفة الصلاحيات المعتمدة:</div>
            <ul className="space-y-1 list-disc list-inside">
              <li>
                <strong className="text-purple-400">الطبيب المعالج:</strong> السيطرة الكاملة على كافة جوانب الفحص، وتعديل التشخيص، ومسارات العلاج، وفك قفل بنك الذاكرة المشفر.
              </li>
              <li>
                <strong className="text-amber-400">مدير العيادة:</strong> الصلاحيات الإدارية والسجلات ومتابعة الزيارات، مع حظر كامل ومحكم لبنك الذاكرة السريرية.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
