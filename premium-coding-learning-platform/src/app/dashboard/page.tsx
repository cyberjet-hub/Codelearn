import { logoutAction } from "@/app/actions";
import { db } from "@/db";
import { courseProgress, users } from "@/db/schema";
import { SiteNavbar } from "@/components/SiteNavbar";
import { getCurrentUser } from "@/lib/auth";
import { courses } from "@/lib/courses";
import { count, desc, eq } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) redirect("/signup");

  const [progressRows, totalStudentsResult, recentStudents] = await Promise.all([
    db.select().from(courseProgress).where(eq(courseProgress.userId, user.id)),
    db.select({ value: count() }).from(users),
    db
      .select({ id: users.id, fullName: users.fullName, skillLevel: users.skillLevel, createdAt: users.createdAt })
      .from(users)
      .orderBy(desc(users.createdAt))
      .limit(5),
  ]);

  const totalStudents = totalStudentsResult[0]?.value ?? 1;
  const totalCompleted = progressRows.reduce((sum, item) => sum + item.completedLessons, 0);
  const totalMinutes = progressRows.reduce((sum, item) => sum + item.minutesLearned, 0);
  const activeCourse = courses.find((course) => course.slug === progressRows[0]?.courseSlug) ?? courses[0];

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <SiteNavbar signedIn />
      <section className="relative px-6 pb-20 pt-32 sm:pt-40">
        <div className="absolute inset-0 grid-bg opacity-30" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="reveal">
              <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-200">Student dashboard</p>
              <h1 className="mt-4 text-5xl font-black tracking-[-0.06em] sm:text-7xl">
                Welcome back, {user.fullName.split(" ")[0]}.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/62">
                Your Code learn account is saved in PostgreSQL as learner #{user.id}. Keep building and your course progress updates here.
              </p>
            </div>
            <form action={logoutAction} className="reveal">
              <button className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white/70 transition hover:bg-white hover:text-slate-950">
                Log out
              </button>
            </form>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[
              ["Completed lessons", String(totalCompleted)],
              ["Minutes learned", String(totalMinutes)],
              ["Skill level", user.skillLevel],
              ["Students in DB", String(totalStudents)],
            ].map(([label, value]) => (
              <div key={label} className="reveal rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/[0.09]">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-white/40">{label}</p>
                <p className="mt-3 text-4xl font-black text-white">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <section className="reveal rounded-[2.25rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl sm:p-7">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-200">Continue learning</p>
                  <h2 className="mt-2 text-3xl font-black text-white">{activeCourse?.title ?? "Web Foundations Sprint"}</h2>
                </div>
                <Link href={`/courses/${activeCourse?.slug ?? "html-css-starter"}`} className="rounded-full bg-cyan-300 px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-white">
                  Open live lab →
                </Link>
              </div>
              <div className="mt-6 grid gap-4">
                {courses.map((course) => {
                  const progress = progressRows.find((item) => item.courseSlug === course.slug);
                  const percent = Math.min(100, Math.round(((progress?.completedLessons ?? 0) / course.lessons) * 100));

                  return (
                    <Link key={course.slug} href={`/courses/${course.slug}`} className="group rounded-[1.5rem] border border-white/10 bg-slate-950/50 p-4 transition hover:-translate-y-1 hover:bg-slate-950/80">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-xs font-black uppercase tracking-[0.2em] text-white/40">{course.eyebrow}</p>
                          <h3 className="mt-1 text-xl font-black text-white">{course.title}</h3>
                        </div>
                        <span className="text-sm font-black text-cyan-200 transition group-hover:translate-x-1">{percent}% →</span>
                      </div>
                      <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
                        <div className={`h-full rounded-full bg-gradient-to-r ${course.accent} transition-all duration-700`} style={{ width: `${percent}%` }} />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>

            <aside className="grid gap-6">
              <section className="reveal rounded-[2.25rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-violet-200">Your profile row</p>
                <div className="mt-5 space-y-3 text-sm text-white/62">
                  <p><span className="font-bold text-white">Name:</span> {user.fullName}</p>
                  <p><span className="font-bold text-white">Email:</span> {user.email}</p>
                  <p><span className="font-bold text-white">Goal:</span> {user.goal}</p>
                  <p><span className="font-bold text-white">Created:</span> {user.createdAt.toLocaleDateString()}</p>
                </div>
              </section>

              <section className="reveal rounded-[2.25rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-200">Recent database accounts</p>
                <div className="mt-5 space-y-3">
                  {recentStudents.map((student) => (
                    <div key={student.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      <div>
                        <p className="font-black text-white">{student.fullName}</p>
                        <p className="text-xs uppercase tracking-[0.18em] text-white/40">{student.skillLevel}</p>
                      </div>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-white/55">#{student.id}</span>
                    </div>
                  ))}
                </div>
              </section>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
