import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || "development",

  // Custom AI Subscription (OpenAI-compatible: OpenAI, OpenRouter, DeepSeek, Groq, Ollama, vLLM, etc.)
  aiBaseUrl:
    process.env.AI_BASE_URL ||
    process.env.OPENROUTER_BASE_URL ||
    "https://api.openai.com/v1",
  aiModelName:
    process.env.AI_MODEL_NAME ||
    process.env.OPENROUTER_MODEL ||
    "gpt-4o-mini",
  aiApiKey:
    process.env.AI_API_KEY ||
    process.env.OPENROUTER_API_KEY ||
    "",

  // CORS
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",

  // Rate Limiting
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"),
  rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "200"),
};

// Validate configuration safely without hard crashing
export const validateConfig = () => {
  if (!config.aiApiKey) {
    console.warn(
      "⚠️ [didi-humanizer] AI_API_KEY is not set in backend/.env. Requests can provide custom Base URL/Model/API Key directly from the UI or .env."
    );
  }
};

export default config;
