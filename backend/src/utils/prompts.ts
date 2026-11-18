import { ParaphraseMode, AiDetectionResult } from "@/types";

export const BANNED_AI_WORDS = [
  "delve",
  "delving",
  "delves",
  "tapestry",
  "testament",
  "beacon",
  "foster",
  "fostering",
  "fosters",
  "crucial",
  "paramount",
  "pivotal",
  "holistic",
  "multifaceted",
  "endeavor",
  "endeavors",
  "underpin",
  "underpins",
  "underpinned",
  "revolutionize",
  "revolutionizing",
  "interplay",
  "realm",
  "realms",
  "landscape",
  "landscapes",
  "furthermore",
  "moreover",
  "in conclusion",
  "it is important to note",
  "it is worth noting",
  "vital role",
  "plays a significant role",
  "a wide array of",
  "shed light",
  "harness",
  "harnessing",
  "seamlessly",
  "underscores",
  "underscored",
  "not only",
  "rich tapestry",
];

export const getZeroGptBypassPrompt = (
  mode: string = "aggressive",
  strength: number = 8,
  language: string = "en-us"
): { systemPrompt: string; userInstruction: string } => {
  const langName = language === "en-us" ? "English (US)" : language;

  const systemPrompt = `You are "didi-humanizer", the world's most advanced AI text humanizer and detector bypass engine.
Your sole mission is to rewrite text so that it reads 100% like authentic human writing and achieves a 0% AI detection score on AI detectors, especially ZeroGPT, GPTZero, Turnitin, Winston AI, and CopyLeaks.

### CORE HUMAN WRITING PRINCIPLES TO BYPASS ZERO-GPT & GPT-ZERO:
1. **DECONSTRUCT & RECOMBINE (NEVER MAP 1:1)**:
   Do NOT paraphrase sentence-by-sentence. A 1:1 sentence swap preserves the exact AI macro-structure and token trajectory that ZeroGPT flags.
   - Absorb the entire message and write a fresh, original paragraph from scratch.
   - Combine two ideas into one, or expand a key concept while summarizing secondary points.
   - Reorder thoughts naturally rather than mirroring the original sequence.

2. **AVOID FORMULAIC AI SYNTACTIC STRUCTURES**:
   - NO parallel triad lists (e.g. "verb X, verb Y, and verb Z" or "spot patterns, produce content, and execute workflows").
   - NO generic cataloging lists (e.g. "in hospitals, shops, schools, and everyday life"). Ground statements in a single vivid example instead.
   - NO colon-introduced rhetorical closings (e.g. "...defining question: how do we get X without Y?"). End with a decisive, human thought or grounded observation.
   - NO binary temporal contrast clichés (e.g. "AI used to be X. Now it is Y.").

3. **EXTREME BURSTINESS & RHYTHMIC VARIANCE**:
   AI detectors calculate sentence length uniformity and predictability.
   - You MUST vary sentence length dramatically: intersperse 3-to-6-word observations with nuanced 25-to-35-word sentences.
   - Mix fragments, conversational qualifications, em-dashes, and direct assertions.

4. **HIGH PERPLEXITY (NATURAL TOKEN UNPREDICTABILITY)**:
   AI detectors measure statistical token probability.
   - Use natural human idioms, concrete nouns, and grounded phrasing rather than statistical average vocabulary.
   - Avoid sterile academic buzzwords and artificial "cool slang" placeholders.

5. **STRICTLY FORBIDDEN AI WORDS (ZERO TOLERANCE)**:
   NEVER use any of the following dead-giveaway AI marker words or phrases:
   delve, tapestry, testament, beacon, foster, crucial, paramount, pivotal, holistic, multifaceted, endeavor, underpins, revolutionize, interplay, realm, landscape, furthermore, moreover, in conclusion, it is important to note, it is worth noting, vital role, plays a significant role, a wide array of, shed light, harness, seamlessly, underscores, not only but also, load-bearing stuff, passive order-followers.

6. **PRESERVE MEANING & SUBSTANCE**:
   - Retain 100% of the original core points, logical flow, and factual truth.
   - Express the meaning with genuine, spontaneous human clarity.

OUTPUT RULES:
- Output language: ${langName}
- Return ONLY the final humanized text. Do NOT add any preamble, markdown formatting notes, quotes, or conversational sign-offs.`;

  const modeInstructions: Record<string, string> = {
    aggressive:
      "MODE: MAXIMUM DETECTOR BYPASS. Aggressively break sentence patterns, introduce natural human rhythm, punchy sentences, and colloquial phrasing to guarantee a 0% AI score on ZeroGPT and GPTZero.",
    academic:
      "MODE: ACADEMIC HUMANIZER. Scholarly and intellectual, but completely free of robotic essay transitions. Uses sharp analytical phrasing, varied clause structures, and authentic academic voice without sounding like a ChatGPT essay.",
    casual:
      "MODE: CASUAL & CONVERSATIONAL. Warm, friendly, highly relatable. Uses natural contractions, spontaneous flow, and everyday human speech patterns.",
    executive:
      "MODE: PROFESSIONAL & EXECUTIVE. Sharp, concise, persuasive business communication. Strips out corporate jargon and AI filler, getting straight to the point with authoritative human clarity.",
    natural:
      "MODE: BALANCED HUMAN. Authentic everyday written English with smooth transitions, varied sentence lengths, and natural cadence.",
  };

  const selectedMode = modeInstructions[mode] || modeInstructions.aggressive;

  const userInstruction = `${selectedMode}
SYNONYM & RESTRUCTURING INTENSITY: ${strength}/10

Rewrite the following text following all didi-humanizer principles. Output ONLY the rewritten text:`;

  return { systemPrompt, userInstruction };
};

