import { db } from "@/db";
import { courseProgress } from "@/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { courses } from "@/lib/courses";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

type ProgressPayload = {
  courseSlug?: string;
  lessonSlug?: string;
  completedLessons?: number;
  minutesLearned?: number;
};

export async function POST(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return Response.json({ ok: false, error: "Sign in to save progress." }, { status: 401 });
  }

  const payload = (await request.json()) as ProgressPayload;
  const course = courses.find((item) => item.slug === payload.courseSlug);

  if (!course) {
    return Response.json({ ok: false, error: "Unknown course." }, { status: 400 });
  }

  const completedLessons = Math.max(0, Math.min(payload.completedLessons ?? 1, course.lessons));
  const minutesLearned = Math.max(0, Math.min(payload.minutesLearned ?? 10, 10000));

  await db
    .insert(courseProgress)
    .values({
      userId: user.id,
      courseSlug: course.slug,
      lessonSlug: payload.lessonSlug ?? "interactive-lab",
      completedLessons,
      minutesLearned,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: [courseProgress.userId, courseProgress.courseSlug],
      set: {
        lessonSlug: payload.lessonSlug ?? "interactive-lab",
        completedLessons,
        minutesLearned,
        updatedAt: new Date(),
      },
    });

  const rows = await db
    .select()
    .from(courseProgress)
    .where(eq(courseProgress.userId, user.id));

  return Response.json({ ok: true, progressRows: rows.length });
}
