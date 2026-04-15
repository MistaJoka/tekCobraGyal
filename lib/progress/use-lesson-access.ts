"use client";

import { useMemo } from "react";
import { modules } from "@/content";
import { useProgressStore } from "@/lib/progress/store";
import { getLessonOrder, isLessonUnlocked } from "@/lib/progress/unlock";

export function useLessonLocked(lessonId: string): boolean {
  const lessonProgress = useProgressStore((s) => s.lessonProgress);
  return useMemo(() => {
    const order = getLessonOrder(modules);
    const completed = new Set(
      Object.entries(lessonProgress)
        .filter(([, v]) => v.status === "completed")
        .map(([k]) => k),
    );
    return !isLessonUnlocked(lessonId, order, completed);
  }, [lessonId, lessonProgress]);
}
