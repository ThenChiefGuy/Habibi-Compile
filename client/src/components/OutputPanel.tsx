import { Button } from "@/components/ui/button";
import { X, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface OutputPanelProps {
  output: string;
  isRunning: boolean;
  hasError: boolean;
  onClear: () => void;
}

export function OutputPanel({ output, isRunning, hasError, onClear }: OutputPanelProps) {
  const hasOutput = output.trim().length > 0;

  return (
    <div className="h-full flex flex-col bg-card border-l border-border">
      {/* Header */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-sm">Output</h2>
          {isRunning && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Loader2 className="w-3 h-3 animate-spin text-yellow-500" />
              <span>Running...</span>
            </div>
          )}
          {!isRunning && hasOutput && !hasError && (
            <div className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400">
              <CheckCircle2 className="w-3 h-3" />
              <span>Executed successfully</span>
            </div>
          )}
          {!isRunning && hasError && (
            <div className="flex items-center gap-1.5 text-xs text-destructive">
              <XCircle className="w-3 h-3" />
              <span>Execution failed</span>
            </div>
          )}
        </div>
        {hasOutput && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="h-8 px-2"
            data-testid="button-clear-output"
          >
            <X className="w-4 h-4" />
            <span className="ml-1.5">Clear</span>
          </Button>
        )}
      </div>

      {/* Output content */}
      <div className="flex-1 overflow-auto p-4">
        {!hasOutput && !isRunning && (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <div className="text-6xl mb-4 opacity-20">{ }</div>
              <p className="text-sm">Run your code to see output here</p>
            </div>
          </div>
        )}
        {hasOutput && (
          <pre
            className={cn(
              "font-mono text-sm whitespace-pre-wrap break-words",
              hasError ? "text-destructive" : "text-foreground"
            )}
            data-testid="text-output-content"
          >
            {output}
          </pre>
        )}
      </div>
    </div>
  );
}
