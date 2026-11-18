import { aiClient } from "@/services/ai-client";
import {
  getModePrompt,
  sanitizeHumanizedOutput,
  calculateAiDetectionScore,
  validateParaphraseInput,
} from "@/utils/prompts";
import { ParaphraseRequest, ParaphraseResponse } from "@/types";

export class ParaphraseService {
  async paraphraseText(
    request: ParaphraseRequest
  ): Promise<ParaphraseResponse> {
    const startTime = Date.now();

    try {
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

      const prompt = getModePrompt(
        request.mode as any,
        request.synonymStrength,
        request.language
      );

      const messages = [
        {
          role: "system" as const,
          content:
            "You are didi-humanizer, an advanced text transformation and detector bypass engine. You rewrite text while maintaining high natural burstiness, variable sentence cadence, and 0% AI detection footprint.",
        },
        {
          role: "user" as const,
          content: `${prompt}\n\n${request.text}`,
        },
      ];

      const aiResult = await aiClient.generateChat(
        messages,
        request.customConfig,
        {
          temperature: 0.8,
          maxTokens: 3000,
          presencePenalty: 0.6,
          frequencyPenalty: 0.5,
        }
      );

      const cleanedText = sanitizeHumanizedOutput(aiResult.content);
      const detectionScore = calculateAiDetectionScore(cleanedText);
      const processingTime = Date.now() - startTime;

      return {
        success: true,
        data: {
          originalText: request.text,
          paraphrasedText: cleanedText,
          model: aiResult.modelUsed,
          mode: request.mode,
          processingTime,
          detectionScore,
        },
      };
    } catch (error: any) {
      console.error("[didi-humanizer] Paraphrase service error:", error);

      return {
        success: false,
        error: {
          message: error.message || "An unexpected error occurred during paraphrasing",
          code: "PARAPHRASE_ERROR",
        },
      };
    }
  }

  async healthCheck(): Promise<{ aiProvider: boolean; currentModel: string }> {
    try {
      const test = await aiClient.testConnection();
      return {
        aiProvider: test.success,
        currentModel: test.model,
      };
    } catch (error) {
      return {
        aiProvider: false,
        currentModel: "Not configured / unreachable",
      };
    }
  }
}

export const paraphraseService = new ParaphraseService();
