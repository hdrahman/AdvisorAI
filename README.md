# AdvisorAI MVP

An intelligent academic advising web application that helps students plan their course schedules and track academic progress.

## Features

### 📊 Dashboard
- Student statistics overview (GPA, credits, graduation date)
- Degree completion progress bar
- Current semester courses display
- Quick access cards to all app features

### 💬 Chat
- AI advisor chat interface
- Hardcoded conversation demonstrating advising capabilities
- Clean messenger-style UI

### 🗺️ Roadmap
- Visual timeline of academic journey
- Semester-based course organization
- Color-coded courses by type (Major/Minor/Core/Elective)
- Status badges for completed, in-progress, and planned courses
- Grade display for completed courses

### 📚 Course Browser
- Search courses by code, name, or description
- Filter by department and course type
- View prerequisites and available semesters
- Comprehensive course catalog (30 courses)

### 👤 Profile
- Student personal information
- Academic details (major, minor, GPA, credits)
- Progress statistics
- Grade distribution visualization

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom dark theme
- **Routing**: React Router v6
- **Data**: JSON mock data (no backend required)

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd AdvisorAI
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
AdvisorAI/
├── src/
│   ├── components/
│   │   ├── common/           # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Badge.tsx
│   │   └── layout/           # Layout components
│   │       ├── Sidebar.tsx
│   │       └── AppLayout.tsx
│   ├── pages/                # Page components
│   │   ├── Dashboard.tsx
│   │   ├── Chat.tsx
│   │   ├── Roadmap.tsx
│   │   ├── Courses.tsx
│   │   └── Profile.tsx
│   ├── data/                 # Mock data
│   │   ├── mockUser.json
│   │   └── mockCourses.json
│   ├── types/                # TypeScript interfaces
│   │   └── index.ts
│   ├── App.tsx               # Main app component
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
├── public/                   # Static assets
├── tailwind.config.js        # Tailwind configuration
├── vite.config.ts            # Vite configuration
└── package.json
```

## Mock Data

The application uses JSON files for mock data:

- **mockUser.json**: Contains student profile, 6 semesters of course history, and chat conversation
- **mockCourses.json**: Contains 30 courses across CS, Math, and general education

To modify the data, edit these files in `src/data/`.

## Design

The UI is based on a dark theme with the following color scheme:
- Background: `#0f172a` (dark-bg)
- Panels: `#1e293b` (dark-panel)
- Borders: `#334155` (dark-border)
- Accent: `#60a5fa` (accent-blue)

## Future Enhancements

- [ ] Real-time AI chat integration
- [ ] User authentication
- [ ] Backend API integration
- [ ] Course recommendations engine
- [ ] Prerequisite validation
- [ ] Schedule conflict detection
- [ ] Export roadmap to PDF
- [ ] Multi-user support

## License

MIT

## Credits

Built with Claude Code
