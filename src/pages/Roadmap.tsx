import React from 'react';
import { Badge } from '../components/common';
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
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-serif mb-3">Academic Roadmap</h1>
        <p className="text-slate-400">Track your complete academic journey from freshman to graduation</p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-blue via-accent-purple to-transparent opacity-30"></div>

        {/* Semesters */}
        <div className="space-y-8">
          {roadmap.semesters.map((semester) => {
            const isCurrentSemester = semester.courses.some(c => c.status === 'in-progress');
            const isCompletedSemester = semester.courses.every(c => c.status === 'completed');
            const isFutureSemester = semester.courses.every(c => c.status === 'planned');

            return (
              <div key={semester.term} className="relative pl-16">
                {/* Timeline dot */}
                <div
                  className={`absolute left-4 top-8 w-4 h-4 rounded-full ${
                    isCurrentSemester
                      ? 'bg-accent-blue shadow-glow animate-pulse'
                      : isCompletedSemester
                      ? 'bg-accent-blue/50'
                      : 'bg-slate-600'
                  }`}
                ></div>

                <div
                  className={`card ${
                    isCurrentSemester
                      ? 'border-accent-blue/50 shadow-glow-lg'
                      : ''
                  }`}
                >
                  {/* Semester Header */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-dark-border/50">
                    <div>
                      <h2 className="text-2xl font-serif mb-1">{semester.term}</h2>
                      <p className="text-slate-400 text-sm">{semester.totalCredits} credits total</p>
                    </div>
                    {isCurrentSemester && (
                      <Badge variant="in-progress">In Progress</Badge>
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
                        className="p-4 bg-dark-bg/40 rounded-xl border border-dark-border/40 hover:border-accent-blue/30 transition-all"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-base mb-1">{course.code}</h3>
                            <p className="text-sm text-slate-400">{course.name}</p>
                          </div>
                          <Badge variant={getStatusBadgeVariant(course.status as Course['status'])}>
                            {getStatusLabel(course.status as Course['status'])}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between mt-3 text-sm">
                          <span className="text-slate-500">{course.credits} credits</span>
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                            course.type === 'Major'
                              ? 'bg-accent-blue/20 text-accent-blue'
                              : course.type === 'Minor'
                              ? 'bg-accent-purple/20 text-accent-purple'
                              : course.type === 'Core'
                              ? 'bg-orange-500/20 text-orange-400'
                              : 'bg-slate-700 text-slate-300'
                          }`}>
                            {course.type}
                          </span>
                        </div>
                        {'grade' in course && course.grade && (
                          <div className="mt-3 pt-3 border-t border-dark-border/30 text-sm">
                            <span className="text-slate-500">Final Grade: </span>
                            <span className="font-semibold text-accent-blue">{course.grade}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
