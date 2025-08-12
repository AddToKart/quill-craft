"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Zap,
  Users,
  GraduationCap,
  Briefcase,
  BookOpen,
  Lightbulb,
  TrendingUp,
  ArrowDown,
  Settings,
} from "lucide-react";

interface ModeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const modes = [
  {
    id: "standard",
    name: "Standard",
    description: "Balanced rewriting with natural flow",
    icon: FileText,
  },
  {
    id: "fluency",
    name: "Fluency",
    description: "Improve readability and flow",
    icon: Zap,
  },
  {
    id: "humanize",
    name: "Humanize",
    description: "Make text sound more natural and human",
    icon: Users,
  },
  {
    id: "formal",
    name: "Formal",
    description: "Professional and business-appropriate",
    icon: Briefcase,
  },
  {
    id: "academic",
    name: "Academic",
    description: "Scholarly and research-oriented",
    icon: GraduationCap,
  },
  {
    id: "simple",
    name: "Simple",
    description: "Clear and easy to understand",
    icon: BookOpen,
  },
  {
    id: "creative",
    name: "Creative",
    description: "Expressive and imaginative style",
    icon: Lightbulb,
  },
  {
    id: "expand",
    name: "Expand",
    description: "Add more detail and explanation",
    icon: TrendingUp,
  },
  {
    id: "shorten",
    name: "Shorten",
    description: "Make text more concise",
    icon: ArrowDown,
  },
  {
    id: "custom",
    name: "Custom",
    description: "Advanced customization options",
    icon: Settings,
    premium: true,
  },
];

export function ModeSelector({ value, onChange }: ModeSelectorProps) {
  const selectedMode = modes.find((mode) => mode.id === value);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Writing Mode
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue>
            <div className="flex items-center gap-2">
              {selectedMode && (
                <>
                  <selectedMode.icon className="h-4 w-4" />
                  <span>{selectedMode.name}</span>
                  {selectedMode.premium && (
                    <Badge variant="secondary" className="text-xs">
                      Pro
                    </Badge>
                  )}
                </>
              )}
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {modes.map((mode) => {
            const Icon = mode.icon;
            return (
              <SelectItem key={mode.id} value={mode.id} disabled={mode.premium}>
                <div className="flex items-center gap-2 w-full">
                  <Icon className="h-4 w-4" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{mode.name}</span>
                      {mode.premium && (
                        <Badge variant="secondary" className="text-xs">
                          Pro
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {mode.description}
                    </p>
                  </div>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
