import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { HomeClient } from "@/components/home/HomeClient";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
          Python Prep Lab
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
          Calm, guided practice for COP 1047C
        </h1>
        <p className="max-w-2xl text-lg text-[var(--muted)]">
          Short interactive steps, quick feedback, and a clear path from your
          first print to real confidence.
        </p>
      </div>

      <HomeClient />

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <h2 className="text-lg font-semibold text-[var(--foreground)]">
            Learning path
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Modules unlock in order. Finish a lesson to open the next.
          </p>
          <Link href="/learn" className="mt-4 inline-block">
            <Button variant="secondary" className="w-full sm:w-auto">
              View path
            </Button>
          </Link>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold text-[var(--foreground)]">
            Practice arena
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Quick predict-output drills without starting a full lesson.
          </p>
          <Link href="/practice" className="mt-4 inline-block">
            <Button variant="secondary" className="w-full sm:w-auto">
              Open practice
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
