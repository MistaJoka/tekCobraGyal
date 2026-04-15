import type { Lesson } from "@/lib/types";
import { module1Lessons } from "./lessons/module-1";
import { module2Lessons } from "./lessons/module-2";
import { module3Lessons } from "./lessons/module-3";
import { module4Lessons } from "./lessons/module-4";
import { module5Lessons } from "./lessons/module-5";
import { modules } from "./modules";

export { modules };

export const allLessons: Lesson[] = [
  ...module1Lessons,
  ...module2Lessons,
  ...module3Lessons,
  ...module4Lessons,
  ...module5Lessons,
];

export const lessonById: Record<string, Lesson> = Object.fromEntries(
  allLessons.map((l) => [l.id, l]),
);
