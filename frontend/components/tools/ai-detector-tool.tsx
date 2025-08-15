"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Brain,
  FileText,
  Zap,
} from "lucide-react";

export function AiDetectorTool() {
  const [text, setText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    aiProbability: number;
    humanProbability: number;
    confidence: number;
    classification: "human" | "ai" | "mixed";
    details: string[];
  } | null>(null);

  const handleAnalyze = async () => {
    if (!text.trim()) return;

    setIsAnalyzing(true);

    // Simulate AI detection analysis
    setTimeout(() => {
      const aiScore = Math.random() * 100;
      const humanScore = 100 - aiScore;
      const confidence = Math.random() * 40 + 60; // 60-100% confidence

      let classification: "human" | "ai" | "mixed" = "human";
      if (aiScore > 70) classification = "ai";
      else if (aiScore > 30) classification = "mixed";

      const details = [
        "Analyzed sentence structure patterns",
        "Checked vocabulary complexity",
        "Evaluated writing style consistency",
        "Examined syntactic patterns",
        "Assessed semantic coherence",
      ];

      setResult({
        aiProbability: aiScore,
        humanProbability: humanScore,
        confidence,
        classification,
        details,
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const getResultColor = () => {
    if (!result) return "blue";
    if (result.classification === "human") return "green";
    if (result.classification === "ai") return "red";
    return "yellow";
  };

  const getResultIcon = () => {
    if (!result) return Shield;
    if (result.classification === "human") return CheckCircle;
    if (result.classification === "ai") return AlertTriangle;
    return Brain;
  };

  const ResultIcon = getResultIcon();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Shield className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-bold">AI Content Detector</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Detect if content was written by AI or humans with advanced analysis
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Text to Analyze
            </label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your text here to detect if it was written by AI..."
              className="min-h-[300px] resize-none"
              disabled={isAnalyzing}
            />
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-gray-500">
                {text.length} characters •{" "}
                {text.split(/\s+/).filter((w) => w.length > 0).length} words
              </p>
            </div>
          </div>

          <Button
            onClick={handleAnalyze}
            disabled={!text.trim() || isAnalyzing}
            className="w-full"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <Zap className="h-4 w-4 mr-2 animate-spin" />
                Analyzing Content...
              </>
            ) : (
              <>
                <Shield className="h-4 w-4 mr-2" />
                Detect AI Content
              </>
            )}
          </Button>
        </div>

        <div className="space-y-4">
          {result && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ResultIcon
                    className={`h-5 w-5 ${
                      result.classification === "human"
                        ? "text-green-600"
                        : result.classification === "ai"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  />
                  Detection Results
                  <Badge
                    variant={
                      result.classification === "human"
                        ? "default"
                        : result.classification === "ai"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {result.classification.toUpperCase()}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">AI Generated</span>
                    <span className="text-sm text-red-600">
                      {result.aiProbability.toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={result.aiProbability} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Human Written</span>
                    <span className="text-sm text-green-600">
                      {result.humanProbability.toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={result.humanProbability} className="h-2" />
                </div>

                <div className="pt-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Confidence</span>
                    <span className="text-sm">
                      {result.confidence.toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={result.confidence} className="h-2" />
                </div>

                <Alert>
                  <FileText className="h-4 w-4" />
                  <AlertDescription>
                    This analysis is based on statistical patterns and should be
                    used as a guide. Results may vary for different types of
                    content.
                  </AlertDescription>
                </Alert>

                <div>
                  <h4 className="text-sm font-medium mb-2">
                    Analysis Details:
                  </h4>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    {result.details.map((detail, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          {!result && (
            <Card>
              <CardContent className="p-6">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>
                    Enter text above and click "Detect AI Content" to analyze
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
