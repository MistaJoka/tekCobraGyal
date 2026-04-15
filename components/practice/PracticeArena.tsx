"use client";

import { useState } from "react";
import { practicePool } from "@/content/practice-pool";
import { checkPredictOutput } from "@/lib/lesson-engine/evaluate";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CodeBlock } from "@/components/lesson/CodeBlock";
import { FeedbackBanner } from "@/components/lesson/StepBody";

export function PracticeArena() {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<"idle" | "ok" | "bad">("idle");

  const item = practicePool[index % practicePool.length];

  function check() {
    const ok = checkPredictOutput(answer, item.correctOutput);
    setResult(ok ? "ok" : "bad");
  }

  function next() {
    setIndex((i) => (i + 1) % practicePool.length);
    setAnswer("");
    setResult("idle");
  }

  return (
    <Card>
      <div className="space-y-4">
        <p className="text-lg font-medium text-[var(--foreground)]">{item.prompt}</p>
        <CodeBlock code={item.code} />
        <label className="block text-sm text-[var(--muted)]">
          Your predicted output
          <textarea
            className="mt-2 min-h-[88px] w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2 font-mono text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--ring)]"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </label>
        {result === "ok" && (
          <FeedbackBanner tone="success" message={item.explanation} />
        )}
        {result === "bad" && (
          <FeedbackBanner
            tone="error"
            message={`Not quite. ${item.explanation}`}
          />
        )}
        <div className="flex flex-wrap gap-2">
          <Button type="button" onClick={check} disabled={!answer.trim()}>
            Check
          </Button>
          <Button type="button" variant="secondary" onClick={next}>
            Next prompt
          </Button>
        </div>
      </div>
    </Card>
  );
}
