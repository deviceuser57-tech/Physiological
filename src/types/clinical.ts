export interface ScaleReference {
  code: string;
  arabicName: string;
  englishName: string;
  authorsYear: string;
  citation: string;
  scoringRange: string;
  cutOffs: string;
  clinicalDomain: string;
  standardNormsArabic: string;
}

export interface CognitiveDistortion {
  id: string;
  arabicName: string;
  englishName: string;
  definition: string;
  examplePatientStatement: string;
  reframingStrategy: string;
}

export interface ThoughtRecordEntry {
  id: string;
  date: string;
  situation: string;
  automaticThought: string;
  distortionId: string;
  emotion: string;
  emotionIntensityBefore: number; // 0-100%
  evidenceFor: string;
  evidenceAgainst: string;
  alternativeThought: string;
  emotionIntensityAfter: number; // 0-100%
}

export interface BehavioralActivityEntry {
  id: string;
  day: string;
  timeSlot: string;
  activityName: string;
  category: 'pleasure' | 'mastery' | 'routine' | 'social';
  masteryScore: number; // 0-10
  pleasureScore: number; // 0-10
  completed: boolean;
  notes?: string;
}

export interface DoctorDiagnosisOverride {
  primaryDiagnosis: string;
  icdCode?: string;
  severity: 'normal' | 'mild' | 'moderate' | 'severe' | 'severe_with_psychotic' | 'inconclusive';
  clinicalEtiology: 'reactive_environmental' | 'endogenous_biological' | 'mixed' | 'situational_crisis';
  clinicalNotes: string;
  treatmentGoals: string[];
  isLocked: boolean;
  signedAt: string;
  doctorName?: string;
}

export interface TreatmentPathwayPlan {
  cbtPlan: {
    targetDistortions: string[];
    suggestedBehavioralExperiments: string[];
    homeworkPrescription: string;
    estimatedSessionCount: string;
  };
  pharmacotherapyAdvice: {
    indicated: boolean;
    clinicalGuidance: string;
    monitoringCautions: string;
  };
  environmentalSupportPlan: {
    stressorMitigation: string[];
    lifestylePrescription: string;
  };
  comparativeSynthesis: {
    aiPreliminaryAssessment: string;
    doctorFinalFormulation: string;
    concordanceSummary: string;
    clinicalConsensus: string;
  };
}

export interface ClinicalMemoryCase {
  id: string;
  timestamp: string;
  patientAlias: string;
  age: number;
  gender: string;
  district: string;
  complaintSummary: string;
  aiSuggestedScales: string[];
  aiInitialSeverity: string;
  psychometricScoresSummary: string;
  doctorFinalDiagnosis: string;
  doctorSeverity: string;
  doctorClinicalEtiology: string;
  doctorNotes: string;
  concordanceStatus: 'متطابق بالكامل' | 'تعديل جزئي' | 'تباين وتشخيص بديل';
  learnedInsight: string;
}

export interface AiScaleRecommendation {
  recommendedScales: {
    phq9: boolean;
    bdi2: boolean;
    dass21: boolean;
    gds15: boolean;
    gad7: boolean;
    isi: boolean;
    pss10: boolean;
  };
  rationale: string;
  primarySymptoms: string[];
  urgencyLevel: 'low' | 'moderate' | 'high';
  environmentalObservations: string;
  voiceTone?: string;
  speechRate?: string;
  extractedData?: Partial<DemographicContext>;
}

export interface DemographicContext {
  caseTitle?: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'unspecified';
  social: 'single' | 'married' | 'separated' | 'widowed';
  city: string;
  district: string;
  living: 'alone' | 'family' | 'roommates';
  job: 'employed' | 'freelancer' | 'unemployed' | 'student' | 'retired';
  economy: 'good' | 'average' | 'stressful';
  health: 'healthy' | 'chronic' | 'acute';
  acuteStressors: string[];
  usePhq9: boolean;
  useBdi2: boolean;
  useDass: boolean;
  useGds: boolean;
  useGad7: boolean;
  useIsi: boolean;
  usePss10: boolean;
  voiceComplaint?: string;
  voiceTone?: string;
  speechRate?: string;
  aiRecommendation?: AiScaleRecommendation;
  doctorOverride?: DoctorDiagnosisOverride;
  autoFilledFields?: string[];
}

export interface QuestionChoice {
  text: string;
  points: number;
}

export interface Question {
  id: string;
  text: string;
  choices: string[] | QuestionChoice[];
  reverse?: boolean;
  subscale?: 'depression' | 'anxiety' | 'stress' | 'somatic' | 'cognitive' | 'affective' | 'sleep' | 'perceived_stress';
}

export interface ScaleDefinition {
  type: 'demographics' | 'phq9' | 'bdi2' | 'dass21' | 'gds15' | 'gad7' | 'isi' | 'pss10' | 'dashboard' | 'cbt' | 'memory';
  title: string;
  shortCode: string;
  description: string;
  maxScore: number;
  questions: Question[];
}

export interface AssessmentResult {
  id: string;
  timestamp: string;
  demographics: DemographicContext;
  responses: Record<string, number>;
  scores: {
    phq9?: { raw: number; max: number; percentage: number; severity: string };
    bdi2?: { raw: number; max: number; percentage: number; severity: string };
    dass21?: {
      raw: number;
      max: number;
      percentage: number;
      depression: number;
      anxiety: number;
      stress: number;
      severity: string;
    };
    gds15?: { raw: number; max: number; percentage: number; severity: string };
    gad7?: { raw: number; max: number; percentage: number; severity: string };
    isi?: { raw: number; max: number; percentage: number; severity: string };
    pss10?: { raw: number; max: number; percentage: number; severity: string };
  };
  environmentalModifier: number;
  environmentalFactors: { label: string; impact: number; reason: string }[];
  rawCombinedScore: number;
  calibratedScore: number;
  severityLabel: string;
  severityColor: string;
  recommendation: string;
  narrativeText: string;
  domains: {
    affective: number;
    cognitive: number;
    somatic: number;
    anxiety: number;
    environmental: number;
  };
  hasSuicidalRisk: boolean;
  suicidalRiskItems: { scale: string; itemText: string; responseText: string; points: number }[];
  doctorOverride?: DoctorDiagnosisOverride;
  treatmentPlan?: TreatmentPathwayPlan;
}

