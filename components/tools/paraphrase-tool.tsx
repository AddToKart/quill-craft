"use client";

import { useState } from "react";
import { TextEditor } from "@/components/text-editor";
import { ModelSelector } from "@/components/model-selector";
import { ModeSelector } from "@/components/mode-selector";
import { LanguageSelector } from "@/components/language-selector";
import { SynonymStrength } from "@/components/synonym-strength";
import { StatsCounter } from "@/components/stats-counter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Copy,
  Download,
  RefreshCw,
  Sparkles,
  FileUp,
  Clipboard,
} from "lucide-react";
import { toast } from "sonner";
import { getDummyParaphrase } from "@/lib/dummy-data";

export function ParaphraseTool() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [mode, setMode] = useState("standard");
  const [language, setLanguage] = useState("en-us");
  const [synonymStrength, setSynonymStrength] = useState(50);
  const [model, setModel] = useState("normal");
  const [isLoading, setIsLoading] = useState(false);

  const handleParaphrase = async () => {
    if (!inputText.trim()) {
      toast.error("Please enter some text to paraphrase");
      return;
    }

    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const paraphrased = getDummyParaphrase(inputText, mode);
    setOutputText(paraphrased);
    setIsLoading(false);

    toast.success("Text paraphrased successfully!");
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const handleTrySample = () => {
    const sampleText =
      "Artificial intelligence has revolutionized the way we approach complex problems in modern society. It enables machines to learn from data and make decisions that traditionally required human intelligence.";
    setInputText(sampleText);
    toast.success("Sample text loaded!");
  };

  const handlePasteText = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInputText(text);
        toast.success("Text pasted from clipboard!");
      } else {
        toast.error("No text found in clipboard");
      }
    } catch (error) {
      toast.error("Failed to read from clipboard");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Paraphraser</h1>
          <p className="text-muted-foreground mt-1">
            Rewrite your text while maintaining the original meaning
          </p>
        </div>
        <Badge
          variant="secondary"
          className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
        >
          <Sparkles className="h-3 w-3 mr-1" />
          AI Powered
        </Badge>
      </div>

      {/* Compact controls bar */}
      <div className="bg-card border rounded-lg p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-1">
            <LanguageSelector value={language} onChange={setLanguage} />
          </div>
          <div className="lg:col-span-2">
            <ModeSelector value={mode} onChange={setMode} />
          </div>
          <div className="lg:col-span-1">
            <SynonymStrength
              value={synonymStrength}
              onChange={setSynonymStrength}
            />
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3 space-y-4">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Original Text</h3>
                <StatsCounter text={inputText} />
              </div>

              <TextEditor
                value={inputText}
                onChange={setInputText}
                placeholder="To rewrite text, enter or paste it here and press 'Paraphrase.'"
                className="min-h-[300px]"
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleTrySample}
                    className="flex items-center gap-2"
                  >
                    <Sparkles className="h-4 w-4" />
                    Try Sample Text
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePasteText}
                    className="flex items-center gap-2"
                  >
                    <Clipboard className="h-4 w-4" />
                    Paste Text
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <FileUp className="h-4 w-4" />
                    Upload Doc
                  </Button>
                </div>

                <Button
                  onClick={handleParaphrase}
                  disabled={isLoading || !inputText.trim()}
                  className="bg-primary hover:bg-primary/90"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Paraphrasing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Paraphrase
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>

          {outputText && (
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Paraphrased Text</h3>
                  <div className="flex items-center gap-2">
                    <StatsCounter text={outputText} />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(outputText)}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-muted/30 rounded-lg border-l-4 border-primary">
                  <p className="whitespace-pre-wrap">{outputText}</p>
                </div>
              </div>
            </Card>
          )}
        </div>

        <div className="xl:col-span-1 space-y-4">
          <ModelSelector value={model} onChange={setModel} />

          <Card className="p-4">
            <h3 className="font-medium mb-3">Quick Tips</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Try different modes for varied results</li>
              <li>• Adjust synonym strength for control</li>
              <li>• Use Fluency mode for better readability</li>
              <li>• Humanize mode makes AI text natural</li>
              <li>• Check grammar after paraphrasing</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
