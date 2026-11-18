import axios, { AxiosResponse } from "axios";
import { config } from "@/config";
import { CustomModelConfig } from "@/types";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ChatCompletionResponse {
  choices?: Array<{
    message?: {
      role?: string;
      content?: any;
      reasoning_content?: string;
    };
    text?: string;
    delta?: {
      content?: string;
    };
    finish_reason?: string;
  }>;
  content?: any;
  message?: string;
  text?: string;
}

function extractContentFromResponse(data: any): string {
  if (!data) return "";

  // 1. Standard OpenAI chat completion: choices[0].message.content
  const choice = data.choices?.[0];
  if (choice) {
    if (typeof choice.message?.content === "string" && choice.message.content.trim()) {
      return choice.message.content.trim();
    }

    // Content array (OpenAI / Anthropic multi-part standard)
    if (Array.isArray(choice.message?.content)) {
      const text = choice.message.content
        .map((part: any) =>
          typeof part === "string" ? part : part?.text || part?.content || ""
        )
        .join("")
        .trim();
      if (text) return text;
    }

    // DeepSeek-R1 / thinking models reasoning content fallback
    if (
      typeof choice.message?.reasoning_content === "string" &&
      choice.message.reasoning_content.trim()
    ) {
      return choice.message.reasoning_content.trim();
    }

    // Legacy completion text
    if (typeof choice.text === "string" && choice.text.trim()) {
      return choice.text.trim();
    }

    // Streaming delta content
    if (typeof choice.delta?.content === "string" && choice.delta.content.trim()) {
      return choice.delta.content.trim();
    }
  }

  // 2. Anthropic style data.content array: [{ type: "text", text: "..." }]
  if (Array.isArray(data.content)) {
    const text = data.content
      .map((part: any) =>
        typeof part === "string" ? part : part?.text || part?.content || ""
      )
      .join("")
      .trim();
    if (text) return text;
  }

  // 3. Direct message or text string
  if (typeof data.content === "string" && data.content.trim()) {
    return data.content.trim();
  }
  if (typeof data.message === "string" && data.message.trim()) {
    return data.message.trim();
  }
  if (typeof data.text === "string" && data.text.trim()) {
    return data.text.trim();
  }

  return "";
}

export class AIClient {
  private defaultBaseUrl: string;
  private defaultModelName: string;
  private defaultApiKey: string;

  constructor() {
    this.defaultBaseUrl = config.aiBaseUrl;
    this.defaultModelName = config.aiModelName;
    this.defaultApiKey = config.aiApiKey;
  }

  private resolveEndpoint(baseUrl: string): string {
    const cleaned = baseUrl.trim().replace(/\/+$/, "");
    if (cleaned.endsWith("/chat/completions")) {
      return cleaned;
    }
    return `${cleaned}/chat/completions`;
  }

  async generateChat(
    messages: ChatMessage[],
    customConfig?: CustomModelConfig,
    options?: {
      temperature?: number;
      maxTokens?: number;
      presencePenalty?: number;
      frequencyPenalty?: number;
    }
  ): Promise<{ content: string; modelUsed: string }> {
    const baseUrl = customConfig?.baseUrl?.trim() || this.defaultBaseUrl;
    const modelName = customConfig?.modelName?.trim() || this.defaultModelName;
    const apiKey = customConfig?.apiKey?.trim() || this.defaultApiKey;

    if (!apiKey) {
      throw new Error(
        "No API key provided. Please configure your API Key in the web UI Settings (gear icon in header) or in backend/.env (AI_API_KEY)."
      );
    }

    const endpoint = this.resolveEndpoint(baseUrl);

    const payload: Record<string, any> = {
      model: modelName,
      messages,
      temperature: options?.temperature ?? 0.7,
      max_tokens: options?.maxTokens ?? 2048,
    };

    // Only attach penalty parameters when explicitly provided (some providers reject them)
    if (options?.presencePenalty !== undefined) {
      payload.presence_penalty = options.presencePenalty;
    }
    if (options?.frequencyPenalty !== undefined) {
      payload.frequency_penalty = options.frequencyPenalty;
    }

    try {
      const response: AxiosResponse<ChatCompletionResponse> = await axios.post(
        endpoint,
        payload,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://didihumanizer.app",
            "X-Title": "didi-humanizer",
          },
          timeout: 45000,
        }
      );

      let extracted = extractContentFromResponse(response.data);

      // If choices were returned and HTTP 200 succeeded, the model is connected
      if (!extracted && response.data?.choices && response.data.choices.length > 0) {
        const choice = response.data.choices[0];
        console.warn(
          "[didi-humanizer] Choice present without textual content:",
          JSON.stringify(choice)
        );
        if (choice.finish_reason === "stop" || choice.finish_reason === "length") {
          extracted = "connected";
        }
      }

      if (!extracted) {
        console.error(
          "[didi-humanizer] Empty completion raw response:",
          JSON.stringify(response.data)
        );
        throw new Error("Received empty completion from AI provider");
      }

      return {
        content: extracted.trim(),
        modelUsed: modelName,
      };
    } catch (error: any) {
      console.error(
        "[didi-humanizer] AI request error:",
        error.response?.data || error.message
      );

      if (error.response?.status === 401) {
        throw new Error("Invalid API key or unauthorized access to AI provider.");
      } else if (error.response?.status === 404) {
        throw new Error(
          `Model "${modelName}" or endpoint not found at ${endpoint}. Please verify your Base URL and Model name.`
        );
      } else if (error.response?.status === 429) {
        throw new Error("Rate limit or quota exceeded on your AI subscription.");
      } else if (error.code === "ECONNREFUSED" || error.code === "ENOTFOUND") {
        throw new Error(`Could not connect to AI Base URL at ${baseUrl}.`);
      }

      const backendMsg =
        error.response?.data?.error?.message ||
        error.response?.data?.message ||
        error.message;

      throw new Error(`AI Provider Error: ${backendMsg}`);
    }
  }

  async testConnection(customConfig?: CustomModelConfig): Promise<{
    success: boolean;
    message: string;
    model: string;
    latencyMs: number;
  }> {
    const start = Date.now();
    const result = await this.generateChat(
      [
        {
          role: "user",
          content: "Hello, reply with the single word: connected",
        },
      ],
      customConfig,
      { maxTokens: 150, temperature: 0.1 }
    );
    const latencyMs = Date.now() - start;

    return {
      success: true,
      message: `Successfully connected to ${result.modelUsed}!`,
      model: result.modelUsed,
      latencyMs,
    };
  }
}

export const aiClient = new AIClient();
