"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Copy,
  Plus,
  Trash2,
  Globe,
  FileText,
  Newspaper,
  GraduationCap,
  Link,
} from "lucide-react";

interface Citation {
  id: string;
  type: "book" | "journal" | "website" | "newspaper";
  title: string;
  author: string;
  year: string;
  publisher?: string;
  journal?: string;
  url?: string;
  accessDate?: string;
  pages?: string;
  doi?: string;
}

export function CitationGeneratorTool() {
  const [citations, setCitations] = useState<Citation[]>([]);
  const [citationStyle, setCitationStyle] = useState("apa");
  const [currentCitation, setCurrentCitation] = useState<Partial<Citation>>({
    type: "book",
  });

  const citationStyles = [
    {
      value: "apa",
      label: "APA 7th Edition",
      description: "American Psychological Association",
    },
    {
      value: "mla",
      label: "MLA 9th Edition",
      description: "Modern Language Association",
    },
    {
      value: "chicago",
      label: "Chicago 17th Edition",
      description: "Chicago Manual of Style",
    },
    {
      value: "harvard",
      label: "Harvard Style",
      description: "Harvard referencing system",
      premium: true,
    },
    {
      value: "ieee",
      label: "IEEE Style",
      description: "Institute of Electrical Engineers",
      premium: true,
    },
    {
      value: "vancouver",
      label: "Vancouver Style",
      description: "Medical and scientific papers",
      premium: true,
    },
  ];

  const sourceTypes = [
    { value: "book", label: "Book", icon: BookOpen },
    { value: "journal", label: "Journal Article", icon: FileText },
    { value: "website", label: "Website", icon: Globe },
    { value: "newspaper", label: "Newspaper", icon: Newspaper },
  ];

  const generateCitation = (citation: Citation, style: string): string => {
    switch (style) {
      case "apa":
        switch (citation.type) {
          case "book":
            return `${citation.author} (${citation.year}). *${citation.title}*. ${citation.publisher}.`;
          case "journal":
            return `${citation.author} (${citation.year}). ${
              citation.title
            }. *${citation.journal}*${
              citation.pages ? `, ${citation.pages}` : ""
            }.${citation.doi ? ` https://doi.org/${citation.doi}` : ""}`;
          case "website":
            return `${citation.author} (${citation.year}). *${citation.title}*. Retrieved ${citation.accessDate} from ${citation.url}`;
          case "newspaper":
            return `${citation.author} (${citation.year}). ${citation.title}. *${citation.publisher}*.`;
          default:
            return "";
        }
      case "mla":
        switch (citation.type) {
          case "book":
            return `${citation.author}. *${citation.title}*. ${citation.publisher}, ${citation.year}.`;
          case "journal":
            return `${citation.author}. "${citation.title}." *${
              citation.journal
            }*${citation.pages ? `, ${citation.pages}` : ""}, ${
              citation.year
            }.`;
          case "website":
            return `${citation.author}. "${citation.title}." *Website Name*, ${citation.year}, ${citation.url}. Accessed ${citation.accessDate}.`;
          default:
            return "";
        }
      default:
        return "Citation style not implemented yet.";
    }
  };

  const addCitation = () => {
    if (
      !currentCitation.title ||
      !currentCitation.author ||
      !currentCitation.year
    ) {
      return;
    }

    const newCitation: Citation = {
      id: Date.now().toString(),
      type: currentCitation.type as Citation["type"],
      title: currentCitation.title,
      author: currentCitation.author,
      year: currentCitation.year,
      publisher: currentCitation.publisher,
      journal: currentCitation.journal,
      url: currentCitation.url,
      accessDate: currentCitation.accessDate,
      pages: currentCitation.pages,
      doi: currentCitation.doi,
    };

    setCitations((prev) => [...prev, newCitation]);
    setCurrentCitation({ type: currentCitation.type });
  };

  const removeCitation = (id: string) => {
    setCitations((prev) => prev.filter((c) => c.id !== id));
  };

  const copyBibliography = () => {
    const bibliography = citations
      .map((citation) => generateCitation(citation, citationStyle))
      .join("\n\n");

    navigator.clipboard.writeText(bibliography);
  };

  const copyInText = (citation: Citation) => {
    let inTextCitation = "";

    switch (citationStyle) {
      case "apa":
        inTextCitation = `(${citation.author.split(",")[0]}, ${citation.year})`;
        break;
      case "mla":
        inTextCitation = `(${citation.author.split(",")[0]})`;
        break;
      default:
        inTextCitation = `(${citation.author.split(",")[0]}, ${citation.year})`;
    }

    navigator.clipboard.writeText(inTextCitation);
  };

  const selectedSourceType = sourceTypes.find(
    (type) => type.value === currentCitation.type
  );

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <GraduationCap className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-bold">Citation Generator</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Generate properly formatted citations for your academic work
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Input Form */}
        <div className="xl:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Add Citation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Citation Style
                </label>
                <Select value={citationStyle} onValueChange={setCitationStyle}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {citationStyles.map((style) => (
                      <SelectItem
                        key={style.value}
                        value={style.value}
                        disabled={style.premium}
                      >
                        <div className="flex items-center gap-2">
                          <span>{style.label}</span>
                          {style.premium && (
                            <Badge variant="secondary" className="text-xs">
                              Pro
                            </Badge>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Source Type
                </label>
                <Select
                  value={currentCitation.type}
                  onValueChange={(value) =>
                    setCurrentCitation({
                      ...currentCitation,
                      type: value as Citation["type"],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue>
                      <div className="flex items-center gap-2">
                        {selectedSourceType && (
                          <>
                            <selectedSourceType.icon className="h-4 w-4" />
                            <span>{selectedSourceType.label}</span>
                          </>
                        )}
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {sourceTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            <span>{type.label}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    Author *
                  </label>
                  <Input
                    value={currentCitation.author || ""}
                    onChange={(e) =>
                      setCurrentCitation({
                        ...currentCitation,
                        author: e.target.value,
                      })
                    }
                    placeholder="Last, First"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    Year *
                  </label>
                  <Input
                    value={currentCitation.year || ""}
                    onChange={(e) =>
                      setCurrentCitation({
                        ...currentCitation,
                        year: e.target.value,
                      })
                    }
                    placeholder="2024"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  Title *
                </label>
                <Input
                  value={currentCitation.title || ""}
                  onChange={(e) =>
                    setCurrentCitation({
                      ...currentCitation,
                      title: e.target.value,
                    })
                  }
                  placeholder="Enter title"
                />
              </div>

              {currentCitation.type === "book" && (
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    Publisher
                  </label>
                  <Input
                    value={currentCitation.publisher || ""}
                    onChange={(e) =>
                      setCurrentCitation({
                        ...currentCitation,
                        publisher: e.target.value,
                      })
                    }
                    placeholder="Publisher name"
                  />
                </div>
              )}

              {currentCitation.type === "journal" && (
                <>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                      Journal
                    </label>
                    <Input
                      value={currentCitation.journal || ""}
                      onChange={(e) =>
                        setCurrentCitation({
                          ...currentCitation,
                          journal: e.target.value,
                        })
                      }
                      placeholder="Journal name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">
                        Pages
                      </label>
                      <Input
                        value={currentCitation.pages || ""}
                        onChange={(e) =>
                          setCurrentCitation({
                            ...currentCitation,
                            pages: e.target.value,
                          })
                        }
                        placeholder="1-10"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">
                        DOI
                      </label>
                      <Input
                        value={currentCitation.doi || ""}
                        onChange={(e) =>
                          setCurrentCitation({
                            ...currentCitation,
                            doi: e.target.value,
                          })
                        }
                        placeholder="10.1000/xyz"
                      />
                    </div>
                  </div>
                </>
              )}

              {currentCitation.type === "website" && (
                <>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                      URL
                    </label>
                    <Input
                      value={currentCitation.url || ""}
                      onChange={(e) =>
                        setCurrentCitation({
                          ...currentCitation,
                          url: e.target.value,
                        })
                      }
                      placeholder="https://example.com"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                      Access Date
                    </label>
                    <Input
                      value={currentCitation.accessDate || ""}
                      onChange={(e) =>
                        setCurrentCitation({
                          ...currentCitation,
                          accessDate: e.target.value,
                        })
                      }
                      placeholder="January 1, 2024"
                    />
                  </div>
                </>
              )}

              <Button onClick={addCitation} className="w-full" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Citation
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Citations List and Bibliography */}
        <div className="xl:col-span-2 space-y-4">
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="list">
                Citations ({citations.length})
              </TabsTrigger>
              <TabsTrigger value="bibliography">Bibliography</TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Your Citations</CardTitle>
                </CardHeader>
                <CardContent>
                  {citations.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>
                        No citations added yet. Add your first citation using
                        the form.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {citations.map((citation) => {
                        const TypeIcon =
                          sourceTypes.find((t) => t.value === citation.type)
                            ?.icon || BookOpen;
                        return (
                          <div
                            key={citation.id}
                            className="border rounded-lg p-3 space-y-2"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-2">
                                <TypeIcon className="h-4 w-4" />
                                <div>
                                  <h4 className="font-medium text-sm">
                                    {citation.title}
                                  </h4>
                                  <p className="text-xs text-gray-600">
                                    {citation.author} ({citation.year})
                                  </p>
                                </div>
                              </div>
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyInText(citation)}
                                  title="Copy in-text citation"
                                >
                                  <Link className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeCitation(citation.id)}
                                  title="Remove citation"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            <div className="text-xs bg-muted p-2 rounded">
                              {generateCitation(citation, citationStyle)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bibliography" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      Bibliography ({citationStyle.toUpperCase()})
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyBibliography}
                      disabled={citations.length === 0}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {citations.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Add citations to generate your bibliography</p>
                    </div>
                  ) : (
                    <Textarea
                      value={citations
                        .map((citation) =>
                          generateCitation(citation, citationStyle)
                        )
                        .join("\n\n")}
                      readOnly
                      className="min-h-[300px] font-mono text-sm"
                      placeholder="Your bibliography will appear here..."
                    />
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
