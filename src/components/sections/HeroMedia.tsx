import React from 'react';
import { ArrowRight, Check, Play, Star } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   HERO MEDIA
   - Left: rating row, headline, paragraph, checklist, CTAs
   - Right: 3-column image wall on desktop/tablet, 2 columns on mobile.
     Side columns scroll UP, middle scrolls DOWN.
   - All 9 cards use local images from public/images/
   - Replace the image files in public/images/ whenever you want new photos.
   - Layout, card sizes, animations, hover pause, and labels are preserved.
   ───────────────────────────────────────────────────────────────────────────── */

const ACCENT = '#ef4444';

interface HeroMediaProps {
  onCtaClick: () => void;
  onWatchProcess?: () => void;
}

type CardSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type MediaCard = {
  id: string;
  label: string;
  size?: CardSize;
  image?: string;
  bg?: string;
  title?: string;
  sub?: string;
  serif?: boolean;
  dark?: boolean;
  play?: boolean;
};

const SIZE_FACTOR: Record<CardSize, number> = {
  xs: 0.8,
  sm: 0.95,
  md: 1.1,
  lg: 1.3,
  xl: 1.5,
};

const COLUMNS: {
  dir: 'up' | 'down';
  duration: number;
  offset: number;
  cards: MediaCard[];
}[] = [
  {
    dir: 'up',
    duration: 24,
    offset: 0,
    cards: [
      {
        id: 'a1',
        label: 'WEB DESIGN',
        size: 'lg',
        image: '/src/assets/images/img1.jpeg',
      },
      {
        id: 'a2',
        label: 'ADS',
        size: 'sm',
        image: '/src/assets/images/img8.jpeg',
        title: 'ROAS 4.2x',
        dark: true,
      },
      {
        id: 'a3',
        label: 'SHORT-FORM',
        size: 'xl',
        image: '/src/assets/images/img3.jpeg',
        play: true,
      },
    ],
  },
  {
    dir: 'down',
    duration: 28,
    offset: 10,
    cards: [
      {
        id: 'b1',
        label: 'SOCIAL',
        size: 'xs',
        image: '/src/assets/images/img2.jpeg',
        title: 'Leaking revenue?',
        serif: true,
        dark: true,
      },
      {
        id: 'b2',
        label: 'UGC VIDEO',
        size: 'lg',
        image: '/src/assets/images/img4.jpeg',
        play: true,
      },
      {
        id: 'b3',
        label: 'LANDING PAGE',
        size: 'md',
        image: '/src/assets/images/img5.jpeg',
        title: 'Launch in 14 days',
        dark: true,
      },
    ],
  },
  {
    dir: 'up',
    duration: 26,
    offset: 5,
    cards: [
      {
        id: 'c1',
        label: 'EMAIL',
        size: 'md',
        image: '/src/assets/images/img6.jpeg',
        title: 'Stop guessing.',
        serif: true,
      },
      {
        id: 'c2',
        label: 'AI AUTOMATION',
        size: 'xs',
        image: '/src/assets/images/img7.jpeg',
      },
      {
        id: 'c3',
        label: 'CASE STUDY',
        size: 'xl',
        image: '/src/assets/images/img9.jpeg',
        title: '+312%',
        sub: 'in 90 days',
        dark: true,
      },
    ],
  },
];

const Card: React.FC<{ c: MediaCard }> = ({ c }) => (
  <div
    className="relative w-full shrink-0 overflow-hidden rounded-[20px] shadow-[0_14px_30px_-14px_rgba(15,23,42,0.35)]"
    style={{
      background: c.bg ?? 'linear-gradient(160deg,#334155 0%,#0f172a 100%)',
      height: `calc(var(--hm-card) * ${SIZE_FACTOR[c.size ?? 'md']})`,
    }}
  >
    {c.image && (
      <img
        src={c.image}
        alt=""
        loading="lazy"
        draggable={false}
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
        className="absolute inset-0 h-full w-full object-cover"
      />
    )}

    {c.title && (
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <p
          className={`leading-tight ${
            c.dark ? 'text-white' : 'text-slate-900'
          } ${
            c.serif
              ? 'font-serif italic text-lg sm:text-xl'
              : 'text-xl sm:text-2xl font-bold tracking-tight'
          }`}
        >
          {c.title}
        </p>
        {c.sub && (
          <p
            className={`mt-1 text-xs ${
              c.dark ? 'text-white/80' : 'text-slate-600'
            }`}
          >
            {c.sub}
          </p>
        )}
      </div>
    )}

    {c.play && (
      <span
        className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl text-white shadow-lg"
        style={{ background: ACCENT }}
      >
        <Play className="h-4 w-4 fill-white" />
      </span>
    )}

    <span className="absolute bottom-3 left-3 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
      {c.label}
    </span>
  </div>
);

const Column: React.FC<{
  col: (typeof COLUMNS)[number];
  className?: string;
}> = ({ col, className }) => {
  // Cards are rendered twice so translateY(-50%) loops seamlessly.
  const list = (suffix: string) => (
    <div
      className="flex flex-col gap-4 pb-4"
      aria-hidden={suffix === 'b' ? true : undefined}
    >
      {col.cards.map((c) => (
        <Card key={c.id + suffix} c={c} />
      ))}
    </div>
  );

  return (
    <div className={`min-w-0 flex-1 ${className ?? ''}`}>
      <div
        className={`hm-col ${col.dir === 'up' ? 'hm-up' : 'hm-down'}`}
        style={{
          animationDuration: `${col.duration}s`,
          animationDelay: `-${col.offset}s`,
        }}
      >
        {list('a')}
        {list('b')}
      </div>
    </div>
  );
};

