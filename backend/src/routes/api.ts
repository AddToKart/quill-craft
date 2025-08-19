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
        description: "Fast, consistent paraphrasing for basic needs",
        speed: "Fastest",
        quality: "Good",
        free: true,
        bestFor: ["Quick rewrites", "Simple paraphrasing", "Basic tasks"],
      },
      {
        id: "normal",
        name: "GLM-4.5 Air",
        provider: "openrouter",
        description: "Balanced quality and speed for everyday use",
        speed: "Fast",
        quality: "Very Good",
        free: true,
        bestFor: [
          "Standard paraphrasing",
          "Content improvement",
          "General use",
        ],
      },
      {
        id: "heavy",
        name: "Gemini 2.5 Flash",
        provider: "gemini",
        description: "High-quality paraphrasing with advanced understanding",
        speed: "Medium",
        quality: "Excellent",
        free: true,
        bestFor: ["Complex texts", "Academic content", "Professional writing"],
      },
      {
        id: "pro",
        name: "Gemini 2.5 Flash Pro",
        provider: "gemini",
        description: "Premium quality with maximum creativity and precision",
        speed: "Slower",
        quality: "Outstanding",
        free: false,
        bestFor: ["Creative writing", "Complex documents", "Premium results"],
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

// GET /api/modes
router.get("/modes", async (req: Request, res: Response): Promise<void> => {
  try {
    const modes = [
      {
        id: "standard",
        name: "Standard",
        description: "Clear, neutral rewriting maintaining original tone",
        icon: "📝",
        bestFor: ["General content", "Neutral tone", "Basic rewrites"],
        example: "Professional yet accessible language",
      },
      {
        id: "fluency",
        name: "Fluency",
        description: "Enhanced flow and natural readability",
        icon: "🌊",
        bestFor: ["Awkward phrasing", "Flow improvement", "Natural sound"],
        example: "Smooth, well-connected sentences",
      },
      {
        id: "humanize",
        name: "Humanize",
        description: "Convert AI text to natural, conversational language",
        icon: "👤",
        bestFor: ["AI-generated text", "Robotic content", "Personal touch"],
        example: "Warm, relatable, and authentic tone",
      },
      {
        id: "formal",
        name: "Formal",
        description: "Professional, business-appropriate language",
        icon: "🏢",
        bestFor: ["Business documents", "Professional emails", "Reports"],
        example: "Sophisticated, polished business writing",
      },
      {
        id: "academic",
        name: "Academic",
        description: "Scholarly style with precise terminology",
        icon: "🎓",
        bestFor: ["Research papers", "Academic essays", "Scholarly work"],
        example: "Rigorous, well-structured academic prose",
      },
      {
        id: "simple",
        name: "Simple",
        description: "Easy vocabulary and shorter sentences",
        icon: "💡",
        bestFor: ["Complex content", "Broader audience", "Clarity"],
        example: "Clear, accessible, easy-to-understand text",
      },
      {
        id: "creative",
        name: "Creative",
        description: "Engaging, vivid language with flair",
        icon: "🎨",
        bestFor: ["Marketing copy", "Creative writing", "Engaging content"],
        example: "Colorful, compelling, imaginative expression",
      },
      {
        id: "expand",
        name: "Expand",
        description: "Elaborate with additional context and details",
        icon: "📈",
        bestFor: ["Brief content", "More detail needed", "Explanations"],
        example: "Comprehensive, detailed, well-explained content",
      },
      {
        id: "shorten",
        name: "Shorten",
        description: "Condense while retaining key information",
        icon: "📉",
        bestFor: ["Long content", "Summaries", "Concise communication"],
        example: "Tight, focused, essential information only",
      },
      {
        id: "custom",
        name: "Custom",
        description: "Advanced techniques adapted to content",
        icon: "⚙️",
        bestFor: ["Special requirements", "Mixed approaches", "Expert use"],
        example: "Tailored approach for optimal results",
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
        message: "Failed to fetch paraphrase modes",
        code: "MODES_ERROR",
      },
    });
  }
});

export default router;
