import React, { useState, useEffect } from 'react';
import { ArrowRight, TrendingUp, CheckCircle2, Target, Lightbulb } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CASE_STUDIES } from '@/config/constants';
import { useIntersection } from '@/hooks/useIntersection';
import type { CaseStudy } from '@/types';

export const CaseStudies: React.FC = () => {
  const { ref, isIntersecting } = useIntersection();
  const [studies, setStudies] = useState<CaseStudy[]>(CASE_STUDIES);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('yd_case_studies');
      if (saved) setStudies(JSON.parse(saved));
    } catch { /* fallback to defaults */ }
  }, []);

  return (
    <section id="results" className="py-16 sm:py-20 md:py-24 bg-slate-100 dark:bg-[#030712] relative overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 sm:gap-8 mb-12 sm:mb-16 md:mb-20">
          <div className="max-w-3xl">
            <h2 className="text-red-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 sm:mb-6">
              Success Stories
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-black text-slate-900 dark:text-white leading-tight sm:leading-none tracking-tighter">
              The Physics of <br />
              <span className="gradient-text">Profitable Scale.</span>
            </h3>
          </div>
          <p className="text-slate-600 dark:text-slate-500 text-base sm:text-lg max-w-sm mb-4 leading-relaxed italic border-l-2 sm:border-l border-slate-300 dark:border-white/10 pl-4 sm:pl-8">
            "Design is the silent ambassador of high-velocity capital."
          </p>
        </div>

        <div ref={ref} className="space-y-12 sm:space-y-16 md:space-y-20">
          {studies.map((study, idx) => (
            <div key={study.id} className="relative group/section">
              {/* Background number */}
              <div className="absolute -top-12 -left-8 text-[10rem] font-black text-slate-200/[0.3] dark:text-white/[0.02] select-none pointer-events-none leading-none group-hover/section:text-red-500/[0.1] dark:group-hover/section:text-red-500/[0.03] transition-colors duration-1000">
                0{idx + 1}
              </div>

              <div
                className={`flex flex-col lg:flex-row gap-8 xl:gap-12 ${
                  idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Visual Side: Image & Metrics */}
                <div className="flex-1 w-full">
                  <Card className="p-0 overflow-hidden">
                    <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                      <img
                        src={study.imageUrl}
                        className="w-full h-full object-cover grayscale group-hover/section:grayscale-0 transition-all duration-1000"
                        alt={study.client}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-slate-950 via-slate-50/40 dark:via-slate-950/40 to-transparent"></div>
                      <div className="absolute top-6 left-6 flex gap-2">
                        <div className="px-4 py-1.5 bg-red-600 text-white font-black text-[10px] uppercase tracking-widest rounded-full">
                          {study.industry}
                        </div>
                        <div className="px-4 py-1.5 bg-white/80 dark:bg-white/10 backdrop-blur-md text-slate-900 dark:text-white font-black text-[10px] uppercase tracking-widest rounded-full border border-slate-200 dark:border-white/10">
                          {study.serviceUsed}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 md:p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]">
                            <TrendingUp className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-slate-900 dark:text-white font-black uppercase tracking-widest text-[10px]">
                              Revenue Velocity Index
                            </div>
                            <div className="text-slate-500 dark:text-slate-500 text-[9px] font-bold">
                              Protocol_v4 Audit Track
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-200 dark:border-white/5">
                        {study.results.map((result, ridx) => (
                          <div
                            key={ridx}
                            className="relative group/metric text-center"
                          >
                            <div className="text-lg sm:text-xl md:text-2xl font-heading font-black text-slate-900 dark:text-white mb-1 tracking-tight group-hover/metric:text-red-500 transition-colors whitespace-nowrap">
                              {result.prefix && <span className="mr-0.5">{result.prefix}</span>}
                              <span>{result.value}</span>
                              {result.suffix && <span className="ml-0.5">{result.suffix}</span>}
                            </div>
                            <div className="text-[8px] uppercase font-bold text-slate-500 dark:text-slate-600 tracking-[0.25em] group-hover/metric:text-slate-600 dark:group-hover/metric:text-slate-400 transition-colors">
                              {result.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Content Side: The Narrative */}
                <div className="flex-1 flex flex-col justify-center space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-500/5 border border-red-500/10 text-red-500 w-fit">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-[9px] font-black uppercase tracking-[0.15em]">
                      Partner Success Case 0{idx + 1}
                    </span>
                  </div>

                  <h4 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-slate-900 dark:text-white leading-tight tracking-tighter">
                    Re-Engineering <br />
                    <span className="gradient-text">{study.client}</span>
                  </h4>

                  <div className="space-y-6">
                    <div className="flex gap-4 items-start group">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center shrink-0 border border-slate-200 dark:border-white/10 group-hover:bg-red-500/10 group-hover:border-red-500/30 transition-all">
                        <Target className="w-4 h-4 text-slate-500 dark:text-slate-400 group-hover:text-red-500" />
                      </div>
                      <div>
                        <h5 className="text-slate-900 dark:text-white font-black uppercase tracking-widest text-[10px] mb-2">
                          The Challenge
                        </h5>
                        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                          {study.challenge}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start group">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center shrink-0 border border-slate-200 dark:border-white/10 group-hover:bg-red-500/10 group-hover:border-red-500/30 transition-all">
                        <Lightbulb className="w-4 h-4 text-slate-500 dark:text-slate-400 group-hover:text-red-500" />
                      </div>
                      <div>
                        <h5 className="text-slate-900 dark:text-white font-black uppercase tracking-widest text-[10px] mb-2">
                          The Protocol
                        </h5>
                        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                          {study.solution}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-4">
                    <Button
                      variant="primary"
                      size="sm"
                      shimmer
                      icon={ArrowRight}
                      onClick={() => {
                        // Placeholder for detailed view
                        console.log('View case study:', study.id);
                      }}
                    >
                      View Full Case Study
                    </Button>
                    <div className="flex items-center gap-3 text-slate-500 dark:text-slate-500">
                      <div className="w-8 h-px bg-slate-300 dark:bg-slate-800"></div>
                      <span className="text-[9px] font-bold uppercase tracking-widest">
                        Verified Results
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
