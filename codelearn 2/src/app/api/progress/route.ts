import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { userProgress, lessons, courses } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { eq, and, count } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const progress = await db
      .select()
      .from(userProgress)
      .where(eq(userProgress.userId, session.id));

    return NextResponse.json({ progress });
  } catch (error) {
    console.error("Progress fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch progress" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { lessonId, completed, userCode } = body;

    const existing = await db
      .select()
      .from(userProgress)
      .where(
        and(
          eq(userProgress.userId, session.id),
          eq(userProgress.lessonId, lessonId)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(userProgress)
        .set({
          completed,
          userCode,
          completedAt: completed ? new Date() : null,
        })
        .where(eq(userProgress.id, existing[0].id));
    } else {
      await db.insert(userProgress).values({
        userId: session.id,
        lessonId,
        completed,
        userCode,
        completedAt: completed ? new Date() : null,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Progress save error:", error);
    return NextResponse.json({ error: "Failed to save progress" }, { status: 500 });
  }
}
