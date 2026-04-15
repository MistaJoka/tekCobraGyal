import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Card>
      <h1 className="text-xl font-semibold text-[var(--foreground)]">
        Page or lesson not found
      </h1>
      <p className="mt-2 text-[var(--muted)]">
        Check the URL, or return home to pick a lesson from your path.
      </p>
      <Link href="/" className="mt-4 inline-block">
        <Button>Go home</Button>
      </Link>
    </Card>
  );
}
