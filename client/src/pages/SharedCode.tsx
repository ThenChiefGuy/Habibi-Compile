import { useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { CodeEditor } from "@/components/CodeEditor";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy } from "lucide-react";
import { languages, type LanguageId, type SharedCode } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function SharedCodePage() {
  const [, params] = useRoute("/share/:id");
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: sharedCode, isLoading, error } = useQuery<SharedCode>({
    queryKey: ["/api/share", params?.id],
    enabled: !!params?.id,
  });

  const currentLang = languages.find(l => l.id === sharedCode?.language);

  const handleCopyCode = async () => {
    if (sharedCode?.code) {
      try {
        await navigator.clipboard.writeText(sharedCode.code);
        toast({
          title: "Code copied!",
          description: "Code has been copied to clipboard",
        });
      } catch (err) {
        toast({
          title: "Failed to copy",
          description: "Please copy the code manually",
          variant: "destructive",
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading shared code...</p>
        </div>
      </div>
    );
  }

  if (error || !sharedCode) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Code not found</h1>
          <p className="text-muted-foreground mb-6">
            This shared code link is invalid or has expired
          </p>
          <Button onClick={() => setLocation("/")} data-testid="button-home">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go to Editor
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      <nav className="h-14 border-b border-border bg-card px-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/")}
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Editor
          </Button>
          <div className="text-sm text-muted-foreground">
            Viewing shared {currentLang?.name || "code"}
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyCode}
          className="gap-2"
          data-testid="button-copy-code"
        >
          <Copy className="w-4 h-4" />
          Copy Code
        </Button>
      </nav>

      <div className="flex-1 overflow-hidden">
        <CodeEditor
          value={sharedCode.code}
          onChange={() => {}}
          language={currentLang?.monacoLang || 'python'}
        />
      </div>
    </div>
  );
}
