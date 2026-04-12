import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface CTAProps {
  onPlanClick: () => void;
  onStrategyClick: () => void;
}

export const CTA: React.FC<CTAProps> = ({ onPlanClick, onStrategyClick }) => {
  return (
    <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-red-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="max-w-5xl mx-auto glass-card rounded-3xl sm:rounded-[48px] p-6 sm:p-12 md:p-16 lg:p-24 text-center border-red-500/20 shadow-2xl overflow-hidden relative">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-500/10 blur-3xl rounded-full"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 blur-3xl rounded-full"></div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-slate-900 dark:text-white mb-6 sm:mb-8 leading-tight tracking-tight">
            Ready to Build a <br />
            <span className="gradient-text">Scalable Revenue System?</span>
          </h2>

          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-400 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-2">
            We only partner with a select number of clients per quarter to ensure absolute excellence. If your brand is ready to command the market, let's talk.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto">
            <Button variant="primary" size="lg" shimmer glow icon={Sparkles} onClick={onPlanClick} className="w-full sm:w-auto">
              Build My Growth Plan
            </Button>
            <Button variant="secondary" size="lg" onClick={onStrategyClick} className="w-full sm:w-auto">
              Request Custom Strategy
            </Button>
          </div>

          <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-slate-200 dark:border-white/5 flex flex-wrap justify-center gap-5 sm:gap-10 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            <span className="text-sm sm:text-xl font-heading font-black text-slate-700 dark:text-white tracking-tighter hover:scale-110 transition-transform cursor-default text-center">
              Google Premier Partner
            </span>
            <span className="text-sm sm:text-xl font-heading font-black text-slate-700 dark:text-white tracking-tighter hover:scale-110 transition-transform cursor-default text-center">
              Meta Ads Specialist
            </span>
            <span className="text-sm sm:text-xl font-heading font-black text-slate-700 dark:text-white tracking-tighter hover:scale-110 transition-transform cursor-default text-center">
              HubSpot Elite
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
