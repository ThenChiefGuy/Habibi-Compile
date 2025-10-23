import { z } from "zod";

// Supported programming languages
export const languages = [
  { id: 'python', name: 'Python', version: '3.10.0', file: 'main.py', monacoLang: 'python' },
  { id: 'java', name: 'Java', version: '15.0.2', file: 'Main.java', monacoLang: 'java' },
  { id: 'javascript', name: 'JavaScript', version: '18.15.0', file: 'index.js', monacoLang: 'javascript' },
  { id: 'typescript', name: 'TypeScript', version: '5.0.3', file: 'index.ts', monacoLang: 'typescript' },
  { id: 'c', name: 'C', version: '10.2.0', file: 'main.c', monacoLang: 'c' },
  { id: 'cpp', name: 'C++', version: '10.2.0', file: 'main.cpp', monacoLang: 'cpp' },
  { id: 'go', name: 'Go', version: '1.16.2', file: 'main.go', monacoLang: 'go' },
  { id: 'rust', name: 'Rust', version: '1.68.2', file: 'main.rs', monacoLang: 'rust' },
] as const;

export type LanguageId = typeof languages[number]['id'];

// Default code templates for each language
export const defaultCode: Record<LanguageId, string> = {
  python: `# Online Python compiler
# Write Python 3 code and run it

print("Hello, World!")`,

  java: `// Online Java compiler
// Write Java code and run it

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,

  javascript: `// Online JavaScript compiler
// Write JavaScript code and run it

console.log("Hello, World!");`,

  typescript: `// Online TypeScript compiler
// Write TypeScript code and run it

const message: string = "Hello, World!";
console.log(message);`,

  c: `// Online C compiler
// Write C code and run it

#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,

  cpp: `// Online C++ compiler
// Write C++ code and run it

#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,

  go: `// Online Go compiler
// Write Go code and run it

package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,

  rust: `// Online Rust compiler
// Write Rust code and run it

fn main() {
    println!("Hello, World!");
}`,
};

// Code execution request schema
export const executeCodeSchema = z.object({
  language: z.string(),
  version: z.string().optional(), // ✅ make optional
  code: z.string(),
  stdin: z.string().optional(),
});

export type ExecuteCodeRequest = z.infer<typeof executeCodeSchema>;

// Code execution response schema
export const executeCodeResponseSchema = z.object({
  stdout: z.string(),
  stderr: z.string(),
  exitCode: z.number(),
  executionTime: z.number().optional(),
});

export type ExecuteCodeResponse = z.infer<typeof executeCodeResponseSchema>;

// Shared code snippet schema
export const sharedCodeSchema = z.object({
  id: z.string(),
  language: z.string(),
  code: z.string(),
  createdAt: z.date(),
});

export const insertSharedCodeSchema = sharedCodeSchema.omit({ id: true, createdAt: true });

export type SharedCode = z.infer<typeof sharedCodeSchema>;
export type InsertSharedCode = z.infer<typeof insertSharedCodeSchema>;
