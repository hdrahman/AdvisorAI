import React, { useState } from 'react';
import { Card, Button } from '../components/common';
import mockUserData from '../data/mockUser.json';

export const Chat: React.FC = () => {
  const { chatHistory } = mockUserData;
  const [inputValue, setInputValue] = useState('');

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold mb-2">Chat with AI Advisor</h1>
        <p className="text-gray-400">Get personalized course recommendations and academic advice</p>
      </div>

      {/* Chat Messages */}
      <Card className="flex-1 flex flex-col overflow-hidden mb-4">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatHistory.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-4 ${
                  message.sender === 'user'
                    ? 'bg-accent-blue text-white'
                    : 'bg-dark-bg text-gray-100'
                }`}
              >
                <div className="text-sm mb-1">
                  {message.content}
                </div>
                <div
                  className={`text-xs ${
                    message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'
                  }`}
                >
                  {formatTimestamp(message.timestamp)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="border-t border-dark-border p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message... (Demo mode - messages won't send)"
              className="flex-1 bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent-blue"
              disabled
            />
            <Button variant="primary" disabled>
              Send
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            This is a demo with hardcoded conversation. In the full version, you'll be able to send messages.
          </p>
        </div>
      </Card>
    </div>
  );
};
