# Suhaimee Kaje Portfolio Design System & Guidelines

This design document establishes the guidelines, constraints, and visual design rules for the Developer Portfolio. It ensures that every component is visually stunning, responsive, and adheres to the **Impeccable Design Fluency** standards.

---

## 🎨 Color Palette & Contrast
To achieve a premium, futuristic "developer" look, we use a custom deep dark mode palette with vibrant ambient glows.

### Core Tokens (Tailwind & CSS)
*   **Background (Deep Space):** `#050505` — A custom, rich off-black. Never use pure `#000000` or standard flat `#121212`.
*   **Primary Accent (Neon Purple):** `oklch(0.658 0.254 303.9)` / `tailwindcss: purple-500`
*   **Secondary Accent (Electric Cyan):** `oklch(0.723 0.219 220)` / `tailwindcss: cyan-500`
*   **Text (Primary):** `#ffffff` — Crisp white.
*   **Text (Secondary/Muted):** `oklch(0.706 0.015 286)` / `tailwindcss: zinc-400`
*   **Translucent Borders:** `rgba(255, 255, 255, 0.05)` or `rgba(255, 255, 255, 0.1)`

### Design Constraints
*   **High-Contrast Copy:** Muted or secondary text must always maintain at least **4.5:1 contrast ratio**. Do not use extremely faint grays for paragraphs.
*   **Ambient Glows:** Use radial gradients with low opacity (`bg-purple-500/10` or `bg-cyan-500/10`) and large blur filters (`blur-[120px]`) to create depth.
*   **No Card-in-Card Syndrome:** Do not nest borders within borders. If a card is inside another container, style the inner element with background contrasts or subtle gradients rather than adding secondary borders.

---

## ✍️ Typography & Typesetting
The portfolio uses standard sans-serif system stacks optimized for high-performance and absolute legibility.

*   **Headings:** Thick, bold, tracking-tight typography (`tracking-tight`, `font-extrabold`). Use title-shimmer gradients (`bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-400`).
*   **Body Copy:** High readability, balanced line height (`leading-relaxed`), and tracking-normal (`tracking-normal`).
*   **Chips/Tags:** Compact, capitalized labels, uppercase, tracking-wider (`tracking-wider`, `text-xs`, `font-semibold`).

---

## ✨ Glassmorphism & Translucency
To create layers and a futuristic feel:
*   Use `backdrop-blur-xl` combined with transparent dark backgrounds (e.g., `bg-[#050505]/70` or `bg-white/[0.02]`).
*   Add a subtle white border overlay (`border border-white/5` or `border-white/10`) to define edges in dark space.

---

## 🎬 Motion, Hover & Micro-interactions
The interface should feel alive, reactive, and responsive to user input.

*   **Hover Scaling:** Interactive cards and chips should scale slightly on hover (`hover:scale-[1.02]` or `hover:scale-105`) with extremely smooth transitions (`transition-all duration-300 ease-out`).
*   **Interactive Glows:** When buttons or icons are hovered, increase the opacity of background ambient glows or add a drop shadow glow (`shadow-[0_0_30px_rgba(168,85,247,0.2)]`).
*   **Transitions:** Always specify transitions explicitly (`transition-all`, `transition-colors`, etc.) and avoid default browser jumpiness. Use custom cubic-bezier or `ease-out` for a premium feel.
