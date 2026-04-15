import { PracticeArena } from "@/components/practice/PracticeArena";

export default function PracticePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">
          Practice arena
        </h1>
        <p className="mt-2 max-w-2xl text-[var(--muted)]">
          Quick predict-output rounds. No lesson progress — just reps.
        </p>
      </div>
      <PracticeArena />
    </div>
  );
}
