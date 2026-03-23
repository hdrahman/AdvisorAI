# AdvisorAI MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a functional AdvisorAI web app MVP with 5 screens, mock data, and navigation matching the Figma design.

**Architecture:** Vite-powered React SPA with TypeScript, Tailwind CSS dark theme, client-side routing via React Router, and JSON-based mock data for a single student.

**Tech Stack:** Vite, React 18, TypeScript, React Router v6, Tailwind CSS

---

## File Structure Map

### Configuration & Setup
- `package.json` - Dependencies and scripts
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind theme (dark mode colors)
- `postcss.config.js` - PostCSS for Tailwind
- `.gitignore` - Exclude node_modules, dist, etc.

### Source Files
- `index.html` - HTML entry point
- `src/main.tsx` - React entry point
- `src/App.tsx` - Root component with routing
- `src/index.css` - Tailwind imports and global styles

### Types
- `src/types/index.ts` - All TypeScript interfaces (UserData, Course, Semester, etc.)

### Mock Data
- `src/data/mockUser.json` - Single student's complete data (profile, roadmap, chat history)
- `src/data/mockCourses.json` - Course catalog for browsing

### Layout Components
- `src/components/layout/AppLayout.tsx` - Main layout wrapper with sidebar
- `src/components/layout/Sidebar.tsx` - Persistent navigation sidebar
- `src/components/layout/DashboardCard.tsx` - Quick access card component

### Common Components
- `src/components/common/Button.tsx` - Reusable button
- `src/components/common/Card.tsx` - Reusable card container
- `src/components/common/Badge.tsx` - Badge for course types/status

### Chat Components
- `src/components/chat/ChatMessage.tsx` - Individual message bubble
- `src/components/chat/ChatInput.tsx` - Non-functional input UI

### Roadmap Components
- `src/components/roadmap/SemesterBlock.tsx` - Semester container
- `src/components/roadmap/CourseCard.tsx` - Course card in roadmap

### Course Browser Components
- `src/components/courses/CourseList.tsx` - Course list display
- `src/components/courses/CourseFilter.tsx` - Filter/search UI

### Pages
- `src/pages/Dashboard.tsx` - Welcome screen with stats and quick nav
- `src/pages/Chat.tsx` - AI advisor chat interface
- `src/pages/Roadmap.tsx` - Academic roadmap timeline
- `src/pages/Courses.tsx` - Course browser
- `src/pages/Profile.tsx` - User profile and settings

---

## Task 1: Project Initialization

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `.gitignore`

- [ ] **Step 1: Initialize Vite project**

Run: `npm create vite@latest . -- --template react-ts`
Expected: Vite scaffolds React TypeScript project in current directory
Note: Answer "yes" to proceed in non-empty directory if prompted

- [ ] **Step 2: Install dependencies**

```bash
npm install
```

Expected: Dependencies installed successfully

- [ ] **Step 3: Install Tailwind CSS and React Router**

```bash
npm install -D tailwindcss postcss autoprefixer
npm install react-router-dom
npx tailwindcss init -p
```

Expected: Tailwind config files created, router installed

- [ ] **Step 4: Configure Tailwind for dark theme**

Update `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0f172a',      // Primary background
        'dark-panel': '#1e293b',    // Secondary panels
        'dark-border': '#334155',   // Borders
        'accent-blue': '#60a5fa',   // Accent color
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 5: Update .gitignore**

Add to `.gitignore`:

```
# Superpowers artifacts
.superpowers/

# Local settings
.claude/
```

- [ ] **Step 6: Verify dev server works**

Run: `npm run dev`
Expected: Dev server starts on localhost:5173
Action: Open browser, verify default Vite page loads, then stop server (Ctrl+C)

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: initialize vite + react + typescript + tailwind project"
```

---

## Task 2: TypeScript Interfaces

**Files:**
- Create: `src/types/index.ts`

- [ ] **Step 1: Create types file with all interfaces**

Create `src/types/index.ts`:

```typescript
export interface UserData {
  profile: User;
  roadmap: Roadmap;
  chatHistory: ChatHistory;
}

export interface User {
  id: string;
  name: string;
  email: string;
  major: string;
  minor?: string;
  year: "Freshman" | "Sophomore" | "Junior" | "Senior";
  expectedGraduation: string;
  gpa: number;
  creditsCompleted: number;
  creditsRequired: number;
  advisor: string;
}

export interface Course {
  code: string;
  name: string;
  credits: number;
  semester: string;
  grade?: string;
  status: "completed" | "in-progress" | "planned";
  type: "Core" | "Major" | "Minor" | "Elective";
  description: string;
  prerequisites?: string[];
  department?: string;
}

export interface Roadmap {
  semesters: Semester[];
}

export interface Semester {
  term: string;
  year: number;
  season: "Fall" | "Spring" | "Summer";
  courses: Course[];
  totalCredits: number;
}

export interface ChatHistory {
  messages: ChatMessage[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  content: string;
  timestamp: string;
}

export interface CourseCatalogItem {
  code: string;
  name: string;
  credits: number;
  type: "Core" | "Major" | "Minor" | "Elective";
  description: string;
  prerequisites?: string[];
  department: string;
  availableSemesters: ("Fall" | "Spring" | "Summer")[];
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/types/index.ts
git commit -m "feat: add typescript interfaces for user data and courses"
```

---

## Task 3: Mock Data Creation

**Files:**
- Create: `src/data/mockUser.json`
- Create: `src/data/mockCourses.json`

- [ ] **Step 1: Create mock user data**

Create `src/data/mockUser.json`:

