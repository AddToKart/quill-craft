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
import { Zap, Crown, Info } from "lucide-react";

interface ModelSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const models = [
  {
    id: "lite",
    name: "Lite",
    description: "Fast and basic rewriting",
    speed: "Fastest",
    quality: "Basic",
    free: true,
    icon: Zap,
  },
  {
    id: "normal",
    name: "Normal",
    description: "Balanced quality and speed",
    speed: "Fast",
    quality: "Good",
    free: true,
    icon: Zap,
  },
  {
    id: "heavy",
    name: "Heavy",
    description: "More accurate, slower processing",
    speed: "Medium",
    quality: "High",
    free: true,
    icon: Zap,
  },
  {
    id: "pro",
    name: "Pro",
    description: "Highest quality, premium only",
    speed: "Slow",
    quality: "Excellent",
    free: false,
    icon: Crown,
  },
];

export function ModelSelector({ value, onChange }: ModelSelectorProps) {
  const selectedModel = models.find((model) => model.id === value);
  const SelectedIcon = selectedModel?.icon || Zap;

  return (
    <Card className="p-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium flex items-center gap-2">
            <SelectedIcon className="h-4 w-4" />
            AI Model
          </h3>
          {selectedModel && !selectedModel.free && (
            <Badge
              variant="secondary"
              className="text-xs bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 dark:from-purple-900 dark:to-blue-900 dark:text-purple-300"
            >
              Pro
            </Badge>
          )}
        </div>

        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="w-full">
            <SelectValue>
              {selectedModel && (
                <div className="flex items-center gap-2">
                  <SelectedIcon className="h-4 w-4" />
                  <span>{selectedModel.name}</span>
                </div>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {models.map((model) => {
              const Icon = model.icon;
              const isLocked = !model.free;

              return (
                <SelectItem
                  key={model.id}
                  value={model.id}
                  disabled={isLocked}
                  className={isLocked ? "opacity-60" : ""}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <Icon
                        className={`h-4 w-4 ${
                          isLocked ? "text-yellow-500" : ""
                        }`}
                      />
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{model.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {model.description}
                        </span>
                      </div>
                    </div>
                    {isLocked && (
                      <Crown className="h-3 w-3 text-yellow-500 ml-2" />
                    )}
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
              <span>Quality: {selectedModel.quality}</span>
            </div>
            {!selectedModel.free && (
              <div className="text-yellow-600 dark:text-yellow-400 font-medium">
                Requires Premium Subscription
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
