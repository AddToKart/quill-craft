"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  History,
  Search,
  Copy,
  Trash2,
  FileText,
  CheckCircle,
  Languages,
  BookOpen,
  FileDown,
  FileUp,
  Calendar,
  Filter,
} from "lucide-react";
import { toast } from "sonner";
import { getDummyHistory } from "@/lib/dummy-data";

const toolIcons = {
  paraphrase: FileText,
  grammar: CheckCircle,
  translate: Languages,
  synonym: BookOpen,
  summarizer: FileDown,
  extender: FileUp,
};

const toolColors = {
  paraphrase: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  grammar: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  translate:
    "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  synonym:
    "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
  summarizer: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  extender: "bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300",
};

export function HistoryTool() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const historyItems = getDummyHistory();

  const filteredHistory = historyItems.filter((item) => {
    const matchesSearch =
      item.input.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.output.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilter === "all" || item.tool === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  const handleCopy = (text: string, type: "input" | "output") => {
    navigator.clipboard.writeText(text);
    toast.success(
      `${type === "input" ? "Original" : "Result"} copied to clipboard!`
    );
  };

  const handleDelete = (id: string) => {
    toast.success("Item removed from history");
  };

  const clearAllHistory = () => {
    toast.success("History cleared successfully");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getUniqueTools = () => {
    const toolsSet = new Set(historyItems.map((item) => item.tool));
    const tools = Array.from(toolsSet);
    return tools;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">History</h1>
          <p className="text-muted-foreground mt-1">
            View and manage your past writing tool sessions
          </p>
        </div>
        <Badge
          variant="secondary"
          className="bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300"
        >
          <History className="h-3 w-3 mr-1" />
          {filteredHistory.length} Items
        </Badge>
      </div>

      {/* Search and Filter Controls */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search your history..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant={selectedFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter("all")}
            >
              All Tools
            </Button>
            {getUniqueTools().map((tool) => {
              const Icon = toolIcons[tool as keyof typeof toolIcons];
              return (
                <Button
                  key={tool}
                  variant={selectedFilter === tool ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(tool)}
                  className="hidden sm:inline-flex"
                >
                  <Icon className="h-3 w-3 mr-1" />
                  {tool.charAt(0).toUpperCase() + tool.slice(1)}
                </Button>
              );
            })}
          </div>

          <Button
            variant="destructive"
            size="sm"
            onClick={clearAllHistory}
            className="whitespace-nowrap"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>
      </Card>

      {/* History Items */}
      <div className="space-y-4">
        {filteredHistory.length === 0 ? (
          <Card className="p-8 text-center">
            <History className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No History Found</h3>
            <p className="text-muted-foreground">
              {searchTerm || selectedFilter !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Start using our writing tools to build your history."}
            </p>
          </Card>
        ) : (
          filteredHistory.map((item) => {
            const Icon = toolIcons[item.tool as keyof typeof toolIcons];
            const colorClass = toolColors[item.tool as keyof typeof toolColors];

            return (
              <Card
                key={item.id}
                className="p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${colorClass}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium capitalize">{item.tool}</h3>
                        {item.tool === "translate" && item.metadata && (
                          <Badge variant="outline" className="text-xs">
                            {item.metadata.from} → {item.metadata.to}
                          </Badge>
                        )}
                        {item.tool === "paraphrase" && item.metadata && (
                          <Badge variant="outline" className="text-xs">
                            {item.metadata.tone}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(item.timestamp)}
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Original
                      </h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(item.input, "input")}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg text-sm">
                      <p className="line-clamp-4">{item.input}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Result
                      </h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(item.output, "output")}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg text-sm">
                      <p className="line-clamp-4">{item.output}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between text-xs text-muted-foreground mt-4 pt-3 border-t">
                  <span>Input: {item.input.split(" ").length} words</span>
                  <span>Output: {item.output.split(" ").length} words</span>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
