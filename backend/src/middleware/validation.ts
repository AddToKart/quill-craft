import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const paraphraseSchema = z.object({
  body: z.object({
    text: z.string().min(1, "Text is required").max(10000, "Text too long"),
    mode: z.enum([
      "standard",
      "fluency",
      "humanize",
      "formal",
      "academic",
      "simple",
      "creative",
      "expand",
      "shorten",
      "custom",
    ]),
    language: z.string().default("en-us"),
    synonymStrength: z.number().min(0).max(100).default(50),
    model: z.enum(["lite", "normal", "heavy", "pro"]).default("normal"),
  }),
});

export const validateParaphraseRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    paraphraseSchema.parse({
      body: req.body,
    });
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        error: {
          message: "Validation failed",
          code: "VALIDATION_ERROR",
          details: error.errors,
        },
      });
      return;
    }
    next(error);
  }
};

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error("Server error:", error);

  res.status(500).json({
    success: false,
    error: {
      message: "Internal server error",
      code: "SERVER_ERROR",
    },
  });
};

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    error: {
      message: "Endpoint not found",
      code: "NOT_FOUND",
    },
  });
};
