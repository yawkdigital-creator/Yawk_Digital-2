import React, { useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useCustomCursor } from '@/hooks/useCustomCursor';

export const CustomCursor: React.FC = () => {
  const { cursor, isDesktop } = useCustomCursor();

  // Memoize transform style for better performance - using translate3d for GPU acceleration
  const cursorStyle = useMemo(
    () => ({
      left: `${cursor.x}px`,
      top: `${cursor.y}px`,
      transform: 'translate3d(-50%, -50%, 0)',
      willChange: 'transform, opacity',
    }),
    [cursor.x, cursor.y]
  );

  if (!isDesktop) return null;

  const cursorElements = (
    <>
      {/* Main cursor dot
          mix-blend-mode: difference makes the white dot invert against ANY background
          → dark bg  = white dot (visible)
          → light bg = black dot (visible)
          → modal overlay = white dot (visible)
      */}
      <div
        className={`fixed pointer-events-none z-[2147483647] transition-opacity duration-300 ease-out ${
          cursor.isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ ...cursorStyle, mixBlendMode: 'difference' }}
      >
        <div
          className={`rounded-full transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] bg-white ${
            cursor.isHovering
              ? 'h-4 w-4 scale-100 shadow-[0_0_10px_rgba(255,255,255,0.8)]'
              : 'h-[5px] w-[5px]'
          }`}
        />
      </div>

      {/* Outer ring — same mix-blend-mode trick */}
      <div
        className={`fixed pointer-events-none z-[2147483646] transition-opacity duration-500 ease-out ${
          cursor.isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          ...cursorStyle,
          mixBlendMode: cursor.isHovering ? 'normal' : 'difference',
          transition: 'opacity 0.5s ease-out, transform 0.2s cubic-bezier(0.23, 1, 0.32, 1)',
        }}
      >
        <div
          className={`rounded-full border transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
            cursor.isHovering
              ? 'h-10 w-10 border-red-500 shadow-[0_0_16px_rgba(239,68,68,0.5)] scale-100'
              : 'h-7 w-7 border-white'
          }`}
        />
      </div>

      {/* Hover glow effects (no blend mode needed — decorative only) */}
      {cursor.isHovering && (
        <>
          <div
            className="fixed pointer-events-none z-[2147483645] transition-opacity duration-300 ease-out"
            style={cursorStyle}
          >
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-red-500/20 via-red-500/15 to-red-500/20 blur-sm animate-cursor-pulse" />
          </div>

          <div
            className="fixed pointer-events-none z-[2147483644] transition-opacity duration-[400ms] ease-out"
            style={cursorStyle}
          >
            <div className="h-14 w-14 rounded-full border border-red-500/30 animate-cursor-glow" />
          </div>
        </>
      )}
    </>
  );

  // Render via portal directly to document.body so it escapes ALL stacking contexts
  return createPortal(cursorElements, document.body);
};
