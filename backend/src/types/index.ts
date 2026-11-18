export interface CustomModelConfig {
  baseUrl?: string;
  modelName?: string;
  apiKey?: string;
}

export interface ParaphraseRequest {
  text: string;
  mode: string;
  language: string;
  synonymStrength: number;
  model: string;
  customConfig?: CustomModelConfig;
}

export interface HumanizeRequest {
  text: string;
  mode?: "aggressive" | "natural" | "academic" | "casual" | "executive" | string;
  strength?: number; // 1 - 10
  language?: string;
  customConfig?: CustomModelConfig;
}

export interface AiDetectionResult {
  isLikelyHuman: boolean;
  humanProbabilityScore: number; // e.g. 99 (99% Human)
  aiProbabilityScore: number; // e.g. 1 (1% AI)
  burstinessScore: number;
  perplexityScore: number;
  bannedWordsFound: string[];
  feedback: string;
}

export interface HumanizeResponse {
  success: boolean;
  data?: {
    originalText: string;
    humanizedText: string;
    model: string;
    mode: string;
    processingTime: number;
    detectionScore: AiDetectionResult;
  };
  error?: {
    message: string;
    code: string;
  };
}

export interface ParaphraseResponse {
  success: boolean;
  data?: {
    originalText: string;
    paraphrasedText: string;
    model: string;
    mode: string;
    processingTime: number;
    detectionScore?: AiDetectionResult;
  };
  error?: {
    message: string;
    code: string;
  };
}

export interface ModelConfig {
  id: string;
  name: string;
  provider: "custom" | "openai-compatible";
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
  | "humanize"
  | "standard"
  | "fluency"
  | "formal"
  | "academic"
  | "simple"
  | "creative"
  | "expand"
  | "shorten"
  | "custom";

export type ModelType = "custom" | "standard" | "smart" | "pro";
