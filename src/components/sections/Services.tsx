import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { SERVICES } from '@/config/constants';
import { useIntersection } from '@/hooks/useIntersection';

interface ServicesProps {
  onServiceClick?: (serviceId: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onServiceClick }) => {
  const { ref, isIntersecting } = useIntersection();
  const navigate = useNavigate();

  const handleServiceClick = (serviceId: string) => {
    // Map service IDs to routes
    const routeMap: Record<string, string> = {
      'web-dev': '/services/web-development',
      'graphic-design': '/services/graphic-design',
      'ads-mgmt': '/services/ads-management',
      'growth-systems': '/services/ai-business-automation',
      'app-dev': '/services/app-development',
      'seo-aeo': '/services/seo-aeo',
      'video-editing': '/services/video-editing',
      'shop-management': '/services/shop-management',
    };

    const route = routeMap[serviceId];
    if (route) {
      navigate(route);
    }
    
    // Also call the optional callback if provided
    onServiceClick?.(serviceId);
  };

  return (
    <section id="services" className="py-16 sm:py-20 md:py-24 bg-slate-50 dark:bg-[#030712] relative overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 sm:gap-8 mb-12 sm:mb-16 md:mb-20">
          <div className="max-w-3xl">
            <h2 className="text-red-500 font-bold uppercase tracking-[0.3em] text-xs mb-3 sm:mb-4">
              Our Capabilities
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-black text-slate-900 dark:text-white leading-tight sm:leading-none tracking-tighter">
              A Full-Spectrum <br />
              <span className="gradient-text">Design & Growth Lab.</span>
            </h3>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-sm lg:mb-4 leading-relaxed border-l-2 sm:border-l border-red-500/20 pl-4 sm:pl-6">
            We don't just provide services; we engineer brand leverage. Every pixel and line of code is measured against your bottom line.
          </p>
        </div>

        <div 
          ref={ref}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.id}
                hover
                onClick={() => handleServiceClick(service.id)}
                className={`relative transition-all duration-300 group cursor-pointer ${
                  isIntersecting 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {/* Card glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/20 via-purple-500/20 to-orange-500/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 -z-10"></div>

                <div className="flex flex-col h-full relative z-10">

                  {/* Icon with rotating ring */}
                  <div className="mb-4 sm:mb-6 relative">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        {/* Rotating ring */}
                        <div className="absolute -inset-1.5 rounded-xl border-2 border-red-500/20 group-hover:border-red-500/50 group-hover:rotate-90 transition-all duration-300"></div>
                        
                        <div className="relative w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-red-500/10 via-purple-500/10 to-orange-500/10 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:rotate-6 group-hover:-translate-y-1 group-hover:bg-gradient-to-br group-hover:from-red-500/30 group-hover:via-purple-500/30 group-hover:to-orange-500/30 group-hover:border-2 group-hover:border-red-500/50 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                          <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-red-500 relative z-10 group-hover:scale-105 transition-transform duration-300" />
                        </div>

                        {/* Dot indicator */}
                        <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)] opacity-60 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500"></div>
                      </div>

                      {/* Floating sparkle */}
                      <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
                    </div>
                  </div>

                  {/* Title with gradient underline */}
                  <h4 className="text-base sm:text-xl font-heading font-black text-slate-900 dark:text-white mb-3 sm:mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-orange-500 group-hover:bg-clip-text transition-all duration-300 relative inline-block">
                    {service.title}
                    <span className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300" style={{ width: 'calc(100% + 8px)' }}></span>
                  </h4>

                  {/* Tags */}
                  <div className="mb-4 sm:mb-6 flex-grow">
                    <div className="flex flex-wrap gap-1 sm:gap-1.5 opacity-70 group-hover:opacity-100 transition-all duration-300">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-[8px] sm:text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider group-hover:border-red-500/30 group-hover:text-slate-800 dark:group-hover:text-slate-300 group-hover:bg-red-500/10 transition-all duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {/* Centered dot below tags */}
                    <div className="flex justify-center mt-3">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>

                  {/* Animated separator */}
                  <div className="relative mb-4 overflow-hidden">
                    <div className="border-t border-slate-200 dark:border-white/5 group-hover:border-red-500/20 transition-colors duration-300"></div>
                    <div className="absolute top-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 via-orange-500 to-purple-500 group-hover:w-full transition-all duration-500"></div>
                  </div>

                  {/* CTA */}
                  <div className="mt-auto flex items-center gap-2 text-slate-700 dark:text-slate-300 font-bold text-xs sm:text-sm group-hover:text-red-500 dark:group-hover:text-red-400 group-hover:translate-x-2 transition-all duration-300">
                    <span>View Service</span>
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
