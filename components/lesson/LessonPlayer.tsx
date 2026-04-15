"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import type { Lesson, LessonStep } from "@/lib/types";
import {
  evaluateStep,
  stepRequiresCorrectAnswer,
} from "@/lib/lesson-engine/evaluate";
import { useProgressStore } from "@/lib/progress/store";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { LessonProgressBar } from "@/components/lesson/LessonProgressBar";
import {
  FeedbackBanner,
  FillBlank,
  HintPanel,
  MultipleChoice,
  PredictOutput,
  StaticStep,
} from "@/components/lesson/StepBody";

type Attempt = "idle" | "correct" | "incorrect";

export function LessonPlayer({ lesson }: { lesson: Lesson }) {
  const router = useRouter();
  const reduceMotion = useProgressStore((s) => s.reduceMotion);
  const prefersReducedMotion = useReducedMotion();
  const shouldReduceMotion = reduceMotion || prefersReducedMotion;

  const startLesson = useProgressStore((s) => s.startLesson);
  const restartLesson = useProgressStore((s) => s.restartLesson);
  const saveLessonProgress = useProgressStore((s) => s.saveLessonProgress);
  const completeLesson = useProgressStore((s) => s.completeLesson);
  const registerHintUse = useProgressStore((s) => s.registerHintUse);
  const bumpIncorrectForTags = useProgressStore((s) => s.bumpIncorrectForTags);

  const stored = useProgressStore(
    (s) => s.lessonProgress[lesson.id],
  );

  const [stepIndex, setStepIndex] = useState(0);
  const [reviewing, setReviewing] = useState(false);
  const [attempt, setAttempt] = useState<Attempt>("idle");
  const [mcChoice, setMcChoice] = useState<string | null>(null);
  const [fillValue, setFillValue] = useState("");
  const [predictValue, setPredictValue] = useState("");
  const [hintLevel, setHintLevel] = useState(0);

  const step: LessonStep | undefined = lesson.steps[stepIndex];

  useEffect(() => {
    startLesson(lesson.id);
  }, [lesson.id, startLesson]);

  // Sync step index after Zustand rehydrates from localStorage (client-only).
  useEffect(() => {
    if (!stored) return;
    if (stored.status === "in_progress") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- external persisted state
      setStepIndex(stored.currentStepIndex);
    }
  }, [stored, lesson.id]);

  if (!step) {
    return (
      <Card>
        <p className="text-[var(--muted)]">This lesson has no steps.</p>
      </Card>
    );
  }

  if (stored?.status === "completed" && !reviewing) {
    return (
      <Card>
        <div className="space-y-4 text-center">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            You already completed this lesson
          </h2>
          <p className="text-[var(--muted)]">
            Want to walk through it again? Your progress will reset for this
            lesson until you finish.
          </p>
          <div className="flex flex-col justify-center gap-2 sm:flex-row">
            <Button
              type="button"
              onClick={() => {
                restartLesson(lesson.id);
                setReviewing(true);
                setStepIndex(0);
              }}
            >
              Review again
            </Button>
            <Link
              href="/learn"
              className="inline-flex items-center justify-center rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--background)]"
            >
              Back to path
            </Link>
          </div>
        </div>
      </Card>
    );
  }

  const requiresAnswer = stepRequiresCorrectAnswer(step);
  const hints = "hints" in step ? step.hints ?? [] : [];

  function handleCheck() {
    const current = lesson.steps[stepIndex];
    if (!current || !stepRequiresCorrectAnswer(current)) return;
    const answer =
      current.type === "multiple_choice"
        ? mcChoice ?? ""
        : current.type === "fill_blank"
          ? fillValue
          : predictValue;
    const ok = evaluateStep(current, answer);
    const state = useProgressStore.getState();
    const prev = state.lessonProgress[lesson.id];
    if (ok) {
      setAttempt("correct");
      saveLessonProgress(lesson.id, {
        correctCount: (prev?.correctCount ?? 0) + 1,
      });
    } else {
      setAttempt("incorrect");
      saveLessonProgress(lesson.id, {
        incorrectCount: (prev?.incorrectCount ?? 0) + 1,
      });
      bumpIncorrectForTags(lesson.conceptTags);
    }
  }

  function goNext() {
    const next = stepIndex + 1;
    if (next >= lesson.steps.length) return;
    setAttempt("idle");
    setMcChoice(null);
    setFillValue("");
    setPredictValue("");
    setHintLevel(0);
    setStepIndex(next);
    saveLessonProgress(lesson.id, {
      currentStepIndex: next,
      status: "in_progress",
    });
  }

  function handlePrimary() {
    const s = lesson.steps[stepIndex];
    if (!s) return;
    if (s.type === "completion") {
      completeLesson(lesson.id, lesson.estimatedMinutes);
      router.push("/learn");
      return;
    }

    if (!stepRequiresCorrectAnswer(s)) {
      goNext();
      return;
    }

    if (attempt === "idle") {
      handleCheck();
      return;
    }

    if (attempt === "incorrect") {
      setAttempt("idle");
      return;
    }

    if (attempt === "correct") {
      goNext();
    }
  }

  function handleHint() {
    if (hints.length === 0 || hintLevel >= hints.length) return;
    registerHintUse(lesson.id);
    setHintLevel((h) => h + 1);
  }

  const primaryLabel = (() => {
    if (step.type === "completion") return "Back to learning path";
    if (!requiresAnswer) return "Continue";
    if (attempt === "idle") return "Check answer";
    if (attempt === "incorrect") return "Try again";
    return "Continue";
  })();

  const disableCheck =
    requiresAnswer &&
    attempt === "idle" &&
    (step.type === "multiple_choice"
      ? !mcChoice
      : step.type === "fill_blank"
        ? !fillValue.trim()
        : !predictValue.trim());

  const showHintButton =
    requiresAnswer && hints.length > 0 && hintLevel < hints.length;

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      <LessonProgressBar current={stepIndex} total={lesson.steps.length} />

      <motion.div
        key={step.id}
        initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Card>
          <div className="space-y-6">
            <div className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
              {lesson.title}
            </div>

            {step.type === "multiple_choice" && (
              <MultipleChoice
                step={step}
                selected={mcChoice}
                onSelect={setMcChoice}
                disabled={attempt === "correct"}
              />
            )}
            {step.type === "fill_blank" && (
              <FillBlank
                step={step}
                value={fillValue}
                onChange={setFillValue}
                disabled={attempt === "correct"}
              />
            )}
            {step.type === "predict_output" && (
              <PredictOutput
                step={step}
                value={predictValue}
                onChange={setPredictValue}
                disabled={attempt === "correct"}
              />
            )}
            {(step.type === "intro_card" ||
              step.type === "concept_demo" ||
              step.type === "recap" ||
              step.type === "completion") && <StaticStep step={step} />}

            {requiresAnswer && (
              <HintPanel hints={hints} level={hintLevel} />
            )}

            {requiresAnswer &&
              attempt === "correct" &&
              "explanation" in step && (
                <FeedbackBanner tone="success" message={step.explanation} />
              )}
            {requiresAnswer &&
              attempt === "incorrect" &&
              "explanation" in step && (
                <FeedbackBanner
                  tone="error"
                  message={`Not quite. ${step.explanation}`}
                />
              )}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={handlePrimary}
                  disabled={
                    Boolean(
                      requiresAnswer && attempt === "idle" && disableCheck,
                    )
                  }
                >
                  {primaryLabel}
                </Button>
                {showHintButton && attempt !== "correct" && (
                  <Button variant="secondary" type="button" onClick={handleHint}>
                    Hint ({hintLevel + 1}/{hints.length})
                  </Button>
                )}
                <Link
                  href="/learn"
                  className="inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
                >
                  Exit lesson
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
