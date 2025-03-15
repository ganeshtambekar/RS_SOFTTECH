import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import routes from "../constants/routes";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeMobileMenu = () => setIsOpen(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Courses", href: routes.courses },
    { name: "Corporate Training", href: routes.corporate },
    { name: "About US", href: routes.about },
    { name: "Contact", href: routes.contact },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center" aria-label="Home">
              <img 
                src="/logo.png" 
                alt="RS Softtech Logo" 
                className="h-10 w-auto" 
                loading="lazy"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                aria-label={`Navigate to ${item.name}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/login" 
              className="text-gray-600 hover:text-blue-600 font-medium"
              aria-label="Login"
            >
              Login
            </Link>
            <Link
              to="/RegisterPage"
              className="text-gray-600 hover:text-blue-600 font-medium"
              aria-label="Register"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-gray-600 hover:text-blue-600 p-2"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={closeMobileMenu}
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 text-base font-medium"
                  aria-label={`Navigate to ${item.name}`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <Link 
                  to="/login" 
                  onClick={closeMobileMenu}
                  className="block text-gray-600 hover:text-blue-600 px-3 py-2 text-base font-medium"
                  aria-label="Login"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={closeMobileMenu}
                  className="block text-gray-600 hover:text-blue-600 px-3 py-2 text-base font-medium"
                  aria-label="Register"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;