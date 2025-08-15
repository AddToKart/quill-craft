// API configuration and client for QuillCraft backend
const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://your-backend-domain.com/api"
    : "http://localhost:3001/api";

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
    details?: any;
  };
}

export interface ApiError extends Error {
  code?: string;
  status?: number;
}

export class QuillCraftAPI {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async paraphraseText(
    request: ParaphraseRequest
  ): Promise<ParaphraseResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/paraphrase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
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
        // Network error - backend might be down
        throw new Error(
          "Unable to connect to paraphrasing service. Please check if the backend server is running."
        );
      }
      throw error;
    }
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
export const apiClient = new QuillCraftAPI();