const CHECKS = [
  'Web, ads, design & video under one roof',
  'A dedicated team, not a template',
  'You approve everything before it goes live',
  'Start with a free strategy call',
];

export const HeroMedia: React.FC<HeroMediaProps> = ({ onCtaClick }) => {
  const goToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#f5f5f7] dark:bg-[#030712] py-16 sm:py-20 lg:py-0 lg:min-h-[760px] transition-colors duration-300">
      <div
        className="pointer-events-none absolute inset-0 dark:hidden"
        style={{
          background:
            'radial-gradient(900px 500px at 25% 30%, rgba(255,255,255,0.9), transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 hidden dark:block"
        style={{
          background:
            'radial-gradient(700px 420px at 20% 25%, rgba(239,68,68,0.10), transparent 70%)',
        }}
      />

      <div className="relative mx-auto flex max-w-[1400px] flex-col lg:min-h-[760px] lg:flex-row lg:items-center">
        {/* Left: copy */}
        <div className="w-full px-5 sm:px-8 lg:w-[52%] lg:py-32 lg:pl-12 lg:pr-10 xl:pl-16">
          <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-slate-600 dark:text-slate-400">
            <span className="flex gap-0.5" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  className="h-4 w-4"
                  style={{ color: ACCENT, fill: ACCENT }}
                />
              ))}
            </span>
            <span className="font-bold text-slate-900 dark:text-white">98%</span>
            <span>client satisfaction</span>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span>
              <b className="font-bold text-slate-900 dark:text-white">10+</b>{' '}
              brands scaled
            </span>
          </div>

          <h2 className="text-[2.6rem] font-bold leading-[1.03] tracking-[-0.035em] text-slate-950 dark:text-white sm:text-6xl xl:text-[4.6rem]">
            Websites, ads & content that{' '}
            <span style={{ color: ACCENT }}>grow your revenue.</span>
          </h2>

          <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            The full-service digital agency for ambitious brands: a dedicated
            team{' '}
            <b className="font-semibold text-slate-900 dark:text-white">
              designs, builds, and runs
            </b>{' '}
            your web, ads and content. Real specialists, not templates, and you
            approve everything.
          </p>

          <ul className="mt-7 grid max-w-[34rem] gap-x-6 gap-y-4 sm:grid-cols-2">
            {CHECKS.map((t) => (
              <li
                key={t}
                className="flex items-start gap-3 text-[15px] leading-snug text-slate-800 dark:text-slate-200"
              >
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                  style={{ background: `${ACCENT}1f` }}
                >
                  <Check
                    className="h-3 w-3"
                    strokeWidth={3}
                    style={{ color: ACCENT }}
                  />
                </span>
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={onCtaClick}
              className="group inline-flex h-[52px] items-center justify-center gap-2 rounded-full px-7 text-[15px] font-semibold text-white shadow-[0_10px_24px_-10px_var(--hero-accent)] transition hover:brightness-110 active:scale-[0.98]"
              style={{ background: ACCENT }}
            >
              Book a strategy call
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={goToServices}
              className="group inline-flex h-[52px] items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-7 text-[15px] font-semibold text-slate-900 transition hover:bg-slate-50 active:scale-[0.98] dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              Explore services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Free 30-minute session · No commitment
          </p>
        </div>

        {/* Right: media wall */}
        <div className="relative mt-12 w-full px-5 sm:px-8 lg:absolute lg:right-0 lg:top-1/2 lg:mt-0 lg:-translate-y-1/2 lg:w-[48%] lg:px-0 lg:pr-4">
          <div className="hm-wall flex gap-4 overflow-hidden">
            {COLUMNS.map((col, i) => (
              <Column
                key={i}
                col={col}
                className={i === 2 ? 'hidden md:block' : undefined}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .hm-wall {
          --hm-card: 150px;
          height: 520px;
          -webkit-mask-image: linear-gradient(to bottom, transparent 0, #000 8%, #000 92%, transparent 100%);
                  mask-image: linear-gradient(to bottom, transparent 0, #000 8%, #000 92%, transparent 100%);
        }
        @media (min-width: 1024px) {
          .hm-wall { --hm-card: 180px; height: 640px; }
        }
        .hm-col {
          display: flex;
          flex-direction: column;
          will-change: transform;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .hm-up   { animation-name: hm-scroll-up; }
        .hm-down { animation-name: hm-scroll-down; }
        .hm-col:hover { animation-play-state: paused; }
        @keyframes hm-scroll-up {
          from { transform: translate3d(0,0,0); }
          to   { transform: translate3d(0,-50%,0); }
        }
        @keyframes hm-scroll-down {
          from { transform: translate3d(0,-50%,0); }
          to   { transform: translate3d(0,0,0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hm-col { animation: none !important; }
        }
      `}</style>
    </section>
  );
};
