import { SiteFooter } from "@/components/SiteFooter";
import { SiteNavbar } from "@/components/SiteNavbar";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";

export const dynamic = "force-dynamic";

const faqs = [
  ["Can beginners use Code learn?", "Absolutely. The first lessons explain concepts step by step, then move students into small hands-on missions."],
  ["Do accounts really save to the database?", "Yes. Signup inserts a user row into PostgreSQL, creates a session, and seeds starter progress using Drizzle ORM."],
  ["Can I learn on my phone?", "Yes. The landing page, dashboard, course cards, and learning labs are responsive and mobile-first."],
  ["What courses are included?", "Students can start with HTML/CSS, JavaScript, React UI building, and Python + AI foundations."],
  ["Is there real interaction while learning?", "Yes. Course labs include an editable code workspace, test runner feedback, concept checks, and progress saving for signed-in users."],
  ["Is the starter plan free?", "Yes. Students can create an account and begin with free learning paths immediately."],
];

export default async function FaqPage() {
  const user = await getCurrentUser();

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <SiteNavbar signedIn={Boolean(user)} />
      <section className="relative px-6 pb-20 pt-32 sm:pt-40">
        <div className="absolute inset-0 grid-bg opacity-35" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="reveal">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-200">FAQ</p>
            <h1 className="mt-5 text-5xl font-black tracking-[-0.06em] sm:text-7xl">Everything students ask before starting.</h1>
            <p className="mt-6 text-lg leading-8 text-white/62">Still curious? Start free and explore the dashboard, courses, and live labs yourself.</p>
            <Link href={user ? "/dashboard" : "/signup"} className="mt-8 inline-flex rounded-full bg-white px-7 py-4 text-base font-black text-slate-950 transition hover:bg-cyan-100">
              {user ? "Open dashboard" : "Create free account"} →
            </Link>
          </div>
          <div className="space-y-4">
            {faqs.map(([question, answer]) => (
              <details key={question} className="reveal group rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl open:bg-white/[0.09]">
                <summary className="cursor-pointer list-none text-lg font-black text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
                  {question}
                  <span className="float-right transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-sm leading-7 text-white/60">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
