import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bookmark, ChevronRight, Heart, MessageCircle, Play, Send, Sparkles, Users, Image as ImageIcon, Video } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   Portfolio: "Truly great content, not AI slop." grid with working tabs, filter chips,
   and post cards (image + like / comment / share / save row underneath).
   Mobile: tabs and industry chips both scroll sideways; "See all" goes full width,
           so nothing pushes the page wider than the screen.
   Desktop/tablet: unchanged.
   Add in App.tsx wherever you want, e.g. after <HowItWorks />:
     import { Portfolio } from '@/components/sections/Portfolio';
     <Portfolio />
   Replace the placeholder `image` URLs in RAW/PHOTOS with your real work.
   ───────────────────────────────────────────────────────────────────────────── */

const BLUE = '#3b5bff';

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=70`;

const PHOTOS = [
  '/src/assets/images/port5.jpeg',
  '/src/assets/images/port2.jpeg',
  '/src/assets/images/port1.jpeg',
  '/src/assets/images/port3.jpeg',
  '/src/assets/images/port4.jpeg',
  '/src/assets/images/img15.jpeg',
  '/src/assets/images/port6.jpeg',
  '/src/assets/images/port7.jpeg',
  '/src/assets/images/port8.jpeg',
  '/src/assets/images/img13.jpeg',
  '/src/assets/images/img12.jpeg',
];

const GRADS = [
  'linear-gradient(160deg,#0e4a6b,#1d9bb5)',
  'linear-gradient(160deg,#f6b26b,#b45309)',
  'linear-gradient(160deg,#2a1a5e,#5b2bd1)',
  'linear-gradient(160deg,#f3ece0,#e7dccb)',
  'linear-gradient(160deg,#6f8f6a,#58775a)',
  'linear-gradient(160deg,#e8742a,#c2410c)',
];

type Kind = 'posts' | 'videos' | 'ugc';
type Industry = 'Featured' | 'All' | 'Products' | 'Food & Drink' | 'Health & Beauty' | 'Professional Services' | 'Home Services' | 'Real Estate';

type Item = { id: string; kind: Kind; industry: Exclude<Industry, 'Featured' | 'All'>; bg: string; image: string; featured?: boolean };

// Placeholder items: swap `image` for your real work.
const RAW: { kind: Kind; industry: Item['industry']; featured?: boolean }[] = [
  { kind: 'posts', industry: 'Food & Drink', featured: true },
  { kind: 'posts', industry: 'Products' },
  { kind: 'posts', industry: 'Health & Beauty', featured: true },
  { kind: 'posts', industry: 'Real Estate' },
  { kind: 'videos', industry: 'Professional Services' },
  { kind: 'posts', industry: 'Home Services' },
  { kind: 'ugc', industry: 'Health & Beauty' },
  { kind: 'posts', industry: 'Food & Drink' },
];

const ITEMS: Item[] = RAW.map((r, i) => ({
  id: `it${i}`,
  ...r,
  bg: GRADS[i % GRADS.length],
  image: PHOTOS[i % PHOTOS.length],
}));

const TABS: { key: Kind; label: string; Icon: React.FC<{ className?: string }> }[] = [
  { key: 'posts', label: 'Posts', Icon: ImageIcon },
  { key: 'videos', label: 'Videos', Icon: Video },
  { key: 'ugc', label: 'UGC', Icon: Users },
];

const CHIPS: Industry[] = ['Featured', 'All', 'Products', 'Food & Drink', 'Health & Beauty', 'Professional Services', 'Home Services', 'Real Estate'];

const matches = (item: Item, chip: Industry) =>
  chip === 'All' || (chip === 'Featured' ? !!item.featured : item.industry === chip);

const Tile: React.FC<{ item: Item }> = ({ item }) => (
  <article className="group min-w-0 overflow-hidden rounded-[14px] border border-black/5 bg-[#FBFAF9] shadow-[0_12px_26px_-20px_rgba(15,23,42,0.4)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_36px_-20px_rgba(15,23,42,0.45)]">
    <div className="relative aspect-[4/5] w-full overflow-hidden" style={{ background: item.bg }}>
      <img
        src={item.image}
        alt=""
        loading="lazy"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
      />
      {item.kind === 'videos' && (
        <span className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg">
          <Play className="h-3 w-3 fill-slate-900" />
        </span>
      )}
    </div>
    <div className="flex items-center justify-between px-3.5 py-2.5 text-slate-700">
      <div className="flex items-center gap-3.5">
        <Heart className="h-4 w-4" strokeWidth={1.8} />
        <MessageCircle className="h-4 w-4" strokeWidth={1.8} />
        <Send className="h-4 w-4" strokeWidth={1.8} />
      </div>
      <Bookmark className="h-4 w-4" strokeWidth={1.8} />
    </div>
  </article>
);

export const Portfolio: React.FC = () => {
  const [tab, setTab] = useState<Kind>('posts');
  const [chip, setChip] = useState<Industry>('All');
  const [industryMode, setIndustryMode] = useState(false);

  const shown = ITEMS.filter((i) => i.kind === tab && matches(i, chip));

  return (
    <section id="portfolio" className="bg-[#EDECEA] dark:bg-[#030712] py-12 sm:py-14 transition-colors duration-300">
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
        <p className="font-mono text-[12px] text-slate-500 dark:text-slate-400">// our portfolio</p>
        <h2 className="mt-3 max-w-[520px] text-[34px] font-bold leading-[1.05] tracking-[-0.03em] text-slate-950 dark:text-white sm:text-[44px]">
          Truly great content, not AI slop.
        </h2>

        {/* Tabs + see all */}
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="flex w-full items-center gap-1 overflow-x-auto rounded-[12px] border border-black/5 bg-[#FBFAF9] p-1 shadow-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden dark:border-white/10 dark:bg-white/5 sm:inline-flex sm:w-auto sm:overflow-visible">
            {TABS.map(({ key, label, Icon }) => {
              const on = !industryMode && tab === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => { setTab(key); setIndustryMode(false); }}
                  aria-pressed={on}
                  className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-[9px] px-3 py-1.5 text-[13px] font-semibold transition hover:bg-slate-100/70"
                  style={on ? { background: BLUE, color: '#fff' } : { color: '#475569' }}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => setIndustryMode((v) => !v)}
              aria-pressed={industryMode}
              className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-[9px] px-3 py-1.5 text-[13px] font-semibold transition hover:bg-slate-100/70"
              style={industryMode ? { background: BLUE, color: '#fff' } : { color: '#475569' }}
            >
              <Sparkles className="h-3.5 w-3.5" />
              By industry
            </button>
          </div>

          <Link
            to="/case-studies"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-[#FBFAF9] px-3.5 py-2 text-[13px] font-semibold text-slate-900 shadow-sm transition hover:bg-white hover:shadow sm:w-auto"
          >
            See all examples <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Industry chips */}
        <div className="mt-3.5 flex items-center gap-2 overflow-x-auto rounded-[14px] border border-black/5 bg-[#FBFAF9] p-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden dark:border-white/10 dark:bg-white/5">
          {CHIPS.map((c) => {
            const on = chip === c;
            const count = ITEMS.filter((i) => i.kind === tab && matches(i, c)).length;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setChip(c)}
                aria-pressed={on}
                className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[12px] font-semibold transition hover:border-slate-300"
                style={
                  on
                    ? { background: '#EEF1FF', borderColor: '#EEF1FF', color: BLUE }
                    : { background: '#fff', borderColor: '#e2e8f0', color: '#334155' }
                }
              >
                {c}
                <span className="font-mono text-[10px] text-slate-400">{count}</span>
              </button>
            );
          })}
          <span className="ml-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm">
            <ChevronRight className="h-3.5 w-3.5" />
          </span>
        </div>

        {/* Grid */}
        <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
          {shown.map((item) => (
            <Tile key={item.id} item={item} />
          ))}
        </div>

        {shown.length === 0 && (
          <p className="mt-8 text-center text-[13px] text-slate-500">No examples in this category yet.</p>
        )}
      </div>
    </section>
  );
};
