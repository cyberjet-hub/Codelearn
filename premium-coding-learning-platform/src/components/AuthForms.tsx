"use client";

import type { AuthState } from "@/app/actions";
import { createAccountAction, loginAction } from "@/app/actions";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

function SubmitButton({ children }: { children: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="group mt-2 w-full rounded-full bg-cyan-300 px-6 py-4 text-sm font-black text-slate-950 shadow-2xl shadow-cyan-400/20 transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 disabled:cursor-wait disabled:opacity-70"
    >
      {pending ? "Working..." : children}
      <span className="ml-2 inline-block transition group-hover:translate-x-1">→</span>
    </button>
  );
}

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-cyan-300/70 focus:bg-white/[0.09] focus:ring-4 focus:ring-cyan-300/10";

export function SignupForm() {
  const [state, action] = useActionState<AuthState, FormData>(createAccountAction, {});

  return (
    <form action={action} className="grid gap-4">
      {state.error ? (
        <p className="rounded-2xl border border-rose-300/30 bg-rose-300/10 px-4 py-3 text-sm text-rose-100" role="alert">
          {state.error}
        </p>
      ) : null}

      <div className="grid gap-2">
        <label className="text-sm font-semibold text-white/75" htmlFor="fullName">
          Full name
        </label>
        <input id="fullName" name="fullName" autoComplete="name" required minLength={2} className={inputClass} placeholder="Ada Johnson" />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-semibold text-white/75" htmlFor="email">
          Email
        </label>
        <input id="email" name="email" type="email" autoComplete="email" required className={inputClass} placeholder="ada@student.com" />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-semibold text-white/75" htmlFor="password">
          Password
        </label>
        <input id="password" name="password" type="password" autoComplete="new-password" required minLength={8} className={inputClass} placeholder="At least 8 characters" />
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-white/75" htmlFor="skillLevel">
            Skill level
          </label>
          <select id="skillLevel" name="skillLevel" className={inputClass} defaultValue="beginner">
            <option className="bg-slate-950" value="beginner">Beginner</option>
            <option className="bg-slate-950" value="intermediate">Intermediate</option>
            <option className="bg-slate-950" value="advanced">Advanced</option>
          </select>
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-white/75" htmlFor="goal">
            Learning goal
          </label>
          <select id="goal" name="goal" className={inputClass} defaultValue="Build real projects">
            <option className="bg-slate-950" value="Build real projects">Build real projects</option>
            <option className="bg-slate-950" value="Prepare for internships">Prepare for internships</option>
            <option className="bg-slate-950" value="Launch a startup idea">Launch a startup idea</option>
          </select>
        </div>
      </div>

      <SubmitButton>Create my free account</SubmitButton>
      <p className="text-center text-sm text-white/50">
        Already learning here?{" "}
        <Link href="/login" className="font-bold text-cyan-200 hover:text-white">
          Log in
        </Link>
      </p>
    </form>
  );
}

export function LoginForm() {
  const [state, action] = useActionState<AuthState, FormData>(loginAction, {});

  return (
    <form action={action} className="grid gap-4">
      {state.error ? (
        <p className="rounded-2xl border border-rose-300/30 bg-rose-300/10 px-4 py-3 text-sm text-rose-100" role="alert">
          {state.error}
        </p>
      ) : null}

      <div className="grid gap-2">
        <label className="text-sm font-semibold text-white/75" htmlFor="email">
          Email
        </label>
        <input id="email" name="email" type="email" autoComplete="email" required className={inputClass} placeholder="ada@student.com" />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-semibold text-white/75" htmlFor="password">
          Password
        </label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className={inputClass} placeholder="Your password" />
      </div>

      <SubmitButton>Log in to dashboard</SubmitButton>
      <p className="text-center text-sm text-white/50">
        New to Code learn?{" "}
        <Link href="/signup" className="font-bold text-cyan-200 hover:text-white">
          Create account
        </Link>
      </p>
    </form>
  );
}
