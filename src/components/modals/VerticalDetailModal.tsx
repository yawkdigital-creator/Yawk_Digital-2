import React, { useState, useEffect, useRef } from 'react';
import { BaseModal } from './BaseModal';
import { BarChart3, Sparkles } from 'lucide-react';
import { VerticalDetail } from '@/config/verticalDetails';

// Animated Counter Component for Modal
const AnimatedCounter: React.FC<{ value: string; duration?: number; className?: string }> = ({ 
  value, 
  duration = 800,
  className = ''
}) => {
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
      { threshold: 0.1 }
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

  return <span ref={ref} className={className}>{displayValue}</span>;
};

interface VerticalDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  vertical: VerticalDetail | null;
  onGetStrategy?: () => void;
}

export const VerticalDetailModal: React.FC<VerticalDetailModalProps> = ({
  isOpen,
  onClose,
  vertical,
  onGetStrategy
}) => {
  if (!vertical) return null;

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="space-y-6 md:space-y-8 relative">
        {/* Animated background particles - reduced for performance */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-red-500/30 rounded-full animate-float"
              style={{
                left: `${15 + (i * 25)}%`,
                top: `${20 + (i % 2) * 35}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>

        {/* Enhanced Header Badge */}
        <div className="flex items-center gap-2 relative z-10">
          <div className="relative">
            <div className="w-4 h-4 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center animate-pulse">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-2.5 h-2.5 text-red-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Vertical Strategic Protocol
            </span>
            <Sparkles className="w-2.5 h-2.5 text-red-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>

        {/* Enhanced Title */}
        <div className="relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-slate-900 dark:text-white mb-2 relative inline-block">
            <span className="relative z-10">
              {vertical.title}{' '}
              <span className="bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                {vertical.subtitle.split(' ')[0]}
              </span>
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient" style={{ animationDelay: '0.5s' }}>
                {' '}{vertical.subtitle.split(' ').slice(1).join(' ')}
              </span>
            </span>
          </h2>
        </div>

        {/* Enhanced Description */}
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed italic max-w-3xl relative z-10 border-l-2 border-red-500/30 pl-4 py-2 bg-slate-100/20 dark:bg-slate-800/20 rounded-r-lg backdrop-blur-sm">
          {vertical.description}
        </p>

        {/* Enhanced Performance Metrics Card */}
        <div className="bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-slate-300/50 dark:border-slate-700/50 p-4 sm:p-6 relative overflow-hidden group hover:border-red-500/30 transition-all duration-300">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-purple-500/5 to-orange-500/5 pointer-events-none group-hover:from-red-500/10 group-hover:via-purple-500/10 group-hover:to-orange-500/10 transition-all duration-300"></div>
          
          <div className="relative z-10">
            <div className="mb-4">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Target Performance
              </h3>
            </div>

            {/* Enhanced Primary Metric */}
            <div className="mb-6 relative">
              <div className="flex items-baseline gap-2 relative z-10 flex-wrap">
                <span className="text-3xl sm:text-4xl md:text-5xl font-heading font-black bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient relative inline-block">
                  <AnimatedCounter value={vertical.primaryMetric.value} />
                </span>
                <span className="text-lg sm:text-xl font-heading font-bold text-slate-900 dark:text-white group-hover:text-red-400 transition-colors duration-500">
                  {vertical.primaryMetric.label}
                </span>
              </div>
            </div>

            {/* Enhanced Additional Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
              {vertical.metrics.map((metric, index) => (
                <div 
                  key={index} 
                  className="border-t border-slate-300/50 dark:border-slate-700/50 pt-3 relative group/metric hover:border-red-500/50 transition-colors duration-300"
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1.5 flex items-center gap-1.5">
                    <span className="w-0.5 h-0.5 rounded-full bg-red-500 opacity-0 group-hover/metric:opacity-100 transition-opacity duration-300"></span>
                    {metric.label}
                  </p>
                  <p className="text-xl sm:text-2xl font-heading font-bold text-slate-900 dark:text-white group-hover/metric:text-red-400 group-hover/metric:scale-105 transition-all duration-300 inline-block">
                    <AnimatedCounter value={metric.value} />
                  </p>
                </div>
              ))}
            </div>

            {/* Enhanced Data Stream Indicator */}
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-500 relative">
              <div className="flex items-center gap-1.5">
                <BarChart3 className="w-3 h-3 text-red-500/50 animate-pulse" />
                <span className="font-mono uppercase tracking-widest">SECURED_DATA_STREAM.</span>
              </div>
              {/* Animated dots */}
              <div className="flex gap-0.5 ml-1.5">
                <div className="w-0.5 h-0.5 bg-red-500 rounded-full animate-pulse"></div>
                <div className="w-0.5 h-0.5 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-0.5 h-0.5 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Feature Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 relative z-10">
          {vertical.features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-slate-100/30 dark:bg-slate-800/30 backdrop-blur-xl rounded-xl border border-slate-300/30 dark:border-slate-700/30 p-4 hover:border-red-500/50 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-all duration-300 group/feature relative overflow-hidden hover:scale-105 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="relative z-10">
                  <div className="relative mb-3">
                    <div className="relative w-10 h-10 rounded-full border-2 border-red-500/30 flex items-center justify-center group-hover/feature:border-red-500 group-hover/feature:bg-red-500/10 group-hover/feature:scale-105 transition-all duration-300">
                      <Icon className="w-5 h-5 text-red-500 relative z-10 group-hover/feature:scale-105 transition-transform duration-300" />
                    </div>
                  </div>
                  
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-2 group-hover/feature:text-red-400 transition-colors duration-300">
                    {feature.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed group-hover/feature:text-slate-700 dark:group-hover/feature:text-slate-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced CTA Button */}
        <div className="pt-4 relative z-10">
          <button
            onClick={() => {
              onGetStrategy?.();
              onClose();
            }}
            className="relative w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-[length:200%_auto] hover:bg-[length:100%_auto] text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] text-sm sm:text-base group overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Get Your Specialized Strategy
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            </span>
          </button>
        </div>
      </div>
    </BaseModal>
  );
};
