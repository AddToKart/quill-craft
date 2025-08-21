"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Copy,
  Download,
  RotateCcw,
  ArrowLeftRight,
  FileText,
  Sparkles,
  BarChart3,
  CheckCircle,
  Eye,
  Diff,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { diffWords } from "@/lib/diff";

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalText: string;
  paraphrasedText: string;
  mode?: string;
  model?: string;
}

export function ComparisonModal({
  isOpen,
  onClose,
  originalText,
  paraphrasedText,
  mode = "standard",
  model = "normal",
}: ComparisonModalProps) {
  const [activeTab, setActiveTab] = useState("side-by-side");
  const diffs = diffWords(originalText, paraphrasedText);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} text copied to clipboard!`);
  };

  const handleExport = () => {
    const content = `ORIGINAL TEXT:\n${originalText}\n\nPARAPHRASED TEXT (${mode} mode, ${model} model):\n${paraphrasedText}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "text-comparison.txt";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Comparison exported successfully!");
  };

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const getCharCount = (text: string) => {
    return text.length;
  };

  const getSentenceCount = (text: string) => {
    return text.split(/[.!?]+/).filter(Boolean).length;
  };

  const getDifferences = () => {
    const originalWords = originalText.trim().split(/\s+/);
    const paraphrasedWords = paraphrasedText.trim().split(/\s+/);

    const originalWordCount = originalWords.length;
    const paraphrasedWordCount = paraphrasedWords.length;
    const wordDifference = paraphrasedWordCount - originalWordCount;
    const percentageChange =
      originalWordCount > 0
        ? ((wordDifference / originalWordCount) * 100).toFixed(1)
        : "0";

    return {
      wordDifference,
      percentageChange: parseFloat(percentageChange),
      lengthChange: paraphrasedText.length - originalText.length,
    };
  };

  const differences = getDifferences();

  const renderSideBySideView = () => (
    <div className="grid grid-cols-2 gap-6 h-[450px]">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-medium">Original Text</h3>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleCopy(originalText, "Original")}
          >
            <Copy className="h-3 w-3 mr-1" />
            Copy
          </Button>
        </div>
        <Card className="h-full">
          <ScrollArea className="h-full p-4">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {originalText}
            </p>
          </ScrollArea>
        </Card>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h3 className="font-medium">Paraphrased Text</h3>
            <Badge variant="secondary" className="text-xs">
              {mode} • {model}
            </Badge>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleCopy(paraphrasedText, "Paraphrased")}
          >
            <Copy className="h-3 w-3 mr-1" />
            Copy
          </Button>
        </div>
        <Card className="h-full border-primary/20">
          <ScrollArea className="h-full p-4">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {paraphrasedText}
            </p>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );

  const renderDiffView = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Diff className="h-4 w-4 text-muted-foreground" />
        <h3 className="font-medium">Word-by-Word Differences</h3>
        <Badge variant="secondary" className="text-xs">
          {mode} • {model}
        </Badge>
      </div>
      <Card className="h-[450px]">
        <ScrollArea className="h-full p-4">
          <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap text-sm leading-relaxed">
            {diffs.map((diff, index) => (
              <span
                key={index}
                className={cn(
                  "rounded px-1",
                  diff.added &&
                    "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200",
                  diff.removed &&
                    "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 line-through"
                )}
              >
                {diff.value}
              </span>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );

  const renderOverlayView = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Eye className="h-4 w-4 text-muted-foreground" />
        <h3 className="font-medium">Overlay Comparison</h3>
        <Badge variant="secondary" className="text-xs">
          {mode} • {model}
        </Badge>
      </div>
      <Card className="h-[450px]">
        <ScrollArea className="h-full p-4">
          <div className="space-y-6">
            <div className="p-3 bg-muted/30 rounded-lg border-l-4 border-muted-foreground">
              <p className="text-xs font-medium text-muted-foreground mb-2">
                ORIGINAL
              </p>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {originalText}
              </p>
            </div>
            <div className="p-3 bg-primary/5 rounded-lg border-l-4 border-primary">
              <p className="text-xs font-medium text-primary mb-2">
                PARAPHRASED
              </p>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {paraphrasedText}
              </p>
            </div>
          </div>
        </ScrollArea>
      </Card>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowLeftRight className="h-5 w-5" />
            Text Comparison
          </DialogTitle>
          <DialogDescription>
            Compare your original text with the paraphrased version to see the
            differences and statistics
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              className="flex items-center gap-2"
            >
              <Download className="h-3 w-3" />
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-3 w-3" />
              Back to Editor
            </Button>
          </div>

          {/* Statistics Card */}
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">Comparison Statistics</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">
                  {getWordCount(originalText)}
                </p>
                <p className="text-xs text-muted-foreground">Original Words</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {getWordCount(paraphrasedText)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Paraphrased Words
                </p>
              </div>
              <div className="text-center">
                <p
                  className={cn(
                    "text-2xl font-bold",
                    differences.wordDifference > 0
                      ? "text-green-600"
                      : differences.wordDifference < 0
                      ? "text-red-600"
                      : "text-muted-foreground"
                  )}
                >
                  {differences.wordDifference > 0 ? "+" : ""}
                  {differences.wordDifference}
                </p>
                <p className="text-xs text-muted-foreground">Word Difference</p>
              </div>
              <div className="text-center">
                <p
                  className={cn(
                    "text-2xl font-bold",
                    Math.abs(differences.percentageChange) > 10
                      ? "text-amber-600"
                      : "text-green-600"
                  )}
                >
                  {differences.percentageChange > 0 ? "+" : ""}
                  {differences.percentageChange}%
                </p>
                <p className="text-xs text-muted-foreground">Length Change</p>
              </div>
            </div>

            <Separator className="my-3" />

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Characters:</span>
                <span>
                  {getCharCount(originalText)} → {getCharCount(paraphrasedText)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sentences:</span>
                <span>
                  {getSentenceCount(originalText)} →{" "}
                  {getSentenceCount(paraphrasedText)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-green-600" />
                <span className="text-green-600 text-xs">
                  Successfully Paraphrased
                </span>
              </div>
            </div>
          </Card>

          {/* Comparison Views */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger
                value="side-by-side"
                className="flex items-center gap-2"
              >
                <ArrowLeftRight className="h-3 w-3" />
                Side by Side
              </TabsTrigger>
              <TabsTrigger value="diff" className="flex items-center gap-2">
                <Diff className="h-3 w-3" />
                Differences
              </TabsTrigger>
              <TabsTrigger value="overlay" className="flex items-center gap-2">
                <Eye className="h-3 w-3" />
                Overlay
              </TabsTrigger>
            </TabsList>

            <TabsContent value="side-by-side" className="mt-4">
              {renderSideBySideView()}
            </TabsContent>

            <TabsContent value="diff" className="mt-4">
              {renderDiffView()}
            </TabsContent>

            <TabsContent value="overlay" className="mt-4">
              {renderOverlayView()}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
