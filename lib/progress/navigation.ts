import { allLessons, modules } from "@/content";
import { getLessonOrder } from "./unlock";
import type { LessonProgress } from "@/lib/types";

const order = getLessonOrder(modules);

export function getOrderedLessonIds(): string[] {
  return order;
}

export function getNextLessonId(
  lessonProgress: Record<string, LessonProgress>,
): string | null {
  const completed = new Set(
    Object.entries(lessonProgress)
      .filter(([, v]) => v.status === "completed")
      .map(([k]) => k),
  );
  for (const id of order) {
    if (!completed.has(id)) return id;
  }
  return null;
}

export function getContinueLessonId(
  lessonProgress: Record<string, LessonProgress>,
): string | null {
  const inProgress = order.find((id) => {
    const p = lessonProgress[id];
    return p?.status === "in_progress";
  });
  if (inProgress) return inProgress;
  return getNextLessonId(lessonProgress);
}

export function getLessonTitle(lessonId: string): string {
  return allLessons.find((l) => l.id === lessonId)?.title ?? lessonId;
}
