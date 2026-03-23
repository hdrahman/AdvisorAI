import React from 'react';
import mockUserData from '../data/mockUser.json';

export const Profile: React.FC = () => {
  const { profile } = mockUserData;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-serif mb-3">Academic Profile</h1>
        <p className="text-slate-400">Curating triumph in academic ascendance for Julius Sterling</p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Left Column - Profile Info */}
        <div className="col-span-1">
          <div className="card mb-6">
            <h2 className="text-xl font-semibold mb-6">Julius Sterling</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider">Full Name</label>
                <p className="text-sm text-slate-200">{profile.name}</p>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider">Email Address</label>
                <p className="text-sm text-slate-200">{profile.email}</p>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider">Student ID</label>
                <p className="text-sm text-accent-blue">{profile.id}</p>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider">School Placement</label>
                <p className="text-sm text-slate-200">School of Advanced Science</p>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider">Academic Cohort</label>
                <p className="text-sm text-slate-200">{profile.year}</p>
              </div>
            </div>
          </div>

          {/* Strategic Goal */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-6">Strategic Goal</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider">Current Focus</label>
                <p className="text-sm text-slate-200">Mastering Quantum Mechanics</p>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider">Target Milestone</label>
                <p className="text-sm text-slate-200">First Exam Dec 12</p>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider">Confidence Level</label>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex-1 bg-dark-bg rounded-full h-2">
                    <div className="bg-gradient-to-r from-accent-blue to-accent-purple h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  <span className="text-sm text-slate-200">78%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Academic Details & Monograph History */}
        <div className="col-span-2">
          <div className="card mb-6">
            <h2 className="text-xl font-semibold mb-6">Academic Details</h2>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider">Declared Major</label>
                <p className="text-sm text-accent-blue">{profile.major}</p>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider">Declared Minor</label>
                <p className="text-sm text-accent-purple">{profile.minor || 'None'}</p>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider">Academic Status</label>
                <p className="text-sm text-slate-200">{profile.year}</p>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider">GPA (Cumulative)</label>
                <p className="text-2xl font-bold glow-text">{profile.gpa.toFixed(2)}</p>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider">Credits Earned</label>
                <p className="text-sm text-slate-200">{profile.creditsCompleted} / {profile.creditsRequired}</p>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider">Expected Grad.</label>
                <p className="text-sm text-slate-200">{profile.expectedGraduation}</p>
              </div>
            </div>
          </div>

          {/* Monograph History */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Monograph History</h2>
              <button className="text-xs text-accent-blue hover:underline">See All</button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-12 gap-4 text-xs text-slate-500 uppercase tracking-wider pb-3 border-b border-dark-border/30">
                <div className="col-span-4">Monograph Title</div>
                <div className="col-span-2">Date Filed</div>
                <div className="col-span-2">Research Lead</div>
                <div className="col-span-2">Topic</div>
                <div className="col-span-2">History</div>
              </div>

              {/* Monograph Row 1 */}
              <div className="grid grid-cols-12 gap-4 items-center py-3 border-b border-dark-border/20 hover:bg-dark-panel/30 transition-colors rounded-lg px-2">
                <div className="col-span-4">
                  <p className="text-sm text-slate-200 font-medium">String Cosmology Synthesis</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-slate-400">Jan 15, 2026</p>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-accent-blue/20 flex items-center justify-center">
                      <svg className="w-3 h-3 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="text-sm text-accent-blue">Prof. Aris</span>
                  </div>
                </div>
                <div className="col-span-2">
                  <span className="px-2 py-1 bg-accent-blue/10 border border-accent-blue/30 rounded text-xs text-accent-blue">COSMOL</span>
                </div>
                <div className="col-span-2">
                  <button className="text-slate-400 hover:text-accent-blue">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Monograph Row 2 */}
              <div className="grid grid-cols-12 gap-4 items-center py-3 border-b border-dark-border/20 hover:bg-dark-panel/30 transition-colors rounded-lg px-2">
                <div className="col-span-4">
                  <p className="text-sm text-slate-200 font-medium">AI Epistemology Overview</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-slate-400">May 03, 2025</p>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-accent-purple/20 flex items-center justify-center">
                      <svg className="w-3 h-3 text-accent-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="text-sm text-accent-purple">Dr. Liu</span>
                  </div>
                </div>
                <div className="col-span-2">
                  <span className="px-2 py-1 bg-accent-purple/10 border border-accent-purple/30 rounded text-xs text-accent-purple">AI/ML</span>
                </div>
                <div className="col-span-2">
                  <button className="text-slate-400 hover:text-accent-blue">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Monograph Row 3 */}
              <div className="grid grid-cols-12 gap-4 items-center py-3 hover:bg-dark-panel/30 transition-colors rounded-lg px-2">
                <div className="col-span-4">
                  <p className="text-sm text-slate-200 font-medium">Sustainable Graphene</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-slate-400">Aug 29, 2024</p>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                      <svg className="w-3 h-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="text-sm text-green-400">Dr. Patel</span>
                  </div>
                </div>
                <div className="col-span-2">
                  <span className="px-2 py-1 bg-green-500/10 border border-green-500/30 rounded text-xs text-green-400">CHEM</span>
                </div>
                <div className="col-span-2">
                  <button className="text-slate-400 hover:text-accent-blue">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Preferences */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-6">System Preferences</h2>
        <div className="space-y-4">
          {/* Toggle 1 */}
          <div className="flex items-center justify-between py-3">
            <div>
              <h3 className="text-sm font-medium text-slate-200 mb-1">Exam Precedent Mode</h3>
              <p className="text-xs text-slate-500">Send alerts when similar exams historically required 2+ weeks prep</p>
            </div>
            <div className="w-11 h-6 bg-accent-blue rounded-full relative cursor-pointer">
              <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full"></div>
            </div>
          </div>

          {/* Toggle 2 */}
          <div className="flex items-center justify-between py-3 border-t border-dark-border/30">
            <div>
              <h3 className="text-sm font-medium text-slate-200 mb-1">Insight Triggers</h3>
              <p className="text-xs text-slate-500">Notify when AdvisorAI identifies alignment with emerging research topics</p>
            </div>
            <div className="w-11 h-6 bg-accent-blue rounded-full relative cursor-pointer">
              <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full"></div>
            </div>
          </div>

          {/* Toggle 3 */}
          <div className="flex items-center justify-between py-3 border-t border-dark-border/30">
            <div>
              <h3 className="text-sm font-medium text-slate-200 mb-1">High-Confidence AI</h3>
              <p className="text-xs text-slate-500">Only surface suggestions with ≥85% relevance to current trajectory</p>
            </div>
            <div className="w-11 h-6 bg-slate-600 rounded-full relative cursor-pointer">
              <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
