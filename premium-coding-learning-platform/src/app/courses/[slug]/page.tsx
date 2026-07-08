import { LearningStudio } from "@/components/LearningStudio";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNavbar } from "@/components/SiteNavbar";
import { getCurrentUser } from "@/lib/auth";
import { getCourse } from "@/lib/courses";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CourseWorkspacePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourse(slug);
  const user = await getCurrentUser();

  if (!course) notFound();

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <SiteNavbar signedIn={Boolean(user)} />
      <section className="relative px-6 pb-16 pt-32 sm:pt-40">
        <div className="absolute inset-0 grid-bg opacity-35" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div className="max-w-3xl reveal">
              <Link href="/courses" className="text-sm font-bold text-cyan-200 transition hover:text-white">
                ← Back to courses
              </Link>
              <p className="mt-6 text-sm font-black uppercase tracking-[0.28em] text-white/45">{course.eyebrow}</p>
              <h1 className="mt-3 text-5xl font-black tracking-[-0.06em] sm:text-7xl">{course.title}</h1>
              <p className="mt-5 text-lg leading-8 text-white/62">{course.description}</p>
            </div>
            {!user ? (
              <Link href="/signup" className="reveal rounded-full bg-cyan-300 px-6 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-white">
                Create account to save progress
              </Link>
            ) : null}
          </div>
          <LearningStudio course={course} signedIn={Boolean(user)} />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
