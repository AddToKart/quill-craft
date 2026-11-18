"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  FileText,
  CheckCircle,
  Languages,
  BookOpen,
  FileDown,
  FileUp,
  History,
  Crown,
  X,
  Search,
  MessageCircle,
  GraduationCap,
  Workflow,
  Sparkles,
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  open: boolean;
  onClose: () => void;
}

const tools = [
  { id: "ai-humanizer", label: "AI Humanizer", icon: ShieldCheck, highlight: true },
  { id: "ai-detector", label: "AI Detector", icon: Search },
  { id: "paraphrase", label: "Paraphraser", icon: FileText },
  { id: "grammar", label: "Grammar Checker", icon: CheckCircle },
  { id: "plagiarism", label: "Plagiarism Checker", icon: Search },
  { id: "ai-chat", label: "AI Chat", icon: MessageCircle },
  { id: "translate", label: "Translator", icon: Languages },
  { id: "summarizer", label: "Summarizer", icon: FileDown },
  { id: "citation", label: "Citation Generator", icon: GraduationCap },
  { id: "flow", label: "Didi Flow", icon: Workflow },
  { id: "synonym", label: "Synonym Finder", icon: BookOpen },
  { id: "extender", label: "Text Extender", icon: FileUp },
  { id: "history", label: "History", icon: History },
  { id: "premium", label: "Premium Pro", icon: Crown, premium: true },
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
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 border-r bg-background transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col justify-between",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div>
          <div className="flex items-center justify-between p-4 lg:hidden">
            <h2 className="text-lg font-semibold">didi-humanizer</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-1.5 p-4 overflow-y-auto max-h-[calc(100vh-14rem)]">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2 hidden lg:block">
              Humanizing & Writing Tools
            </div>

            {tools.map((tool) => {
              const Icon = tool.icon;
              const isActive = activeTab === tool.id;

              return (
                <Button
                  key={tool.id}
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-10 px-3 font-medium text-sm transition-all",
                    isActive &&
                      "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold border-r-2 border-emerald-500 rounded-r-none",
                    tool.highlight &&
                      !isActive &&
                      "text-emerald-600 dark:text-emerald-400 font-semibold"
                  )}
                  onClick={() => {
                    onTabChange(tool.id);
                    onClose();
                  }}
                >
                  <Icon className={cn("h-4 w-4", tool.highlight && "text-emerald-600 dark:text-emerald-400")} />
                  {tool.label}
                  {tool.highlight && (
                    <Badge
                      variant="secondary"
                      className="ml-auto text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-1.5 py-0"
                    >
                      Bypass
                    </Badge>
                  )}
                  {tool.premium && (
                    <Badge
                      variant="secondary"
                      className="ml-auto text-[10px] bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 dark:from-purple-900 dark:to-blue-900 dark:text-purple-300 px-1.5 py-0"
                    >
                      Pro
                    </Badge>
                  )}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="p-4 space-y-3 border-t">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 p-3.5 rounded-lg border border-emerald-200/50 dark:border-emerald-800/50">
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                ZeroGPT / GPTZero Shield
              </span>
            </div>
            <div className="text-[11px] text-muted-foreground leading-snug">
              Bypasses detector burstiness and perplexity checks with 0% AI detection.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
