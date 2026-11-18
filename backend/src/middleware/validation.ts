import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const customConfigSchema = z
  .object({
    baseUrl: z.string().optional(),
    modelName: z.string().optional(),
    apiKey: z.string().optional(),
  })
  .optional();

export const paraphraseSchema = z.object({
  body: z.object({
    text: z.string().min(1, "Text is required").max(25000, "Text too long"),
    mode: z.string().default("humanize"),
    language: z.string().default("en-us"),
    synonymStrength: z.number().min(0).max(100).default(80),
    model: z.string().default("custom"),
    customConfig: customConfigSchema,
  }),
});

export const humanizeSchema = z.object({
  body: z.object({
    text: z.string().min(1, "Text is required").max(25000, "Text too long"),
    mode: z
      .enum(["aggressive", "natural", "academic", "casual", "executive"])
      .default("aggressive")
      .or(z.string()),
    strength: z.number().min(1).max(10).default(8),
    language: z.string().default("en-us"),
    customConfig: customConfigSchema,
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

export const validateHumanizeRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    humanizeSchema.parse({
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
      message: error.message || "Internal server error",
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
