import React, { useState } from 'react';
import { BookOpen, Users, Building2, Award } from 'lucide-react';

const HomePage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const testimonials = [
    {
      name: "John Doe",
      role: "Software Developer",
      content: "The training at RS Softtech helped me transition into a tech career successfully.",
      company: "Tech Corp"
    },
    {
      name: "Jane Smith",
      role: "Project Manager",
      content: "Excellent corporate training programs that helped our entire team level up.",
      company: "Innovation Labs"
    }
  ];

  const features = [
    {
      icon: <BookOpen className="w-12 h-12 text-blue-600" />,
      title: "Expert-Led Courses",
      description: "Learn from industry professionals with years of practical experience"
    },
    {
      icon: <Users className="w-12 h-12 text-blue-600" />,
      title: "Interactive Learning",
      description: "Engage in hands-on projects and real-world applications"
    },
    {
      icon: <Building2 className="w-12 h-12 text-blue-600" />,
      title: "Corporate Training",
      description: "Customized training solutions for businesses"
    },
    {
      icon: <Award className="w-12 h-12 text-blue-600" />,
      title: "Certification",
      description: "Industry-recognized certificates upon course completion"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transform Your Career with RS Softtech
            </h1>
            <p className="text-xl mb-8">
              Industry-leading training programs to help you master the skills that matter
            </p>
            <div className="space-x-4">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Explore Courses
              </button>
              <button className="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose RS Softtech?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center hover:transform hover:scale-105 transition-transform">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Courses Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Web Development', 'Data Science', 'Cloud Computing'].map((course, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{course}</h3>
                  <p className="text-gray-600 mb-4">
                    Master the fundamentals and advanced concepts in {course.toLowerCase()}
                  </p>
                  <button className="text-blue-600 font-semibold hover:text-blue-800">
                    Learn More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Students Say</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <p className="text-xl italic mb-6">{testimonials[currentTestimonial].content}</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="ml-4">
                  <p className="font-semibold">{testimonials[currentTestimonial].name}</p>
                  <p className="text-gray-600">{testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full ${
                    currentTestimonial === index ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;