import React, { useState } from 'react';
import routes from '../constants/routes';
import { BookOpen, Users, Building2, Award } from 'lucide-react';
import ContactPage from './ContactPage';
import Courses from './Courses'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const navigate = useNavigate();
  const testimonials = [
    {
      name: "mark zuckerberg",
      role: "Software Developer",
      content: "The training at RS SOFTTECS helped me transition into a tech career successfully.",
      company: "Tech Corp",
      image: "/mark.png" // Replace with the correct image path
    },
    {
      name: "Jane Smith",
      role: "Project Manager",
      content: "Excellent corporate training programs that helped our entire team level up.",
      company: "Innovation Labs",
      image: "/mark.png" // Replace with the correct image path
    }
  ];
  

  //  courses 
  const courses = [
    {
      title: 'Web Development',
      image: '/web_dev.png',
      description: 'Master the fundamentals and advanced concepts in web development',
      link: '/courses/web-development'
    },
    {
      title: 'Data Science',
      image: '/data_science.png',
      description: 'Learn data analysis, visualization, and machine learning techniques',
      link: '/courses/data-science'
    },
    {
      title: 'Java Full Stack',
      image: '/java_full.png',
      description: 'Explore AWS, Azure, and Google Cloud platforms and services',
      link: '/courses/cloud-computing'
    },
    {
      title: 'Python Programming',
      image: '/python.png',
      description: 'Build applications and automate tasks with Python programming',
      link: '/courses/python'
    },
    {
      title: 'Software Testing',
      image: '/software.png',
      description: 'Master Software automation and manual testing',
      link: '/courses/cloud'
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
            <button 
  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors" 
  onClick={() => navigate(routes.courses)}>
  Explore Courses
</button>

<button 
  className="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
  onClick={() => navigate(routes.contact)}>
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

    
    {/* Popular Courses Section with Swiper */}
    <div className="py-16 relative">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-12">Popular Courses</h2>

    {/* Custom Navigation Arrows */}
    <div className="absolute top-1/2 -translate-y-1/2 left-0 md:left-[-50px] lg:left-[-60px] z-10 cursor-pointer custom-prev text-4xl text-blue-600 hover:text-blue-800">
      &#10094; {/* Custom Left Arrow */}
    </div>
    <div className="absolute top-1/2 -translate-y-1/2 right-0 md:right-[-50px] lg:right-[-60px] z-10 cursor-pointer custom-next text-4xl text-blue-600 hover:text-blue-800">
      &#10095; {/* Custom Right Arrow */}
    </div>

    <div className="relative">
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        modules={[Navigation, Pagination, Autoplay]}
        className="mySwiper"
      >
      {courses.map((course, index) => (
  <SwiperSlide key={index}>
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
      {/* Image Container */}
     {/* Image Container */}
<div className="h-54 w-full overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-300 ease-in-out hover:scale-105 relative group">
  <img  
    src={course.image} 
    alt={`${course.title} Course`} 
    className="w-full h-full object-cover object-center"
  />
  <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
    <span className="text-white font-semibold text-lg">Preview Course</span>
  </div>
</div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <a 
                  href={course.link} 
                  className="inline-block text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                >
                  Learn More →
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </div>
</div>


    

      {/* Testimonials Section */}
      <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Students Say</h2>
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <p className="text-xl italic mb-6">{testimonials[currentTestimonial].content}</p>
            <div className="flex items-center justify-center">
              <img
                src={testimonials[currentTestimonial].image}
                alt={testimonials[currentTestimonial].name}
                className="w-16 h-16 rounded-full object-cover shadow-md"
              />
              <div className="ml-4">
                <p className="font-semibold">{testimonials[currentTestimonial].name}</p>
                <p className="text-gray-600">
                  {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                </p>
              </div>
            </div>
          </div>
          {/* Dots for navigation */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full ${
                  currentTestimonial === index ? "bg-blue-600" : "bg-gray-300"
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