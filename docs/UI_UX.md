# UI / UX — Python Prep Lab

## Principles

- One primary action per screen in the lesson player.
- Short prompts; code in monospace blocks; calm feedback (success vs error tones).
- Motion: light step transitions; **Settings** and `prefers-reduced-motion` reduce animation.

## Design tokens (`app/globals.css`)

CSS variables: `--background`, `--foreground`, `--muted`, `--card`, `--border`, `--accent`, `--success`, `--danger`, `--font-scale`.

- **Dark mode**: follows `prefers-color-scheme: dark` (no manual theme toggle in MVP).
- **Font scale**: Settings adjusts `--font-scale` (also applied via `document.documentElement`).

## Components

- **Cards**: rounded-2xl, border, soft shadow (`components/ui/Card.tsx`).
- **Buttons**: primary (accent), secondary (border), ghost (`components/ui/Button.tsx`).
- **Code**: `CodeBlock` with optional output panel.

## Accessibility

- Semantic headings on pages; focus-visible rings on interactive controls.
- `html.reduce-motion` class toggled from Settings for users who want less motion regardless of OS preference.
