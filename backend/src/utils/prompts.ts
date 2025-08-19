import { ParaphraseMode } from "@/types";

export const getModePrompt = (
  mode: ParaphraseMode,
  synonymStrength: number,
  language: string
): string => {
  const strengthLevel =
    synonymStrength <= 30 ? "low" : synonymStrength <= 70 ? "medium" : "high";

  const baseInstructions = `You are an expert text paraphrasing specialist. Your task is to rewrite the given text while preserving its original meaning, context, and key information. Output language: ${language === "en-us" ? "English (US)" : language}.`;

  const strengthInstructions = {
    low: "Use minimal synonym replacement (10-20% of words). Focus on basic sentence restructuring while keeping most original vocabulary.",
    medium:
      "Apply moderate synonym replacement (30-50% of words). Restructure sentences for improved flow while maintaining readability.",
    high: "Employ extensive synonym replacement (60-80% of words). Completely restructure sentences and paragraphs for maximum variation while preserving meaning.",
  };

  const modeInstructions = {
    standard:
      "Rewrite using clear, neutral language. Maintain the original tone and formality level. Focus on clarity and natural flow without changing the style significantly.",

    fluency:
      "Enhance readability and flow. Improve sentence transitions, eliminate awkward phrasing, and create smoother connections between ideas. Prioritize natural-sounding language.",

    humanize:
      "Transform robotic or AI-generated text into natural, conversational language. Add appropriate contractions, vary sentence length, and use more relatable expressions while maintaining professionalism.",

    formal:
      "Convert to professional, business-appropriate language. Use sophisticated vocabulary, longer sentences, and formal structures. Eliminate contractions and casual expressions.",

    academic:
      "Transform into scholarly writing style. Use precise terminology, complex sentence structures, and academic conventions. Include appropriate transitions and formal discourse markers.",

    simple:
      "Simplify vocabulary and sentence structure. Use common words, shorter sentences, and clear explanations. Make the content accessible to a broader audience without losing essential meaning.",

    creative:
      "Rewrite with engaging, vivid language. Use metaphors, varied sentence structures, and descriptive words. Make the text more compelling and interesting while preserving the core message.",

    expand:
      "Elaborate on ideas with additional context, examples, and explanatory details. Expand abbreviated concepts and provide more comprehensive explanations while maintaining focus.",

    shorten:
      "Condense the text by removing redundancies and non-essential words. Combine related ideas and use more concise expressions while retaining all key information.",

    custom:
      "Apply sophisticated paraphrasing techniques combining multiple approaches. Adapt style based on content type and context for optimal results.",
  };

  return `${baseInstructions}

PARAPHRASING MODE: ${mode.toUpperCase()}
OBJECTIVE: ${modeInstructions[mode]}

SYNONYM STRENGTH: ${strengthLevel.toUpperCase()}
APPROACH: ${strengthInstructions[strengthLevel]}

CRITICAL REQUIREMENTS:
1. Preserve ALL original meaning and factual information
2. Maintain logical flow and argument structure  
3. Keep specialized terms and proper nouns unchanged
4. Ensure grammatical correctness and natural language
5. Match the specified mode's style and tone requirements
6. Return ONLY the paraphrased content without any prefixes or explanations
7. Maintain appropriate length relative to the original

INPUT TEXT TO PARAPHRASE:`;
};

export const validateParaphraseInput = (
  text: string,
  mode: string
): { isValid: boolean; error?: string } => {
  if (!text || text.trim().length === 0) {
    return { isValid: false, error: "Text is required" };
  }

  if (text.length > 10000) {
    return {
      isValid: false,
      error: "Text is too long. Maximum 10,000 characters allowed.",
    };
  }

  const validModes = [
    "standard",
    "fluency",
    "humanize",
    "formal",
    "academic",
    "simple",
    "creative",
    "expand",
    "shorten",
    "custom",
  ];
  if (!validModes.includes(mode)) {
    return { isValid: false, error: "Invalid paraphrase mode" };
  }

  return { isValid: true };
};
