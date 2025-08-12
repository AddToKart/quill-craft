"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Search,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  FileText,
  Globe,
  BookOpen,
  Zap,
} from "lucide-react";

export function PlagiarismCheckerTool() {
  const [text, setText] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<{
    originalityScore: number;
    plagiarismScore: number;
    matches: Array<{
      source: string;
      similarity: number;
      type: "web" | "academic" | "book";
      url?: string;
      snippet: string;
    }>;
    overallStatus: "original" | "moderate" | "high-risk";
  } | null>(null);

  const handleCheck = async () => {
    if (!text.trim()) return;

    setIsChecking(true);

    // Simulate plagiarism checking
    setTimeout(() => {
      const plagiarismScore = Math.random() * 30; // 0-30% plagiarism
      const originalityScore = 100 - plagiarismScore;

      const matches = [
        {
          source: "Wikipedia - Artificial Intelligence",
          similarity: 85,
          type: "web" as const,
          url: "https://en.wikipedia.org/wiki/Artificial_intelligence",
          snippet:
            "Artificial intelligence is intelligence demonstrated by machines...",
        },
        {
          source: "IEEE Computer Society Digital Library",
          similarity: 72,
          type: "academic" as const,
          snippet:
            "Machine learning algorithms have shown remarkable progress...",
        },
        {
          source: "Introduction to Machine Learning - Textbook",
          similarity: 68,
          type: "book" as const,
          snippet: "The fundamental concepts of neural networks include...",
        },
      ].slice(0, Math.floor(Math.random() * 3) + 1);

      let overallStatus: "original" | "moderate" | "high-risk" = "original";
      if (plagiarismScore > 20) overallStatus = "high-risk";
      else if (plagiarismScore > 10) overallStatus = "moderate";

      setResult({
        originalityScore,
        plagiarismScore,
        matches,
        overallStatus,
      });
      setIsChecking(false);
    }, 3000);
  };

  const getStatusColor = () => {
    if (!result) return "blue";
    if (result.overallStatus === "original") return "green";
    if (result.overallStatus === "high-risk") return "red";
    return "yellow";
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "web":
        return Globe;
      case "academic":
        return FileText;
      case "book":
        return BookOpen;
      default:
        return FileText;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Search className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-bold">Plagiarism Checker</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Check your content against billions of sources for originality
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Text to Check
            </label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your text here to check for plagiarism..."
              className="min-h-[300px] resize-none"
              disabled={isChecking}
            />
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-gray-500">
                {text.length} characters •{" "}
                {text.split(/\s+/).filter((w) => w.length > 0).length} words
              </p>
            </div>
          </div>

          <Button
            onClick={handleCheck}
            disabled={!text.trim() || isChecking}
            className="w-full"
            size="lg"
          >
            {isChecking ? (
              <>
                <Zap className="h-4 w-4 mr-2 animate-spin" />
                Checking Sources...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Check Plagiarism
              </>
            )}
          </Button>
        </div>

        <div className="space-y-4">
          {result && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {result.overallStatus === "original" ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    )}
                    Plagiarism Results
                    <Badge
                      variant={
                        result.overallStatus === "original"
                          ? "default"
                          : result.overallStatus === "high-risk"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {result.overallStatus.replace("-", " ").toUpperCase()}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">
                        Original Content
                      </span>
                      <span className="text-sm text-green-600">
                        {result.originalityScore.toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={result.originalityScore} className="h-3" />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">
                        Potential Plagiarism
                      </span>
                      <span className="text-sm text-red-600">
                        {result.plagiarismScore.toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={result.plagiarismScore} className="h-3" />
                  </div>

                  <Alert>
                    <FileText className="h-4 w-4" />
                    <AlertDescription>
                      {result.overallStatus === "original"
                        ? "Great! Your content appears to be original."
                        : "Some similarities detected. Review the sources below."}
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              {result.matches.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Similar Sources Found
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {result.matches.map((match, index) => {
                      const TypeIcon = getTypeIcon(match.type);
                      return (
                        <div
                          key={index}
                          className="border rounded-lg p-3 space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <TypeIcon className="h-4 w-4" />
                              <span className="font-medium text-sm">
                                {match.source}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">
                                {match.similarity}% similar
                              </Badge>
                              {match.url && (
                                <Button variant="ghost" size="sm" asChild>
                                  <a
                                    href={match.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <ExternalLink className="h-3 w-3" />
                                  </a>
                                </Button>
                              )}
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 italic">
                            "{match.snippet}"
                          </p>
                          <Progress value={match.similarity} className="h-1" />
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              )}
            </>
          )}

          {!result && (
            <Card>
              <CardContent className="p-6">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>
                    Enter text above and click "Check Plagiarism" to scan for
                    originality
                  </p>
                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex items-center justify-center gap-2">
                      <Globe className="h-3 w-3" />
                      <span>Web sources</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <FileText className="h-3 w-3" />
                      <span>Academic papers</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <BookOpen className="h-3 w-3" />
                      <span>Published books</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
