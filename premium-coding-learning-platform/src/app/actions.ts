"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import {
  clearSession,
  createSession,
  hashPassword,
  seedStarterProgress,
  verifyPassword,
} from "@/lib/auth";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export type AuthState = {
  error?: string;
};

function readString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function createAccountAction(_state: AuthState, formData: FormData): Promise<AuthState> {
  const fullName = readString(formData, "fullName");
  const email = readString(formData, "email").toLowerCase();
  const password = readString(formData, "password");
  const skillLevel = readString(formData, "skillLevel") || "beginner";
  const goal = readString(formData, "goal") || "Build real projects and become job-ready.";

  if (fullName.length < 2) return { error: "Please enter your full name." };
  if (!email.includes("@")) return { error: "Please enter a valid email address." };
  if (password.length < 8) return { error: "Use at least 8 characters for your password." };

  const [existing] = await db.select({ id: users.id }).from(users).where(eq(users.email, email)).limit(1);
  if (existing) return { error: "An account with this email already exists. Try logging in instead." };

  const [createdUser] = await db
    .insert(users)
    .values({
      fullName,
      email,
      passwordHash: hashPassword(password),
      skillLevel,
      goal,
    })
    .returning({ id: users.id });

  if (!createdUser) return { error: "We could not create your account. Please try again." };

  await seedStarterProgress(createdUser.id);
  await createSession(createdUser.id);
  redirect("/dashboard");
}

export async function loginAction(_state: AuthState, formData: FormData): Promise<AuthState> {
  const email = readString(formData, "email").toLowerCase();
  const password = readString(formData, "password");

  if (!email || !password) return { error: "Enter your email and password." };

  const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

  if (!user || !verifyPassword(password, user.passwordHash)) {
    return { error: "Those credentials do not match a Code learn account." };
  }

  await createSession(user.id);
  redirect("/dashboard");
}

export async function logoutAction() {
  await clearSession();
  redirect("/");
}
