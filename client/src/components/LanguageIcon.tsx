import { Code2, FileCode, FileJson, FileType, Braces, Cog, Workflow, Package } from "lucide-react";
import type { LanguageId } from "@shared/schema";

interface LanguageIconProps {
  languageId: LanguageId;
  className?: string;
}

const languageIcons: Record<LanguageId, React.ComponentType<{ className?: string }>> = {
  python: Code2,
  java: FileCode,
  javascript: FileJson,
  typescript: FileType,
  c: Braces,
  cpp: Cog,
  go: Workflow,
  rust: Package,
};

export function LanguageIcon({ languageId, className = "w-4 h-4" }: LanguageIconProps) {
  const Icon = languageIcons[languageId] || Code2;
  return <Icon className={className} />;
}
