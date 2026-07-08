"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/navbar";
import {
  Play,
  Star,
  Zap,
  Shield,
  Users,
  Award,
  Clock,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  Code2,
  Terminal,
  BookOpen,
  TrendingUp,
  MessageCircle,
  Sparkles,
  Laptop,
  Globe,
  Layers,
  Cpu,
} from "lucide-react";

/* ─── Animated Section Wrapper ─── */
function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ─── Hero ─── */
function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/30 via-slate-950 to-slate-950" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />
      </div>

      {/* Floating Code Elements */}
      <motion.div style={{ y: y1 }} className="absolute top-32 left-10 lg:left-20 hidden md:block">
        <div className="glass rounded-xl p-4 animate-float">
          <Terminal className="w-6 h-6 text-primary-400" />
          <div className="mt-2 text-xs font-mono text-primary-300">
            const learn = () ={""} {"{...}"}
          </div>
        </div>
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute bottom-40 right-10 lg:right-20 hidden md:block">
        <div className="glass rounded-xl p-4 animate-float" style={{ animationDelay: "1s" }}>
          <Code2 className="w-6 h-6 text-accent-light" />
          <div className="mt-2 text-xs font-mono text-accent-light">
            function grow() {"{"}...
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
            <Sparkles className="w-4 h-4 text-primary-400" />
            <span className="text-sm text-slate-300">Trusted by 50,000+ students worldwide</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.1]">
            Master Coding{" "}
            <span className="text-gradient">From Scratch</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Interactive lessons, real-time coding exercises, and expert guidance.
            Start your programming journey and build the future.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="group px-8 py-4 bg-white text-slate-950 font-semibold rounded-xl hover:bg-slate-200 transition-all duration-300 flex items-center gap-2"
            >
              Start Learning Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/courses"
              className="px-8 py-4 glass font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Explore Courses
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary-400" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary-400" />
              Free forever plan
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary-400" />
              Cancel anytime
            </div>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-16 relative"
        >
          <div className="relative rounded-2xl overflow-hidden border border-white/10 glow">
            <Image
              src="/images/hero-3d.jpg"
              alt="Code Learn Platform"
              width={1200}
              height={600}
              className="w-full h-auto"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Social Proof ─── */
