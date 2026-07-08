import { NextResponse } from "next/server";
import { db } from "@/db";
import { courses, lessons } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const courseId = parseInt(id);

    const [course] = await db
      .select()
      .from(courses)
      .where(eq(courses.id, courseId))
      .limit(1);

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const courseLessons = await db
      .select()
      .from(lessons)
      .where(eq(lessons.courseId, courseId))
      .orderBy(asc(lessons.order));

    return NextResponse.json({ course, lessons: courseLessons });
  } catch (error) {
    console.error("Course detail error:", error);
    return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 });
  }
}