```json
{
  "profile": {
    "id": "student-001",
    "name": "Shlutz Hameed",
    "email": "shlutz.hameed@university.edu",
    "major": "Computer Science",
    "minor": "Mathematics",
    "year": "Junior",
    "expectedGraduation": "May 2026",
    "gpa": 3.72,
    "creditsCompleted": 78,
    "creditsRequired": 120,
    "advisor": "Dr. Sarah Johnson"
  },
  "roadmap": {
    "semesters": [
      {
        "term": "Fall 2023",
        "year": 2023,
        "season": "Fall",
        "totalCredits": 15,
        "courses": [
          {
            "code": "CS 101",
            "name": "Introduction to Programming",
            "credits": 3,
            "semester": "Fall 2023",
            "grade": "A",
            "status": "completed",
            "type": "Major",
            "description": "Fundamentals of programming using Python",
            "department": "Computer Science"
          },
          {
            "code": "MATH 201",
            "name": "Calculus I",
            "credits": 4,
            "semester": "Fall 2023",
            "grade": "A-",
            "status": "completed",
            "type": "Core",
            "description": "Limits, derivatives, and applications",
            "department": "Mathematics"
          },
          {
            "code": "ENG 102",
            "name": "English Composition",
            "credits": 3,
            "semester": "Fall 2023",
            "grade": "B+",
            "status": "completed",
            "type": "Core",
            "description": "Academic writing and critical thinking",
            "department": "English"
          },
          {
            "code": "HIST 101",
            "name": "World History",
            "credits": 3,
            "semester": "Fall 2023",
            "grade": "A",
            "status": "completed",
            "type": "Elective",
            "description": "Survey of global historical developments",
            "department": "History"
          },
          {
            "code": "PE 101",
            "name": "Physical Education",
            "credits": 2,
            "semester": "Fall 2023",
            "grade": "A",
            "status": "completed",
            "type": "Core",
            "description": "Introduction to fitness and wellness",
            "department": "Physical Education"
          }
        ]
      },
      {
        "term": "Spring 2024",
        "year": 2024,
        "season": "Spring",
        "totalCredits": 16,
        "courses": [
          {
            "code": "CS 201",
            "name": "Data Structures",
            "credits": 3,
            "semester": "Spring 2024",
            "grade": "A",
            "status": "completed",
            "type": "Major",
            "description": "Arrays, linked lists, trees, and graphs",
            "prerequisites": ["CS 101"],
            "department": "Computer Science"
          },
          {
            "code": "CS 202",
            "name": "Computer Architecture",
            "credits": 3,
            "semester": "Spring 2024",
            "grade": "B+",
            "status": "completed",
            "type": "Major",
            "description": "Hardware and low-level programming",
            "prerequisites": ["CS 101"],
            "department": "Computer Science"
          },
          {
            "code": "MATH 202",
            "name": "Calculus II",
            "credits": 4,
            "semester": "Spring 2024",
            "grade": "A-",
            "status": "completed",
            "type": "Minor",
            "description": "Integration and series",
            "prerequisites": ["MATH 201"],
            "department": "Mathematics"
          },
          {
            "code": "PHYS 101",
            "name": "Physics I",
            "credits": 3,
            "semester": "Spring 2024",
            "grade": "B+",
            "status": "completed",
            "type": "Core",
            "description": "Mechanics and thermodynamics",
            "department": "Physics"
          },
          {
            "code": "PSY 101",
            "name": "Introduction to Psychology",
            "credits": 3,
            "semester": "Spring 2024",
            "grade": "A",
            "status": "completed",
            "type": "Elective",
            "description": "Overview of psychological principles",
            "department": "Psychology"
          }
        ]
      },
      {
        "term": "Fall 2024",
        "year": 2024,
        "season": "Fall",
        "totalCredits": 15,
        "courses": [
          {
            "code": "CS 301",
            "name": "Algorithms",
            "credits": 3,
            "semester": "Fall 2024",
            "grade": "A",
            "status": "completed",
            "type": "Major",
            "description": "Algorithm design and analysis",
            "prerequisites": ["CS 201"],
            "department": "Computer Science"
          },
          {
            "code": "CS 310",
            "name": "Database Systems",
            "credits": 3,
            "semester": "Fall 2024",
            "grade": "A-",
            "status": "completed",
            "type": "Major",
            "description": "SQL, normalization, and transaction processing",
            "prerequisites": ["CS 201"],
            "department": "Computer Science"
          },
          {
            "code": "MATH 301",
            "name": "Linear Algebra",
            "credits": 3,
            "semester": "Fall 2024",
            "grade": "B+",
            "status": "completed",
            "type": "Minor",
            "description": "Vectors, matrices, and eigenvalues",
            "prerequisites": ["MATH 202"],
            "department": "Mathematics"
          },
          {
            "code": "CS 280",
            "name": "Web Development",
            "credits": 3,
            "semester": "Fall 2024",
            "grade": "A",
            "status": "completed",
            "type": "Major",
            "description": "HTML, CSS, JavaScript, and modern frameworks",
            "prerequisites": ["CS 101"],
            "department": "Computer Science"
          },
          {
            "code": "PHIL 201",
            "name": "Ethics",
            "credits": 3,
            "semester": "Fall 2024",
            "grade": "A",
            "status": "completed",
            "type": "Elective",
            "description": "Moral philosophy and ethical reasoning",
            "department": "Philosophy"
          }
        ]
      },
      {
        "term": "Spring 2025",
        "year": 2025,
        "season": "Spring",
        "totalCredits": 16,
        "courses": [
          {
            "code": "CS 350",
            "name": "Operating Systems",
            "credits": 3,
            "semester": "Spring 2025",
            "status": "in-progress",
            "type": "Major",
            "description": "Process management, memory, and file systems",
            "prerequisites": ["CS 202", "CS 201"],
            "department": "Computer Science"
          },
          {
            "code": "CS 370",
            "name": "Machine Learning",
            "credits": 3,
            "semester": "Spring 2025",
            "status": "in-progress",
            "type": "Major",
            "description": "Supervised and unsupervised learning algorithms",
            "prerequisites": ["CS 301", "MATH 301"],
            "department": "Computer Science"
          },
          {
            "code": "CS 340",
            "name": "Software Engineering",
            "credits": 3,
            "semester": "Spring 2025",
            "status": "in-progress",
            "type": "Major",
            "description": "Agile development, testing, and design patterns",
            "prerequisites": ["CS 201"],
            "department": "Computer Science"
          },
          {
            "code": "MATH 310",
            "name": "Probability and Statistics",
            "credits": 4,
            "semester": "Spring 2025",
            "status": "in-progress",
            "type": "Minor",
            "description": "Statistical inference and probability theory",
            "prerequisites": ["MATH 202"],
            "department": "Mathematics"
          },
          {
            "code": "ART 101",
            "name": "Introduction to Art",
            "credits": 3,
            "semester": "Spring 2025",
            "status": "in-progress",
            "type": "Elective",
            "description": "Survey of visual arts and media",
            "department": "Art"
          }
        ]
      },
      {
        "term": "Fall 2025",
        "year": 2025,
        "season": "Fall",
        "totalCredits": 15,
        "courses": [
          {
            "code": "CS 420",
            "name": "Computer Networks",
            "credits": 3,
            "semester": "Fall 2025",
            "status": "planned",
            "type": "Major",
            "description": "TCP/IP, routing, and network security",
            "prerequisites": ["CS 202"],
            "department": "Computer Science"
          },
          {
            "code": "CS 450",
            "name": "Artificial Intelligence",
            "credits": 3,
            "semester": "Fall 2025",
            "status": "planned",
            "type": "Major",
            "description": "Search, logic, and intelligent agents",
            "prerequisites": ["CS 301"],
            "department": "Computer Science"
          },
          {
            "code": "CS 490",
            "name": "Senior Project I",
            "credits": 3,
            "semester": "Fall 2025",
            "status": "planned",
            "type": "Major",
            "description": "Capstone project design and planning",
            "prerequisites": ["CS 340"],
            "department": "Computer Science"
          },
          {
            "code": "MATH 410",
            "name": "Numerical Analysis",
            "credits": 3,
            "semester": "Fall 2025",
            "status": "planned",
            "type": "Minor",
            "description": "Computational methods for solving equations",
            "prerequisites": ["MATH 301"],
            "department": "Mathematics"
          },
          {
            "code": "MUS 101",
            "name": "Music Appreciation",
            "credits": 3,
            "semester": "Fall 2025",
            "status": "planned",
            "type": "Elective",
            "description": "Introduction to music theory and history",
            "department": "Music"
          }
        ]
      },
      {
        "term": "Spring 2026",
        "year": 2026,
        "season": "Spring",
        "totalCredits": 14,
        "courses": [
          {
            "code": "CS 491",
            "name": "Senior Project II",
            "credits": 3,
            "semester": "Spring 2026",
            "status": "planned",
            "type": "Major",
            "description": "Capstone project implementation and presentation",
            "prerequisites": ["CS 490"],
            "department": "Computer Science"
          },
          {
            "code": "CS 460",
            "name": "Cybersecurity",
            "credits": 3,
            "semester": "Spring 2026",
            "status": "planned",
            "type": "Major",
            "description": "Cryptography and security principles",
            "prerequisites": ["CS 420"],
            "department": "Computer Science"
          },
          {
            "code": "CS 475",
            "name": "Cloud Computing",
            "credits": 3,
            "semester": "Spring 2026",
            "status": "planned",
            "type": "Major",
            "description": "AWS, Azure, and distributed systems",
            "prerequisites": ["CS 350"],
            "department": "Computer Science"
          },
          {
            "code": "BUS 301",
            "name": "Entrepreneurship",
            "credits": 3,
            "semester": "Spring 2026",
            "status": "planned",
            "type": "Elective",
            "description": "Starting and managing a business",
            "department": "Business"
          },
          {
            "code": "SOC 201",
            "name": "Sociology",
            "credits": 2,
            "semester": "Spring 2026",
            "status": "planned",
            "type": "Elective",
            "description": "Social structures and behavior",
            "department": "Sociology"
          }
        ]
      }
    ]
  },
  "chatHistory": {
    "messages": [
      {
        "id": "msg-1",
        "sender": "user",
        "content": "Hi! I'm trying to figure out my course schedule for Fall 2025. Can you help?",
        "timestamp": "2025-03-15T10:30:00Z"
      },
      {
        "id": "msg-2",
        "sender": "ai",
        "content": "Of course! I'd be happy to help you plan your Fall 2025 schedule. You're currently enrolled in Spring 2025 and have 78 credits completed. You need 42 more credits to graduate in Spring 2026 as planned. What are your main priorities for Fall semester?",
        "timestamp": "2025-03-15T10:30:15Z"
      },
      {
        "id": "msg-3",
        "sender": "user",
        "content": "I want to make sure I'm taking the right prerequisites for my senior project. Also, is it too much to take AI and Networks in the same semester?",
        "timestamp": "2025-03-15T10:32:00Z"
      },
      {
        "id": "msg-4",
        "sender": "ai",
        "content": "Great questions! For your senior project (CS 490), you need CS 340 Software Engineering, which you're taking this semester. You'll be all set for Fall 2025.\n\nRegarding AI and Networks together: Both are challenging courses, but manageable. CS 450 (AI) requires CS 301 (Algorithms), which you completed. CS 420 (Networks) requires CS 202, also completed. Since you have a 3.72 GPA and have handled similar loads before, you should be fine. Just make sure to balance them with less intensive electives.",
        "timestamp": "2025-03-15T10:32:45Z"
      },
      {
        "id": "msg-5",
        "sender": "user",
        "content": "That makes sense. Should I be worried about graduating on time?",
        "timestamp": "2025-03-15T10:34:00Z"
      },
      {
        "id": "msg-6",
        "sender": "ai",
        "content": "You're in great shape! You have 78 credits completed and need 42 more by Spring 2026. Your planned Fall 2025 (15 credits) and Spring 2026 (14 credits) schedules add up to 29 credits, bringing you to 107. You'll need to add 13 more credits to reach 120. \n\nI recommend adding one 3-credit course to each semester. Consider an additional elective in Fall 2025 and perhaps an independent study or internship credit in Spring 2026. Want me to suggest some options?",
        "timestamp": "2025-03-15T10:34:30Z"
      },
      {
        "id": "msg-7",
        "sender": "user",
        "content": "Yes, please! What electives would pair well with my schedule?",
        "timestamp": "2025-03-15T10:36:00Z"
      }
    ]
  }
}
```

