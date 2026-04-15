"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useLessonLocked } from "@/lib/progress/use-lesson-access";

export function LessonAccessGuard({
  lessonId,
  children,
}: {
  lessonId: string;
  children: React.ReactNode;
}) {
  const locked = useLessonLocked(lessonId);

  if (locked) {
    return (
      <Card>
        <h1 className="text-xl font-semibold text-[var(--foreground)]">
          Lesson locked
        </h1>
        <p className="mt-2 text-[var(--muted)]">
          Complete the previous lesson on your path to unlock this one.
        </p>
        <Link href="/learn" className="mt-4 inline-block">
          <Button variant="secondary">Back to learning path</Button>
        </Link>
      </Card>
    );
  }

  return <>{children}</>;
}
