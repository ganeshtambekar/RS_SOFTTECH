import React, { useRef } from 'react';
import { Building2, Users, Target, Briefcase, Send } from 'lucide-react';

const Corporate = () => {
  const contactFormRef = useRef(null);

  const scrollToForm = () => {
    contactFormRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  const trainingPrograms = [
    {
      title: 'Technical Skills Development',
      description: 'Comprehensive training in programming, cloud computing, and DevOps.',
      duration: '4-12 weeks',
      mode: 'Hybrid'
    },
    {
      title: 'Leadership & Management',
      description: 'Develop effective leadership and team management skills.',
      duration: '6-8 weeks',
      mode: 'Online/Offline'
    },
    {
      title: 'Digital Transformation',
      description: 'Guide your organization through digital transformation initiatives.',
      duration: '8-16 weeks',
      mode: 'Customizable'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Transform Your Workforce
            </h1>
            <p className="text-xl mb-8">
              Customized corporate training solutions to upskill your team and drive business growth
            </p>
            <button 
              onClick={scrollToForm}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Request Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Corporate Training?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Target className="w-12 h-12 text-blue-600" />,
                title: 'Customized Programs',
                description: 'Training solutions tailored to your business needs'
              },
              {
                icon: <Users className="w-12 h-12 text-blue-600" />,
                title: 'Expert Trainers',
                description: 'Learn from industry professionals with proven expertise'
              },
              {
                icon: <Building2 className="w-12 h-12 text-blue-600" />,
                title: 'Flexible Delivery',
                description: 'Choose between online, offline, or hybrid training modes'
              },
              {
                icon: <Briefcase className="w-12 h-12 text-blue-600" />,
                title: 'Practical Focus',
                description: 'Real-world applications and hands-on projects'
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="flex justify-center mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Training Programs */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Training Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trainingPrograms.map((program, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{program.title}</h3>
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Duration: {program.duration}</span>
                    <span>Mode: {program.mode}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div ref={contactFormRef} className="py-16 bg-gray-50 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Get in Touch</h2>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Training Requirements
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Corporate;