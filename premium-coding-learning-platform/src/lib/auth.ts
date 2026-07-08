import { db } from "@/db";
import { courseProgress, userSessions, users } from "@/db/schema";
import { courses } from "@/lib/courses";
import { and, eq, gt } from "drizzle-orm";
import { cookies } from "next/headers";
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";

const sessionCookieName = "codelearn_session";
const sessionDays = 30;

function hashWithSalt(password: string, salt: string) {
  return createHash("sha256").update(`${salt}:${password}`).digest("hex");
}

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  return `${salt}:${hashWithSalt(password, salt)}`;
}

export function verifyPassword(password: string, storedHash: string) {
  const [salt, hash] = storedHash.split(":");
  if (!salt || !hash) return false;

  const candidate = hashWithSalt(password, salt);
  const hashBuffer = Buffer.from(hash, "hex");
  const candidateBuffer = Buffer.from(candidate, "hex");

  return (
    hashBuffer.length === candidateBuffer.length &&
    timingSafeEqual(hashBuffer, candidateBuffer)
  );
}

export async function createSession(userId: number) {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + sessionDays * 24 * 60 * 60 * 1000);

  await db.insert(userSessions).values({ userId, token, expiresAt });

  const cookieStore = await cookies();
  cookieStore.set(sessionCookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookieName)?.value;

  if (!token) return null;

  const [session] = await db
    .select({
      id: userSessions.id,
      expiresAt: userSessions.expiresAt,
      user: users,
    })
    .from(userSessions)
    .innerJoin(users, eq(userSessions.userId, users.id))
    .where(and(eq(userSessions.token, token), gt(userSessions.expiresAt, new Date())))
    .limit(1);

  return session?.user ?? null;
}

export async function clearSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookieName)?.value;

  if (token) {
    await db.delete(userSessions).where(eq(userSessions.token, token));
  }

  cookieStore.delete(sessionCookieName);
}

export async function seedStarterProgress(userId: number) {
  const firstCourse = courses[0];
  if (!firstCourse) return;

  await db
    .insert(courseProgress)
    .values({
      userId,
      courseSlug: firstCourse.slug,
      lessonSlug: "welcome",
      completedLessons: 1,
      minutesLearned: 12,
    })
    .onConflictDoNothing();
}
