import React from 'react';
import { ArrowDown, ArrowRight, Briefcase, Building2, Check, Clock, Sparkles, User, X } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   CostComparison: "Every other way costs more." 5 alternatives + Yawk callout.
   Add in App.tsx wherever you want, e.g. after <PricingBuilder />:
     import { CostComparison } from '@/components/sections/CostComparison';
     <CostComparison />
   Prices are market estimates from the reference. Confirm them before going live.
   The CTA scrolls to the element with id="pricing" (give your pricing section that id).
   ───────────────────────────────────────────────────────────────────────────── */

const BLUE = '#3b5bff';

const OPTIONS: { title: string; price: string; unit?: string; note?: string; con: string; Icon: React.FC<{ className?: string }> }[] = [
  { title: 'Do it yourself', price: '$0', note: '+ your nights & weekends', con: 'Eats your time', Icon: Clock },
  { title: 'AI tools', price: '$30–150', unit: '/mo', con: 'Generic & off-brand', Icon: Sparkles },
  { title: 'Freelancer', price: '$500–$2,500', unit: '/mo', con: 'Flaky & single-skill', Icon: User },
  { title: 'Boutique agency', price: '$1,500–$5,000', unit: '/mo', con: 'Locked-in contracts', Icon: Briefcase },
  { title: 'In-house hire', price: '$4,500+', unit: '/mo', con: 'Costly to hire & manage', Icon: Building2 },
];

const PILLS = [
  'Real human team, not AI',
  'Onboarding, monthly & support calls anytime',
  'Our own platform, not 3 tools',
  'No contracts, cancel anytime',
];

const goToPricing = () => {
  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export const CostComparison: React.FC = () => (
  <section className="bg-[#F5F5F7] dark:bg-[#030712] py-10 sm:py-12 transition-colors duration-300">
    <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
      <div className="text-center">
        <p className="font-mono text-[11px] text-slate-500 dark:text-slate-400">// the real cost comparison</p>
        <h2 className="mt-2 text-[30px] font-bold leading-[1.05] tracking-[-0.03em] text-slate-950 dark:text-white sm:text-[38px]">
          Every other way costs more.
        </h2>
        <p className="mt-2 text-[13px] text-slate-600 dark:text-slate-400">
          What you&apos;d really pay to get social handled, everywhere else.
        </p>
      </div>

      {/* Alternatives */}
      <div className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
        {OPTIONS.map(({ title, price, unit, note, con, Icon }) => (
          <div
            key={title}
            className="flex flex-col rounded-[14px] border border-black/5 bg-[#FBFAF9] p-3 shadow-[0_10px_22px_-20px_rgba(15,23,42,0.35)] transition hover:-translate-y-0.5"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-[#EEEDEA] text-slate-700">
              <Icon className="h-3.5 w-3.5" />
            </span>
            <p className="mt-2.5 text-[13px] font-bold text-slate-950">{title}</p>
            <p className="mt-1 text-[18px] font-bold leading-none tracking-tight text-slate-950">
              {price}
              {unit && <span className="ml-1 text-[11px] font-normal text-slate-500">{unit}</span>}
            </p>
            {note && <p className="mt-1 text-[10px] text-slate-500">{note}</p>}
            <p className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-[#b42318]">
              <X className="h-2.5 w-2.5" strokeWidth={3} /> {con}
            </p>
          </div>
        ))}
      </div>

      {/* Arrow */}
      <div className="mt-5 flex flex-col items-center gap-1.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">The better way</span>
        <ArrowDown className="h-3.5 w-3.5" style={{ color: BLUE }} />
      </div>

      {/* Yawk callout */}
      <div className="mt-2.5 rounded-[18px] border border-black/5 bg-[#FBFAF9] p-5 shadow-[0_16px_34px_-26px_rgba(15,23,42,0.3)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-baseline gap-2.5">
            <p className="text-[22px] font-bold tracking-tight text-slate-950">Yawk</p>
            <p className="text-[22px] font-bold tracking-tight" style={{ color: BLUE }}>from $99</p>
            <span className="text-[12px] text-slate-500">/mo</span>
          </div>
          <p className="max-w-[440px] text-[13px] leading-relaxed text-slate-700">
            A whole creative team of <b className="font-semibold text-slate-950">real marketers & designers</b>, video and ads, for less than one freelancer. Human-made work on a platform we built ourselves.
          </p>
          <button
            type="button"
            onClick={goToPricing}
            className="inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold text-white transition hover:brightness-110"
            style={{ background: BLUE }}
          >
            See plans & pricing <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 border-t border-black/5 pt-3">
          {PILLS.map((p) => (
            <span key={p} className="inline-flex items-center gap-1.5 rounded-full bg-[#EEEDEA] px-2.5 py-1 text-[11px] font-semibold text-slate-800">
              <Check className="h-2.5 w-2.5 text-[#15803d]" strokeWidth={3} /> {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  </section>
);