- [ ] **Step 2: Create mock course catalog**

Create `src/data/mockCourses.json`:

```json
[
  {
    "code": "CS 101",
    "name": "Introduction to Programming",
    "credits": 3,
    "type": "Major",
    "description": "Fundamentals of programming using Python. Topics include variables, control structures, functions, and basic data structures.",
    "department": "Computer Science",
    "availableSemesters": ["Fall", "Spring"]
  },
  {
    "code": "CS 201",
    "name": "Data Structures",
    "credits": 3,
    "type": "Major",
    "description": "Study of arrays, linked lists, stacks, queues, trees, and graphs. Emphasis on algorithm efficiency and complexity analysis.",
    "prerequisites": ["CS 101"],
    "department": "Computer Science",
    "availableSemesters": ["Fall", "Spring"]
  },
  {
    "code": "CS 202",
    "name": "Computer Architecture",
    "credits": 3,
    "type": "Major",
    "description": "Hardware organization, assembly language, and low-level programming concepts.",
    "prerequisites": ["CS 101"],
    "department": "Computer Science",
    "availableSemesters": ["Spring"]
  },
  {
    "code": "CS 280",
    "name": "Web Development",
    "credits": 3,
    "type": "Major",
    "description": "Modern web development with HTML, CSS, JavaScript, React, and backend frameworks.",
    "prerequisites": ["CS 101"],
    "department": "Computer Science",
    "availableSemesters": ["Fall"]
  },
  {
    "code": "CS 301",
    "name": "Algorithms",
    "credits": 3,
    "type": "Major",
    "description": "Algorithm design techniques including divide-and-conquer, greedy algorithms, and dynamic programming.",
    "prerequisites": ["CS 201"],
    "department": "Computer Science",
    "availableSemesters": ["Fall", "Spring"]
  },
  {
    "code": "CS 310",
    "name": "Database Systems",
    "credits": 3,
    "type": "Major",
    "description": "Relational database design, SQL, normalization, and transaction management.",
    "prerequisites": ["CS 201"],
    "department": "Computer Science",
    "availableSemesters": ["Fall", "Spring"]
  },
  {
    "code": "CS 340",
    "name": "Software Engineering",
    "credits": 3,
    "type": "Major",
    "description": "Software development lifecycle, agile methodologies, testing, and design patterns.",
    "prerequisites": ["CS 201"],
    "department": "Computer Science",
    "availableSemesters": ["Spring"]
  },
  {
    "code": "CS 350",
    "name": "Operating Systems",
    "credits": 3,
    "type": "Major",
    "description": "Process management, memory allocation, file systems, and concurrency.",
    "prerequisites": ["CS 202", "CS 201"],
    "department": "Computer Science",
    "availableSemesters": ["Spring"]
  },
  {
    "code": "CS 370",
    "name": "Machine Learning",
    "credits": 3,
    "type": "Major",
    "description": "Supervised and unsupervised learning, neural networks, and model evaluation.",
    "prerequisites": ["CS 301", "MATH 301"],
    "department": "Computer Science",
    "availableSemesters": ["Spring", "Fall"]
  },
  {
    "code": "CS 420",
    "name": "Computer Networks",
    "credits": 3,
    "type": "Major",
    "description": "Network protocols, TCP/IP, routing, and network security fundamentals.",
    "prerequisites": ["CS 202"],
    "department": "Computer Science",
    "availableSemesters": ["Fall"]
  },
  {
    "code": "CS 450",
    "name": "Artificial Intelligence",
    "credits": 3,
    "type": "Major",
    "description": "Search algorithms, knowledge representation, logic, and intelligent agents.",
    "prerequisites": ["CS 301"],
    "department": "Computer Science",
    "availableSemesters": ["Fall"]
  },
  {
    "code": "CS 460",
    "name": "Cybersecurity",
    "credits": 3,
    "type": "Major",
    "description": "Cryptography, network security, and secure software development practices.",
    "prerequisites": ["CS 420"],
    "department": "Computer Science",
    "availableSemesters": ["Spring"]
  },
  {
    "code": "CS 475",
    "name": "Cloud Computing",
    "credits": 3,
    "type": "Major",
    "description": "Cloud platforms (AWS, Azure), distributed systems, and scalability.",
    "prerequisites": ["CS 350"],
    "department": "Computer Science",
    "availableSemesters": ["Spring"]
  },
  {
    "code": "CS 490",
    "name": "Senior Project I",
    "credits": 3,
    "type": "Major",
    "description": "Capstone project planning, requirements gathering, and design phase.",
    "prerequisites": ["CS 340"],
    "department": "Computer Science",
    "availableSemesters": ["Fall"]
  },
  {
    "code": "CS 491",
    "name": "Senior Project II",
    "credits": 3,
    "type": "Major",
    "description": "Capstone project implementation, testing, and final presentation.",
    "prerequisites": ["CS 490"],
    "department": "Computer Science",
    "availableSemesters": ["Spring"]
  },
  {
    "code": "MATH 201",
    "name": "Calculus I",
    "credits": 4,
    "type": "Core",
    "description": "Limits, derivatives, and applications of differentiation.",
    "department": "Mathematics",
    "availableSemesters": ["Fall", "Spring"]
  },
  {
    "code": "MATH 202",
    "name": "Calculus II",
    "credits": 4,
    "type": "Minor",
    "description": "Integration techniques, sequences, and series.",
    "prerequisites": ["MATH 201"],
    "department": "Mathematics",
    "availableSemesters": ["Fall", "Spring"]
  },
  {
    "code": "MATH 301",
    "name": "Linear Algebra",
    "credits": 3,
    "type": "Minor",
    "description": "Vector spaces, matrices, eigenvalues, and linear transformations.",
    "prerequisites": ["MATH 202"],
    "department": "Mathematics",
    "availableSemesters": ["Fall", "Spring"]
  },
  {
    "code": "MATH 310",
    "name": "Probability and Statistics",
    "credits": 4,
    "type": "Minor",
    "description": "Probability distributions, hypothesis testing, and statistical inference.",
    "prerequisites": ["MATH 202"],
    "department": "Mathematics",
    "availableSemesters": ["Spring"]
  },
  {
    "code": "MATH 410",
    "name": "Numerical Analysis",
    "credits": 3,
    "type": "Minor",
    "description": "Numerical methods for solving equations and optimization problems.",
    "prerequisites": ["MATH 301"],
    "department": "Mathematics",
    "availableSemesters": ["Fall"]
  },
  {
    "code": "ENG 102",
    "name": "English Composition",
    "credits": 3,
    "type": "Core",
    "description": "Academic writing, research, and critical thinking skills.",
    "department": "English",
    "availableSemesters": ["Fall", "Spring"]
  },
  {
    "code": "PHYS 101",
    "name": "Physics I",
    "credits": 3,
    "type": "Core",
    "description": "Mechanics, energy, and thermodynamics with lab component.",
    "department": "Physics",
    "availableSemesters": ["Fall", "Spring"]
  },
  {
    "code": "PSY 101",
    "name": "Introduction to Psychology",
    "credits": 3,
    "type": "Elective",
    "description": "Overview of psychological principles and human behavior.",
    "department": "Psychology",
    "availableSemesters": ["Fall", "Spring"]
  },
  {
    "code": "HIST 101",
    "name": "World History",
    "credits": 3,
    "type": "Elective",
    "description": "Survey of major global historical events and civilizations.",
    "department": "History",
    "availableSemesters": ["Fall", "Spring"]
  },
  {
    "code": "PHIL 201",
    "name": "Ethics",
    "credits": 3,
    "type": "Elective",
    "description": "Moral philosophy, ethical theories, and applied ethics.",
    "department": "Philosophy",
    "availableSemesters": ["Fall", "Spring"]
  },
  {
    "code": "ART 101",
    "name": "Introduction to Art",
    "credits": 3,
    "type": "Elective",
    "description": "Survey of visual arts including painting, sculpture, and media.",
    "department": "Art",
    "availableSemesters": ["Spring"]
  },
  {
    "code": "MUS 101",
    "name": "Music Appreciation",
    "credits": 3,
    "type": "Elective",
    "description": "Introduction to music theory, history, and cultural significance.",
    "department": "Music",
    "availableSemesters": ["Fall"]
  },
  {
    "code": "BUS 301",
    "name": "Entrepreneurship",
    "credits": 3,
    "type": "Elective",
    "description": "Starting and managing a business, including business planning and finance.",
    "department": "Business",
    "availableSemesters": ["Spring"]
  },
  {
    "code": "SOC 201",
    "name": "Sociology",
    "credits": 2,
    "type": "Elective",
    "description": "Study of social structures, institutions, and group behavior.",
    "department": "Sociology",
    "availableSemesters": ["Spring", "Fall"]
  },
  {
    "code": "PE 101",
    "name": "Physical Education",
    "credits": 2,
    "type": "Core",
    "description": "Introduction to fitness, wellness, and healthy lifestyle practices.",
    "department": "Physical Education",
    "availableSemesters": ["Fall", "Spring"]
  }
]
```