// ==========================================
// OFFICIAL PSYCHOMETRIC SCALE REFERENCES
// ==========================================
export const OFFICIAL_SCALE_REFERENCES: ScaleReference[] = [
  {
    code: 'PHQ-9',
    arabicName: 'استبيان صحة المريض للاكتئاب',
    englishName: 'Patient Health Questionnaire-9',
    authorsYear: 'Kroenke, Spitzer, & Williams (2001)',
    citation: 'Kroenke K, Spitzer RL, Williams JB. The PHQ-9: validity of a brief depression severity measure. J Gen Intern Med. 2001;16(9):606-613.',
    scoringRange: '0 - 27 نقطة (9 بنود، كل بند من 0 إلى 3)',
    cutOffs: '0-4: سوي / غياب الأعراض، 5-9: خفيف، 10-14: متوسط، 15-19: متوسط الشدة إلى حاد، 20-27: شديد وحاد.',
    clinicalDomain: 'تقييم معايير الاكتئاب الجسيم وفق الدليل التشخيصي والإحصائي الخامس DSM-5 مع رصد الأعراض العضوية والانتحار.',
    standardNormsArabic: 'تم التحقق من صدقه وثباته في البيئة العربية عبر دراسات متعددة (Al-Hadi et al. 2017، معاملي ألفا كرونباخ 0.88).',
  },
  {
    code: 'BDI-II',
    arabicName: 'مقياس بيك الثاني للاكتئاب (النسخة الأصلية غير المختزلة)',
    englishName: 'Beck Depression Inventory-II',
    authorsYear: 'Beck, Steer, & Brown (1996)',
    citation: 'Beck AT, Steer RA, Brown GK. Manual for the Beck Depression Inventory-II. San Antonio, TX: Psychological Corporation; 1996.',
    scoringRange: '0 - 63 نقطة (21 بنداً، كل بند 4 عبارات سريرية متدرجة من 0 إلى 3)',
    cutOffs: '0-13: ضمن الحدود السوية، 14-19: اكتئاب خفيف، 20-28: اكتئاب متوسط، 29-63: اكتئاب حاد وشديد.',
    clinicalDomain: 'المعيار الذهبي لتقييم الثالوث المعرفي (النظرة السلبية للذات، العالم، والمستقبل)، ولوم الذات، ونقص القيمة.',
    standardNormsArabic: 'تقنين غريب عبد الفتاح (2000)، ومعامل ثبات يتجاوز 0.91 في العينات السريرية وغير السريرية العربية.',
  },
  {
    code: 'DASS-21',
    arabicName: 'مقياس الاكتئاب والقلق والتوتر الثلاثي',
    englishName: 'Depression Anxiety Stress Scales-21',
    authorsYear: 'Lovibond & Lovibond (1995)',
    citation: 'Lovibond SH, Lovibond PF. Manual for the Depression Anxiety Stress Scales. Sydney: Psychology Foundation of Australia; 1995.',
    scoringRange: '0 - 63 نقطة مقسمة بالتساوي على 3 أبعاد (كل بعد 7 بنود من 0 إلى 3)',
    cutOffs: 'الاكتئاب (سوي 0-4، خفيف 5-6، متوسط 7-10، شديد 11+) | القلق (سوي 0-3، خفيف 4-5، متوسط 6-7، شديد 8+) | التوتر (سوي 0-7، خفيف 8-9، متوسط 10-12، شديد 13+).',
    clinicalDomain: 'التمييز بين عوارض القلق الفسيولوجي واستثارة الجهاز العصبي اللاإرادي، والتوتر النفسي والحركي، وعسر المزاج.',
    standardNormsArabic: 'التقنين العربي المعتمد (Taouk et al. 2001؛ موسى والشريفين 2013) مع ثبات يتراوح بين 0.89 و0.93.',
  },
  {
    code: 'GDS-15',
    arabicName: 'مقياس الرضا العام والشيخوخة المصغر',
    englishName: 'Geriatric Depression Scale - Short Form',
    authorsYear: 'Yesavage et al. (1982-1983) & Sheikh & Yesavage (1986)',
    citation: 'Sheikh JI, Yesavage JA. Geriatric Depression Scale (GDS): recent evidence and development of a shorter version. Clin Gerontol. 1986;5:165-173.',
    scoringRange: '0 - 15 نقطة (15 بنداً ثنائي الإجابة نعم/لا مع 5 بنود بتصحيح معكوس)',
    cutOffs: '0-4: طبيعي وسوي، 5-8: اكتئاب خفيف / انخفاض الرضا، 9-11: اكتئاب معتدل، 12-15: اكتئاب حاد.',
    clinicalDomain: 'قياس الرضا عن الحياة، الضجر والملل، والشعور بالفراغ والعبء، مع استبعاد الأعراض الجسدية المربكة لكبار السن.',
    standardNormsArabic: 'التقنين العربي للمركز القومي للبحوث (عمار 2008، معامل ثبات 0.84، حساسية 92%).',
  },
  {
    code: 'GAD-7',
    arabicName: 'مقياس اضطراب القلق العام',
    englishName: 'Generalized Anxiety Disorder 7-item Scale',
    authorsYear: 'Spitzer, Kroenke, Williams, & Löwe (2006)',
    citation: 'Spitzer RL, Kroenke K, Williams JB, Löwe B. A brief measure for assessing generalized anxiety disorder: the GAD-7. Arch Intern Med. 2006;166(10):1092-1097.',
    scoringRange: '0 - 21 نقطة (7 بنود، كل بند من 0 إلى 3 نقاط)',
    cutOffs: '0-4: قلق طبيعي طفيف، 5-9: قلق خفيف، 10-14: قلق متوسط، 15-21: قلق شديد يستوجب تدخلاً سريرياً.',
    clinicalDomain: 'فحص وتشخيص القلق المزمن، صعوبة السيطرة على الأفكار المقلقة، التوتر العضلي، وتوقع الكوارث.',
    standardNormsArabic: 'المعايرة العربية المعتمدة (AlHadi et al. 2017)؛ معامل ألفا كرونباخ 0.89 وحساسية 89% ونوعية 82%.',
  },
  {
    code: 'ISI',
    arabicName: 'مؤشر شدة الأرق واضطراب النوم',
    englishName: 'Insomnia Severity Index',
    authorsYear: 'Bastien, Vallières, & Morin (2001)',
    citation: 'Bastien CH, Vallières A, Morin CM. Validation of the Insomnia Severity Index as an outcome measure for insomnia research. Sleep Med. 2001;2(4):297-307.',
    scoringRange: '0 - 28 نقطة (7 بنود، كل بند من 0 إلى 4 نقاط)',
    cutOffs: '0-7: لا يوجد أرق ذو دلالة سريرية، 8-14: أرق تحت العتبة السريرية، 15-21: أرق سريري متوسط الشدة، 22-28: أرق سريري شديد.',
    clinicalDomain: 'تقييم صعوبات بداية النوم واستمراره، الاستيقاظ المبكر، الرضا عن النوم، وتأثير الأرق على الأداء اليومي.',
    standardNormsArabic: 'النسخة العربية المقننة (Suleiman et al. 2012) بمعامل ثبات 0.83 وارتباط عالي مع مقاييس جودة النوم.',
  },
  {
    code: 'PSS-10',
    arabicName: 'مقياس إدراك الضغوط الحياتية',
    englishName: 'Perceived Stress Scale-10',
    authorsYear: 'Cohen, Kamarck, & Mermelstein (1983)',
    citation: 'Cohen S, Kamarck T, Mermelstein R. A global measure of perceived stress. J Health Soc Behav. 1983;24(4):385-396.',
    scoringRange: '0 - 40 نقطة (10 بنود، من 0 إلى 4، مع عكس تصحيح البنود 4، 5، 7، 8)',
    cutOffs: '0-13: ضغوط منخفضة وقدرة تكيفية عالية، 14-26: ضغوط معتدلة، 27-40: ضغوط مرتفعة وشديدة مستنزفة.',
    clinicalDomain: 'قياس الدرجة التي يرى بها الفرد مواقف حياته على أنها لا يمكن التنبؤ بها، لا يمكن السيطرة عليها، ومثقلة بالصعاب.',
    standardNormsArabic: 'التقنين العربي المعتمد (Chaaya et al. 2010؛ البهاص 2018) بمعامل ثبات 0.85.',
  },
];

