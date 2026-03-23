import React, { useState } from 'react';
import mockUserData from '../data/mockUser.json';

export const Chat: React.FC = () => {
  const { chatHistory, profile } = mockUserData;
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="flex h-screen -m-8">
      {/* Left Sidebar */}
      <div className="w-64 bg-dark-panel/40 backdrop-blur-xl border-r border-dark-border/30 p-6 flex flex-col">
        <div className="mb-8">
          <h3 className="text-xs uppercase tracking-wider text-slate-500 mb-3">Current Goal</h3>
          <div className="bg-dark-bg/60 rounded-xl p-4 border border-dark-border/40">
            <h4 className="font-semibold mb-1 text-sm">Mastering Quantum Mechanics</h4>
            <p className="text-xs text-slate-400">Target: First Exam Dec 12</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xs uppercase tracking-wider text-slate-500 mb-3">Prerequisite Map</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-accent-blue"></div>
              <span className="text-slate-300">Calculus III</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-accent-blue"></div>
              <span className="text-slate-300">Linear Algebra</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-slate-600"></div>
              <span className="text-slate-500">Modern Physics</span>
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <button className="w-full bg-accent-blue/20 hover:bg-accent-blue/30 border border-accent-blue/40 text-accent-blue rounded-xl py-3 px-4 text-sm font-medium transition-all flex items-center justify-center gap-2">
            <span>+</span>
            <span>New Project</span>
          </button>
        </div>

        <div className="mt-4">
          <button className="w-full bg-dark-panel-hover hover:bg-dark-border border border-dark-border text-slate-400 rounded-xl py-3 px-4 text-sm font-medium transition-all flex items-center justify-center gap-2">
            <span>?</span>
            <span>Support</span>
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Welcome Message */}
        <div className="flex-1 flex items-center justify-center p-12">
          <div className="max-w-3xl w-full">
            {/* Avatar */}
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent-purple/30 to-accent-blue/30 border-2 border-accent-purple/40 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
            </div>

            <h1 className="text-5xl font-serif text-center mb-6 leading-tight">
              How shall we illuminate your<br />path today?
            </h1>

            {/* Sample Conversation */}
            <div className="space-y-4 mb-8">
              {chatHistory.messages.slice(0, 2).map((message, idx) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      message.sender === 'user'
                        ? 'bg-dark-panel border border-dark-border/50'
                        : 'bg-dark-bg/60 border border-dark-border/40'
                    }`}
                  >
                    <p className="text-sm text-slate-300 leading-relaxed">{message.content}</p>
                  </div>
                </div>
              ))}

              {/* Action Buttons */}
              <div className="flex justify-center gap-3 mt-6">
                <button className="px-5 py-2.5 bg-dark-panel hover:bg-dark-panel-hover border border-dark-border rounded-xl text-sm text-slate-300 transition-all flex items-center gap-2">
                  <span>📋</span>
                  <span>Check Prereqs</span>
                </button>
                <button className="px-5 py-2.5 bg-dark-panel hover:bg-dark-panel-hover border border-dark-border rounded-xl text-sm text-slate-300 transition-all flex items-center gap-2">
                  <span>🗺️</span>
                  <span>Build Roadmap</span>
                </button>
                <button className="px-5 py-2.5 bg-dark-panel hover:bg-dark-panel-hover border border-dark-border rounded-xl text-sm text-slate-300 transition-all flex items-center gap-2">
                  <span>✏️</span>
                  <span>Explain Gen-Ed</span>
                </button>
              </div>
            </div>

            {/* Audio Visualizer */}
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-1 h-12">
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-slate-600 rounded-full"
                    style={{
                      height: `${Math.random() * 40 + 10}px`,
                      opacity: 0.3
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-dark-border/30 p-6 bg-dark-panel/20 backdrop-blur-xl">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <button className="w-10 h-10 rounded-xl bg-dark-panel hover:bg-dark-panel-hover border border-dark-border flex items-center justify-center text-slate-400 transition-all">
              <span className="text-lg">📎</span>
            </button>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask your Advisor anything..."
              className="flex-1 bg-dark-bg/50 border border-dark-border rounded-xl px-5 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-accent-blue/50 transition-colors"
            />
            <button className="w-10 h-10 rounded-xl bg-dark-panel hover:bg-dark-panel-hover border border-dark-border flex items-center justify-center text-slate-400 transition-all">
              <span className="text-lg">🎤</span>
            </button>
            <button className="w-10 h-10 rounded-xl bg-accent-blue hover:bg-accent-blue-glow text-dark-bg flex items-center justify-center transition-all shadow-glow">
              <span className="text-lg">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Academic Outlook */}
      <div className="w-80 bg-dark-panel/40 backdrop-blur-xl border-l border-dark-border/30 p-6">
        <h3 className="text-lg font-semibold mb-6">Academic Outlook</h3>

        {/* GPA Projection */}
        <div className="mb-8">
          <div className="text-xs uppercase tracking-wider text-slate-500 mb-3">GPA Projection</div>
          <div className="bg-dark-bg/60 rounded-xl p-5 border border-dark-border/40">
            <div className="text-4xl font-bold glow-text mb-1">{profile.gpa}</div>
            <div className="text-sm text-green-400 flex items-center gap-1">
              <span>↗</span>
              <span>+0.12</span>
            </div>
            <div className="mt-4 bg-dark-bg rounded-full h-2">
              <div
                className="bg-gradient-to-r from-accent-blue to-accent-purple h-2 rounded-full"
                style={{ width: '85%' }}
              ></div>
            </div>
          </div>
        </div>

        {/* Upcoming Milestone */}
        <div className="mb-8">
          <div className="text-xs uppercase tracking-wider text-slate-500 mb-3">Upcoming Milestone</div>
          <div className="bg-gradient-to-br from-accent-purple/20 to-accent-blue/20 rounded-xl p-4 border border-accent-purple/30">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-accent-purple/40 flex items-center justify-center">
                <span className="text-sm">🎯</span>
              </div>
              <span className="text-sm font-medium">Senior Research Proposal</span>
            </div>
            <button className="text-xs text-accent-blue hover:underline">View Project →</button>
          </div>
        </div>

        {/* Quick Insights */}
        <div>
          <div className="text-xs uppercase tracking-wider text-slate-500 mb-3">Quick Insight</div>
          <div className="bg-dark-bg/60 rounded-xl p-4 border border-dark-border/40">
            <p className="text-sm text-slate-300 leading-relaxed mb-3">
              I noticed you're excelling in Logic Foundations. Have you considered
              adding a minor in Complexity Theory?
            </p>
            <button className="text-xs text-accent-blue font-medium hover:underline">
              Explore Question →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
