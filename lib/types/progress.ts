export type LessonStatus = "not_started" | "in_progress" | "completed";

export type LessonProgress = {
  lessonId: string;
  status: LessonStatus;
  currentStepIndex: number;
  correctCount: number;
  incorrectCount: number;
  hintsUsed: number;
  completedAt?: string;
};

export type PersistedProgress = {
  version: number;
  lessonProgress: Record<string, LessonProgress>;
  streak: number;
  lastActivityDate: string | null;
  conceptIncorrect: Record<string, number>;
  totalTimeMinutes: number;
};
