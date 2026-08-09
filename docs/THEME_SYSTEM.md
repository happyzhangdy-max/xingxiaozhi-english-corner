# Theme System

## Behavior

- The first visit follows the operating-system light/dark preference.
- The header toggle switches explicitly between light and dark.
- The explicit choice is stored as `xingxiaozhi-theme` in browser `localStorage`.
- The pre-hydration boot script applies the saved or system theme before the page paints.

## Visual direction

- Dark preserves the original editorial ink-and-acid visual system.
- Light uses system typography, blue interaction color, translucent white materials, soft depth, and rounded cards.
- Theme styles live in `app/theme.css`; feature and layout styles remain in `app/globals.css`.

## Accessibility

- The toggle exposes its next action through an accessible label and current light-theme state through `aria-pressed`.
- Reduced motion, reduced transparency, and increased contrast preferences receive gentler or more solid alternatives.
