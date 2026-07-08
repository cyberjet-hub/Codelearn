import { SiteFooter } from "@/components/SiteFooter";
import { SiteNavbar } from "@/components/SiteNavbar";
import { getCurrentUser } from "@/lib/auth";
import { courses, stats } from "@/lib/courses";
import Link from "next/link";

export const dynamic = "force-dynamic";

const featureCards = [
  {
    title: "Interactive lessons that react to your code",
    description:
      "Students learn by typing, testing, fixing, and celebrating wins—no passive video marathons.",
    icon: "⌘",
  },
  {
    title: "Project-first path from zero to portfolio",
    description:
      "Every sprint ends with something real: landing pages, dashboards, games, automations, and capstones.",
    icon: "◆",
  },
  {
    title: "AI-style hints without giving away answers",
    description:
      "Gentle nudges help students build problem-solving muscles instead of copying solutions.",
    icon: "✦",
  },
  {
    title: "Progress dashboards that make learning addictive",
    description:
      "Streaks, concept mastery, and saved course progress keep students motivated every week.",
    icon: "↗",
  },
];

const benefits = [
  "Beginner-friendly curriculum designed for students",
  "Live code playgrounds with instant feedback",
  "Beautiful UI challenges inspired by leading tech brands",
  "Account dashboard backed by PostgreSQL",
  "Responsive lessons for phone, tablet, and laptop",
  "Free starter plan so anyone can begin today",
];

const testimonials = [
  {
    quote:
      "Code learn made coding feel like a game and a real career skill at the same time. I shipped my first portfolio in two weeks.",
    name: "Maya R.",
    role: "Computer science freshman",
  },
  {
    quote:
      "The live labs are perfect. I can run tests, see exactly what is missing, and keep going without feeling stuck.",
    name: "Daniel K.",
    role: "High school student",
  },
  {
    quote:
      "It looks premium, but it is simple enough for beginners. My study streak finally became consistent.",
    name: "Ari T.",
    role: "Self-taught learner",
  },
];

const faqs = [
  {
    question: "Is Code learn beginner friendly?",
    answer:
      "Yes. Students can start with HTML, CSS, JavaScript, or Python fundamentals and gradually move into React and real product projects.",
  },
  {
    question: "Can students save progress?",
    answer:
      "Yes. Create a free account and Code learn stores learner profiles, sessions, and course progress in PostgreSQL through Drizzle ORM.",
  },
  {
    question: "Does it work on mobile?",
    answer:
      "The experience is mobile-first and responsive, with accessible navigation, readable lessons, and touch-friendly controls.",
  },
];

