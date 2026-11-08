import React, { useState, useEffect } from 'react';
import { ClinicalStaffUser, ClinicalRole, clinicalAuthService } from '../services/clinicalAuth';
import { ShieldCheck, UserCog, UserCheck, AlertCircle } from 'lucide-react';

interface ManagePermissionsViewProps {
  theme: 'dark' | 'light';
}

export const ManagePermissionsView: React.FC<ManagePermissionsViewProps> = ({ theme }) => {
  const [allStaff, setAllStaff] = useState<ClinicalStaffUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaff = async () => {
      const staff = await clinicalAuthService.getAllStaff();
      setAllStaff(staff);
      setLoading(false);
    };
    fetchStaff();
  }, []);

  const handleRoleChange = async (uid: string, newRole: ClinicalRole) => {
    try {
      await clinicalAuthService.updateUserRole(uid, newRole);
      setAllStaff(prev => prev.map(s => s.id === uid ? { ...s, role: newRole } : s));
    } catch (e) {
      alert('خطأ في تحديث الصلاحيات');
    }
  };

  if (loading) return <div>جاري التحميل...</div>;

  return (
    <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'} border space-y-6`}>
      <div className="flex items-center gap-3">
        <UserCog className="w-6 h-6 text-indigo-500" />
        <h2 className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>إدارة صلاحيات الكادر السريري</h2>
      </div>

      <div className="space-y-4">
        {allStaff.map(staff => (
          <div key={staff.id} className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-black/20 border-white/5' : 'bg-slate-50 border-slate-200'} flex items-center justify-between`}>
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg ${staff.role === 'doctor' ? 'bg-purple-500/10 text-purple-500' : 'bg-amber-500/10 text-amber-500'}`}>
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <div className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{staff.displayName}</div>
                <div className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{staff.email || staff.username}</div>
              </div>
            </div>

            <select
              value={staff.role}
              onChange={(e) => handleRoleChange(staff.id, e.target.value as ClinicalRole)}
              className={`px-3 py-2 rounded-lg border text-sm font-semibold cursor-pointer ${
                theme === 'dark' ? 'bg-black border-white/10 text-white' : 'bg-white border-slate-300'
              }`}
            >
              <option value="doctor">طبيب (صلاحية كاملة)</option>
              <option value="clinic_manager">مدير عيادة (تقارير وإحصائيات)</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};
