import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Search, X } from 'lucide-react';
import { FaGithub, FaLinkedin } from "react-icons/fa";


// Sample data for team members
const leadershipTeam = [
  {
    id: 1,
    name: "Dr. Jennifer Woods",
    role: "Head of Department",
    qualification: "Ph.D. Computer Science",
    degree: "Stanford University",
    image: "/sundar.jpg",
    bio: "Dr. Woods has over 15 years of experience in computer science research and education leadership. She specializes in artificial intelligence and computational theory."
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    role: "Associate Head",
    qualification: "Ph.D. Information Technology",
    degree: "MIT",
    image: "/sundar.jpg",
    bio: "Professor Chen oversees curriculum development and research initiatives. His work in cloud computing architecture has been published in numerous international journals."
  },
  {
    id: 3,
    name: "Dr. Sarah Johnson",
    role: "Director of Research",
    qualification: "Ph.D. Data Science",
    degree: "UC Berkeley",
    image: "/sundar.jpg",
    bio: "Dr. Johnson leads our research programs and industry partnerships. She's a renowned expert in machine learning applications for healthcare."
  }
];

const facultyMembers = [
  {
    id: 1,
    name: "Dr. Robert Martinez",
    qualification: "Ph.D. Computer Science",
    expertise: ["Algorithms", "Data Structures", "Machine Learning"],
    image: "/mark.png"
  },
  {
    id: 2,
    name: "Prof. Lisa Wang",
    qualification: "Ph.D. Applied Mathematics",
    expertise: ["Statistical Analysis", "Neural Networks", "Big Data"],
    image:"/mark.png"
  },
  {
    id: 3,
    name: "Dr. David Kim",
    qualification: "Ph.D. Electrical Engineering",
    expertise: ["Computer Architecture", "Embedded Systems", "IoT"],
    image: "/mark.png"
  },
  {
    id: 4,
    name: "Dr. Emma Thompson",
    qualification: "Ph.D. Information Systems",
    expertise: ["Database Design", "Web Development", "User Experience"],
    image: "/mark.png"
  },
  {
    id: 5,
    name: "Prof. James Wilson",
    qualification: "Ph.D. Software Engineering",
    expertise: ["Software Architecture", "Agile Methodologies", "DevOps"],
    image: "/mark.png"
  },
  {
    id: 6,
    name: "Dr. Sophia Garcia",
    qualification: "Ph.D. Cybersecurity",
    expertise: ["Network Security", "Ethical Hacking", "Cryptography"],
    image: "/mark.png"
  }
];

const hrTeam = [
  {
    id: 1,
    name: "Alex Richards",
    role: "HR Director",
    responsibilities: "Overall HR strategy, policy development, leadership development",
    image: "/mark.png"
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Recruitment Manager",
    responsibilities: "Talent acquisition, onboarding, employee retention strategies",
    image: "/mark.png"
  },
  {
    id: 3,
    name: "Thomas Brown",
    role: "Employee Relations Specialist",
    responsibilities: "Conflict resolution, employee engagement, workplace culture",
    image: "/mark.png"
  }
];

const developmentTeam = [
  {
    id: 1,
    name: "Ganesh Tambekar",
    role: "Lead Developer",
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    image: "ganesh.jpg",
    github: "https://github.com/ganeshtambekar",
    linkedin: "https://linkedin.com/in/tambekarganesh"
  },
  {
    id: 2,
    name: "Abhishek Chavan",
    role: "Frontend Developer",
    skills: ["React", "Tailwind CSS", "JavaScript", "UI/UX"],
    image: "abhishek.jpg",
    github: "https://github.com/mayasinghDev",
    linkedin: "https://linkedin.com/in/tambekarganesh"
  },
  {
    id: 3,
    name: "Pranav Wadhekar",
    role: "Backend Developer",
    skills: ["Node.js", "Express", "MongoDB", "GraphQL"],
    image: "pranav.jpg",
    github: "https://github.com/carlosrDev",
    linkedin: "https://linkedin.com/in/tambekarganesh"
  },
 
];

