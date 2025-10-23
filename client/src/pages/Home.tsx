import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CodeEditor } from "@/components/CodeEditor";
import { OutputPanel } from "@/components/OutputPanel";
import { Navbar } from "@/components/Navbar";
import { ShareModal } from "@/components/ShareModal";
import { useToast } from "@/hooks/use-toast";
import { languages, defaultCode, type LanguageId, type ExecuteCodeResponse } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export default function Home() {
  const [, setLocation] = useLocation();
  const [language, setLanguage] = useState<LanguageId>('python');
  const [code, setCode] = useState(defaultCode.python);
  const [output, setOutput] = useState("");
  const [hasError, setHasError] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const { toast } = useToast();

  const currentLang = languages.find(l => l.id === language);

  // Execute code mutation
  const executeMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest(
        "POST",
        "/api/execute",
        {
          language: language,
          version: currentLang?.version,
          code: code,
        }
      );
      const data = await response.json() as ExecuteCodeResponse;
      return data;
    },
    onSuccess: (data) => {
      const output = data.stdout || data.stderr || "No output";
      setOutput(output);
      setHasError(!!data.stderr || data.exitCode !== 0);
      
      if (data.stderr) {
        toast({
          title: "Execution completed with errors",
          description: "Check the output panel for details",
          variant: "destructive",
        });
      }
    },
    onError: (error: any) => {
      setOutput(`Error: ${error.message || "Failed to execute code"}`);
      setHasError(true);
      toast({
        title: "Execution failed",
        description: error.message || "An error occurred while running your code",
        variant: "destructive",
      });
    },
  });

  // Share code mutation
  const shareMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest(
        "POST",
        "/api/share",
        {
          language: language,
          code: code,
        }
      );
      const data = await response.json() as { id: string };
      return data;
    },
    onSuccess: (data) => {
      const url = `${window.location.origin}/share/${data.id}`;
      setShareUrl(url);
      setShareModalOpen(true);
    },
    onError: (error: any) => {
      toast({
        title: "Failed to share code",
        description: error.message || "An error occurred while sharing your code",
        variant: "destructive",
      });
    },
  });

  // Handle language change
  const handleLanguageChange = (newLanguage: LanguageId) => {
    setLanguage(newLanguage);
    setCode(defaultCode[newLanguage]);
    setOutput("");
    setHasError(false);
  };

  // Handle run
  const handleRun = () => {
    setOutput("");
    setHasError(false);
    executeMutation.mutate();
  };

  // Handle share
  const handleShare = () => {
    shareMutation.mutate();
  };

  // Handle clear output
  const handleClearOutput = () => {
    setOutput("");
    setHasError(false);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <Navbar
        currentLanguage={language}
        onLanguageChange={handleLanguageChange}
        onRun={handleRun}
        onShare={handleShare}
        isRunning={executeMutation.isPending}
        filename={currentLang?.file || "main.py"}
      />

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Code Editor Panel */}
        <div className="flex-1 lg:w-[60%] flex flex-col min-h-0">
          <CodeEditor
            value={code}
            onChange={setCode}
            language={currentLang?.monacoLang || 'python'}
          />
        </div>

        {/* Output Panel */}
        <div className="flex-1 lg:w-[40%] min-h-0">
          <OutputPanel
            output={output}
            isRunning={executeMutation.isPending}
            hasError={hasError}
            onClear={handleClearOutput}
          />
        </div>
      </div>

      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        shareUrl={shareUrl}
      />
    </div>
  );
}
