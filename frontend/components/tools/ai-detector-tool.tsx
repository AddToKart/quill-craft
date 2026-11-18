"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  FileText,
  RefreshCw,
  Search,
  Sparkles,
} from "lucide-react";
import { apiClient, AiDetectionResult } from "@/lib/api-client";
import { toast } from "sonner";

export function AiDetectorTool() {
  const [text, setText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AiDetectionResult | null>(null);

  const handleAnalyze = async () => {
    if (!text.trim()) {
      toast.error("Please enter text to analyze");
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    try {
      const data = await apiClient.detectAi(text);
      setResult(data);
      if (data.isLikelyHuman) {
        toast.success(`Text analyzed: ${data.humanProbabilityScore}% Human Score!`);
      } else {
        toast.warning(`Text has high AI likelihood (${data.aiProbabilityScore}% AI). Consider humanizing.`);
      }
    } catch (err: any) {
      console.error("Detection error:", err);
      toast.error(err.message || "Failed to analyze text");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSampleAi = () => {
    setText(
      "Furthermore, it is crucial to delve into the rich tapestry of artificial intelligence, as it plays a pivotal role in modern society. We must foster a holistic interplay to seamlessly harness its transformative capabilities."
    );
  };

  const handleSampleHuman = () => {
    setText(
      "I walked into the room and immediately knew something was off. It was cold. Too cold for November, honestly, especially with all the radiators running at full blast. Nobody noticed until Dave pointed out the broken latch on the basement window."
    );
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <div className="border-b pb-4">
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-2xl font-bold tracking-tight">AI Detector (ZeroGPT & GPTZero Analyzer)</h1>
          <Badge variant="outline" className="text-xs font-semibold text-emerald-600 border-emerald-500/30">
            Real-time Heuristics
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Evaluates sentence length burstiness, vocabulary perplexity, and AI indicator patterns used by ZeroGPT and GPTZero.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Input Text */}
        <Card className="flex flex-col">
          <CardHeader className="py-3 px-4 border-b flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              Content to Inspect
            </CardTitle>
            <div className="flex gap-1.5">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSampleAi}
                className="text-xs h-7 text-amber-600 hover:text-amber-700"
              >
                Sample AI
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSampleHuman}
                className="text-xs h-7 text-emerald-600 hover:text-emerald-700"
              >
                Sample Human
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 flex-1 flex flex-col justify-between">
            <Textarea
              placeholder="Paste text here to evaluate AI probability and test if it will pass ZeroGPT/GPTZero..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="flex-1 min-h-[300px] resize-none border-0 focus-visible:ring-0 p-0 text-sm leading-relaxed"
            />
            <div className="pt-3 border-t flex justify-between items-center">
              <span className="text-xs text-muted-foreground">
                {text.trim() ? text.trim().split(/\s+/).length : 0} words
              </span>
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !text.trim()}
                className="bg-primary gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    Analyze Text
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right: Analysis Results */}
        <Card className="flex flex-col">
          <CardHeader className="py-3 px-4 border-b">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              ZeroGPT & GPTZero Readiness
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 flex-1 flex flex-col justify-center">
            {result ? (
              <div className="space-y-5">
                <div className="text-center p-4 rounded-lg bg-muted/40 border">
                  <div className="text-3xl font-extrabold mb-1">
                    <span
                      className={
                        result.humanProbabilityScore >= 75
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-500"
                      }
                    >
                      {result.humanProbabilityScore}%
                    </span>{" "}
                    <span className="text-sm font-semibold text-muted-foreground">
                      Human Probability
                    </span>
                  </div>
                  <Progress
                    value={result.humanProbabilityScore}
                    className="h-2.5 mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    {result.aiProbabilityScore}% estimated AI detection chance
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg border bg-card">
                    <div className="font-semibold text-muted-foreground">Burstiness Score</div>
                    <div className="text-lg font-bold mt-0.5">{result.burstinessScore}/100</div>
                    <p className="text-[11px] text-muted-foreground mt-1">
                      {result.burstinessScore >= 50 ? "High variation (Human-like)" : "Uniform cadence (AI-like)"}
                    </p>
                  </div>

                  <div className="p-3 rounded-lg border bg-card">
                    <div className="font-semibold text-muted-foreground">Perplexity Proxy</div>
                    <div className="text-lg font-bold mt-0.5">{result.perplexityScore}/100</div>
                    <p className="text-[11px] text-muted-foreground mt-1">
                      {result.perplexityScore >= 60 ? "Rich vocabulary (Human)" : "Predictable words (AI)"}
                    </p>
                  </div>
                </div>

                {result.bannedWordsFound.length > 0 ? (
                  <Alert variant="destructive" className="py-2.5">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      <strong>AI Marker Words Detected:</strong> {result.bannedWordsFound.join(", ")}
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert className="py-2.5 border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <AlertDescription className="text-xs">
                      Zero AI indicator words found. Passes keyword filters cleanly.
                    </AlertDescription>
                  </Alert>
                )}

                <p className="text-xs text-muted-foreground italic text-center">
                  {result.feedback}
                </p>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Search className="h-10 w-10 mx-auto mb-2 opacity-30" />
                <p className="text-sm font-medium">Enter text and click Analyze to view detection results</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Tests sentence burstiness, vocabulary predictability, and AI marker words
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
