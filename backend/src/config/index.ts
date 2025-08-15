import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || "development",

  // API Keys
  geminiApiKey: process.env.GEMINI_API_KEY,
  openrouterApiKey: process.env.OPENROUTER_API_KEY,

  // CORS
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",

  // Rate Limiting
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"),
  rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100"),

  // API Endpoints
  geminiApiUrl: "https://generativelanguage.googleapis.com/v1beta/models",
  openrouterApiUrl: "https://openrouter.ai/api/v1/chat/completions",
};

// Validate required environment variables
export const validateConfig = () => {
  const requiredVars = ["GEMINI_API_KEY", "OPENROUTER_API_KEY"];

  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      throw new Error(`Missing required environment variable: ${varName}`);
    }
  }
};

export default config;
