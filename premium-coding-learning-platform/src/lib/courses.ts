export type Course = {
  slug: string;
  title: string;
  eyebrow: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  lessons: number;
  accent: string;
  description: string;
  outcomes: string[];
  stack: string[];
  challenge: {
    title: string;
    prompt: string;
    starterCode: string;
    checks: string[];
    successMessage: string;
  };
};

export const courses: Course[] = [
  {
    slug: "html-css-starter",
    title: "Web Foundations Sprint",
    eyebrow: "HTML + CSS",
    level: "Beginner",
    duration: "2 weeks",
    lessons: 18,
    accent: "from-sky-400 via-cyan-300 to-emerald-300",
    description:
      "Learn how the web works, build beautiful responsive pages, and ship your first polished portfolio section.",
    outcomes: [
      "Structure semantic pages with accessible HTML",
      "Design responsive layouts with modern CSS",
      "Create animated cards, navbars, and landing sections",
    ],
    stack: ["HTML", "CSS", "Flexbox", "Grid", "A11y"],
    challenge: {
      title: "Build a glowing student card",
      prompt:
        "Create a card element with a heading, paragraph, and button. Make sure your code includes a class named student-card.",
      starterCode:
        '<section class="student-card">\n  <h2>Hello coder</h2>\n  <p>I am learning to build for the web.</p>\n  <button>Start lesson</button>\n</section>',
      checks: ["student-card", "<h2", "<button"],
      successMessage: "Beautiful! You created a semantic, reusable card component.",
    },
  },
  {
    slug: "javascript-lab",
    title: "JavaScript Logic Lab",
    eyebrow: "JavaScript",
    level: "Beginner",
    duration: "4 weeks",
    lessons: 32,
    accent: "from-amber-300 via-orange-300 to-pink-400",
    description:
      "Turn ideas into interactive interfaces with variables, functions, events, arrays, and project-based practice.",
    outcomes: [
      "Write clean functions and debug with confidence",
      "React to clicks, inputs, and real user events",
      "Build quizzes, calculators, and mini games",
    ],
    stack: ["Variables", "Functions", "DOM", "Events", "Debugging"],
    challenge: {
      title: "Write a points calculator",
      prompt:
        "Create a function named calculatePoints that returns level * 100. Run the test to prove your function works.",
      starterCode:
        "function calculatePoints(level) {\n  return level * 100;\n}\n\ncalculatePoints(3);",
      checks: ["function calculatePoints", "return", "* 100"],
      successMessage: "Logic unlocked! Your calculator passes the Code learn test runner.",
    },
  },
  {
    slug: "react-product-builder",
    title: "React Product Builder",
    eyebrow: "React + UI",
    level: "Intermediate",
    duration: "6 weeks",
    lessons: 44,
    accent: "from-violet-400 via-fuchsia-400 to-rose-300",
    description:
      "Build modern app interfaces with components, state, props, forms, and production-ready UI patterns.",
    outcomes: [
      "Break interfaces into reusable components",
      "Manage state for dashboards and learning flows",
      "Ship a polished capstone product experience",
    ],
    stack: ["React", "Components", "State", "Forms", "UI Systems"],
    challenge: {
      title: "Create a React progress badge",
      prompt:
        "Write a component named ProgressBadge that accepts a percent prop and renders encouraging progress text.",
      starterCode:
        "function ProgressBadge({ percent }) {\n  return <p>{percent}% complete — keep going!</p>;\n}\n\n<ProgressBadge percent={72} />;",
      checks: ["function ProgressBadge", "percent", "complete"],
      successMessage: "Component thinking activated! Your React badge is ready for a dashboard.",
    },
  },
  {
    slug: "python-ai-starter",
    title: "Python + AI Starter",
    eyebrow: "Python",
    level: "Beginner",
    duration: "5 weeks",
    lessons: 36,
    accent: "from-emerald-300 via-teal-300 to-blue-400",
    description:
      "Learn beginner-friendly Python while exploring data, automation, and AI-powered problem solving.",
    outcomes: [
      "Use Python syntax, loops, lists, and dictionaries",
      "Automate repetitive student workflows",
      "Prepare for AI and data projects with confidence",
    ],
    stack: ["Python", "Loops", "Data", "Automation", "AI Basics"],
    challenge: {
      title: "Make a study streak helper",
      prompt:
        "Write a function named streak_message that returns a motivational message using the streak number.",
      starterCode:
        "def streak_message(days):\n    return f\"You coded for {days} days. Keep going!\"\n\nstreak_message(7)",
      checks: ["def streak_message", "return", "days"],
      successMessage: "Python power! Your streak helper is motivating and reusable.",
    },
  },
];

export function getCourse(slug: string) {
  return courses.find((course) => course.slug === slug);
}

export const stats = [
  { label: "student projects shipped", value: "18k+" },
  { label: "guided coding drills", value: "420+" },
  { label: "average weekly streak", value: "4.8 days" },
  { label: "mentor-style hints", value: "24/7" },
];
