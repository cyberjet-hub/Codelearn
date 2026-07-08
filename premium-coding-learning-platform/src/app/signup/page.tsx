import { SignupForm } from "@/components/AuthForms";
import { SiteNavbar } from "@/components/SiteNavbar";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function SignupPage() {
  const user = await getCurrentUser();
  if (user) redirect("/dashboard");

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <SiteNavbar />
      <section className="relative grid min-h-screen items-center px-6 py-32">
        <div className="absolute inset-0 grid-bg opacity-35" aria-hidden="true" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="reveal">
            <Link href="/" className="text-sm font-bold text-cyan-200 transition hover:text-white">← Back home</Link>
            <p className="mt-8 text-sm font-black uppercase tracking-[0.28em] text-cyan-200">Create your free account</p>
            <h1 className="mt-5 text-5xl font-black tracking-[-0.06em] sm:text-7xl">
              Start coding today. Save every win.
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/62">
              Your profile will be inserted into PostgreSQL, starter course progress will be seeded, and your dashboard will unlock instantly.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {['No credit card', 'Live labs', 'Progress saved'].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm font-bold text-white/70">
                  ✓ {item}
                </div>
              ))}
            </div>
          </div>

          <div className="reveal rounded-[2.25rem] border border-white/10 bg-white/[0.07] p-5 shadow-2xl shadow-cyan-950/30 backdrop-blur-2xl sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-black text-white">Join Code learn</h2>
              <p className="mt-2 text-sm leading-6 text-white/55">Build projects, run tests, and track your learning streak.</p>
            </div>
            <SignupForm />
          </div>
        </div>
      </section>
    </main>
  );
}
