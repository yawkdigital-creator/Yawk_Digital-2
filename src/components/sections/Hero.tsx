import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { RevolvingLogos } from '@/components/ui/RevolvingLogos';

interface HeroProps {
  onCtaClick: () => void;
  onWatchProcess: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick, onWatchProcess }) => {

  return (
    <section className="relative pt-24 sm:pt-32 md:pt-40 lg:pt-48 pb-14 sm:pb-20 md:pb-24 lg:pb-32 overflow-hidden min-h-[78vh] sm:min-h-[90vh] flex items-center">

      {/* Hero-only background animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="hero-dot-grid" />
        <div className="hero-aurora-1" />
        <div className="hero-aurora-2" />
        <div className="hero-aurora-3" />
        <div className="hero-aurora-4" />
        <div className="hero-beam-1" />
        <div className="hero-beam-2" />
        <div className="hero-vignette" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-12 xl:gap-20 items-start">
          {/* Left Side - Content */}
          <div className="max-w-3xl flex flex-col items-center text-center lg:items-start lg:text-left">
            <h1 className="hero-heading-wrapper text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-black leading-[0.95] sm:leading-[0.85] mb-6 sm:mb-8 md:mb-14 tracking-tighter">
              <span className="block">
                <span className="hero-dominate-word" style={{ animationDelay: '0.1s' }}>
                  Innovate.
                </span>
              </span>
              <span className="block mt-1 sm:mt-2 md:mt-4 lg:mt-0">
                <span className="hero-dominate-word" style={{ animationDelay: '0.45s' }}>
                  Accelerate.
                </span>
              </span>
              <span className="block mt-1 sm:mt-2 md:mt-4 lg:mt-0">
                <span className="hero-dominate-word hero-dominate-final" style={{ animationDelay: '0.8s' }}>
                  Dominate.
                </span>
              </span>
            </h1>

            <div className="relative mb-8 sm:mb-10 md:mb-16 max-w-2xl">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed sm:leading-relaxed md:leading-tight animate-slide-up" style={{ animationDelay: '0.6s' }}>
              Your partner in navigating the complex digital landscape, leveraging intelligent marketing and creative solutions to unlock your full potential.
            </p>
          </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 md:gap-6 mb-12 sm:mb-16 md:mb-24 justify-center lg:justify-start w-full sm:w-auto animate-slide-up" style={{ animationDelay: '0.8s' }}>
            <Button
              variant="primary"
              size="lg"
              shimmer
              glow
              icon={ArrowRight}
              onClick={onCtaClick}
                className="w-full sm:w-auto text-sm sm:text-base"
            >
              Secure My Growth Plan
            </Button>
            <Button
              variant="secondary"
              size="lg"
              icon={Play}
              iconPosition="left"
              onClick={onWatchProcess}
                className="w-full sm:w-auto text-sm sm:text-base"
            >
              Watch The Protocol
            </Button>
            </div>
          </div>

          {/* Right Side - Revolving Logos — aligned with heading */}
          <div className="relative flex items-start justify-center lg:justify-end animate-slide-up overflow-visible -mt-4 lg:-mt-8" style={{ animationDelay: '0.3s' }}>
            <div className="w-full flex items-center justify-center lg:justify-end lg:pr-4 xl:pr-8 2xl:pr-12">
              <div className="w-full max-w-[85vw] sm:max-w-[75vw] md:max-w-[60vw] lg:max-w-none aspect-square flex items-center justify-center mx-auto scale-[0.75] sm:scale-90 md:scale-100 origin-center">
                <RevolvingLogos 
                  orbitRadius={180}
                  animationDuration={25}
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
