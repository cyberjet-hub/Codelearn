import { SiteFooter } from "@/components/SiteFooter";
import { SiteNavbar } from "@/components/SiteNavbar";
import { getCurrentUser } from "@/lib/auth";
import { courses } from "@/lib/courses";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  const user = await getCurrentUser();

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <SiteNavbar signedIn={Boolean(user)} />
      <section className="relative px-6 pb-16 pt-32 sm:pt-40">
        <div className="absolute inset-0 grid-bg opacity-35" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl reveal">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-200">Course catalog</p>
            <h1 className="mt-5 text-5xl font-black tracking-[-0.06em] sm:text-7xl">
              Choose a path and start coding in the browser.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/62">
              Every Code learn course includes live challenges, concept checks, guided projects, and dashboard progress.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {courses.map((course) => (
              <article key={course.slug} className="reveal group overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:bg-white/[0.09]">
                <div className={`h-3 rounded-full bg-gradient-to-r ${course.accent}`} />
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-white/60">
                    {course.eyebrow}
                  </span>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-white/55">
                    {course.level}
                  </span>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-white/55">
                    {course.duration}
                  </span>
                </div>
                <h2 className="mt-5 text-3xl font-black tracking-tight text-white">{course.title}</h2>
                <p className="mt-4 text-base leading-8 text-white/62">{course.description}</p>
                <div className="mt-6 grid gap-3">
                  {course.outcomes.map((outcome) => (
                    <div key={outcome} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white/68">
                      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-cyan-300 text-xs font-black text-slate-950">✓</span>
                      {outcome}
                    </div>
                  ))}
                </div>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link href={`/courses/${course.slug}`} className="inline-flex justify-center rounded-full bg-white px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-100">
                    Open live lab →
                  </Link>
                  <Link href={user ? "/dashboard" : "/signup"} className="inline-flex justify-center rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-white/70 transition hover:bg-white/10 hover:text-white">
                    {user ? "View dashboard" : "Save progress"}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
