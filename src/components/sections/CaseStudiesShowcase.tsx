import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Image as ImageIcon, Megaphone, Globe, Plus } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   CaseStudiesShowcase: "Real businesses. Real results." 4-up row of cards.
   Uses your three existing case studies (from src/config/constants.ts).
   The 4th slot is a "your brand could be next" card. Replace it with a real
   4th case study by adding an entry to CASES.
   Hover: card gets a darker border + tinted background, a logo badge appears
   on the photo, and "Read story" turns solid black.
   Add in App.tsx wherever you want, e.g. after <CostComparison />:
     import { CaseStudiesShowcase } from '@/components/sections/CaseStudiesShowcase';
     <CaseStudiesShowcase onCtaClick={handleGrowthPlanOpen} />
   "Read story" goes to /case-studies.
   ───────────────────────────────────────────────────────────────────────────── */

type Case = {
  id: string;
  client: string;
  service: string;
  Icon: React.FC<{ className?: string }>;
  image: string;
  metric: string;
  metricLabel: string;
  summary: string;
};

const CASES: Case[] = [
  {
    id: 'apex-fintech',
    client: 'Apex Fintech',
    service: 'Branding + Web Dev + Ads',
    Icon: Globe,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1000&h=700',
    metric: '+312%',
    metricLabel: 'revenue growth',
    summary: 'Apex Fintech rebranded, rebuilt its site for conversions, and cut acquisition costs by 45%.',
  },
  {
    id: 'lumina-wellness',
    client: 'Lumina Wellness',
    service: 'Graphic Design + Social + Web Dev',
    Icon: ImageIcon,
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1000&h=700',
    metric: '+240%',
    metricLabel: 'revenue lift',
    summary: 'Lumina Wellness fixed ad fatigue with a content engine and cut product-page bounce by 65%.',
  },
  {
    id: 'techflow-solutions',
    client: 'TechFlow Solutions',
    service: 'Revenue Systems + Ads + Web Dev',
    Icon: Megaphone,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000&h=700',
    metric: '$2.5M+',
    metricLabel: 'monthly revenue',
    summary: 'TechFlow Solutions lifted trial-to-paid conversion to 28% and cut CAC by 42%.',
  },
];

// Plain CSS grid (not Tailwind grid classes) so the 4-up row always applies.
const GRID_CSS = `
.cs-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
@media (min-width: 768px) { .cs-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; } }
`;

export const CaseStudiesShowcase: React.FC<{ onCtaClick?: () => void }> = ({ onCtaClick }) => (
  <section className="bg-[#F5F5F7] dark:bg-[#030712] py-12 sm:py-14 transition-colors duration-300">
    <style>{GRID_CSS}</style>
    <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
      <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="font-mono text-[11px] text-slate-500 dark:text-slate-400">// case studies</p>
          <h2 className="mt-2 text-[30px] font-bold leading-[1.05] tracking-[-0.03em] text-slate-950 dark:text-white sm:text-[38px]">
            Real businesses.
            <br />
            Real results.
          </h2>
        </div>
        <p className="max-w-[340px] text-[13px] leading-relaxed text-slate-600 dark:text-slate-400">
          From local service businesses to fast-growing DTC brands, here&apos;s exactly what a dedicated Yawk team delivers for real, lasting growth.
        </p>
      </div>

      <div className="cs-grid mt-7">
        {CASES.map((c) => {
          const { Icon } = c;
          return (
            <article
              key={c.id}
              className="group flex min-w-0 flex-col overflow-hidden rounded-[16px] border border-black/5 bg-[#FBFAF9] shadow-[0_12px_26px_-22px_rgba(15,23,42,0.35)] transition duration-300 hover:-translate-y-0.5 hover:border-slate-900 hover:bg-[#EEF1F7] hover:shadow-[0_20px_34px_-22px_rgba(15,23,42,0.4)]"
            >
              <div className="relative h-[140px] overflow-hidden md:h-[160px]">
                <img
                  src={c.image}
                  alt={c.client}
                  loading="lazy"
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-[8px] bg-black text-[12px] font-bold text-white opacity-0 transition duration-300 group-hover:opacity-100">
                  Y
                </span>
                <div className="absolute bottom-3 left-3 text-white md:left-4">
                  <p className="text-[24px] font-bold leading-none tracking-tight md:text-[28px]">{c.metric}</p>
                  <p className="mt-0.5 text-[11px] text-white/90">{c.metricLabel}</p>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-3 md:p-4">
                <p className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-slate-500 md:text-[10px]">
                  <Icon className="h-3 w-3 shrink-0" /> {c.service}
                </p>
                <p className="mt-1 text-[14px] font-bold text-slate-950 md:text-[15px]">{c.client}</p>
                <p className="mt-1 flex-1 text-[11px] leading-relaxed text-slate-600 md:text-[12px]">{c.summary}</p>
                <Link
                  to="/case-studies"
                  className="mt-3 flex items-center justify-center gap-1.5 rounded-[10px] border border-slate-200 bg-white py-1.5 text-[12px] font-semibold text-slate-900 transition duration-300 group-hover:border-slate-950 group-hover:bg-slate-950 group-hover:text-white hover:bg-slate-950 hover:text-white md:mt-4 md:py-2 md:text-[13px]"
                >
                  Read story <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </article>
          );
        })}

        {/* 4th slot: placeholder until you add a 4th case study */}
        <article className="flex min-w-0 flex-col items-center justify-center rounded-[16px] border-2 border-dashed border-slate-300 bg-[#EEEDEA] p-4 text-center md:p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-700 shadow-sm">
            <Plus className="h-4 w-4" />
          </span>
          <p className="mt-3 text-[14px] font-bold text-slate-950 md:text-[15px]">Your brand could be next</p>
          <p className="mt-1 text-[11px] leading-relaxed text-slate-600 md:text-[12px]">Book a free strategy call and we&apos;ll map out your growth plan.</p>
          <button
            type="button"
            onClick={onCtaClick}
            className="mt-3 flex items-center gap-1.5 rounded-[10px] bg-slate-950 px-3.5 py-1.5 text-[12px] font-semibold text-white transition hover:bg-slate-800 md:mt-4 md:py-2 md:text-[13px]"
          >
            Book a strategy call <ArrowRight className="h-3 w-3" />
          </button>
        </article>
      </div>
    </div>
  </section>
);
