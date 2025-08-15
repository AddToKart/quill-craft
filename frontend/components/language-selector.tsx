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
import { Globe } from "lucide-react";

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const languages = [
  {
    id: "en-us",
    name: "English (US)",
    flag: "🇺🇸",
    free: true,
  },
  {
    id: "en-uk",
    name: "English (UK)",
    flag: "🇬🇧",
    free: true,
  },
  {
    id: "fr",
    name: "French",
    flag: "🇫🇷",
    free: false,
  },
  {
    id: "es",
    name: "Spanish",
    flag: "🇪🇸",
    free: false,
  },
  {
    id: "de",
    name: "German",
    flag: "🇩🇪",
    free: false,
  },
  {
    id: "it",
    name: "Italian",
    flag: "🇮🇹",
    free: false,
  },
  {
    id: "pt",
    name: "Portuguese",
    flag: "🇵🇹",
    free: false,
  },
  {
    id: "nl",
    name: "Dutch",
    flag: "🇳🇱",
    free: false,
  },
];

export function LanguageSelector({ value, onChange }: LanguageSelectorProps) {
  const selectedLanguage = languages.find((lang) => lang.id === value);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-medium flex items-center gap-2 text-sm">
          <Globe className="h-4 w-4" />
          Language
        </h3>
        {selectedLanguage && !selectedLanguage.free && (
          <Badge
            variant="secondary"
            className="text-xs bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 dark:from-purple-900 dark:to-blue-900 dark:text-purple-300"
          >
            Pro
          </Badge>
        )}
      </div>

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full h-9">
          <SelectValue>
            {selectedLanguage && (
              <div className="flex items-center gap-2">
                <span className="text-sm">{selectedLanguage.flag}</span>
                <span className="text-sm">{selectedLanguage.name}</span>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {languages.map((language) => {
            const isLocked = !language.free;

            return (
              <SelectItem
                key={language.id}
                value={language.id}
                disabled={isLocked}
                className={isLocked ? "opacity-60" : ""}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{language.flag}</span>
                    <span>{language.name}</span>
                  </div>
                  {isLocked && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      Pro
                    </Badge>
                  )}
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
