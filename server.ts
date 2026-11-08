import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// AI Scale Recommendation API
app.post('/api/ai/recommend-scales', async (req, res) => {
  try {
    const { complaint, demographics } = req.body;
    if (!complaint || typeof complaint !== 'string' || !complaint.trim()) {
      return res.status(400).json({ error: 'Complaint text is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({ error: 'GEMINI_API_KEY not configured' });
    }

      const prompt = `
أنت مستشار نفسي وسريري خبير. استمعت إلى شكوى المريض التالية:
"${complaint}"

المعلومات الديموغرافية الأولية المسجلة (قد تكون ناقصة):
- الاسم: ${demographics?.name || 'غير محدد'}
- العمر: ${demographics?.age || 'غير محدد'}
- النشاط المهني: ${demographics?.job || 'غير محدد'}
- الحالة الاقتصادية: ${demographics?.economy || 'غير محدد'}
- الحالة الصحية: ${demographics?.health || 'غير محدد'}

المطلوب منك القيام بمهام الفرز التالية:
1. تحليل الشكوى السريرية واقتراح المقاييس الأنسب من القائمة أدناه مع التعليل.
2. استخراج أي بيانات ديموغرافية أو اجتماعية أو مهنية ذكرها المريض في نص الشكوى ولم تكن مسجلة بدقة في البيانات الأولية (مثل: الاسم، العمر، الحالة الاجتماعية، طبيعة العمل، الصدمات الحادة).
3. تقدير "نبرة الصوت" (Voice Tone) و"سرعة الكلام" (Speech Rate) المتوقعة بناءً على السياق اللغوي والمحتوى العاطفي للشكوى (مثلاً: نبرة حزينة، متهدجة، قلقة، أو سرعة كلام بطيئة تعبر عن خمول، أو سريعة تعبر عن توتر).

المقاييس السبعة المتاحة:
1. PHQ-9 (اكتئاب سريري)
2. BDI-II (اكتئاب معرفي)
3. DASS-21 (توتر وقلق)
4. GDS-15 (رضا عام)
5. GAD-7 (قلق عام)
6. ISI (أرق)
7. PSS-10 (إدراك الضغوط)

قم بإرجاع النتائج بتنسيق JSON دقيق.
`.trim();

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction:
          'أنت نظام ذكاء اصطناعي مساعد للطبيب النفسي لفرز الشكاوى السريرية واقتراح بطارية المقاييس واستخراج كافة البيانات الديموغرافية والاجتماعية والمهنية المذكورة في النص بدقة علمية، مع إعطاء "عنوان للحالة" (Case Title) يلخص جوهر الشكوى.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedScales: {
              type: Type.OBJECT,
              properties: {
                phq9: { type: Type.BOOLEAN },
                bdi2: { type: Type.BOOLEAN },
                dass21: { type: Type.BOOLEAN },
                gds15: { type: Type.BOOLEAN },
                gad7: { type: Type.BOOLEAN },
                isi: { type: Type.BOOLEAN },
                pss10: { type: Type.BOOLEAN },
              },
              required: ['phq9', 'bdi2', 'dass21', 'gds15', 'gad7', 'isi', 'pss10'],
            },
            rationale: { type: Type.STRING },
            primarySymptoms: { type: Type.ARRAY, items: { type: Type.STRING } },
            urgencyLevel: { type: Type.STRING, enum: ['low', 'moderate', 'high'] },
            environmentalObservations: { type: Type.STRING },
            voiceTone: { type: Type.STRING },
            speechRate: { type: Type.STRING },
            extractedData: {
              type: Type.OBJECT,
              properties: {
                caseTitle: { type: Type.STRING },
                name: { type: Type.STRING },
                age: { type: Type.NUMBER },
                gender: { type: Type.STRING, enum: ['male', 'female', 'unspecified'] },
                social: { type: Type.STRING, enum: ['single', 'married', 'separated', 'widowed'] },
                job: { type: Type.STRING, enum: ['employed', 'freelancer', 'unemployed', 'student', 'retired'] },
                economy: { type: Type.STRING, enum: ['good', 'average', 'stressful'] },
                health: { type: Type.STRING, enum: ['healthy', 'chronic', 'acute'] },
                acuteStressors: { type: Type.ARRAY, items: { type: Type.STRING } },
                voiceTone: { type: Type.STRING },
                speechRate: { type: Type.STRING },
              },
            },
          },
          required: [
            'recommendedScales',
            'rationale',
            'primarySymptoms',
            'urgencyLevel',
            'environmentalObservations',
            'voiceTone',
            'speechRate',
          ],
        },
      },
    });

    const jsonText = response.text;
    if (jsonText) {
      return res.json(JSON.parse(jsonText));
    }

    res.status(500).json({ error: 'Empty response from model' });
  } catch (error: any) {
    console.error('Error generating AI recommendation:', error);
    res.status(500).json({ error: error?.message || 'Internal server error' });
  }
});

