import React, { useState, useEffect } from 'react';
import {
  Users, TrendingUp, Star, CheckCircle, Rocket,
  Award, Target, BarChart2, Globe, Zap, Shield,
  Heart, Clock, DollarSign, Package, Layers,
} from 'lucide-react';
import { useIntersection } from '@/hooks/useIntersection';

export type InsightIconName =
  | 'Users' | 'TrendingUp' | 'Star' | 'CheckCircle' | 'Rocket'
  | 'Award' | 'Target' | 'BarChart2' | 'Globe' | 'Zap' | 'Shield'
  | 'Heart' | 'Clock' | 'DollarSign' | 'Package' | 'Layers';

export interface InsightMetric {
  id: string;
  iconName: InsightIconName;
  value: string;
  label: string;
}

export const INSIGHT_ICONS: Record<InsightIconName, React.ComponentType<{ className?: string }>> = {
  Users, TrendingUp, Star, CheckCircle, Rocket,
  Award, Target, BarChart2, Globe, Zap, Shield,
  Heart, Clock, DollarSign, Package, Layers,
};

export const DEFAULT_INSIGHTS: InsightMetric[] = [
  { id: 'brands',       iconName: 'Users',       value: '10+',    label: 'BRAND SCALED' },
  { id: 'traffic',      iconName: 'TrendingUp',  value: '3x-10x', label: 'TRAFFIC GROWTH' },
  { id: 'satisfaction', iconName: 'Star',        value: '98%',    label: 'CLIENT SATISFACTION' },
  { id: 'retention',    iconName: 'CheckCircle', value: '98%',    label: 'RETENTION RATE' },
];

interface TrustedByLeadersProps {
  onCtaClick?: () => void;
}

export const TrustedByLeaders: React.FC<TrustedByLeadersProps> = ({ onCtaClick }) => {
  const { ref, isIntersecting } = useIntersection();
  const [metrics, setMetrics] = useState<InsightMetric[]>(DEFAULT_INSIGHTS);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('yd_insights');
      if (saved) setMetrics(JSON.parse(saved));
    } catch { /* fallback to defaults */ }
  }, []);

  return (
    <section className="py-20 sm:py-24 md:py-32 bg-slate-100 dark:bg-[#030712] relative overflow-hidden transition-colors duration-300">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/5 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 blur-[150px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-slate-900 dark:text-white mb-4 sm:mb-6">
            Trusted by <span className="text-red-500">Industry Leaders</span>
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-2 h-2 rounded-full border border-slate-400/50 dark:border-white/30 bg-slate-300/50 dark:bg-white/10"></div>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
              Numbers that speak for themselves.
            </p>
          </div>
        </div>

        {/* Metric Cards */}
        <div
          ref={ref}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-12 sm:mb-16 md:mb-20"
        >
          {metrics.map((metric, index) => {
            const Icon = INSIGHT_ICONS[metric.iconName] ?? Users;
            return (
              <div
                key={metric.id}
                className={`group relative bg-white dark:bg-slate-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-200 dark:border-slate-800/50 hover:border-red-500/50 transition-all duration-300 shadow-sm dark:shadow-none ${
                  isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-red-500/0 to-purple-500/0 group-hover:from-red-500/10 group-hover:to-purple-500/10 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>

                <div className="relative z-10">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-red-500/10 flex items-center justify-center mb-3 sm:mb-4 md:mb-6 group-hover:bg-red-500/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-red-500" />
                  </div>
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-black text-slate-900 dark:text-white mb-1.5 sm:mb-2 md:mb-3 tracking-tight">
                    {metric.value}
                  </div>
                  <div className="text-[9px] sm:text-[10px] md:text-xs font-bold text-slate-500 dark:text-slate-500 uppercase tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] leading-tight">
                    {metric.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            onClick={onCtaClick}
            className="group relative bg-white dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800/50 hover:border-red-500/50 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-900 px-8 sm:px-12 py-4 sm:py-5 text-base sm:text-lg font-bold rounded-2xl flex items-center justify-center gap-3 mx-auto transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm dark:shadow-none"
          >
            <span>
              Ready to <span className="text-red-500">Outperform</span> Your Competition?
            </span>
            <Rocket className="w-5 h-5 text-red-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};
