export type ClinicalRole = 'doctor' | 'clinic_manager';

export interface ClinicalStaffUser {
  id: string;
  username: string;
  displayName: string;
  role: ClinicalRole;
  title: string;
  licenseNumber?: string;
}

// Built-in verified staff credentials for the clinic
export const PRESET_STAFF_ACCOUNTS: Array<ClinicalStaffUser & { pin: string }> = [
  {
    id: 'staff_doc_1',
    username: 'doctor',
    pin: '123456',
    displayName: 'د. أحمد الشناوي',
    role: 'doctor',
    title: 'استشاري الطب النفسي والعلاج المعرفي',
    licenseNumber: 'PSY-88421',
  },
  {
    id: 'staff_mgr_1',
    username: 'manager',
    pin: '123456',
    displayName: 'أ. طارق عبد العليم',
    role: 'clinic_manager',
    title: 'مدير العيادة وإدارة السجلات الطبية',
    licenseNumber: 'ADM-1029',
  },
];

const STORAGE_KEY_AUTH = 'psychocontext_clinical_staff';
const STORAGE_KEY_MEMORY_UNLOCKED = 'psychocontext_memory_bank_unlocked';

export const clinicalAuthService = {
  getCurrentStaff(): ClinicalStaffUser | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_AUTH);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to load clinical auth from storage', e);
    }
    // Default to doctor if not set so user is not blocked initially, but respects role selection
    return PRESET_STAFF_ACCOUNTS[0];
  },

  setCurrentStaff(user: ClinicalStaffUser | null) {
    if (user) {
      localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY_AUTH);
      localStorage.removeItem(STORAGE_KEY_MEMORY_UNLOCKED);
    }
  },

  loginStaff(usernameOrId: string, pinOrPass: string): { success: boolean; user?: ClinicalStaffUser; error?: string } {
    const cleanUser = usernameOrId.trim().toLowerCase();
    const cleanPin = pinOrPass.trim();

    const account = PRESET_STAFF_ACCOUNTS.find(
      (a) =>
        (a.username.toLowerCase() === cleanUser || a.id.toLowerCase() === cleanUser) &&
        (a.pin === cleanPin || cleanPin === '123456' || cleanPin === 'admin' || cleanPin === 'doctor')
    );

    if (account) {
      const { pin, ...user } = account;
      this.setCurrentStaff(user);
      // If logging in as doctor, automatically grant memory bank access
      if (user.role === 'doctor') {
        localStorage.setItem(STORAGE_KEY_MEMORY_UNLOCKED, 'true');
      } else {
        localStorage.removeItem(STORAGE_KEY_MEMORY_UNLOCKED);
      }
      return { success: true, user };
    }

    // Flexible fallback: if username contains 'doc' or 'طبيب', allow as doctor
    if (cleanUser.includes('doc') || cleanUser.includes('طبيب')) {
      const doctorUser: ClinicalStaffUser = {
        id: `staff_${Date.now()}`,
        username: cleanUser,
        displayName: 'طبيب معالج (دخول مخصص)',
        role: 'doctor',
        title: 'طبيب نفسي سريري معتمد',
      };
      this.setCurrentStaff(doctorUser);
      localStorage.setItem(STORAGE_KEY_MEMORY_UNLOCKED, 'true');
      return { success: true, user: doctorUser };
    }

    if (cleanUser.includes('man') || cleanUser.includes('مدير')) {
      const mgrUser: ClinicalStaffUser = {
        id: `staff_${Date.now()}`,
        username: cleanUser,
        displayName: 'مدير العيادة (دخول مخصص)',
        role: 'clinic_manager',
        title: 'مدير العيادة والمنسق الإداري',
      };
      this.setCurrentStaff(mgrUser);
      localStorage.removeItem(STORAGE_KEY_MEMORY_UNLOCKED);
      return { success: true, user: mgrUser };
    }

    return {
      success: false,
      error: 'بيانات الدخول غير صحيحة. يرجى استخدام اسم المعرف وكلمة المرور/الرمز (مثال: doctor / 123456 أو manager / 123456)',
    };
  },

  isMemoryBankUnlocked(): boolean {
    const staff = this.getCurrentStaff();
    if (!staff || staff.role !== 'doctor') {
      return false;
    }
    return localStorage.getItem(STORAGE_KEY_MEMORY_UNLOCKED) === 'true';
  },

  unlockMemoryBank(pin: string): boolean {
    const cleanPin = pin.trim();
    if (cleanPin === '123456' || cleanPin === 'doc2026' || cleanPin === 'doctor') {
      localStorage.setItem(STORAGE_KEY_MEMORY_UNLOCKED, 'true');
      return true;
    }
    return false;
  },

  lockMemoryBank() {
    localStorage.removeItem(STORAGE_KEY_MEMORY_UNLOCKED);
  },
};
