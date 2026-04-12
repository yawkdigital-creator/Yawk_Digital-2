import React from 'react';
import { BaseModal } from './BaseModal';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, Zap, Star, Rocket } from 'lucide-react';
import { ServiceDetail } from '@/config/serviceDetails';

interface ServiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceDetail | null;
  onDeploy?: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  isOpen,
  onClose,
  service,
  onDeploy,
}) => {
  if (!service) return null;

  // Split title for gradient effect on second word
  const titleWords = service.title.split(' ');
  const firstWord = titleWords[0];
  const restWords = titleWords.slice(1).join(' ');

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-6 md:gap-8">
        {/* Left Panel - Service Description */}
        <div className="space-y-6 md:space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
              <span className="text-red-500 text-[9px] font-black uppercase tracking-[0.2em]">
                CAPABILITY BLUEPRINT V4.2
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-slate-900 dark:text-white leading-tight tracking-tighter mb-4">
              {firstWord}{' '}
              <span className="gradient-text">{restWords}</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              {service.detailedDescription}
            </p>
          </div>

          {/* What's Included */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-red-500" />
              <h3 className="text-base md:text-lg font-heading font-black text-slate-900 dark:text-white uppercase tracking-wider">
                What's Included
              </h3>
            </div>
            <div className="space-y-2">
              {service.whatsIncluded.map((item, index) => (
                <div key={index} className="flex items-start gap-2.5">
                  <div className="w-1 h-1 rounded-full bg-red-500 mt-2 shrink-0"></div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Why We Are Better */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-4 h-4 text-red-500" />
              <h3 className="text-base md:text-lg font-heading font-black text-slate-900 dark:text-white uppercase tracking-wider">
                Why We Are Better
              </h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {service.whyBetter}
            </p>
          </div>
        </div>

        {/* Right Panel - Outcomes & Features */}
        <div className="space-y-6 md:space-y-8">
          {/* Service Outcome */}
          <div>
            <h3 className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] mb-3">
              Service Outcome
            </h3>
            <div className="p-4 rounded-xl bg-gradient-to-br from-red-500/10 to-purple-500/10 border border-red-500/20">
              <p className="text-lg md:text-xl font-heading font-black text-slate-900 dark:text-white">
                {service.outcome}
              </p>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="space-y-4">
            {service.metrics.map((metric, index) => (
              <div key={index}>
                <div className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] mb-1.5">
                  {metric.label}
                </div>
                <div className="text-2xl md:text-3xl font-heading font-black text-slate-900 dark:text-white tracking-tight">
                  {metric.prefix && <span className="mr-0.5">{metric.prefix}</span>}
                  <span>{typeof metric.value === 'string' 
                    ? metric.value 
                    : metric.value < 0 
                    ? metric.value 
                    : metric.value}</span>
                  {metric.suffix && <span className="ml-0.5">{metric.suffix}</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Technology Tags */}
          <div>
            <div className="flex flex-wrap gap-1.5">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-[9px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-3">
            <Button
              variant="primary"
              size="md"
              shimmer
              icon={Rocket}
              iconPosition="right"
              onClick={() => {
                onDeploy?.();
                onClose();
              }}
              className="w-full text-sm"
            >
              Deploy This Capability
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-3 text-[9px]">
        <div className="font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
          Surgical Precision Execution
        </div>
        <div className="font-bold text-slate-400 dark:text-slate-500">
          REF_ID: {service.refId}
        </div>
        <div className="text-slate-400 dark:text-slate-500">
          © {new Date().getFullYear()} YAWK DIGITAL LABS
        </div>
      </div>
    </BaseModal>
  );
};
