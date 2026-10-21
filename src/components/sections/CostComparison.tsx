import React from 'react';
import { ArrowDown, ArrowRight, Briefcase, Building2, Check, Clock, Sparkles, User, X } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   CostComparison: "Every other way costs more." 5 alternatives + Yawk callout.
   Add in App.tsx wherever you want, e.g. after <Guarantee />:
     import { CostComparison } from '@/components/sections/CostComparison';
     <CostComparison onCtaClick={handleGrowthPlanOpen} />
   Prices are market estimates from the reference. Confirm them before going live.
   The CTA opens the growth-plan modal when onCtaClick is given; otherwise it
   scrolls to the element with id="pricing".
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

export const CostComparison: React.FC<{ onCtaClick?: () => void }> = ({ onCtaClick }) => (
  <section id="comparison" className="bg-[#F5F5F7] dark:bg-[#030712] py-12 sm:py-14 transition-colors duration-300">
    <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
      <div className="text-center">
        <p className="font-mono text-[12px] text-slate-500 dark:text-slate-400">// the real cost comparison</p>
        <h2 className="mt-3 text-[36px] font-bold leading-[1.05] tracking-[-0.03em] text-slate-950 dark:text-white sm:text-[46px]">
          Every other way costs more.
        </h2>
        <p className="mt-3 text-[15px] text-slate-600 dark:text-slate-400">
          What you&apos;d really pay to get social handled, everywhere else.
        </p>
      </div>

      {/* Alternatives */}
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {OPTIONS.map(({ title, price, unit, note, con, Icon }) => (
          <div
            key={title}
            className="flex flex-col rounded-[16px] border border-black/5 bg-[#FBFAF9] p-4 shadow-[0_12px_26px_-22px_rgba(15,23,42,0.35)] transition hover:-translate-y-0.5"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#EEEDEA] text-slate-700">
              <Icon className="h-4 w-4" />
            </span>
            <p className="mt-3 text-[14px] font-bold text-slate-950">{title}</p>
            <p className="mt-1.5 text-[22px] font-bold leading-none tracking-tight text-slate-950">
              {price}
              {unit && <span className="ml-1 text-[12px] font-normal text-slate-500">{unit}</span>}
            </p>
            {note && <p className="mt-1 text-[11px] text-slate-500">{note}</p>}
            <p className="mt-3 flex items-center gap-1.5 text-[12px] font-semibold text-[#b42318]">
              <X className="h-3 w-3" strokeWidth={3} /> {con}
            </p>
          </div>
        ))}
      </div>

      {/* Arrow */}
      <div className="mt-7 flex flex-col items-center gap-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">The better way</span>
        <ArrowDown className="h-4 w-4" style={{ color: BLUE }} />
      </div>

      {/* Yawk callout */}
      <div className="mt-3 rounded-[20px] border border-black/5 bg-[#FBFAF9] p-6 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.3)]">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-baseline gap-3">
            <p className="text-[28px] font-bold tracking-tight text-slate-950">Yawk</p>
            <p className="text-[28px] font-bold tracking-tight" style={{ color: BLUE }}>from $99</p>
            <span className="text-[13px] text-slate-500">/mo</span>
          </div>
          <p className="max-w-[460px] text-[14px] leading-relaxed text-slate-700">
            A whole creative team of <b className="font-semibold text-slate-950">real marketers & designers</b>, video and ads, for less than one freelancer. Human-made work on a platform we built ourselves.
          </p>
          <button
            type="button"
            onClick={onCtaClick ?? goToPricing}
            className="inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-semibold text-white transition hover:brightness-110"
            style={{ background: BLUE }}
          >
            See plans & pricing <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mt-5 flex flex-wrap gap-2 border-t border-black/5 pt-4">
          {PILLS.map((p) => (
            <span key={p} className="inline-flex items-center gap-1.5 rounded-full bg-[#EEEDEA] px-3 py-1.5 text-[12px] font-semibold text-slate-800">
              <Check className="h-3 w-3 text-[#15803d]" strokeWidth={3} /> {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  </section>
);
