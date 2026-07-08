import Link from "next/link";

const footerGroups = [
  {
    title: "Platform",
    links: [
      { href: "/courses", label: "Courses" },
      { href: "/dashboard", label: "Dashboard" },
      { href: "/pricing", label: "Pricing" },
      { href: "/signup", label: "Create account" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/courses/html-css-starter", label: "HTML + CSS" },
      { href: "/courses/javascript-lab", label: "JavaScript" },
      { href: "/courses/react-product-builder", label: "React" },
      { href: "/courses/python-ai-starter", label: "Python" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/testimonials", label: "Student stories" },
      { href: "/faq", label: "FAQ" },
      { href: "/#features", label: "Features" },
      { href: "/login", label: "Log in" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-slate-950 px-6 py-14 sm:py-20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
            <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-cyan-300 to-violet-500 font-black text-slate-950">
              Cl
            </span>
            <span>
              <span className="block text-sm font-semibold uppercase tracking-[0.28em] text-cyan-100/70">
                Code
              </span>
              <span className="block text-2xl font-black tracking-tight text-white">learn</span>
            </span>
          </Link>
          <p className="mt-6 max-w-md text-base leading-7 text-white/60">
            Code learn helps students go from curious beginner to confident builder with interactive lessons,
            live practice, beautiful dashboards, and project-based courses.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {['#BuildDaily', '#StudentCoders', '#ShipProjects'].map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white/80">{group.title}</h2>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/55 transition hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Code learn. Built for ambitious student builders.</p>
        <p>Accessible, responsive, and powered by PostgreSQL.</p>
      </div>
    </footer>
  );
}
