"use client";

import Link from "next/link";
import { useProgressStore } from "@/lib/progress/store";
import {
  getContinueLessonId,
  getLessonTitle,
  getNextLessonId,
} from "@/lib/progress/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function HomeClient() {
  const lessonProgress = useProgressStore((s) => s.lessonProgress);
  const streak = useProgressStore((s) => s.streak);
  const totalTime = useProgressStore((s) => s.totalTimeMinutes);

  const continueId = getContinueLessonId(lessonProgress);
  const nextId = getNextLessonId(lessonProgress);

  const completed = Object.values(lessonProgress).filter(
    (p) => p.status === "completed",
  ).length;

  return (
    <Card>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Continue learning
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Streak:{" "}
            <span className="font-medium text-[var(--foreground)]">{streak}</span>{" "}
            day{streak === 1 ? "" : "s"} · Lessons done:{" "}
            <span className="font-medium text-[var(--foreground)]">{completed}</span>{" "}
            · Time logged:{" "}
            <span className="font-medium text-[var(--foreground)]">
              {totalTime} min
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          {continueId && (
            <Link href={`/lesson/${continueId}`}>
              <Button className="w-full min-w-[200px] sm:w-auto">
                Continue: {getLessonTitle(continueId)}
              </Button>
            </Link>
          )}
          {!continueId && nextId && (
            <Link href={`/lesson/${nextId}`}>
              <Button className="w-full min-w-[200px] sm:w-auto">
                Start: {getLessonTitle(nextId)}
              </Button>
            </Link>
          )}
          {!continueId && !nextId && (
            <p className="text-sm text-[var(--success)]">
              You finished every lesson. Try Practice or Review.
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
