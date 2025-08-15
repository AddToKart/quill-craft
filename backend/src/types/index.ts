export interface ParaphraseRequest {
  text: string;
  mode: string;
  language: string;
  synonymStrength: number;
  model: string;
}

export interface ParaphraseResponse {
  success: boolean;
  data?: {
    originalText: string;
    paraphrasedText: string;
    model: string;
    mode: string;
    processingTime: number;
  };
  error?: {
    message: string;
    code: string;
  };
}

export interface ModelConfig {
  id: string;
  name: string;
  provider: "gemini" | "openrouter";
  modelName: string;
  maxTokens: number;
  temperature: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code: string;
    details?: any;
  };
}

export type ParaphraseMode =
  | "standard"
  | "fluency"
  | "humanize"
  | "formal"
  | "academic"
  | "simple"
  | "creative"
  | "expand"
  | "shorten"
  | "custom";

export type ModelType = "lite" | "normal" | "heavy" | "pro";
