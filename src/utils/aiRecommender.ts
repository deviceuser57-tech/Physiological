import { AiScaleRecommendation, DemographicContext } from '../types/clinical';
import { normalizeArabic } from './speechMatcher';

/**
 * Fallback expert clinical rule-based NLP engine:
 * Evaluates Arabic clinical psychopathology clusters from patient's spoken words.
 */
export function analyzeComplaintLocally(
  complaint: string,
  demographics: DemographicContext
): AiScaleRecommendation {
  const norm = normalizeArabic(complaint);
  const identifiedSymptoms: string[] = [];

  // 1. Somatic & Core Neurovegetative signs -> PHQ-9
  const somaticKeywords = [
    { word: 'نوم', label: 'اضطراب النوم والأرق' },
    { word: 'ارق', label: 'صعوبة النوم والاستيقاظ' },
    { word: 'شهيه', label: 'تغير الشهية ونمط الغذاء' },
    { word: 'اكل', label: 'اضطراب الإقبال على الطعام' },
    { word: 'طاقه', label: 'استنزاف الطاقة البدنية' },
    { word: 'تعب', label: 'إرهاق وإنهاك سريع' },
    { word: 'خمول', label: 'خمول وضعف الهمة' },
    { word: 'تركيز', label: 'تشتت وضعف التركيز' },
    { word: 'شغف', label: 'فقدان المتعة والشغف المعتاد' },
    { word: 'اهتمام', label: 'تراجع الاهتمام بالأنشطة' },
  ];

  let phqScore = 0;
  somaticKeywords.forEach((k) => {
    if (norm.includes(k.word)) {
      phqScore += 2;
      if (!identifiedSymptoms.includes(k.label)) identifiedSymptoms.push(k.label);
    }
  });

  // 2. Cognitive Triad & Guilt & Self-blame -> BDI-II
  const cognitiveKeywords = [
    { word: 'فاشل', label: 'الشعور بالإخفاق والفشل الذاتي' },
    { word: 'فشل', label: 'اجترار إخفاقات الماضي' },
    { word: 'ذنب', label: 'مشاعر الذنب وتأنيب الضمير' },
    { word: 'ندم', label: 'الندم واللوم القاسي للذات' },
    { word: 'لوم', label: 'نقد الذات المتواصل' },
    { word: 'قيمه', label: 'نقص القيمة الذاتية والجدوى' },
    { word: 'ياس', label: 'اليأس وانعدام التفاؤل بالغد' },
    { word: 'تشاؤم', label: 'نظرة سوداوية تشاؤمية للمستقبل' },
    { word: 'حزين', label: 'حزن مقيم وعسر مزاج حاد' },
    { word: 'بكاء', label: 'نوبات بكاء متكررة' },
    { word: 'تردد', label: 'عجز وصعوبة حسم القرارات' },
  ];

  let bdiScore = 0;
  cognitiveKeywords.forEach((k) => {
    if (norm.includes(k.word)) {
      bdiScore += 2;
      if (!identifiedSymptoms.includes(k.label)) identifiedSymptoms.push(k.label);
    }
  });

  // 3. Autonomic Arousal, Panic & Stress -> DASS-21
  const anxietyKeywords = [
    { word: 'قلق', label: 'قلق وتوجس مستمر' },
    { word: 'هلع', label: 'نوبات ذعر أو هلع مفاجئة' },
    { word: 'خوف', label: 'مخاوف مبهمة ورعب داخلي' },
    { word: 'خفقان', label: 'تسارع ضربات القلب وخفقان' },
    { word: 'تنفس', label: 'ضيق وصعوبة في التنفس' },
    { word: 'رعشه', label: 'ارتجاف الأطراف واليدين' },
    { word: 'توتر', label: 'توتر عصبي واستثارة مستمرة' },
    { word: 'عصبي', label: 'سرعة الغضب والانفعال الحاد' },
    { word: 'صبر', label: 'نفاد الصبر والتململ الحركي' },
    { word: 'ضغط', label: 'إجهاد عصبي وشعور بالاحتراق' },
  ];

  let dassScore = 0;
  anxietyKeywords.forEach((k) => {
    if (norm.includes(k.word)) {
      dassScore += 2;
      if (!identifiedSymptoms.includes(k.label)) identifiedSymptoms.push(k.label);
    }
  });

  // 4. Life Dissatisfaction & Demoralization -> GDS-15
  const gdsKeywords = [
    { word: 'ملل', label: 'الملل والضجر المتكرر' },
    { word: 'فارغه', label: 'الشعور بفراغ الحياة وانعدام الهدف' },
    { word: 'عاله', label: 'الإحساس بالثقل والتبعية' },
    { word: 'ذاكره', label: 'ضعف الذاكرة الحياتية' },
    { word: 'وحده', label: 'الشعور بالانعزال والوحدة' },
    { word: 'متقاعد', label: 'تراجع النشاط بعد التقاعد' },
    { word: 'روتين', label: 'جمود الروتين وفقدان الحيوية' },
  ];

  let gdsScore = 0;
  gdsKeywords.forEach((k) => {
    if (norm.includes(k.word)) {
      gdsScore += 2;
      if (!identifiedSymptoms.includes(k.label)) identifiedSymptoms.push(k.label);
    }
  });

  // Check age or elderly factor for GDS-15
  if (demographics.age >= 60) {
    gdsScore += 3;
    identifiedSymptoms.push('معطى عمري متقدم يستدعي فحص الرضا العام');
  }

  // Suicidal or severe crisis check
  let urgencyLevel: 'low' | 'moderate' | 'high' = 'low';
  if (
    norm.includes('موت') ||
    norm.includes('انتحار') ||
    norm.includes('انهي حياتي') ||
    norm.includes('ايذاء') ||
    norm.includes('اتخلص من حياتي')
  ) {
    urgencyLevel = 'high';
    identifiedSymptoms.push('رصد إشارات خطر تستوجب التدخل العاجل');
  } else if (phqScore + bdiScore + dassScore >= 8) {
    urgencyLevel = 'moderate';
  }

  // Baseline selection recommendations
  // If the complaint is empty or generic, recommend standard diagnostic gold standard (PHQ-9 + BDI-II)
  const recommendPhq = phqScore > 0 || (bdiScore === 0 && dassScore === 0 && gdsScore === 0);
  const recommendBdi = bdiScore > 0 || (phqScore === 0 && dassScore === 0 && gdsScore === 0);
  const recommendDass = dassScore >= 2 || (phqScore > 0 && dassScore > 0);
  const recommendGds = gdsScore >= 2 || demographics.age >= 60;
  const recommendGad =
    norm.includes('قلق') ||
    norm.includes('خوف') ||
    norm.includes('رعب') ||
    norm.includes('توتر') ||
    dassScore >= 2;
  const recommendIsi =
    norm.includes('نوم') ||
    norm.includes('أرق') ||
    norm.includes('ارق') ||
    norm.includes('صحو') ||
    norm.includes('استيقظ');
  const recommendPss =
    norm.includes('ضغط') ||
    norm.includes('تراكم') ||
    norm.includes('عبء') ||
    norm.includes('سيطرة') ||
    demographics.economy === 'stressful';

  // Build Clinical Justification Rationale for the Doctor
  const rationales: string[] = [];

  if (recommendPhq) {
    rationales.push('مقياس PHQ-9 موصى به لرصد وتوثيق المعايير الجسدية (النوم، الطاقة، والشهية) وفق DSM-5');
  }
  if (recommendBdi) {
    rationales.push('مقياس بيك BDI-II المعرفي موصى به لتقييم الثالوث المعرفي ومشاعر لوم الذات والتشاؤم المستقبلي');
  }
  if (recommendDass) {
    rationales.push('مقياس DASS-21 موصى به لفصل درجات الاستثارة العصبية والقلق الفسيولوجي عن الاكتئاب الخالص');
  }
  if (recommendGds) {
    rationales.push('مقياس GDS-15 موصى به لقياس الرضا عن الحياة ونوعية المعيشة وتأثير التقدم بالعمر أو التقاعد');
  }
  if (recommendGad) {
    rationales.push('مقياس GAD-7 موصى به لفحص القلق المعمم وصعوبة التحكم في الأفكار المقلقة والتوتر العصبي');
  }
  if (recommendIsi) {
    rationales.push('مؤشر ISI موصى به لتقييم عمق الأرق السريري وصعوبات بداية النوم أو الاستيقاظ المتكرر');
  }
  if (recommendPss) {
    rationales.push('مقياس PSS-10 موصى به لقياس إدراك الضغوط الحياتية ومدى الشعور بعدم السيطرة على المتغيرات');
  }

  const rationale = rationales.length > 0
    ? rationales.join('، إضافة إلى ') + '.'
    : 'نوصي بالبدء بالمقاييس الأساسية (PHQ-9 و BDI-II) للحصول على تقييم سريري ومعرفي شامل.';

  // Environmental observations
  let environmentalObservations = 'سياق معيشي اعتيادي.';
  if (demographics.economy === 'stressful') {
    environmentalObservations = 'تم رصد ضغوط مالية ملحة قد تفسر جزءاً كبيراً من أعراض القلق واضطراب النوم.';
  } else if (demographics.job === 'unemployed') {
    environmentalObservations = 'البطالة الحالية تمثل عامل ضغط تكيفي يرفع من درجات نقد الذات واليأس.';
  } else if (demographics.health === 'chronic') {
    environmentalObservations = 'الاعتلال الجسدي المزمن يفسر جزءاً من تدني الطاقة البدنية وصعوبة النوم.';
  }

  // Extract demographic and clinical entities from text
  const extractedData = extractClinicalDemographicsFromText(complaint);

  // Estimate Voice Tone and Speech Rate based on keywords and extracted entities
  let estimatedVoiceTone = extractedData.voiceTone || 'اعتيادية ومستقرة';
  let estimatedSpeechRate = extractedData.speechRate || 'معتدلة';

  if (!extractedData.voiceTone) {
    if (phqScore + bdiScore > 6 || norm.includes('حزن') || norm.includes('صدمه') || norm.includes('خيانه')) {
      estimatedVoiceTone = 'متهدجة وخافتة (يوحي بالحزن والأسى)';
      estimatedSpeechRate = 'بطيئة ومثقلة (خمول حركي)';
    } else if (dassScore >= 4 || norm.includes('توتر') || norm.includes('قلق') || norm.includes('خفقان')) {
      estimatedVoiceTone = 'مشدودة ومتوترة (يوحي بالاستثارة والقلق)';
      estimatedSpeechRate = 'سريعة ومضطربة';
    }
  }

  return {
    recommendedScales: {
      phq9: recommendPhq,
      bdi2: recommendBdi,
      dass21: recommendDass,
      gds15: recommendGds,
      gad7: recommendGad,
      isi: recommendIsi,
      pss10: recommendPss,
    },
    rationale,
    primarySymptoms: identifiedSymptoms.length > 0 ? identifiedSymptoms : ['عسر مزاج عام وتعب'],
    urgencyLevel,
    environmentalObservations,
    voiceTone: estimatedVoiceTone,
    speechRate: estimatedSpeechRate,
    extractedData: {
      ...extractedData,
      voiceTone: estimatedVoiceTone,
      speechRate: estimatedSpeechRate,
    },
  };
}

