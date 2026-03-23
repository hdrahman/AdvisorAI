import React from 'react';
import { Card, Badge } from '../components/common';
import mockUserData from '../data/mockUser.json';
import type { Course } from '../types';

export const Roadmap: React.FC = () => {
  const { roadmap } = mockUserData;

  const getStatusBadgeVariant = (status: Course['status']) => {
    switch (status) {
      case 'completed':
        return 'completed';
      case 'in-progress':
        return 'in-progress';
      case 'planned':
        return 'planned';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: Course['status']) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'planned':
        return 'Planned';
      default:
        return status;
    }
  };

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Academic Roadmap</h1>
        <p className="text-gray-400">Your complete academic journey</p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-dark-border"></div>

        {/* Semesters */}
        <div className="space-y-8">
          {roadmap.semesters.map((semester, index) => {
            const isCurrentSemester = semester.courses.some(c => c.status === 'in-progress');
            const isCompletedSemester = semester.courses.every(c => c.status === 'completed');
            const isFutureSemester = semester.courses.every(c => c.status === 'planned');

            return (
              <div key={semester.term} className="relative pl-20">
                {/* Timeline dot */}
                <div
                  className={`absolute left-6 top-6 w-5 h-5 rounded-full border-4 ${
                    isCurrentSemester
                      ? 'bg-accent-blue border-accent-blue'
                      : isCompletedSemester
                      ? 'bg-green-500 border-green-500'
                      : 'bg-gray-600 border-gray-600'
                  }`}
                ></div>

                <Card
                  className={`${
                    isCurrentSemester
                      ? 'border-accent-blue border-2'
                      : ''
                  }`}
                >
                  {/* Semester Header */}
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-dark-border">
                    <div>
                      <h2 className="text-2xl font-bold">{semester.term}</h2>
                      <p className="text-gray-400">{semester.totalCredits} credits</p>
                    </div>
                    {isCurrentSemester && (
                      <Badge variant="in-progress">Current Semester</Badge>
                    )}
                    {isCompletedSemester && (
                      <Badge variant="completed">Completed</Badge>
                    )}
                    {isFutureSemester && (
                      <Badge variant="planned">Planned</Badge>
                    )}
                  </div>

                  {/* Courses */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {semester.courses.map((course) => (
                      <div
                        key={course.code}
                        className="p-4 bg-dark-bg rounded-lg border border-dark-border"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="font-bold text-lg">{course.code}</h3>
                            <p className="text-sm text-gray-300">{course.name}</p>
                          </div>
                          <Badge variant={getStatusBadgeVariant(course.status)}>
                            {getStatusLabel(course.status)}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between mt-3 text-sm">
                          <span className="text-gray-400">{course.credits} credits</span>
                          <span className={`px-2 py-1 rounded text-xs ${
                            course.type === 'Major'
                              ? 'bg-blue-900 text-blue-200'
                              : course.type === 'Minor'
                              ? 'bg-purple-900 text-purple-200'
                              : course.type === 'Core'
                              ? 'bg-orange-900 text-orange-200'
                              : 'bg-gray-700 text-gray-300'
                          }`}>
                            {course.type}
                          </span>
                        </div>
                        {course.grade && (
                          <div className="mt-2 text-sm">
                            <span className="text-gray-400">Grade: </span>
                            <span className="font-medium text-green-400">{course.grade}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
