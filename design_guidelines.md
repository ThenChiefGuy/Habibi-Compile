# Design Guidelines: Online Code Compiler

## Design Approach

**Selected Approach:** Design System with Modern Code Editor Aesthetics

**Justification:** As a utility-focused productivity tool, the compiler prioritizes efficiency, readability, and usability over visual flourish. Drawing inspiration from Programiz's clean interface combined with VS Code's professional editor aesthetic.

**Core Principles:**
- Clarity over decoration
- Maximum code readability
- Efficient workspace utilization
- Professional, trustworthy appearance
- Minimal cognitive load

---

## Color Palette

### Dark Mode (Primary)
- **Background Primary:** 217 19% 12% (deep charcoal, main canvas)
- **Background Secondary:** 217 19% 18% (editor/panel background)
- **Background Elevated:** 217 19% 24% (cards, modals)
- **Text Primary:** 0 0% 98% (high contrast white)
- **Text Secondary:** 0 0% 70% (muted text)
- **Accent Primary:** 217 91% 60% (vibrant blue for actions)
- **Success:** 142 71% 45% (green for successful execution)
- **Error:** 0 84% 60% (red for compilation errors)
- **Border:** 217 19% 27% (subtle separators)

### Light Mode
- **Background Primary:** 0 0% 100% (pure white)
- **Background Secondary:** 210 20% 98% (editor background)
- **Text Primary:** 217 19% 12% (dark text)
- **Text Secondary:** 217 10% 40% (muted text)
- **Accent Primary:** 217 91% 50% (slightly darker blue)
- **Border:** 210 20% 88% (light gray borders)

---

## Typography

**Font Stack:**
- **Primary (UI):** Inter via Google Fonts - clean, modern sans-serif
- **Code:** JetBrains Mono via Google Fonts - optimized monospace for code

**Type Scale:**
- **Headings:** font-semibold, limited use (language selector labels)
- **Body:** text-sm to text-base (UI elements, buttons)
- **Code:** text-sm with 1.6 line-height (editor content)
- **Captions:** text-xs (line numbers, metadata)

---

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, and 8 for consistent rhythm
- Micro spacing: p-2, gap-2
- Component spacing: p-4, gap-4, mb-6
- Section spacing: p-6, gap-8

**Grid Structure:**
- Full-viewport application (100vh)
- Top navigation bar: h-14 (fixed)
- Main workspace: calc(100vh - 56px) split horizontally
- Code editor: 60% width (resizable)
- Output panel: 40% width (resizable)
- Vertical split for mobile (stacked)

---

## Component Library

### Navigation Bar
- Full-width sticky header with subtle bottom border
- Left: Brand logo/name with language dropdown
- Center: File name display (main.py, Main.java, etc.)
- Right: Theme toggle, Share button, Run button (prominent)
- Background matches elevated surface color

### Language Switcher
- Horizontal scrollable list of language icons
- Each icon in rounded container with hover state
- Active language highlighted with accent color border
- Languages: Python, Java, HTML/CSS/JS, and expandable for others
- Icons use consistent size (w-8 h-8) with descriptive tooltips

### Code Editor Panel
- Monaco Editor integration with matching theme
- Line numbers in muted text color
- Syntax highlighting following theme colors
- Scrollable with custom scrollbar styling
- Header bar with filename and expand/minimize controls

### Output Panel
- Dark background contrasting with editor
- Clear button in top-right corner
- Scrollable output area with monospace font
- Color-coded output: white for normal, green for success, red for errors
- Loading state with subtle animation during code execution
- Empty state message: "Run your code to see output here"

### Buttons
- **Primary (Run):** Accent blue background, white text, medium size, with play icon
- **Secondary (Share, Clear):** Outline style with current theme border
- **Icon Buttons (Theme toggle, Expand):** Ghost style, icon-only
- Rounded corners (rounded-md), consistent padding (px-4 py-2)

### Share Modal
- Centered overlay with backdrop blur
- Compact card design with close button
- Generated link in read-only input with copy button
- Social sharing icons below link
- Success toast notification on copy

### Status Indicators
- Compilation status badge in output header
- Success: Green dot + "Compiled successfully"
- Error: Red dot + "Compilation failed"
- Running: Yellow dot + "Running..." with pulse animation

---

## Images & Visual Assets

**No hero images required** - this is a utility application focused on functionality.

**Icons:**
- Language logos from official sources (Python snake, Java cup, HTML5 shield)
- Use Heroicons for UI elements (play, share, moon/sun, expand, close)
- All icons maintain consistent size and stroke width

**Illustrations:**
- Empty state illustration for output panel (optional): Simple line art of code brackets
- Error state: Minimal error icon, focus on clear error messages

---

## Interactions & Animations

**Minimal Animation Philosophy:** Animations used sparingly for feedback only

- Button hovers: Subtle brightness increase (no elaborate effects)
- Theme toggle: Smooth 200ms color transition
- Modal appearance: Fade in with 150ms duration
- Run button: Disabled state while executing (subtle pulse)
- Code execution: Progress indicator in output panel header
- Success/error states: Brief color flash on status change

**No scroll-triggered animations, parallax, or decorative motion**

---

## Accessibility & Responsiveness

**Dark Mode:** Full implementation across all components, form inputs, and panels
**Color Contrast:** WCAG AAA compliance for code text
**Keyboard Navigation:** Full keyboard support for editor and controls
**Responsive Breakpoints:**
- Desktop (lg): Full split-screen layout
- Tablet (md): Vertical stacking with tabs for editor/output
- Mobile: Single column, collapsible panels

**Focus States:** Clear focus rings on all interactive elements using accent color

---

## Key Differentiators from Generic Designs

- **Professional Developer Tool Aesthetic:** Matches expectations of VS Code users
- **Efficiency-First Layout:** No wasted space, every pixel serves code editing
- **Subdued Color Palette:** Blue accent is only vibrant element
- **Content-Focused:** Interface fades into background, code is the star
- **No Marketing Elements:** Pure utility application without promotional content