import type { LessonStep } from "@/lib/types";

export function normalizeTextAnswer(value: string): string {
  return value
    .trim()
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n");
}

export function checkPredictOutput(user: string, expected: string): boolean {
  return normalizeTextAnswer(user) === normalizeTextAnswer(expected);
}

export function checkFillBlank(user: string, expected: string): boolean {
  return normalizeTextAnswer(user) === normalizeTextAnswer(expected);
}

export function checkMultipleChoice(user: string, expected: string): boolean {
  return user.trim() === expected.trim();
}

export function stepRequiresCorrectAnswer(step: LessonStep): boolean {
  return (
    step.type === "multiple_choice" ||
    step.type === "fill_blank" ||
    step.type === "predict_output"
  );
}

export function evaluateStep(
  step: LessonStep,
  answer: string,
): boolean {
  switch (step.type) {
    case "multiple_choice":
      return checkMultipleChoice(answer, step.correctAnswer);
    case "fill_blank":
      return checkFillBlank(answer, step.correctAnswer);
    case "predict_output":
      return checkPredictOutput(answer, step.correctOutput);
    default:
      return true;
  }
}
