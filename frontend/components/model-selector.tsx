"use client";

import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Zap, Sparkles } from "lucide-react";

interface ModelSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const models = [
  {
    id: "normal",
    name: "Custom Subscription Model",
    description: "Uses your configured Base URL, Model Name & API Key",
    speed: "Fast",
    quality: "High (0% AI)",
    free: true,
    icon: ShieldCheck,
  },
  {
    id: "pro",
    name: "ZeroGPT Shield Max",
    description: "Maximum burstiness and perplexity variation",
    speed: "High Precision",
    quality: "Exceptional",
    free: true,
    icon: Sparkles,
  },
];

export function ModelSelector({ value, onChange }: ModelSelectorProps) {
  const selectedModel = models.find((model) => model.id === value) || models[0];
  const SelectedIcon = selectedModel?.icon || ShieldCheck;

  return (
    <Card className="p-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium flex items-center gap-2 text-sm">
            <SelectedIcon className="h-4 w-4 text-emerald-600" />
            AI Subscription Model
          </h3>
          <Badge
            variant="secondary"
            className="text-[11px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold"
          >
            ZeroGPT Bypass
          </Badge>
        </div>

        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="w-full">
            <SelectValue>
              {selectedModel && (
                <div className="flex items-center gap-2">
                  <SelectedIcon className="h-4 w-4 text-emerald-600" />
                  <span>{selectedModel.name}</span>
                </div>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {models.map((model) => {
              const Icon = model.icon;

              return (
                <SelectItem key={model.id} value={model.id}>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-emerald-600" />
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{model.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {model.description}
                        </span>
                      </div>
                    </div>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        {selectedModel && (
          <div className="text-xs text-muted-foreground space-y-1">
            <div className="flex justify-between">
              <span>Speed: {selectedModel.speed}</span>
              <span>Bypass: {selectedModel.quality}</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
