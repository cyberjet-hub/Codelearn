import { NextResponse } from "next/server";
import { db } from "@/db";
import { courses, lessons } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const allCourses = await db.select().from(courses).orderBy(courses.id);
    return NextResponse.json({ courses: allCourses });
  } catch (error) {
    console.error("Courses error:", error);
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}

export async function POST() {
  try {
    const existing = await db.select().from(courses).limit(1);
    if (existing.length > 0) {
      return NextResponse.json({ message: "Courses already seeded" });
    }

    const courseData = [
      {
        title: "Python Fundamentals",
        description: "Master Python from scratch. Learn variables, functions, loops, and build real projects with hands-on coding exercises.",
        image: "/images/course-python.jpg",
        level: "Beginner",
        category: "Programming",
        duration: "8 weeks",
        lessonsCount: 24,
      },
      {
        title: "JavaScript Mastery",
        description: "Become a JavaScript expert. Deep dive into ES6+, async programming, DOM manipulation, and modern patterns.",
        image: "/images/course-javascript.jpg",
        level: "Intermediate",
        category: "Web Development",
        duration: "10 weeks",
        lessonsCount: 32,
      },
      {
        title: "React & Next.js",
        description: "Build modern web applications with React and Next.js. Components, hooks, routing, SSR, and deployment.",
        image: "/images/course-react.jpg",
        level: "Advanced",
        category: "Frontend",
        duration: "12 weeks",
        lessonsCount: 40,
      },
      {
        title: "Full-Stack Web Dev",
        description: "Complete full-stack journey. HTML, CSS, JavaScript, Node.js, databases, and deploying production apps.",
        image: "/images/course-web.jpg",
        level: "Beginner",
        category: "Full Stack",
        duration: "16 weeks",
        lessonsCount: 48,
      },
    ];

    const insertedCourses = await db.insert(courses).values(courseData).returning();

    const lessonData = [
      // Python lessons
      { courseId: insertedCourses[0].id, title: "Introduction to Python", content: "Python is a versatile, high-level programming language known for its readability. In this lesson, you'll write your first Python program.", code: "# Write your first Python program\nprint('Hello, World!')\n\n# Try printing your name\nprint('My name is Code Learner')", expectedOutput: "Hello, World!\nMy name is Code Learner", language: "python", order: 1 },
      { courseId: insertedCourses[0].id, title: "Variables and Data Types", content: "Learn about Python's basic data types: strings, integers, floats, and booleans.", code: "# Variables in Python\nname = 'Alice'\nage = 25\nheight = 5.6\nis_student = True\n\nprint(f'Name: {name}')\nprint(f'Age: {age}')\nprint(f'Height: {height}')\nprint(f'Student: {is_student}')", expectedOutput: "Name: Alice\nAge: 25\nHeight: 5.6\nStudent: True", language: "python", order: 2 },
      { courseId: insertedCourses[0].id, title: "Control Flow", content: "Master if statements, loops, and conditional logic in Python.", code: "# For loop example\nfor i in range(5):\n    print(f'Number: {i}')\n\n# If statement\nscore = 85\nif score >= 90:\n    print('Grade A')\nelif score >= 80:\n    print('Grade B')\nelse:\n    print('Grade C')", expectedOutput: "Number: 0\nNumber: 1\nNumber: 2\nNumber: 3\nNumber: 4\nGrade B", language: "python", order: 3 },
      // JavaScript lessons
      { courseId: insertedCourses[1].id, title: "JavaScript Basics", content: "JavaScript is the language of the web. Learn syntax, variables, and basic operations.", code: "// JavaScript basics\nconst greeting = 'Hello, JavaScript!';\nconsole.log(greeting);\n\n// Variables\nlet count = 10;\nconst PI = 3.14;\nconsole.log('Count:', count);\nconsole.log('PI:', PI);", expectedOutput: "Hello, JavaScript!\nCount: 10\nPI: 3.14", language: "javascript", order: 1 },
      { courseId: insertedCourses[1].id, title: "Functions and Scope", content: "Understand function declarations, arrow functions, and scope in JavaScript.", code: "// Function declaration\nfunction greet(name) {\n    return 'Hello, ' + name + '!';\n}\n\n// Arrow function\nconst multiply = (a, b) => a * b;\n\nconsole.log(greet('Developer'));\nconsole.log('5 * 3 =', multiply(5, 3));", expectedOutput: "Hello, Developer!\n5 * 3 = 15", language: "javascript", order: 2 },
      { courseId: insertedCourses[1].id, title: "Arrays and Objects", content: "Work with JavaScript's powerful data structures: arrays and objects.", code: "// Arrays\nconst fruits = ['apple', 'banana', 'cherry'];\nfruits.forEach(fruit => console.log(fruit));\n\n// Objects\nconst user = {\n    name: 'John',\n    age: 30,\n    city: 'New York'\n};\nconsole.log(user.name + ' lives in ' + user.city);", expectedOutput: "apple\nbanana\ncherry\nJohn lives in New York", language: "javascript", order: 3 },
      // React lessons
      { courseId: insertedCourses[2].id, title: "React Components", content: "Learn the building blocks of React: components, JSX, and props.", code: "// React Component (simulated)\nfunction Welcome(props) {\n    return 'Welcome, ' + props.name + '!';\n}\n\nconsole.log(Welcome({ name: 'React Developer' }));\nconsole.log(Welcome({ name: 'Code Learner' }));", expectedOutput: "Welcome, React Developer!\nWelcome, Code Learner!", language: "javascript", order: 1 },
      { courseId: insertedCourses[2].id, title: "State and Hooks", content: "Master useState and useEffect hooks for dynamic UIs.", code: "// Simulating React state\nlet count = 0;\n\nfunction increment() {\n    count += 1;\n    return 'Count: ' + count;\n}\n\nconsole.log(increment());\nconsole.log(increment());\nconsole.log(increment());", expectedOutput: "Count: 1\nCount: 2\nCount: 3", language: "javascript", order: 2 },
      { courseId: insertedCourses[2].id, title: "Event Handling", content: "Handle user interactions with React event system.", code: "// Event handling simulation\nfunction handleClick(buttonName) {\n    return 'Clicked: ' + buttonName;\n}\n\nconsole.log(handleClick('Submit'));\nconsole.log(handleClick('Cancel'));", expectedOutput: "Clicked: Submit\nClicked: Cancel", language: "javascript", order: 3 },
      // Web Dev lessons
      { courseId: insertedCourses[3].id, title: "HTML Structure", content: "Build the foundation of web pages with semantic HTML.", code: "// Simulated HTML structure\nconst html = `<h1>Welcome to My Site</h1>\n<p>This is a paragraph.</p>\n<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>`;\nconsole.log(html);", expectedOutput: "<h1>Welcome to My Site</h1>\n<p>This is a paragraph.</p>\n<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>", language: "javascript", order: 1 },
      { courseId: insertedCourses[3].id, title: "CSS Styling", content: "Style your web pages with modern CSS techniques.", code: "// CSS simulation\nconst styles = {\n    color: 'blue',\n    fontSize: '16px',\n    background: '#f0f0f0'\n};\n\nconsole.log('Color:', styles.color);\nconsole.log('Font Size:', styles.fontSize);\nconsole.log('Background:', styles.background);", expectedOutput: "Color: blue\nFont Size: 16px\nBackground: #f0f0f0", language: "javascript", order: 2 },
      { courseId: insertedCourses[3].id, title: "Node.js Basics", content: "Introduction to server-side JavaScript with Node.js.", code: "// Node.js simulation\nfunction createServer(port) {\n    return 'Server running on port ' + port;\n}\n\nconsole.log(createServer(3000));\nconsole.log('API endpoint: /api/users');\nconsole.log('API endpoint: /api/posts');", expectedOutput: "Server running on port 3000\nAPI endpoint: /api/users\nAPI endpoint: /api/posts", language: "javascript", order: 3 },
    ];

    await db.insert(lessons).values(lessonData);

    return NextResponse.json({ message: "Courses seeded successfully", courses: insertedCourses });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Failed to seed courses" }, { status: 500 });
  }
}
