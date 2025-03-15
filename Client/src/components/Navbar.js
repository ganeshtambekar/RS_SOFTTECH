// import React, { useState, useEffect } from "react";
// import { Menu, X } from "lucide-react";
// import routes from "../constants/routes";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//  // const [isLoading, setIsLoading] = useState(!localStorage.getItem("hasVisited"));
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Check localStorage AFTER component mounts (client-side)
//     const hasVisited = localStorage.getItem("hasVisited");
    
//     if (!hasVisited) {
//       // Show animation for first-time visitors
//       const timer = setTimeout(() => {
//         sessionStorage.setItem("hasVisited", "true");
//         setIsLoading(false);
//       }, 2000);
//       return () => clearTimeout(timer);
//     } else {
//       // Hide immediately for returning visitors
//       setIsLoading(false);
//     }
//   }, []); 

//   if (isLoading) {
//     return (
//       <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
//         <img 
//           src="/logo.png" 
//           alt="RS Softtech Logo" 
//           className="h-32 w-32 animate-pulse" 
//         />
//       </div>
//     );
//     return null;
//   }



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
//             <a href="/" className="flex items-center">
//               <img 
//                 src="/logo.png" 
//                 alt="RS Softtech Logo" 
//                 className="h-10 w-auto" 
//               />
//             </a>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex space-x-6 items-center">
//             {navigation.map((item) => (
//               <a
//                 key={item.name}
//                 href={item.href}
//                 className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
//               >
//                 {item.name}
//               </a>
//             ))}
//           </div>

//           {/* User Actions */}
//           <div className="hidden md:flex items-center space-x-4">
//             <a href="/login" className="text-gray-600 hover:text-blue-600 font-medium">
//               Login
//             </a>
//             <a
//               href="/RegisterPage"
//               className="text-gray-600 hover:text-blue-600 font-medium"
//             >
//               Register
//             </a>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-blue-600 p-2">
//               {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isOpen && (
//           <div className="md:hidden py-4">
//             <div className="flex flex-col space-y-2">
//               {navigation.map((item) => (
//                 <a
//                   key={item.name}
//                   href={item.href}
//                   className="text-gray-600 hover:text-blue-600 px-3 py-2 text-base font-medium"
//                 >
//                   {item.name}
//                 </a>
//               ))}
//               <div className="border-t border-gray-200 pt-4 space-y-2">
//                 <a href="/login" className="block text-gray-600 hover:text-blue-600 px-3 py-2 text-base font-medium">
//                   Login
//                 </a>
//                 <a
//                   href="/register"
//                   className="block text-gray-600 hover:text-blue-600 px-3 py-2 text-base font-medium"
//                 >
//                   Register
//                 </a>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import routes from "../constants/routes";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage after component mounts
    const hasVisited = localStorage.getItem("hasVisited");
    
    if (!hasVisited) {
      const timer = setTimeout(() => {
        localStorage.setItem("hasVisited", "true");
        setIsLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, []);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Courses", href: routes.courses },
    { name: "Corporate Training", href: routes.corporate },
    { name: "About US", href: routes.about },
    { name: "Contact", href: routes.contact },
  ];

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <img 
          src="/logo.png" 
          alt="RS Softtech Logo" 
          className="h-32 w-32 animate-pulse" 
        />
      </div>
    );
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <img 
                src="/logo.png" 
                alt="RS Softtech Logo" 
                className="h-10 w-auto" 
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="/login" className="text-gray-600 hover:text-blue-600 font-medium">
              Login
            </a>
            <a
              href="/RegisterPage"
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              Register
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-blue-600 p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 text-base font-medium"
                >
                  {item.name}
                </a>
              ))}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <a href="/login" className="block text-gray-600 hover:text-blue-600 px-3 py-2 text-base font-medium">
                  Login
                </a>
                <a
                  href="/register"
                  className="block text-gray-600 hover:text-blue-600 px-3 py-2 text-base font-medium"
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