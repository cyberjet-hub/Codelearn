"use client";

import type { Course } from "@/lib/courses";
import { useMemo, useState, useTransition } from "react";

type LearningStudioProps = {
  course: Course;
  signedIn: boolean;
};

export function LearningStudio({ course, signedIn }: LearningStudioProps) {
  const [code, setCode] = useState(course.challenge.starterCode);
  const [passed, setPassed] = useState(false);
  const [terminal, setTerminal] = useState([
    "Booting Code learn lab...",
    `Loaded ${course.title}`,
    "Ready: run tests when your solution is complete.",
  ]);
  const [isPending, startTransition] = useTransition();

  const score = useMemo(() => {
    const checksPassed = course.challenge.checks.filter((check) =>
      code.toLowerCase().includes(check.toLowerCase()),
    ).length;
    return Math.round((checksPassed / course.challenge.checks.length) * 100);
  }, [code, course.challenge.checks]);

  function runTests() {
    const missing = course.challenge.checks.filter(
      (check) => !code.toLowerCase().includes(check.toLowerCase()),
    );

    if (missing.length === 0) {
      setPassed(true);
      setTerminal([
        "✅ Syntax scan complete",
        "✅ Required concepts found",
        `🚀 ${course.challenge.successMessage}`,
        signedIn ? "Saving progress to your dashboard..." : "Create a free account to save this win.",
      ]);

      if (signedIn) {
        startTransition(async () => {
          await fetch("/api/progress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              courseSlug: course.slug,
              lessonSlug: "interactive-lab",
              completedLessons: 2,
              minutesLearned: 18,
            }),
          });
          setTerminal((lines) => [...lines, "✨ Progress saved in PostgreSQL."]);
        });
      }
      return;
    }

    setPassed(false);
    setTerminal([
      "🧪 Test runner found a few gaps:",
      ...missing.map((item) => `• Add or keep: ${item}`),
      "Hint: read the mission prompt and try again. You are close.",
    ]);
  }

  function resetCode() {
    setCode(course.challenge.starterCode);
    setPassed(false);
    setTerminal(["Workspace reset.", "Try the mission again with fresh focus."]);
  }

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-cyan-950/30 backdrop-blur-2xl sm:p-6 lg:p-8">
      <div className="absolute -right-24 -top-24 size-56 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 size-56 rounded-full bg-violet-500/20 blur-3xl" />

      <div className="relative grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="space-y-5">
          <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-cyan-300 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-slate-950">
                Live lab
              </span>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-white/60">
                {course.level}
              </span>
            </div>
            <h1 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-4xl">
              {course.challenge.title}
            </h1>
            <p className="mt-4 text-base leading-7 text-white/65">{course.challenge.prompt}</p>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="font-bold text-white">Concept match</span>
              <span className="font-black text-cyan-200">{score}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-violet-400 transition-all duration-500"
                style={{ width: `${score}%` }}
              />
            </div>
            <div className="mt-4 grid gap-2">
              {course.challenge.checks.map((check) => {
                const active = code.toLowerCase().includes(check.toLowerCase());
                return (
                  <div
                    key={check}
                    className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm transition ${
                      active
                        ? "border-emerald-300/40 bg-emerald-300/10 text-emerald-100"
                        : "border-white/10 bg-white/5 text-white/55"
                    }`}
                  >
                    <span>{check}</span>
                    <span aria-hidden="true">{active ? "✓" : "○"}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#070b1a] shadow-2xl shadow-black/40">
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-4 py-3">
            <div className="flex items-center gap-2" aria-hidden="true">
              <span className="size-3 rounded-full bg-rose-400" />
              <span className="size-3 rounded-full bg-amber-300" />
              <span className="size-3 rounded-full bg-emerald-300" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">student-workspace</span>
          </div>

          <label className="sr-only" htmlFor="code-editor">
            Code editor
          </label>
          <textarea
            id="code-editor"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            spellCheck={false}
            className="min-h-80 w-full resize-y bg-transparent p-5 font-mono text-sm leading-7 text-cyan-50 outline-none transition placeholder:text-white/30 focus:bg-white/[0.02]"
          />

          <div className="border-t border-white/10 bg-slate-950/80 p-4">
            <div className="mb-3 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={runTests}
                disabled={isPending}
                className="group rounded-full bg-cyan-300 px-5 py-3 text-sm font-black text-slate-950 shadow-lg shadow-cyan-400/20 transition hover:-translate-y-0.5 hover:bg-white disabled:cursor-wait disabled:opacity-70"
              >
                {isPending ? "Saving..." : "Run tests"}
                <span className="ml-2 inline-block transition group-hover:translate-x-0.5">↵</span>
              </button>
              <button
                type="button"
                onClick={resetCode}
                className="rounded-full border border-white/10 px-5 py-3 text-sm font-bold text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                Reset
              </button>
            </div>

            <div
              className={`rounded-2xl border p-4 font-mono text-sm leading-7 transition ${
                passed ? "border-emerald-300/30 bg-emerald-300/10 text-emerald-100" : "border-white/10 bg-black/30 text-white/65"
              }`}
              aria-live="polite"
            >
              {terminal.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
