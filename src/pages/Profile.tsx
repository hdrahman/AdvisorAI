import React from 'react';
import { Card } from '../components/common';
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
    <div className="max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Student Profile</h1>
        <p className="text-gray-400">Your academic information and progress</p>
      </div>

      {/* Profile Overview */}
      <Card className="mb-6">
        <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Full Name</label>
            <p className="text-lg font-medium">{profile.name}</p>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <p className="text-lg font-medium">{profile.email}</p>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Student ID</label>
            <p className="text-lg font-medium">{profile.id}</p>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Academic Advisor</label>
            <p className="text-lg font-medium">{profile.advisor}</p>
          </div>
        </div>
      </Card>

      {/* Academic Details */}
      <Card className="mb-6">
        <h2 className="text-2xl font-bold mb-6">Academic Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Major</label>
            <p className="text-lg font-medium">{profile.major}</p>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Minor</label>
            <p className="text-lg font-medium">{profile.minor || 'None'}</p>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Class Year</label>
            <p className="text-lg font-medium">{profile.year}</p>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Expected Graduation</label>
            <p className="text-lg font-medium">{profile.expectedGraduation}</p>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Cumulative GPA</label>
            <p className="text-lg font-medium text-accent-blue">{profile.gpa.toFixed(2)}</p>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Credits Completed</label>
            <p className="text-lg font-medium">
              {profile.creditsCompleted} / {profile.creditsRequired}
            </p>
          </div>
        </div>
      </Card>

      {/* Academic Progress */}
      <Card className="mb-6">
        <h2 className="text-2xl font-bold mb-6">Academic Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-dark-bg rounded-lg">
            <div className="text-3xl font-bold text-green-400 mb-2">{completedCourses.length}</div>
            <div className="text-sm text-gray-400">Courses Completed</div>
          </div>
          <div className="text-center p-4 bg-dark-bg rounded-lg">
            <div className="text-3xl font-bold text-blue-400 mb-2">{inProgressCourses.length}</div>
            <div className="text-sm text-gray-400">Current Courses</div>
          </div>
          <div className="text-center p-4 bg-dark-bg rounded-lg">
            <div className="text-3xl font-bold text-purple-400 mb-2">
              {roadmap.semesters.length}
            </div>
            <div className="text-sm text-gray-400">Total Semesters</div>
          </div>
        </div>
      </Card>

      {/* Grade Distribution */}
      <Card>
        <h2 className="text-2xl font-bold mb-6">Grade Distribution</h2>
        <div className="space-y-3">
          {Object.entries(gradeDistribution)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([grade, count]) => {
              const percentage = (count / completedCourses.length) * 100;
              return (
                <div key={grade}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Grade {grade}</span>
                    <span className="text-gray-400">
                      {count} {count === 1 ? 'course' : 'courses'} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-dark-bg rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        grade === 'A'
                          ? 'bg-green-500'
                          : grade === 'B'
                          ? 'bg-blue-500'
                          : 'bg-yellow-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
        </div>
      </Card>
    </div>
  );
};
