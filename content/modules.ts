import type { Module } from "@/lib/types";

export const modules: Module[] = [
  {
    id: "m1",
    title: "What Python is",
    description: "Build context: programs, Python’s role, running code.",
    lessonIds: ["what-programming-is", "what-python-is", "from-code-to-result"],
  },
  {
    id: "m2",
    title: "Output and basic syntax",
    description: "print, strings, quotes, and careful syntax habits.",
    lessonIds: ["print-basics", "strings-and-quotes", "syntax-habits"],
  },
  {
    id: "m3",
    title: "Variables",
    description: "Store values, name them well, update them safely.",
    lessonIds: ["variables-intro", "naming-variables", "updating-values"],
  },
  {
    id: "m4",
    title: "Input",
    description: "Read user text and combine with print.",
    lessonIds: ["input-basics", "combining-input-output", "input-is-text"],
  },
  {
    id: "m5",
    title: "Data types",
    description: "str, int, float, bool — see them in action.",
    lessonIds: ["types-overview", "numbers-and-text", "true-and-false"],
  },
];
