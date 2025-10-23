import { useEffect, useRef } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import { useTheme } from "@/contexts/ThemeProvider";
import { Loader2 } from "lucide-react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
}

export function CodeEditor({ value, onChange, language }: CodeEditorProps) {
  const { theme } = useTheme();
  const editorRef = useRef<any>(null);

  function handleEditorDidMount(editor: any, monaco: Monaco) {
    editorRef.current = editor;
    
    // Configure Monaco editor theme to match our design
    monaco.editor.defineTheme('code-compiler-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1e2532',
        'editor.foreground': '#fafafa',
        'editor.lineHighlightBackground': '#252d3d',
        'editorLineNumber.foreground': '#b3b3b3',
        'editorLineNumber.activeForeground': '#fafafa',
      }
    });

    monaco.editor.defineTheme('code-compiler-light', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#fafaff',
        'editor.foreground': '#1e2532',
        'editor.lineHighlightBackground': '#f5f5f7',
        'editorLineNumber.foreground': '#666666',
        'editorLineNumber.activeForeground': '#1e2532',
      }
    });

    monaco.editor.setTheme(theme === 'dark' ? 'code-compiler-dark' : 'code-compiler-light');
  }

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.getModel()?.setEOL(0); // LF line endings
    }
  }, [language]);

  return (
    <div className="h-full w-full" data-testid="code-editor-container">
      <Editor
        height="100%"
        language={language}
        value={value}
        onChange={(val) => onChange(val || "")}
        onMount={handleEditorDidMount}
        theme={theme === 'dark' ? 'code-compiler-dark' : 'code-compiler-light'}
        loading={
          <div className="h-full w-full flex items-center justify-center bg-card">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        }
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineHeight: 22,
          fontFamily: 'JetBrains Mono, Fira Code, monospace',
          padding: { top: 16, bottom: 16 },
          scrollBeyondLastLine: false,
          renderLineHighlight: 'all',
          smoothScrolling: true,
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          tabSize: 4,
          insertSpaces: true,
          wordWrap: 'off',
          automaticLayout: true,
          formatOnPaste: true,
          formatOnType: true,
        }}
      />
    </div>
  );
}
