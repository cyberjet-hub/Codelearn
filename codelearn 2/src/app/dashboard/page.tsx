"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import { useAuth } from "@/lib/auth-context";
import {
  BookOpen,
  Clock,
  TrendingUp,
  Award,
  Flame,
  ChevronRight,
  Loader2,
  Code2,
  Target,
  Zap,
} from "lucide-react";

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [courses, setCourses] = useState<any[]>([]);
  const [progress, setProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  async function fetchData() {
    try {
      const [coursesRes, progressRes] = await Promise.all([
        fetch("/api/courses"),
        fetch("/api/progress"),
      ]);
      const coursesData = await coursesRes.json();
      const progressData = await progressRes.json();
      setCourses(coursesData.courses || []);
      setProgress(progressData.progress || []);
    } catch (err) {
      console.error("Dashboard data error:", err);
    } finally {
      setLoading(false);
    }
  }

  if (authLoading || loading) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary-400 animate-spin" />
      </main>
    );
  }

  if (!user) return null;

  const completedLessons = progress.filter((p) => p.completed).length;
  const streak = 5; // Simulated streak
  const totalCourses = courses.length;

  const stats = [
    { label: "Courses", value: totalCourses, icon: BookOpen, color: "text-primary-400", bg: "bg-primary-500/10" },
    { label: "Lessons Done", value: completedLessons, icon: Target, color: "text-green-400", bg: "bg-green-500/10" },
    { label: "Day Streak", value: streak, icon: Flame, color: "text-orange-400", bg: "bg-orange-500/10" },
    { label: "Certificates", value: Math.floor(completedLessons / 3), icon: Award, color: "text-accent-light", bg: "bg-accent/10" },
  ];

  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar />

      <div className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Welcome back, <span className="text-gradient">{user.name}</span>!
            </h1>
            <p className="mt-2 text-slate-400">Here&apos;s your learning progress today.</p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-5"
              >
                <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Continue Learning */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Continue Learning</h2>
                <Link href="/courses" className="text-sm text-primary-400 hover:text-primary-300 flex items-center gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {courses.length === 0 ? (
                <div className="glass rounded-xl p-8 text-center">
                  <Code2 className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white">No courses yet</h3>
                  <p className="mt-2 text-slate-400 mb-4">Start your learning journey today.</p>
                  <Link
                    href="/courses"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors"
                  >
                    <Zap className="w-4 h-4" />
                    Browse Courses
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {courses.map((course, i) => {
                    const courseProgress = progress.filter((p) =>
                      p.lessonId && course.id
                    ).length;
                    return (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass rounded-xl p-5 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs px-2 py-0.5 bg-primary-500/20 text-primary-400 rounded-full">
                                {course.level}
                              </span>
                              <span className="text-xs text-slate-500">{course.category}</span>
                            </div>
                            <h3 className="text-lg font-semibold text-white">{course.title}</h3>
                            <p className="text-sm text-slate-400 mt-1 line-clamp-1">{course.description}</p>
                            <div className="mt-3">
                              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                                <span>Progress</span>
                                <span>{courseProgress} lessons completed</span>
                              </div>
                              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-linear-to-r from-primary-500 to-accent rounded-full transition-all"
                                  style={{ width: `${course.lessonsCount > 0 ? (courseProgress / course.lessonsCount) * 100 : 0}%` }}
                                />
                              </div>
                            </div>
                          </div>
                          <Link
                            href={`/courses/${course.id}`}
                            className="flex-shrink-0 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors"
                          >
                            Continue
                          </Link>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Daily Goal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass rounded-xl p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-primary-400" />
                  <h3 className="font-semibold text-white">Daily Goal</h3>
                </div>
                <div className="text-center py-4">
                  <div className="text-4xl font-bold text-white">{Math.min(completedLessons, 5)}/5</div>
                  <p className="text-sm text-slate-400 mt-1">lessons completed today</p>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-linear-to-r from-primary-500 to-accent rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((completedLessons / 5) * 100, 100)}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass rounded-xl p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <h3 className="font-semibold text-white">Recent Activity</h3>
                </div>
                {progress.length === 0 ? (
                  <p className="text-sm text-slate-500 text-center py-4">No activity yet. Start learning!</p>
                ) : (
                  <div className="space-y-3">
                    {progress.slice(0, 5).map((p, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${p.completed ? "bg-green-400" : "bg-slate-600"}`} />
                        <div className="flex-1">
                          <p className="text-sm text-slate-300">Lesson {p.lessonId}</p>
                          <p className="text-xs text-slate-500">
                            {p.completed ? "Completed" : "In progress"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass rounded-xl p-5"
              >
                <h3 className="font-semibold text-white mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <Link href="/courses" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-slate-300 hover:text-white transition-colors text-sm">
                    <BookOpen className="w-4 h-4" />
                    All Courses
                  </Link>
                  <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-slate-300 hover:text-white transition-colors text-sm">
                    <Zap className="w-4 h-4" />
                    Explore Features
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
