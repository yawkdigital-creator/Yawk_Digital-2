import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const CaseStudiesPreview: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="results" className="py-16 sm:py-20 md:py-24 bg-slate-100 dark:bg-[#030712] relative overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 sm:gap-8">
          <div className="max-w-3xl">
            <h2 className="text-red-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 sm:mb-6">
              Success Stories
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-black text-slate-900 dark:text-white leading-tight sm:leading-none tracking-tighter">
              The Physics of <br />
              <span className="gradient-text">Profitable Scale.</span>
            </h3>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-slate-600 dark:text-slate-500 text-base sm:text-lg max-w-sm leading-relaxed italic border-l-2 sm:border-l border-slate-300 dark:border-white/10 pl-4 sm:pl-8">
              "Design is the silent ambassador of high-velocity capital."
            </p>
            <Button
              variant="primary"
              size="lg"
              shimmer
              glow
              icon={ArrowRight}
              onClick={() => navigate('/case-studies')}
              className="w-full sm:w-auto"
            >
              View All Case Studies
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
