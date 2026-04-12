import React, { useState, useEffect } from 'react';
import { Phone, Sparkles } from 'lucide-react';

interface FloatingCTAProps {
  onClick: () => void;
}

export const FloatingCTA: React.FC<FloatingCTAProps> = ({ onClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Show button after scrolling past 300px (past hero section)
      setIsVisible(scrollY > 300);
      setIsScrolled(scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial scroll position
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-20 right-4 sm:bottom-24 sm:right-8 z-[45] transition-all duration-500 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
      }`}
    >
      <button
        onClick={onClick}
        className={`
          group relative
          flex items-center gap-3
          px-5 sm:px-6 md:px-8
          py-3 sm:py-4
          bg-slate-900 dark:bg-white
          text-white dark:text-slate-950
          font-black text-sm sm:text-base
          rounded-2xl
          shadow-2xl
          hover:bg-red-500 hover:text-white dark:hover:bg-red-500 dark:hover:text-white
          transition-all duration-300
          touch-manipulation
          active:scale-95
          min-h-[56px] sm:min-h-[60px]
          overflow-hidden
          border border-slate-800 dark:border-white/20
          hover:border-red-500/50
          hover:shadow-[0_0_30px_rgba(239,68,68,0.5)]
          ${isScrolled && isVisible ? 'animate-pulse-subtle' : ''}
        `}
        aria-label="Book a Strategy Call"
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-red-500/0 group-hover:bg-red-500/20 blur-xl transition-all duration-300 -z-10"></div>
        
        {/* Icon */}
        <div className="relative z-10 flex-shrink-0">
          <Phone className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:scale-110 group-hover:rotate-12" />
        </div>
        
        {/* Text */}
        <span className="relative z-10 whitespace-nowrap hidden sm:inline">
          Book a Strategy Call
        </span>
        <span className="relative z-10 whitespace-nowrap sm:hidden">
          Book Call
        </span>
        
        {/* Sparkle icon on hover */}
        <Sparkles className="absolute right-3 sm:right-4 w-4 h-4 sm:w-5 sm:h-5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 text-white" />
      </button>
    </div>
  );
};
