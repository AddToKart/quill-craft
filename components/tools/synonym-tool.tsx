"use client";

import { useState } from 'react';
import { TextEditor } from '@/components/text-editor';
import { StatsCounter } from '@/components/stats-counter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Copy, Download, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { getDummySynonyms } from '@/lib/dummy-data';

export function SynonymTool() {
  const [inputText, setInputText] = useState('The quick brown fox jumps over the lazy dog. This sentence is often used for typing practice.');
  const [selectedWord, setSelectedWord] = useState('');
  const [synonyms, setSynonyms] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleWordClick = async (word: string) => {
    if (word.length < 3 || !/^[a-zA-Z]+$/.test(word)) {
      toast.error('Please select a valid word');
      return;
    }

    setSelectedWord(word);
    setIsLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const wordSynonyms = getDummySynonyms(word);
    setSynonyms(wordSynonyms);
    setIsLoading(false);

    if (wordSynonyms.length === 0) {
      toast.error('No synonyms found for this word');
    } else {
      toast.success(`Found ${wordSynonyms.length} synonyms for "${word}"`);
    }
  };

  const replaceWord = (synonym: string) => {
    const newText = inputText.replace(new RegExp(`\\b${selectedWord}\\b`, 'g'), synonym);
    setInputText(newText);
    toast.success(`Replaced "${selectedWord}" with "${synonym}"`);
  };

  const renderClickableText = (text: string) => {
    return text.split(/(\s+)/).map((part, index) => {
      const cleanWord = part.replace(/[^\w]/g, '');
      if (cleanWord.length > 2 && /^[a-zA-Z]+$/.test(cleanWord)) {
        return (
          <span
            key={index}
            className={`cursor-pointer hover:bg-primary/10 rounded px-1 transition-colors ${
              selectedWord === cleanWord ? 'bg-primary/20 font-medium' : ''
            }`}
            onClick={() => handleWordClick(cleanWord)}
          >
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Synonym Finder</h1>
          <p className="text-muted-foreground mt-1">
            Click on words to find synonyms and improve your vocabulary
          </p>
        </div>
        <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
          <BookOpen className="h-3 w-3 mr-1" />
          Smart Dictionary
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Text (Click words to find synonyms)</h3>
                <StatsCounter text={inputText} />
              </div>
              
              <div className="min-h-[200px] p-4 border rounded-lg focus-within:ring-2 focus-within:ring-ring">
                <div className="whitespace-pre-wrap leading-relaxed text-base">
                  {renderClickableText(inputText)}
                </div>
              </div>

              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full min-h-[150px] p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Enter your text here, then click on words to find synonyms..."
              />
              
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
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-4">
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Synonyms
              {selectedWord && (
                <Badge variant="secondary" className="ml-2">
                  {selectedWord}
                </Badge>
              )}
            </h3>
            
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <RefreshCw className="h-5 w-5 animate-spin mr-2" />
                <span className="text-sm text-muted-foreground">Finding synonyms...</span>
              </div>
            ) : selectedWord ? (
              synonyms.length > 0 ? (
                <div className="space-y-2">
                  {synonyms.map((synonym, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-left"
                      onClick={() => replaceWord(synonym)}
                    >
                      {synonym}
                    </Button>
                  ))}
                  
                  <div className="mt-4 p-3 bg-muted/50 rounded-lg text-xs text-muted-foreground">
                    Click on a synonym to replace "{selectedWord}" in your text
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground py-4">
                  No synonyms found for "{selectedWord}"
                </p>
              )
            ) : (
              <p className="text-sm text-muted-foreground py-4">
                Click on a word in your text to find synonyms
              </p>
            )}
          </Card>

          <Card className="p-4">
            <h3 className="font-medium mb-3">How to Use</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Click on any word in your text</li>
              <li>• Browse suggested synonyms</li>
              <li>• Click a synonym to replace the word</li>
              <li>• Build richer vocabulary effortlessly</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}