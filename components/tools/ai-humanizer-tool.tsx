"use client";

import { useState } from "react";
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
  Users,
  Sparkles,
  Copy,
  RefreshCw,
  Heart,
  Brain,
  Zap,
} from "lucide-react";

export function AiHumanizerTool() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isHumanizing, setIsHumanizing] = useState(false);
  const [humanizationLevel, setHumanizationLevel] = useState([7]);
  const [writingStyle, setWritingStyle] = useState("natural");

  const handleHumanize = async () => {
    if (!inputText.trim()) return;

    setIsHumanizing(true);

    // Simulate AI humanizing process
    setTimeout(() => {
      // Mock humanized output
      const variations = [
        "This technology has genuinely transformed how we approach everyday challenges, making complex tasks feel surprisingly manageable.",
        "You know, this tech has really changed the game for handling day-to-day stuff - it's pretty amazing how it simplifies the complicated things.",
        "I've got to say, this technology has completely revolutionized our approach to tackling routine challenges, and honestly, it makes even the most complex tasks seem almost effortless.",
        "This technology has fundamentally shifted our perspective on managing daily obstacles, creating an almost intuitive experience with previously daunting tasks.",
      ];

      const randomOutput =
        variations[Math.floor(Math.random() * variations.length)];
      setOutputText(randomOutput);
      setIsHumanizing(false);
    }, 2500);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const getHumanizationLabel = (value: number) => {
    if (value <= 3) return "Subtle";
    if (value <= 6) return "Moderate";
    return "Maximum";
  };

  const writingStyles = [
    {
      value: "natural",
      label: "Natural",
      description: "Conversational and authentic",
    },
    {
      value: "professional",
      label: "Professional",
      description: "Polished yet human",
    },
    { value: "casual", label: "Casual", description: "Relaxed and friendly" },
    {
      value: "creative",
      label: "Creative",
      description: "Expressive and engaging",
    },
    {
      value: "academic",
      label: "Academic",
      description: "Scholarly but human",
      premium: true,
    },
    {
      value: "storytelling",
      label: "Storytelling",
      description: "Narrative and compelling",
      premium: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Heart className="h-6 w-6 text-red-500" />
          <h1 className="text-2xl font-bold">AI Humanizer</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Transform AI-generated content into natural, human-like writing
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-4">
        {/* Controls */}
        <div className="xl:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Humanization Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Writing Style
                </label>
                <Select value={writingStyle} onValueChange={setWritingStyle}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {writingStyles.map((style) => (
                      <SelectItem
                        key={style.value}
                        value={style.value}
                        disabled={style.premium}
                      >
                        <div className="flex items-center gap-2">
                          <span>{style.label}</span>
                          {style.premium && (
                            <Badge variant="secondary" className="text-xs">
                              Pro
                            </Badge>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">
                  {
                    writingStyles.find((s) => s.value === writingStyle)
                      ?.description
                  }
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Humanization Level
                  </label>
                  <Badge variant="outline">
                    {getHumanizationLabel(humanizationLevel[0])}
                  </Badge>
                </div>
                <Slider
                  value={humanizationLevel}
                  onValueChange={setHumanizationLevel}
                  max={10}
                  min={1}
                  step={1}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Light</span>
                  <span>Aggressive</span>
                </div>
              </div>

              <div className="pt-2">
                <h4 className="text-sm font-medium mb-2">Features:</h4>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-3 w-3 text-blue-500" />
                    Natural flow enhancement
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="h-3 w-3 text-green-500" />
                    Conversational tone
                  </li>
                  <li className="flex items-center gap-2">
                    <Brain className="h-3 w-3 text-purple-500" />
                    Personality injection
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="h-3 w-3 text-red-500" />
                    Emotional resonance
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Input and Output */}
        <div className="xl:col-span-3 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                AI-Generated Text
              </label>
              <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste AI-generated content here to humanize..."
                className="min-h-[300px] resize-none"
                disabled={isHumanizing}
              />
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  {inputText.length} characters •{" "}
                  {inputText.split(/\s+/).filter((w) => w.length > 0).length}{" "}
                  words
                </p>
                <Button
                  onClick={handleHumanize}
                  disabled={!inputText.trim() || isHumanizing}
                  size="sm"
                >
                  {isHumanizing ? (
                    <>
                      <Zap className="h-4 w-4 mr-2 animate-spin" />
                      Humanizing...
                    </>
                  ) : (
                    <>
                      <Heart className="h-4 w-4 mr-2" />
                      Humanize Text
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Humanized Result
              </label>
              <Textarea
                value={outputText}
                readOnly
                placeholder="Humanized content will appear here..."
                className="min-h-[300px] resize-none bg-muted/50"
              />
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  {outputText.length} characters •{" "}
                  {outputText.split(/\s+/).filter((w) => w.length > 0).length}{" "}
                  words
                </p>
                <div className="flex gap-2">
                  <Button
                    onClick={copyToClipboard}
                    disabled={!outputText}
                    variant="outline"
                    size="sm"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button
                    onClick={handleHumanize}
                    disabled={!inputText.trim() || isHumanizing}
                    variant="outline"
                    size="sm"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Regenerate
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {outputText && (
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">95%</div>
                    <div className="text-xs text-gray-500">Human-like</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      8.7/10
                    </div>
                    <div className="text-xs text-gray-500">Readability</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      92%
                    </div>
                    <div className="text-xs text-gray-500">Natural Flow</div>
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
