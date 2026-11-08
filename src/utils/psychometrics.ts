import {
  AssessmentResult,
  BDI2_QUESTIONS,
  DASS21_QUESTIONS,
  DemographicContext,
  GAD7_QUESTIONS,
  GDS15_QUESTIONS,
  ISI_QUESTIONS,
  PHQ9_QUESTIONS,
  PSS10_QUESTIONS,
} from '../types/clinical';

export function calculateAssessment(
  demographics: DemographicContext,
  responses: Record<string, number>
): AssessmentResult {
  // 1. Calculate PHQ-9 (Patient Health Questionnaire - 9)
  let phqRaw = 0;
  const phqMax = 27;
  let phqPercentage = 0;
  let phqSeverity = 'غير مفعل';

  if (demographics.usePhq9) {
    PHQ9_QUESTIONS.forEach((q) => {
      phqRaw += responses[q.id] ?? 0;
    });
    phqPercentage = Math.round((phqRaw / phqMax) * 100);

    phqSeverity = 'طبيعي / غياب الأعراض (0-4)';
    if (phqRaw >= 20) phqSeverity = 'اكتئاب سريري حاد وشديد (20-27)';
    else if (phqRaw >= 15) phqSeverity = 'اكتئاب متوسط الشدة إلى حاد (15-19)';
    else if (phqRaw >= 10) phqSeverity = 'اكتئاب سريري متوسط (10-14)';
    else if (phqRaw >= 5) phqSeverity = 'أعراض اكتئابية خفيفة (5-9)';
  }

  // 2. Calculate BDI-II (Beck Depression Inventory - II)
  let bdiRaw = 0;
  const bdiMax = 63;
  let bdiPercentage = 0;
  let bdiSeverity = 'غير مفعل';

  if (demographics.useBdi2) {
    BDI2_QUESTIONS.forEach((q) => {
      bdiRaw += responses[q.id] ?? 0;
    });
    bdiPercentage = Math.round((bdiRaw / bdiMax) * 100);

    bdiSeverity = 'غياب الأعراض / ضمن الحدود السوية (0-13)';
    if (bdiRaw >= 29) bdiSeverity = 'اكتئاب حاد وشديد معرفياً وسريرياً (29-63)';
    else if (bdiRaw >= 20) bdiSeverity = 'اكتئاب متوسط الشدة (20-28)';
    else if (bdiRaw >= 14) bdiSeverity = 'اكتئاب طفيف إلى خفيف (14-19)';
  }


  // 3. Optional DASS-21
  let dassRaw = 0;
  let dassDepression = 0;
  let dassAnxiety = 0;
  let dassStress = 0;

  if (demographics.useDass) {
    DASS21_QUESTIONS.forEach((q) => {
      const val = responses[q.id] ?? 0;
      dassRaw += val;
      if (q.subscale === 'depression') dassDepression += val;
      else if (q.subscale === 'anxiety') dassAnxiety += val;
      else if (q.subscale === 'stress') dassStress += val;
    });
  }
  const dassMax = 63;
  const dassPercentage = Math.round((dassRaw / dassMax) * 100);

  let dassSeverity = 'مستويات طبيعية اعتيادية';
  if (dassRaw >= 38) dassSeverity = 'توتر وقلق واكتئاب شديد للغاية';
  else if (dassRaw >= 28) dassSeverity = 'توتر وقلق مرتفع وشديد';
  else if (dassRaw >= 18) dassSeverity = 'أعراض توتر وقلق متوسطة';
  else if (dassRaw >= 10) dassSeverity = 'أعراض ضغط خفيفة';

  // 4. Optional GDS-15 (Geriatric / General Life Satisfaction)
  let gdsRaw = 0;
  if (demographics.useGds) {
    GDS15_QUESTIONS.forEach((q) => {
      const choiceIdx = responses[q.id] ?? 0;
      let score = 0;
      if (q.reverse) {
        // Choice 0: نعم (0), Choice 1: لا (1)
        score = choiceIdx === 1 ? 1 : 0;
      } else {
        // Choice 0: نعم (1), Choice 1: لا (0)
        score = choiceIdx === 0 ? 1 : 0;
      }
      gdsRaw += score;
    });
  }
  const gdsMax = 15;
  const gdsPercentage = Math.round((gdsRaw / gdsMax) * 100);

  let gdsSeverity = 'رضا طبيعي عن الحياة (0-4)';
  if (gdsRaw >= 12) gdsSeverity = 'انخفاض حاد في الرضا عن الحياة (12-15)';
  else if (gdsRaw >= 9) gdsSeverity = 'مؤشرات كدر واكتئاب معتدلة (9-11)';
  else if (gdsRaw >= 5) gdsSeverity = 'أعراض انخفاض معنويات طفيفة (5-8)';

  // 5. GAD-7 (Generalized Anxiety Disorder 7)
  let gadRaw = 0;
  const gadMax = 21;
  let gadPercentage = 0;
  let gadSeverity = 'غير مفعل';

  if (demographics.useGad7) {
    GAD7_QUESTIONS.forEach((q) => {
      gadRaw += responses[q.id] ?? 0;
    });
    gadPercentage = Math.round((gadRaw / gadMax) * 100);

    gadSeverity = 'قلق طبيعي / طفيف (0-4)';
    if (gadRaw >= 15) gadSeverity = 'اضطراب قلق شديد عيادياً (15-21)';
    else if (gadRaw >= 10) gadSeverity = 'اضطراب قلق متوسط الشدة (10-14)';
    else if (gadRaw >= 5) gadSeverity = 'أعراض قلق خفيفة (5-9)';
  }

  // 6. ISI (Insomnia Severity Index)
  let isiRaw = 0;
  const isiMax = 28;
  let isiPercentage = 0;
  let isiSeverity = 'غير مفعل';

  if (demographics.useIsi) {
    ISI_QUESTIONS.forEach((q) => {
      isiRaw += responses[q.id] ?? 0;
    });
    isiPercentage = Math.round((isiRaw / isiMax) * 100);

    isiSeverity = 'غياب الأرق ذي الدلالة السريرية (0-7)';
    if (isiRaw >= 22) isiSeverity = 'أرق سريري حاد وشديد للغاية (22-28)';
    else if (isiRaw >= 15) isiSeverity = 'أرق سريري متوسط الشدة (15-21)';
    else if (isiRaw >= 8) isiSeverity = 'أرق تحت العتبة السريرية / خفيف (8-14)';
  }

  // 7. PSS-10 (Perceived Stress Scale)
  let pssRaw = 0;
  const pssMax = 40;
  let pssPercentage = 0;
  let pssSeverity = 'غير مفعل';

  if (demographics.usePss10) {
    PSS10_QUESTIONS.forEach((q) => {
      const choiceIdx = responses[q.id] ?? 0;
      let score = choiceIdx;
      if (q.reverse) {
        score = 4 - choiceIdx;
      }
      pssRaw += score;
    });
    pssPercentage = Math.round((pssRaw / pssMax) * 100);

    pssSeverity = 'إدراك منخفض للضغوط / قدرة تكيف عالية (0-13)';
    if (pssRaw >= 27) pssSeverity = 'إدراك حاد ومرتفع للضغوط النفسية (27-40)';
    else if (pssRaw >= 14) pssSeverity = 'إدراك معتدل للضغوط الحياتية (14-26)';
  }

  // 5. Environmental Factors & Modifiers Evaluation
  const environmentalFactors: { label: string; impact: number; reason: string }[] = [];
  let envModifier = 0;

  const districtLower = (demographics.district || '').trim().toLowerCase();
  const cityLower = (demographics.city || '').trim().toLowerCase();

  // Urban Density / Environmental friction
  const denseDistricts = [
    'إمبابة',
    'شبرا',
    'عين شمس',
    'المطرية',
    'دار السلام',
    'بولاق',
    'الوراق',
    'الزاوية',
    'المرج',
    'الهرم',
    'فيصل',
    'مكتظ',
    'شعبي',
    'حارة',
  ];
  const sereneDistricts = [
    'المعادي',
    'التجمع',
    'الرحاب',
    'زايد',
    'أكتوبر',
    'الزمالك',
    'مصر الجديدة',
    'الشروق',
    'مدينتي',
    'دبلوماسي',
    'هادئ',
    'ساحلي',
  ];

  if (denseDistricts.some((d) => districtLower.includes(d) || cityLower.includes(d))) {
    environmentalFactors.push({
      label: 'كثافة حضرية وضوضاء بيئية مرتفعة',
      impact: 15,
      reason: `المنطقة السكنية (${demographics.district}) تتميز بكثافة سكانية وحركية عالية ترفع مستويات الكورتيزول والإجهاد الحسي العصبي.`,
    });
    envModifier += 15;
  } else if (sereneDistricts.some((d) => districtLower.includes(d) || cityLower.includes(d))) {
    environmentalFactors.push({
      label: 'بيئة سكنية منخفضة الاحتكاك',
      impact: -5,
      reason: `المنطقة السكنية (${demographics.district}) توفر مساحات مفتوحة وهدوءاً حسياً يقلل من ضغوط الازدحام اليومي.`,
    });
    envModifier -= 5;
  }

  // Economic Stress
  if (demographics.economy === 'stressful') {
    environmentalFactors.push({
      label: 'ضائقة والتزامات مالية ضاغطة',
      impact: 15,
      reason: 'العبء الاقتصادي والديون يفرضان توتراً وجدانياً مستمراً يحاكي أعراض عسر المزاج واليأس المستقبلي.',
    });
    envModifier += 15;
  } else if (demographics.economy === 'average') {
    environmentalFactors.push({
      label: 'جهد اقتصادي لتغطية المتطلبات',
      impact: 5,
      reason: 'الجهد المبذول لتغطية نفقات المعيشة يستهلك طاقة تكيفية مستمرة.',
    });
    envModifier += 5;
  }

  // Employment
  if (demographics.job === 'unemployed') {
    environmentalFactors.push({
      label: 'غياب النشاط المهني / بطالة',
      impact: 10,
      reason: 'فقدان الروتين اليومي والبحث المرهق عن عمل يرتبطان بمشاعر نقص القيمة وتراجع الدافعية الإنجازية.',
    });
    envModifier += 10;
  } else if (demographics.job === 'freelancer') {
    environmentalFactors.push({
      label: 'عدم استقرار الدخل المهني الحر',
      impact: 5,
      reason: 'تقلب التدفق المالي في العمل الحر يولد قلقاً مستقبلياً مستمراً.',
    });
    envModifier += 5;
  }

  // Physical Health
  if (demographics.health === 'chronic') {
    environmentalFactors.push({
      label: 'اعتلال صحي جسدي أو ألم مزمن',
      impact: 12,
      reason: 'الألم المستمر يفرغ السيروتونين والدوبامين ويفسر تراجع الطاقة واضطراب النوم العضوي.',
    });
    envModifier += 12;
  } else if (demographics.health === 'acute') {
    environmentalFactors.push({
      label: 'وعكة صحية طارئة حادة',
      impact: 8,
      reason: 'المرض الحاد يسبب إجهاداً بدنياً مؤقتاً ينعكس فورياً على مقاييس الطاقة والمزاج.',
    });
    envModifier += 8;
  }

  // Living Arrangement
  if (demographics.living === 'alone') {
    environmentalFactors.push({
      label: 'عزلة سكنية وغياب شريك المعيشة',
      impact: 8,
      reason: 'العيش الانفرادي يحرم الفرد من الدعم الانفعالي المباشر ويزيد فرصة اجترار الأفكار السلبية.',
    });
    envModifier += 8;
  }

  // Marital Status
  if (demographics.social === 'separated' || demographics.social === 'widowed') {
    environmentalFactors.push({
      label: 'ضغوط الانفصال أو الفقدان العاطفي',
      impact: 8,
      reason: 'مرحلة التأقلم بعد الفقد أو الانفصال تصاحبها صدمة تكيفية تحاكي الحزن الاكتئابي الطبيعي.',
    });
    envModifier += 8;
  }

  // Acute Stressors
  if (demographics.acuteStressors && demographics.acuteStressors.length > 0) {
    const stressorImpact = Math.min(demographics.acuteStressors.length * 5, 15);
    environmentalFactors.push({
      label: `صدمات وضغوط حادة طارئة (${demographics.acuteStressors.length} متغيرات)`,
      impact: stressorImpact,
      reason: `تم رصد ضغوط نوعية: ${demographics.acuteStressors.join('، ')}.`,
    });
    envModifier += stressorImpact;
  }

  // Cap Environmental Modifier between -10% and +50%
  envModifier = Math.max(-10, Math.min(50, envModifier));

  // 6. Combined Raw Score
  let activeScaleCount = 0;
  let combinedSum = 0;

  if (demographics.usePhq9) {
    activeScaleCount++;
    combinedSum += phqPercentage;
  }
  if (demographics.useBdi2) {
    activeScaleCount++;
    combinedSum += bdiPercentage;
  }
  if (demographics.useDass) {
    activeScaleCount++;
    combinedSum += dassPercentage;
  }
  if (demographics.useGds) {
    activeScaleCount++;
    combinedSum += gdsPercentage;
  }
  if (demographics.useGad7) {
    activeScaleCount++;
    combinedSum += gadPercentage;
  }
  if (demographics.useIsi) {
    activeScaleCount++;
    combinedSum += isiPercentage;
  }
  if (demographics.usePss10) {
    activeScaleCount++;
    combinedSum += pssPercentage;
  }

  const rawCombinedScore = activeScaleCount > 0 ? Math.round(combinedSum / activeScaleCount) : 0;


  // 7. Contextual Environmental Calibration
  // Calibrated score discounts reactive environmental load by 0.25 weighting factor
  let calibratedScore = Math.round(rawCombinedScore - envModifier * 0.25);
  calibratedScore = Math.max(0, Math.min(100, calibratedScore));

  // Severity Classification
  let severityLabel = '';
  let severityColor = '';
  let recommendation = '';

  if (calibratedScore <= 20) {
    severityLabel = 'ضمن النطاق الطبيعي السوي (غياب مؤشرات الاكتئاب والاعتلال السريري)';
    severityColor = 'text-emerald-400';
    recommendation =
      'النتائج مطمئنة جداً ولا تظهر أي مؤشرات لاعتلال نفسي أو اكتئابي عيادي. يوصى بمواصلة العادات الصحية، والنشاط البدني المنتظم، وتعزيز الصلات الاجتماعية الداعمة كإجراء وقائي دوري.';
  } else if (calibratedScore <= 55) {
    severityLabel = 'أعراض خفيفة إلى متوسطة (استجابة تكيفية تفاعلية للضغوط المحيطة)';
    severityColor = 'text-amber-400';
    recommendation =
      'الأعراض المرصودة تمثل في جوهرها استجابة إجهاد تكيفية طبيعية تجاه ضغوط البيئة الحياتية والظروف المعيشية، وليست بالضرورة اضطراباً بيولوجياً عميقاً. يوصى بإجراء استشارة دعم نفسي إرشادي، وترتيب أولويات العمل والراحة، مع مراجعة نمط النوم والتغذية لتفادي تراكم الإنهاك العصبي.';
  } else {
    severityLabel = 'مؤشرات سريرية مرتفعة تستوجب تقييماً طبياً نفسياً متخصصاً';
    severityColor = 'text-rose-400';
    recommendation =
      'المعدل الموزون يشير إلى عبء انفعالي وجسدي يتجاوز القدرة التكيفية الفردية. ننصحك بترتيب موعد تقييم سريري شامل لدى طبيب نفسي معتمد أو أخصائي علاج سلوكي معرفي (CBT) لتحديد التدخل العلاجي الأنسب.';
  }

  // 8. Dimensional Domain Aggregation
  let affectivePoints = 0;
  let affectiveMax = 0;
  let cognitivePoints = 0;
  let cognitiveMax = 0;
  let somaticPoints = 0;
  let somaticMax = 0;
  let anxietyPoints = 0;
  let anxietyMax = 0;

  // PHQ-9 items attribution
  PHQ9_QUESTIONS.forEach((q) => {
    const pts = responses[q.id] ?? 0;
    if (q.subscale === 'affective') {
      affectivePoints += pts;
      affectiveMax += 3;
    } else if (q.subscale === 'cognitive') {
      cognitivePoints += pts;
      cognitiveMax += 3;
    } else if (q.subscale === 'somatic') {
      somaticPoints += pts;
      somaticMax += 3;
    }
  });

  // BDI-II items attribution
  BDI2_QUESTIONS.forEach((q) => {
    const pts = responses[q.id] ?? 0;
    if (q.subscale === 'affective') {
      affectivePoints += pts;
      affectiveMax += 3;
    } else if (q.subscale === 'cognitive') {
      cognitivePoints += pts;
      cognitiveMax += 3;
    } else if (q.subscale === 'somatic') {
      somaticPoints += pts;
      somaticMax += 3;
    } else if (q.subscale === 'anxiety') {
      anxietyPoints += pts;
      anxietyMax += 3;
    }
  });

  // DASS-21 anxiety & stress attribution
  if (demographics.useDass) {
    anxietyPoints += dassAnxiety + dassStress;
    anxietyMax += 14 * 3;
  }

  // GAD-7 anxiety attribution
  if (demographics.useGad7) {
    anxietyPoints += gadRaw;
    anxietyMax += gadMax;
  }

  // ISI insomnia & somatic attribution
  if (demographics.useIsi) {
    somaticPoints += isiRaw;
    somaticMax += isiMax;
  }

  // PSS-10 perceived stress attribution
  if (demographics.usePss10) {
    cognitivePoints += Math.round(pssRaw * 0.5);
    cognitiveMax += 20;
    anxietyPoints += Math.round(pssRaw * 0.5);
    anxietyMax += 20;
  }

  const domains = {
    affective: affectiveMax > 0 ? Math.round((affectivePoints / affectiveMax) * 100) : 0,
    cognitive: cognitiveMax > 0 ? Math.round((cognitivePoints / cognitiveMax) * 100) : 0,
    somatic: somaticMax > 0 ? Math.round((somaticPoints / somaticMax) * 100) : 0,
    anxiety: anxietyMax > 0 ? Math.round((anxietyPoints / anxietyMax) * 100) : phqPercentage,
    environmental: Math.max(0, Math.min(100, Math.round(50 + envModifier))),
  };

  // 9. Suicidal Ideation & Safety Screening
  const suicidalRiskItems: {
    scale: string;
    itemText: string;
    responseText: string;
    points: number;
  }[] = [];

  const phq9Item = responses['phq_9'] ?? 0;
  if (phq9Item >= 1) {
    const choices = ['أبداً', 'لعدة أيام', 'أكثر من نصف الأيام', 'تقريباً كل يوم'];
    suicidalRiskItems.push({
      scale: 'PHQ-9 (البند 9)',
      itemText: 'أفكار حول الموت أو إيذاء النفس في الآونة الأخيرة',
      responseText: choices[phq9Item] || '',
      points: phq9Item,
    });
  }

  const bdi9Item = responses['bdi_9'] ?? 0;
  if (bdi9Item >= 1) {
    const bdiChoices = [
      'ليس لدي أي أفكار لإيذاء نفسي أو الرغبة في الانتحار. (0)',
      'لدي أفكار حول الانتحار أو الموت ولكنني لن أنفذها مطلقاً. (1)',
      'أود وأتمنى تماماً لو كنت ميتاً أو أن أنهي حياتي فوراً. (2)',
      'سأقتل نفسي لو سنحت لي الفرصة المناسبة أو الطريقة المتاحة. (3)',
    ];
    suicidalRiskItems.push({
      scale: 'BDI-II (البند 9)',
      itemText: 'الأفكار أو الرغبات الانتحارية',
      responseText: bdiChoices[bdi9Item] || '',
      points: bdi9Item,
    });
  }

  const hasSuicidalRisk = suicidalRiskItems.length > 0;

  // 10. Generate In-depth Contextual Psychological Narrative
  const highestDomain = Object.entries(domains).reduce((a, b) => (b[1] > a[1] ? b : a));

  let domainCommentary = '';
  if (highestDomain[0] === 'somatic') {
    domainCommentary =
      'لوحظ تركّز ملحوظ في المظاهر الجسدية والفسيولوجية (اضطرابات النوم، تغير الشهية، وإنهاك الطاقة البدنية)، وهو نمط شائع جداً عندما تتراكم الضغوط البيئية الحياتية وتترجم إلى استنزاف جسدي قبل أن تكون عسر مزاج خالص.';
  } else if (highestDomain[0] === 'cognitive') {
    domainCommentary =
      'يبرز ثقل واضح في المظاهر المعرفية ونقد الذات (لوم النفس، التشاؤم المستقبلي، ونقص الفعالية الذاتية)، مما يجعل العلاج المعرفي السلوكي (CBT) وإعادة صياغة التشوهات الفكرية تدخلاً بالغ الفائدة.';
  } else if (highestDomain[0] === 'anxiety') {
    domainCommentary =
      'تظهر النتائج استثارة عصبية وقلقاً وتوتراً ملحوظاً، مما يشير إلى أن الجهاز العصبي يعيش في حالة استنفار مستمر تحت تأثير المتطلبات اليومية.';
  } else {
    domainCommentary =
      'تتوزع الاستجابات بتناغم نسبي بين عسر المزاج الوجداني وتراجع الشغف، مما يتطلب دعماً وجدانياً وإعادة تفعيل الأنشطة السارة بالتدريج.';
  }

  const narrativeText = `
أظهر الفحص السريري الدقيق استناداً إلى المعايير الكاملة غير المختزلة لمقاييس الاكتئاب والتوتر المعتمدة دولياً، بلوغ الدرجة الخام الإجمالية للأعراض نسبة ${rawCombinedScore}%. 
وعند إخضاع هذه الدرجة للمعايرة البيئية الديموغرافية لسياق المستفيد (${demographics.name}، العمر ${demographics.age} سنة) والمقيم في (${demographics.district} - ${demographics.city})، تم رصد معامل إجهاد بيئي ومحفزات محيطة بنسبة (${envModifier > 0 ? '+' : ''}${envModifier}%).
وبناءً على هذه الموازنة، استقرت الدرجة السريرية المعايرة عند ${calibratedScore}% [${severityLabel}].

${domainCommentary}

تشير القراءة الإحصائية إلى أن جزءاً جوهرياً من العوارض المرصودة هو رد فعل تكيفي مفهوم ومعتاد للضغوط المادية، الاجتماعية، والبيئية المحيطة، وتخفيف هذه الضغوط بالتزامن مع خطوات الرعاية الذاتية سيسهم بشكل مباشر في استعادة التوازن النفسي.
  `.trim();

  return {
    id: `eval_${Date.now()}`,
    timestamp: new Date().toLocaleDateString('ar-EG', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    demographics,
    responses,
    scores: {
      ...(demographics.usePhq9
        ? {
            phq9: {
              raw: phqRaw,
              max: phqMax,
              percentage: phqPercentage,
              severity: phqSeverity,
            },
          }
        : {}),
      ...(demographics.useBdi2
        ? {
            bdi2: {
              raw: bdiRaw,
              max: bdiMax,
              percentage: bdiPercentage,
              severity: bdiSeverity,
            },
          }
        : {}),

      ...(demographics.useDass
        ? {
            dass21: {
              raw: dassRaw,
              max: dassMax,
              percentage: dassPercentage,
              depression: dassDepression,
              anxiety: dassAnxiety,
              stress: dassStress,
              severity: dassSeverity,
            },
          }
        : {}),
      ...(demographics.useGds
        ? {
            gds15: {
              raw: gdsRaw,
              max: gdsMax,
              percentage: gdsPercentage,
              severity: gdsSeverity,
            },
          }
        : {}),
      ...(demographics.useGad7
        ? {
            gad7: {
              raw: gadRaw,
              max: gadMax,
              percentage: gadPercentage,
              severity: gadSeverity,
            },
          }
        : {}),
      ...(demographics.useIsi
        ? {
            isi: {
              raw: isiRaw,
              max: isiMax,
              percentage: isiPercentage,
              severity: isiSeverity,
            },
          }
        : {}),
      ...(demographics.usePss10
        ? {
            pss10: {
              raw: pssRaw,
              max: pssMax,
              percentage: pssPercentage,
              severity: pssSeverity,
            },
          }
        : {}),
    },
    environmentalModifier: envModifier,
    environmentalFactors,
    rawCombinedScore,
    calibratedScore,
    severityLabel,
    severityColor,
    recommendation,
    narrativeText,
    domains,
    hasSuicidalRisk,
    suicidalRiskItems,
  };
}
