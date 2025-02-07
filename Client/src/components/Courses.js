import React, { useState } from 'react';
import { Search, Filter, Star } from 'lucide-react';

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'it', name: 'IT & Software' },
    { id: 'management', name: 'Management' },
    { id: 'soft-skills', name: 'Soft Skills' }
  ];

  const courses = [
    {
      id: 1,
      title: 'Full Stack Web Development',
      category: 'it',
      rating: 4.8,
      students: 1234,
      duration: '12 weeks',
      price: 599,
      image: '/api/placeholder/400/250'
    },
    {
      id: 2,
      title: 'Project Management Professional',
      category: 'management',
      rating: 4.7,
      students: 856,
      duration: '8 weeks',
      price: 499,
      image: '/api/placeholder/400/250'
    }
    // Add more courses as needed
  ];

  const filteredCourses = courses.filter(course => 
    (selectedCategory === 'all' || course.category === selectedCategory) &&
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`px-4 py-2 rounded-lg ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <div className="flex items-center mb-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-1 text-gray-600">{course.rating}</span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-gray-600">{course.students} students</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600">{course.duration}</span>
                  <span className="text-xl font-bold text-blue-600">${course.price}</span>
                </div>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;