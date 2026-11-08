import React from 'react';
import { Users, Calendar } from 'lucide-react';

export const PatientsView: React.FC<{ theme: 'dark' | 'light' }> = ({ theme }) => (
  <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'} border`}>
    <div className="flex items-center gap-3 mb-6">
      <Users className="w-6 h-6 text-indigo-500" />
      <h2 className="text-xl font-black">حسابات المرضى</h2>
    </div>
    <p className="opacity-70">قائمة المرضى المسجلين ستظهر هنا.</p>
  </div>
);

export const AppointmentsView: React.FC<{ theme: 'dark' | 'light' }> = ({ theme }) => (
  <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'} border`}>
    <div className="flex items-center gap-3 mb-6">
      <Calendar className="w-6 h-6 text-indigo-500" />
      <h2 className="text-xl font-black">المواعيد والتنبيهات</h2>
    </div>
    <p className="opacity-70">جدول المواعيد والتنبيهات سيظهر هنا.</p>
  </div>
);