// AI Treatment Pathway & Comparative Synthesis API
app.post('/api/ai/treatment-pathways', async (req, res) => {
  try {
    const { assessment, doctorOverride } = req.body;
    if (!assessment || !doctorOverride) {
      return res.status(400).json({ error: 'Assessment and doctorOverride are required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({ error: 'GEMINI_API_KEY not configured' });
    }

    const prompt = `
أنت مستشار استراتيجي في الطب النفسي والعلاج السلوكي المعرفي (CBT).
أمامك حالة سريرية خضعت لتقييم رقمي أولي وتم اعتماد تشخيصها النهائي من قِبل الطبيب المعالج:

بيانات المستفيد:
- الاسم: ${assessment.demographics?.name || 'مريض'} (${assessment.demographics?.age || 28} سنة)
- البيئة السكنية: ${assessment.demographics?.district || ''} - ${assessment.demographics?.city || ''}
- معامل الضغط البيئي المحسوب: ${assessment.environmentalModifier}%
- الدرجة الموزونة الأولية للذكاء: ${assessment.calibratedScore}% (${assessment.severityLabel})

التشخيص النهائي المعتمد من الطبيب المعالج:
- التشخيص: ${doctorOverride.primaryDiagnosis} (ICD: ${doctorOverride.icdCode || 'غير محدد'})
- درجة الشدة المعتمدة: ${doctorOverride.severity}
- منشأ الاعتلال: ${doctorOverride.clinicalEtiology} (تفاعلي بيئي / بيولوجي / مختلط / أزمة)
- صياغة وتعليل الطبيب: "${doctorOverride.clinicalNotes}"

المطلوب:
قم بتوليد مسارات العلاج الشاملة بدقة علمية وفق الأبعاد التالية:
1. cbtPlan: خطة العلاج السلوكي المعرفي (أبرز التشوهات المعرفية المستهدفة، تجارب سلوكية، واجب منزلي، عدد الجلسات التقديري).
2. pharmacotherapyAdvice: الإرشادات الدوائية الاسترشادية (هل هناك مؤشر دوائي؟ توجيه إكلينيكي للطبيب ومحاذير المراقبة).
3. environmentalSupportPlan: خطة الدعم البيئي وتعديل نمط المعيشة (تخفيف الاحتكاك مع محيطه ووصفة نمط الحياة).
4. comparativeSynthesis: تحليل المقارنة بين الفرز الأولي للذكاء وقرار الطبيب النهائي المعتمد، وتلخيص نقاط الاتفاق والتعديل الذي أجراه الطبيب.
`.trim();

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction:
          'أنت مستشار عيادي نفسي خبير يدمج العلاج السلوكي المعرفي مع الموازنة البيئية ويعلي من السيادة التشخيصية للطبيب المعالج.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            cbtPlan: {
              type: Type.OBJECT,
              properties: {
                targetDistortions: { type: Type.ARRAY, items: { type: Type.STRING } },
                suggestedBehavioralExperiments: { type: Type.ARRAY, items: { type: Type.STRING } },
                homeworkPrescription: { type: Type.STRING },
                estimatedSessionCount: { type: Type.STRING },
              },
              required: [
                'targetDistortions',
                'suggestedBehavioralExperiments',
                'homeworkPrescription',
                'estimatedSessionCount',
              ],
            },
            pharmacotherapyAdvice: {
              type: Type.OBJECT,
              properties: {
                indicated: { type: Type.BOOLEAN },
                clinicalGuidance: { type: Type.STRING },
                monitoringCautions: { type: Type.STRING },
              },
              required: ['indicated', 'clinicalGuidance', 'monitoringCautions'],
            },
            environmentalSupportPlan: {
              type: Type.OBJECT,
              properties: {
                stressorMitigation: { type: Type.ARRAY, items: { type: Type.STRING } },
                lifestylePrescription: { type: Type.STRING },
              },
              required: ['stressorMitigation', 'lifestylePrescription'],
            },
            comparativeSynthesis: {
              type: Type.OBJECT,
              properties: {
                aiPreliminaryAssessment: { type: Type.STRING },
                doctorFinalFormulation: { type: Type.STRING },
                concordanceSummary: { type: Type.STRING },
                clinicalConsensus: { type: Type.STRING },
              },
              required: [
                'aiPreliminaryAssessment',
                'doctorFinalFormulation',
                'concordanceSummary',
                'clinicalConsensus',
              ],
            },
          },
          required: [
            'cbtPlan',
            'pharmacotherapyAdvice',
            'environmentalSupportPlan',
            'comparativeSynthesis',
          ],
        },
      },
    });

    const jsonText = response.text;
    if (jsonText) {
      return res.json(JSON.parse(jsonText));
    }

    res.status(500).json({ error: 'Empty response from model' });
  } catch (error: any) {
    console.error('Error generating treatment pathways:', error);
    res.status(500).json({ error: error?.message || 'Internal server error' });
  }
});

// Vite Middleware for SPA development
const isProduction = process.env.NODE_ENV === 'production';
if (!isProduction) {
  const { createServer } = await import('vite');
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
