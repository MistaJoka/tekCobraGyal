"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { LessonProgress } from "@/lib/types";

const STORAGE_KEY = "python-prep-lab-v1";
const STORAGE_VERSION = 1;

type ProgressState = {
  lessonProgress: Record<string, LessonProgress>;
  streak: number;
  lastActivityDate: string | null;
  conceptIncorrect: Record<string, number>;
  totalTimeMinutes: number;
  reduceMotion: boolean;
  fontScale: number;
  soundEnabled: boolean;
  bumpIncorrectForTags: (tags: string[]) => void;
  startLesson: (lessonId: string) => void;
  restartLesson: (lessonId: string) => void;
  saveLessonProgress: (lessonId: string, patch: Partial<LessonProgress>) => void;
  completeLesson: (lessonId: string, estimatedMinutes: number) => void;
  registerHintUse: (lessonId: string) => void;
  resetProgress: () => void;
  setReduceMotion: (v: boolean) => void;
  setFontScale: (v: number) => void;
  setSoundEnabled: (v: boolean) => void;
};

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function bumpStreak(
  last: string | null,
  current: number,
): { streak: number; lastActivityDate: string } {
  const t = todayISO();
  if (!last) return { streak: 1, lastActivityDate: t };
  if (last === t) return { streak: current, lastActivityDate: t };
  const lastDate = new Date(last + "T12:00:00");
  const today = new Date(t + "T12:00:00");
  const diffDays = Math.round(
    (today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (diffDays === 1) return { streak: current + 1, lastActivityDate: t };
  if (diffDays === 0) return { streak: current, lastActivityDate: t };
  return { streak: 1, lastActivityDate: t };
}

const defaultProgress = (): LessonProgress => ({
  lessonId: "",
  status: "not_started",
  currentStepIndex: 0,
  correctCount: 0,
  incorrectCount: 0,
  hintsUsed: 0,
});

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      lessonProgress: {},
      streak: 0,
      lastActivityDate: null,
      conceptIncorrect: {},
      totalTimeMinutes: 0,
      reduceMotion: false,
      fontScale: 1,
      soundEnabled: false,

      bumpIncorrectForTags: (tags) =>
        set((s) => {
          const next = { ...s.conceptIncorrect };
          for (const tag of tags) {
            next[tag] = (next[tag] ?? 0) + 1;
          }
          return { conceptIncorrect: next };
        }),

      startLesson: (lessonId) =>
        set((s) => {
          const prev = s.lessonProgress[lessonId] ?? {
            ...defaultProgress(),
            lessonId,
          };
          if (prev.status === "completed") return s;
          return {
            lessonProgress: {
              ...s.lessonProgress,
              [lessonId]: {
                ...prev,
                lessonId,
                status: "in_progress",
              },
            },
          };
        }),

      restartLesson: (lessonId) =>
        set((s) => ({
          lessonProgress: {
            ...s.lessonProgress,
            [lessonId]: {
              lessonId,
              status: "in_progress",
              currentStepIndex: 0,
              correctCount: 0,
              incorrectCount: 0,
              hintsUsed: 0,
            },
          },
        })),

      saveLessonProgress: (lessonId, patch) =>
        set((s) => {
          const prev = s.lessonProgress[lessonId] ?? {
            ...defaultProgress(),
            lessonId,
          };
          return {
            lessonProgress: {
              ...s.lessonProgress,
              [lessonId]: { ...prev, ...patch, lessonId },
            },
          };
        }),

      registerHintUse: (lessonId) =>
        set((s) => {
          const prev = s.lessonProgress[lessonId] ?? {
            ...defaultProgress(),
            lessonId,
          };
          return {
            lessonProgress: {
              ...s.lessonProgress,
              [lessonId]: {
                ...prev,
                lessonId,
                hintsUsed: prev.hintsUsed + 1,
              },
            },
          };
        }),

      completeLesson: (lessonId, estimatedMinutes) =>
        set((s) => {
          const prev = s.lessonProgress[lessonId] ?? {
            ...defaultProgress(),
            lessonId,
          };
          const wasAlreadyDone = prev.status === "completed";
          const { streak, lastActivityDate } = wasAlreadyDone
            ? { streak: s.streak, lastActivityDate: s.lastActivityDate }
            : bumpStreak(s.lastActivityDate, s.streak);
          return {
            streak,
            lastActivityDate,
            totalTimeMinutes: wasAlreadyDone
              ? s.totalTimeMinutes
              : s.totalTimeMinutes + estimatedMinutes,
            lessonProgress: {
              ...s.lessonProgress,
              [lessonId]: {
                ...prev,
                lessonId,
                status: "completed",
                currentStepIndex: prev.currentStepIndex,
                completedAt: wasAlreadyDone
                  ? prev.completedAt
                  : new Date().toISOString(),
              },
            },
          };
        }),

      resetProgress: () =>
        set({
          lessonProgress: {},
          streak: 0,
          lastActivityDate: null,
          conceptIncorrect: {},
          totalTimeMinutes: 0,
        }),

      setReduceMotion: (v) => set({ reduceMotion: v }),
      setFontScale: (v) =>
        set({ fontScale: Math.min(1.25, Math.max(0.85, v)) }),
      setSoundEnabled: (v) => set({ soundEnabled: v }),
    }),
    {
      name: STORAGE_KEY,
      version: STORAGE_VERSION,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        lessonProgress: s.lessonProgress,
        streak: s.streak,
        lastActivityDate: s.lastActivityDate,
        conceptIncorrect: s.conceptIncorrect,
        totalTimeMinutes: s.totalTimeMinutes,
        reduceMotion: s.reduceMotion,
        fontScale: s.fontScale,
        soundEnabled: s.soundEnabled,
      }),
      skipHydration: true,
    },
  ),
);
