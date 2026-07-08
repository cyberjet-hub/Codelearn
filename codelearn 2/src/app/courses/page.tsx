"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import {
  Clock,
  BookOpen,
  ArrowRight,
  Search,
  Filter,
  Code2,
  Loader2,
} from "lucide-react";

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetch("/api/courses")
      .then((r) => r.json())
      .then((data) => {
        setCourses(data.courses || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = ["All", ...Array.from(new Set(courses.map((c) => c.category)))];

  const filtered = courses.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || c.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-primary-400 text-sm font-semibold uppercase tracking-wider">Explore</span>
            <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              Our <span className="text-gradient">Courses</span>
            </h1>
            <p className="mt-4 text-lg text-slate-400">
              Choose from our curated collection of programming courses designed for every skill level.
            </p>
          </motion.div>

          {/* Search & Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search courses..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="pl-12 pr-8 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all appearance-none cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-slate-900">
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-primary-400 animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <Code2 className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white">No courses found</h3>
              <p className="mt-2 text-slate-400">Try adjusting your search or filter.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((course, i) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group rounded-2xl glass overflow-hidden hover:bg-white/10 transition-all duration-300"
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 to-transparent" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-3 py-1 text-xs font-medium bg-primary-500/80 text-white rounded-full backdrop-blur-sm">
                        {course.level}
                      </span>
                      <span className="px-3 py-1 text-xs font-medium bg-white/20 text-white rounded-full backdrop-blur-sm">
                        {course.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{course.title}</h3>
                    <p className="text-sm text-slate-400 mb-4 line-clamp-2">{course.description}</p>
                    <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {course.lessonsCount} lessons
                      </div>
                    </div>
                    <Link
                      href={`/courses/${course.id}`}
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-sm font-medium text-white transition-all"
                    >
                      Start Learning
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
