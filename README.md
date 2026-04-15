# Python Prep Lab

Browser-based prep for **COP 1047C Intro to Python** (MDC): short interactive lessons, immediate feedback, and a linear learning path. Progress stays in **this browser only** (`localStorage`).

**Version:** `0.1.0` (see [CHANGELOG.md](CHANGELOG.md))

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Zustand

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # eslint
```

## Project layout

| Path | Contents |
|------|----------|
| `app/` | Routes: `/`, `/learn`, `/lesson/[lessonId]`, `/practice`, `/progress`, `/review`, `/settings` |
| `components/` | Layout, lesson UI, home, practice |
| `content/` | Modules, lessons, practice pool |
| `lib/types`, `lib/lesson-engine`, `lib/progress` | Types, evaluation, persistence |
| `docs/` | Design and authoring docs ([index](docs/README.md)) |

## Adding lessons

See [docs/LESSON_AUTHORING_GUIDE.md](docs/LESSON_AUTHORING_GUIDE.md).

## Contributing and policies

| Doc | Purpose |
|-----|---------|
| [CONTRIBUTING.md](CONTRIBUTING.md) | Setup, guidelines, PR expectations |
| [AGENTS.md](AGENTS.md) | Short repo map for tools and maintainers |
| [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) | Community standards |
| [SECURITY.md](SECURITY.md) | Vulnerability reporting |
| [CHANGELOG.md](CHANGELOG.md) | Release history |

## License

[MIT](LICENSE) · Copyright (c) 2026 Python Prep Lab contributors
