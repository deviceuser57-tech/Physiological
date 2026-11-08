import React, { useState, useEffect } from 'react';
import { clinicalDatabase } from '../services/clinicalDatabase';
import { Settings, Save, Sparkles, Phone, Mail, MapPin } from 'lucide-react';

interface SettingsViewProps {
  theme: 'dark' | 'light';
}

export const SettingsView: React.FC<SettingsViewProps> = ({ theme }) => {
  const [settings, setSettings] = useState({
    clinicName: '',
    phone: '',
    email: '',
    address: ''
  });

  useEffect(() => {
    clinicalDatabase.getClinicSettings().then(s => {
      if (s) setSettings({
        clinicName: s.clinicName || '',
        phone: s.phone || '',
        email: s.email || '',
        address: s.address || ''
      });
    });
  }, []);

  const handleSave = async () => {
    await clinicalDatabase.updateClinicSettings(settings);
    alert('تم حفظ الإعدادات');
  };

  return (
    <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'} border space-y-6`}>
      <div className="flex items-center gap-3">
        <Settings className="w-6 h-6 text-indigo-500" />
        <h2 className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>إعدادات العيادة</h2>
      </div>

      <div className="space-y-4">
        <input 
          type="text" 
          value={settings.clinicName} 
          onChange={e => setSettings({...settings, clinicName: e.target.value})} 
          placeholder="اسم العيادة"
          className={`w-full p-3 rounded-xl border ${theme === 'dark' ? 'bg-black/20' : 'bg-slate-50'}`}
        />
        <input type="text" value={settings.phone} onChange={e => setSettings({...settings, phone: e.target.value})} placeholder="رقم الهاتف" className={`w-full p-3 rounded-xl border ${theme === 'dark' ? 'bg-black/20' : 'bg-slate-50'}`}/>
        <input type="text" value={settings.email} onChange={e => setSettings({...settings, email: e.target.value})} placeholder="البريد الإلكتروني" className={`w-full p-3 rounded-xl border ${theme === 'dark' ? 'bg-black/20' : 'bg-slate-50'}`}/>
        <textarea value={settings.address} onChange={e => setSettings({...settings, address: e.target.value})} placeholder="العنوان" className={`w-full p-3 rounded-xl border ${theme === 'dark' ? 'bg-black/20' : 'bg-slate-50'}`}/>
        
        <button onClick={handleSave} className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold">
          <Save className="w-4 h-4" /> حفظ الإعدادات
        </button>
      </div>

      <div className="border-t pt-6">
        <h3 className="font-bold mb-4">توليد شعار العيادة عبر AI</h3>
        <button className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-bold">
          <Sparkles className="w-4 h-4" /> توليد شعار جديد
        </button>
      </div>
    </div>
  );
};
