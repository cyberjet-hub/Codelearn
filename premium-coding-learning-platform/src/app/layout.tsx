import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Code learn — Learn coding by building real projects",
  description:
    "A premium interactive coding school for students with guided lessons, live practice, dashboards, and project-based learning.",
  keywords: [
    "learn coding",
    "student coding platform",
    "interactive programming courses",
    "JavaScript lessons",
    "React courses",
    "Python for students",
  ],
};

export const viewport: Viewport = {
  themeColor: "#050816",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen overflow-x-hidden bg-[#050816] text-white antialiased selection:bg-cyan-300 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
