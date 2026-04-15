# Lesson authoring guide

## File layout

- Add a `Lesson` to the appropriate `content/lessons/module-*.ts` file (or new file + import in `content/index.ts`).
- Register the lesson id in `content/modules.ts` under the right module, in teaching order.

## Lesson shape

Each lesson needs: `id`, `moduleId`, `title`, `description`, `estimatedMinutes`, `difficulty`, `conceptTags`, `steps`.

**conceptTags** drive the Review page and “weak concepts” stats when the learner misses questions (`bumpIncorrectForTags`).

## Step types (MVP)

| type | Scored? | Notes |
|------|---------|--------|
| `intro_card` | No | `title`, `body` |
| `concept_demo` | No | `title`, `code`, optional `output`, `caption` |
| `multiple_choice` | Yes | `prompt`, `choices`, `correctAnswer` (exact match), `explanation`, optional `code`, `hints` |
| `fill_blank` | Yes | `prompt`, `code`, `correctAnswer` (exact after trim), `explanation`, `hints` |
| `predict_output` | Yes | `prompt`, `code`, `correctOutput` (newline-normalized), `explanation`, `hints` |
| `recap` | No | `title`, `bullets` |
| `completion` | No | `title`, `message` — triggers module completion when the user exits via CTA |

## Copy rules

- Prompts: 1–2 lines when possible.
- Explanations: short, plain language; no jargon walls.
- Hints: ordered light → stronger; optional empty array.

## Unlock order

Lessons unlock sequentially across the flattened module list. First lesson is always unlocked.
