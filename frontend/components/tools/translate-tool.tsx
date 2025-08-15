"use client";

import { useState } from 'react';
import { TextEditor } from '@/components/text-editor';
import { StatsCounter } from '@/components/stats-counter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Languages, Copy, Download, RefreshCw, ArrowUpDown } from 'lucide-react';
import { toast } from 'sonner';
import { getDummyTranslation, languages } from '@/lib/dummy-data';

export function TranslateTool() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      toast.error('Please enter some text to translate');
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const translated = getDummyTranslation(inputText, sourceLang, targetLang);
    setOutputText(translated);
    setIsLoading(false);
    
    toast.success('Text translated successfully!');
  };

  const swapLanguages = () => {
    const tempLang = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(tempLang);
    
    const tempText = inputText;
    setInputText(outputText);
    setOutputText(tempText);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Translator</h1>
          <p className="text-muted-foreground mt-1">
            Translate text between multiple languages with AI precision
          </p>
        </div>
        <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
          <Languages className="h-3 w-3 mr-1" />
          100+ Languages
        </Badge>
      </div>

      {/* Language Selection */}
      <Card className="p-4">
        <div className="flex items-center justify-center gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">From</label>
            <Select value={sourceLang} onValueChange={setSourceLang}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button
            variant="outline"
            size="icon"
            className="mt-6"
            onClick={swapLanguages}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
          
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">To</label>
            <Select value={targetLang} onValueChange={setTargetLang}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">
                Original ({languages.find(l => l.code === sourceLang)?.name})
              </h3>
              <StatsCounter text={inputText} />
            </div>
            
            <TextEditor
              value={inputText}
              onChange={setInputText}
              placeholder="Enter text to translate..."
              className="min-h-[300px]"
            />
          </div>
        </Card>

        <Card className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">
                Translation ({languages.find(l => l.code === targetLang)?.name})
              </h3>
              <div className="flex items-center gap-2">
                <StatsCounter text={outputText} />
                {outputText && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(outputText)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
            
            {outputText ? (
              <div className="min-h-[300px] p-4 bg-muted/30 rounded-lg border border-dashed">
                <p className="whitespace-pre-wrap">{outputText}</p>
              </div>
            ) : (
              <div className="min-h-[300px] p-4 bg-muted/30 rounded-lg border border-dashed flex items-center justify-center">
                <p className="text-muted-foreground">Translation will appear here</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={handleTranslate}
          disabled={isLoading || !inputText.trim()}
          size="lg"
          className="bg-primary hover:bg-primary/90"
        >
          {isLoading ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Translating...
            </>
          ) : (
            <>
              <Languages className="h-4 w-4 mr-2" />
              Translate
            </>
          )}
        </Button>
      </div>
    </div>
  );
}