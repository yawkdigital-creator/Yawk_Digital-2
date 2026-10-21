import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, BadgeCheck, Facebook, Instagram, Linkedin, Pin, Star, Youtube } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   ReviewsStrip: "publishing everywhere" platform row + 3 review cards.
   Mobile: smaller platform row (2-column grid), and review cards become a
           horizontal swipe carousel with prev/next arrow buttons.
   Desktop/tablet: single centered platform row + 3-column review grid.
   Every card links to /reviews (existing ReviewsPage route).
   Add in App.tsx after <TrustedByLeaders /> (or wherever you want):
     import { ReviewsStrip } from '@/components/sections/ReviewsStrip';
     <ReviewsStrip />
   Edit numbers/captions in REVIEWS below.
   ───────────────────────────────────────────────────────────────────────────── */

const ACCENT = '#3b5bff';

const NOISE = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.09 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;

const TikTokIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19.6 6.7a4.8 4.8 0 0 1-3.6-4.7h-3.3v13.4a2.8 2.8 0 1 1-2.8-2.8c.3 0 .5 0 .8.1V9.4a6.1 6.1 0 0 0-.8-.1 6.1 6.1 0 1 0 6.1 6.1V9a8 8 0 0 0 4.6 1.5V7.2a4.8 4.8 0 0 1-1-.5z" />
  </svg>
);

const PLATFORMS = [
  { name: 'Instagram', Icon: Instagram },
  { name: 'TikTok', Icon: TikTokIcon },
  { name: 'Facebook', Icon: Facebook },
  { name: 'LinkedIn', Icon: Linkedin },
  { name: 'YouTube', Icon: Youtube },
  { name: 'Pinterest', Icon: Pin },
];

type Review = {
  id: string;
  title: string;
  rating: number;
  caption: string;
  bg: string;
  icon?: boolean;
};

const REVIEWS: Review[] = [
  {
    id: 'customer',
    title: 'Customer reviews',
    rating: 4.6,
    caption: 'Verified reviews · 800+',
    bg: 'linear-gradient(120deg,#f6efd6 0%,#f3f1ea 55%,#efeee9 100%)',
    icon: true,
  },
  {
    id: 'clutch',
    title: 'Clutch',
    rating: 4.9,
    caption: 'Verified reviews',
    bg: 'linear-gradient(120deg,#f5dcd6 0%,#f1eeea 55%,#ece9e6 100%)',
  },
  {
    id: 'sortlist',
    title: 'Sortlist',
    rating: 4.5,
    caption: 'Vetted, verified agency',
    bg: 'linear-gradient(120deg,#e3e5f0 0%,#eeeef1 55%,#ecebec 100%)',
  },
];

const Stars: React.FC<{ rating: number }> = ({ rating }) => {
  const pct = (rating / 5) * 100;
  return (
    <span className="relative inline-flex" aria-hidden="true">
      <span className="flex gap-1 text-slate-300">
        {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-4 w-4" />)}
      </span>
      <span className="absolute inset-0 overflow-hidden" style={{ width: `${pct}%` }}>
        <span className="flex gap-1 whitespace-nowrap" style={{ color: ACCENT }}>
          {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-4 w-4" style={{ fill: ACCENT }} />)}
        </span>
      </span>
    </span>
  );
};

const ReviewCard: React.FC<{ r: Review }> = ({ r }) => (
  <Link
    to="/reviews"
    aria-label={`${r.title}: ${r.rating} out of 5. See all reviews`}
    className="group relative flex w-[265px] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-[20px] px-6 py-5 text-slate-950 shadow-[0_16px_34px_-22px_rgba(15,23,42,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_44px_-22px_rgba(15,23,42,0.45)] md:w-auto md:shrink md:snap-none"
    style={{ background: r.bg }}
  >
    <span className="pointer-events-none absolute inset-0 opacity-70" style={{ backgroundImage: NOISE }} />

    <div className="relative flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        {r.icon && <Star className="h-4 w-4" style={{ color: ACCENT, fill: ACCENT }} />}
        <span className="text-[19px] font-bold tracking-tight">{r.title}</span>
      </div>
      <span className="inline-flex items-center gap-1 rounded-full bg-[#dcefe4] px-2.5 py-1 text-[12px] font-semibold text-[#15803d]">
        <BadgeCheck className="h-3.5 w-3.5" /> Verified
      </span>
    </div>

    <div className="relative mt-3 flex items-center gap-4">
      <span className="text-[48px] font-bold leading-none tracking-[-0.04em]">{r.rating.toFixed(1)}</span>
      <div className="flex flex-col">
        <Stars rating={r.rating} />
        <span className="mt-1 text-[15px] text-slate-500">out of 5</span>
      </div>
    </div>

    <div className="relative mt-3 flex items-center justify-between">
      <span className="text-[15px] text-slate-600">{r.caption}</span>
      <ArrowUpRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-slate-900" />
    </div>
  </Link>
);

export const ReviewsStrip: React.FC = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 280, behavior: 'smooth' });
  };

  return (
    <section className="bg-[#F5F5F7] dark:bg-[#030712] pt-6 pb-10 sm:pb-12 transition-colors duration-300">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <p className="text-center font-mono text-[11px] leading-relaxed sm:text-[13px] uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
          // Publishing everywhere your customers already are
        </p>

        <ul className="mx-auto mt-4 grid max-w-[260px] grid-cols-2 gap-x-4 gap-y-4 sm:mt-5 sm:flex sm:max-w-none sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-10 sm:gap-y-4">
          {PLATFORMS.map(({ name, Icon }) => (
            <li
              key={name}
              className="flex items-center justify-center gap-1.5 text-[15px] font-semibold text-slate-950 sm:gap-2 sm:text-[18px] dark:text-white"
            >
              <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
              {name}
            </li>
          ))}
        </ul>

        {/* Mobile: prev/next arrows */}
        <div className="mt-7 flex justify-center gap-3 md:hidden">
          <button
            type="button"
            aria-label="Previous reviews"
            onClick={() => scrollBy(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-sm transition active:scale-95 dark:border-white/10 dark:bg-white/5 dark:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next reviews"
            onClick={() => scrollBy(1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-sm transition active:scale-95 dark:border-white/10 dark:bg-white/5 dark:text-white"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Mobile: swipe carousel. Desktop: 3-column grid. */}
        <div
          ref={scrollerRef}
          className="-mx-4 mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:mt-7 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0"
        >
          {REVIEWS.map((r) => (
            <ReviewCard key={r.id} r={r} />
          ))}
        </div>
      </div>
    </section>
  );
};
