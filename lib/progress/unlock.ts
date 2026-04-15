import type { Module } from "@/lib/types";

/** Flat ordered lesson ids from modules in order */
export function getLessonOrder(modules: Module[]): string[] {
  return modules.flatMap((m) => m.lessonIds);
}

export function getLessonIndex(
  lessonId: string,
  order: string[],
): number {
  const i = order.indexOf(lessonId);
  return i;
}

/**
 * First lesson of first module is unlocked.
 * A lesson unlocks when the previous lesson is completed.
 */
export function isLessonUnlocked(
  lessonId: string,
  order: string[],
  completedLessonIds: Set<string>,
): boolean {
  const idx = order.indexOf(lessonId);
  if (idx < 0) return false;
  if (idx === 0) return true;
  const prev = order[idx - 1];
  return completedLessonIds.has(prev);
}

export function isModuleComplete(
  mod: Module,
  completedLessonIds: Set<string>,
): boolean {
  return mod.lessonIds.every((id) => completedLessonIds.has(id));
}
