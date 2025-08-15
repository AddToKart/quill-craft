import { ParaphraseMode } from "@/types";

export const getModePrompt = (
  mode: ParaphraseMode,
  synonymStrength: number,
  language: string
): string => {
  const strengthLevel =
    synonymStrength <= 30 ? "low" : synonymStrength <= 70 ? "medium" : "high";

  const baseInstructions = `You are a professional text paraphrasing tool. Your task is to rewrite the given text while preserving its original meaning and context. The output language should be: ${language === "en-us" ? "English (US)" : language}.`;

  const strengthInstructions = {
    low: "Make minimal changes to the text, focusing on basic restructuring while keeping most original words.",
    medium:
      "Make moderate changes, replacing some words with synonyms and restructuring sentences for better flow.",
    high: "Make significant changes, using extensive synonyms and completely restructuring sentences while preserving meaning.",
  };

  const modeInstructions = {
    standard:
      "Rewrite the text in a standard, neutral tone while maintaining clarity and readability.",
    fluency:
      "Focus on improving the flow and readability of the text. Make it sound more natural and smooth.",
    humanize:
      "Make the text sound more natural and human-like. Remove any robotic or artificial phrasing.",
    formal:
      "Rewrite the text in a formal, professional tone suitable for business or academic contexts.",
    academic:
      "Transform the text into an academic style with scholarly language and precise terminology.",
    simple:
      "Simplify the text using easier vocabulary and shorter sentences for better comprehension.",
    creative:
      "Rewrite the text with creative flair, using vivid language and engaging expressions.",
    expand:
      "Elaborate on the original text by adding more detail, context, and explanatory information.",
    shorten:
      "Condense the text while retaining all key information and meaning.",
    custom:
      "Apply advanced paraphrasing techniques tailored to the specific content and context.",
  };

  return `${baseInstructions}

Mode: ${mode.toUpperCase()}
${modeInstructions[mode]}

Synonym Replacement Level: ${strengthLevel.toUpperCase()}
${strengthInstructions[strengthLevel]}

Instructions:
1. Preserve the original meaning completely
2. Maintain the logical flow and structure
3. Keep any technical terms that are essential
4. Ensure the output is grammatically correct
5. Match the tone and formality level specified by the mode
6. Do not add any introductory phrases like "Here is the rewritten text:"
7. Return only the paraphrased content

Text to paraphrase:`;
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
