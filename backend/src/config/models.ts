import { ModelConfig, ModelType } from "@/types";

export const modelConfigurations: Record<ModelType, ModelConfig> = {
  lite: {
    id: "lite",
    name: "OpenAI GPT OSS 20B",
    provider: "openrouter",
    modelName: "openai/gpt-oss-20b:free",
    maxTokens: 2048,
    temperature: 0.7,
  },
  normal: {
    id: "normal",
    name: "GLM-4.5 Air",
    provider: "openrouter",
    modelName: "z-ai/glm-4.5-air:free",
    maxTokens: 2048,
    temperature: 0.7,
  },
  heavy: {
    id: "heavy",
    name: "Gemini 2.5 Flash",
    provider: "gemini",
    modelName: "gemini-2.0-flash-exp",
    maxTokens: 4096,
    temperature: 0.7,
  },
  pro: {
    id: "pro",
    name: "Gemini 2.5 Flash Pro",
    provider: "gemini",
    modelName: "gemini-2.0-flash-exp",
    maxTokens: 8192,
    temperature: 0.5,
  },
};

export const getModelConfig = (modelType: ModelType): ModelConfig => {
  const config = modelConfigurations[modelType];
  if (!config) {
    throw new Error(`Unsupported model type: ${modelType}`);
  }
  return config;
};
