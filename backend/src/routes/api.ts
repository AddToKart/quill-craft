import { Router, Request, Response } from "express";
import { humanizeService } from "@/services/humanize";
import { paraphraseService } from "@/services/paraphrase";
import { aiClient } from "@/services/ai-client";
import {
  validateHumanizeRequest,
  validateParaphraseRequest,
} from "@/middleware/validation";
import { calculateAiDetectionScore } from "@/utils/prompts";
import { config } from "@/config";

const router = Router();

// POST /api/humanize (Dedicated ZeroGPT & GPTZero Bypass Humanizer)
router.post(
  "/humanize",
  validateHumanizeRequest,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await humanizeService.humanizeText(req.body);
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error: any) {
      console.error("[didi-humanizer] Humanize route error:", error);
      res.status(500).json({
        success: false,
        error: {
          message: error.message || "Internal server error during humanization",
          code: "HUMANIZE_ERROR",
        },
      });
    }
  }
);

// POST /api/paraphrase (Enhanced Paraphrase & Bypass)
router.post(
  "/paraphrase",
  validateParaphraseRequest,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await paraphraseService.paraphraseText(req.body);
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error: any) {
      console.error("[didi-humanizer] Paraphrase route error:", error);
      res.status(500).json({
        success: false,
        error: {
          message: error.message || "Internal server error during paraphrasing",
          code: "PARAPHRASE_ERROR",
        },
      });
    }
  }
);

// POST /api/detect (AI Detector & Score Evaluation)
router.post("/detect", async (req: Request, res: Response): Promise<void> => {
  try {
    const { text } = req.body;
    if (!text || typeof text !== "string") {
      res.status(400).json({
        success: false,
        error: {
          message: "Text string is required for AI detection analysis",
          code: "INVALID_INPUT",
        },
      });
      return;
    }

    const detection = calculateAiDetectionScore(text);
    res.status(200).json({
      success: true,
      data: detection,
    });
  } catch (error: any) {
    console.error("[didi-humanizer] Detection error:", error);
    res.status(500).json({
      success: false,
      error: {
        message: "Failed to analyze text for AI detection",
        code: "DETECTION_ERROR",
      },
    });
  }
});

// POST /api/config/test (Test Custom Subscription: Base URL, Model Name, API Key)
router.post("/config/test", async (req: Request, res: Response): Promise<void> => {
  try {
    const { baseUrl, modelName, apiKey } = req.body;
    const testResult = await aiClient.testConnection({
      baseUrl,
      modelName,
      apiKey,
    });
    res.status(200).json({
      success: true,
      data: testResult,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: {
        message: error.message || "Failed to connect with provided AI credentials",
        code: "CONNECTION_FAILED",
      },
    });
  }
});

// GET /api/health
router.get("/health", async (req: Request, res: Response): Promise<void> => {
  try {
    const healthStatus = await paraphraseService.healthCheck();

    res.status(200).json({
      success: true,
      data: {
        app: "didi-humanizer",
        status: "healthy",
        timestamp: new Date().toISOString(),
        subscription: {
          configuredBaseUrl: config.aiBaseUrl,
          configuredModel: config.aiModelName,
          hasApiKey: Boolean(config.aiApiKey),
        },
        services: healthStatus,
        uptime: process.uptime(),
      },
    });
  } catch (error) {
    console.error("Health check error:", error);
    res.status(500).json({
      success: false,
      error: {
        message: "Health check failed",
        code: "HEALTH_CHECK_ERROR",
      },
    });
  }
});

// GET /api/models
router.get("/models", async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({
      success: true,
      data: {
        currentModel: config.aiModelName,
        currentBaseUrl: config.aiBaseUrl,
        hasApiKey: Boolean(config.aiApiKey),
        bypassModes: [
          {
            id: "aggressive",
            name: "ZeroGPT & GPTZero Shield (Maximum)",
            description: "Aggressive burstiness and perplexity to guarantee 0% AI detection",
            bestFor: ["ZeroGPT", "GPTZero", "Turnitin", "Winston AI"],
          },
          {
            id: "academic",
            name: "Academic Humanizer",
            description: "Scholarly, rigorous, and intelligent without formulaic AI structures",
            bestFor: ["Essays", "Research papers", "Academic submissions"],
          },
          {
            id: "casual",
            name: "Conversational & Natural",
            description: "Relaxed human cadence, spontaneous expressions, and contractions",
            bestFor: ["Blogs", "Social posts", "Emails"],
          },
          {
            id: "executive",
            name: "Executive & Professional",
            description: "Authoritative, crisp, fluff-free business prose",
            bestFor: ["Reports", "Executive summaries", "Client proposals"],
          },
        ],
      },
    });
  } catch (error) {
    console.error("Models endpoint error:", error);
    res.status(500).json({
      success: false,
      error: {
        message: "Failed to fetch models",
        code: "MODELS_ERROR",
      },
    });
  }
});

// GET /api/modes
router.get("/modes", async (req: Request, res: Response): Promise<void> => {
  try {
    const modes = [
      {
        id: "aggressive",
        name: "ZeroGPT Shield",
        description: "Maximum burstiness and perplexity to defeat ZeroGPT & GPTZero",
        icon: "🛡️",
        bestFor: ["ZeroGPT", "GPTZero", "Turnitin"],
        example: "Completely undetectable natural human rhythm",
      },
      {
        id: "academic",
        name: "Academic Bypass",
        description: "Scholarly prose stripped of robotic AI transitions",
        icon: "🎓",
        bestFor: ["Essays", "Research Papers", "Thesis"],
        example: "Nuanced scholarly human voice",
      },
      {
        id: "casual",
        name: "Casual Human",
        description: "Everyday conversational flow with natural expressions",
        icon: "💬",
        bestFor: ["Blogs", "Casual writing", "Storytelling"],
        example: "Relatable, authentic everyday tone",
      },
      {
        id: "executive",
        name: "Executive",
        description: "Crisp, concise, and persuasive business writing",
        icon: "💼",
        bestFor: ["Work emails", "Reports", "Proposals"],
        example: "Clean, punchy corporate communication",
      },
      {
        id: "natural",
        name: "Natural Flow",
        description: "Balanced rewriting maintaining original style with human variance",
        icon: "🌊",
        bestFor: ["General content", "Articles"],
        example: "Smooth, organic human phrasing",
      },
    ];

    res.status(200).json({
      success: true,
      data: modes,
    });
  } catch (error) {
    console.error("Modes endpoint error:", error);
    res.status(500).json({
      success: false,
      error: {
        message: "Failed to fetch modes",
        code: "MODES_ERROR",
      },
    });
  }
});

export default router;
