import React from 'react';
import { AlertCircle, Lightbulb, Cog, CheckCircle2, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { useIntersection } from '@/hooks/useIntersection';

interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  details: string[];
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'problem',
    title: 'Problem Discovery',
    description: 'We identify the core bottlenecks preventing your brand from scaling profitably.',
    icon: AlertCircle,
    details: [
      'Deep-dive analytics audit',
      'Conversion funnel analysis',
      'Competitive positioning review',
      'Revenue leak identification'
    ]
  },
  {
    id: 'solution',
    title: 'Strategic Solution',
    description: 'Custom architecture designed to eliminate friction and maximize capital velocity.',
    icon: Lightbulb,
    details: [
      'Data-driven strategy blueprint',
      'Revenue system architecture',
      'Technology stack optimization',
      'Growth roadmap development'
    ]
  },
  {
    id: 'process',
    title: 'Surgical Execution',
    description: 'Precision implementation with real-time optimization and performance tracking.',
    icon: Cog,
    details: [
      'Agile sprint deployment',
      'A/B testing & optimization',
      'Performance monitoring',
      'Iterative refinement cycles'
    ]
  },
  {
    id: 'result',
    title: 'Measurable Results',
    description: 'Deliverable outcomes that directly impact your bottom line and market position.',
    icon: CheckCircle2,
    details: [
      'ROI tracking & reporting',
      'Revenue growth metrics',
      'Market share expansion',
      'Sustainable scaling systems'
    ]
  }
];

export const Process: React.FC = () => {
  const { ref, isIntersecting } = useIntersection();

  return (
    <section id="process" className="py-20 sm:py-24 md:py-32 bg-white dark:bg-[#030712] relative overflow-hidden transition-colors duration-300">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-red-500/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20 md:mb-24">
          <h2 className="text-red-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 sm:mb-6">
            Our Methodology
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-slate-900 dark:text-white leading-tight sm:leading-none tracking-tighter mb-6 sm:mb-8">
            The <span className="gradient-text">Revenue Architecture</span> Process
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed px-4">
            A proven framework that transforms brands from struggling to dominant. Every step is measured, optimized, and designed for maximum capital velocity.
          </p>
        </div>

        {/* Process Flow - Visual Timeline */}
        <div ref={ref} className="relative">
          {/* Connecting Line - Desktop Only */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500/20 via-purple-500/20 to-red-500/20 transform -translate-y-1/2 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/40 to-transparent animate-pulse"></div>
          </div>

          {/* Process Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
            {PROCESS_STEPS.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === PROCESS_STEPS.length - 1;
              
              return (
                <div key={step.id} className="relative group">
                  {/* Step Card */}
                  <Card hover className="h-full flex flex-col">
                    {/* Step Number & Icon */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="relative">
                        {/* Step Number Background */}
                        <div className="absolute -inset-4 bg-gradient-to-br from-red-500/10 to-purple-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Icon Container */}
                        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500/10 to-purple-500/10 flex items-center justify-center border border-red-500/20 group-hover:border-red-500/40 group-hover:scale-110 transition-all duration-500">
                          <Icon className="w-8 h-8 text-red-500 group-hover:scale-110 transition-transform duration-500" />
                        </div>
                      </div>

                      {/* Step Number */}
                      <div className="text-6xl sm:text-7xl md:text-8xl font-heading font-black text-slate-200/30 dark:text-white/5 group-hover:text-red-500/20 transition-colors duration-500 leading-none">
                        0{index + 1}
                      </div>
                    </div>

                    {/* Step Title */}
                    <h4 className="text-xl sm:text-2xl font-heading font-black text-slate-900 dark:text-white mb-3 group-hover:text-red-500 transition-colors duration-500">
                      {step.title}
                    </h4>

                    {/* Step Description */}
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-grow">
                      {step.description}
                    </p>

                    {/* Step Details */}
                    <div className="space-y-2.5 pt-4 border-t border-slate-200 dark:border-white/5 group-hover:border-red-500/20 transition-colors duration-500">
                      {step.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-start gap-2.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            {detail}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Arrow Connector - Desktop Only */}
                    {!isLast && (
                      <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                        <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 border-2 border-red-500/30 flex items-center justify-center group-hover:border-red-500 group-hover:bg-red-500/10 transition-all duration-500">
                          <ArrowRight className="w-4 h-4 text-red-500 group-hover:translate-x-0.5 transition-transform duration-300" />
                        </div>
                      </div>
                    )}
                  </Card>
                </div>
              );
            })}
          </div>

          {/* Mobile Flow Indicators */}
          <div className="lg:hidden flex justify-center items-center gap-2 mt-8">
            {PROCESS_STEPS.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-slate-300 dark:bg-white/20 transition-all duration-300"
                style={{
                  opacity: isIntersecting ? 1 : 0.3,
                  animationDelay: `${index * 0.1}s`
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 sm:mt-20 md:mt-24 text-center">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 rounded-full bg-gradient-to-r from-red-500/10 to-purple-500/10 border border-red-500/20">
            <CheckCircle2 className="w-5 h-5 text-red-500" />
            <span className="text-xs sm:text-base font-bold text-slate-900 dark:text-white">
              Average Time to First Results: <span className="text-red-500">14 Days</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