- [ ] **Step 3: Verify JSON is valid**

Run: `node -e "console.log(JSON.parse(require('fs').readFileSync('src/data/mockUser.json', 'utf8')).profile.name)"`
Expected: "Shlutz Hameed"

Run: `node -e "console.log(JSON.parse(require('fs').readFileSync('src/data/mockCourses.json', 'utf8')).length)"`
Expected: 30

- [ ] **Step 4: Commit**

```bash
git add src/data/
git commit -m "feat: add comprehensive mock data for student and course catalog"
```

---

## Task 4: Global Styles and Tailwind Setup

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Update index.css with Tailwind and global dark theme**

Replace `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-dark-bg text-gray-100 font-sans antialiased;
  }

  * {
    @apply box-border;
  }
}

@layer components {
  .stat-card {
    @apply bg-dark-panel border border-dark-border rounded-lg p-6 hover:border-accent-blue transition-colors;
  }

  .nav-link {
    @apply flex items-center gap-3 px-4 py-3 rounded-md text-gray-300 hover:bg-dark-panel hover:text-white transition-colors;
  }

  .nav-link-active {
    @apply bg-dark-panel text-white border-l-4 border-accent-blue;
  }

  .btn-primary {
    @apply bg-accent-blue text-white px-4 py-2 rounded-md hover:bg-blue-500 transition-colors font-medium;
  }

  .btn-secondary {
    @apply bg-dark-panel text-gray-100 px-4 py-2 rounded-md hover:bg-gray-700 transition-colors border border-dark-border;
  }

  .card {
    @apply bg-dark-panel border border-dark-border rounded-lg shadow-md;
  }

  .badge {
    @apply px-2 py-1 rounded text-xs font-semibold;
  }

  .badge-core {
    @apply bg-blue-900 text-blue-200;
  }

  .badge-major {
    @apply bg-purple-900 text-purple-200;
  }

  .badge-minor {
    @apply bg-teal-900 text-teal-200;
  }

  .badge-elective {
    @apply bg-gray-700 text-gray-300;
  }

  .course-status-completed {
    @apply border-l-4 border-green-500;
  }

  .course-status-in-progress {
    @apply border-l-4 border-blue-500;
  }

  .course-status-planned {
    @apply border-l-4 border-gray-500;
  }
}
```