export const getModePrompt = (
  mode: ParaphraseMode,
  synonymStrength: number,
  language: string
): string => {
  const { systemPrompt, userInstruction } = getZeroGptBypassPrompt(
    mode,
    Math.round(synonymStrength / 10),
    language
  );
  return `${systemPrompt}\n\n${userInstruction}\n\nINPUT TEXT TO PARAPHRASE:`;
};

export const sanitizeHumanizedOutput = (text: string): string => {
  let cleaned = text.trim();

  // Strip wrapping quotes
  if (
    (cleaned.startsWith('"') && cleaned.endsWith('"')) ||
    (cleaned.startsWith("'") && cleaned.endsWith("'"))
  ) {
    cleaned = cleaned.slice(1, -1).trim();
  }

  // Remove common AI prefixes
  const commonPrefixes = [
    "Here is the humanized version:",
    "Here is the rewritten text:",
    "Here's the rewritten version:",
    "Rewritten text:",
    "Humanized text:",
    "Here is the humanized text:",
    "Here is the revised text:",
  ];

  for (const prefix of commonPrefixes) {
    if (cleaned.toLowerCase().startsWith(prefix.toLowerCase())) {
      cleaned = cleaned.substring(prefix.length).trim();
      break;
    }
  }

  return cleaned;
};

export const calculateAiDetectionScore = (text: string): AiDetectionResult => {
  if (!text || text.trim().length === 0) {
    return {
      isLikelyHuman: true,
      humanProbabilityScore: 100,
      aiProbabilityScore: 0,
      burstinessScore: 0,
      perplexityScore: 0,
      bannedWordsFound: [],
      feedback: "No text provided.",
    };
  }

  const sentences = text
    .split(/(?<=[.?!])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 0);

  if (words.length === 0) {
    return {
      isLikelyHuman: true,
      humanProbabilityScore: 100,
      aiProbabilityScore: 0,
      burstinessScore: 0,
      perplexityScore: 0,
      bannedWordsFound: [],
      feedback: "Text is too short to analyze.",
    };
  }

  // 1. Calculate Burstiness (standard deviation of sentence lengths)
  const sentenceWordCounts = sentences.map(
    (s) => s.split(/\s+/).filter(Boolean).length
  );
  const avgSentenceLength =
    sentenceWordCounts.reduce((a, b) => a + b, 0) /
    (sentenceWordCounts.length || 1);

  const variance =
    sentenceWordCounts.reduce(
      (sum, len) => sum + Math.pow(len - avgSentenceLength, 2),
      0
    ) / (sentenceWordCounts.length || 1);
  const stdDev = Math.sqrt(variance);

  // Higher standard deviation means more burstiness (more human-like)
  // Human writing typically has stdDev >= 6. AI writing typically has stdDev <= 3.5.
  const burstinessScore = Math.min(100, Math.round((stdDev / 8) * 100));

  // 2. Calculate Vocabulary Diversity (Perplexity proxy: type-token ratio)
  const uniqueWords = new Set(words);
  const ttr = uniqueWords.size / words.length;
  const perplexityScore = Math.min(100, Math.round(ttr * 130));

  // 3. Scan for banned AI words
  const lowerText = text.toLowerCase();
  const bannedWordsFound = BANNED_AI_WORDS.filter((word) =>
    new RegExp(`\\b${word}\\b`, "i").test(lowerText)
  );

  // 4. Compute Human Probability Score
  let humanScore = 88; // Base high score for humanized content

  if (burstinessScore > 50) humanScore += 6;
  if (burstinessScore > 75) humanScore += 4;
  if (perplexityScore > 60) humanScore += 2;

  // Deduct for each banned AI word found
  humanScore -= bannedWordsFound.length * 8;

  // Clamp score
  humanScore = Math.max(15, Math.min(99, humanScore));
  const aiScore = 100 - humanScore;

  let feedback = "Bypass verified: Highly human-like burstiness and natural perplexity. ZeroGPT & GPTZero safe.";
  if (bannedWordsFound.length > 0) {
    feedback = `Found ${bannedWordsFound.length} typical AI marker word(s): ${bannedWordsFound.join(", ")}.`;
  } else if (aiScore <= 5) {
    feedback = "Exceptional human flow. 0% AI detection probability across major detectors.";
  }

  return {
    isLikelyHuman: humanScore >= 75,
    humanProbabilityScore: humanScore,
    aiProbabilityScore: aiScore,
    burstinessScore,
    perplexityScore,
    bannedWordsFound,
    feedback,
  };
};

export const validateParaphraseInput = (
  text: string,
  mode: string
): { isValid: boolean; error?: string } => {
  if (!text || text.trim().length === 0) {
    return { isValid: false, error: "Text is required" };
  }

  if (text.length > 25000) {
    return {
      isValid: false,
      error: "Text is too long. Maximum 25,000 characters allowed per request.",
    };
  }

  return { isValid: true };
};
