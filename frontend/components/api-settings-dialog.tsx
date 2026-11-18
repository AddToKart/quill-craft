"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Settings, Key, Globe, Cpu, CheckCircle2, AlertCircle, Eye, EyeOff } from "lucide-react";
import { apiClient, CustomModelConfig } from "@/lib/api-client";
import { toast } from "sonner";

interface ApiSettingsDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
}

export function ApiSettingsDialog({
  open,
  onOpenChange,
  trigger,
}: ApiSettingsDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const setOpen = isControlled ? onOpenChange! : setInternalOpen;

  const [baseUrl, setBaseUrl] = useState("https://api.openai.com/v1");
  const [modelName, setModelName] = useState("gpt-4o-mini");
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
    latencyMs?: number;
  } | null>(null);

  useEffect(() => {
    const config = apiClient.getStoredConfig();
    if (config.baseUrl) setBaseUrl(config.baseUrl);
    if (config.modelName) setModelName(config.modelName);
    if (config.apiKey) setApiKey(config.apiKey);
  }, [isOpen]);

  const handleSave = () => {
    const config: CustomModelConfig = {
      baseUrl: baseUrl.trim(),
      modelName: modelName.trim(),
      apiKey: apiKey.trim(),
    };
    apiClient.saveConfig(config);
    toast.success("AI Subscription settings saved successfully!");
    setOpen(false);
  };

  const handleTestConnection = async () => {
    if (!apiKey.trim()) {
      toast.error("Please enter your API Key before testing connection.");
      return;
    }

    setTesting(true);
    setTestResult(null);

    try {
      const res = await apiClient.testApiConfig({
        baseUrl: baseUrl.trim(),
        modelName: modelName.trim(),
        apiKey: apiKey.trim(),
      });
      setTestResult({
        success: true,
        message: `Connected successfully to ${res.model}! Latency: ${res.latencyMs}ms`,
        latencyMs: res.latencyMs,
      });
      toast.success("Connection test passed!");
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err.message || "Failed to connect to AI provider",
      });
      toast.error("Connection test failed");
    } finally {
      setTesting(false);
    }
  };

  const setPreset = (presetBaseUrl: string, presetModel: string) => {
    setBaseUrl(presetBaseUrl);
    setModelName(presetModel);
    setTestResult(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      {trigger ? (
        <DialogTrigger asChild>{trigger}</DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">AI Settings</span>
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold">
            <Settings className="h-5 w-5 text-primary" />
            AI Subscription Settings
          </DialogTitle>
          <DialogDescription>
            Configure your custom OpenAI-compatible subscription. Your credentials are used directly to bypass ZeroGPT & GPTZero.
          </DialogDescription>
        </DialogHeader>

        {/* Quick Presets */}
        <div className="space-y-2 pt-1">
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Quick Provider Presets
          </Label>
          <div className="flex flex-wrap gap-1.5">
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-emerald-500/10 border-emerald-500/40 text-emerald-700 dark:text-emerald-400 font-semibold transition-colors"
              onClick={() => setPreset("https://api.commandcode.ai/provider/v1", "claude-3-5-sonnet")}
            >
              ⚡ Command Code
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-primary/10 transition-colors"
              onClick={() => setPreset("https://api.openai.com/v1", "gpt-4o-mini")}
            >
              OpenAI (gpt-4o-mini)
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-primary/10 transition-colors"
              onClick={() => setPreset("https://api.openai.com/v1", "gpt-4o")}
            >
              OpenAI (gpt-4o)
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-primary/10 transition-colors"
              onClick={() => setPreset("https://openrouter.ai/api/v1", "meta-llama/llama-3.3-70b-instruct")}
            >
              OpenRouter
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-primary/10 transition-colors"
              onClick={() => setPreset("https://api.deepseek.com/v1", "deepseek-chat")}
            >
              DeepSeek
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-primary/10 transition-colors"
              onClick={() => setPreset("https://api.groq.com/openai/v1", "llama-3.3-70b-versatile")}
            >
              Groq
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-primary/10 transition-colors"
              onClick={() => setPreset("http://localhost:11434/v1", "llama3")}
            >
              Ollama (Local)
            </Badge>
          </div>
        </div>

        <div className="space-y-4 py-2">
          {/* Base URL */}
          <div className="space-y-1.5">
            <Label htmlFor="base-url" className="flex items-center gap-1.5 text-sm font-medium">
              <Globe className="h-4 w-4 text-muted-foreground" />
              Base URL
            </Label>
            <Input
              id="base-url"
              placeholder="https://api.openai.com/v1"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
            />
            <p className="text-[11px] text-muted-foreground">
              Compatible with any OpenAI API endpoint (OpenAI, OpenRouter, DeepSeek, Groq, Ollama, vLLM).
            </p>
          </div>

          {/* Model Name */}
          <div className="space-y-1.5">
            <Label htmlFor="model-name" className="flex items-center gap-1.5 text-sm font-medium">
              <Cpu className="h-4 w-4 text-muted-foreground" />
              Model Name
            </Label>
            <Input
              id="model-name"
              placeholder="e.g. gpt-4o-mini, deepseek-chat, claude-3-5-sonnet"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
            />
          </div>

          {/* API Key */}
          <div className="space-y-1.5">
            <Label htmlFor="api-key" className="flex items-center gap-1.5 text-sm font-medium">
              <Key className="h-4 w-4 text-muted-foreground" />
              API Key
            </Label>
            <div className="relative">
              <Input
                id="api-key"
                type={showKey ? "text" : "password"}
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="pr-10 font-mono text-sm"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Stored locally in your browser. You can also specify AI_API_KEY in backend/.env.
            </p>
          </div>

          {/* Connection Test Output */}
          {testResult && (
            <div
              className={`p-3 rounded-lg border text-xs flex items-start gap-2 ${
                testResult.success
                  ? "bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-300"
                  : "bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-300"
              }`}
            >
              {testResult.success ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600 mt-0.5" />
              ) : (
                <AlertCircle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
              )}
              <span>{testResult.message}</span>
            </div>
          )}
        </div>

        <DialogFooter className="flex items-center justify-between sm:justify-between gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleTestConnection}
            disabled={testing}
          >
            {testing ? "Testing..." : "Test Connection"}
          </Button>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              className="bg-primary text-primary-foreground font-semibold"
              onClick={handleSave}
            >
              Save Credentials
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
