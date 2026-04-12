import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "", iconOnly = false }) => {
  const handleLogoClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const imgClass = `h-full w-auto object-contain transition-all duration-500 ease-out group-hover:scale-[1.03]`;

  return (
    <div
      className={`flex items-center group cursor-pointer ${className || 'h-8'}`}
      onClick={handleLogoClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleLogoClick();
        }
      }}
    >
      <img
        src="/logo.png"
        alt="Yawk Digital Logo"
        className={imgClass}
      />
    </div>
  );
};
