import { languages, type LanguageId } from "@shared/schema";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Check } from "lucide-react";
import { LanguageIcon } from "./LanguageIcon";

interface LanguageSwitcherProps {
  currentLanguage: LanguageId;
  onLanguageChange: (language: LanguageId) => void;
}

export function LanguageSwitcher({ currentLanguage, onLanguageChange }: LanguageSwitcherProps) {
  const current = languages.find(lang => lang.id === currentLanguage);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="gap-2"
          data-testid="dropdown-language-switcher"
        >
          <LanguageIcon languageId={currentLanguage} />
          <span className="font-medium">{current?.name}</span>
          <ChevronDown className="w-4 h-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.id}
            onClick={() => onLanguageChange(lang.id as LanguageId)}
            className="gap-2 cursor-pointer"
            data-testid={`option-language-${lang.id}`}
          >
            <LanguageIcon languageId={lang.id as LanguageId} />
            <span>{lang.name}</span>
            {lang.id === currentLanguage && (
              <Check className="w-4 h-4 ml-auto text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