- [ ] **Step 2: Verify styles compile**

Run: `npm run dev`
Expected: No CSS errors, server starts successfully
Action: Check browser console for errors, then stop server

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat: add tailwind global styles and dark theme utilities"
```

---

## Task 5: Common Components (Button, Card, Badge)

**Files:**
- Create: `src/components/common/Button.tsx`
- Create: `src/components/common/Card.tsx`
- Create: `src/components/common/Badge.tsx`

- [ ] **Step 1: Create Button component**

Create `src/components/common/Button.tsx`:

```typescript
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
}) => {
  const baseClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClass} ${className}`}
    >
      {children}
    </button>
  );
};
```

- [ ] **Step 2: Create Card component**

Create `src/components/common/Card.tsx`:

```typescript
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  );
};
```

- [ ] **Step 3: Create Badge component**

Create `src/components/common/Badge.tsx`:

```typescript
import React from 'react';
import type { Course } from '../../types';

interface BadgeProps {
  type: Course['type'];
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ type, className = '' }) => {
  const typeClass = `badge-${type.toLowerCase()}`;

  return (
    <span className={`badge ${typeClass} ${className}`}>
      {type}
    </span>
  );
};
```

- [ ] **Step 4: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add src/components/common/
git commit -m "feat: add reusable Button, Card, and Badge components"
```

---

## Task 6: Layout Components (Sidebar, AppLayout)

**Files:**
- Create: `src/components/layout/Sidebar.tsx`
- Create: `src/components/layout/AppLayout.tsx`

- [ ] **Step 1: Create Sidebar component**

Create `src/components/layout/Sidebar.tsx`:

```typescript
import React from 'react';
import { NavLink } from 'react-router-dom';

export const Sidebar: React.FC = () => {
  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/chat', label: 'AI Advisor', icon: '💬' },
    { path: '/roadmap', label: 'Roadmap', icon: '🗺️' },
    { path: '/courses', label: 'Courses', icon: '📚' },
    { path: '/profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <aside className="w-64 bg-dark-panel border-r border-dark-border h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6 border-b border-dark-border">
        <h1 className="text-2xl font-bold text-accent-blue">AdvisorAI</h1>
        <p className="text-sm text-gray-400 mt-1">Academic Advising</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              isActive ? 'nav-link nav-link-active' : 'nav-link'
            }
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-dark-border text-xs text-gray-500">
        <p>&copy; 2026 AdvisorAI MVP</p>
      </div>
    </aside>
  );
};
```

- [ ] **Step 2: Create AppLayout component**

Create `src/components/layout/AppLayout.tsx`:

```typescript
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export const AppLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-dark-bg">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
};
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/
git commit -m "feat: add Sidebar and AppLayout components with navigation"
```

---

## Task 7: Router Setup and Placeholder Pages

**Files:**
- Modify: `src/App.tsx`
- Create: `src/pages/Dashboard.tsx`
- Create: `src/pages/Chat.tsx`
- Create: `src/pages/Roadmap.tsx`
- Create: `src/pages/Courses.tsx`
- Create: `src/pages/Profile.tsx`

- [ ] **Step 1: Create placeholder pages**

Create `src/pages/Dashboard.tsx`:

```typescript
import React from 'react';

export const Dashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p className="text-gray-400">Welcome to AdvisorAI</p>
    </div>
  );
};
```

Create `src/pages/Chat.tsx`:

```typescript
import React from 'react';

export const Chat: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">AI Advisor Chat</h1>
      <p className="text-gray-400">Chat interface coming soon</p>
    </div>
  );
};
```

Create `src/pages/Roadmap.tsx`:

```typescript
import React from 'react';

export const Roadmap: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Academic Roadmap</h1>
      <p className="text-gray-400">Roadmap timeline coming soon</p>
    </div>
  );
};
```

Create `src/pages/Courses.tsx`:

```typescript
import React from 'react';

export const Courses: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Course Browser</h1>
      <p className="text-gray-400">Course catalog coming soon</p>
    </div>
  );
};
```

Create `src/pages/Profile.tsx`:

```typescript
import React from 'react';

