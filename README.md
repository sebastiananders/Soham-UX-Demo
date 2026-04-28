# Soham Event Dashboard

UX prototype for the Soham AI event-management assistant. Built to explore AI-native interaction patterns — canvas-driven workflows, unified chat, and domain-specific agent contexts.

## Stack

- **Vite + React + TypeScript**
- **Tailwind CSS v4** — via `@tailwindcss/vite` plugin (not PostCSS)
- **Ant Design v6** — with shared `antdTheme.ts` token config
- **Storybook 8** — component browser for the frontend team

## Getting started

```bash
npm install

# Run the prototype app
npm run dev          # http://localhost:5173

# Run Storybook
npm run storybook    # http://localhost:6006

# Build
npm run build
npm run build-storybook
```

## Project structure

```
app/
  components/
    AgentAvatar.tsx       # Domain avatar (website / contacts / insights)
    BTrace.tsx            # Bizzabo loading / thinking animation
    UnifiedChatView.tsx   # Full chat panel (header, messages, input)
    WebsiteCanvas.tsx     # Speaker profiles canvas
    ContactsCanvas.tsx    # Email draft + contacts table canvas
    InsightsCanvas.tsx    # Registration report + draft canvas

stories/                  # Storybook stories (all app components)
  Colors.stories.tsx
  Typography.stories.tsx
  Buttons.stories.tsx
  Primitives.stories.tsx
  AgentAvatar.stories.tsx
  Canvas.stories.tsx
  Chat.stories.tsx
  Home.stories.tsx

constants.ts              # Agent config, initial messages, canvas data
types.ts                  # Shared TypeScript types
antdTheme.ts              # Ant Design ThemeConfig (shared by app + Storybook)
DESIGN.md                 # Design system reference (colors, typography, spacing)
```

## Storybook

Live: https://soham-ux-storybook.vercel.app/



Stories are organised into two top-level groups:

**Design System** — abstract tokens for the frontend team
- Colors — full palette including domain accents
- Typography — type scale, all 15 roles
- Buttons — primary / secondary / ghost / pill, all states

**App** — actual prototype components, isolated and browsable
- Primitives — `BTrace` (sizes 10–72) and `AgentAvatar`
- Canvas — `WebsiteCanvas`, `ContactsCanvas`, `InsightsCanvas` (loading / report / thinking / draft states)
- Chat — all message types (agent, user, task-running, task-done), chat header, input bar, action buttons
- Home — agent cards (all three domains), progress metrics (individual + interactive carousel)

## Design system

See `DESIGN.md` for the full reference. Key values:

| Token | Value |
|---|---|
| Primary button | `#0075de` bg, `#ffffff` text |
| Secondary button | `rgba(0,0,0,0.05)` bg, `rgba(0,0,0,0.95)` text |
| Button shape | `8px 16px` padding, `4px` radius, `15px / 600 / 0.2px` |
| Domain accent — website | `#FDE047` |
| Domain accent — contacts | `#C4B5FD` |
| Domain accent — insights | `#34D399` |

## Key patterns

**Canvas-driven chat buttons** — action buttons in chat (e.g. "Send to team") only appear when the user has selected something on the canvas panel. They use `opacity`/`translateY` transitions and `pointerEvents: none` when hidden.

**Unified agent identity** — all domain chats are answered by "Soham" with a single black Bizzabo avatar. Domain accent colors and chat names are preserved for navigation context only.
