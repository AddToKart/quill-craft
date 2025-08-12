"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  CheckCircle,
  Languages,
  BookOpen,
  FileDown,
  FileUp,
  History,
  Crown,
  X,
  Shield,
  Search,
  Heart,
  MessageCircle,
  GraduationCap,
  Workflow,
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  open: boolean;
  onClose: () => void;
}

const tools = [
  { id: "paraphrase", label: "Paraphraser", icon: FileText },
  { id: "grammar", label: "Grammar Checker", icon: CheckCircle },
  { id: "ai-detector", label: "AI Detector", icon: Shield },
  { id: "plagiarism", label: "Plagiarism Checker", icon: Search },
  { id: "ai-humanizer", label: "AI Humanizer", icon: Heart },
  { id: "ai-chat", label: "AI Chat", icon: MessageCircle },
  { id: "translate", label: "Translator", icon: Languages },
  { id: "summarizer", label: "Summarizer", icon: FileDown },
  { id: "citation", label: "Citation Generator", icon: GraduationCap },
  { id: "flow", label: "QuillBot Flow", icon: Workflow },
  { id: "synonym", label: "Synonym Finder", icon: BookOpen },
  { id: "extender", label: "Text Extender", icon: FileUp },
  { id: "history", label: "History", icon: History },
  { id: "premium", label: "Premium", icon: Crown, premium: true },
];

export function Sidebar({
  activeTab,
  onTabChange,
  open,
  onClose,
}: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 border-r bg-background transition-transform duration-300 ease-in-out lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 lg:hidden">
          <h2 className="text-lg font-semibold">Tools</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2 p-4">
          <div className="text-sm font-medium text-muted-foreground mb-4 hidden lg:block">
            Writing Tools
          </div>

          {tools.map((tool) => {
            const Icon = tool.icon;
            const isActive = activeTab === tool.id;

            return (
              <Button
                key={tool.id}
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-10 px-3",
                  isActive && "bg-primary/10 text-primary font-medium"
                )}
                onClick={() => {
                  onTabChange(tool.id);
                  onClose();
                }}
              >
                <Icon className="h-4 w-4" />
                {tool.label}
                {tool.premium && (
                  <Badge
                    variant="secondary"
                    className="ml-auto text-xs bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 dark:from-purple-900 dark:to-blue-900 dark:text-purple-300"
                  >
                    Pro
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>

        <div className="absolute bottom-4 left-4 right-4 space-y-3">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950 p-4 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">Free Plan</span>
            </div>
            <div className="text-xs text-muted-foreground mb-3">
              5 paraphrases remaining today
            </div>
            <Button
              size="sm"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
            >
              Upgrade Now
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
