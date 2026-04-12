import React from 'react';
import { Logo } from './Logo';
import wordpressLogo from '../../assets/images/wordpress.png';
import shopifyLogo from '../../assets/images/shopify.png';
import canvaLogo from '../../assets/images/canva.png';
import awsLogo from '../../assets/images/aws.png';
import tiktokLogo from '../../assets/images/tiktok.png';

interface CompanyLogo {
  name: string;
  icon: React.ReactNode;
}

const COMPANY_LOGOS: CompanyLogo[] = [
  {
    name: 'Facebook',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
      </svg>
    )
  },
  {
    name: 'Google',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    )
  },
  {
    name: 'TikTok',
    icon: (
      <img 
        src={tiktokLogo} 
        alt="TikTok" 
        className="w-8 h-8 object-contain"
      />
    )
  },
  {
    name: 'WordPress',
    icon: (
      <img 
        src={wordpressLogo} 
        alt="WordPress" 
        className="w-8 h-8 object-contain"
      />
    )
  },
  {
    name: 'Shopify',
    icon: (
      <img 
        src={shopifyLogo} 
        alt="Shopify" 
        className="w-8 h-8 object-contain"
      />
    )
  },
  {
    name: 'Canva',
    icon: (
      <img 
        src={canvaLogo} 
        alt="Canva" 
        className="w-8 h-8 object-contain"
      />
    )
  },
  {
    name: 'AWS',
    icon: (
      <img 
        src={awsLogo} 
        alt="AWS" 
        className="w-8 h-8 object-contain"
      />
    )
  },
  {
    name: 'YouTube',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FF0000"/>
      </svg>
    )
  }
];

interface RevolvingLogosProps {
  className?: string;
  logoSize?: string;
  orbitRadius?: number;
  animationDuration?: number;
}

export const RevolvingLogos: React.FC<RevolvingLogosProps> = ({
  className = '',
  logoSize = 'h-24 sm:h-32 md:h-40 lg:h-48 xl:h-56',
  orbitRadius = 200,
  animationDuration = 20
}) => {
  const totalLogos = COMPANY_LOGOS.length;

  // Calculate responsive orbit radius - maintain perfect circle
  const mobileOrbitRadius = orbitRadius * 0.80;
  const desktopOrbitRadius = orbitRadius;
  
  // Calculate container size based on largest orbit radius
  const containerSize = desktopOrbitRadius * 2.5;

  return (
    <div 
      className={`relative flex items-center justify-center mx-auto ${className}`} 
      style={{ 
        width: '100%',
        height: '100%',
        aspectRatio: '1 / 1',
        position: 'relative'
      } as React.CSSProperties}
    >
      {/* Central Logo - Perfectly Centered */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center"
      >
        <Logo className={logoSize} />
      </div>

      {/* Orbiting Logos Container - Perfect Circle Wrapper */}
      <div 
        className="absolute inset-0"
        style={{
          width: '100%',
          height: '100%',
          position: 'relative'
        }}
      >
        {COMPANY_LOGOS.map((company, index) => {
          const initialAngle = (360 / totalLogos) * index;

          return (
            <div
              key={company.name}
              className="absolute w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center"
              style={{
                '--orbit-radius-mobile': `${mobileOrbitRadius}px`,
                '--orbit-radius-desktop': `${desktopOrbitRadius}px`,
                '--orbit-duration': `${animationDuration}s`,
                '--initial-angle': `${initialAngle}deg`,
                left: '50%',
                top: '50%',
                animation: `orbit var(--orbit-duration, ${animationDuration}s) linear infinite`,
                willChange: 'transform'
              } as React.CSSProperties}
            >
              <div className="w-full h-full flex items-center justify-center group hover:scale-110 transition-all duration-300">
                <div className="text-slate-600 dark:text-slate-400 group-hover:text-red-500 transition-colors duration-300 scale-90 sm:scale-100">
                  {company.icon}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
