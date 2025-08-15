import { Router, Request, Response } from "express";
import { ParaphraseService } from "@/services/paraphrase";
import { validateParaphraseRequest } from "@/middleware/validation";
import { ParaphraseRequest } from "@/types";

const router = Router();
const paraphraseService = new ParaphraseService();

// POST /api/paraphrase
router.post(
  "/paraphrase",
  validateParaphraseRequest,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const request: ParaphraseRequest = req.body;
      const result = await paraphraseService.paraphraseText(request);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Paraphrase endpoint error:", error);
      res.status(500).json({
        success: false,
        error: {
          message: "Internal server error",
          code: "SERVER_ERROR",
        },
      });
    }
  }
);

// GET /api/health
router.get("/health", async (req: Request, res: Response): Promise<void> => {
  try {
    const healthStatus = await paraphraseService.healthCheck();

    res.status(200).json({
      success: true,
      data: {
        status: "healthy",
        timestamp: new Date().toISOString(),
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
    const models = [
      {
        id: "lite",
        name: "OpenAI GPT OSS 20B",
        provider: "openrouter",
        description: "Fast and basic rewriting",
        speed: "Fastest",
        quality: "Basic",
        free: true,
      },
      {
        id: "normal",
        name: "GLM-4.5 Air",
        provider: "openrouter",
        description: "Balanced quality and speed",
        speed: "Fast",
        quality: "Good",
        free: true,
      },
      {
        id: "heavy",
        name: "Gemini 2.5 Flash",
        provider: "gemini",
        description: "More accurate, slower processing",
        speed: "Medium",
        quality: "High",
        free: true,
      },
      {
        id: "pro",
        name: "Gemini 2.5 Flash Pro",
        provider: "gemini",
        description: "Highest quality, premium only",
        speed: "Slow",
        quality: "Excellent",
        free: false,
      },
    ];

    res.status(200).json({
      success: true,
      data: models,
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

export default router;
