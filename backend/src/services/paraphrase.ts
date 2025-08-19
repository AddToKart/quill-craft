import { GeminiClient } from "@/services/gemini";
import { OpenRouterClient } from "@/services/openrouter";
import { getModelConfig } from "@/config/models";
import { getModePrompt, validateParaphraseInput } from "@/utils/prompts";
import { ParaphraseRequest, ParaphraseResponse, ModelType } from "@/types";

export class ParaphraseService {
  private geminiClient: GeminiClient;
  private openrouterClient: OpenRouterClient;

  constructor() {
    this.geminiClient = new GeminiClient();
    this.openrouterClient = new OpenRouterClient();
  }

  async paraphraseText(
    request: ParaphraseRequest
  ): Promise<ParaphraseResponse> {
    const startTime = Date.now();

    try {
      // Validate input
      const validation = validateParaphraseInput(request.text, request.mode);
      if (!validation.isValid) {
        return {
          success: false,
          error: {
            message: validation.error!,
            code: "VALIDATION_ERROR",
          },
        };
      }

      // Get model configuration
      const modelConfig = getModelConfig(request.model as ModelType);

      // Optimize temperature based on mode for better results
      let optimizedTemperature = modelConfig.temperature;
      if (request.mode === "formal" || request.mode === "academic") {
        optimizedTemperature = Math.max(0.2, modelConfig.temperature - 0.2); // More conservative for formal modes
      } else if (request.mode === "creative") {
        optimizedTemperature = Math.min(0.9, modelConfig.temperature + 0.2); // More creative for creative mode
      } else if (request.mode === "simple") {
        optimizedTemperature = Math.max(0.1, modelConfig.temperature - 0.3); // Very consistent for simple mode
      }

      // Generate prompt
      const prompt = getModePrompt(
        request.mode as any,
        request.synonymStrength,
        request.language
      );

      const fullPrompt = `${prompt}\n\n${request.text}`;

      // Generate paraphrased content
      let paraphrasedText: string;

      if (modelConfig.provider === "gemini") {
        paraphrasedText = await this.geminiClient.generateContent(
          fullPrompt,
          modelConfig.modelName,
          modelConfig.maxTokens,
          optimizedTemperature
        );
      } else {
        paraphrasedText = await this.openrouterClient.generateContent(
          fullPrompt,
          modelConfig.modelName,
          modelConfig.maxTokens,
          optimizedTemperature
        );
      }

      // Clean up and validate the response
      paraphrasedText = this.cleanupResponse(paraphrasedText);

      // Validate the paraphrased result
      const validationResult = this.validateParaphrasedResult(
        request.text,
        paraphrasedText,
        request.mode
      );
      if (!validationResult.isValid) {
        return {
          success: false,
          error: {
            message: validationResult.error!,
            code: "PARAPHRASE_QUALITY_ERROR",
          },
        };
      }

      const processingTime = Date.now() - startTime;

      return {
        success: true,
        data: {
          originalText: request.text,
          paraphrasedText,
          model: modelConfig.name,
          mode: request.mode,
          processingTime,
        },
      };
    } catch (error: any) {
      console.error("Paraphrase service error:", error);

      return {
        success: false,
        error: {
          message: error.message || "An unexpected error occurred",
          code: "PARAPHRASE_ERROR",
        },
      };
    }
  }

  private cleanupResponse(text: string): string {
    // Remove common prefixes that AI models might add
    const prefixesToRemove = [
      "Here is the rewritten text:",
      "Here is the paraphrased text:",
      "Here's the rewritten version:",
      "Here's the paraphrased version:",
      "Rewritten text:",
      "Paraphrased text:",
      "Here is the text rewritten:",
      "The rewritten text is:",
    ];

    let cleanText = text.trim();

    for (const prefix of prefixesToRemove) {
      if (cleanText.toLowerCase().startsWith(prefix.toLowerCase())) {
        cleanText = cleanText.substring(prefix.length).trim();
        break;
      }
    }

    // Remove quotes if the entire text is wrapped in them
    if (cleanText.startsWith('"') && cleanText.endsWith('"')) {
      cleanText = cleanText.slice(1, -1);
    }

    return cleanText.trim();
  }

  private validateParaphrasedResult(
    originalText: string,
    paraphrasedText: string,
    mode: string
  ): { isValid: boolean; error?: string } {
    // Check if paraphrased text is too similar to original (potential failure)
    if (paraphrasedText.toLowerCase() === originalText.toLowerCase()) {
      return {
        isValid: false,
        error: "Paraphrasing failed: output is identical to input",
      };
    }

    // Check if paraphrased text is too short (likely truncated)
    if (paraphrasedText.length < originalText.length * 0.3) {
      return {
        isValid: false,
        error: "Paraphrasing failed: output is too short",
      };
    }

    // Check for mode-specific requirements
    if (mode === "expand" && paraphrasedText.length < originalText.length) {
      return {
        isValid: false,
        error: "Expansion mode failed: output should be longer than input",
      };
    }

    if (mode === "shorten" && paraphrasedText.length > originalText.length) {
      return {
        isValid: false,
        error: "Shortening mode failed: output should be shorter than input",
      };
    }

    // Check if output contains obvious AI prefixes (cleanup failed)
    const unwantedPrefixes = [
      "here is the",
      "here's the",
      "the rewritten",
      "the paraphrased",
      "below is",
    ];

    for (const prefix of unwantedPrefixes) {
      if (paraphrasedText.toLowerCase().startsWith(prefix)) {
        return {
          isValid: false,
          error: "Paraphrasing failed: output contains unwanted AI prefix",
        };
      }
    }

    return { isValid: true };
  }

  async healthCheck(): Promise<{ gemini: boolean; openrouter: boolean }> {
    const results = {
      gemini: false,
      openrouter: false,
    };

    try {
      await this.geminiClient.generateContent(
        "Test prompt for health check",
        "gemini-2.0-flash-exp",
        50,
        0.1
      );
      results.gemini = true;
    } catch (error) {
      console.error("Gemini health check failed:", error);
    }

    try {
      await this.openrouterClient.generateContent(
        "Test prompt for health check",
        "openai/gpt-oss-20b:free",
        50,
        0.1
      );
      results.openrouter = true;
    } catch (error) {
      console.error("OpenRouter health check failed:", error);
    }

    return results;
  }
}