export default async function HomePage() {
  const user = await getCurrentUser();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      <SiteNavbar signedIn={Boolean(user)} />

      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-1/2 top-[-20rem] size-[42rem] -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute right-[-18rem] top-1/3 size-[34rem] rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute bottom-[-18rem] left-[-12rem] size-[34rem] rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      <section className="relative isolate px-6 pb-20 pt-32 sm:pt-40 lg:pb-28">
        <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="reveal">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-200/10 px-3 py-2 text-sm font-semibold text-cyan-100 shadow-xl shadow-cyan-900/20 backdrop-blur">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-300 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-300" />
              </span>
              Free interactive coding school for ambitious students
            </div>
            <h1 className="mt-8 max-w-5xl text-balance text-5xl font-black tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl xl:text-8xl">
              Learn to code by building things that feel
              <span className="block bg-gradient-to-r from-cyan-200 via-blue-200 to-violet-200 bg-clip-text text-transparent">
                premium, real, and alive.
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/65 sm:text-xl">
              Code learn turns students into confident builders with live coding labs, project-based courses,
              saved progress, mentor-style hints, and a dashboard that makes daily practice feel rewarding.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href={user ? "/dashboard" : "/signup"}
                className="group inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-base font-black text-slate-950 shadow-2xl shadow-cyan-400/20 transition hover:-translate-y-1 hover:bg-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                {user ? "Open your dashboard" : "Create free account"}
                <span className="ml-2 transition group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-4 text-base font-bold text-white/85 backdrop-blur transition hover:-translate-y-1 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                Explore courses
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.09]">
                  <p className="text-2xl font-black text-white">{stat.value}</p>
                  <p className="mt-1 text-xs leading-5 text-white/50">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal relative lg:pl-6">
            <div className="hero-card-3d relative mx-auto max-w-xl rounded-[2.5rem] border border-white/10 bg-white/[0.07] p-4 shadow-2xl shadow-cyan-950/40 backdrop-blur-2xl">
              <div className="absolute -left-8 top-12 z-10 hidden rounded-3xl border border-white/10 bg-slate-950/70 p-4 shadow-2xl backdrop-blur-xl sm:block floating">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">Live tests</p>
                <p className="mt-2 text-2xl font-black text-emerald-200">98%</p>
              </div>
              <div className="absolute -right-6 bottom-16 z-10 hidden rounded-3xl border border-white/10 bg-slate-950/70 p-4 shadow-2xl backdrop-blur-xl sm:block floating-delayed">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-200">Streak</p>
                <p className="mt-2 text-2xl font-black text-white">12 days</p>
              </div>
              <img
                src="/images/code-learn-hero.png"
                alt="3D illustration of students learning code around a holographic laptop"
                className="aspect-[16/10] w-full rounded-[2rem] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-6 py-10" aria-labelledby="proof-heading">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl reveal">
          <h2 id="proof-heading" className="text-center text-sm font-black uppercase tracking-[0.28em] text-white/45">
            Built for student builders trusted by modern learning teams
          </h2>
          <div className="mt-6 grid gap-3 text-center text-sm font-black text-white/55 sm:grid-cols-2 lg:grid-cols-5">
            {['Campus Lab', 'Future Devs', 'Hack Club', 'Design Systems', 'AI Study Room'].map((name) => (
              <div key={name} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 transition hover:bg-white/[0.08] hover:text-white">
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="relative px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl reveal">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-200">Why students stick with it</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-6xl">
              Coding lessons that feel less like school and more like shipping.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {featureCards.map((feature) => (
              <article key={feature.title} className="reveal group rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:bg-white/[0.09] hover:shadow-2xl hover:shadow-cyan-950/30">
                <div className="grid size-13 place-items-center rounded-2xl bg-gradient-to-br from-cyan-300 to-violet-400 text-2xl font-black text-slate-950 transition group-hover:rotate-6 group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="mt-6 text-xl font-black text-white">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/58">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div className="reveal rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-violet-950/30 backdrop-blur-2xl">
            <img
              src="/images/code-learn-dashboard.png"
              alt="3D product showcase of coding dashboard with editor and progress cards"
              className="aspect-[16/10] w-full rounded-[2rem] object-cover"
            />
          </div>
          <div className="reveal">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-violet-200">Product showcase</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-6xl">
              A learning dashboard students actually want to open.
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/62">
              Track streaks, see course progress, jump into live labs, and keep every account connected to a real database.
              The interface is intentionally beautiful because motivation matters.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white/70">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-emerald-300 text-xs font-black text-slate-950">✓</span>
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end reveal">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-200">Course paths</p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-6xl">Start free. Build fast.</h2>
            </div>
            <Link href="/courses" className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-black text-white/80 transition hover:bg-white hover:text-slate-950">
              View all courses →
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {courses.map((course) => (
              <Link key={course.slug} href={`/courses/${course.slug}`} className="reveal group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:bg-white/[0.1]">
                <div className={`h-2 rounded-full bg-gradient-to-r ${course.accent}`} />
                <p className="mt-5 text-sm font-black uppercase tracking-[0.2em] text-white/45">{course.eyebrow}</p>
                <h3 className="mt-3 text-2xl font-black text-white">{course.title}</h3>
                <p className="mt-3 min-h-24 text-sm leading-7 text-white/58">{course.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {course.stack.slice(0, 3).map((item) => (
                    <span key={item} className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/60">{item}</span>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between text-sm text-white/50">
                  <span>{course.lessons} lessons</span>
                  <span className="font-black text-cyan-200 transition group-hover:translate-x-1">Start lab →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl reveal">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-violet-200">Student stories</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-6xl">Confidence compounds when practice feels alive.</h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <figure key={testimonial.name} className="reveal rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl">
                <blockquote className="text-lg leading-8 text-white/75">“{testimonial.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <div className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-cyan-300 to-violet-400 font-black text-slate-950">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-black text-white">{testimonial.name}</p>
                    <p className="text-sm text-white/45">{testimonial.role}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="relative px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl text-center reveal">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-200">Pricing</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-6xl">Start free. Upgrade when you want more mentorship.</h2>
        </div>
        <div className="mx-auto mt-10 grid max-w-6xl gap-5 lg:grid-cols-3">
          {[
            ['Free', '$0', 'Live labs, starter dashboard, and beginner paths'],
            ['Builder', '$12', 'All courses, advanced projects, and streak boosters'],
            ['Campus', 'Custom', 'Class cohorts, instructor views, and team analytics'],
          ].map(([plan, price, copy], index) => (
            <article key={plan} className={`reveal rounded-[2rem] border p-6 backdrop-blur-xl transition hover:-translate-y-2 ${index === 1 ? 'border-cyan-200/40 bg-cyan-200/10 shadow-2xl shadow-cyan-950/40' : 'border-white/10 bg-white/[0.06]'}`}>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-white/45">{plan}</p>
              <h3 className="mt-4 text-5xl font-black text-white">{price}</h3>
              <p className="mt-4 min-h-14 text-sm leading-7 text-white/60">{copy}</p>
              <Link href={plan === 'Campus' ? '/faq' : '/signup'} className="mt-6 inline-flex w-full justify-center rounded-full bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-100">
                {plan === 'Campus' ? 'Talk to us' : 'Choose plan'}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section id="faq" className="relative px-6 py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="reveal">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-violet-200">FAQ</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-6xl">Questions before your first lesson?</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="reveal group rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl open:bg-white/[0.09]">
                <summary className="cursor-pointer list-none text-lg font-black text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
                  {faq.question}
                  <span className="float-right transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-sm leading-7 text-white/60">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-cyan-300 via-blue-400 to-violet-500 p-8 text-slate-950 shadow-2xl shadow-cyan-950/40 sm:p-12 reveal">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-slate-800/70">Ready to code?</p>
              <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.05em] sm:text-6xl">
                Create an account and watch your progress appear in the database.
              </h2>
              <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-slate-900/70">
                Start with a free interactive lab, save your profile, and build your first project today.
              </p>
            </div>
            <Link href={user ? "/dashboard" : "/signup"} className="rounded-full bg-slate-950 px-8 py-4 text-center text-base font-black text-white shadow-2xl transition hover:-translate-y-1 hover:bg-white hover:text-slate-950">
              {user ? "Go to dashboard" : "Join free now"} →
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
