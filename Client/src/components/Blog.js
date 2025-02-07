import React, { useState } from 'react';
import { Calendar, UserCircle, BookOpen } from 'lucide-react';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts = [
    {
      id: 1,
      title: 'Top 10 Tech Skills to Learn in 2024',
      author: 'John Doe',
      date: 'January 15, 2024',
      category: 'technology',
      excerpt: 'Discover the most in-demand tech skills that will boost your career in the coming year.',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'Effective Leadership in the Digital Age',
      author: 'Jane Smith',
      date: 'February 1, 2024',
      category: 'management',
      excerpt: 'Explore strategies for leading teams in an increasingly digital and remote work environment.',
      readTime: '7 min read'
    },
    {
      id: 3,
      title: 'Mastering Soft Skills for Professional Growth',
      author: 'Mike Johnson',
      date: 'January 30, 2024',
      category: 'soft-skills',
      excerpt: 'Learn how to develop and improve essential soft skills that employers value.',
      readTime: '6 min read'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'technology', name: 'Technology' },
    { id: 'management', name: 'Management' },
    { id: 'soft-skills', name: 'Soft Skills' }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            RS Softtech Blog
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest insights, trends, and learning resources 
            from industry experts at RS Softtech.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center mb-12 space-x-4">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-blue-50'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <div 
              key={post.id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <UserCircle className="w-5 h-5" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>{post.date}</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-500 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    {post.readTime}
                  </span>
                  <button className="text-blue-600 hover:text-blue-800 font-semibold">
                    Read More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;