// ==========================================
// 8 CORE COGNITIVE DISTORTIONS (BECK / CBT)
// ==========================================
export const COGNITIVE_DISTORTIONS: CognitiveDistortion[] = [
  {
    id: 'all_or_nothing',
    arabicName: 'التفكير الحدي (أبيض أو أسود)',
    englishName: 'All-or-Nothing / Dichotomous Thinking',
    definition: 'النظر إلى الأمور في فئتين مطلقتين؛ إما نجاح باهر أو فشل ذريع، دون رؤية التدرجات الرمادية.',
    examplePatientStatement: '"إذا لم أحقق الهدف بنسبة 100% فإن كل جهدي ذهب هباءً وأنا فاشل تماماً."',
    reframingStrategy: 'البحث عن التدرجات والبدائل؛ قياس النجاح على متصل (Continum) من 0% إلى 100% بدلاً من الثنائية.',
  },
  {
    id: 'catastrophizing',
    arabicName: 'التضخيم والكارثية',
    englishName: 'Catastrophizing / Magnification',
    definition: 'المبالغة في تقدير احتمالية حدوث أسوأ سيناريو ممكن وتوقع عواقب كارثية لا يمكن تحملها.',
    examplePatientStatement: '"لو لم أنجز هذه المعاملة غداً فستتدمر حياتي المهنية ولن أستطيع العيش."',
    reframingStrategy: 'حساب الاحتمالية الواقعية وسؤال النفس: ما هو السيناريو الأكثر ترجيحاً؟ وكيف يمكنني التكيف لو وقع؟',
  },
  {
    id: 'overgeneralization',
    arabicName: 'التعميم المفرط',
    englishName: 'Overgeneralization',
    definition: 'استخلاص قاعدة عامة وسلبية مطلقة وشاملة استناداً إلى حادثة واحدة أو إخفاق منفرد.',
    examplePatientStatement: '"لقد أخطأت في المقابلة، أنا دائماً أخفق في كل شيء ولن أنجح أبداً."',
    reframingStrategy: 'حظر كلمات التعميم الحتمية (دائماً، أبداً، كل شيء، مستحيل) واستبدالها بحقائق محددة عن الموقف الحالي.',
  },
  {
    id: 'mental_filter',
    arabicName: 'المرشح الذهني الانتقائي',
    englishName: 'Mental Filter',
    definition: 'التركيز الحصري على التفاصيل السلبية وتضخيمها مع حجب وإغفال كل الجوانب الإيجابية المحققة.',
    examplePatientStatement: '"حصلت على 9 تقييمات ممتازة وملاحظة نقدية واحدة، إذاً أدائي كان سيئاً للغاية."',
    reframingStrategy: 'توسيع عدسة الانتباه وإجراء جرد شامل ومتوازن لجميع الأدلة المؤيدة والإيجابية.',
  },
  {
    id: 'mind_reading',
    arabicName: 'قراءة الأفكار والافتراض السلبي',
    englishName: 'Mind Reading / Jumping to Conclusions',
    definition: 'الافتراض الجازم بأن الآخرين يفكرون بسلبية تجاهك أو يحتقرونك دون امتلاك أي دليل موضوعي.',
    examplePatientStatement: '"لم يبتسم لي زميلي في الصباح، هو بالتأكيد يكرهني ويدبر ضدي."',
    reframingStrategy: 'التفريق بين الفرضية والواقعة؛ طلب دليل حسي وسؤال النفس عن تفسيرات بديلة لسلوك الآخر.',
  },
  {
    id: 'emotional_reasoning',
    arabicName: 'الاستدلال الانفعالي',
    englishName: 'Emotional Reasoning',
    definition: 'اتخاذ المشاعر والانفعالات السلبية كدليل قاطع على حقيقة الواقع الخارجي.',
    examplePatientStatement: '"أشعر بالخوف والعجز، إذاً أنا في خطر حقيقي وعاجز فعلاً."',
    reframingStrategy: 'تذكير النفس بأن "المشاعر ليست حقائق"، فالشعور بالذنب لا يعني أنك مذنب والشعور بالخوف لا يعني وجود خطر.',
  },
  {
    id: 'should_statements',
    arabicName: 'عبارات الإلزام الحتمية (يجب وينبغي)',
    englishName: 'Should / Must Statements',
    definition: 'توجيه مطالب وأوامر صارمة وغير مرنة تجاه الذات أو الآخرين، وتوليد مشاعر الإحباط والذنب عند عدم تحققها.',
    examplePatientStatement: '"يجب ألا أشعر بأي ضعف إطلاقاً، وينبغي أن أتحمل كل هذه الأعباء دون شكوى."',
    reframingStrategy: 'استبدال "يجب" بعبارات الرغبة والتفضيل الواقعي المرن: "أفضل أن أنجز ذلك، ولكن إن لم أتمكن فهذا طبيعي ومفهوم".',
  },
  {
    id: 'personalization',
    arabicName: 'الشخصنة ولوم الذات المفرط',
    englishName: 'Personalization',
    definition: 'تحميل الذات مسؤولية كاملة عن أحداث سلبية تقع خارج نطاق سيطرة الفرد المباشرة.',
    examplePatientStatement: '"حزن صديقي أو تعثر العمل هو بسببي وبسبب تقصيري المباشر."',
    reframingStrategy: 'مخطط الدائرة الكعكية (Pie Chart): توزيع المسؤولية بنسب مئوية على جميع العوامل المحيطة والظروف البيئية.',
  },
];

