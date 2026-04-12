import { useEffect, useState, useRef } from 'react';

interface CursorState {
  x: number;
  y: number;
  isHovering: boolean;
  isVisible: boolean;
}

export const useCustomCursor = () => {
  const [cursor, setCursor] = useState<CursorState>({
    x: 0,
    y: 0,
    isHovering: false,
    isVisible: false,
  });

  const [isDesktop, setIsDesktop] = useState(false);
  const rafIdRef = useRef<number>();
  const hoverTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Only enable custom cursor on desktop devices with fine pointer (mouse)
    const checkIsDesktop = () => {
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      const hasHover = window.matchMedia('(hover: hover)').matches;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsDesktop(hasFinePointer && hasHover && !isTouchDevice);
    };

    checkIsDesktop();
    const mediaQuery = window.matchMedia('(pointer: fine)');
    const handleChange = () => checkIsDesktop();
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
    }
    
    window.addEventListener('resize', checkIsDesktop);
    
    return () => {
      window.removeEventListener('resize', checkIsDesktop);
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const updateCursor = (e: MouseEvent) => {
      // Cancel previous frame
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      
      // Use requestAnimationFrame for smooth 60fps updates
      rafIdRef.current = requestAnimationFrame(() => {
        setCursor((prev) => ({
          ...prev,
          x: e.clientX,
          y: e.clientY,
          isVisible: true,
        }));
      });
    };

    const handleMouseEnter = () => {
      setCursor((prev) => ({ ...prev, isVisible: true }));
    };

    const handleMouseLeave = () => {
      setCursor((prev) => ({ ...prev, isVisible: false, isHovering: false }));
    };

    // Throttled hover detection for better performance
    const handleMouseOver = (e: MouseEvent) => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }

      hoverTimeoutRef.current = setTimeout(() => {
        const target = e.target as HTMLElement;
        
        // Efficiently check if target is interactive
        const isInteractive =
          target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.getAttribute('role') === 'button' ||
          target.closest('a, button, [role="button"], .cursor-pointer, .cursor-grab, .card, [data-interactive]') ||
          window.getComputedStyle(target).cursor === 'pointer';

        setCursor((prev) => ({
          ...prev,
          isHovering: !!isInteractive,
        }));
      }, 10); // Small delay to batch updates
    };

    window.addEventListener('mousemove', updateCursor, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      window.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isDesktop]);

  return { cursor, isDesktop };
};
