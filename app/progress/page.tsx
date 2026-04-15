"use client";

import Link from "next/link";
import { allLessons, modules } from "@/content";
import { useProgressStore } from "@/lib/progress/store";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function ProgressPage() {
  const lessonProgress = useProgressStore((s) => s.lessonProgress);
  const streak = useProgressStore((s) => s.streak);
  const totalTime = useProgressStore((s) => s.totalTimeMinutes);
  const conceptIncorrect = useProgressStore((s) => s.conceptIncorrect);

  const completed = allLessons.filter(
    (l) => lessonProgress[l.id]?.status === "completed",
  ).length;
  const pct = Math.round((completed / allLessons.length) * 100);

  const weak = Object.entries(conceptIncorrect)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">
          Progress
        </h1>
        <p className="mt-2 text-[var(--muted)]">
          Modules: {modules.length} · Lessons: {allLessons.length}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="!p-4">
          <p className="text-sm text-[var(--muted)]">Lessons completed</p>
          <p className="mt-1 text-2xl font-semibold text-[var(--foreground)]">
            {completed}/{allLessons.length} ({pct}%)
          </p>
        </Card>
        <Card className="!p-4">
          <p className="text-sm text-[var(--muted)]">Streak</p>
          <p className="mt-1 text-2xl font-semibold text-[var(--foreground)]">
            {streak} day{streak === 1 ? "" : "s"}
          </p>
        </Card>
        <Card className="!p-4">
          <p className="text-sm text-[var(--muted)]">Time logged</p>
          <p className="mt-1 text-2xl font-semibold text-[var(--foreground)]">
            {totalTime} min
          </p>
        </Card>
      </div>

      <Card>
        <h2 className="text-lg font-semibold text-[var(--foreground)]">
          Concepts to review
        </h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Based on missed questions in lessons (hint: practice tags you miss
          often).
        </p>
        {weak.length === 0 ? (
          <p className="mt-4 text-sm text-[var(--muted)]">
            No misses recorded yet — keep learning!
          </p>
        ) : (
          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-[var(--foreground)]">
            {weak.map(([tag, n]) => (
              <li key={tag}>
                {tag} · {n} miss{n === 1 ? "" : "es"}
              </li>
            ))}
          </ul>
        )}
        <Link href="/review" className="mt-4 inline-block">
          <Button variant="secondary">Open review</Button>
        </Link>
      </Card>
    </div>
  );
}
