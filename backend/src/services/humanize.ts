import { aiClient } from "@/services/ai-client";
import {
  getZeroGptBypassPrompt,
  sanitizeHumanizedOutput,
  calculateAiDetectionScore,
  validateParaphraseInput,
} from "@/utils/prompts";
import { HumanizeRequest, HumanizeResponse } from "@/types";

export class HumanizeService {
  async humanizeText(request: HumanizeRequest): Promise<HumanizeResponse> {
    const startTime = Date.now();

    try {
      const validation = validateParaphraseInput(request.text, request.mode || "aggressive");
      if (!validation.isValid) {
        return {
          success: false,
          error: {
            message: validation.error!,
            code: "VALIDATION_ERROR",
          },
        };
      }

      const mode = request.mode || "aggressive";
      const strength = request.strength ?? 8;
      const language = request.language || "en-us";

      const { systemPrompt, userInstruction } = getZeroGptBypassPrompt(
        mode,
        strength,
        language
      );

      const messages = [
        {
          role: "system" as const,
          content: systemPrompt,
        },
        {
          role: "user" as const,
          content: `${userInstruction}\n\n${request.text}`,
        },
      ];

      // Dynamic temperature & penalties based on bypass strength to avoid predictable token sequences
      const temp = strength >= 9 ? 0.95 : strength >= 7 ? 0.90 : 0.85;
      const presence = strength >= 9 ? 0.75 : 0.65;
      const frequency = strength >= 9 ? 0.65 : 0.55;

      const aiResult = await aiClient.generateChat(
        messages,
        request.customConfig,
        {
          temperature: temp,
          maxTokens: 3000,
          presencePenalty: presence,
          frequencyPenalty: frequency,
        }
      );

      const cleanedText = sanitizeHumanizedOutput(aiResult.content);
      const detectionScore = calculateAiDetectionScore(cleanedText);
      const processingTime = Date.now() - startTime;

      return {
        success: true,
        data: {
          originalText: request.text,
          humanizedText: cleanedText,
          model: aiResult.modelUsed,
          mode,
          processingTime,
          detectionScore,
        },
      };
    } catch (error: any) {
      console.error("[didi-humanizer] Humanize error:", error);

      return {
        success: false,
        error: {
          message:
            error.message ||
            "Failed to humanize text. Check your API settings or subscription credentials.",
          code: "HUMANIZE_ERROR",
        },
      };
    }
  }
}

export const humanizeService = new HumanizeService();
