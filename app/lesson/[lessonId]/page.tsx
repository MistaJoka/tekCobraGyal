import { notFound } from "next/navigation";
import { getLessonById } from "@/lib/lesson-engine/load-lesson";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";
import { LessonAccessGuard } from "@/components/lesson/LessonAccessGuard";

type Props = { params: Promise<{ lessonId: string }> };

export default async function LessonPage({ params }: Props) {
  const { lessonId } = await params;
  const lesson = getLessonById(lessonId);
  if (!lesson) notFound();

  return (
    <LessonAccessGuard lessonId={lessonId}>
      <LessonPlayer key={lessonId} lesson={lesson} />
    </LessonAccessGuard>
  );
}
