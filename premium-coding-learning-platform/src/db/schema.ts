import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    fullName: text("full_name").notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    passwordHash: text("password_hash").notNull(),
    role: varchar("role", { length: 40 }).notNull().default("student"),
    skillLevel: varchar("skill_level", { length: 80 }).notNull().default("beginner"),
    goal: text("goal").notNull().default("Build real projects and become job-ready."),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    emailIdx: uniqueIndex("users_email_unique_idx").on(table.email),
  }),
);

export const userSessions = pgTable(
  "user_sessions",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    token: text("token").notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    tokenIdx: uniqueIndex("user_sessions_token_unique_idx").on(table.token),
  }),
);

export const courseProgress = pgTable(
  "course_progress",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    courseSlug: varchar("course_slug", { length: 120 }).notNull(),
    lessonSlug: varchar("lesson_slug", { length: 120 }).notNull().default("intro"),
    completedLessons: integer("completed_lessons").notNull().default(0),
    minutesLearned: integer("minutes_learned").notNull().default(0),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    userCourseIdx: uniqueIndex("course_progress_user_course_unique_idx").on(
      table.userId,
      table.courseSlug,
    ),
  }),
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type CourseProgress = typeof courseProgress.$inferSelect;
