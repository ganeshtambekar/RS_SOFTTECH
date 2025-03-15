import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Star, Clock, Calendar, User, Award, ChevronRight, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast,ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// toast.configure();
// Import Swiper styles
// Note: In a real application, you would import these from node_modules
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// Sample data
const categories = [
  {
    id: 1,
    name: "Web Development",
    courses: [
      {
        id: 101,
        title: "Full-Stack Web Development",
        instructor: "Sarah Johnson",
        price: 89.99,
        ratings: 4.8,
        reviewCount: 324,
        description: "Master both frontend and backend technologies to become a complete web developer.",
        duration: "12 weeks",
        image: "/web_dev.png",
        level: "Intermediate",
        syllabus: [
          "HTML5, CSS3 & JavaScript Fundamentals",
          "React.js & State Management",
          "Node.js & Express Fundamentals",
          "Database Design with MongoDB",
          "Authentication & Security",
          "API Development & Integration",
          "Deployment & DevOps Basics"
        ],
        learningOutcomes: [
          "Build complete web applications from scratch",
          "Implement authentication and authorization",
          "Work with databases and REST APIs",
          "Deploy applications to production environments"
        ],
        prerequisites: ["Basic programming knowledge", "HTML & CSS fundamentals"],
        type: "Long-term"
      },
      {
        id: 102,
        title: "Responsive Web Design",
        instructor: "Michael Chen",
        price: 49.99,
        ratings: 4.7,
        reviewCount: 215,
        description: "Create beautiful, responsive websites that work on any device.",
        duration: "4 weeks",
        image: "/responsive_webDev.jpg",
        level: "Beginner",
        syllabus: [
          "Flexbox & Grid Layout",
          "Mobile-First Design",
          "CSS Media Queries",
          "Responsive Images & Typography",
          "Accessible Design Principles"
        ],
        learningOutcomes: [
          "Design responsive layouts for all devices",
          "Implement mobile-first design principles",
          "Create accessible websites"
        ],
        prerequisites: ["Basic HTML & CSS knowledge"],
        type: "Short-term"
      },
      {
        id: 103,
        title: "JavaScript Mastery",
        instructor: "David Wilson",
        price: 59.99,
        ratings: 4.6,
        reviewCount: 189,
        description: "Become an expert in JavaScript and modern ES6+ features.",
        duration: "6 weeks",
        image: "/javascript.png",
        level: "Intermediate",
        syllabus: [
          "JavaScript Fundamentals",
          "ES6+ Features",
          "Asynchronous JavaScript",
          "Object-Oriented JavaScript",
          "Functional Programming",
          "Testing & Debugging"
        ],
        learningOutcomes: [
          "Write clean, efficient JavaScript code",
          "Use modern JS features effectively",
          "Implement asynchronous programming patterns"
        ],
        prerequisites: ["Basic JavaScript knowledge"],
        type: "Short-term"
      }
    ]
  },
  {
    id: 2,
    name: "Data Science",
    courses: [
      {
        id: 201,
        title: "Data Science Fundamentals",
        instructor: "Emily Zhang",
        price: 79.99,
        ratings: 4.9,
        reviewCount: 287,
        description: "Learn the core concepts of data science, statistics, and machine learning.",
        duration: "10 weeks",
        image: "/data_science.png",
        level: "Beginner",
        syllabus: [
          "Introduction to Data Science",
          "Statistics & Probability",
          "Data Cleaning & Preprocessing",
          "Exploratory Data Analysis",
          "Machine Learning Basics",
          "Data Visualization"
        ],
        learningOutcomes: [
          "Perform data analysis and visualization",
          "Apply statistical methods to datasets",
          "Build basic machine learning models"
        ],
        prerequisites: ["Basic math knowledge", "Some programming experience"],
        type: "Long-term"
      },
      {
        id: 202,
        title: "Python for Data Analysis",
        instructor: "Robert Brown",
        price: 69.99,
        ratings: 4.7,
        reviewCount: 198,
        description: "Master Python tools like Pandas, NumPy, and Matplotlib for data analysis.",
        duration: "8 weeks",
        image: "/python.png",
        level: "Intermediate",
        syllabus: [
          "Python Fundamentals",
          "NumPy Arrays & Operations",
          "Data Manipulation with Pandas",
          "Data Visualization with Matplotlib & Seaborn",
          "Working with APIs & Web Scraping",
          "Data Analysis Projects"
        ],
        learningOutcomes: [
          "Manipulate and analyze data using Python",
          "Create insightful data visualizations",
          "Extract data from various sources"
        ],
        prerequisites: ["Basic Python knowledge"],
        type: "Long-term"
      },
      {
        id: 203,
        title: "SQL for Data Science",
        instructor: "Jennifer Lee",
        price: 39.99,
        ratings: 4.6,
        reviewCount: 156,
        description: "Learn SQL for data analysis and database management.",
        duration: "4 weeks",
        image: "/sql.jpg",
        level: "Beginner",
        syllabus: [
          "SQL Basics",
          "Querying & Filtering Data",
          "Joins & Relationships",
          "Aggregation & Group By",
          "Subqueries & CTEs",
          "Database Design Fundamentals"
        ],
        learningOutcomes: [
          "Write complex SQL queries",
          "Analyze data using SQL",
          "Design efficient database schemas"
        ],
        prerequisites: ["None"],
        type: "Short-term"
      }
    ]
  },
  {
    id: 3,
    name: "Artificial Intelligence",
    courses: [
      {
        id: 301,
        title: "Machine Learning Fundamentals",
        instructor: "Alex Richards",
        price: 99.99,
        ratings: 4.8,
        reviewCount: 312,
        description: "Learn the core concepts and algorithms of machine learning.",
        duration: "12 weeks",
        image: "/ml.jpeg",
        level: "Intermediate",
        syllabus: [
          "Introduction to Machine Learning",
          "Supervised Learning Algorithms",
          "Unsupervised Learning Algorithms",
          "Model Evaluation & Validation",
          "Feature Engineering",
          "Practical ML Projects"
        ],
        learningOutcomes: [
          "Implement various ML algorithms",
          "Evaluate and improve model performance",
          "Apply ML to real-world problems"
        ],
        prerequisites: ["Python programming", "Basic statistics"],
        type: "Long-term"
      },
      {
        id: 302,
        title: "Deep Learning with TensorFlow",
        instructor: "Priya Patel",
        price: 89.99,
        ratings: 4.9,
        reviewCount: 245,
        description: "Master deep learning techniques using TensorFlow and Keras.",
        duration: "10 weeks",
        image: "/deep.jpg",
        level: "Advanced",
        syllabus: [
          "Neural Network Fundamentals",
          "TensorFlow & Keras Basics",
          "Convolutional Neural Networks",
          "Recurrent Neural Networks",
          "Transfer Learning",
          "Generative Models",
          "Deep Learning Projects"
        ],
        learningOutcomes: [
          "Build and train deep neural networks",
          "Implement computer vision applications",
          "Create natural language processing models"
        ],
        prerequisites: ["Machine learning basics", "Python programming"],
        type: "Long-term"
      },
      {
        id: 303,
        title: "Natural Language Processing",
        instructor: "Thomas Moore",
        price: 79.99,
        ratings: 4.7,
        reviewCount: 178,
        description: "Learn how to work with text data and build NLP applications.",
        duration: "8 weeks",
        image: "/NLP.jpeg",
        level: "Intermediate",
        syllabus: [
          "Text Processing Fundamentals",
          "Text Classification & Sentiment Analysis",
          "Named Entity Recognition",
          "Topic Modeling",
          "Word Embeddings",
          "Transformer Models",
          "NLP Applications"
        ],
        learningOutcomes: [
          "Process and analyze text data",
          "Build text classification models",
          "Create chatbots and language applications"
        ],
        prerequisites: ["Python programming", "Basic ML knowledge"],
        type: "Long-term"
      }
    ]
  }
];

