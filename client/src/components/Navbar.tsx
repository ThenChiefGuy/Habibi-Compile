import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Moon, Sun, Share2, Play } from "lucide-react";
import { useTheme } from "@/contexts/ThemeProvider";
import type { LanguageId } from "@shared/schema";
import { languages } from "@shared/schema";

interface NavbarProps {
  currentLanguage: LanguageId;
  onLanguageChange: (language: LanguageId) => void;
  onRun: () => void;
  onShare: () => void;
  isRunning: boolean;
  filename: string;
}

export function Navbar({
  currentLanguage,
  onLanguageChange,
  onRun,
  onShare,
  isRunning,
  filename,
}: NavbarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="h-14 border-b border-border bg-card px-4 flex items-center justify-between gap-4">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="text-xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            CodeCompiler
          </div>
        </div>
        <LanguageSwitcher
          currentLanguage={currentLanguage}
          onLanguageChange={onLanguageChange}
        />
      </div>

      {/* Center section */}
      <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
        <span className="font-mono">{filename}</span>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          data-testid="button-theme-toggle"
          className="hover-elevate active-elevate-2"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onShare}
          className="gap-2"
          data-testid="button-share"
        >
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">Share</span>
        </Button>
        <Button
          onClick={onRun}
          size="sm"
          className="gap-2"
          disabled={isRunning}
          data-testid="button-run"
        >
          <Play className="w-4 h-4" />
          <span>{isRunning ? "Running..." : "Run"}</span>
        </Button>
      </div>
    </nav>
  );
}
