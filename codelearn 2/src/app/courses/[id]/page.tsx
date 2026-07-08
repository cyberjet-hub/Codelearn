"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Navbar from "@/components/navbar";
import { useAuth } from "@/lib/auth-context";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Play,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Loader2,
  RotateCcw,
  Sparkles,
  Lock,
  AlertCircle,
  Code2,
} from "lucide-react";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export default function CourseDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState<any[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetchCourse();
  }, [id]);

  useEffect(() => {
    if (user) fetchProgress();
  }, [user]);

  async function fetchCourse() {
    try {
      const res = await fetch(`/api/courses/${id}`);
      const data = await res.json();
      if (data.course) {
        setCourse(data.course);
        setLessons(data.lessons || []);
        if (data.lessons?.length > 0) {
          setCode(data.lessons[0].code || "");
        }
      }
    } catch (err) {
      setError("Failed to load course");
    } finally {
      setLoading(false);
    }
  }

  async function fetchProgress() {
    try {
      const res = await fetch("/api/progress");
      const data = await res.json();
      setProgress(data.progress || []);
    } catch (err) {
      console.error("Progress fetch error:", err);
    }
  }

  const isLessonCompleted = useCallback(
    (lessonId: number) => {
      return progress.some((p) => p.lessonId === lessonId && p.completed);
    },
    [progress]
  );

  function handleLessonChange(index: number) {
    if (index < 0 || index >= lessons.length) return;
    setCurrentLesson(index);
    setCode(lessons[index].code || "");
    setOutput("");
    setCompleted(false);
    setShowSuccess(false);
  }

  async function runCode() {
    setRunning(true);
    setOutput("");
    setCompleted(false);
    setShowSuccess(false);

    try {
      const lesson = lessons[currentLesson];
      let result = "";

      if (lesson.language === "python") {
        // Simulate Python execution
        const lines = code.split("\n");
        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith("print(")) {
            const match = trimmed.match(/print\((.*)\)/);
            if (match) {
              let content = match[1];
              // Handle f-strings
              if (content.startsWith("f'") || content.startsWith('f"')) {
                content = content.slice(2, -1);
                content = content.replace(/\{([^}]+)\}/g, (_, expr) => {
                  try {
                    // Simple variable resolution
                    const vars: Record<string, any> = {};
                    lines.forEach((l: string) => {
                      const v = l.match(/(\w+)\s*=\s*(.+)/);
                      if (v) {
                        try {
                          vars[v[1]] = eval(v[2]);
                        } catch {}
                      }
                    });
                    return eval(expr);
                  } catch {
                    return expr;
                  }
                });
              } else if ((content.startsWith("'") && content.endsWith("'")) ||
                         (content.startsWith('"') && content.endsWith('"'))) {
                content = content.slice(1, -1);
              }
              result += content + "\n";
            }
          }
        }
      } else {
        // Simulate JavaScript execution
        const lines = code.split("\n");
        const logs: string[] = [];
        const mockConsole = {
          log: (...args: any[]) => logs.push(args.map(String).join(" ")),
        };

        try {
          const func = new Function("console", code);
          func(mockConsole);
        } catch (err: any) {
          logs.push("Error: " + err.message);
        }
        result = logs.join("\n");
      }

      setOutput(result.trim() || "(No output)");

      // Check if output matches expected
      if (lesson.expectedOutput && result.trim() === lesson.expectedOutput.trim()) {
        setCompleted(true);
        setShowSuccess(true);
        if (user) {
          await fetch("/api/progress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              lessonId: lesson.id,
              completed: true,
              userCode: code,
            }),
          });
          fetchProgress();
        }
      }
    } catch (err: any) {
      setOutput("Error: " + err.message);
    } finally {
      setRunning(false);
    }
  }

  function resetCode() {
    if (lessons[currentLesson]) {
      setCode(lessons[currentLesson].code || "");
      setOutput("");
      setCompleted(false);
      setShowSuccess(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary-400 animate-spin" />
      </main>
    );
  }

  if (error || !course) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white">{error || "Course not found"}</h2>
          <Link href="/courses" className="mt-4 inline-flex items-center gap-2 text-primary-400 hover:text-primary-300">
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </Link>
        </div>
      </main>
    );
  }

  const lesson = lessons[currentLesson];
  const completedLessons = lessons.filter((l) => isLessonCompleted(l.id)).length;

  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar />

      {/* Course Header */}
      <section className="pt-24 pb-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 text-xs font-medium bg-primary-500/20 text-primary-400 rounded-full">
                  {course.level}
                </span>
                <span className="text-sm text-slate-400">{course.category}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">{course.title}</h1>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                {lessons.length} lessons
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {course.duration}
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                {completedLessons}/{lessons.length} completed
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-linear-to-r from-primary-500 to-accent rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${lessons.length > 0 ? (completedLessons / lessons.length) * 100 : 0}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Lesson Content */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Sidebar - Lesson List */}
            <div className="lg:col-span-1">
              <div className="glass rounded-xl p-4 sticky top-24">
                <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Lessons</h3>
                <div className="space-y-1">
                  {lessons.map((l, i) => {
                    const isActive = i === currentLesson;
                    const isComplete = isLessonCompleted(l.id);
                    return (
                      <button
                        key={l.id}
                        onClick={() => handleLessonChange(i)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                          isActive
                            ? "bg-primary-500/20 text-white"
                            : "text-slate-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
                          isComplete
                            ? "bg-green-500/20 text-green-400"
                            : isActive
                            ? "bg-primary-500/20 text-primary-400"
                            : "bg-white/5 text-slate-500"
                        }`}>
                          {isComplete ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                        </div>
                        <span className="text-sm truncate">{l.title}</span>
                        {isActive && <ChevronRight className="w-4 h-4 ml-auto flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {lesson && (
                <>
                  {/* Lesson Info */}
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass rounded-xl p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold text-white">{lesson.title}</h2>
                      {isLessonCompleted(lesson.id) && (
                        <span className="flex items-center gap-1 px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full">
                          <CheckCircle2 className="w-4 h-4" />
                          Completed
                        </span>
                      )}
                    </div>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-slate-300 leading-relaxed">{lesson.content}</p>
                    </div>
                  </motion.div>

                  {/* Code Editor */}
                  <div className="glass rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-primary-400" />
                        <span className="text-sm font-medium text-white">Code Editor</span>
                        <span className="text-xs text-slate-500">({lesson.language})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={resetCode}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          Reset
                        </button>
                        <button
                          onClick={runCode}
                          disabled={running}
                          className="flex items-center gap-1.5 px-4 py-1.5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-medium rounded-lg transition-colors disabled:opacity-50"
                        >
                          {running ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Play className="w-3.5 h-3.5" />
                          )}
                          Run Code
                        </button>
                      </div>
                    </div>

                    <div className="h-[300px]">
                      <MonacoEditor
                        value={code}
                        onChange={(value) => setCode(value || "")}
                        language={lesson.language === "python" ? "python" : "javascript"}
                        theme="vs-dark"
                        options={{
                          minimap: { enabled: false },
                          fontSize: 14,
                          lineNumbers: "on",
                          roundedSelection: false,
                          scrollBeyondLastLine: false,
                          readOnly: false,
                          automaticLayout: true,
                          padding: { top: 16 },
                        }}
                      />
                    </div>
                  </div>

                  {/* Output */}
                  <AnimatePresence>
                    {output && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="glass rounded-xl overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
                          <span className="text-sm font-medium text-white">Output</span>
                          {completed && (
                            <span className="flex items-center gap-1 text-xs text-green-400">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Correct!
                            </span>
                          )}
                        </div>
                        <div className="p-4">
                          <pre className="text-sm font-mono text-slate-300 whitespace-pre-wrap">{output}</pre>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Success Message */}
                  <AnimatePresence>
                    {showSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="glass rounded-xl p-6 border border-green-500/20"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-green-400" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">Lesson Complete!</h3>
                            <p className="text-sm text-slate-400">Great job! You can move to the next lesson.</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation */}
                  <div className="flex items-center justify-between pt-4">
                    <button
                      onClick={() => handleLessonChange(currentLesson - 1)}
                      disabled={currentLesson === 0}
                      className="flex items-center gap-2 px-4 py-2.5 glass rounded-lg text-sm text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </button>
                    <button
                      onClick={() => handleLessonChange(currentLesson + 1)}
                      disabled={currentLesson === lessons.length - 1}
                      className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 rounded-lg text-sm text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      Next Lesson
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