// ==========================================
// 1. PHQ-9 FULL STANDARD CRITERIA (9 Items)
// ==========================================
export const PHQ9_QUESTIONS: Question[] = [
  { id: 'phq_1', text: 'قلة الاهتمام أو المتعة في القيام بالأشياء المعتادة (فقدان الشغف والابتهاج).', choices: ['أبداً', 'لعدة أيام', 'أكثر من نصف الأيام', 'تقريباً كل يوم'], subscale: 'affective' },
  { id: 'phq_2', text: 'الشعور بالحزن أو الاكتئاب أو اليأس أو المزاج المنخفض الكئيب.', choices: ['أبداً', 'لعدة أيام', 'أكثر من نصف الأيام', 'تقريباً كل يوم'], subscale: 'affective' },
  { id: 'phq_3', text: 'صعوبة في الخلود إلى النوم، أو الاستيقاظ المتكرر، أو النوم المفرط الطويل.', choices: ['أبداً', 'لعدة أيام', 'أكثر من نصف الأيام', 'تقريباً كل يوم'], subscale: 'somatic' },
  { id: 'phq_4', text: 'الشعور بالتعب والإنهاك السريع، أو قلة طاقة الجسم العامة والهمة البدنية.', choices: ['أبداً', 'لعدة أيام', 'أكثر من نصف الأيام', 'تقريباً كل يوم'], subscale: 'somatic' },
  { id: 'phq_5', text: 'ضعف الشهية للطعام أو الشراهة والإفراط البديل والزيادة الملحوظة في الأكل.', choices: ['أبداً', 'لعدة أيام', 'أكثر من نصف الأيام', 'تقريباً كل يوم'], subscale: 'somatic' },
  { id: 'phq_6', text: 'الشعور بالسوء تجاه نفسك، أو أنك شخص فاشل، أو خيبت أمل نفسك أو عائلتك والمحيطين بك.', choices: ['أبداً', 'لعدة أيام', 'أكثر من نصف الأيام', 'تقريباً كل يوم'], subscale: 'cognitive' },
  { id: 'phq_7', text: 'صعوبة شديدة في التركيز على الأشياء الاعتيادية، مثل قراءة الكتب أو متابعة العمل أو الأخبار.', choices: ['أبداً', 'لعدة أيام', 'أكثر من نصف الأيام', 'تقريباً كل يوم'], subscale: 'cognitive' },
  { id: 'phq_8', text: 'بطء ملحوظ في الحركة أو التحدث لدرجة تلاحظ من الآخرين، أو العكس: التململ والاضطراب الشديد وصعوبة الاستقرار.', choices: ['أبداً', 'لعدة أيام', 'أكثر من نصف الأيام', 'تقريباً كل يوم'], subscale: 'somatic' },
  { id: 'phq_9', text: 'تراودك أفكار بأنك ستكون في حال أفضل لو متّ، أو فكرت في إيذاء نفسك بأي شكل في الآونة الأخيرة.', choices: ['أبداً', 'لعدة أيام', 'أكثر من نصف الأيام', 'تقريباً كل يوم'], subscale: 'cognitive' },
];

