# AGENTS — Python Prep Lab

Fast orientation for **AI agents** and humans doing quick repo reviews.

## Identity

| | |
|--|--|
| **Name** | Python Prep Lab |
| **Purpose** | Prep for COP 1047C Intro to Python (MDC); see [README.md](README.md) |
| **Version** | `0.1.0` ([package.json](package.json), [CHANGELOG.md](CHANGELOG.md)) |

## Stack

Next.js App Router · TypeScript · Tailwind CSS v4 · Framer Motion · Zustand · `localStorage` ([docs/ARCHITECTURE.md](docs/ARCHITECTURE.md))

## Layout

| Path | Role |
|------|------|
| `app/` | Routes `/`, `/learn`, `/lesson/[lessonId]`, `/practice`, `/progress`, `/review`, `/settings` |
| `content/` | Lesson/module data (typed) |
| `lib/lesson-engine/` | Step evaluation |
| `lib/progress/` | Zustand store + unlock logic |

## Authoritative docs

1. [docs/PRD.md](docs/PRD.md) — scope and non-goals  
2. [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — system design  
3. [docs/LESSON_AUTHORING_GUIDE.md](docs/LESSON_AUTHORING_GUIDE.md) — content changes  

Index of all design docs: [docs/README.md](docs/README.md).

## Commands

```bash
npm run dev    # develop
npm run lint && npm run build   # verify before merge
```

## Discipline

Small, focused diffs; match existing style; avoid new deps without cause. Human-oriented guide: [CONTRIBUTING.md](CONTRIBUTING.md). Security: [SECURITY.md](SECURITY.md).
