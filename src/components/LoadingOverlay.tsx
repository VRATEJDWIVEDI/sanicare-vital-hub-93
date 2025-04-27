
import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface LoadingOverlayProps {
  isLoading: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
  const [hidden, setHidden] = useState(false);
  
  // Handle animation timing for showing/hiding the overlay
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setHidden(true);
      }, 600); // Wait for fade-out animation to complete
      return () => clearTimeout(timer);
    } else {
      setHidden(false);
    }
  }, [isLoading]);

  if (hidden) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background 
        ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'} 
        transition-opacity duration-600`}
    >
      <div className="flex flex-col items-center">
        <Heart className="h-12 w-12 text-medical-purple animate-heartbeat" />
        <p className="text-lg mt-4 font-medium text-medical-purple">Finding your vibes... 💓</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