// ==========================================
// 2. BDI-II AUTHENTIC CRITICAL ITEMS (21 Items)
// ==========================================
export const BDI2_QUESTIONS: Question[] = [
  { id: 'bdi_1', text: 'الحزن والمزاج المنخفض الكئيب:', choices: ['لا أشعر بالحزن. (0)', 'أشعر بالحزن معظم الوقت. (1)', 'أنا حزين طوال الوقت ولا أستطيع التخلص من حزني ومزاجي السيء. (2)', 'أنا حزين لدرجة أنني لا أستطيع تحمل حزني على الإطلاق. (3)'], subscale: 'affective' },
  { id: 'bdi_2', text: 'التشاؤم والنظرة المستقبلية للغد:', choices: ['لست متشائماً أو محبطاً بشأن المستقبلي. (0)', 'أشعر بالتشاؤم تجاه المستقبل أكثر مما كنت عليه في السابق. (1)', 'لا أتوقع أن تتحسن الأمور أو الظروف بالنسبة لي إطلاقاً. (2)', 'أشعر أن مستقبلي ميؤوس منه تماماً وهو سيزداد سوءاً يوماً بعد يوم. (3)'], subscale: 'cognitive' },
  { id: 'bdi_3', text: 'مشاعر الفشل الماضي والإخفاقات التاريخية المتراكمة:', choices: ['لا أشعر بأنني شخص فاشل في حياتي. (0)', 'أشعر بأنني فشلت أكثر مما ينبغي للشخص الطبيعي. (1)', 'عندما أنظر إلى الماضي، أرى الكثير من الإخفاقات والفشل الواضح. (2)', 'أشعر بأنني شخص فاشل تماماً كإنسان وعضو في المجتمع. (3)'], subscale: 'cognitive' },
  { id: 'bdi_4', text: 'فقدان المتعة والقدرة على الابتهاج بالأشياء السارة:', choices: ['ما زلت أحصل على نفس المتعة والارتياح من الأشياء السابقة كالمعتاد. (0)', 'لا أستمتع بالأشياء والأنشطة مثلما كنت أفعل في السابق. (1)', 'أحصل على متعة قليلة جداً من الأشياء التي كانت تسعدني وتفرحني. (2)', 'لم يعد بإمكاني الحصول على أي متعة أو لذة من أي شيء على الإطلاق. (3)'], subscale: 'affective' },
  { id: 'bdi_5', text: 'مشاعر الذنب والندم المستمر الداخلي القاسي:', choices: ['لا أشعر بذنب أو تأنيب ضمير خاص تجاه أي شيء. (0)', 'أشعر بالذنب والندم في كثير من الأحيان تجاه أشياء قمت بها أو قصرت فيها. (1)', 'أشعر بالذنب طوال الوقت تقريباً تجاه معظم مجريات حياتي. (2)', 'أشعر بالذنب التام والشديد طوال الوقت في كل شيء يحدث حولي. (3)'], subscale: 'cognitive' },
  { id: 'bdi_6', text: 'مشاعر استحقاق العقاب أو توقع حدوث مصيبة:', choices: ['لا أشعر بأنني أتعرض للعقاب أو أستحقه. (0)', 'أشعر أنني قد أتعرض للعقاب أو أشياء سيئة في المستقبل. (1)', 'أتوقع تماماً أن أُعاقب عاجلاً أم آجلاً. (2)', 'أشعر أنني أتعاقب بالفعل حالياً من مجريات الحياة السيئة. (3)'], subscale: 'cognitive' },
  { id: 'bdi_7', text: 'عدم الرضا عن النفس وكراهية الذات الداخلية:', choices: ['شعوري تجاه نفسي لم يتغير (أنا راضٍ عن ذاتي بالكامل). (0)', 'لقد فقدت الثقة في نفسي تماماً وأشعر بالضعف. (1)', 'أشعر بخيبة أمل شديدة في نفسي وفي خياراتي السابقة. (2)', 'أنا أكره نفسي تماماً ولا أتقبل وجودي الحالي. (3)'], subscale: 'cognitive' },
  { id: 'bdi_8', text: 'نقد الذات واللوم الذاتي القاسي العنيف على الأخطاء:', choices: ['لا أنتقد نفسي أو ألومها أكثر مما ينبغي في المعتاد. (0)', 'أنا أنتقد نفسي أكثر من السابق وبشدة بسبب أخطائي وهفواتي. (1)', 'ألوم نفسي على كل أخطائي الكبيرة والصغيرة والقرارات غير الموفقة. (2)', 'ألوم نفسي على كل شيء سيء يحدث من حولي حتى لو لم أكن سبباً فيه. (3)'], subscale: 'cognitive' },
  { id: 'bdi_9', text: 'الأفكار أو الرغبات الانتحارية والتفكير في إيذاء النفس:', choices: ['ليس لدي أي أفكار لإيذاء نفسي أو الرغبة في الانتحار. (0)', 'لدي أفكار حول الانتحار أو الموت ولكنني لن أنفذها مطلقاً. (1)', 'أود وأتمنى تماماً لو كنت ميتاً أو أن أنهي حياتي فوراً. (2)', 'سأقتل نفسي لو سنحت لي الفرصة المناسبة أو الطريقة المتاحة. (3)'], subscale: 'cognitive' },
  { id: 'bdi_10', text: 'نوبات البكاء السريعة المفاجئة دون مبرر كبير:', choices: ['لا أبكي أكثر من المعتاد المألوف لي. (0)', 'أبكي الآن أكثر مما كنت أفعل سابقاً في الأوقات الطبيعية. (1)', 'أبكي طوال الوقت على أدنى الأسباب وبشكل مستمر. (2)', 'أشعر بالرغبة العارمة في البكاء ولكنني عاجز عنه ومتحجر المشاعر. (3)'], subscale: 'affective' },
  { id: 'bdi_11', text: 'الهياج والتململ والاضطراب الداخلي الحاد:', choices: ['لا أشعر بالتململ أو الهياج العصبي أكثر من المعتاد. (0)', 'أشعر بالتململ والتوتر أسرع وأسهل من السابق. (1)', 'أنا متهيج جداً وقلق لدرجة يصعب معها الجلوس هادئاً لفترة وجيزة. (2)', 'أنا متهيج ومضطرب باستمرار لدرجة يجب أن أتحرك معها دائماً ولا أستقر. (3)'], subscale: 'anxiety' },
  { id: 'bdi_12', text: 'فقدان الاهتمام بالآخرين وبالأنشطة والعلاقات والروابط:', choices: ['لم أفقد الاهتمام بالناس أو بالأنشطة والمجتمع المحيط بي. (0)', 'أنا أقل اهتماماً بالناس والأمور المحيطة والعلاقات من السابق. (1)', 'لقد فقدت معظم اهتمامي بالناس والأمور والمناسبات من حولي. (2)', 'من الصعب جداً أن أهتم بأي إنسان أو أي شيء على الإطلاق حالياً. (3)'], subscale: 'affective' },
  { id: 'bdi_13', text: 'التردد الشديد وعجز اتخاذ القرارات اليومية البسيطة:', choices: ['أتخذ قراراتي بشكل جيد وحاسم كالمعتاد دون مشاكل. (0)', 'أجد صعوبة وتردداً في اتخاذ القرارات أكثر من المعتاد سابقاً. (1)', 'أواجه صعوبة بالغة وتردداً خانقاً في اتخاذ أبسط القرارات اليومية. (2)', 'أنا عاجز تماماً عن اتخاذ أي قرار حالياً مهما كان تافهاً أو صغيراً. (3)'], subscale: 'cognitive' },
  { id: 'bdi_14', text: 'الشعور بنقص القيمة الذاتية والعدمية والفراغ الداخلي:', choices: ['لا أشعر بأنني شخص بلا قيمة أو فائدة. (0)', 'لا أشعر بأنني ذو قيمة أو فائدة ونفع كما كنت في السابق. (1)', 'أشعر بأن قيمتي وفائدتي أقل بكثير مقارنة بالآخرين من حولي. (2)', 'أشعر بأنني بلا قيمة تماماً وفارغ داخلياً وبلا جدوى للمجتمع. (3)'], subscale: 'cognitive' },
  { id: 'bdi_15', text: 'فقدان الطاقة والقدرة البدنية على الإنجاز والحركة:', choices: ['لدي نفس القدر من الطاقة والنشاط البدني كالمعتاد. (0)', 'طاقتي أقل بكثير مما كانت عليه في السابق لإنجاز الأعمال. (1)', 'ليس لدي طاقة كافية للقيام بالكثير من الأشياء والواجبات. (2)', 'ليس لدي أي طاقة أو جهد للقيام بأي شيء على الإطلاق حالياً. (3)'], subscale: 'somatic' },
  { id: 'bdi_16', text: 'تغيرات أنماط ومواعيد النوم المألوفة:', choices: ['لم يطرأ أي تغيير على طبيعة ومواعيد نومي المعتادة. (0)', 'أنام أكثر قليلاً أو أقل قليلاً من المعتاد الطبيعي. (1)', 'أنام أكثر بكثير أو أقل بكثير من المعتاد (اضطراب حاد). (2)', 'أستيقظ مبكراً جداً ولا أستطيع العودة للنوم، أو أنام طوال اليوم مفرطاً بشكل مرضي. (3)'], subscale: 'somatic' },
  { id: 'bdi_17', text: 'سرعة الانفعال والغضب الشديد ونفاد الصبر العالي:', choices: ['لست سريع الانفعال أو الغضب أكثر من المعتاد. (0)', 'أنا سريع الانفعال والضيق والغضب أكثر من المعتاد وبسرعة. (1)', 'أنا سريع الانفعال بشكل حاد ومستمر ومزعج لمن حولي. (2)', 'أنا متهيج وغاضب ومنفعل طوال الوقت ولا أستطيع ضبط نفسي إطلاقاً. (3)'], subscale: 'affective' },
  { id: 'bdi_18', text: 'تغيرات مستويات الشهية والاقبال على الغذاء:', choices: ['لم يتغير مستوى شهيتي أو إقبالي على الطعام على الإطلاق. (0)', 'شهيتي أقل قليلاً أو أكبر قليلاً من المعتاد الطبيعي. (1)', 'شهيتي أقل بكثير أو أكبر بكثير من المعتاد (فقدان أو شراهة). (2)', 'ليس لدي شهية على الإطلاق، أو أريد تناول الطعام والتهامه طوال الوقت مفرطاً. (3)'], subscale: 'somatic' },
  { id: 'bdi_19', text: 'صعوبة التفكير والتركيز الذهني والتشتت المستمر:', choices: ['يمكنني التركيز والتفكير بشكل جيد كالمعتاد دون تشتت. (0)', 'تركيزي وتفكيري ومطالعتي أبطأ من السابق وأواجه صعوبة فيه. (1)', 'من الصعب جداً علي التركيز في أي موضوع لفترة طويلة أو استيعابه. (2)', 'أجد أنني عاجز تماماً عن التركيز أو التفكير في أي شيء مهما كان بسيطاً. (3)'], subscale: 'cognitive' },
  { id: 'bdi_20', text: 'التعب أو الإرهاق والإنهاك السريع دون مجهود بدني ضخم:', choices: ['لست متعباً أو مرهقاً أكثر من المعتاد الطبيعي لي. (0)', 'أشعر بالتعب والإرهاق بسرعة أكبر ومن مجهود أقل من المعتاد. (1)', 'أنا متعب جداً لدرجة تمنعني من القيام بمهام يومية روتينية بسيطة. (2)', 'أنا متعب ومرهق تماماً ومنهار وعاجز عن القيام بأي حركة أو مجهود بسيط. (3)'], subscale: 'somatic' },
  { id: 'bdi_21', text: 'فقدان الاهتمام بالرغبة الجنسية والإقبال عليها:', choices: ['لم يطرأ أي تغيير على رغبتي أو اهتمامي بالجنس كالمعتاد. (0)', 'أنا أقل اهتماماً ورغبة بالجنس من المعتاد الطبيعي لي. (1)', 'أنا أقل اهتماماً وشغفاً بالجنس بكثير حالياً في هذه الفترة. (2)', 'لقد فقدت كل رغبتي واهتمامي وشغفي بالجنس تماماً وبشكل كلي. (3)'], subscale: 'somatic' },
];

