"use client";

import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Shuffle } from "lucide-react";

interface SynonymStrengthProps {
  value: number;
  onChange: (value: number) => void;
}

const getStrengthLabel = (value: number) => {
  if (value <= 20) return "Minimal";
  if (value <= 40) return "Light";
  if (value <= 60) return "Moderate";
  if (value <= 80) return "Strong";
  return "Maximum";
};

const getStrengthDescription = (value: number) => {
  if (value <= 20) return "Keep most original words";
  if (value <= 40) return "Replace some words";
  if (value <= 60) return "Balanced replacement";
  if (value <= 80) return "Replace many words";
  return "Maximum variation";
};

export function SynonymStrength({ value, onChange }: SynonymStrengthProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-medium flex items-center gap-2 text-sm">
          <Shuffle className="h-4 w-4" />
          Synonyms
        </h3>
        <Badge variant="outline" className="text-xs">
          {getStrengthLabel(value)}
        </Badge>
      </div>

      <div className="space-y-2">
        <Slider
          value={[value]}
          onValueChange={(values) => onChange(values[0])}
          max={100}
          min={0}
          step={10}
          className="w-full"
        />

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Less</span>
          <span>More</span>
        </div>

        <div className="text-xs text-muted-foreground">
          {getStrengthDescription(value)}
        </div>
      </div>
    </div>
  );
}
