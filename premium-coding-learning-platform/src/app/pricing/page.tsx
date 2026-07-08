import { SiteFooter } from "@/components/SiteFooter";
import { SiteNavbar } from "@/components/SiteNavbar";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";

export const dynamic = "force-dynamic";

const plans = [
  {
    name: "Free",
    price: "$0",
    copy: "Perfect for students starting today.",
    features: ["Starter courses", "Live labs", "Progress dashboard", "Community challenges"],
    href: "/signup",
  },
  {
    name: "Builder",
    price: "$12/mo",
    copy: "For students who want deeper projects.",
    features: ["All course paths", "Advanced capstones", "Interview drills", "Priority hints"],
    href: "/signup",
    featured: true,
  },
  {
    name: "Campus",
    price: "Custom",
    copy: "For schools, clubs, and cohorts.",
    features: ["Cohort dashboards", "Instructor reporting", "Custom paths", "Launch support"],
    href: "/faq",
  },
];

export default async function PricingPage() {
  const user = await getCurrentUser();

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <SiteNavbar signedIn={Boolean(user)} />
      <section className="relative px-6 pb-20 pt-32 sm:pt-40">
        <div className="absolute inset-0 grid-bg opacity-35" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center reveal">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-200">Pricing</p>
            <h1 className="mt-5 text-5xl font-black tracking-[-0.06em] sm:text-7xl">Free to begin. Powerful when you grow.</h1>
            <p className="mt-6 text-lg leading-8 text-white/62">Code learn is designed to keep coding accessible for every student while offering premium paths for serious builders.</p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <article key={plan.name} className={`reveal rounded-[2.25rem] border p-7 backdrop-blur-xl transition hover:-translate-y-2 ${plan.featured ? "border-cyan-200/40 bg-cyan-200/10 shadow-2xl shadow-cyan-950/40" : "border-white/10 bg-white/[0.06]"}`}>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-white/45">{plan.name}</p>
                <h2 className="mt-4 text-5xl font-black text-white">{plan.price}</h2>
                <p className="mt-4 text-sm leading-7 text-white/60">{plan.copy}</p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm text-white/70">
                      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-cyan-300 text-xs font-black text-slate-950">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={plan.href} className="mt-7 inline-flex w-full justify-center rounded-full bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-100">
                  {plan.name === "Campus" ? "Read FAQ" : "Start free"}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
