import { LearningPathClient } from "@/components/learn/LearningPathClient";

export default function LearnPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">
          Learning path
        </h1>
        <p className="mt-2 max-w-2xl text-[var(--muted)]">
          Work top to bottom. One small win at a time.
        </p>
      </div>
      <LearningPathClient />
    </div>
  );
}
