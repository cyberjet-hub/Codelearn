import { SiteFooter } from "@/components/SiteFooter";
import { SiteNavbar } from "@/components/SiteNavbar";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";

export const dynamic = "force-dynamic";

const stories = [
  ["Maya R.", "CS freshman", "I shipped a polished portfolio section after years of just watching tutorials. The instant checks made practice feel possible."],
  ["Daniel K.", "High school student", "The JavaScript lab helped me understand functions because I could run tests and fix things immediately."],
  ["Ari T.", "Self-taught learner", "The dashboard keeps me honest. Seeing progress saved makes me want to come back every day."],
  ["Nia B.", "Design student", "I finally learned how to turn a design into a responsive page that looks premium on my phone and laptop."],
  ["Sam O.", "Robotics club", "Python lessons made automation click. I built a study streak helper and then modified it for club tasks."],
  ["Leah P.", "Career switcher", "It feels like a modern product, not a boring classroom. That made a huge difference in my motivation."],
];

export default async function TestimonialsPage() {
  const user = await getCurrentUser();

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <SiteNavbar signedIn={Boolean(user)} />
      <section className="relative px-6 pb-20 pt-32 sm:pt-40">
        <div className="absolute inset-0 grid-bg opacity-35" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl reveal">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-violet-200">Student stories</p>
            <h1 className="mt-5 text-5xl font-black tracking-[-0.06em] sm:text-7xl">Students learn faster when coding feels alive.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/62">Code learn is built for momentum: short missions, live feedback, visible progress, and real projects.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {stories.map(([name, role, quote]) => (
              <figure key={name} className="reveal rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl transition hover:-translate-y-2 hover:bg-white/[0.09]">
                <blockquote className="text-lg leading-8 text-white/75">“{quote}”</blockquote>
                <figcaption className="mt-7 flex items-center gap-3">
                  <div className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-cyan-300 to-violet-400 font-black text-slate-950">{name.charAt(0)}</div>
                  <div>
                    <p className="font-black text-white">{name}</p>
                    <p className="text-sm text-white/45">{role}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-12 text-center reveal">
            <Link href={user ? "/dashboard" : "/signup"} className="inline-flex rounded-full bg-cyan-300 px-7 py-4 text-base font-black text-slate-950 transition hover:bg-white">
              {user ? "Open dashboard" : "Start your story"} →
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
