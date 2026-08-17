# Design System: Modern Signature Bookstore

This document outlines the visual identity and design tokens for the **Modern Signature Bookstore** project, extracted from the Stitch MCP.

## 🎨 Color Palette

The palette follows a **"Paper and Ink"** philosophy, creating a premium, intellectual, and warm reading experience.

| Role | Color | Hex | Description |
| :--- | :--- | :--- | :--- |
| **Primary** | ![#000000](https://via.placeholder.com/15/000000/000000?text=+) | `#000000` | **Deep Charcoal**: Used for typography and structural elements for a grounded feel. |
| **Secondary** | ![#fbf9f8](https://via.placeholder.com/15/fbf9f8/000000?text=+) | `#fbf9f8` | **Warm Paper Beige**: The primary background color. Reduces eye strain and adds tactile feel. |
| **Tertiary** | ![#E66D5C](https://via.placeholder.com/15/E66D5C/000000?text=+) | `#E66D5C` | **Coral Accent**: A vibrant pop used for calls to action and interactive states. |
| **Surface** | ![#fbf9f8](https://via.placeholder.com/15/fbf9f8/000000?text=+) | `#fbf9f8` | Base surface color for containers and cards. |
| **Outline** | ![#747878](https://via.placeholder.com/15/747878/000000?text=+) | `#747878` | Used for subtle borders and secondary structural lines. |
| **On-Surface** | ![#1b1c1c](https://via.placeholder.com/15/1b1c1c/000000?text=+) | `#1b1c1c` | High-contrast text color for legibility on paper-like backgrounds. |

---

## typography Typography

The typography strategy balances literary authority with modern efficiency.

### Headlines (Editorial Voice)
- **Font Family**: `Newsreader` (Serif)
- **Characteristics**: Classic serif terminals, "literary" soul.

| Level | Size | Weight | Line Height | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | 48px | 600 | 1.1 | -0.02em |
| **Headline LG** | 32px | 500 | 1.2 | Standard |
| **Headline MD** | 24px | 500 | 1.3 | Standard |

### Body & UI (Functional Voice)
- **Font Family**: `Manrope` (Sans-Serif)
- **Characteristics**: Geometric yet refined, high legibility.

| Level | Size | Weight | Line Height | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- |
| **Body LG** | 18px | 400 | 1.6 | Standard |
| **Body MD** | 16px | 400 | 1.6 | Standard |
| **Label MD** | 14px | 600 | 1.0 | 0.05em |
| **Label SM** | 12px | 700 | 1.0 | Standard |

---

## 📐 Layout & Shapes

- **Base Spacing Unit**: `4px`
- **Container Max-Width**: `1280px`
- **Corner Radius**: 
  - `sm`: `0.125rem` (2px)
  - `DEFAULT`: `0.25rem` (4px)
  - `lg`: `0.5rem` (8px)
  - `xl`: `0.75rem` (12px)

## ✨ Design Principles

1. **Minimalist-Tactile**: Use heavy whitespace and a restricted palette to let book covers shine.
2. **Ambient Shadows**: Avoid harsh shadows. Use soft, multi-layered shadows with a deep charcoal tint at 4-8% opacity.
3. **Magazine-like Composition**: Employ large margins (40px+) and intentional vertical rhythm to create an exclusive feel.
4. **Interactive Feedback**: Elevate elements slightly on hover (Y-axis offset) to provide tactile feedback.
