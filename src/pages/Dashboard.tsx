import React from 'react';
import mockUserData from '../data/mockUser.json';

export const Dashboard: React.FC = () => {
  const { profile, roadmap } = mockUserData;

  const progressPercentage = (profile.creditsCompleted / profile.creditsRequired) * 100;
  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-6">
          <h2 className="text-lg text-slate-300 font-medium">Dashboard</h2>
          <h2 className="text-lg text-slate-500">Library</h2>
          <h2 className="text-lg text-slate-500">Insights</h2>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="search"
            placeholder="Search insights..."
            className="bg-dark-panel border border-dark-border rounded-xl px-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-accent-blue/50 w-64"
          />
          <button className="w-10 h-10 rounded-xl bg-dark-panel border border-dark-border flex items-center justify-center hover:border-accent-blue/50 transition-colors">
            <span className="text-slate-500">⚙</span>
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center">
            <span className="text-sm font-bold">{profile.name.charAt(0)}</span>
          </div>
        </div>
      </div>

      {/* Welcome Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-serif mb-4">Welcome back, {profile.name.split(' ')[0]}.</h1>
        <p className="text-slate-400 text-lg">
          Your academic trajectory is currently ascending. AdvisorAI has identified 3 new
          opportunities for research alignment.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* AI-Driven Insights Card */}
        <div className="col-span-2 card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-accent-blue/20 flex items-center justify-center">
              <span className="text-accent-blue">⚡</span>
            </div>
            <h2 className="text-xl font-semibold">AI-Driven Insights</h2>
          </div>

          <div className="bg-dark-bg/50 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold mb-3">Research Optimization</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Based on your recent notes in Organic Chemistry, we recommend connecting
              with Professor Aris for the upcoming 'Carbon-Capture' symposium. You have
              an 88% topical overlap.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                  <span>📈</span>
                  <span>GRADE PREDICTION</span>
                </div>
                <div className="text-2xl font-bold">A (94%)</div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                  <span>🕐</span>
                  <span>OPTIMAL STUDY WINDOW</span>
                </div>
                <div className="text-2xl font-bold">9 PM - 11 PM</div>
              </div>
            </div>
          </div>
        </div>

        {/* Degree Completion */}
        <div className="card flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold mb-6">Degree Completion</h3>
          <div className="relative w-48 h-48">
            <svg className="transform -rotate-90 w-48 h-48">
              <circle
                cx="96"
                cy="96"
                r="90"
                stroke="rgba(125, 211, 252, 0.1)"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="96"
                cy="96"
                r="90"
                stroke="url(#gradient)"
                strokeWidth="12"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7dd3fc" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-5xl font-bold glow-text">{Math.round(progressPercentage)}%</div>
              <div className="text-xs text-slate-500 mt-1">{profile.creditsCompleted}/{profile.creditsRequired} credits</div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-slate-400 text-sm">On track for Graduation:</p>
            <p className="text-slate-100 font-semibold">{profile.expectedGraduation}</p>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="stat-card text-center">
          <div className="text-accent-blue text-3xl mb-2">🎓</div>
          <div className="text-3xl font-bold mb-1">08</div>
          <div className="text-xs text-slate-500 uppercase tracking-wide">Active Courses</div>
        </div>
        <div className="stat-card text-center">
          <div className="text-accent-purple text-3xl mb-2">⭐</div>
          <div className="text-3xl font-bold mb-1">12</div>
          <div className="text-xs text-slate-500 uppercase tracking-wide">Scholar Credits</div>
        </div>
        <div className="stat-card text-center">
          <div className="text-accent-blue text-3xl mb-2">📝</div>
          <div className="text-3xl font-bold mb-1">04</div>
          <div className="text-xs text-slate-500 uppercase tracking-wide">Published Papers</div>
        </div>
        <div className="stat-card text-center">
          <div className="text-slate-400 text-3xl mb-2">📋</div>
          <div className="text-3xl font-bold mb-1">02</div>
          <div className="text-xs text-slate-500 uppercase tracking-wide">Tasks Pending</div>
        </div>
      </div>

      {/* GPA Trajectory & Academic Activity */}
      <div className="grid grid-cols-3 gap-6">
        {/* GPA Chart */}
        <div className="col-span-2 card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">GPA Trajectory</h2>
            <span className="text-slate-400 text-sm">Cumulative: {profile.gpa}</span>
          </div>
          <div className="flex items-end justify-between gap-2 h-48">
            {[
              { label: 'FALL 22', value: 3.7, forecast: false },
              { label: 'SPRING 23', value: 3.8, forecast: false },
              { label: 'FALL 23', value: 3.6, forecast: false },
              { label: 'SPRING 24', value: 3.75, forecast: false },
              { label: 'FALL 24', value: 3.9, forecast: false },
              { label: 'FORECAST', value: 3.85, forecast: true },
            ].map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center">
                <div className="w-full flex items-end justify-center h-40 mb-2">
                  <div
                    className={`w-full rounded-t-lg ${item.forecast ? 'bg-accent-blue/20 border-2 border-dashed border-accent-blue/50' : 'bg-gradient-to-t from-accent-blue to-accent-purple'}`}
                    style={{ height: `${(item.value / 4) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-slate-500">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Activity */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Academic Activity</h2>
            <button className="text-xs text-accent-blue hover:underline">View All History</button>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent-blue/20 flex-shrink-0 flex items-center justify-center">
                <span className="text-accent-blue text-sm">👥</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium mb-1">Advising Session: Thesis Direction</h4>
                <p className="text-xs text-slate-500">Completed with Dr. Julian Thomas • 2 hours ago</p>
              </div>
              <span className="text-xs px-2 py-1 bg-dark-bg rounded text-slate-500 flex-shrink-0">SESSION LOG</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent-purple/20 flex-shrink-0 flex items-center justify-center">
                <span className="text-accent-purple text-sm">⭐</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium mb-1">Grade Updated: Quantum Mechanics II</h4>
                <p className="text-xs text-slate-500">Midterm Result: A+ (98%) • Yesterday</p>
              </div>
              <span className="text-xs px-2 py-1 bg-dark-bg rounded text-slate-500 flex-shrink-0">ACADEMIC RECORD</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-dark-panel-hover flex-shrink-0 flex items-center justify-center">
                <span className="text-slate-400 text-sm">📄</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium mb-1">Draft Submitted: AI Ethics Framework</h4>
                <p className="text-xs text-slate-500">To Research Portal • 2 days ago</p>
              </div>
              <span className="text-xs px-2 py-1 bg-dark-bg rounded text-slate-500 flex-shrink-0">SUBMISSION</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
