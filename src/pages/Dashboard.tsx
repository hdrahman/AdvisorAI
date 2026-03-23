import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/common';
import mockUserData from '../data/mockUser.json';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { profile, roadmap } = mockUserData;

  // Calculate current semester courses
  const currentSemester = roadmap.semesters.find(
    (sem) => sem.courses.some((c) => c.status === 'in-progress')
  );

  // Calculate stats
  const creditsRemaining = profile.creditsRequired - profile.creditsCompleted;
  const progressPercentage = (profile.creditsCompleted / profile.creditsRequired) * 100;

  const quickAccessCards = [
    {
      title: 'Chat with Advisor',
      description: 'Get personalized course recommendations',
      icon: '💬',
      path: '/chat',
      color: 'bg-blue-900 border-blue-700'
    },
    {
      title: 'View Roadmap',
      description: 'See your complete academic timeline',
      icon: '🗺️',
      path: '/roadmap',
      color: 'bg-purple-900 border-purple-700'
    },
    {
      title: 'Browse Courses',
      description: 'Explore available courses',
      icon: '📚',
      path: '/courses',
      color: 'bg-green-900 border-green-700'
    },
    {
      title: 'My Profile',
      description: 'View and update your information',
      icon: '👤',
      path: '/profile',
      color: 'bg-orange-900 border-orange-700'
    }
  ];

  return (
    <div className="max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {profile.name.split(' ')[0]}!</h1>
        <p className="text-gray-400">Here's your academic overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <div className="text-sm text-gray-400 mb-1">GPA</div>
          <div className="text-2xl font-bold text-accent-blue">{profile.gpa.toFixed(2)}</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-400 mb-1">Credits Completed</div>
          <div className="text-2xl font-bold text-green-400">{profile.creditsCompleted}</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-400 mb-1">Credits Remaining</div>
          <div className="text-2xl font-bold text-orange-400">{creditsRemaining}</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-400 mb-1">Expected Graduation</div>
          <div className="text-2xl font-bold">{profile.expectedGraduation}</div>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card className="mb-8">
        <div className="mb-2 flex justify-between">
          <span className="text-sm font-medium">Degree Progress</span>
          <span className="text-sm text-gray-400">{progressPercentage.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-dark-bg rounded-full h-3">
          <div
            className="bg-accent-blue h-3 rounded-full transition-all"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </Card>

      {/* Current Semester */}
      {currentSemester && (
        <Card className="mb-8">
          <h2 className="text-xl font-bold mb-4">Current Semester: {currentSemester.term}</h2>
          <div className="space-y-3">
            {currentSemester.courses.map((course) => (
              <div
                key={course.code}
                className="flex items-center justify-between p-3 bg-dark-bg rounded-lg"
              >
                <div>
                  <div className="font-medium">{course.code}: {course.name}</div>
                  <div className="text-sm text-gray-400">{course.credits} credits</div>
                </div>
                <span className="px-3 py-1 bg-blue-900 text-blue-200 border border-blue-700 rounded text-xs">
                  In Progress
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-dark-border">
            <div className="text-sm text-gray-400">
              Total: {currentSemester.totalCredits} credits
            </div>
          </div>
        </Card>
      )}

      {/* Quick Access */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickAccessCards.map((card) => (
            <Card
              key={card.path}
              onClick={() => navigate(card.path)}
              className={`${card.color} border-2`}
            >
              <div className="text-4xl mb-3">{card.icon}</div>
              <h3 className="font-bold mb-1">{card.title}</h3>
              <p className="text-sm text-gray-300">{card.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
