import { Question } from '../types/clinical';

/**
 * Normalizes Arabic text for flexible matching:
 * - Removes tatweel, diacritics (harakat)
 * - Normalizes alefs (أ, إ, آ -> ا)
 * - Normalizes yaa (ى -> ي) and taa marbuta (ة -> ه)
 * - Removes non-alphanumeric punctuation
 */
export function normalizeArabic(text: string): string {
  return text
    .replace(/[\u064B-\u065F\u0670\u0640]/g, '') // remove harakat and tatweel
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/[^\w\s\u0600-\u06FF]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

export interface MatchResult {
  choiceIndex: number;
  confidence: number;
  matchedText: string;
  reason: string;
}

/**
 * Matches spoken Arabic text against a question's choices.
 */
export function matchSpeechToChoice(
  transcript: string,
  question: Question
): MatchResult | null {
  const normSpeech = normalizeArabic(transcript);
  if (!normSpeech) return null;

  const choices = question.choices.map((c) =>
    typeof c === 'string' ? c : c.text
  );

  // 1. Direct Ordinal / Number Intent
  const ordinals: Record<string, number> = {
    'الاول': 0,
    'الخيار الاول': 0,
    'رقم واحد': 0,
    'واحد': 0,
    'صفر': 0,
    'الصفر': 0,
    'البديل الاول': 0,

    'الثاني': 1,
    'الخيار الثاني': 1,
    'رقم اثنين': 1,
    'اثنين': 1,
    'تنين': 1,
    'البديل الثاني': 1,

    'الثالث': 2,
    'الخيار الثالث': 2,
    'رقم ثلاثه': 2,
    'ثلاثه': 2,
    'تلاته': 2,
    'البديل الثالث': 2,

    'الرابع': 3,
    'الخيار الرابع': 3,
    'رقم اربعه': 3,
    'اربعه': 3,
    'البديل الرابع': 3,
  };

  for (const [phrase, idx] of Object.entries(ordinals)) {
    if (normSpeech === phrase || normSpeech.includes(phrase)) {
      if (idx < choices.length) {
        return {
          choiceIndex: idx,
          confidence: 0.95,
          matchedText: choices[idx],
          reason: `التعرف على الترتيب: ${phrase}`,
        };
      }
    }
  }

  // 2. Boolean Yes / No Matching (especially for GDS-15)
  if (choices.length === 2) {
    const isFirstYes = normalizeArabic(choices[0]).startsWith('نعم');
    const isFirstNo = normalizeArabic(choices[0]).startsWith('لا');

    const yesKeywords = ['نعم', 'ايوه', 'ايوة', 'صحيح', 'اجل', 'اه', 'موافق', 'حاصل', 'بالتاكيد'];
    const noKeywords = ['لا', 'كلا', 'ابدا', 'مش حاصل', 'غير صحيح', 'لا طبعا', 'مافيش', 'مفيش'];

    if (yesKeywords.some((k) => normSpeech.includes(k))) {
      const idx = isFirstYes ? 0 : 1;
      return {
        choiceIndex: idx,
        confidence: 0.92,
        matchedText: choices[idx],
        reason: 'إجابة بالإيجاب (نعم)',
      };
    }

    if (noKeywords.some((k) => normSpeech.includes(k))) {
      const idx = isFirstNo ? 0 : 1;
      return {
        choiceIndex: idx,
        confidence: 0.92,
        matchedText: choices[idx],
        reason: 'إجابة بالنفي (لا)',
      };
    }
  }

  // 3. Common Frequency & Severity Keywords (PHQ-9 and DASS-21)
  const frequencyMap: { keywords: string[]; targetIdx: number }[] = [
    {
      keywords: ['ابدا', 'اطلاقا', 'نهائيا', 'ولا يوم', 'لم ينطبق', 'مفيش', 'مافيش', 'غير موجود', 'لا اشعر'],
      targetIdx: 0,
    },
    {
      keywords: ['لعده ايام', 'ايام قليله', 'يومين', 'بعض الوقت', 'قليلا', 'بسيط', 'احيانا', 'مش كتير', 'خفيف'],
      targetIdx: 1,
    },
    {
      keywords: ['اكثر من نصف الايام', 'نصف الايام', 'اغلب الايام', 'معظم الايام', 'كتير', 'بدرجه كبيره', 'جزء كبير'],
      targetIdx: 2,
    },
    {
      keywords: ['تقريبا كل يوم', 'كل يوم', 'يوميا', 'طوال الوقت', 'تماما', 'معظم الوقت', 'دايما', 'مستمر'],
      targetIdx: 3,
    },
  ];

  for (const group of frequencyMap) {
    if (group.keywords.some((kw) => normSpeech.includes(kw))) {
      const target = Math.min(group.targetIdx, choices.length - 1);
      return {
        choiceIndex: target,
        confidence: 0.88,
        matchedText: choices[target],
        reason: 'تطابق تعبيرات التكرار والشدة',
      };
    }
  }

  // 4. Token Overlap & Substring Match against each choice statement (Crucial for BDI-II)
  const speechWords = normSpeech.split(/\s+/).filter((w) => w.length > 2);
  let bestIdx = -1;
  let maxScore = 0;

  choices.forEach((choice, idx) => {
    const normChoice = normalizeArabic(choice);
    // Direct substring match
    if (normChoice.includes(normSpeech) || normSpeech.includes(normChoice)) {
      maxScore = 10;
      bestIdx = idx;
      return;
    }

    // Word overlap count
    const choiceWords = new Set(normChoice.split(/\s+/).filter((w) => w.length > 2));
    let matches = 0;
    speechWords.forEach((word) => {
      if (choiceWords.has(word)) {
        matches++;
      } else {
        // check partial root
        for (const cw of choiceWords) {
          if (cw.includes(word) || word.includes(cw)) {
            matches += 0.5;
            break;
          }
        }
      }
    });

    const score = matches / Math.max(1, speechWords.length);
    if (score > maxScore && score >= 0.25) {
      maxScore = score;
      bestIdx = idx;
    }
  });

  if (bestIdx !== -1) {
    return {
      choiceIndex: bestIdx,
      confidence: Math.min(0.9, 0.5 + maxScore * 0.4),
      matchedText: choices[bestIdx],
      reason: 'تطابق نصي دلالي مع صياغة البديل',
    };
  }

  return null;
}
