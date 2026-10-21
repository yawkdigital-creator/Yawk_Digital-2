import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   Guarantee: wide blue "risk-free" banner with 3 perks, CTA and a 14-day badge.
   Add in App.tsx wherever you want, e.g. after <PricingBuilder />:
     import { Guarantee } from '@/components/sections/Guarantee';
     <Guarantee onCtaClick={handleGrowthPlanOpen} />
   Make sure the terms below match your real refund policy before going live.
   ───────────────────────────────────────────────────────────────────────────── */

const POLICY_URL = '#refund';

const PERKS = [
  { bold: '14 full days', rest: ' to review your first batch and work through revisions with your team.' },
  { bold: '2+ revision rounds', rest: ' so we have a real shot at nailing your brand voice.' },
  { bold: 'Full refund', rest: " of your first month if you're still not satisfied and haven't approved or scheduled any of it." },
];

const STREAKS =
  'repeating-linear-gradient(115deg, rgba(255,255,255,0) 0px, rgba(255,255,255,0) 118px, rgba(255,255,255,0.13) 119px, rgba(255,255,255,0) 121px, rgba(255,255,255,0) 300px)';

export const Guarantee: React.FC<{ onCtaClick?: () => void }> = ({ onCtaClick }) => (
  <section className="bg-[#F5F5F7] dark:bg-[#030712] py-8 sm:py-10 transition-colors duration-300">
    <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
      <div
        className="relative overflow-hidden rounded-[22px] px-7 py-8 text-white sm:px-10 sm:py-9"
        style={{ background: 'linear-gradient(135deg,#5b78ff 0%,#3b5bff 55%,#2f4fe6 100%)' }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-90" style={{ backgroundImage: STREAKS }} />

        <div className="relative grid items-center gap-7 md:grid-cols-[1fr_auto]">
          <div>
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-white/90">
              <span className="h-1.5 w-1.5 rounded-full bg-white" /> Risk-free · zero commitment
            </p>
            <h2 className="mt-3 text-[30px] font-bold leading-[1.1] tracking-[-0.03em] sm:text-[36px]">
              Not happy with your first batch?
              <br />
              <span className="underline decoration-white/80 decoration-[2px] underline-offset-[5px]">Get your money back.</span>
            </h2>
            <p className="mt-3 text-[15px] text-white/90">
              Every new subscription is backed by our 14-day satisfaction guarantee.
            </p>

            <ul className="mt-5 grid gap-5 sm:grid-cols-3">
              {PERKS.map((p) => (
                <li key={p.bold} className="flex gap-2.5">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/20">
                    <Check className="h-2.5 w-2.5" strokeWidth={3} />
                  </span>
                  <p className="text-[13px] leading-snug text-white/95">
                    <b className="font-bold text-white">{p.bold}</b>
                    {p.rest}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={onCtaClick}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[15px] font-semibold text-[#2f4fe6] shadow-md transition hover:brightness-95"
              >
                Get started risk-free <ArrowRight className="h-4 w-4" />
              </button>
              <a href={POLICY_URL} className="text-[15px] font-semibold text-white underline decoration-white/60 underline-offset-4 hover:decoration-white">
                Read the full policy
              </a>
            </div>
          </div>

          {/* Badge */}
          <div className="relative mx-auto flex h-[140px] w-[140px] items-center justify-center md:mx-0 md:mr-6">
            <span className="absolute inset-0 rounded-full border-2 border-dotted border-white/40" />
            <span className="flex h-[118px] w-[118px] flex-col items-center justify-center rounded-full bg-white/15 text-center backdrop-blur-sm">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/90">Day</span>
              <span className="text-[46px] font-bold leading-none tracking-tight">14</span>
              <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.12em] text-white/95">Satisfaction<br />guarantee</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
);
