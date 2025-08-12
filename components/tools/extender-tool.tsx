"use client";

import { useState } from 'react';
import { TextEditor } from '@/components/text-editor';
import { StatsCounter } from '@/components/stats-counter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileUp, Copy, Download, RefreshCw, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import { getDummyExtension } from '@/lib/dummy-data';

export function ExtenderTool() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [extensionLevel, setExtensionLevel] = useState('moderate');
  const [isLoading, setIsLoading] = useState(false);

  const handleExtend = async () => {
    if (!inputText.trim()) {
      toast.error('Please enter some text to extend');
      return;
    }

    if (inputText.split(' ').length < 10) {
      toast.error('Please enter at least 10 words for effective extension');
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const extended = getDummyExtension(inputText, extensionLevel);
    setOutputText(extended);
    setIsLoading(false);
    
    toast.success('Text extended successfully!');
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const getExtensionLevels = () => [
    { value: 'slight', label: 'Slight Extension', description: '25-50% longer' },
    { value: 'moderate', label: 'Moderate Extension', description: '50-100% longer' },
    { value: 'detailed', label: 'Detailed Extension', description: '100-200% longer' },
    { value: 'comprehensive', label: 'Comprehensive', description: '200%+ longer' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Text Extender</h1>
          <p className="text-muted-foreground mt-1">
            Expand your text while preserving the original context and meaning
          </p>
        </div>
        <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
          <TrendingUp className="h-3 w-3 mr-1" />
          Content AI
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
                placeholder="Enter your text here to extend and elaborate on it. The AI will add relevant details, examples, and explanations while keeping the original context..."
                className="min-h-[200px]"
              />
              
              <div className="flex items-center justify-between">
                <Button
                  onClick={handleExtend}
                  disabled={isLoading || !inputText.trim()}
                  className="bg-primary hover:bg-primary/90"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Extending...
                    </>
                  ) : (
                    <>
                      <FileUp className="h-4 w-4 mr-2" />
                      Extend Text
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
                  <h3 className="font-medium">Extended Text</h3>
                  <div className="flex items-center gap-2">
                    <StatsCounter text={outputText} />
                    <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                      +{Math.round(((outputText.length - inputText.length) / inputText.length) * 100)}% expansion
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
                
                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 rounded-lg border-l-4 border-green-500">
                  <p className="whitespace-pre-wrap leading-relaxed">{outputText}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="text-muted-foreground mb-1">Original</div>
                    <div className="font-medium">{inputText.split(' ').length} words</div>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="text-muted-foreground mb-1">Extended</div>
                    <div className="font-medium">{outputText.split(' ').length} words</div>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <Card className="p-4">
            <h3 className="font-medium mb-4">Extension Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Extension Level</label>
                <Select value={extensionLevel} onValueChange={setExtensionLevel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {getExtensionLevels().map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        <div className="flex flex-col items-start">
                          <span>{level.label}</span>
                          <span className="text-xs text-muted-foreground">
                            {level.description}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <h3 className="font-medium mb-3">What Gets Added</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Supporting details and examples</li>
              <li>• Context and background info</li>
              <li>• Explanations and elaborations</li>
              <li>• Smooth transitions between ideas</li>
            </ul>
          </Card>

          <Card className="p-4">
            <h3 className="font-medium mb-3">Best Use Cases</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Essays and academic writing</li>
              <li>• Blog posts and articles</li>
              <li>• Reports and proposals</li>
              <li>• Creative writing projects</li>
            </ul>
          </Card>

          <Card className="p-4">
            <h3 className="font-medium mb-3">Tips</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Start with clear, well-structured text</li>
              <li>• Choose appropriate extension level</li>
              <li>• Review and edit the extended content</li>
              <li>• Use for brainstorming and ideation</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}