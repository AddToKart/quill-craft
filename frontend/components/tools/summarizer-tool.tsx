"use client";

import { useState } from 'react';
import { TextEditor } from '@/components/text-editor';
import { StatsCounter } from '@/components/stats-counter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { FileDown, Copy, Download, RefreshCw, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { getDummySummary } from '@/lib/dummy-data';

export function SummarizerTool() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [summaryLength, setSummaryLength] = useState([50]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSummarize = async () => {
    if (!inputText.trim()) {
      toast.error('Please enter some text to summarize');
      return;
    }

    if (inputText.split(' ').length < 50) {
      toast.error('Please enter at least 50 words for effective summarization');
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const summary = getDummySummary(inputText, summaryLength[0]);
    setOutputText(summary);
    setIsLoading(false);
    
    toast.success('Text summarized successfully!');
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const getSummaryLengthLabel = (length: number) => {
    if (length <= 30) return 'Very Short';
    if (length <= 50) return 'Short';
    if (length <= 70) return 'Medium';
    return 'Detailed';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Summarizer</h1>
          <p className="text-muted-foreground mt-1">
            Create concise summaries while preserving key information
          </p>
        </div>
        <Badge variant="secondary" className="bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300">
          <Zap className="h-3 w-3 mr-1" />
          Smart AI
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Original Text</h3>
                <StatsCounter text={inputText} />
              </div>
              
              <TextEditor
                value={inputText}
                onChange={setInputText}
                placeholder="Paste or type your long text here to summarize it. For best results, use at least 50 words..."
                className="min-h-[250px]"
              />
              
              <div className="flex items-center justify-between">
                <Button
                  onClick={handleSummarize}
                  disabled={isLoading || !inputText.trim()}
                  className="bg-primary hover:bg-primary/90"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Summarizing...
                    </>
                  ) : (
                    <>
                      <FileDown className="h-4 w-4 mr-2" />
                      Summarize
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>

          {outputText && (
            <Card className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Summary</h3>
                  <div className="flex items-center gap-2">
                    <StatsCounter text={outputText} />
                    <Badge variant="outline">
                      {Math.round((outputText.length / inputText.length) * 100)}% reduction
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(outputText)}
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
                
                <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 rounded-lg border-l-4 border-blue-500">
                  <p className="whitespace-pre-wrap leading-relaxed">{outputText}</p>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Original: {inputText.split(' ').length} words</span>
                  <span>•</span>
                  <span>Summary: {outputText.split(' ').length} words</span>
                  <span>•</span>
                  <span>{Math.round((1 - outputText.length / inputText.length) * 100)}% shorter</span>
                </div>
              </div>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <Card className="p-4">
            <h3 className="font-medium mb-4">Summary Settings</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Summary Length</label>
                  <Badge variant="outline">
                    {getSummaryLengthLabel(summaryLength[0])}
                  </Badge>
                </div>
                <Slider
                  value={summaryLength}
                  onValueChange={setSummaryLength}
                  min={20}
                  max={80}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Brief</span>
                  <span>Detailed</span>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <h3 className="font-medium mb-3">Summary Features</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Preserves key information</li>
              <li>• Maintains original context</li>
              <li>• Adjustable length control</li>
              <li>• Fast processing speed</li>
            </ul>
          </Card>

          <Card className="p-4">
            <h3 className="font-medium mb-3">Best Practices</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Use at least 50 words</li>
              <li>• Include clear main points</li>
              <li>• Review summary accuracy</li>
              <li>• Adjust length as needed</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}