"use client";

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Bold, Italic, Underline, Type, List } from 'lucide-react';

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  showToolbar?: boolean;
}

export function TextEditor({ 
  value, 
  onChange, 
  placeholder = "Enter your text here...", 
  className,
  showToolbar = true 
}: TextEditorProps) {
  const applyFormat = (format: string) => {
    // This would typically interact with a rich text editor
    // For demo purposes, we'll just show the buttons
  };

  return (
    <div className="space-y-2">
      {showToolbar && (
        <div className="flex items-center gap-1 p-2 border-b">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => applyFormat('bold')}
            className="h-8 w-8 p-0"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => applyFormat('italic')}
            className="h-8 w-8 p-0"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => applyFormat('underline')}
            className="h-8 w-8 p-0"
          >
            <Underline className="h-4 w-4" />
          </Button>
          <div className="w-px h-6 bg-border mx-2" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => applyFormat('heading')}
            className="h-8 w-8 p-0"
          >
            <Type className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => applyFormat('list')}
            className="h-8 w-8 p-0"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
          "bg-background text-foreground placeholder:text-muted-foreground",
          "transition-colors duration-200",
          className
        )}
        rows={8}
      />
    </div>
  );
}