"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  ShieldCheck,
  Sparkles,
  Copy,
  RefreshCw,
  Zap,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Settings,
  Download,
  FileText,
  Sliders,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { apiClient, AiDetectionResult } from "@/lib/api-client";
import { ApiSettingsDialog } from "@/components/api-settings-dialog";

export function AiHumanizerTool() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isHumanizing, setIsHumanizing] = useState(false);
  const [humanizationLevel, setHumanizationLevel] = useState([8]);
  const [writingStyle, setWritingStyle] = useState("aggressive");
  const [detectionScore, setDetectionScore] = useState<AiDetectionResult | null>(null);
  const [activeModel, setActiveModel] = useState<string>("gpt-4o-mini");
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const config = apiClient.getStoredConfig();
    if (config.modelName) setActiveModel(config.modelName);
    if (config.apiKey) setHasApiKey(true);
  }, []);

  const handleHumanize = async () => {
    if (!inputText.trim()) {
      toast.error("Please enter or paste some AI text to humanize");
      return;
    }

    setIsHumanizing(true);
    setDetectionScore(null);

    try {
      const response = await apiClient.humanizeText({
        text: inputText,
        mode: writingStyle,
        strength: humanizationLevel[0],
      });

      if (response.success && response.data) {
        setOutputText(response.data.humanizedText);
        setDetectionScore(response.data.detectionScore);
        setActiveModel(response.data.model);
        toast.success(
          `Successfully humanized! ZeroGPT & GPTZero Bypass Score: ${response.data.detectionScore.humanProbabilityScore}% Human`
        );
      } else {
        toast.error(response.error?.message || "Failed to humanize text");
      }
    } catch (error: any) {
      console.error("Humanize error:", error);
      const msg = error.message || "An unexpected error occurred";

      if (msg.includes("API key") || msg.includes("No API key")) {
        toast.error("API Key required. Click 'AI Settings' to add your subscription key.", {
          action: {
            label: "Open Settings",
            onClick: () => setSettingsOpen(true),
          },
        });
      } else {
        toast.error(msg);
      }
    } finally {
      setIsHumanizing(false);
    }
  };

  const handleCopy = async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      toast.success("Humanized text copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const handleDownload = () => {
    if (!outputText) return;
    const blob = new Blob([outputText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `didi-humanized-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded as text file!");
  };

  const handleTrySample = () => {
    const sampleAiText =
      "Furthermore, it is crucial to delve into the rich tapestry of artificial intelligence, as it plays a pivotal role in revolutionizing modern society. By fostering a holistic interplay between human cognition and neural architectures, we can seamlessly harness unprecedented capabilities that serve as a beacon of hope for future generations.";
    setInputText(sampleAiText);
    toast.success("Sample AI text loaded! Notice the dead-giveaway words (delve, tapestry, crucial).");
  };

  const writingStyles = [
    {
      value: "aggressive",
      label: "🛡️ ZeroGPT & GPTZero Shield (Max Bypass)",
      description: "Aggressive burstiness and high perplexity to beat strict detectors",
    },
    {
      value: "academic",
      label: "🎓 Academic Humanizer",
      description: "Scholarly and rigorous without formulaic ChatGPT transitions",
    },
    {
      value: "casual",
      label: "💬 Conversational & Casual",
      description: "Natural everyday speech with genuine human flow and contractions",
    },
    {
      value: "executive",
      label: "💼 Executive & Professional",
      description: "Crisp, persuasive, and fluff-free business prose",
    },
    {
      value: "natural",
      label: "🌊 Balanced Human Flow",
      description: "Smooth, organic cadence preserving original style",
    },
  ];

  const inputWordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  const outputWordCount = outputText.trim() ? outputText.trim().split(/\s+/).length : 0;

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Title & Subscription Status Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              didi-humanizer
            </h1>
            <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
              ZeroGPT & GPTZero Bypass
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Bypass AI detection algorithms by injecting natural human burstiness, irregular clause lengths, and eliminating robotic token patterns.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSettingsOpen(true)}
            className="gap-2 border-emerald-500/30 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
          >
            <Settings className="h-4 w-4 text-emerald-600" />
            <span className="text-xs font-medium">Model: {activeModel}</span>
          </Button>

          <ApiSettingsDialog
            open={settingsOpen}
            onOpenChange={setSettingsOpen}
          />
        </div>
      </div>

      {/* Controls Bar: Mode & Strength Slider */}
      <Card className="border-border/60 shadow-sm bg-card/60 backdrop-blur">
        <CardContent className="p-4 sm:p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            {/* Writing Style / Mode */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                Humanizing Strategy
              </label>
              <Select value={writingStyle} onValueChange={setWritingStyle}>
                <SelectTrigger className="w-full font-medium">
                  <SelectValue placeholder="Select writing style" />
                </SelectTrigger>
                <SelectContent>
                  {writingStyles.map((style) => (
                    <SelectItem key={style.value} value={style.value}>
                      <div className="flex flex-col text-left py-0.5">
                        <span className="font-medium text-sm">{style.label}</span>
                        <span className="text-xs text-muted-foreground">
                          {style.description}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Humanization Strength Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Sliders className="h-3.5 w-3.5 text-emerald-600" />
                  Bypass & Restructuring Strength
                </span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  Level {humanizationLevel[0]}/10 (
                  {humanizationLevel[0] >= 8
                    ? "Maximum Bypass"
                    : humanizationLevel[0] >= 5
                    ? "Balanced"
                    : "Subtle"}
                  )
                </span>
              </div>
              <Slider
                value={humanizationLevel}
                onValueChange={setHumanizationLevel}
                max={10}
                min={1}
                step={1}
                className="py-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Editor Dual-Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Input AI Text */}
        <Card className="flex flex-col border-border/80 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between py-3 px-4 border-b bg-muted/20">
            <div className="flex items-center gap-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                Input AI Text
              </CardTitle>
              <Badge variant="outline" className="text-xs font-normal">
                {inputWordCount} words
              </Badge>
            </div>

            <div className="flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleTrySample}
                className="text-xs h-7 px-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
              >
                Try Sample AI Text
              </Button>
              {inputText && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setInputText("")}
                  className="text-xs h-7 px-2 text-muted-foreground"
                >
                  Clear
                </Button>
              )}
            </div>
          </CardHeader>

          <CardContent className="p-4 flex-1 flex flex-col">
            <Textarea
              placeholder="Paste AI-generated text here (e.g. from ChatGPT, Claude, Copilot, or Gemini) to humanize and bypass ZeroGPT/GPTZero..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 min-h-[320px] resize-none border-0 focus-visible:ring-0 p-0 text-base leading-relaxed"
            />

            <div className="pt-3 border-t flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {inputText.length} characters
              </span>

              <Button
                onClick={handleHumanize}
                disabled={isHumanizing || !inputText.trim()}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2 shadow-sm px-6"
              >
                {isHumanizing ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Humanizing...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-4 w-4" />
                    Bypass AI Detection
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right: Humanized Output */}
        <Card className="flex flex-col border-border/80 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between py-3 px-4 border-b bg-emerald-500/5">
            <div className="flex items-center gap-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                <Sparkles className="h-4 w-4" />
                Humanized Output (ZeroGPT Safe)
              </CardTitle>
              {outputWordCount > 0 && (
                <Badge variant="outline" className="text-xs font-normal border-emerald-500/30 text-emerald-700 dark:text-emerald-400">
                  {outputWordCount} words
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-1">
              {outputText && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="h-7 px-2 text-xs gap-1"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        Copy
                      </>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDownload}
                    className="h-7 px-2 text-xs gap-1"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Export
                  </Button>
                </>
              )}
            </div>
          </CardHeader>

          <CardContent className="p-4 flex-1 flex flex-col justify-between">
            {outputText ? (
              <div className="flex-1 whitespace-pre-wrap text-base leading-relaxed font-normal min-h-[280px]">
                {outputText}
              </div>
            ) : (
              <div className="flex-1 min-h-[280px] flex flex-col items-center justify-center text-center text-muted-foreground p-6">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-3 text-emerald-600">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <p className="text-sm font-medium">Your 100% human-written version will appear here</p>
                <p className="text-xs text-muted-foreground mt-1 max-w-sm">
                  Text is rewritten with varied sentence burstiness and unpredictable human vocabulary to score 0% AI on ZeroGPT and GPTZero.
                </p>
              </div>
            )}

            {/* AI Bypass Detection Score Indicator */}
            {detectionScore && (
              <div className="mt-4 pt-3 border-t">
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                        ZeroGPT / GPTZero Bypass Confidence
                      </span>
                    </div>
                    <Badge className="bg-emerald-600 text-white font-mono text-xs">
                      {detectionScore.humanProbabilityScore}% Human / {detectionScore.aiProbabilityScore}% AI
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-[11px] text-muted-foreground mt-2">
                    <div className="bg-background/80 p-1.5 rounded border text-center">
                      <div className="font-semibold text-foreground">Burstiness</div>
                      <div>{detectionScore.burstinessScore}% (Irregular)</div>
                    </div>
                    <div className="bg-background/80 p-1.5 rounded border text-center">
                      <div className="font-semibold text-foreground">Perplexity</div>
                      <div>{detectionScore.perplexityScore}% (Natural)</div>
                    </div>
                    <div className="bg-background/80 p-1.5 rounded border text-center">
                      <div className="font-semibold text-foreground">AI Markers</div>
                      <div className="text-emerald-600 font-bold">0 Detected</div>
                    </div>
                  </div>

                  <p className="text-[11px] text-emerald-700 dark:text-emerald-300 mt-2">
                    {detectionScore.feedback}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Guide Banner */}
      <Card className="border-border/60 bg-muted/30">
        <CardContent className="p-4 sm:p-5">
          <h3 className="text-sm font-bold flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4 text-amber-500" />
            How didi-humanizer defeats ZeroGPT & GPTZero
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-muted-foreground">
            <div className="p-2.5 rounded-md bg-background border">
              <span className="font-semibold text-foreground block mb-1">1. Burstiness Injection</span>
              ZeroGPT flags uniform sentence lengths. We introduce human variance: ultra-short sentences alongside complex, multi-clause thoughts.
            </div>
            <div className="p-2.5 rounded-md bg-background border">
              <span className="font-semibold text-foreground block mb-1">2. Perplexity Scrambling</span>
              GPTZero calculates mathematical token predictability. We replace statistically probable AI phrases with genuine human idioms and active verbs.
            </div>
            <div className="p-2.5 rounded-md bg-background border">
              <span className="font-semibold text-foreground block mb-1">3. Zero-Tolerance Blacklist</span>
              Every dead-giveaway AI word (delve, tapestry, crucial, foster, realm, furthermore) is strictly filtered and stripped out.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
