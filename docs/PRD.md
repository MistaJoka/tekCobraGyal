# Product requirements — Python Prep Lab

## Purpose

A browser-based prep experience for **COP 1047C Intro to Python** at MDC. The app teaches through **short interactive steps**, **immediate feedback**, and a **clear linear path**, with progress stored locally.

## MVP scope (implemented)

- **Home**: welcome, streak/summary, continue or start next lesson.
- **Learning path**: modules and lessons with locked/unlocked/done states.
- **Lesson player**: one step at a time; step types include intro, concept demo, multiple choice, fill-in-the-blank, predict output, recap, completion.
- **Practice arena**: rotating predict-output drills (no path progress).
- **Progress**: completion counts, streak, time logged, weak concept tags from misses.
- **Review**: lessons whose tags match concepts with recorded misses.
- **Settings**: reduce motion, text size, sound stub, reset progress.

## Out of scope (MVP)

- Authentication, server database, code execution sandbox, AI-generated content, native mobile packaging.

## Success criteria

- A new learner can start the first lesson in one or two clicks.
- Question steps require a correct answer before continuing (with hints).
- Progress persists across reloads in the same browser.
- New lessons can be added as data under `content/` without changing engine logic.