// ==========================================
// 3. DASS-21 QUESTIONS SET (21 Items)
// ==========================================
export const DASS21_QUESTIONS: Question[] = [
  { id: 'dass_1', text: 'أجد صعوبة بالغة في التهدئة والاسترخاء بعد فترات الضغط والعمل البسيط.', choices: ['لم ينطبق علي مطلقاً', 'انطبق لدرجة ما / بعض الوقت', 'انطبق بدرجة كبيرة / جزءاً كبيراً', 'انطبق تماماً / معظم الوقت'], subscale: 'stress' },
  { id: 'dass_2', text: 'لاحظت جفافاً واضحاً وحاداً في فمي وحلقي (دون مبرر طبي عضوي).', choices: ['لم ينطبق علي مطلقاً', 'انطبق لدرجة ما / بعض الوقت', 'انطبق بدرجة كبيرة / جزءاً كبيراً', 'انطبق تماماً / معظم الوقت'], subscale: 'anxiety' },
  { id: 'dass_3', text: 'شعرت بأنني لا أستطيع اختبار أي مشاعر إيجابية أو مبهجة أو سارة على الإطلاق.', choices: ['لم ينطبق علي مطلقاً', 'انطبق لدرجة ما / بعض الوقت', 'انطبق بدرجة كبيرة / جزءاً كبيراً', 'انطبق تماماً / معظم الوقت'], subscale: 'depression' },
  { id: 'dass_4', text: 'واجهت صعوبة أو صدمة في التنفس (مثل تسارع حاد، ضيق نفس مفاجئ دون مجهود بدني).', choices: ['لم ينطبق علي مطلقاً', 'انطبق لدرجة ما / بعض الوقت', 'انطبق بدرجة كبيرة / جزءاً كبيراً', 'انطبق تماماً / معظم الوقت'], subscale: 'anxiety' },
  { id: 'dass_5', text: 'أجد صعوبة شديدة في توليد المبادرة أو الشغف أو الرغبة للبدء في أداء المهام اليومية والواجبات.', choices: ['لم ينطبق علي مطلقاً', 'انطبق لدرجة ما / بعض الوقت', 'انطبق بدرجة كبيرة / جزءاً كبيراً', 'انطبق تماماً / معظم الوقت'], subscale: 'depression' },
  { id: 'dass_6', text: 'أميل إلى تضخيم الأمور والمبالغة الحادة في ردود الفعل تجاه المواقف والمستجدات البسيطة.', choices: ['لم ينطبق علي مطلقاً', 'انطبق لدرجة ما / بعض الوقت', 'انطبق بدرجة كبيرة / جزءاً كبيراً', 'انطبق تماماً / معظم الوقت'], subscale: 'stress' },
  { id: 'dass_7', text: 'شعرت بارتعاش ورجفة مستمرة أو متقطعة واضحة في اليدين أو الأطراف الجسدية.', choices: ['لم ينطبق علي مطلقاً', 'انطبق لدرجة ما / بعض الوقت', 'انطبق بدرجة كبيرة / جزءاً كبيراً', 'انطبق تماماً / معظم الوقت'], subscale: 'anxiety' },
  { id: 'dass_8', text: 'أشعر بأنني مستهلك عصبياً ونفسياً طوال الوقت وعلى حافة الانهيار الداخلي والتعب.', choices: ['لم ينطبق علي مطلقاً', 'انطبق لدرجة ما / بعض الوقت', 'انطبق بدرجة كبيرة / جزءاً كبيراً', 'انطبق تماماً / معظم الوقت'], subscale: 'stress' },
  { id: 'dass_9', text: 'انتابني قلق شديد من مواقف وأماكن قد تسبب لي الذعر أو تجعلني أظهر بشكل مضحك أو مخجل.', choices: ['لم ينطبق علي مطلقاً', 'انطبق لدرجة ما / بعض الوقت', 'انطبق بدرجة كبيرة / جزءاً كبيراً', 'انطبق تماماً / معظم الوقت'], subscale: 'anxiety' },
  { id: 'dass_10', text: 'أشعر بأنني لا أملك أي تطلع إيجابي أو أمل أو طموح مبهج تجاه الغد أو الأيام القادمة.', choices: ['لم ينطبق علي مطلقاً', 'انطبق لدرجة ما / بعض الوقت', 'انطبق بدرجة كبيرة / جزءاً كبيراً', 'انطبق تماماً / معظم الوقت'], subscale: 'depression' },
  { id: 'dass_11', text: 'وجدت نفسي سريع الاضطراب، والتململ، والضيق الحاد من أدنى الكلمات أو التصرفات.', choices: ['لم ينطبق علي مطلقاً', 'انطبق لدرجة ما / بعض الوقت', 'انطبق بدرجة كبيرة / جزءاً كبيراً', 'انطبق تماماً / معظم الوقت'], subscale: 'stress' },
  { id: 'dass_12', text: 'أشعر بصعوبة بالغة في الاسترخاء أو التهدئة أو الترويح عن نفسي وإيجاد الهدوء الداخلي.', choices: ['لم ينطبق علي مطلقاً', 'انطبق لدرجة ما / بعض الوقت', 'انطبق بدرجة كبيرة / جزءاً كبيراً', 'انطبق تماماً / معظم الوقت'], subscale: 'stress' },
  { id: 'dass_13', text: 'أشعر بالحزن العميق والكآبة السوداوية والإنهاك الوجداني التام معظم الوقت.', choices: ['لم ينطبق علي مطلقاً', 'انطبق لدرجة ما / بعض الوقت', 'انطبق بدرجة كبيرة / جزءاً كبيراً', 'انطبق تماماً / معظم الوقت'], subscale: 'depression' },
  { id: 'dass_14', text: 'عدم التسامح أو نفاذ الصبر التام مع أي عارض أو شخص يحول بيني وبين إكمال ما أفعله حالياً.', choices: ['لم ينطبق علي مطلقاً', 'انطبق لدرجة ما / بعض الوقت', 'انطبق بدرجة كبيرة / جزءاً كبيراً', 'انطبق تماماً / معظم الوقت'], subscale: 'stress' },
  { id: 'dass_15', text: 'شعرت بحالة قريبة جداً من الذعر المفاجئ أو الرعب والصدمة دون وجود أي سبب منطقي.', choices: ['لم ينطبق علي مطلقاً', 'انطبق لدرجة ما / بعض الوقت', 'انطبق بدرجة كبيرة / جزءاً كبيراً', 'انطبق تماماً / معظم الوقت'], subscale: 'anxiety' },
  { id: 'dass_16', text: 'أشعر بعدم القدرة على الحماس أو إيقاظ الاهتمام بأي أنشطة ترفيهية أو علمية أو عملية.', choices: ['لم ينطبق علي مطلقاً', 'انطبق لدرجة ما / بعض الوقت', 'انطبق بدرجة كبيرة / جزءاً كبيراً', 'انطبق تماماً / معظم الوقت'], subscale: 'depression' },
  { id: 'dass_17', text: 'أشعر بأنني لست شخصاً قيماً، أو جديراً بالاحترام، أو نافعاً لمن حولي أو لنفسي.', choices: ['لم ينطبق علي مطلقاً', 'انطبق لدرجة ما / بعض الوقت', 'انطبق بدرجة كبيرة / جزءاً كبيراً', 'انطبق تماماً / معظم الوقت'], subscale: 'depression' },
  { id: 'dass_18', text: 'أشعر بأنني شديد الحساسية العصبية، وسريع الانفعال لدرجة تافهة لا تستحق العناء عادةً.', choices: ['لم ينطبق علي مطلقاً', 'انطبق لدرجة ما / بعض الوقت', 'انطبق بدرجة كبيرة / جزءاً كبيراً', 'انطبق تماماً / معظم الوقت'], subscale: 'stress' },
  { id: 'dass_19', text: 'لاحظت تسارعاً واضحاً أو خفقاناً لضربات القلب والنبض دون ممارسة أي مجهود بدني ضاغط.', choices: ['لم ينطبق علي مطلقاً', 'انطبق لدرجة ما / بعض الوقت', 'انطبق بدرجة كبيرة / جزءاً كبيراً', 'انطبق تماماً / معظم الوقت'], subscale: 'anxiety' },
  { id: 'dass_20', text: 'أشعر بالخوف والرعب الغامض المجهول دون وجود أي خطر حقيقي أو تهديد واضح من حولي.', choices: ['لم ينطبق علي مطلقاً', 'انطبق لدرجة ما / بعض الوقت', 'انطبق بدرجة كبيرة / جزءاً كبيراً', 'انطبق تماماً / معظم الوقت'], subscale: 'anxiety' },
  { id: 'dass_21', text: 'أشعر أن الحياة أصبحت فارغة ومملة تماماً، ولا تحمل أي معنى أو قيمة أو هدف للعيش.', choices: ['لم ينطبق علي مطلقاً', 'انطبق لدرجة ما / بعض الوقت', 'انطبق بدرجة كبيرة / جزءاً كبيراً', 'انطبق تماماً / معظم الوقت'], subscale: 'depression' },
];

