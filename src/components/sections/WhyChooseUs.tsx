import React from 'react';
import { 
  Zap, 
  Target, 
  BarChart3,
  Sparkles
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { useIntersection } from '@/hooks/useIntersection';

interface Differentiator {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  highlight?: string;
}

const DIFFERENTIATORS: Differentiator[] = [
  {
    id: 'performance',
    title: 'Performance-First Architecture',
    description: 'Every pixel and line of code is optimized for conversion. We don\'t build pretty websites—we build revenue engines.',
    icon: Zap,
    highlight: 'Sub-1s Load Times'
  },
  {
    id: 'data-driven',
    title: 'Data-Driven Decisions',
    description: 'We measure everything. Every design choice, every feature, every campaign is backed by analytics and A/B testing.',
    icon: BarChart3,
    highlight: '142% Avg. Revenue Lift'
  },
  {
    id: 'results',
    title: 'Guaranteed Results',
    description: 'We don\'t work on retainer—we work on results. Our success is tied directly to your growth metrics.',
    icon: Target,
    highlight: '14-Day First Results'
  }
];

export const WhyChooseUs: React.FC = () => {
  const { ref: differentiatorsRef, isIntersecting: differentiatorsVisible } = useIntersection();

  return (
    <section id="why-choose-us" className="py-12 sm:py-16 md:py-24 lg:py-32 bg-slate-50 dark:bg-[#030712] relative overflow-hidden transition-colors duration-300">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-red-500/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-red-500 font-bold uppercase tracking-[0.3em] text-xs mb-2 sm:mb-4 md:mb-6">
            Why Choose Us
          </h2>
        </div>

        {/* Differentiators Section */}
        <div ref={differentiatorsRef} className="mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-black text-slate-900 dark:text-white mb-2 sm:mb-3 md:mb-4">
              What Makes Us <span className="text-red-500">Different</span>
            </h4>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Three core differentiators that separate us from every other agency
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {DIFFERENTIATORS.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.id}
                  hover
                  className={`group relative overflow-hidden transition-all duration-700 ${
                    differentiatorsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 0.15}s` }}
                >
                  {/* Gradient Accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-purple-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>

                  {/* Icon */}
                  <div className="relative mb-3 sm:mb-4 md:mb-6">
                    <div className="absolute -inset-4 bg-gradient-to-br from-red-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-red-500/10 to-purple-500/10 flex items-center justify-center border border-red-500/20 group-hover:border-red-500/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-red-500 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </div>

                  {/* Highlight Badge */}
                  {item.highlight && (
                    <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-red-500/10 to-purple-500/10 border border-red-500/20 mb-3 sm:mb-4 group-hover:border-red-500/50 transition-colors duration-500">
                      <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                      <span className="text-[10px] sm:text-xs font-bold text-red-500 uppercase tracking-wider">
                        {item.highlight}
                      </span>
                    </div>
                  )}

                  {/* Content */}
                  <h5 className="text-lg sm:text-xl md:text-2xl font-heading font-black text-slate-900 dark:text-white mb-2 sm:mb-3 group-hover:text-red-500 transition-colors duration-500">
                    {item.title}
                  </h5>
                  <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-500">
                    {item.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
