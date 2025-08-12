"use client";

import { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';

interface StatsCounterProps {
  text: string;
  showCharacters?: boolean;
}

export function StatsCounter({ text, showCharacters = true }: StatsCounterProps) {
  const stats = useMemo(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    
    return {
      words,
      characters,
      charactersNoSpaces
    };
  }, [text]);

  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <Badge variant="outline" className="text-xs">
        {stats.words} words
      </Badge>
      {showCharacters && (
        <Badge variant="outline" className="text-xs">
          {stats.characters} chars
        </Badge>
      )}
    </div>
  );
}