import type { Lesson } from "@/lib/types";
import { allLessons } from "@/content";

export function getLessonById(lessonId: string): Lesson | undefined {
  return allLessons.find((l) => l.id === lessonId);
}

export function hasLesson(lessonId: string): boolean {
  return allLessons.some((l) => l.id === lessonId);
}
