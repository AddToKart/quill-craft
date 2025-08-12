"use client";

import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Palette } from "lucide-react";

interface ToneSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const tones = [
  {
    id: "standard",
    name: "Standard",
    description: "Natural and balanced tone",
    example: "Clear and professional writing",
  },
  {
    id: "formal",
    name: "Formal",
    description: "Professional and academic",
    example: "Business and academic contexts",
  },
  {
    id: "casual",
    name: "Casual",
    description: "Relaxed and conversational",
    example: "Friendly and approachable style",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Expressive and imaginative",
    example: "Artistic and engaging language",
  },
  {
    id: "academic",
    name: "Academic",
    description: "Scholarly and precise",
    example: "Research and educational writing",
  },
];

export function ToneSelector({ value, onChange }: ToneSelectorProps) {
  const selectedTone = tones.find((tone) => tone.id === value);

  return (
    <Card className="p-4">
      <div className="space-y-3">
        <h3 className="font-medium flex items-center gap-2">
          <Palette className="h-4 w-4" />
          Writing Tone
        </h3>

        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="w-full">
            <SelectValue>
              {selectedTone && (
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  <span>{selectedTone.name}</span>
                </div>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {tones.map((tone) => (
              <SelectItem key={tone.id} value={tone.id}>
                <div className="flex flex-col items-start">
                  <span className="font-medium">{tone.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {tone.description}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedTone && (
          <div className="text-xs text-muted-foreground">
            <div className="font-medium mb-1">Example:</div>
            <div>{selectedTone.example}</div>
          </div>
        )}
      </div>
    </Card>
  );
}