function SocialProof() {
  const stats = [
    { value: "50K+", label: "Active Students", icon: Users },
    { value: "200+", label: "Interactive Lessons", icon: BookOpen },
    { value: "98%", label: "Satisfaction Rate", icon: Star },
    { value: "4.9", label: "Average Rating", icon: Award },
  ];

  return (
    <Section className="py-20 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <stat.icon className="w-6 h-6 text-primary-400 mx-auto mb-3" />
              <div className="text-3xl lg:text-4xl font-bold text-white">{stat.value}</div>
              <div className="mt-1 text-sm text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── Features ─── */
function Features() {
  const features = [
    {
      icon: Terminal,
      title: "Interactive Code Editor",
      description: "Write, run, and debug code directly in your browser with our powerful Monaco-powered editor.",
    },
    {
      icon: Zap,
      title: "Real-Time Feedback",
      description: "Get instant feedback on your code with intelligent hints and error detection as you type.",
    },
    {
      icon: Layers,
      title: "Structured Learning Paths",
      description: "Follow curated learning paths from beginner to advanced, designed by industry experts.",
    },
    {
      icon: Globe,
      title: "Learn Anywhere",
      description: "Access your courses on any device. Your progress syncs automatically across all platforms.",
    },
    {
      icon: Cpu,
      title: "AI-Powered Assistance",
      description: "Get personalized help from our AI tutor that adapts to your learning style and pace.",
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Visualize your growth with detailed analytics, streaks, and achievement badges.",
    },
  ];

  return (
    <Section id="features" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary-400 text-sm font-semibold uppercase tracking-wider">Features</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Everything You Need to{" "}
            <span className="text-gradient">Become a Developer</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            A complete learning ecosystem designed to take you from zero to hero in programming.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group p-6 rounded-2xl glass hover:bg-white/10 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── Product Showcase ─── */
function ProductShowcase() {
  return (
    <Section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-accent-light text-sm font-semibold uppercase tracking-wider">Product</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Code, Run, and Learn{" "}
              <span className="text-gradient">All in One Place</span>
            </h2>
            <p className="mt-4 text-lg text-slate-400 leading-relaxed">
              Our integrated development environment lets you practice coding without any setup.
              Write code, see results instantly, and learn from your mistakes in real-time.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Browser-based code editor with syntax highlighting",
                "Instant code execution and output display",
                "Step-by-step guided exercises with hints",
                "Error detection and helpful suggestions",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-primary-400" />
                  </div>
                  <span className="text-slate-300">{item}</span>
                </div>
              ))}
            </div>

            <Link
              href="/courses"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
            >
              Try It Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden border border-white/10 glow">
              <Image
                src="/images/showcase.jpg"
                alt="Code Editor Interface"
                width={600}
                height={500}
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 glass rounded-xl p-4 hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Code Compiled</div>
                  <div className="text-xs text-slate-400">0 errors, 0 warnings</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

/* ─── Courses Preview ─── */
function CoursesPreview() {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/courses")
      .then((r) => r.json())
      .then((data) => setCourses(data.courses || []))
      .catch(() => setCourses([]));
  }, []);

  const courseList = courses.length > 0 ? courses : [
    { id: 1, title: "Python Fundamentals", description: "Master Python from scratch with hands-on exercises.", image: "/images/course-python.jpg", level: "Beginner", duration: "8 weeks", lessonsCount: 24, category: "Programming" },
    { id: 2, title: "JavaScript Mastery", description: "Deep dive into modern JavaScript and ES6+ features.", image: "/images/course-javascript.jpg", level: "Intermediate", duration: "10 weeks", lessonsCount: 32, category: "Web Development" },
    { id: 3, title: "React & Next.js", description: "Build modern web apps with React and Next.js.", image: "/images/course-react.jpg", level: "Advanced", duration: "12 weeks", lessonsCount: 40, category: "Frontend" },
    { id: 4, title: "Full-Stack Web Dev", description: "Complete journey from HTML to deployment.", image: "/images/course-web.jpg", level: "Beginner", duration: "16 weeks", lessonsCount: 48, category: "Full Stack" },
  ];

  return (
    <Section id="courses" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary-400 text-sm font-semibold uppercase tracking-wider">Courses</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Start Learning{" "}
            <span className="text-gradient">Today</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Choose from our curated collection of courses designed for every skill level.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courseList.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group rounded-2xl glass overflow-hidden hover:bg-white/10 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 text-xs font-medium bg-primary-500/80 text-white rounded-full backdrop-blur-sm">
                    {course.level}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="text-xs text-slate-400 mb-2">{course.category}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{course.title}</h3>
                <p className="text-sm text-slate-400 mb-4 line-clamp-2">{course.description}</p>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    {course.lessonsCount} lessons
                  </div>
                </div>
                <Link
                  href={`/courses/${course.id}`}
                  className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-white/5 hover:bg-primary-600 text-sm font-medium text-slate-300 hover:text-white transition-all"
                >
                  Start Learning
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-6 py-3 glass rounded-xl hover:bg-white/10 transition-colors text-slate-300 hover:text-white"
          >
            View All Courses
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </Section>
  );
}

/* ─── Benefits ─── */
function Benefits() {
  const benefits = [
    {
      icon: Laptop,
      title: "Learn by Doing",
      description: "Our hands-on approach ensures you write real code from day one, not just watch videos.",
    },
    {
      icon: Shield,
      title: "Industry-Recognized",
      description: "Earn certificates that employers trust. Our curriculum is aligned with industry standards.",
    },
    {
      icon: MessageCircle,
      title: "Community Support",
      description: "Join a vibrant community of learners. Get help, share projects, and grow together.",
    },
  ];

  return (
    <Section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="rounded-2xl overflow-hidden border border-white/10">
              <Image
                src="/images/cta-bg.jpg"
                alt="Learning Benefits"
                width={600}
                height={500}
                className="w-full h-auto"
              />
            </div>
          </motion.div>

          <div className="order-1 lg:order-2">
            <span className="text-accent-light text-sm font-semibold uppercase tracking-wider">Why Choose Us</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Learning That{" "}
              <span className="text-gradient">Actually Works</span>
            </h2>
            <p className="mt-4 text-lg text-slate-400 leading-relaxed">
              We believe the best way to learn coding is by writing code. Our platform is built around
              this principle, giving you the tools and environment to practice effectively.
            </p>

            <div className="mt-10 space-y-6">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                  viewport={{ once: true }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-accent-light" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{benefit.title}</h3>
                    <p className="mt-1 text-slate-400 text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ─── Testimonials ─── */
function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer at Google",
      content: "Code Learn transformed my career. I went from zero coding knowledge to landing my dream job in just 8 months. The interactive exercises made all the difference.",
      rating: 5,
    },
    {
      name: "Marcus Johnson",
      role: "Full-Stack Developer",
      content: "The best coding platform I've ever used. The real-time feedback and AI tutor helped me understand concepts I struggled with for years. Highly recommended!",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Computer Science Student",
      content: "I use Code Learn to supplement my university courses. The practical exercises and project-based learning approach is far more effective than traditional lectures.",
      rating: 5,
    },
  ];

  return (
    <Section id="testimonials" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary-400 text-sm font-semibold uppercase tracking-wider">Testimonials</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Loved by{" "}
            <span className="text-gradient">Students Worldwide</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl glass hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-slate-300 leading-relaxed mb-6">&ldquo;{testimonial.content}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary-500 to-accent flex items-center justify-center text-sm font-bold text-white">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{testimonial.name}</div>
                  <div className="text-xs text-slate-400">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── Pricing ─── */
function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "Access to beginner courses",
        "Basic code editor",
        "Community forums",
        "Email support",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$19",
      period: "/month",
      description: "Best for serious learners",
      features: [
        "All courses unlocked",
        "Advanced code editor",
        "AI-powered tutor",
        "Priority support",
        "Certificates of completion",
        "Downloadable resources",
      ],
      cta: "Start Pro Trial",
      popular: true,
    },
    {
      name: "Team",
      price: "$49",
      period: "/user/month",
      description: "For organizations",
      features: [
        "Everything in Pro",
        "Team management",
        "Progress analytics",
        "Custom learning paths",
        "SSO integration",
        "Dedicated account manager",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <Section id="pricing" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary-400 text-sm font-semibold uppercase tracking-wider">Pricing</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Simple, Transparent{" "}
            <span className="text-gradient">Pricing</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Start for free, upgrade when you are ready. No hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className={`relative rounded-2xl p-6 lg:p-8 ${
                plan.popular
                  ? "bg-linear-to-b from-primary-600/20 to-accent/10 border-2 border-primary-500/50"
                  : "glass"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary-500 text-white text-xs font-semibold rounded-full">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                <div className="mt-2 flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-slate-400">{plan.period}</span>
                </div>
                <p className="mt-2 text-sm text-slate-400">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-primary-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/register"
                className={`block w-full py-3 text-center font-semibold rounded-xl transition-all duration-300 ${
                  plan.popular
                    ? "bg-white text-slate-950 hover:bg-slate-200"
                    : "glass hover:bg-white/10 text-white"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── FAQ ─── */
function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Do I need any prior coding experience?",
      answer: "Not at all! Our beginner courses are designed for absolute beginners. We start from the very basics and gradually build up to advanced concepts.",
    },
    {
      question: "Can I learn at my own pace?",
      answer: "Absolutely. All our courses are self-paced. You can pause, rewind, and revisit lessons whenever you want. Your progress is saved automatically.",
    },
    {
      question: "What programming languages do you teach?",
      answer: "We offer courses in Python, JavaScript, React, Next.js, HTML/CSS, Node.js, and more. We are constantly adding new languages and frameworks based on industry demand.",
    },
    {
      question: "Do you offer certificates?",
      answer: "Yes! Pro and Team plan users receive verified certificates upon course completion. These certificates can be shared on LinkedIn and added to your resume.",
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time with no questions asked. You will continue to have access until the end of your billing period.",
    },
    {
      question: "Is there a mobile app?",
      answer: "Our platform is fully responsive and works great on mobile browsers. We are also working on native iOS and Android apps coming soon.",
    },
  ];

  return (
    <Section id="faq" className="py-24 lg:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary-400 text-sm font-semibold uppercase tracking-wider">FAQ</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Frequently Asked{" "}
            <span className="text-gradient">Questions</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="rounded-xl glass overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-semibold text-white pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <motion.div
                initial={false}
                animate={{ height: openIndex === i ? "auto" : 0, opacity: openIndex === i ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="px-5 pb-5 text-slate-400 leading-relaxed">{faq.answer}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── CTA ─── */
function CTA() {
  return (
    <Section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0">
            <Image
              src="/images/cta-bg.jpg"
              alt="CTA Background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-slate-950/70" />
          </div>

          <div className="relative py-16 lg:py-24 px-8 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Ready to Start Your{" "}
              <span className="text-gradient">Coding Journey?</span>
            </h2>
            <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
              Join thousands of students already learning to code. Start for free today
              and unlock your potential.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="px-8 py-4 bg-white text-slate-950 font-semibold rounded-xl hover:bg-slate-200 transition-colors"
              >
                Get Started Free
              </Link>
              <Link
                href="/courses"
                className="px-8 py-4 glass font-semibold rounded-xl hover:bg-white/10 transition-colors"
              >
                Browse Courses
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

/* ─── Footer ─── */
function Footer() {
  const links = {
    Product: ["Features", "Courses", "Pricing", "Changelog"],
    Resources: ["Documentation", "Blog", "Community", "Help Center"],
    Company: ["About", "Careers", "Press", "Contact"],
    Legal: ["Privacy", "Terms", "Cookie Policy"],
  };

  return (
    <footer className="border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-linear-to-br from-primary-500 to-accent flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Code<span className="text-primary-400">Learn</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
              Empowering the next generation of developers with interactive, hands-on coding education.
            </p>
          </div>

          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-white mb-4">{category}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <Link
                      href={item === "Features" ? "/#features" : item === "Courses" ? "/courses" : item === "Pricing" ? "/#pricing" : item === "About" ? "/about" : "/"}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="h-px bg-white/5 mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Code Learn. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {["Twitter", "GitHub", "Discord", "YouTube"].map((social) => (
              <Link
                key={social}
                href="/"
                className="text-sm text-slate-500 hover:text-white transition-colors"
              >
                {social}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main Page ─── */
export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <SocialProof />
      <Features />
      <ProductShowcase />
      <CoursesPreview />
      <Benefits />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
