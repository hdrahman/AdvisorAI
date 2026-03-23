import React, { useState } from 'react';
import mockUserData from '../data/mockUser.json';

export const Chat: React.FC = () => {
  const { chatHistory } = mockUserData;
  const [inputValue, setInputValue] = useState('');

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-serif mb-3">Advising Assistant</h1>
        <p className="text-slate-400">Get personalized course recommendations and academic guidance</p>
      </div>

      {/* Chat Container */}
      <div className="card flex-1 flex flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {chatHistory.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-br from-accent-blue to-accent-purple rounded-2xl p-4 shadow-glow'
                    : 'bg-dark-bg/60 rounded-2xl p-4 border border-dark-border'
                }`}
              >
                <div className="text-sm leading-relaxed mb-2">
                  {message.content}
                </div>
                <div
                  className={`text-xs ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-slate-500'
                  }`}
                >
                  {formatTimestamp(message.timestamp)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="border-t border-dark-border/50 p-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about courses, schedules, requirements..."
              className="flex-1 bg-dark-bg/50 border border-dark-border rounded-xl px-5 py-3.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-accent-blue/50 transition-colors"
              disabled
            />
            <button className="btn btn-primary px-8">
              Send
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-accent-purple rounded-full animate-pulse"></span>
            Demo mode: This is a simulated conversation. Full AI integration coming soon.
          </p>
        </div>
      </div>
    </div>
  );
};
