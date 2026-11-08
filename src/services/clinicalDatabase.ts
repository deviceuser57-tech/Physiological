import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { DemographicContext, AssessmentResult } from '../types/clinical';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export interface PatientRecord extends DemographicContext {
  id: string;
  ownerId: string;
  createdAt: any;
  updatedAt: any;
}

export interface VisitRecord {
  id: string;
  patientId: string;
  timestamp: any;
  caseTitle?: string;
  voiceTone?: string;
  speechRate?: string;
  voiceComplaint?: string;
  summary: string;
  assessmentData: AssessmentResult;
  doctorNotes?: string;
  treatmentPlan?: any;
  ownerId: string;
}

const PATIENTS_PATH = 'patients';
const VISITS_PATH = 'visits';

export const clinicalDatabase = {
  // --- Patient Operations ---
  async upsertPatient(patientData: DemographicContext): Promise<string> {
    if (!auth.currentUser) throw new Error('Authentication required');
    const uid = auth.currentUser.uid;

    // Generate safe alphanumeric deterministic patient ID passing rules regex '^[a-zA-Z0-9_\\-]+$'
    let hash = 0;
    const cleanName = (patientData.name || 'patient').trim();
    for (let i = 0; i < cleanName.length; i++) {
      hash = ((hash << 5) - hash + cleanName.charCodeAt(i)) | 0;
    }
    const safeHash = Math.abs(hash).toString(36);
    const safeUid = uid.replace(/[^a-zA-Z0-9]/g, '').slice(0, 10);
    const patientId = `p_${safeUid}_${safeHash}`;

    try {
      const patientRef = doc(db, PATIENTS_PATH, patientId);

      // Strict adherence to Patient entity schema in firestore.rules
      const record: Record<string, any> = {
        id: patientId,
        name: (patientData.name || 'بدون اسم').slice(0, 150),
        age: Math.min(120, Math.max(0, Number(patientData.age) || 0)),
        gender: patientData.gender || 'unspecified',
        city: (patientData.city || '').slice(0, 100),
        district: (patientData.district || '').slice(0, 100),
        social: patientData.social || 'single',
        job: patientData.job || 'employed',
        economy: patientData.economy || 'average',
        health: patientData.health || 'healthy',
        ownerId: uid,
        updatedAt: serverTimestamp(),
        createdAt: serverTimestamp(), // safe with merge: true if already exists
      };

      await setDoc(patientRef, record, { merge: true });
      return patientId;
    } catch (error: any) {
      console.warn('Firestore offline fallback for patient upsert:', error?.message);
      return patientId; // Return patientId even if offline so local save succeeds
    }
  },

  async getPatients() {
    if (!auth.currentUser) return [];
    try {
      const q = query(
        collection(db, PATIENTS_PATH),
        where('ownerId', '==', auth.currentUser.uid),
        orderBy('name', 'asc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(d => d.data() as PatientRecord);
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, PATIENTS_PATH);
      return [];
    }
  },

  // --- Visit Operations ---

  async saveVisit(patientId: string, assessment: AssessmentResult, notes: string): Promise<string> {
    if (!auth.currentUser) throw new Error('Authentication required');
    const uid = auth.currentUser.uid;
    const safeUid = uid.replace(/[^a-zA-Z0-9]/g, '').slice(0, 6);
    const visitId = `v_${Date.now()}_${safeUid}`;

    try {
      const visitData: VisitRecord = {
        id: visitId,
        patientId,
        timestamp: serverTimestamp(),
        caseTitle: assessment.demographics.caseTitle || '',
        voiceTone: assessment.demographics.voiceTone || '',
        speechRate: assessment.demographics.speechRate || '',
        voiceComplaint: assessment.demographics.voiceComplaint || '',
        summary: assessment.recommendation || '',
        assessmentData: JSON.parse(JSON.stringify(assessment)),
        doctorNotes: notes || '',
        treatmentPlan: assessment.treatmentPlan ? JSON.parse(JSON.stringify(assessment.treatmentPlan)) : null,
        ownerId: uid,
      };

      await setDoc(doc(db, VISITS_PATH, visitId), visitData);
      return visitId;
    } catch (error: any) {
      console.warn('Firestore offline fallback for saveVisit:', error?.message);
      return visitId; // Return visitId so local history save succeeds
    }
  },

  async getVisitsByPatient(patientId: string) {
    if (!auth.currentUser) return [];
    try {
      const q = query(
        collection(db, VISITS_PATH),
        where('patientId', '==', patientId),
        where('ownerId', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(d => d.data() as VisitRecord);
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, VISITS_PATH);
      return [];
    }
  },

  async getAllRecentVisits(limitCount = 20) {
    if (!auth.currentUser) return [];
    try {
      const q = query(
        collection(db, VISITS_PATH),
        where('ownerId', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc'),
        limit(limitCount)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(d => d.data() as VisitRecord);
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, VISITS_PATH);
      return [];
    }
  },

  // --- Appointment Operations ---
  async getAppointments() {
    if (!auth.currentUser) return [];
    try {
      const q = query(collection(db, 'appointments'), orderBy('date', 'asc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, 'appointments');
      return [];
    }
  },

  // --- Clinic Settings Operations ---
  async getClinicSettings() {
    try {
      const docRef = doc(db, 'clinic_settings', 'main');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      }
      return { latestHybridScale: DEFAULT_HYBRID_SCALE };
    } catch (e) {
      console.warn('Firestore offline or unreachable, using local fallback settings.', e);
      return { latestHybridScale: DEFAULT_HYBRID_SCALE };
    }
  },

  async updateClinicSettings(settings: any) {
    try {
      await setDoc(doc(db, 'clinic_settings', 'main'), settings, { merge: true });
    } catch (e) {
      console.error('Error updating settings', e);
      throw e;
    }
  }
};

const DEFAULT_HYBRID_SCALE = {
  id: "mil_prep_v1",
  title: "التأهيل النفسي للكليات العسكرية",
  shortCode: "MIL-PREP",
  description: "تقييم الثبات الانفعالي، اتخاذ القرار تحت الضغط، والصلابة النفسية للطلبة المتقدمين",
  questions: [
    {
      id: "mil_1",
      text: "إلى أي مدى تتمتع بالقدرة على اتخاذ قرار حاسم وصحيح تحت ضغط الوقت المفاجئ؟",
      inherentWeight: 10,
      contextualImportance: 10,
      finalUnifiedWeight: 20,
      reference: "قاعدة المعرفة الافتراضية - التأهيل العسكري",
      isDuplicate: false,
      options: ["بدرجة منخفضة", "بدرجة متوسطة", "بدرجة عالية وثابتة"]
    },
    {
      id: "mil_2",
      text: "كيف تتعامل مع المواقف الاستفزازية أو الضغوط النفسية الشديدة أثناء الاختبارات؟",
      inherentWeight: 9,
      contextualImportance: 9,
      finalUnifiedWeight: 18,
      reference: "قاعدة المعرفة الافتراضية - التأهيل العسكري",
      isDuplicate: false,
      options: ["أفقد السيطرة أحياناً", "أحافظ على هدوئي وضبط انفعالاتي", "أبدي ثباتاً انفعالياً عالياً"]
    },
    {
      id: "mil_3",
      text: "هل تدرك طبيعة الحياة العسكرية القائمة على الانضباط الصارم والعمل الجماعي؟",
      inherentWeight: 10,
      contextualImportance: 9,
      finalUnifiedWeight: 19,
      reference: "قاعدة المعرفة الافتراضية - التأهيل العسكري",
      isDuplicate: false,
      options: ["لدي تردد", "أفهمها ومستعد للتكيف", "متحمس بالكامل ولدي صلابة عالية"]
    }
  ],
  branch: "military_rehab"
};

