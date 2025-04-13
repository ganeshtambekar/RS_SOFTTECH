import { useState, useEffect } from 'react';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [imageBlend, setImageBlend] = useState(0); // 0 to 1 for blending between images

  useEffect(() => {
    // Image blending animation
    const blendInterval = setInterval(() => {
      setImageBlend(prev => (prev >= 1 ? 0 : prev + 0.05));
    }, 50);

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    // Set timeout for the entire loading screen
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 500); // Wait for fade out animation to complete
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
      clearInterval(blendInterval);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className={`fixed inset-0 bg-gradient-to-br from-blue-900 to-indigo-800 flex flex-col items-center justify-center z-50 transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="flex flex-col items-center justify-center">
        {/* Logo with animations and image combining effect */}
        <div className="relative mb-8">
          {/* First image */}
          <img 
            src="./round11.png"
            alt="Round 1"
            className="absolute h-40 w-40 object-contain drop-shadow-xl"
            style={{ opacity: 1 - imageBlend }} 
          />
          
          {/* Second image */}
          <img 
            src="./round2.png"
            alt="Round 2"
            className="absolute h-40 w-40 object-contain drop-shadow-xl"
            style={{ opacity: imageBlend }}
          />
          
          {/* Placeholder div to maintain space */}
          <div className="h-40 w-40"></div>
          
          {/* Animated glowing rings around logo */}
          <div className="absolute inset-0 rounded-full border-4 border-blue-300 opacity-75 animate-ping"></div>
          <div className="absolute inset-4 rounded-full border-2 border-white opacity-50 animate-pulse"></div>
        </div>

        {/* Company name with text animation */}
        <h1 className="text-4xl font-bold text-white mb-6 tracking-wider">
          {'RS SOFTTECH'.split('').map((letter, index) => (
            <span 
              key={index}
              className="inline-block animate-pulse"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </h1>

        {/* Progress bar */}
        <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden mb-4">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        {/* Loading text */}
        <p className="text-blue-200 text-lg">
          {progress === 100 ? 'Ready!' : 'Loading...'}
        </p>
        
        {/* Spinner */}
        <div className="mt-6">
          <div className="w-8 h-8 border-4 border-t-blue-400 border-r-transparent border-b-blue-400 border-l-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;