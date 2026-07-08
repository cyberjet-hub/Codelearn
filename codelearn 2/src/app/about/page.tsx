"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import {
  Code2,
  Heart,
  Globe,
  Users,
  Target,
  Zap,
  ArrowRight,
  Star,
  Award,
  BookOpen,
} from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Passion for Learning",
    description: "We believe everyone has the potential to become a great developer with the right guidance and tools.",
  },
  {
    icon: Globe,
    title: "Accessibility First",
    description: "Quality education should be accessible to everyone, regardless of background or location.",
  },
  {
    icon: Target,
    title: "Results Driven",
    description: "Our curriculum is designed to get you job-ready with practical, real-world projects.",
  },
  {
    icon: Zap,
    title: "Continuous Innovation",
    description: "We constantly evolve our platform with the latest technologies and teaching methodologies.",
  },
];

const team = [
  {
    name: "Alex Rivera",
    role: "Founder & CEO",
    bio: "Former Google engineer with a passion for education and 10+ years in software development.",
  },
  {
    name: "Maya Patel",
    role: "Head of Education",
    bio: "Computer Science PhD with expertise in curriculum design and interactive learning.",
  },
  {
    name: "James Chen",
    role: "Lead Developer",
    bio: "Full-stack expert who built our interactive code editor from the ground up.",
  },
  {
    name: "Sophia Kim",
    role: "Community Manager",
    bio: "Dedicated to building a supportive learning community for all our students.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-primary-400 text-sm font-semibold uppercase tracking-wider">About Us</span>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              Empowering the Next Generation{" "}
              <span className="text-gradient">of Developers</span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Code Learn was founded with a simple mission: make coding education accessible,
              interactive, and effective for everyone. We believe the best way to learn is by doing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "50K+", label: "Students", icon: Users },
              { value: "200+", label: "Lessons", icon: BookOpen },
              { value: "4.9", label: "Rating", icon: Star },
              { value: "15+", label: "Countries", icon: Globe },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <stat.icon className="w-6 h-6 text-primary-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="mt-1 text-sm text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="text-accent-light text-sm font-semibold uppercase tracking-wider">Our Story</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white leading-tight">
                From a Simple Idea to{" "}
                <span className="text-gradient">Global Impact</span>
              </h2>
              <div className="mt-6 space-y-4 text-slate-400 leading-relaxed">
                <p>
                  Code Learn started in 2022 when our founder, Alex Rivera, noticed a gap in coding education.
                  Traditional courses were either too theoretical or too expensive for most learners.
                </p>
                <p>
                  We built Code Learn to bridge that gap. Our platform combines interactive coding exercises,
                  real-time feedback, and a supportive community to create the most effective learning experience.
                </p>
                <p>
                  Today, we serve over 50,000 students across 15+ countries, helping them transform their careers
                  and build the future.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src="/images/showcase.jpg"
                  alt="Our Story"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary-400 text-sm font-semibold uppercase tracking-wider">Values</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">
              What We <span className="text-gradient">Believe In</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-xl p-6 hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary-400 text-sm font-semibold uppercase tracking-wider">Team</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">
              Meet the <span className="text-gradient">Team</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-xl p-6 text-center hover:bg-white/10 transition-colors"
              >
                <div className="w-16 h-16 rounded-full bg-linear-to-br from-primary-500 to-accent flex items-center justify-center text-xl font-bold text-white mx-auto mb-4">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                <p className="text-sm text-primary-400 mt-1">{member.role}</p>
                <p className="text-sm text-slate-400 mt-3 leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-12 text-center"
          >
            <Award className="w-12 h-12 text-primary-400 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Join Our <span className="text-gradient">Mission</span>
            </h2>
            <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
              Be part of a community that is shaping the future of technology education.
              Start learning today and help us empower the next generation of developers.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="px-8 py-4 bg-white text-slate-950 font-semibold rounded-xl hover:bg-slate-200 transition-colors flex items-center gap-2"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/courses"
                className="px-8 py-4 glass font-semibold rounded-xl hover:bg-white/10 transition-colors"
              >
                Explore Courses
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-primary-500 to-accent flex items-center justify-center">
                <Code2 className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                Code<span className="text-primary-400">Learn</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()} Code Learn. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
