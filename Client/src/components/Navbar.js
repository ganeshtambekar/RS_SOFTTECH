import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Courses from './Courses';
import Corporate from './Corporate';
import Blog from './Blog';
import ContactPage from './ContactPage';
import Login from './Login';
import RegisterPage from './RegisterPage';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '/Courses' },
    { name: 'Corporate Training', href: '/Corporate' },
    { name: 'Blog', href: '/Blog' },
    { name: 'Contact', href: '/ContactPage' }
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-blue-600">
              RS Softtech
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="/Login"
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              Login
            </a>
            <a
              href="/RegisterPage"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Register
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-blue-600 p-2"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
                >
                  {item.name}
                </a>
              ))}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <a
                  href="/Login"
                  className="block text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
                >
                  Login
                </a>
                <a
                  href="/RegisterPage"
                  className="block bg-blue-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
                >
                  Register
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;