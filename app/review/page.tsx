"use client";

import Link from "next/link";
import { allLessons } from "@/content";
import { useProgressStore } from "@/lib/progress/store";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function ReviewPage() {
  const conceptIncorrect = useProgressStore((s) => s.conceptIncorrect);

  const weakTags = new Set(
    Object.entries(conceptIncorrect)
      .filter(([, n]) => n > 0)
      .sort((a, b) => b[1] - a[1])
      .map(([t]) => t),
  );

  const lessonsToReview = allLessons.filter((l) =>
    l.conceptTags.some((t) => weakTags.has(t)),
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">
          Review
        </h1>
        <p className="mt-2 max-w-2xl text-[var(--muted)]">
          Lessons that match concepts you&apos;ve missed recently. For a fuller
          reset, revisit any module from the learning path.
        </p>
      </div>

      {lessonsToReview.length === 0 ? (
        <Card>
          <p className="text-[var(--muted)]">
            No weak spots detected yet. Keep going — or pick any lesson to
            revisit.
          </p>
          <Link href="/learn" className="mt-4 inline-block">
            <Button>Learning path</Button>
          </Link>
        </Card>
      ) : (
        <ul className="space-y-3">
          {lessonsToReview.map((l) => (
            <li key={l.id}>
              <Card className="!p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-medium text-[var(--foreground)]">
                      {l.title}
                    </p>
                    <p className="text-sm text-[var(--muted)]">
                      Tags: {l.conceptTags.join(", ")}
                    </p>
                  </div>
                  <Link href={`/lesson/${l.id}`}>
                    <Button variant="secondary">Open lesson</Button>
                  </Link>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
