import React from 'react';
import mockUserData from '../data/mockUser.json';

export const Profile: React.FC = () => {
  const { profile, roadmap } = mockUserData;

  // Calculate completed courses
  const allCourses = roadmap.semesters.flatMap(s => s.courses);
  const completedCourses = allCourses.filter(c => c.status === 'completed');
  const inProgressCourses = allCourses.filter(c => c.status === 'in-progress');

  // Calculate grade distribution
  const gradeDistribution = completedCourses.reduce((acc, course) => {
    if ('grade' in course && course.grade && typeof course.grade === 'string') {
      const grade = course.grade.replace(/[+-]/g, ''); // Remove + or -
      acc[grade] = (acc[grade] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-serif mb-3">Academic Profile</h1>
        <p className="text-slate-400">Your complete academic information and performance metrics</p>
      </div>

      {/* Profile Overview */}
      <div className="card mb-6">
        <h2 className="text-2xl font-serif mb-6">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-slate-500 mb-2">Full Name</label>
            <p className="text-lg font-semibold text-slate-100">{profile.name}</p>
          </div>
          <div>
            <label className="block text-sm text-slate-500 mb-2">Email</label>
            <p className="text-lg font-semibold text-slate-100">{profile.email}</p>
          </div>
          <div>
            <label className="block text-sm text-slate-500 mb-2">Student ID</label>
            <p className="text-lg font-semibold text-accent-blue">{profile.id}</p>
          </div>
          <div>
            <label className="block text-sm text-slate-500 mb-2">Academic Advisor</label>
            <p className="text-lg font-semibold text-slate-100">{profile.advisor}</p>
          </div>
        </div>
      </div>

      {/* Academic Details & Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="card">
          <h2 className="text-2xl font-serif mb-6">Academic Details</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-dark-border/40">
              <span className="text-slate-500">Major</span>
              <span className="font-semibold text-accent-blue">{profile.major}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-dark-border/40">
              <span className="text-slate-500">Minor</span>
              <span className="font-semibold text-accent-purple">{profile.minor || 'None'}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-dark-border/40">
              <span className="text-slate-500">Class Year</span>
              <span className="font-semibold">{profile.year}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-dark-border/40">
              <span className="text-slate-500">Expected Graduation</span>
              <span className="font-semibold">{profile.expectedGraduation}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-dark-border/40">
              <span className="text-slate-500">Cumulative GPA</span>
              <span className="font-bold text-2xl glow-text">{profile.gpa.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Credits</span>
              <span className="font-semibold">{profile.creditsCompleted} / {profile.creditsRequired}</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-2xl font-serif mb-6">Academic Progress</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="stat-card text-center">
              <div className="text-3xl font-bold text-accent-blue mb-2">{completedCourses.length}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wide">Completed</div>
            </div>
            <div className="stat-card text-center">
              <div className="text-3xl font-bold text-accent-purple mb-2">{inProgressCourses.length}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wide">In Progress</div>
            </div>
            <div className="stat-card text-center col-span-2">
              <div className="text-3xl font-bold text-slate-300 mb-2">{roadmap.semesters.length}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wide">Total Semesters</div>
            </div>
          </div>
        </div>
      </div>

      {/* Grade Distribution */}
      <div className="card">
        <h2 className="text-2xl font-serif mb-6">Grade Distribution</h2>
        <div className="space-y-4">
          {Object.entries(gradeDistribution)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([grade, count]) => {
              const percentage = (count / completedCourses.length) * 100;
              return (
                <div key={grade}>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Grade {grade}</span>
                    <span className="text-slate-400 text-sm">
                      {count} {count === 1 ? 'course' : 'courses'} • {percentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-dark-bg/60 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full transition-all ${
                        grade === 'A'
                          ? 'bg-gradient-to-r from-accent-blue to-accent-purple'
                          : grade === 'B'
                          ? 'bg-accent-blue/60'
                          : 'bg-slate-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
