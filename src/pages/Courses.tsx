import React, { useState } from 'react';
import { Card } from '../components/common';
import mockCourses from '../data/mockCourses.json';

export const Courses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');

  // Get unique departments
  const departments = ['All', ...Array.from(new Set(mockCourses.map(c => c.department)))];

  // Get unique types
  const types = ['All', 'Major', 'Minor', 'Core', 'Elective'];

  // Filter courses
  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch =
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      selectedDepartment === 'All' || course.department === selectedDepartment;

    const matchesType = selectedType === 'All' || course.type === selectedType;

    return matchesSearch && matchesDepartment && matchesType;
  });

  return (
    <div className="max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Course Browser</h1>
        <p className="text-gray-400">Explore available courses across all departments</p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium mb-2">Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search courses..."
              className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-accent-blue"
            />
          </div>

          {/* Department Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Department</label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-blue"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-blue"
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-gray-400">
          Showing {filteredCourses.length} of {mockCourses.length} courses
        </p>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCourses.map((course) => (
          <Card key={course.code}>
            <div className="mb-3">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-lg">{course.code}</h3>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    course.type === 'Major'
                      ? 'bg-blue-900 text-blue-200'
                      : course.type === 'Minor'
                      ? 'bg-purple-900 text-purple-200'
                      : course.type === 'Core'
                      ? 'bg-orange-900 text-orange-200'
                      : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  {course.type}
                </span>
              </div>
              <h4 className="text-sm text-gray-300 mb-2">{course.name}</h4>
              <p className="text-xs text-gray-400 mb-3">{course.description}</p>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Credits:</span>
                <span className="font-medium">{course.credits}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Department:</span>
                <span className="font-medium">{course.department}</span>
              </div>
              {course.prerequisites && course.prerequisites.length > 0 && (
                <div>
                  <span className="text-gray-400 block mb-1">Prerequisites:</span>
                  <div className="flex flex-wrap gap-1">
                    {course.prerequisites.map((prereq) => (
                      <span
                        key={prereq}
                        className="px-2 py-1 bg-dark-bg border border-dark-border rounded text-xs"
                      >
                        {prereq}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <span className="text-gray-400 block mb-1">Available:</span>
                <div className="flex flex-wrap gap-1">
                  {course.availableSemesters.map((semester) => (
                    <span
                      key={semester}
                      className="px-2 py-1 bg-dark-bg border border-dark-border rounded text-xs"
                    >
                      {semester}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <Card className="text-center py-12">
          <p className="text-gray-400">No courses found matching your filters.</p>
        </Card>
      )}
    </div>
  );
};
