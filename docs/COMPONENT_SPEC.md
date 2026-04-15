# Component spec (selected)

## `AppShell`

Global header with title link, nav links to main routes, footer.

## `LessonPlayer` (`components/lesson/LessonPlayer.tsx`)

**Props:** `{ lesson: Lesson }`.

**Behavior:**

- Resumes `currentStepIndex` from store when status is `in_progress` (after hydration).
- If status is `completed`, shows a gate: Review again (calls `restartLesson`) or back to path.
- Question steps: Check → feedback → Continue on success; Try again clears attempt.
- Hints: `registerHintUse` increments global hint count per reveal.
- Completion step: `completeLesson` + navigate to `/learn`.

## `LessonAccessGuard`

Wraps lesson content; if lesson is locked by order, shows message and link to `/learn`.

## `LearningPathClient`

Lists modules and lessons with badges; links disabled when locked.

## `PracticeArena`

Uses `content/practice-pool.ts` items; predict-output check only.

## `HomeClient`

Continue = in-progress lesson, else next incomplete lesson.

## UI primitives

- **`Button`**: variants `primary` | `secondary` | `ghost`.
- **`Card`**: default padded lesson shell.