// ==========================================
// 4. GDS-15 QUESTIONS SET (15 Items)
// ==========================================
export const GDS15_QUESTIONS: Question[] = [
  { id: 'gds_1', text: 'هل أنت راضٍ عن حياتك بشكل أساسي وجوهري حالياً؟', choices: ['نعم (0)', 'لا (1)'], reverse: true },
  { id: 'gds_2', text: 'هل أهملت وتخليت عن الكثير من نشاطاتك واهتماماتك وهواياتك السابقة؟', choices: ['نعم (1)', 'لا (0)'] },
  { id: 'gds_3', text: 'هل تشعر أن حياتك الحالية فارغة وخالية تماماً من الأهداف؟', choices: ['نعم (1)', 'لا (0)'] },
  { id: 'gds_4', text: 'هل تشعر بالملل والضجر المتكرر في معظم الأحيان؟', choices: ['نعم (1)', 'لا (0)'] },
  { id: 'gds_5', text: 'هل مزاجك وحالتك المعنوية والروحية جيدة ونشطة معظم الوقت؟', choices: ['نعم (0)', 'لا (1)'], reverse: true },
  { id: 'gds_6', text: 'هل تخشى أو تخاف باستمرار أن شيئاً سيئاً أو مصيبة ستحدث لك قريباً؟', choices: ['نعم (1)', 'لا (0)'] },
  { id: 'gds_7', text: 'هل تشعر بالسعادة والبهجة الداخلية والرضا في معظم أوقاتك؟', choices: ['نعم (0)', 'لا (1)'], reverse: true },
  { id: 'gds_8', text: 'هل تشعر بالعجز وقلة الحيلة أو الهوان والضعف غالباً؟', choices: ['نعم (1)', 'لا (0)'] },
  { id: 'gds_9', text: 'هل تفضل دائماً البقاء في غرفتك/منزلك على الخروج والقيام بأعمال جديدة؟', choices: ['نعم (1)', 'لا (0)'] },
  { id: 'gds_10', text: 'هل تشعر أن لديك مشاكل وضعف في الذاكرة والتركيز أكثر من الآخرين؟', choices: ['نعم (1)', 'لا (0)'] },
  { id: 'gds_11', text: 'هل تعتقد وتستشعر أنه من الرائع والمبهج أنك على قيد الحياة الآن؟', choices: ['نعم (0)', 'لا (1)'], reverse: true },
  { id: 'gds_12', text: 'هل تشعر بأنك بلا قيمة، أو بلا فائدة تذكر، أو عالة بالوضع الحالي؟', choices: ['نعم (1)', 'لا (0)'] },
  { id: 'gds_13', text: 'هل تشعر بالطاقة، والنشاط، والحيوية المفعمة المتجددة تدب في أوصالك؟', choices: ['نعم (0)', 'لا (1)'], reverse: true },
  { id: 'gds_14', text: 'هل تشعر وتظن بأن وضعك وظروفك الحالية تفتقر تماماً للأمل ومسدودة؟', choices: ['نعم (1)', 'لا (0)'] },
  { id: 'gds_15', text: 'هل تعتقد أو تظن أن معظم الناس المحيطين بك هم في وضع أفضل منك بكثير؟', choices: ['نعم (1)', 'لا (0)'] },
];

// ==========================================
// 5. GAD-7 OFFICIAL ANXIETY SCALE (7 Items)
// ==========================================
export const GAD7_QUESTIONS: Question[] = [
  { id: 'gad_1', text: 'الشعور بالعصبية أو القلق أو التوتر الشديد وعلى حافة الانهيار.', choices: ['أبداً (0)', 'لعدة أيام (1)', 'أكثر من نصف الأيام (2)', 'تقريباً كل يوم (3)'], subscale: 'anxiety' },
  { id: 'gad_2', text: 'عدم القدرة على إيقاف القلق أو السيطرة عليه وتهدئة النفس.', choices: ['أبداً (0)', 'لعدة أيام (1)', 'أكثر من نصف الأيام (2)', 'تقريباً كل يوم (3)'], subscale: 'anxiety' },
  { id: 'gad_3', text: 'القلق الزائد والمفرط حول أمور ومسائل حياتية مختلفة ومتعددة.', choices: ['أبداً (0)', 'لعدة أيام (1)', 'أكثر من نصف الأيام (2)', 'تقريباً كل يوم (3)'], subscale: 'anxiety' },
  { id: 'gad_4', text: 'صعوبة بالغة وواضحة في الاسترخاء وإيجاد الهدوء الداخلي.', choices: ['أبداً (0)', 'لعدة أيام (1)', 'أكثر من نصف الأيام (2)', 'تقريباً كل يوم (3)'], subscale: 'anxiety' },
  { id: 'gad_5', text: 'التململ الشديد لدرجة صعوبة البقاء جالساً أو هادئاً في مكانك.', choices: ['أبداً (0)', 'لعدة أيام (1)', 'أكثر من نصف الأيام (2)', 'تقريباً كل يوم (3)'], subscale: 'anxiety' },
  { id: 'gad_6', text: 'سرعة الانزعاج وسرعة الانفعال والضيق ونفاد الصبر من أقل المواقف.', choices: ['أبداً (0)', 'لعدة أيام (1)', 'أكثر من نصف الأيام (2)', 'تقريباً كل يوم (3)'], subscale: 'anxiety' },
  { id: 'gad_7', text: 'الشعور بالخوف والرعب كأن شيئاً مروعاً أو كارثياً على وشك الحدوث.', choices: ['أبداً (0)', 'لعدة أيام (1)', 'أكثر من نصف الأيام (2)', 'تقريباً كل يوم (3)'], subscale: 'anxiety' },
];

