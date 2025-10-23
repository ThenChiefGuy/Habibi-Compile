# Code Compiler - Online Code Editor

## Overview
A professional online code compiler inspired by Programiz, featuring multi-language support, real-time code execution, and a beautiful developer-focused UI.

## Features
- **Multi-Language Support**: Python, Java, JavaScript, TypeScript, C, C++, Go, Rust
- **Monaco Editor**: Professional code editor with syntax highlighting (same as VS Code)
- **Real-Time Execution**: Run code instantly with output displayed in split-screen
- **Dark/Light Theme**: Seamless theme switching with persistent preference
- **Code Sharing**: Generate shareable links for code snippets
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile

## Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **UI Components**: Shadcn UI + Tailwind CSS
- **Code Editor**: Monaco Editor (@monaco-editor/react)
- **State Management**: React Query (TanStack Query)
- **Routing**: Wouter
- **Backend**: Express.js + Node.js
- **Code Execution**: Piston API (external service)
- **Storage**: In-memory storage for shared code snippets

## Project Structure
```
client/
  src/
    components/
      CodeEditor.tsx         # Monaco editor integration
      OutputPanel.tsx        # Code execution output display
      Navbar.tsx            # Top navigation bar
      LanguageSwitcher.tsx  # Language selector dropdown
      ShareModal.tsx        # Share code dialog
    contexts/
      ThemeProvider.tsx     # Dark/light theme context
    pages/
      Home.tsx              # Main compiler page
      SharedCode.tsx        # View shared code snippets
    
server/
  routes.ts               # API endpoints
  storage.ts              # In-memory storage implementation

shared/
  schema.ts               # Type definitions and schemas
```

## Recent Changes
- October 23, 2025: Initial implementation of full-stack code compiler
  - Created all frontend components with Monaco editor integration
  - Implemented theme switching (dark/light mode)
  - Added language switcher for 8 programming languages
  - Built share code functionality UI
  - Designed professional navigation and output panels
  - Set up TypeScript schemas for type safety
  - Implemented backend API endpoints with Piston integration
  - Added in-memory storage for shared code snippets
  - Connected frontend to backend with React Query

## API Endpoints
- `POST /api/execute` - Execute code in selected language using Piston API
- `POST /api/share` - Create shareable code snippet with unique ID
- `GET /api/share/:id` - Retrieve shared code snippet by ID

## User Preferences
- Default theme: Dark mode (persisted in localStorage)
- Supported languages: Python, Java, JavaScript, TypeScript, C, C++, Go, Rust
- Monaco editor configured with JetBrains Mono font for optimal code readability

## Design Philosophy
- Efficiency-first: Clean, minimal UI that puts code front and center
- Professional aesthetics: VS Code-inspired editor experience
- Accessibility: WCAG AAA compliant color contrast, keyboard navigation support
- Performance: Fast load times, smooth interactions, optimized for productivity
