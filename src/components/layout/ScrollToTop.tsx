import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-10 right-10 z-[100] group animate-slide-in-right"
      aria-label="Scroll to top"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 animate-pulse transition-opacity"></div>
        <div className="relative glass-card w-14 h-14 rounded-full flex items-center justify-center border-red-500/20 group-hover:border-red-500/50 group-hover:bg-red-500/10 transition-all duration-500 shadow-2xl">
          <ArrowUp className="w-6 h-6 text-slate-900 dark:text-white group-hover:text-red-500 group-hover:-translate-y-1 transition-all duration-500" />
        </div>
      </div>
    </button>
  );
};
