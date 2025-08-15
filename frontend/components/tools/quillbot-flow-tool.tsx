"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Workflow,
  Play,
  FileText,
  CheckCircle,
  Clock,
  ArrowRight,
  Zap,
  Target,
  BarChart3,
} from "lucide-react";

interface FlowStep {
  id: string;
  name: string;
  description: string;
  status: "pending" | "processing" | "completed";
  result?: string;
}

export function QuillbotFlowTool() {
  const [inputText, setInputText] = useState("");
  const [selectedFlow, setSelectedFlow] = useState("academic");
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [flowSteps, setFlowSteps] = useState<FlowStep[]>([]);
  const [finalResult, setFinalResult] = useState("");

  const flows = [
    {
      id: "academic",
      name: "Academic Writing Flow",
      description: "Perfect for research papers and academic content",
      steps: [
        {
          id: "grammar",
          name: "Grammar Check",
          description: "Fix grammatical errors",
        },
        {
          id: "clarity",
          name: "Clarity Enhancement",
          description: "Improve readability and flow",
        },
        {
          id: "formal",
          name: "Formalize Tone",
          description: "Ensure academic tone",
        },
        {
          id: "citations",
          name: "Citation Check",
          description: "Verify citation format",
        },
        {
          id: "plagiarism",
          name: "Plagiarism Scan",
          description: "Check for originality",
        },
      ],
    },
    {
      id: "creative",
      name: "Creative Writing Flow",
      description: "Enhance storytelling and creative content",
      steps: [
        {
          id: "style",
          name: "Style Enhancement",
          description: "Improve writing style",
        },
        {
          id: "creativity",
          name: "Creative Boost",
          description: "Add creative elements",
        },
        {
          id: "flow",
          name: "Narrative Flow",
          description: "Improve story pacing",
        },
        {
          id: "engagement",
          name: "Engagement Check",
          description: "Ensure reader interest",
        },
      ],
      premium: true,
    },
    {
      id: "business",
      name: "Business Communication Flow",
      description: "Professional business writing optimization",
      steps: [
        {
          id: "grammar",
          name: "Grammar Check",
          description: "Fix grammatical errors",
        },
        {
          id: "professional",
          name: "Professional Tone",
          description: "Ensure business tone",
        },
        {
          id: "clarity",
          name: "Clarity Check",
          description: "Improve clarity",
        },
        {
          id: "concise",
          name: "Conciseness",
          description: "Remove unnecessary words",
        },
      ],
    },
    {
      id: "content",
      name: "Content Marketing Flow",
      description: "Optimize content for marketing purposes",
      steps: [
        {
          id: "seo",
          name: "SEO Optimization",
          description: "Improve search visibility",
        },
        {
          id: "engagement",
          name: "Engagement Boost",
          description: "Increase reader engagement",
        },
        { id: "cta", name: "Call-to-Action", description: "Strengthen CTAs" },
        {
          id: "readability",
          name: "Readability",
          description: "Optimize for target audience",
        },
      ],
      premium: true,
    },
    {
      id: "email",
      name: "Email Enhancement Flow",
      description: "Perfect professional emails",
      steps: [
        {
          id: "tone",
          name: "Tone Adjustment",
          description: "Set appropriate tone",
        },
        {
          id: "structure",
          name: "Structure Check",
          description: "Improve email structure",
        },
        {
          id: "clarity",
          name: "Clarity Pass",
          description: "Ensure clear communication",
        },
      ],
    },
  ];

  const startFlow = async () => {
    if (!inputText.trim()) return;

    const selectedFlowData = flows.find((f) => f.id === selectedFlow);
    if (!selectedFlowData) return;

    setIsProcessing(true);
    setCurrentStepIndex(0);

    const steps: FlowStep[] = selectedFlowData.steps.map((step) => ({
      ...step,
      status: "pending",
    }));

    setFlowSteps(steps);

    // Simulate processing each step
    for (let i = 0; i < steps.length; i++) {
      setCurrentStepIndex(i);

      // Update current step to processing
      setFlowSteps((prev) =>
        prev.map((step, index) =>
          index === i ? { ...step, status: "processing" } : step
        )
      );

      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Update step to completed with mock result
      const mockResults = [
        "Fixed 3 grammatical errors",
        "Improved readability score by 15%",
        "Enhanced professional tone",
        "Added 2 proper citations",
        "No plagiarism detected",
        "Optimized for better engagement",
        "Added creative elements",
        "Improved narrative pacing",
        "Strengthened call-to-action",
        "Enhanced SEO keywords",
      ];

      setFlowSteps((prev) =>
        prev.map((step, index) =>
          index === i
            ? {
                ...step,
                status: "completed",
                result:
                  mockResults[Math.floor(Math.random() * mockResults.length)],
              }
            : step
        )
      );
    }

    // Set final result
    const enhancedText = inputText + " [Enhanced through QuillBot Flow]";
    setFinalResult(enhancedText);
    setIsProcessing(false);
    setCurrentStepIndex(-1);
  };

  const selectedFlowData = flows.find((f) => f.id === selectedFlow);
  const progress =
    flowSteps.length > 0
      ? (flowSteps.filter((s) => s.status === "completed").length /
          flowSteps.length) *
        100
      : 0;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Workflow className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-bold">QuillBot Flow</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Automated writing enhancement workflows for different use cases
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Flow Selection */}
        <div className="xl:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Select Flow</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={selectedFlow} onValueChange={setSelectedFlow}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {flows.map((flow) => (
                    <SelectItem
                      key={flow.id}
                      value={flow.id}
                      disabled={flow.premium}
                    >
                      <div className="flex items-center gap-2">
                        <span>{flow.name}</span>
                        {flow.premium && (
                          <Badge variant="secondary" className="text-xs">
                            Pro
                          </Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedFlowData && (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    {selectedFlowData.description}
                  </p>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Flow Steps:</h4>
                    <div className="space-y-2">
                      {selectedFlowData.steps.map((step, index) => (
                        <div
                          key={step.id}
                          className="flex items-center gap-2 text-xs"
                        >
                          <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-medium">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{step.name}</div>
                            <div className="text-gray-500">
                              {step.description}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Flow Progress */}
          {flowSteps.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">
                      Overall Progress
                    </span>
                    <span className="text-sm">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>

                <div className="space-y-2">
                  {flowSteps.map((step, index) => (
                    <div
                      key={step.id}
                      className="flex items-center gap-2 text-xs"
                    >
                      <div className="flex items-center justify-center w-5 h-5">
                        {step.status === "completed" ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : step.status === "processing" ? (
                          <Zap className="h-4 w-4 text-blue-500 animate-spin" />
                        ) : (
                          <Clock className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div
                          className={`font-medium ${
                            step.status === "completed"
                              ? "text-green-600"
                              : step.status === "processing"
                              ? "text-blue-600"
                              : "text-gray-500"
                          }`}
                        >
                          {step.name}
                        </div>
                        {step.result && (
                          <div className="text-gray-500">{step.result}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Input and Output */}
        <div className="xl:col-span-2 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Input Text
              </label>
              <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter your text to enhance with the selected flow..."
                className="min-h-[300px] resize-none"
                disabled={isProcessing}
              />
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  {inputText.length} characters •{" "}
                  {inputText.split(/\s+/).filter((w) => w.length > 0).length}{" "}
                  words
                </p>
                <Button
                  onClick={startFlow}
                  disabled={!inputText.trim() || isProcessing}
                  size="sm"
                >
                  {isProcessing ? (
                    <>
                      <Zap className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Start Flow
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Enhanced Result
              </label>
              <Textarea
                value={finalResult}
                readOnly
                placeholder="Enhanced content will appear here after processing..."
                className="min-h-[300px] resize-none bg-muted/50"
              />
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  {finalResult.length} characters •{" "}
                  {finalResult.split(/\s+/).filter((w) => w.length > 0).length}{" "}
                  words
                </p>
                {finalResult && (
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Flow Visualization */}
          {flowSteps.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Flow Pipeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {flowSteps.map((step, index) => (
                    <div
                      key={step.id}
                      className="flex items-center gap-2 flex-shrink-0"
                    >
                      <div
                        className={`
                        flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium
                        ${
                          step.status === "completed"
                            ? "bg-green-100 text-green-600"
                            : step.status === "processing"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-100 text-gray-600"
                        }
                      `}
                      >
                        {step.status === "completed" ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : step.status === "processing" ? (
                          <Zap className="h-4 w-4 animate-spin" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <div className="text-xs">
                        <div className="font-medium">{step.name}</div>
                        {step.result && (
                          <div className="text-gray-500 max-w-24 truncate">
                            {step.result}
                          </div>
                        )}
                      </div>
                      {index < flowSteps.length - 1 && (
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {finalResult && (
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">98%</div>
                    <div className="text-xs text-gray-500">Quality Score</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">+23%</div>
                    <div className="text-xs text-gray-500">Readability</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">5</div>
                    <div className="text-xs text-gray-500">Steps Completed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">
                      2.3s
                    </div>
                    <div className="text-xs text-gray-500">Processing Time</div>
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
