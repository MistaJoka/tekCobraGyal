# State model

## Zustand: `useProgressStore`

Persisted to `localStorage` key `python-prep-lab-v1` (see `lib/progress/store.ts`).

| Field | Purpose |
|-------|---------|
| `lessonProgress` | Map `lessonId` → `LessonProgress` |
| `streak` | Consecutive active days (simple date-based bump on first completion of the day) |
| `lastActivityDate` | ISO date string `YYYY-MM-DD` |
| `conceptIncorrect` | Tag → count of incorrect attempts (for Progress/Review) |
| `totalTimeMinutes` | Sum of `estimatedMinutes` on **first-time** lesson completion |
| `reduceMotion` | User setting; also applies `html.reduce-motion` |
| `fontScale` | 0.85–1.25, drives `--font-scale` |
| `soundEnabled` | Stub for future audio |

### `LessonProgress`

- `status`: `not_started` \| `in_progress` \| `completed`
- `currentStepIndex`
- `correctCount`, `incorrectCount`, `hintsUsed`
- `completedAt` ISO timestamp when completed

### Actions (selected)

- `startLesson`, `restartLesson`, `saveLessonProgress`, `completeLesson`, `registerHintUse`, `bumpIncorrectForTags`, `resetProgress`, settings setters.

### Hydration

- `skipHydration: true` + `ProgressRehydrate` calls `persist.rehydrate()` on mount.
- `SettingsApply` syncs CSS variables / motion class from store.

### Completion idempotency

- `completeLesson` only bumps streak and time when transitioning **to** completed for the first time.