export const Profile: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <p className="text-gray-400">User profile coming soon</p>
    </div>
  );
};
```

- [ ] **Step 2: Set up routing in App.tsx**

Replace `src/App.tsx`:

```typescript
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { Chat } from './pages/Chat';
import { Roadmap } from './pages/Roadmap';
import { Courses } from './pages/Courses';
import { Profile } from './pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="chat" element={<Chat />} />
          <Route path="roadmap" element={<Roadmap />} />
          <Route path="courses" element={<Courses />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
```

- [ ] **Step 3: Test navigation**

Run: `npm run dev`
Expected: App loads, sidebar visible, clicking nav items switches pages
Action: Test all 5 nav links, verify active state, then stop server

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx src/pages/
git commit -m "feat: set up react router and placeholder pages"
```

---

## Task 8: Dashboard Page Implementation

**Files:**
- Modify: `src/pages/Dashboard.tsx`
- Create: `src/components/layout/DashboardCard.tsx`

- [ ] **Step 1: Create DashboardCard component**

Create `src/components/layout/DashboardCard.tsx`:

```typescript
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../common/Card';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: string;
  link: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  icon,
  link,
}) => {
  return (
    <Link to={link}>
      <Card className="p-6 hover:border-accent-blue transition-all cursor-pointer h-full">
        <div className="flex items-start gap-4">
          <span className="text-4xl">{icon}</span>
          <div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-400 text-sm">{description}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
};
```

- [ ] **Step 2: Implement Dashboard page**

Replace `src/pages/Dashboard.tsx`:

```typescript
import React from 'react';
import { Card } from '../components/common/Card';
import { DashboardCard } from '../components/layout/DashboardCard';
import mockUserData from '../data/mockUser.json';
import type { UserData } from '../types';

const userData = mockUserData as UserData;

export const Dashboard: React.FC = () => {
  const { profile } = userData;
  const progressPercent = Math.round((profile.creditsCompleted / profile.creditsRequired) * 100);

  return (
    <div className="max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome back, {profile.name.split(' ')[0]}! 👋</h1>
        <p className="text-gray-400">Here's your academic overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <p className="text-gray-400 text-sm mb-1">GPA</p>
          <p className="text-3xl font-bold text-accent-blue">{profile.gpa.toFixed(2)}</p>
        </Card>

        <Card className="p-6">
          <p className="text-gray-400 text-sm mb-1">Credits Completed</p>
          <p className="text-3xl font-bold text-accent-blue">{profile.creditsCompleted}</p>
          <p className="text-xs text-gray-500 mt-1">of {profile.creditsRequired} required</p>
        </Card>

        <Card className="p-6">
          <p className="text-gray-400 text-sm mb-1">Progress to Graduation</p>
          <p className="text-3xl font-bold text-accent-blue">{progressPercent}%</p>
          <div className="w-full bg-dark-border rounded-full h-2 mt-2">
            <div
              className="bg-accent-blue h-2 rounded-full transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </Card>

        <Card className="p-6">
          <p className="text-gray-400 text-sm mb-1">Expected Graduation</p>
          <p className="text-2xl font-bold text-accent-blue">{profile.expectedGraduation}</p>
        </Card>
      </div>

      {/* Current Semester Info */}
      <Card className="p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Current Semester: Spring 2025</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-400 text-sm mb-2">Courses Enrolled</p>
            <ul className="space-y-1">
              <li className="text-gray-200">• CS 350 - Operating Systems</li>
              <li className="text-gray-200">• CS 370 - Machine Learning</li>
              <li className="text-gray-200">• CS 340 - Software Engineering</li>
              <li className="text-gray-200">• MATH 310 - Probability and Statistics</li>
              <li className="text-gray-200">• ART 101 - Introduction to Art</li>
            </ul>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-2">Academic Details</p>
            <p className="text-gray-200"><span className="text-gray-400">Major:</span> {profile.major}</p>
            <p className="text-gray-200"><span className="text-gray-400">Minor:</span> {profile.minor}</p>
            <p className="text-gray-200"><span className="text-gray-400">Year:</span> {profile.year}</p>
            <p className="text-gray-200"><span className="text-gray-400">Advisor:</span> {profile.advisor}</p>
          </div>
        </div>
      </Card>

      {/* Quick Access Cards */}
      <h2 className="text-2xl font-semibold mb-4">Quick Access</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard
          title="AI Advisor Chat"
          description="Get personalized academic advice and course recommendations"
          icon="💬"
          link="/chat"
        />
        <DashboardCard
          title="Academic Roadmap"
          description="View your complete course timeline and graduation plan"
          icon="🗺️"
          link="/roadmap"
        />
        <DashboardCard
          title="Browse Courses"
          description="Explore available courses and plan future semesters"
          icon="📚"
          link="/courses"
        />
        <DashboardCard
          title="Your Profile"
          description="Manage your profile and academic information"
          icon="👤"
          link="/profile"
        />
      </div>
    </div>
  );
};
```

- [ ] **Step 3: Test Dashboard**

Run: `npm run dev`
Expected: Dashboard shows stats, current semester, quick access cards
Action: Verify all data displays correctly, click quick access cards, then stop server

- [ ] **Step 4: Commit**

```bash
git add src/pages/Dashboard.tsx src/components/layout/DashboardCard.tsx
git commit -m "feat: implement Dashboard page with stats and quick access"
```

---

## Task 9: Chat Page Implementation

**Files:**
- Modify: `src/pages/Chat.tsx`
- Create: `src/components/chat/ChatMessage.tsx`
- Create: `src/components/chat/ChatInput.tsx`

- [ ] **Step 1: Create ChatMessage component**

Create `src/components/chat/ChatMessage.tsx`:

```typescript
import React from 'react';
import type { ChatMessage as ChatMessageType } from '../../types';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const timestamp = new Date(message.timestamp).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-2xl ${isUser ? 'order-2' : 'order-1'}`}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-gray-300">
            {isUser ? 'You' : 'AI Advisor'}
          </span>
          <span className="text-xs text-gray-500">{timestamp}</span>
        </div>
        <div
          className={`p-4 rounded-lg ${
            isUser
              ? 'bg-accent-blue text-white'
              : 'bg-dark-panel border border-dark-border text-gray-100'
          }`}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Create ChatInput component**

Create `src/components/chat/ChatInput.tsx`:

```typescript
import React from 'react';
import { Button } from '../common/Button';

export const ChatInput: React.FC = () => {
  return (
    <div className="border-t border-dark-border p-4 bg-dark-panel">
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Type your message... (non-functional in MVP)"
          disabled
          className="flex-1 bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 cursor-not-allowed opacity-60"
        />
        <Button variant="primary" className="px-6" onClick={() => {}}>
          Send
        </Button>
      </div>
      <p className="text-xs text-gray-500 mt-2 text-center">
        Chat functionality will be enabled in a future version
      </p>
    </div>
  );
};
```

- [ ] **Step 3: Implement Chat page**

Replace `src/pages/Chat.tsx`:

```typescript
import React from 'react';
import { ChatMessage } from '../components/chat/ChatMessage';
import { ChatInput } from '../components/chat/ChatInput';
import mockUserData from '../data/mockUser.json';
import type { UserData } from '../types';

const userData = mockUserData as UserData;

export const Chat: React.FC = () => {
  const { chatHistory } = userData;

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">AI Advisor Chat</h1>
        <p className="text-gray-400">Get personalized academic guidance</p>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto bg-dark-panel border border-dark-border rounded-t-lg p-6">
        {chatHistory.messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>

      {/* Chat Input */}
      <ChatInput />
    </div>
  );
};
```

- [ ] **Step 4: Test Chat page**

Run: `npm run dev`
Expected: Chat page shows hardcoded conversation, input is disabled
Action: Verify messages display correctly with timestamps, scroll works, then stop server

- [ ] **Step 5: Commit**

```bash
git add src/pages/Chat.tsx src/components/chat/
git commit -m "feat: implement Chat page with message history"
```

---

## Task 10: Roadmap Page Implementation

**Files:**
- Modify: `src/pages/Roadmap.tsx`
- Create: `src/components/roadmap/SemesterBlock.tsx`
- Create: `src/components/roadmap/CourseCard.tsx`

- [ ] **Step 1: Create CourseCard component**

Create `src/components/roadmap/CourseCard.tsx`:

```typescript
import React from 'react';
import { Badge } from '../common/Badge';
import type { Course } from '../../types';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const statusClass = `course-status-${course.status}`;

  return (
    <div className={`bg-dark-panel border border-dark-border rounded-md p-3 ${statusClass}`}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-semibold text-gray-100">{course.code}</p>
          <p className="text-sm text-gray-400">{course.name}</p>
        </div>
        <Badge type={course.type} />
      </div>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{course.credits} credits</span>
        {course.grade && <span className="font-semibold text-accent-blue">Grade: {course.grade}</span>}
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Create SemesterBlock component**

Create `src/components/roadmap/SemesterBlock.tsx`:

```typescript
import React from 'react';
import { Card } from '../common/Card';
import { CourseCard } from './CourseCard';
import type { Semester } from '../../types';

interface SemesterBlockProps {
  semester: Semester;
}

