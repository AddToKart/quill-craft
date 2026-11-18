import { ModelConfig, ModelType } from "@/types";
import { config } from "@/config";

export const modelConfigurations: Record<ModelType, ModelConfig> = {
  custom: {
    id: "custom",
    name: "Custom Subscription",
    provider: "custom",
    modelName: config.aiModelName,
    maxTokens: 3000,
    temperature: 0.8,
  },
  standard: {
    id: "standard",
    name: "Bypass Standard",
    provider: "openai-compatible",
    modelName: config.aiModelName,
    maxTokens: 2048,
    temperature: 0.75,
  },
  smart: {
    id: "smart",
    name: "Bypass Smart",
    provider: "openai-compatible",
    modelName: config.aiModelName,
    maxTokens: 3072,
    temperature: 0.85,
  },
  pro: {
    id: "pro",
    name: "ZeroGPT Shield Max",
    provider: "openai-compatible",
    modelName: config.aiModelName,
    maxTokens: 4096,
    temperature: 0.9,
  },
};

export const getModelConfig = (modelType: ModelType): ModelConfig => {
  return modelConfigurations[modelType] || modelConfigurations.custom;
};
