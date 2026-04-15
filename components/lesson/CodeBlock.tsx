export function CodeBlock({
  code,
  output,
}: {
  code: string;
  output?: string;
}) {
  return (
    <div className="space-y-2">
      <pre className="overflow-x-auto rounded-xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--foreground)_6%,var(--card))] p-4 font-mono text-sm leading-relaxed text-[var(--foreground)]">
        <code>{code}</code>
      </pre>
      {output !== undefined && (
        <div className="rounded-xl border border-dashed border-[var(--border)] bg-[var(--background)] px-4 py-3 font-mono text-sm text-[var(--muted)]">
          <span className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
            Output
          </span>
          <pre className="mt-1 whitespace-pre-wrap text-[var(--foreground)]">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
