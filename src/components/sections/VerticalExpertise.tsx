import React, { useState, useEffect, useRef } from 'react';
import { Database, ShoppingBag, TrendingUp, Globe, ArrowRight, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { useIntersection } from '@/hooks/useIntersection';
import { useNavigate } from 'react-router-dom';

interface Vertical {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  metric: string;
  metricLabel: string;
}

const VERTICALS: Vertical[] = [
  {
    id: 'saas-tech',
    title: 'SaaS & Tech',
    description: 'Engineering low-friction demos and automated product-led growth pipelines.',
    icon: Database,
    metric: '4.2x',
    metricLabel: 'LTV:CAC'
  },
  {
    id: 'ecommerce',
    title: 'Ecommerce Brands',
    description: 'Scaling high-volume retail through AOV engineering and retention loops.',
    icon: ShoppingBag,
    metric: '5.4x',
    metricLabel: 'Average ROI'
  },
  {
    id: 'd2c',
    title: 'D2C Brands',
    description: 'Scaling lifestyle and wellness brands from search to social dominance.',
    icon: TrendingUp,
    metric: '8.4x',
    metricLabel: 'Average ROAS'
  },
  {
    id: 'professional-services',
    title: 'Professional Services',
    description: 'Authority-based marketing for consultants and enterprise firms.',
    icon: Globe,
    metric: '60%',
    metricLabel: 'More Bookings'
  }
];

interface VerticalExpertiseProps {
  onVerticalClick?: (verticalId: string) => void;
}

// Animated Counter Component
const AnimatedCounter: React.FC<{ value: string; duration?: number }> = ({ value, duration = 800 }) => {
  const [displayValue, setDisplayValue] = useState('0');
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    const suffix = value.replace(/[0-9.]/g, '');
    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (numericValue - startValue) * easeOut;
      
      setDisplayValue(currentValue.toFixed(suffix === '%' ? 0 : 1) + suffix);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, value, duration]);

  return <span ref={ref}>{displayValue}</span>;
};

export const VerticalExpertise: React.FC<VerticalExpertiseProps> = ({ onVerticalClick }) => {
  const { ref, isIntersecting } = useIntersection();
  const navigate = useNavigate();

  return (
    <section 
      id="vertical-expertise" 
      className="py-16 sm:py-20 md:py-24 bg-slate-50 dark:bg-[#030712] relative overflow-hidden transition-colors duration-300"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-red-500/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-red-500/5 via-purple-500/5 to-orange-500/5 blur-[140px] rounded-full"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-30"></div>
        
        {/* Floating particles - reduced for performance */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-red-500/20 rounded-full animate-float"
            style={{
              left: `${20 + i * 30}%`,
              top: `${25 + (i % 2) * 40}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: '2s'
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 relative">
          {/* Decorative accent lines */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-24 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50"></div>
          
          <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
            <Sparkles className="w-4 h-4 text-red-500 animate-pulse" />
            <h2 className="text-red-500 font-bold uppercase tracking-[0.3em] text-xs">
              Vertical Expertise
            </h2>
            <Sparkles className="w-4 h-4 text-red-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-black text-slate-900 dark:text-white leading-tight sm:leading-none tracking-tighter relative inline-block">
            <span className="relative z-10">Who We Scale.</span>
            {/* Text glow effect */}
            <span className="absolute inset-0 text-slate-900 dark:text-white blur-xl opacity-30 -z-0">
              Who We Scale.
            </span>
          </h3>
          
          {/* Bottom accent line */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-32 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50 mt-4"></div>
        </div>

        {/* Enhanced Vertical Cards */}
        <div 
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {VERTICALS.map((vertical, index) => {
            const Icon = vertical.icon;
            return (
              <Card
                key={vertical.id}
                hover
                onClick={() => navigate(`/verticals/${vertical.id}`)}
                className={`relative transition-all duration-300 group ${
                  isIntersecting 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {/* Card glow effect - reduced blur */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/20 via-purple-500/20 to-orange-500/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 -z-10"></div>
                
                <div className="flex flex-col h-full relative z-10">
                  {/* Enhanced Icon with Dot Indicator */}
                  <div className="mb-6 relative">
                    <div className="flex items-start gap-3">
                      {/* Icon Container */}
                      <div className="relative">
                        {/* Rotating ring - faster */}
                        <div className="absolute -inset-1.5 rounded-xl border-2 border-red-500/20 group-hover:border-red-500/50 group-hover:rotate-90 transition-all duration-300"></div>
                        
                        <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-red-500/10 via-purple-500/10 to-orange-500/10 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:rotate-6 group-hover:-translate-y-1 group-hover:bg-gradient-to-br group-hover:from-red-500/30 group-hover:via-purple-500/30 group-hover:to-orange-500/30 group-hover:border-2 group-hover:border-red-500/50 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                          <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-red-500 relative z-10 group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        
                        {/* Dot indicator below icon */}
                        <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)] opacity-60 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500"></div>
                      </div>
                      
                      {/* Floating sparkles */}
                      <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
                    </div>
                  </div>

                  {/* Enhanced Title with Underline */}
                  <h4 className="text-xl sm:text-2xl font-heading font-black text-slate-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-orange-500 group-hover:bg-clip-text transition-all duration-300 relative inline-block">
                    {vertical.title}
                    {/* Underline that extends slightly beyond */}
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 to-orange-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300" style={{ width: 'calc(100% + 8px)' }}></span>
                  </h4>

                  {/* Enhanced Description with Centered Dot */}
                  <div className="mb-6 flex-grow">
                    <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors duration-300 mb-3">
                      {vertical.description}
                    </p>
                    {/* Centered dot below description */}
                    <div className="flex justify-center">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>

                  {/* Enhanced Separator */}
                  <div className="relative mb-5 overflow-hidden">
                    <div className="border-t border-slate-200 dark:border-white/5 group-hover:border-red-500/20 transition-colors duration-300"></div>
                    {/* Animated line - faster */}
                    <div className="absolute top-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 via-orange-500 to-purple-500 group-hover:w-full transition-all duration-400"></div>
                  </div>

                  {/* Enhanced CTA Link */}
                  <div className="mt-auto flex items-center gap-2 text-white dark:text-slate-300 font-bold text-xs sm:text-sm group-hover:text-red-500 dark:group-hover:text-red-400 group-hover:translate-x-2 transition-all duration-300 cursor-pointer">
                    <span>View Specialized Strategy</span>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 group-hover:scale-105 transition-all duration-300" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
