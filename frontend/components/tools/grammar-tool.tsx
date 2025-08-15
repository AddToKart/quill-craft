"use client";

import { useState } from 'react';
import { TextEditor } from '@/components/text-editor';
import { StatsCounter } from '@/components/stats-counter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Copy, Download, RefreshCw, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { getDummyGrammarCheck } from '@/lib/dummy-data';

export function GrammarTool() {
  const [inputText, setInputText] = useState('This are a example text with some grammar mistake and spelling erors.');
  const [isLoading, setIsLoading] = useState(false);
  const [corrections, setCorrections] = useState<any[]>([]);

  const handleGrammarCheck = async () => {
    if (!inputText.trim()) {
      toast.error('Please enter some text to check');
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const grammarResults = getDummyGrammarCheck(inputText);
    setCorrections(grammarResults);
    setIsLoading(false);
    
    toast.success(`Found ${grammarResults.length} issues to review`);
  };

  const applySuggestion = (index: number, suggestion: string) => {
    const correction = corrections[index];
    const newText = inputText.substring(0, correction.start) + 
                    suggestion + 
                    inputText.substring(correction.end);
    
    setInputText(newText);
    
    // Remove this correction from the list
    setCorrections(corrections.filter((_, i) => i !== index));
    toast.success('Correction applied!');
  };

  const highlightText = (text: string, corrections: any[]) => {
    if (corrections.length === 0) return text;
    
    let result = [];
    let lastIndex = 0;
    
    corrections.forEach((correction, index) => {
      // Add text before the error
      result.push(text.substring(lastIndex, correction.start));
      
      // Add highlighted error
      result.push(
        <span 
          key={index}
          className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 underline decoration-wavy cursor-pointer rounded px-1"
          title={correction.message}
        >
          {text.substring(correction.start, correction.end)}
        </span>
      );
      
      lastIndex = correction.end;
    });
    
    // Add remaining text
    result.push(text.substring(lastIndex));
    
    return result;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Grammar Checker</h1>
          <p className="text-muted-foreground mt-1">
            Check and fix grammar, spelling, and punctuation errors
          </p>
        </div>
        <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
          <CheckCircle className="h-3 w-3 mr-1" />
          Advanced AI
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Text to Check</h3>
                <StatsCounter text={inputText} />
              </div>
              
              <div className="min-h-[200px] p-3 border rounded-md focus-within:ring-2 focus-within:ring-ring">
                <div className="whitespace-pre-wrap leading-relaxed">
                  {highlightText(inputText, corrections)}
                </div>
              </div>
              
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full min-h-[100px] p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Enter your text here to check for grammar issues..."
              />
              
              <div className="flex items-center justify-between">
                <Button
                  onClick={handleGrammarCheck}
                  disabled={isLoading || !inputText.trim()}
                  className="bg-primary hover:bg-primary/90"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Checking...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Check Grammar
                    </>
                  )}
                </Button>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigator.clipboard.writeText(inputText)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-4">
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Issues Found ({corrections.length})
            </h3>
            
            {corrections.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No issues found. Click "Check Grammar" to analyze your text.
              </p>
            ) : (
              <div className="space-y-3">
                {corrections.map((correction, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-start gap-2 mb-2">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        correction.type === 'spelling' ? 'bg-red-500' :
                        correction.type === 'grammar' ? 'bg-orange-500' :
                        'bg-blue-500'
                      }`} />
                      <div className="flex-1">
                        <div className="text-sm font-medium capitalize">
                          {correction.type} Error
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {correction.message}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-xs text-muted-foreground">
                        Error: <span className="font-mono bg-muted px-1 rounded">
                          {correction.original}
                        </span>
                      </div>
                      
                      {correction.suggestions.map((suggestion: string, suggestionIndex: number) => (
                        <Button
                          key={suggestionIndex}
                          variant="outline"
                          size="sm"
                          className="w-full justify-start text-left h-auto py-2"
                          onClick={() => applySuggestion(index, suggestion)}
                        >
                          <CheckCircle className="h-3 w-3 mr-2 text-green-600" />
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
          
          <Card className="p-4">
            <h3 className="font-medium mb-3">Grammar Score</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Quality</span>
                <span className="font-medium">
                  {corrections.length === 0 ? '100%' : 
                   corrections.length <= 2 ? '85%' : 
                   corrections.length <= 5 ? '70%' : '45%'}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    corrections.length === 0 ? 'bg-green-500 w-full' :
                    corrections.length <= 2 ? 'bg-green-500 w-4/5' :
                    corrections.length <= 5 ? 'bg-yellow-500 w-3/5' : 'bg-red-500 w-2/5'
                  }`}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}