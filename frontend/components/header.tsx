"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { ApiSettingsDialog } from "@/components/api-settings-dialog";
import { Menu, ShieldCheck, Sparkles } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-tr from-emerald-600 to-teal-500 text-white rounded-lg shadow-sm">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                didi-humanizer
              </span>
            </div>
            <Badge
              variant="secondary"
              className="hidden sm:inline-flex bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 text-[11px] font-medium"
            >
              ZeroGPT & GPTZero Bypass
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Custom AI Subscription Config Dialog */}
          <ApiSettingsDialog />

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
