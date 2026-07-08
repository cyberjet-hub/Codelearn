import { LoginForm } from "@/components/AuthForms";
import { SiteNavbar } from "@/components/SiteNavbar";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) redirect("/dashboard");

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <SiteNavbar />
      <section className="relative grid min-h-screen items-center px-6 py-32">
        <div className="absolute inset-0 grid-bg opacity-35" aria-hidden="true" />
        <div className="relative mx-auto grid w-full max-w-5xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="reveal">
            <Link href="/" className="text-sm font-bold text-cyan-200 transition hover:text-white">← Back home</Link>
            <p className="mt-8 text-sm font-black uppercase tracking-[0.28em] text-violet-200">Welcome back</p>
            <h1 className="mt-5 text-5xl font-black tracking-[-0.06em] sm:text-7xl">
              Continue your streak.
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/62">
              Log in to reopen your dashboard, continue course labs, and keep your saved progress moving.
            </p>
          </div>

          <div className="reveal rounded-[2.25rem] border border-white/10 bg-white/[0.07] p-5 shadow-2xl shadow-violet-950/30 backdrop-blur-2xl sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-black text-white">Log in</h2>
              <p className="mt-2 text-sm leading-6 text-white/55">Your coding workspace is waiting.</p>
            </div>
            <LoginForm />
          </div>
        </div>
      </section>
    </main>
  );
}