const AboutUs = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFaculty, setFilteredFaculty] = useState(facultyMembers);

  // Handle dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle faculty search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredFaculty(facultyMembers);
    } else {
      const filtered = facultyMembers.filter(
        member => 
          member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member.expertise.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredFaculty(filtered);
    }
  }, [searchQuery]);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Dark mode toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button 
          onClick={() => setDarkMode(!darkMode)} 
          className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>

      {/* Hero Section */}
      <section className={`py-20 px-4 ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-600 to-indigo-700'}`}>
        <div className="container mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-white'}`}>
              Welcome to Our Department
            </h1>
            <p className={`text-xl max-w-3xl mx-auto mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-100'}`}>
              We are dedicated to fostering innovation, excellence, and collaboration in computer science education and research. Our mission is to prepare the next generation of leaders in technology through cutting-edge curriculum and supportive mentorship.
            </p>
            <motion.button 
              className={`px-6 py-3 rounded-md ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-white text-blue-700 hover:bg-gray-100'} font-medium transition-colors duration-300`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More About Us
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className={`py-16 px-4 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Our Leadership Team
            </h2>
            <p className={`max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Meet the experienced professionals who guide our department's vision and strategic direction.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {leadershipTeam.map((leader) => (
              <motion.div 
                key={leader.id}
                variants={fadeIn}
                className={`rounded-lg overflow-hidden shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} transition-transform duration-300 hover:-translate-y-2`}
              >
                <img 
                  src={leader.image} 
                  alt={`${leader.name}, ${leader.role}`} 
                  className="w-full h-72 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{leader.name}</h3>
                  <p className={`font-medium mb-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{leader.role}</p>
                  <p className={`mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{leader.qualification}</p>
                  <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'} italic`}>{leader.degree}</p>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{leader.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Faculty Members Section */}
      <section className={`py-16 px-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Our Faculty
            </h2>
            <p className={`max-w-2xl mx-auto mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Our diverse faculty brings extensive experience and expertise across various domains of computer science.
            </p>

            {/* Search functionality */}
            <div className={`relative max-w-md mx-auto mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <div className="flex items-center border rounded-md overflow-hidden">
                <Search size={20} className="ml-3 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or expertise..."
                  className={`w-full p-2 outline-none border-none ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'}`}
                  aria-label="Search faculty members"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-2 bg-transparent"
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {filteredFaculty.length > 0 ? (
              filteredFaculty.map((faculty) => (
                <motion.div
                  key={faculty.id}
                  variants={fadeIn}
                  className={`rounded-lg overflow-hidden shadow-md ${darkMode ? 'bg-gray-700' : 'bg-white'} transition-all duration-300 hover:shadow-xl`}
                >
                  <div className="flex flex-col sm:flex-row">
                    <img
                      src={faculty.image}
                      alt={`${faculty.name}, Faculty Member`}
                      className="w-full sm:w-1/3 h-48 sm:h-auto object-cover"
                      loading="lazy"
                    />
                    <div className="p-4">
                      <h3 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{faculty.name}</h3>
                      <p className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{faculty.qualification}</p>
                      <div className="mt-2">
                        <p className={`text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Areas of Expertise:</p><div className="flex flex-wrap gap-1">
                          {faculty.expertise.map((skill, index) => (
                            <span
                              key={index}
                              className={`inline-block text-xs px-2 py-1 rounded-full ${
                                darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  No faculty members match your search criteria.
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className={`mt-4 px-4 py-2 rounded-md ${
                    darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  Clear Search
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* HR Team Section */}
      <section className={`py-16 px-4 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Our HR Team
            </h2>
            <p className={`max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Our dedicated HR professionals ensure a positive work environment and support the growth and development of our team.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {hrTeam.map((member) => (
              <motion.div 
                key={member.id}
                variants={fadeIn}
                className={`rounded-lg overflow-hidden shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'} transition-all duration-300 hover:shadow-xl`}
              >
                <div className="p-6 flex flex-col items-center text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                    <img 
                      src={member.image} 
                      alt={`${member.name}, ${member.role}`} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{member.name}</h3>
                  <p className={`font-medium mb-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{member.role}</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{member.responsibilities}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Development Team Section */}
      <section className={`py-16 px-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
  <div className="container mx-auto">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeIn}
      className="text-center mb-12"
    >
      <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        Our Development Team
      </h2>
      <p className={`max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        Meet the core team behind our digital platforms and innovative applications.
      </p>
    </motion.div>

    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" // Changed from lg:grid-cols-4
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {developmentTeam.slice(0, 3).map((developer) => ( // Only show first 3 developers
        <motion.div 
          key={developer.id}
          variants={fadeIn}
          whileHover={{ scale: 1.03 }}
          className={`rounded-lg overflow-hidden shadow-md ${darkMode ? 'bg-gray-700' : 'bg-white'} transition-all duration-300`}
        >
          <div className="relative group">
            <img 
              src={developer.image} 
              alt={`${developer.name}, ${developer.role}`} 
              className="w-full h-84 object-cover"
              loading="lazy"
            />
            <div className={`absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              darkMode ? 'bg-gray-900/80' : 'bg-gray-800/70'
            }`}>
              <div className="flex space-x-4">
                <a 
                  href={developer.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 rounded-full text-white hover:bg-gray-700 transition-colors"
                  aria-label={`${developer.name}'s GitHub profile`}
                >
                  <FaGithub size={24} />
                </a>
                <a 
                  href={developer.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors"
                  aria-label={`${developer.name}'s LinkedIn profile`}
                >
                  <FaLinkedin size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className="p-4">
            <h3 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{developer.name}</h3>
            <p className={`text-sm mb-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{developer.role}</p>
            <div className="flex flex-wrap gap-1">
              {developer.skills.map((skill, index) => (
                <span
                  key={index}
                  className={`inline-block text-xs px-2 py-1 rounded-full ${
                    darkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>

      {/* Footer Section */}
      <footer className={`py-8 px-4 ${darkMode ? 'bg-gray-900 border-t border-gray-800' : 'bg-white border-t border-gray-200'}`}>
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className={`mb-4 md:mb-0 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <p>© {new Date().getFullYear()} Our Department. All rights reserved.</p>
            </div>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
              >
                Terms of Service
              </a>
              <a 
                href="#" 
                className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;