// Sample reviews
const reviews = [
  {
    id: 1,
    name: "John Smith",
    course: "Full-Stack Web Development",
    rating: 5,
    comment: "This course completely transformed my career. I went from knowing almost nothing about web development to landing a job as a junior developer within 3 months of completion.",
    image: "/mark.png"
  },
  {
    id: 2,
    name: "Lisa Johnson",
    course: "Data Science Fundamentals",
    rating: 4,
    comment: "Excellent course with practical examples. The instructor explains complex concepts in a way that's easy to understand. I've gained valuable skills that I use daily in my work.",
    image: "/mark.png"
  },
  {
    id: 3,
    name: "Mike Williams",
    course: "Machine Learning Fundamentals",
    rating: 5,
    comment: "One of the best online courses I've taken. The projects were challenging but incredibly rewarding. I now have a strong portfolio to showcase to potential employers.",
    image: "/mark.png"
  },
  {
    id: 4,
    name: "Sophia Chen",
    course: "JavaScript Mastery",
    rating: 5,
    comment: "This course helped me understand JavaScript at a deeper level. The instructor's teaching style is engaging and the course content is up-to-date with modern practices.",
    image: "/mark.png"
  }
];

const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);




  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };




  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubscribed(true);
    setEmail("");
  };


  return (
    <div className="min-h-screen bg-gray-50 text-center">
    {/* Header */}
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-8 w-full">
  <div className="container mx-auto px-4 text-center flex flex-col items-center">
    <motion.h1 
      className="text-3xl font-bold mb-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Explore Our Courses
    </motion.h1>
    <motion.p 
      className="text-xl max-w-2xl"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      Browse our curated selection of top-rated courses designed to help you gain new skills and advance your career.
    </motion.p>
  </div>
</header>


      {/* Course Details Component */}
      {selectedCourse && (
  <div className="container w-full max-w-screen-lg mx-auto px-4 py-8">
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
      <div className="md:flex h-full">
        {/* Course Image */}
        <div className="md:w-1/2 h-64 md:h-auto">
          <img 
            src={selectedCourse.image} 
            alt={selectedCourse.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Course Details */}
        <div className="p-6 md:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedCourse.title}</h2>
            <div className="flex items-center mb-2">
              <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    fill={i < Math.floor(selectedCourse.ratings) ? "currentColor" : "none"} 
                    size={16} 
                  />
                ))}
              </div>
              <span className="text-gray-600 ml-2">
                {selectedCourse.ratings} ({selectedCourse.reviewCount} reviews)
              </span>
            </div>
            <div className="flex items-center text-gray-600 mb-2">
              <User size={16} className="mr-1" />
              <span>Instructor: {selectedCourse.instructor}</span>
            </div>
            <div className="flex items-center text-gray-600 mb-2">
              <Clock size={16} className="mr-1" />
              <span>Duration: {selectedCourse.duration}</span>
            </div>
            <div className="flex items-center text-gray-600 mb-4">
              <Award size={16} className="mr-1" />
              <span>Level: {selectedCourse.level}</span>
            </div>
            <p className="text-gray-600 mb-4">{selectedCourse.description}</p>
          </div>
          
          {/* Price and Enroll Button */}
          <div className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">${selectedCourse.price}</span>
            <button className="ml-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition duration-200">
              Enroll Now
            </button>
          </div>
        </div>
      </div>

      {/* Additional Course Information */}
      <div className="p-6 border-t border-gray-200">
        <h3 className="text-xl font-bold mb-4">Course Syllabus</h3>
        <ul className="space-y-2 mb-6">
          {selectedCourse.syllabus.map((item, index) => (
            <li key={index} className="flex items-start">
              <ChevronRight size={16} className="text-blue-500 mt-1 mr-2" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h3 className="text-xl font-bold mb-4">Learning Outcomes</h3>
        <ul className="space-y-2 mb-6">
          {selectedCourse.learningOutcomes.map((item, index) => (
            <li key={index} className="flex items-start">
              <ChevronRight size={16} className="text-blue-500 mt-1 mr-2" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h3 className="text-xl font-bold mb-4">Prerequisites</h3>
        <ul className="space-y-2 mb-6">
          {selectedCourse.prerequisites.map((item, index) => (
            <li key={index} className="flex items-start">
              <ChevronRight size={16} className="text-blue-500 mt-1 mr-2" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Enroll CTA */}
        <div className="text-center mt-6">
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-md text-lg font-medium transition duration-200">
            Enroll Now
          </button>
          
        </div>
      </div>
    </div>

    {/* Back Button */}
    <button 
      onClick={() => setSelectedCourse(null)} 
      className="mt-8 text-blue-600 hover:text-blue-800 font-medium flex items-center"
    >
      &larr; Back to All Courses
    </button>
  </div>
)}


      {/* Course Listings */}
      {!selectedCourse && (
        <div className="container mx-auto px-4 py-8">
          {categories.map((category) => (
            <div key={category.id} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{category.name}</h2>
              
              <Swiper
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  }
                }}
                className="course-swiper"
              >
                {category.courses.map((course) => (
                  <SwiperSlide key={course.id}>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{course.title}</h3>
                        <div className="flex items-center mb-2">
                          <User size={16} className="text-gray-600 mr-1" />
                          <span className="text-gray-600 text-sm">{course.instructor}</span>
                        </div>
                        <div className="flex items-center mb-2">
                          <div className="flex items-center text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                fill={i < Math.floor(course.ratings) ? "currentColor" : "none"} 
                                size={16} 
                              />
                            ))}
                          </div>
                          <span className="text-gray-600 text-sm ml-2">{course.ratings} ({course.reviewCount})</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                        <div className="flex items-center mb-3 mt-auto">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${course.type === "Long-term" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>
                            {course.type}
                          </span>
                          <span className="ml-2 text-gray-600 text-sm flex items-center">
                            <Clock size={14} className="mr-1" />
                            {course.duration}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-blue-600">${course.price}</span>
                          <button 
                            onClick={() => handleCourseSelect(course)}
                            className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded-md text-sm transition duration-200"
                          >
                            Enroll Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ))}
        </div>
      )}

      {/* Student Reviews */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">What Our Students Say</h2>
          
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              }
            }}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="bg-white p-6 rounded-lg shadow-md h-full">
                  <div className="flex items-center mb-4">
                    <img 
                      src={review.image} 
                      alt={review.name} 
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-bold text-gray-800">{review.name}</h4>
                      <p className="text-sm text-gray-600">{review.course}</p>
                    </div>
                  </div>
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        fill={i < review.rating ? "#FBBF24" : "none"} 
                        stroke={i < review.rating ? "#FBBF24" : "currentColor"}
                        size={16} 
                        className="text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of students already learning with us. Take the first step towards mastering new skills today.</p>
          <button className="bg-white text-blue-600 hover:bg-gray-100 py-3 px-8 rounded-md font-bold text-lg transition duration-200 mb-8">
            Join Now
          </button>
          
          <div className="max-w-md mx-auto mt-8">
            <h3 className="text-xl font-semibold mb-4">Get Course Updates</h3>
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 py-2 px-4 rounded-md text-gray-800 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
  
              />
                
                <button 
  type="submit"
  className="bg-indigo-800 hover:bg-indigo-900 text-white py-2 px-6 rounded-md transition duration-200"
  disabled={isSubscribed} // Optionally disable the button after subscription
>
  {isSubscribed ? "Subscribed" : "Subscribe"}
</button>
             
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-lg font-bold mb-4">RS Softech</h3>
              <p className="text-gray-400 max-w-xs">Empowering individuals through education and skill development.</p>
            </div>
            <div className="mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-200">Courses</a></li>
                <li><a href="#/AboutUs" className="text-gray-400 hover:text-white transition duration-200">About Us</a></li>
                <li><a href="/ContactPage" className="text-gray-400 hover:text-white transition duration-200">Contact</a></li>
                <li><a href="/FAQ" className="text-gray-400 hover:text-white transition duration-200">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <p className="text-gray-400 mb-2">Email: rssoftech25@gmail.com</p>
              <p className="text-gray-400">Phone:+918698574924</p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} RS Softech. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Courses;