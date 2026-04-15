# Contributing to Python Prep Lab

Thanks for improving this project. This guide covers local setup, what we merge, and where deeper specs live.

## Product context

Optional reading: [docs/PRD.md](docs/PRD.md) (MVP scope, out-of-scope items such as auth and code sandboxes).

## Prerequisites

- **Node.js** (current LTS recommended)
- **npm** (bundled with Node)

## Local development

Clone the repository, then from the **repository root**:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Before you open a pull request:

```bash
npm run lint
npm run build
```

## What to contribute

| Area | Notes |
|------|--------|
| **Lessons** | Data under `content/`. Follow [docs/LESSON_AUTHORING_GUIDE.md](docs/LESSON_AUTHORING_GUIDE.md). Prefer small PRs per lesson or module. |
| **Bugs** | Describe expected vs actual behavior and how you verified the fix. |
| **Accessibility / UX** | Align with [docs/UI_UX.md](docs/UI_UX.md) (calm, guided tone). |
| **Docs** | `docs/` and root markdown; keep terminology aligned with [README.md](README.md). |

## Guidelines

- Match existing **TypeScript**, **React**, and **Tailwind** usage.
- Lesson steps must match types in `lib/types` and behavior in `lib/lesson-engine/`.
- Avoid new dependencies unless necessary; open an issue first for larger additions.

## Pull requests

- Clear title and description: **what**, **why**, **how tested**.
- Link issues: `Fixes #123` when applicable.
- One main concern per PR when possible.
- Use the [pull request template](.github/PULL_REQUEST_TEMPLATE.md) on GitHub.

## Issues

Use the repository **Issues** tab for bugs and ideas. **Security-sensitive** reports belong in [SECURITY.md](SECURITY.md), not public issues.

## Conduct

All participants follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## See also

- [docs/README.md](docs/README.md) — documentation index  
- [AGENTS.md](AGENTS.md) — concise map for automation and reviewers  
