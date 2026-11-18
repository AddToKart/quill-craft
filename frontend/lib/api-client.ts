// API configuration and client for didi-humanizer backend
const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://your-backend-domain.com/api"
    : "http://localhost:3001/api";

export interface CustomModelConfig {
  baseUrl?: string;
  modelName?: string;
  apiKey?: string;
}

export interface AiDetectionResult {
  isLikelyHuman: boolean;
  humanProbabilityScore: number;
  aiProbabilityScore: number;
  burstinessScore: number;
  perplexityScore: number;
  bannedWordsFound: string[];
  feedback: string;
}

export interface HumanizeRequest {
  text: string;
  mode?: string;
  strength?: number;
  language?: string;
  customConfig?: CustomModelConfig;
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

export interface ParaphraseRequest {
  text: string;
  mode: string;
  language: string;
  synonymStrength: number;
  model: string;
  customConfig?: CustomModelConfig;
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
    details?: any;
  };
}

export interface ApiError extends Error {
  code?: string;
  status?: number;
}

const STORAGE_KEY = "didi_ai_config";

export class DidiHumanizerAPI {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  getStoredConfig(): CustomModelConfig {
    if (typeof window === "undefined") return {};
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }

  saveConfig(config: CustomModelConfig): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (e) {
      console.error("Failed to save credentials to localStorage", e);
    }
  }

  async humanizeText(request: HumanizeRequest): Promise<HumanizeResponse> {
    try {
      const activeConfig = {
        ...this.getStoredConfig(),
        ...request.customConfig,
      };

      const payload = {
        ...request,
        customConfig:
          activeConfig.apiKey || activeConfig.baseUrl || activeConfig.modelName
            ? activeConfig
            : undefined,
      };

      const response = await fetch(`${this.baseUrl}/humanize`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data: HumanizeResponse = await response.json();

      if (!response.ok) {
        const error = new Error(
          data.error?.message || "Humanization failed"
        ) as ApiError;
        error.code = data.error?.code;
        error.status = response.status;
        throw error;
      }

      return data;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new Error(
          "Unable to connect to didi-humanizer backend. Please ensure the server is running on port 3001."
        );
      }
      throw error;
    }
  }

  async paraphraseText(
    request: ParaphraseRequest
  ): Promise<ParaphraseResponse> {
    try {
      const activeConfig = {
        ...this.getStoredConfig(),
        ...request.customConfig,
      };

      const payload = {
        ...request,
        customConfig:
          activeConfig.apiKey || activeConfig.baseUrl || activeConfig.modelName
            ? activeConfig
            : undefined,
      };

      const response = await fetch(`${this.baseUrl}/paraphrase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data: ParaphraseResponse = await response.json();

      if (!response.ok) {
        const error = new Error(
          data.error?.message || "Paraphrase failed"
        ) as ApiError;
        error.code = data.error?.code;
        error.status = response.status;
        throw error;
      }

      return data;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new Error(
          "Unable to connect to didi-humanizer backend. Please ensure the server is running on port 3001."
        );
      }
      throw error;
    }
  }

  async detectAi(text: string): Promise<AiDetectionResult> {
    try {
      const response = await fetch(`${this.baseUrl}/detect`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error?.message || "AI detection failed");
      }
      return data.data;
    } catch (error) {
      console.error("AI detection error:", error);
      throw error;
    }
  }

  async testApiConfig(config: CustomModelConfig): Promise<any> {
    const response = await fetch(`${this.baseUrl}/config/test`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(config),
    });

    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.error?.message || "Connection test failed");
    }
    return data.data;
  }

  async checkHealth(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      return await response.json();
    } catch (error) {
      throw new Error("Health check failed");
    }
  }

  async getAvailableModels(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/models`);
      return await response.json();
    } catch (error) {
      throw new Error("Failed to fetch available models");
    }
  }
}

// Create a singleton instance
export const apiClient = new DidiHumanizerAPI();
