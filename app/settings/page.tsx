"use client";

import { useProgressStore } from "@/lib/progress/store";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function SettingsPage() {
  const reduceMotion = useProgressStore((s) => s.reduceMotion);
  const setReduceMotion = useProgressStore((s) => s.setReduceMotion);
  const fontScale = useProgressStore((s) => s.fontScale);
  const setFontScale = useProgressStore((s) => s.setFontScale);
  const soundEnabled = useProgressStore((s) => s.soundEnabled);
  const setSoundEnabled = useProgressStore((s) => s.setSoundEnabled);
  const resetProgress = useProgressStore((s) => s.resetProgress);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">
          Settings
        </h1>
        <p className="mt-2 text-[var(--muted)]">
          Keep the UI comfortable. Sound is reserved for future audio.
        </p>
      </div>

      <Card>
        <h2 className="text-lg font-semibold text-[var(--foreground)]">
          Accessibility
        </h2>
        <label className="mt-4 flex cursor-pointer items-center gap-3 text-sm text-[var(--foreground)]">
          <input
            type="checkbox"
            checked={reduceMotion}
            onChange={(e) => setReduceMotion(e.target.checked)}
            className="h-4 w-4 rounded border-[var(--border)]"
          />
          Reduce motion (also respects system setting)
        </label>
        <div className="mt-6">
          <label className="text-sm text-[var(--muted)]">
            Text size ({Math.round(fontScale * 100)}%)
            <input
              type="range"
              min={85}
              max={125}
              step={5}
              value={Math.round(fontScale * 100)}
              onChange={(e) => setFontScale(Number(e.target.value) / 100)}
              className="mt-2 block w-full max-w-xs"
            />
          </label>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-[var(--foreground)]">
          Audio
        </h2>
        <label className="mt-4 flex cursor-pointer items-center gap-3 text-sm text-[var(--foreground)]">
          <input
            type="checkbox"
            checked={soundEnabled}
            onChange={(e) => setSoundEnabled(e.target.checked)}
            className="h-4 w-4 rounded border-[var(--border)]"
          />
          Enable sound (coming soon)
        </label>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-[var(--foreground)]">
          Data
        </h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Progress is stored only in this browser (localStorage).
        </p>
        <Button
          type="button"
          variant="secondary"
          className="mt-4"
          onClick={() => {
            if (
              typeof window !== "undefined" &&
              window.confirm("Clear all local progress?")
            ) {
              resetProgress();
            }
          }}
        >
          Reset all progress
        </Button>
      </Card>
    </div>
  );
}
