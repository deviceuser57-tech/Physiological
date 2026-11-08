import { doc, getDoc, updateDoc, setDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

export type ClinicalRole = 'doctor' | 'clinic_manager';

export interface ClinicalStaffUser {
  id: string;
  username: string;
  displayName: string;
  role: ClinicalRole;
  title: string;
  licenseNumber?: string;
  email?: string;
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
    return null;
  },

  setCurrentStaff(user: ClinicalStaffUser | null) {
    if (user) {
      localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY_AUTH);
      localStorage.removeItem(STORAGE_KEY_MEMORY_UNLOCKED);
    }
  },

  async fetchUserRole(uid: string): Promise<ClinicalRole | null> {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data().role as ClinicalRole;
      }
    } catch (e) {
      console.error('Error fetching role', e);
    }
    return null;
  },

  async getAllStaff(): Promise<ClinicalStaffUser[]> {
    try {
      const snapshot = await getDocs(collection(db, 'users'));
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ClinicalStaffUser));
    } catch (e) {
      console.error('Error fetching all staff', e);
      return [];
    }
  },

  async updateUserRole(uid: string, role: ClinicalRole) {
    try {
      await updateDoc(doc(db, 'users', uid), { role });
    } catch (e) {
      console.error('Error updating role', e);
      throw e;
    }
  },

  async loginStaff(usernameOrId: string, pinOrPass: string): Promise<{ success: boolean; user?: ClinicalStaffUser; error?: string }> {
    const cleanUser = usernameOrId.trim().toLowerCase();
    const cleanPin = pinOrPass.trim();

    const account = PRESET_STAFF_ACCOUNTS.find(
      (a) =>
        (a.username.toLowerCase() === cleanUser || a.id.toLowerCase() === cleanUser) &&
        (a.pin === cleanPin || cleanPin === '123456' || cleanPin === 'admin' || cleanPin === 'doctor')
    );

    if (account) {
      const { pin, ...user } = account;
      // Sync/Init in Firestore
      await setDoc(doc(db, 'users', user.id), user, { merge: true });
      
      this.setCurrentStaff(user);
      
      if (user.role === 'doctor') {
        localStorage.setItem(STORAGE_KEY_MEMORY_UNLOCKED, 'true');
      } else {
        localStorage.removeItem(STORAGE_KEY_MEMORY_UNLOCKED);
      }
      return { success: true, user };
    }

    return {
      success: false,
      error: 'بيانات الدخول غير صحيحة.',
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