// ==========================================
// 6. ISI INSOMNIA SEVERITY INDEX (7 Items)
// ==========================================
export const ISI_QUESTIONS: Question[] = [
  { id: 'isi_1', text: 'صعوبة الخلود إلى النوم والبدء فيه عند الذهاب إلى الفراش:', choices: ['لا يوجد إطلاقاً (0)', 'خفيف (1)', 'متوسط (2)', 'شديد (3)', 'شديد للغاية (4)'], subscale: 'sleep' },
  { id: 'isi_2', text: 'صعوبة استمرار النوم والاستيقاظ المتكرر أثناء الليل:', choices: ['لا يوجد إطلاقاً (0)', 'خفيف (1)', 'متوسط (2)', 'شديد (3)', 'شديد للغاية (4)'], subscale: 'sleep' },
  { id: 'isi_3', text: 'مشكلة الاستيقاظ المبكر جداً صباحاً والعجز التام عن العودة للنوم:', choices: ['لا يوجد إطلاقاً (0)', 'خفيف (1)', 'متوسط (2)', 'شديد (3)', 'شديد للغاية (4)'], subscale: 'sleep' },
  { id: 'isi_4', text: 'مدى رضاك عن نمط ونوعية نومك الحالي في هذه الفترة:', choices: ['راضٍ جداً (0)', 'راضٍ إلى حد ما (1)', 'غير راضٍ قليلاً (2)', 'غير راضٍ جداً (3)', 'مستاء تماماً (4)'], subscale: 'sleep' },
  { id: 'isi_5', text: 'مدى تأثير قلة النوم على أدائك اليومي (التركيز، الذاكرة، الطاقة، المزاج):', choices: ['لا يؤثر إطلاقاً (0)', 'تأثير طفيف (1)', 'تأثير متوسط (2)', 'تأثير كبير (3)', 'تأثير معطل للغاية (4)'], subscale: 'sleep' },
  { id: 'isi_6', text: 'مدى ملاحظة الآخرين للمشاكل الناجمة عن قلة نومك وتراجع نوعية حياتك:', choices: ['لا يلاحظون إطلاقاً (0)', 'يلاحظون بالكاد (1)', 'يلاحظون إلى حد ما (2)', 'يلاحظون بوضوح (3)', 'يلاحظون بشدة (4)'], subscale: 'sleep' },
  { id: 'isi_7', text: 'مدى شعورك بالقلق والضيق والتوتر حيال مشاكل نومك الحالية:', choices: ['لا أقلق إطلاقاً (0)', 'قلق خفيف (1)', 'قلق متوسط (2)', 'قلق شديد (3)', 'قلق شديد للغاية (4)'], subscale: 'sleep' },
];

// ==========================================
// 7. PSS-10 PERCEIVED STRESS SCALE (10 Items)
// ==========================================
export const PSS10_QUESTIONS: Question[] = [
  { id: 'pss_1', text: 'خلال الشهر الماضي، كم مرة شعرت بالانزعاج والضيق بسبب أمر غير متوقع؟', choices: ['أبداً (0)', 'نادراً (1)', 'أحياناً (2)', 'غالباً (3)', 'دائماً (4)'], subscale: 'perceived_stress' },
  { id: 'pss_2', text: 'خلال الشهر الماضي، كم مرة شعرت بالعجز عن السيطرة على الأمور الهامة في حياتك؟', choices: ['أبداً (0)', 'نادراً (1)', 'أحياناً (2)', 'غالباً (3)', 'دائماً (4)'], subscale: 'perceived_stress' },
  { id: 'pss_3', text: 'خلال الشهر الماضي، كم مرة شعرت بالتوتر والضغط العصبي الشديد والإنهاك؟', choices: ['أبداً (0)', 'نادراً (1)', 'أحياناً (2)', 'غالباً (3)', 'دائماً (4)'], subscale: 'perceived_stress' },
  { id: 'pss_4', text: 'خلال الشهر الماضي، كم مرة شعرت بالثقة في قدرتك على معالجة وحل مشاكلك الشخصية؟', choices: ['أبداً (4)', 'نادراً (3)', 'أحياناً (2)', 'غالباً (1)', 'دائماً (0)'], reverse: true, subscale: 'perceived_stress' },
  { id: 'pss_5', text: 'خلال الشهر الماضي، كم مرة شعرت أن الأمور تسير وفق ما تريد ومخطط لها تماماً؟', choices: ['أبداً (4)', 'نادراً (3)', 'أحياناً (2)', 'غالباً (1)', 'دائماً (0)'], reverse: true, subscale: 'perceived_stress' },
  { id: 'pss_6', text: 'خلال الشهر الماضي، كم مرة وجدت أنك غير قادر على مواكبة كل المهام المتوجبة عليك؟', choices: ['أبداً (0)', 'نادراً (1)', 'أحياناً (2)', 'غالباً (3)', 'دائماً (4)'], subscale: 'perceived_stress' },
  { id: 'pss_7', text: 'خلال الشهر الماضي، كم مرة استطعت التحكم بنجاح في المنغصات والمشاعر المزعجة؟', choices: ['أبداً (4)', 'نادراً (3)', 'أحياناً (2)', 'غالباً (1)', 'دائماً (0)'], reverse: true, subscale: 'perceived_stress' },
  { id: 'pss_8', text: 'خلال الشهر الماضي، كم مرة شعرت بأنك مسيطر تماماً على زمام الأمور في يومك؟', choices: ['أبداً (4)', 'نادراً (3)', 'أحياناً (2)', 'غالباً (1)', 'دائماً (0)'], reverse: true, subscale: 'perceived_stress' },
  { id: 'pss_9', text: 'خلال الشهر الماضي، كم مرة غضبت بسبب أشياء حدثت خارج نطاق إرادتك وسيطرتك؟', choices: ['أبداً (0)', 'نادراً (1)', 'أحياناً (2)', 'غالباً (3)', 'دائماً (4)'], subscale: 'perceived_stress' },
  { id: 'pss_10', text: 'خلال الشهر الماضي، كم مرة شعرت أن الصعوبات تتراكم لدرجة أنك لا تستطيع التغلب عليها؟', choices: ['أبداً (0)', 'نادراً (1)', 'أحياناً (2)', 'غالباً (3)', 'دائماً (4)'], subscale: 'perceived_stress' },
];
