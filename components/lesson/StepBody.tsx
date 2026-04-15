"use client";

import type {
  CompletionStep,
  ConceptDemoStep,
  FillBlankStep,
  IntroCardStep,
  LessonStep,
  MultipleChoiceStep,
  PredictOutputStep,
  RecapStep,
} from "@/lib/types";
import { CodeBlock } from "@/components/lesson/CodeBlock";

/** Renders steps that do not need external answer state. */
export function StaticStep({ step }: { step: LessonStep }) {
  switch (step.type) {
    case "intro_card":
      return <IntroCard step={step} />;
    case "concept_demo":
      return <ConceptDemo step={step} />;
    case "recap":
      return <Recap step={step} />;
    case "completion":
      return <Completion step={step} />;
    case "multiple_choice":
    case "fill_blank":
    case "predict_output":
      return null;
    default:
      return <p className="text-[var(--danger)]">Unknown step</p>;
  }
}

function IntroCard({ step }: { step: IntroCardStep }) {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
        {step.title}
      </h2>
      <p className="text-base leading-relaxed text-[var(--muted)]">{step.body}</p>
    </div>
  );
}

function ConceptDemo({ step }: { step: ConceptDemoStep }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-[var(--foreground)]">{step.title}</h2>
      <CodeBlock code={step.code} output={step.output} />
      {step.caption && (
        <p className="text-sm text-[var(--muted)]">{step.caption}</p>
      )}
    </div>
  );
}

export function MultipleChoice({
  step,
  selected,
  onSelect,
  disabled,
}: {
  step: MultipleChoiceStep;
  selected: string | null;
  onSelect: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-4">
      <p className="text-lg font-medium text-[var(--foreground)]">{step.prompt}</p>
      {step.code && <CodeBlock code={step.code} />}
      <div className="grid gap-2">
        {step.choices.map((c) => {
          const active = selected === c;
          return (
            <button
              key={c}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(c)}
              className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                active
                  ? "border-[var(--accent)] bg-[color-mix(in_oklab,var(--accent)_12%,var(--card))]"
                  : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--muted)]"
              } ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
            >
              {c}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function FillBlank({
  step,
  value,
  onChange,
  disabled,
}: {
  step: FillBlankStep;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-4">
      <p className="text-lg font-medium text-[var(--foreground)]">{step.prompt}</p>
      <CodeBlock code={step.code} />
      <label className="block text-sm text-[var(--muted)]">
        Your answer
        <input
          className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2 font-mono text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--ring)]"
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="off"
        />
      </label>
    </div>
  );
}

export function PredictOutput({
  step,
  value,
  onChange,
  disabled,
}: {
  step: PredictOutputStep;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-4">
      <p className="text-lg font-medium text-[var(--foreground)]">{step.prompt}</p>
      <CodeBlock code={step.code} />
      <label className="block text-sm text-[var(--muted)]">
        Predicted output
        <textarea
          className="mt-2 min-h-[88px] w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2 font-mono text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--ring)]"
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}

function Recap({ step }: { step: RecapStep }) {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold text-[var(--foreground)]">{step.title}</h2>
      <ul className="list-disc space-y-2 pl-5 text-[var(--muted)]">
        {step.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

function Completion({ step }: { step: CompletionStep }) {
  return (
    <div className="space-y-3 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[color-mix(in_oklab,var(--success)_18%,var(--card))] text-2xl text-[var(--success)]">
        ✓
      </div>
      <h2 className="text-2xl font-semibold text-[var(--foreground)]">{step.title}</h2>
      <p className="text-[var(--muted)]">{step.message}</p>
    </div>
  );
}

export function FeedbackBanner({
  tone,
  message,
}: {
  tone: "success" | "error" | "info";
  message: string;
}) {
  const colors =
    tone === "success"
      ? "border-[var(--success)]/40 bg-[color-mix(in_oklab,var(--success)_12%,var(--card))] text-[var(--foreground)]"
      : tone === "error"
        ? "border-[var(--danger)]/40 bg-[color-mix(in_oklab,var(--danger)_10%,var(--card))] text-[var(--foreground)]"
        : "border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]";
  return (
    <div className={`rounded-xl border px-4 py-3 text-sm leading-relaxed ${colors}`}>
      {message}
    </div>
  );
}

export function HintPanel({
  hints,
  level,
}: {
  hints: string[];
  level: number;
}) {
  if (level <= 0) return null;
  const shown = hints.slice(0, level);
  return (
    <div className="space-y-2 rounded-xl border border-dashed border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--muted)]">
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
        Hints
      </p>
      <ul className="list-disc space-y-1 pl-5">
        {shown.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
    </div>
  );
}
