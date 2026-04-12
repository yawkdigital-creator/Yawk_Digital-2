import { useState, useEffect } from 'react';

export const useActiveSection = (sectionIds: string[], offset: number = 100) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;
      let currentActive = '';
      
      // Find the section that's currently in view
      // Check from bottom to top to get the most recent section
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const sectionId = sectionIds[i];
        const section = document.querySelector(sectionId);
        
        if (section) {
          const rect = section.getBoundingClientRect();
          const sectionTop = rect.top + window.scrollY;
          const sectionBottom = sectionTop + rect.height;
          
          // Check if scroll position is within this section
          if (scrollPosition >= sectionTop - offset && scrollPosition < sectionBottom) {
            currentActive = sectionId;
            break;
          }
        }
      }
      
      // If we're at the top, highlight the first section
      if (scrollPosition < offset && sectionIds.length > 0) {
        const firstSection = document.querySelector(sectionIds[0]);
        if (firstSection) {
          const firstSectionTop = firstSection.getBoundingClientRect().top + window.scrollY;
          if (scrollPosition < firstSectionTop) {
            currentActive = '';
          } else {
            currentActive = sectionIds[0];
          }
        }
      }
      
      setActiveSection(currentActive);
    };

    // Initial check
    handleScroll();

    // Throttle scroll events for better performance
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [sectionIds, offset]);

  return activeSection;
};
