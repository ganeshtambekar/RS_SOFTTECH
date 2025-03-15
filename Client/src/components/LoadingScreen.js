import { useState, useEffect } from 'react';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <img 
          src="/logo.png" 
          alt="RS Softtech Logo" 
          className="h-52 w-52 animate-pulse" 
        />
      </div>
    );
  }

  return null;
};

export default LoadingScreen;