/**
 * Intelligent Arabic Clinical Entity Extractor:
 * Parses unstructured Arabic complaint speech into structured demographics.
 */
export function extractClinicalDemographicsFromText(text: string): Partial<DemographicContext> {
  const norm = normalizeArabic(text);
  const result: Partial<DemographicContext> = {};

  // Standardize Arabic-Indic numerals (٠-٩) into standard numbers (0-9)
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  let standardizedText = text;
  arabicDigits.forEach((d, i) => {
    standardizedText = standardizedText.replaceAll(d, String(i));
  });

  // 1. Name extraction
  // Pattern matches: "ذكر اسمه حسام", "اسمه حسام", "اسمي حسام", "المريض حسام", "يدعى حسام"
  const namePatterns = [
    /(?:ذكر\s+)?(?:اسمه|إسمه|اسمي|إسمي|يدعي|يدعى|المدعو|المريض)\s+([^\s،,.]+)/i,
    /(?:المريضه|المريضة|اسمها|إسمها|تدعي|تدعى|المدعوه|المدعوة)\s+([^\s،,.]+)/i,
    /إسمه\s+([^\s،,.]+)/i,
    /اسمه\s+([^\s،,.]+)/i,
  ];

  for (const pat of namePatterns) {
    const m = standardizedText.match(pat);
    if (m && m[1]) {
      const extracted = m[1].replace(/[،,.:]/g, '').trim();
      const forbidden = ['غير', 'محدد', 'المريض', 'المريضة', 'سنة', 'سنه', 'عام', 'هو', 'هي', 'رجل', 'شاب'];
      if (extracted.length >= 2 && !forbidden.includes(extracted)) {
        result.name = extracted;
        break;
      }
    }
  }

  // 2. Age extraction
  // Pattern matches: "عمره 47 سنه", "عمرة 47 عام", "47 سنة", "عمري 35"
  const agePatterns = [
    /(?:عمره|عمرها|عمري|عمرة|السن|سن|العمر)\s*[:=]?\s*(\d{1,3})/i,
    /(\d{1,3})\s*(?:سنة|سنه|عام|عاما)/i,
    /(?:بالغ|بالغة)\s+من\s+العمر\s+(\d{1,3})/i,
  ];

  for (const pat of agePatterns) {
    const m = standardizedText.match(pat);
    if (m && m[1]) {
      const ageNum = parseInt(m[1], 10);
      if (ageNum >= 5 && ageNum <= 110) {
        result.age = ageNum;
        break;
      }
    }
  }

  // 3. Gender extraction
  if (norm.includes('ذكر') || norm.includes('رجل') || norm.includes('شاب') || norm.includes('اسمه') || norm.includes('زوجته')) {
    result.gender = 'male';
  } else if (norm.includes('انثي') || norm.includes('انثى') || norm.includes('سيده') || norm.includes('سيدة') || norm.includes('امراه') || norm.includes('امرأة') || norm.includes('فتاه') || norm.includes('فتاة') || norm.includes('اسمها') || norm.includes('زوجها')) {
    result.gender = 'female';
  }

  // 4. Marital Status
  if (norm.includes('انفصل') || norm.includes('انفصال') || norm.includes('مطلق') || norm.includes('مطلقه') || norm.includes('طلاق')) {
    result.social = 'separated';
  } else if (norm.includes('ارمل') || norm.includes('ارمله') || norm.includes('ارملة') || norm.includes('وفاه زوج') || norm.includes('وفاة زوج')) {
    result.social = 'widowed';
  } else if (norm.includes('متزوج') || norm.includes('متزوجه') || norm.includes('زواج')) {
    result.social = 'married';
  } else if (norm.includes('اعزب') || norm.includes('عزباء')) {
    result.social = 'single';
  }

  // 5. Employment / Job Status
  if (norm.includes('فقد وظيفته') || norm.includes('فقدان وظيفة') || norm.includes('فقدان وظيفه') || norm.includes('فصل من العمل') || norm.includes('عاطل') || norm.includes('بدون عمل') || norm.includes('خسارة وظيفته') || norm.includes('خساره وظيفته')) {
    result.job = 'unemployed';
  } else if (norm.includes('تقاعد') || norm.includes('متقاعد') || norm.includes('تقاعدي') || norm.includes('المعاش')) {
    result.job = 'retired';
  } else if (norm.includes('طالب') || norm.includes('طالبه') || norm.includes('جامعه') || norm.includes('دراسه')) {
    result.job = 'student';
  } else if (norm.includes('عمل حر') || norm.includes('فريلانسر') || norm.includes('نشاط حر') || norm.includes('اعمال حره')) {
    result.job = 'freelancer';
  } else if (norm.includes('موظف') || norm.includes('شركه') || norm.includes('يعمل')) {
    result.job = 'employed';
  }

  // 6. Economic status
  if (norm.includes('ضائقه') || norm.includes('ديون') || norm.includes('ازمه ماليه') || norm.includes('ازمة مالية') || norm.includes('فقر') || norm.includes('عاله') || norm.includes('عالة')) {
    result.economy = 'stressful';
  } else if (norm.includes('ميسور') || norm.includes('مرتاح ماديا') || norm.includes('دخل ممتاز')) {
    result.economy = 'good';
  }

  // 7. Acute Stressors (matches Demographics options)
  const acuteStressors: string[] = [];
  if (norm.includes('انفصل') || norm.includes('طلاق') || norm.includes('خيانه') || norm.includes('خيانة') || norm.includes('خلافات عائليه')) {
    acuteStressors.push('انفصال، طلاق أو خلافات عائلية حادة');
  }
  if (norm.includes('فقد وظيفته') || norm.includes('فقدان وظيفه') || norm.includes('فصل') || norm.includes('نزاع مهني')) {
    acuteStressors.push('فقدان وظيفة أو نزاع مهني ضاغط');
  }
  if (norm.includes('صدمه عصبيه') || norm.includes('صدمة عصبية') || norm.includes('صدمه') || norm.includes('عمليه جراحيه')) {
    acuteStressors.push('إجراء عملية جراحية أو أزمة صحية عائلية');
  }
  if (norm.includes('وفاه') || norm.includes('وفاة') || norm.includes('موت قريب') || norm.includes('فقدان شخص')) {
    acuteStressors.push('فقدان أو وفاة شخص قريب وعزيز');
  }
  if (norm.includes('ديون') || norm.includes('التزامات ماليه') || norm.includes('ضائقه ماليه')) {
    acuteStressors.push('تراكم ديون حادة أو التزامات مالية طارئة');
  }
  if (norm.includes('غربه') || norm.includes('سفر') || norm.includes('مكان سكن')) {
    acuteStressors.push('تغيير مكان السكن أو الغربة والابتعاد عن الأهل');
  }
  if (acuteStressors.length > 0) {
    result.acuteStressors = acuteStressors;
  }

  // 8. Meaningful Clinical Case Title
  const patientDisplayName = result.name || (result.gender === 'female' ? 'مريضة' : 'مريض');
  const patientAgeSuffix = result.age ? ` (${result.age} سنة)` : '';

  const triggersList: string[] = [];
  if (norm.includes('خيانه') || norm.includes('خيانة')) triggersList.push('صدمة خيانة زوجية');
  if (norm.includes('انفصل') || norm.includes('طلاق')) triggersList.push('انفصال');
  if (norm.includes('فقد وظيفته') || norm.includes('فقدان وظيفه')) triggersList.push('فقدان وظيفة');
  if (norm.includes('تقاعد') || norm.includes('تقاعدي')) triggersList.push('فترة تقاعد');
  if (norm.includes('صدمه عصبيه') || norm.includes('صدمة عصبية')) triggersList.push('صدمة عصبية حادة');
  if (norm.includes('ملل') || norm.includes('فارغه')) triggersList.push('فراغ وفقدان الهدف');

  const triggersStr = triggersList.length > 0
    ? triggersList.slice(0, 3).join(' و')
    : 'أزمة تكيف وضغوط حياتية حادة';

  result.caseTitle = `حالة اضطراب تكيف وعسر مزاج تفاعلي إثر ${triggersStr} - ${patientDisplayName}${patientAgeSuffix}`;

  // 9. Voice tone & speech rate indicators
  if (norm.includes('صدمه') || norm.includes('خيانه') || norm.includes('حزن') || norm.includes('عاله') || norm.includes('بكاء')) {
    result.voiceTone = 'متهدجة وخافتة (تعبر عن الصدمة وعسر المزاج)';
  }
  if (norm.includes('ملل') || norm.includes('ضجر') || norm.includes('فارغه') || norm.includes('تقاعد') || norm.includes('خمول')) {
    result.speechRate = 'بطيئة ومثقلة (تعبر عن الخمول وفقدان الشغف)';
  }

  return result;
}

/**
 * Primary AI Analysis Function:
 * Queries server endpoint if available, otherwise runs robust local clinical reasoning.
 * Ensures extractedData is ALWAYS provided and returned.
 */
export async function analyzePatientComplaint(
  complaint: string,
  demographics: DemographicContext
): Promise<AiScaleRecommendation> {
  const localAnalysis = analyzeComplaintLocally(complaint || '', demographics);

  // If complaint is very short, return local immediately
  if (!complaint || complaint.trim().length < 5) {
    return localAnalysis;
  }

  try {
    const res = await fetch('/api/ai/recommend-scales', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ complaint, demographics }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.recommendedScales) {
        // Merge with local extractedData so nothing is lost if model omitted a field
        return {
          ...data,
          extractedData: {
            ...localAnalysis.extractedData,
            ...(data.extractedData || {}),
          },
        } as AiScaleRecommendation;
      }
    }
  } catch (err) {
    console.info('Server AI endpoint unavailable, using clinical engine fallback', err);
  }

  // Graceful fallback to expert clinical analyzer with guaranteed extracted data
  return localAnalysis;
}
