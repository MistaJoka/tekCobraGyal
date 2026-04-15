"use client";

import Link from "next/link";
import { lessonById, modules } from "@/content";
import { useProgressStore } from "@/lib/progress/store";
import { getLessonOrder, isLessonUnlocked, isModuleComplete } from "@/lib/progress/unlock";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

function statusLabel(
  lessonId: string,
  completed: Set<string>,
  inProgress: Set<string>,
): "Done" | "In progress" | "Start" {
  if (completed.has(lessonId)) return "Done";
  if (inProgress.has(lessonId)) return "In progress";
  return "Start";
}

export function LearningPathClient() {
  const lessonProgress = useProgressStore((s) => s.lessonProgress);
  const order = getLessonOrder(modules);
  const completed = new Set(
    Object.entries(lessonProgress)
      .filter(([, v]) => v.status === "completed")
      .map(([k]) => k),
  );
  const inProgress = new Set(
    Object.entries(lessonProgress)
      .filter(([, v]) => v.status === "in_progress")
      .map(([k]) => k),
  );

  return (
    <div className="space-y-10">
      {modules.map((mod) => {
        const modDone = isModuleComplete(mod, completed);
        return (
          <section key={mod.id} className="space-y-4">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-[var(--foreground)]">
                  {mod.title}
                </h2>
                <p className="text-sm text-[var(--muted)]">{mod.description}</p>
              </div>
              <span className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
                {modDone ? "Module complete" : "In progress"}
              </span>
            </div>
            <ul className="grid gap-3">
              {mod.lessonIds.map((lessonId) => {
                const lesson = lessonById[lessonId];
                if (!lesson) return null;
                const unlocked = isLessonUnlocked(lessonId, order, completed);
                const st = statusLabel(lessonId, completed, inProgress);
                return (
                  <li key={lessonId}>
                    <Card className="!p-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="font-medium text-[var(--foreground)]">
                            {lesson.title}
                          </p>
                          <p className="text-sm text-[var(--muted)]">
                            ~{lesson.estimatedMinutes} min ·{" "}
                            {lesson.conceptTags.join(", ")}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                              !unlocked
                                ? "bg-[var(--background)] text-[var(--muted)]"
                                : st === "Done"
                                  ? "bg-[color-mix(in_oklab,var(--success)_18%,var(--card))] text-[var(--success)]"
                                  : "bg-[color-mix(in_oklab,var(--accent)_14%,var(--card))] text-[var(--accent)]"
                            }`}
                          >
                            {unlocked ? st : "Locked"}
                          </span>
                          {unlocked ? (
                            <Link href={`/lesson/${lessonId}`}>
                              <Button variant="secondary" className="text-sm">
                                {st === "Done"
                                  ? "Review"
                                  : st === "In progress"
                                    ? "Continue"
                                    : "Open"}
                              </Button>
                            </Link>
                          ) : (
                            <Button variant="secondary" disabled className="text-sm">
                              Locked
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
