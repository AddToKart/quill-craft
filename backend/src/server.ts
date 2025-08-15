import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import config, { validateConfig } from "@/config";
import apiRoutes from "@/routes/api";
import { errorHandler, notFoundHandler } from "@/middleware/validation";

// Validate configuration
validateConfig();

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: [
      config.frontendUrl,
      "http://localhost:3000",
      "https://quillcraft.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimitWindowMs,
  max: config.rateLimitMaxRequests,
  message: {
    success: false,
    error: {
      message: "Too many requests, please try again later",
      code: "RATE_LIMIT_EXCEEDED",
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Health check endpoint
app.get("/", (req: Request, res: Response): void => {
  res.json({
    success: true,
    data: {
      message: "QuillCraft Backend API",
      version: "1.0.0",
      status: "healthy",
      timestamp: new Date().toISOString(),
    },
  });
});

// API routes
app.use("/api", apiRoutes);

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`🚀 QuillCraft Backend Server running on port ${PORT}`);
  console.log(`📱 Frontend URL: ${config.frontendUrl}`);
  console.log(`🌍 Environment: ${config.nodeEnv}`);
  console.log(`⚡ API Available at: http://localhost:${PORT}/api`);
});

export default app;
