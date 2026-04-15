"use client";

import { useEffect } from "react";
import { useProgressStore } from "@/lib/progress/store";

export function ProgressRehydrate() {
  useEffect(() => {
    void useProgressStore.persist.rehydrate();
  }, []);
  return null;
}

export function SettingsApply() {
  const reduceMotion = useProgressStore((s) => s.reduceMotion);
  const fontScale = useProgressStore((s) => s.fontScale);

  useEffect(() => {
    document.documentElement.style.setProperty("--font-scale", String(fontScale));
    document.documentElement.classList.toggle("reduce-motion", reduceMotion);
  }, [reduceMotion, fontScale]);

  return null;
}

export function Providers() {
  return (
    <>
      <ProgressRehydrate />
      <SettingsApply />
    </>
  );
}
