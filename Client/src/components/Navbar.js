// import { Link } from "react-router-dom";
// import React, { useState } from "react";
// import { Menu, X } from "lucide-react";
// import routes from "../constants/routes";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const closeMobileMenu = () => setIsOpen(false);

//   const navigation = [
//     { name: "Home", href: "/" },
//     { name: "Courses", href: routes.courses },
//     { name: "Corporate Training", href: routes.corporate },
//     { name: "About US", href: routes.about },
//     { name: "Contact", href: routes.contact },
//   ];

//   return (
//     <nav className="bg-white shadow-lg">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <Link to="/" className="flex items-center" aria-label="Home">
//               <img 
//                 src="/logo.png" 
//                 alt="RS Softtech Logo" 
//                 className="h-10 w-auto" 
//                 loading="lazy"
//               />
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex space-x-6 items-center">
//             {navigation.map((item) => (
//               <Link
//                 key={item.name}
//                 to={item.href}
//                 className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
//                 aria-label={`Navigate to ${item.name}`}
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </div>

        
//           <div className="hidden md:flex items-center space-x-4">
//             <Link 
//               to="/login" 
//               className="text-gray-600 hover:text-blue-600 font-medium"
//               aria-label="Login"
//             >
//               Login
//             </Link>
//             <Link
//               to="/RegisterPage"
//               className="text-gray-600 hover:text-blue-600 font-medium"
//               aria-label="Register"
//             >
//               Register
//             </Link>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button 
//               onClick={() => setIsOpen(!isOpen)} 
//               className="text-gray-600 hover:text-blue-600 p-2"
//               aria-label={isOpen ? "Close menu" : "Open menu"}
//             >
//               {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isOpen && (
//           <div className="md:hidden py-4">
//             <div className="flex flex-col space-y-2">
//               {navigation.map((item) => (
//                 <Link
//                   key={item.name}
//                   to={item.href}
//                   onClick={closeMobileMenu}
//                   className="text-gray-600 hover:text-blue-600 px-3 py-2 text-base font-medium"
//                   aria-label={`Navigate to ${item.name}`}
//                 >
//                   {item.name}
//                 </Link>
//               ))}
//               <div className="border-t border-gray-200 pt-4 space-y-2">
//                 <Link 
//                   to="/login" 
//                   onClick={closeMobileMenu}
//                   className="block text-gray-600 hover:text-blue-600 px-3 py-2 text-base font-medium"
//                   aria-label="Login"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/RegisterPage"
//                   onClick={closeMobileMenu}
//                   className="block text-gray-600 hover:text-blue-600 px-3 py-2 text-base font-medium"
//                   aria-label="Register"
//                 >
//                   Register
//                 </Link>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



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
    <nav className="bg-gradient-to-r from-blue-50 to-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo with hover animation */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="flex items-center transform transition duration-300 hover:scale-105"
              aria-label="Home"
            >
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
                className="relative text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium group transition-colors duration-300"
                aria-label={`Navigate to ${item.name}`}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Auth Buttons with hover effects */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/login" 
              className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-300 font-medium"
              aria-label="Login"
            >
              Login
            </Link>
            <Link
              to="/RegisterPage"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 font-medium"
              aria-label="Register"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Button with animation */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-gray-600 hover:text-blue-600 p-2 transition-transform duration-300"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="h-6 w-6 transform transition duration-300 rotate-180" />
              ) : (
                <Menu className="h-6 w-6 transform transition duration-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation with slide-down animation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96" : "max-h-0"}`}>
          <div className="py-4">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={closeMobileMenu}
                  className="px-3 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors duration-300 text-base font-medium"
                  aria-label={`Navigate to ${item.name}`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <Link 
                  to="/login" 
                  onClick={closeMobileMenu}
                  className="block px-3 py-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-300 text-base font-medium"
                  aria-label="Login"
                >
                  Login
                </Link>
                <Link
                  to="/RegisterPage"
                  onClick={closeMobileMenu}
                  className="block px-3 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors duration-300 text-base font-medium"
                  aria-label="Register"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;