export const SemesterBlock: React.FC<SemesterBlockProps> = ({ semester }) => {
  const getStatusIcon = () => {
    const firstCourse = semester.courses[0];
    if (!firstCourse) return '⚪';
    switch (firstCourse.status) {
      case 'completed':
        return '✅';
      case 'in-progress':
        return '🔵';
      case 'planned':
        return '⚪';
      default:
        return '⚪';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{getStatusIcon()}</span>
        <div>
          <h3 className="text-xl font-semibold text-gray-100">{semester.term}</h3>
          <p className="text-sm text-gray-400">{semester.totalCredits} Credits</p>
        </div>
      </div>

      <div className="space-y-3">
        {semester.courses.map((course) => (
          <CourseCard key={`${course.code}-${semester.term}`} course={course} />
        ))}
      </div>
    </Card>
  );
};
```

- [ ] **Step 3: Implement Roadmap page**

Replace `src/pages/Roadmap.tsx`:

```typescript
import React from 'react';
import { SemesterBlock } from '../components/roadmap/SemesterBlock';
import mockUserData from '../data/mockUser.json';
import type { UserData } from '../types';

const userData = mockUserData as UserData;

export const Roadmap: React.FC = () => {
  const { roadmap } = userData;

  const completedSemesters = roadmap.semesters.filter(
    (s) => s.courses[0]?.status === 'completed'
  );
  const currentSemester = roadmap.semesters.find(
    (s) => s.courses[0]?.status === 'in-progress'
  );
  const plannedSemesters = roadmap.semesters.filter(
    (s) => s.courses[0]?.status === 'planned'
  );

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Academic Roadmap</h1>
        <p className="text-gray-400">Your complete course timeline</p>
      </div>

      {/* Legend */}
      <div className="flex gap-6 mb-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-xl">✅</span>
          <span className="text-gray-400">Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl">🔵</span>
          <span className="text-gray-400">In Progress</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl">⚪</span>
          <span className="text-gray-400">Planned</span>
        </div>
      </div>

      {/* Completed Semesters */}
      {completedSemesters.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-green-400">Completed Semesters</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {completedSemesters.map((semester) => (
              <SemesterBlock key={semester.term} semester={semester} />
            ))}
          </div>
        </div>
      )}

      {/* Current Semester */}
      {currentSemester && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-400">Current Semester</h2>
          <SemesterBlock semester={currentSemester} />
        </div>
      )}

      {/* Planned Semesters */}
      {plannedSemesters.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-400">Planned Semesters</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {plannedSemesters.map((semester) => (
              <SemesterBlock key={semester.term} semester={semester} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
```

- [ ] **Step 4: Test Roadmap page**

Run: `npm run dev`
Expected: Roadmap shows semesters organized by status, courses display with badges and status indicators
Action: Verify completed/in-progress/planned sections, check course cards, then stop server

- [ ] **Step 5: Commit**

```bash
git add src/pages/Roadmap.tsx src/components/roadmap/
git commit -m "feat: implement Roadmap page with semester timeline"
```

---

## Task 11: Course Browser Implementation

**Files:**
- Modify: `src/pages/Courses.tsx`
- Create: `src/components/courses/CourseList.tsx`
- Create: `src/components/courses/CourseFilter.tsx`

- [ ] **Step 1: Create CourseFilter component**

Create `src/components/courses/CourseFilter.tsx`:

```typescript
import React from 'react';

interface CourseFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedDepartment: string;
  setSelectedDepartment: (dept: string) => void;
}

