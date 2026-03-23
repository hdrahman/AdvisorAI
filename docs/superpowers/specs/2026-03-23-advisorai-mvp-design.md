# AdvisorAI MVP Design Specification

**Date:** 2026-03-23
**Status:** Draft
**Author:** Claude Code

## Overview

AdvisorAI is an academic advising web application that helps students track their academic progress, explore courses, and interact with an AI advisor. This specification covers the MVP prototype with mock data (no database, no authentication, no real AI integration).

## Goals

- Implement all 5 screens from Figma design with full navigation
- Create realistic mock data for a single student
- Demonstrate the UI/UX flow for academic advising
- Build a foundation that can scale to full backend integration

## Non-Goals (MVP)

- Database integration
- User authentication/login
- Real AI chat integration (hardcoded conversation only)
- Multi-user support
- Backend API

## Technology Stack

- **Build Tool:** Vite
- **Framework:** React 18 with TypeScript
- **Routing:** React Router v6
- **Styling:** Tailwind CSS (dark theme matching Figma)
- **Mock Data:** JSON file with single user's complete data

## Architecture

### Project Structure

```
AdvisorAI/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppLayout.tsx       # Main layout with nav
│   │   │   ├── Sidebar.tsx         # Persistent navigation sidebar
│   │   │   └── DashboardCard.tsx   # Quick access cards
│   │   ├── chat/
│   │   │   ├── ChatMessage.tsx     # Individual message bubble
│   │   │   └── ChatInput.tsx       # Message input (non-functional)
│   │   ├── roadmap/
│   │   │   ├── SemesterBlock.tsx   # Semester container
│   │   │   └── CourseCard.tsx      # Course display in roadmap
│   │   ├── courses/
│   │   │   ├── CourseList.tsx      # Course browser list
│   │   │   └── CourseFilter.tsx    # Filter/search UI
│   │   └── common/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── Badge.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx           # Welcome screen with stats
│   │   ├── Chat.tsx                # AI advisor chat
│   │   ├── Roadmap.tsx             # Academic timeline
│   │   ├── Courses.tsx             # Course browser
│   │   └── Profile.tsx             # User profile/settings
│   ├── data/
│   │   ├── mockUser.json           # Single user data
│   │   └── mockCourses.json        # Available courses catalog
│   ├── types/
│   │   └── index.ts                # TypeScript interfaces
│   ├── App.tsx                     # Root with router
│   ├── main.tsx                    # Entry point
│   └── index.css                   # Tailwind imports
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

### Data Model

**User Profile** (`mockUser.json`):
```typescript
interface User {
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
```

**Course History:**
```typescript
interface CourseHistory {
  completed: Course[];     // Past courses with grades
  inProgress: Course[];    // Current semester
  planned: Course[];       // Future semesters
}

interface Course {
  code: string;            // e.g., "CS 101"
  name: string;
  credits: number;
  semester: string;        // e.g., "Fall 2024"
  grade?: string;          // Only for completed
  type: "Core" | "Major" | "Minor" | "Elective";
  description: string;
}
```

**Academic Roadmap:**
```typescript
interface Roadmap {
  semesters: Semester[];
}

interface Semester {
  term: string;            // "Fall 2024"
  year: number;
  courses: Course[];
  totalCredits: number;
}
```

**Chat Conversation:**
```typescript
interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  content: string;
  timestamp: string;
}

interface ChatHistory {
  messages: ChatMessage[];  // Hardcoded conversation
}
```

**Course Catalog:**
Separate `mockCourses.json` with all available courses for browsing.

## Screen Specifications

### 1. Dashboard (Home)

**Purpose:** Welcome screen with personalized overview and quick navigation.

**Components:**
- Welcome message with user's name
- Quick stats cards (GPA, credits, progress to graduation)
- Navigation cards to other screens (Chat, Roadmap, Courses, Profile)
- Upcoming courses/deadlines preview

**Layout:**
- Top: Welcome header
- Middle: 2x2 grid of stat cards
- Bottom: Quick access navigation cards

### 2. Chat Interface

**Purpose:** Display hardcoded conversation with AI advisor.

**Components:**
- Message history (scrollable)
- Message bubbles (user vs AI styling)
- Non-functional input field (shows placeholder)

**Behavior:**
- Display 5-7 hardcoded messages showing typical advising questions
- Examples: course recommendations, graduation requirements, career advice
- Input field is present but non-functional (MVP)

### 3. Academic Roadmap

**Purpose:** Visual timeline of past, current, and planned courses.

**Components:**
- Timeline view organized by semester
- Semester blocks showing courses grouped by type (Core, Major, Elective)
- Visual indicators for completed (green), in-progress (blue), planned (gray)
- Credit count per semester

**Layout:**
- Horizontal or vertical timeline
- Each semester shows: term name, total credits, course cards
- Course cards show: code, name, credits, type badge

### 4. Course Browser

**Purpose:** Explore available courses with filtering.

**Components:**
- Search/filter bar (type, semester availability)
- Course list cards
- Course details (code, name, credits, description, prerequisites)

**Behavior:**
- Load all courses from `mockCourses.json`
- Client-side filtering by course type, code, name
- No course registration functionality (MVP)

### 5. Profile/Settings

**Purpose:** Display user information and preferences.

**Components:**
- Profile information (name, email, major, year)
- Academic stats (GPA, credits, expected graduation)
- Advisor information
- (Future: settings toggles)

**Layout:**
- Header with user info
- Sections for academic details, advisor info

## Navigation

**Hybrid approach:**
- **Persistent sidebar:** Present on all screens with links to Dashboard, Chat, Roadmap, Courses, Profile
- **Dashboard quick access cards:** Large clickable cards on dashboard for visual navigation
- Active route highlighted in sidebar
- Logo/app name in sidebar header

## Styling Guidelines

**Theme:** Dark mode matching Figma design
- Primary background: Dark navy/charcoal
- Secondary backgrounds: Slightly lighter panels
- Accent color: Blue (#60A5FA or similar)
- Text: White/light gray
- Cards: Subtle borders, slight shadows

**Typography:**
- Modern sans-serif (Inter, Roboto, or system default)
- Clear hierarchy with consistent sizing

**Spacing:**
- Generous padding/margins for readability
- Consistent component spacing using Tailwind scale

## Implementation Approach

1. **Setup:** Initialize Vite + React + TypeScript + Tailwind project
2. **Mock Data:** Create comprehensive `mockUser.json` and `mockCourses.json`
3. **Layout:** Build `AppLayout` with sidebar navigation
4. **Routing:** Set up React Router for all 5 pages
5. **Components:** Build reusable components (cards, buttons, etc.)
6. **Pages:** Implement each screen, starting with Dashboard
7. **Refinement:** Match Figma design closely with Tailwind styling
8. **Testing:** Verify all navigation works and data displays correctly

## Future Enhancements (Post-MVP)

- User authentication
- Backend API integration
- Real AI chat with LLM integration
- Database for persistent data
- Course registration functionality
- Multi-user support
- Notifications and reminders
- Mobile responsive design improvements
- Accessibility improvements (ARIA labels, keyboard navigation)

## Success Criteria

- All 5 screens implemented and navigable
- UI closely matches Figma design
- Mock data displays correctly across all views
- Navigation works seamlessly (sidebar + dashboard cards)
- Code is clean, typed, and well-organized
- Project can be easily extended with real backend

## Out of Scope

- Real-time features
- Email notifications
- PDF exports
- Calendar integration
- Social features
- Analytics/tracking
