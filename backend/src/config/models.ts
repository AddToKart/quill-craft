import { ModelConfig, ModelType } from "@/types";

export const modelConfigurations: Record<ModelType, ModelConfig> = {
  lite: {
    id: "lite",
    name: "OpenAI GPT OSS 20B",
    provider: "openrouter",
    modelName: "openai/gpt-oss-20b:free",
    maxTokens: 1024,
    temperature: 0.3, // Lower temperature for more consistent, focused paraphrasing
  },
  normal: {
    id: "normal",
    name: "GLM-4.5 Air",
    provider: "openrouter",
    modelName: "z-ai/glm-4.5-air:free",
    maxTokens: 2048,
    temperature: 0.4, // Balanced creativity and consistency
  },
  heavy: {
    id: "heavy",
    name: "Gemini 2.5 Flash",
    provider: "gemini",
    modelName: "gemini-2.0-flash-exp",
    maxTokens: 3072,
    temperature: 0.5, // More creative for complex paraphrasing
  },
  pro: {
    id: "pro",
    name: "Gemini 2.5 Flash Pro",
    provider: "gemini",
    modelName: "gemini-2.0-flash-exp",
    maxTokens: 4096,
    temperature: 0.6, // Highest creativity for premium quality
  },
};

export const getModelConfig = (modelType: ModelType): ModelConfig => {
  const config = modelConfigurations[modelType];
  if (!config) {
    throw new Error(`Unsupported model type: ${modelType}`);
  }
  return config;
};