export const CourseFilter: React.FC<CourseFilterProps> = ({
  searchTerm,
  setSearchTerm,
  selectedType,
  setSelectedType,
  selectedDepartment,
  setSelectedDepartment,
}) => {
  return (
    <div className="bg-dark-panel border border-dark-border rounded-lg p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Search</label>
          <input
            type="text"
            placeholder="Course code or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-dark-bg border border-dark-border rounded-md px-3 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-accent-blue"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Type</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full bg-dark-bg border border-dark-border rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:border-accent-blue"
          >
            <option value="">All Types</option>
            <option value="Core">Core</option>
            <option value="Major">Major</option>
            <option value="Minor">Minor</option>
            <option value="Elective">Elective</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Department</label>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="w-full bg-dark-bg border border-dark-border rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:border-accent-blue"
          >
            <option value="">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Mathematics">Mathematics</option>
            <option value="English">English</option>
            <option value="Physics">Physics</option>
            <option value="Psychology">Psychology</option>
            <option value="History">History</option>
            <option value="Philosophy">Philosophy</option>
            <option value="Art">Art</option>
            <option value="Music">Music</option>
            <option value="Business">Business</option>
            <option value="Sociology">Sociology</option>
            <option value="Physical Education">Physical Education</option>
          </select>
        </div>
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Create CourseList component**

Create `src/components/courses/CourseList.tsx`:

```typescript
import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import type { CourseCatalogItem } from '../../types';

interface CourseListProps {
  courses: CourseCatalogItem[];
}

export const CourseList: React.FC<CourseListProps> = ({ courses }) => {
  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No courses found matching your filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {courses.map((course) => (
        <Card key={course.code} className="p-5 hover:border-accent-blue transition-colors">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-bold text-lg text-gray-100">{course.code}</h3>
              <p className="text-gray-300">{course.name}</p>
            </div>
            <Badge type={course.type} />
          </div>

          <p className="text-sm text-gray-400 mb-3">{course.description}</p>

          <div className="flex flex-wrap gap-4 text-xs text-gray-500">
            <span>{course.credits} Credits</span>
            <span>Dept: {course.department}</span>
            <span>Offered: {course.availableSemesters.join(', ')}</span>
          </div>

          {course.prerequisites && course.prerequisites.length > 0 && (
            <div className="mt-3 pt-3 border-t border-dark-border">
              <p className="text-xs text-gray-500">
                <span className="font-semibold">Prerequisites:</span> {course.prerequisites.join(', ')}
              </p>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};
```

- [ ] **Step 3: Implement Courses page with filtering**

Replace `src/pages/Courses.tsx`:

```typescript
import React, { useState, useMemo } from 'react';
import { CourseFilter } from '../components/courses/CourseFilter';
import { CourseList } from '../components/courses/CourseList';
import mockCoursesData from '../data/mockCourses.json';
import type { CourseCatalogItem } from '../types';

const coursesData = mockCoursesData as CourseCatalogItem[];

export const Courses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const filteredCourses = useMemo(() => {
    return coursesData.filter((course) => {
      const matchesSearch =
        searchTerm === '' ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = selectedType === '' || course.type === selectedType;

      const matchesDepartment =
        selectedDepartment === '' || course.department === selectedDepartment;

      return matchesSearch && matchesType && matchesDepartment;
    });
  }, [searchTerm, selectedType, selectedDepartment]);

  return (
    <div className="max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Course Browser</h1>
        <p className="text-gray-400">Explore available courses and plan your schedule</p>
      </div>

      <CourseFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={setSelectedDepartment}
      />

      <div className="mb-4 text-sm text-gray-400">
        Showing {filteredCourses.length} of {coursesData.length} courses
      </div>

      <CourseList courses={filteredCourses} />
    </div>
  );
};
```

- [ ] **Step 4: Test Courses page**

Run: `npm run dev`
Expected: Course browser shows all courses, filtering works (search, type, department)
Action: Test search, filter by type, filter by department, verify course details display, then stop server

- [ ] **Step 5: Commit**

```bash
git add src/pages/Courses.tsx src/components/courses/
git commit -m "feat: implement Course Browser with filtering"
```

---

## Task 12: Profile Page Implementation

**Files:**
- Modify: `src/pages/Profile.tsx`

- [ ] **Step 1: Implement Profile page**

Replace `src/pages/Profile.tsx`:

```typescript
import React from 'react';
import { Card } from '../components/common/Card';
import mockUserData from '../data/mockUser.json';
import type { UserData } from '../types';

const userData = mockUserData as UserData;

export const Profile: React.FC = () => {
  const { profile, roadmap } = userData;

  const completedCredits = roadmap.semesters.reduce((total, semester) => {
    const completedInSemester = semester.courses
      .filter((c) => c.status === 'completed')
      .reduce((sum, c) => sum + c.credits, 0);
    return total + completedInSemester;
  }, 0);

  const totalCoursesTaken = roadmap.semesters.reduce(
    (total, semester) => total + semester.courses.filter((c) => c.status === 'completed').length,
    0
  );

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Profile</h1>
        <p className="text-gray-400">Your academic information</p>
      </div>

      {/* Personal Information */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-accent-blue">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-400">Full Name</p>
            <p className="text-lg text-gray-100">{profile.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Email</p>
            <p className="text-lg text-gray-100">{profile.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Student ID</p>
            <p className="text-lg text-gray-100">{profile.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Year</p>
            <p className="text-lg text-gray-100">{profile.year}</p>
          </div>
        </div>
      </Card>

      {/* Academic Information */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-accent-blue">Academic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-400">Major</p>
            <p className="text-lg text-gray-100">{profile.major}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Minor</p>
            <p className="text-lg text-gray-100">{profile.minor || 'None'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">GPA</p>
            <p className="text-lg text-gray-100">{profile.gpa.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Expected Graduation</p>
            <p className="text-lg text-gray-100">{profile.expectedGraduation}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Credits Completed</p>
            <p className="text-lg text-gray-100">
              {completedCredits} / {profile.creditsRequired}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Courses Completed</p>
            <p className="text-lg text-gray-100">{totalCoursesTaken}</p>
          </div>
        </div>
      </Card>

      {/* Advisor Information */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-accent-blue">Academic Advisor</h2>
        <div>
          <p className="text-sm text-gray-400">Advisor Name</p>
          <p className="text-lg text-gray-100">{profile.advisor}</p>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-400">
            Contact your advisor through the AI Advisor Chat for general questions, or email directly for urgent matters.
          </p>
        </div>
      </Card>
    </div>
  );
};
```

- [ ] **Step 2: Test Profile page**

Run: `npm run dev`
Expected: Profile page shows personal info, academic stats, advisor info
Action: Verify all data displays correctly from mock data, then stop server

- [ ] **Step 3: Commit**

```bash
git add src/pages/Profile.tsx
git commit -m "feat: implement Profile page with user information"
```

---

## Task 13: Final Testing and Refinement

**Files:**
- None (testing only)

- [ ] **Step 1: Full navigation test**

Run: `npm run dev`
Test Plan:
1. Start at Dashboard → verify stats, current semester info, quick access cards
2. Click "AI Advisor" quick access card → verify chat loads
3. Use sidebar to navigate to Roadmap → verify semesters display
4. Use sidebar to navigate to Courses → verify course list loads
5. Test course filters (search "CS", filter by "Major", filter by "Computer Science")
6. Use sidebar to navigate to Profile → verify profile info
7. Use sidebar to return to Dashboard

Expected: All navigation works, no console errors, data displays correctly

- [ ] **Step 2: Check TypeScript compilation**

Run: `npx tsc --noEmit`
Expected: No TypeScript errors

- [ ] **Step 3: Build production bundle**

Run: `npm run build`
Expected: Build succeeds, dist/ folder created

- [ ] **Step 4: Preview production build**

Run: `npm run preview`
Expected: Production build serves correctly, app functions identically to dev mode
Action: Quick navigation test, then stop server

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "test: verify all features working, production build successful"
```

---

## Task 14: Documentation and Final Touches

**Files:**
- Create: `README.md`

- [ ] **Step 1: Create README**

Create `README.md`:

```markdown
# AdvisorAI MVP

Academic advising web application built with React, TypeScript, and Tailwind CSS.

## Features

- **Dashboard**: Personalized overview with GPA, credits, and quick navigation
- **AI Advisor Chat**: Hardcoded conversation demonstrating chat interface (MVP)
- **Academic Roadmap**: Visual timeline of completed, in-progress, and planned courses
- **Course Browser**: Searchable catalog with filtering by type and department
- **Profile**: Student information and academic statistics

## Tech Stack

- **Vite** - Build tool
- **React 18** - UI framework
- **TypeScript** - Type safety
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Styling (dark theme)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Route-level page components
├── data/           # Mock JSON data
├── types/          # TypeScript interfaces
├── App.tsx         # Root component with routing
└── main.tsx        # Entry point
```

## Mock Data

This MVP uses JSON files for mock data:
- `src/data/mockUser.json` - Single student's complete data
- `src/data/mockCourses.json` - Course catalog

## Future Enhancements

- User authentication
- Real AI chat integration (OpenAI, etc.)
- Backend API and database
- Course registration functionality
- Mobile responsive improvements
- Accessibility enhancements

## Design

Figma: [View Design](https://www.figma.com/design/lSOyY3rn5Tl3bLzwAJG2z1/Untitled?node-id=0-1)

## License

Private project - All rights reserved
```

- [ ] **Step 2: Update package.json metadata**

Edit `package.json`, update name and description:

```json
{
  "name": "advisorai-mvp",
  "private": true,
  "version": "0.1.0",
  "description": "Academic advising web application MVP",
  "type": "module",
  ...
}
```

- [ ] **Step 3: Add .gitignore for superpowers (if not already done)**

Verify `.gitignore` includes:

```
.superpowers/
.claude/
```

- [ ] **Step 4: Final commit**

```bash
git add README.md package.json .gitignore
git commit -m "docs: add README and finalize project metadata"
```

---

## Task 15: Final Verification

**Files:**
- None (verification only)

- [ ] **Step 1: Clone test (simulate fresh install)**

```bash
cd ..
git clone . advisorai-test
cd advisorai-test
npm install
npm run dev
```

Expected: App installs and runs successfully from fresh clone
Action: Quick navigation test, then remove test directory

- [ ] **Step 2: Verify all files committed**

Run: `git status`
Expected: Working tree clean, all files committed

- [ ] **Step 3: Check git log**

Run: `git log --oneline -15`
Expected: Clean commit history with descriptive messages

- [ ] **Step 4: Final acceptance test**

Run: `npm run dev`

**Acceptance Criteria:**
✅ All 5 screens implemented and navigable
✅ UI matches dark theme design intent
✅ Mock data displays correctly across all views
✅ Navigation works seamlessly (sidebar + dashboard cards)
✅ TypeScript compiles without errors
✅ Production build succeeds
✅ Code is clean and well-organized

If all criteria pass, project is complete!

- [ ] **Step 5: Final commit (if needed)**

```bash
git add -A
git commit -m "chore: final verification complete - MVP ready"
```

---

## Plan Complete

**Total Tasks:** 15
**Estimated Time:** 3-4 hours for experienced developer

**Next Steps:**
- Choose execution approach (subagent-driven vs inline)
- Execute plan task-by-task
- Review and test after completion
