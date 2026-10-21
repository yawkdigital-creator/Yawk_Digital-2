import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Bot, Check, Globe, Megaphone, Palette, Search, Undo2, Video } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   HowItWorks: 3-step section (select service → submit brief → review & publish).
   Mobile: steps become a horizontal swipe carousel with prev/next arrows,
           slimmer cards so the next one peeks in from the right.
   Desktop/tablet: 3-column grid, unchanged.
   Interactive: toggle services, tick checklist items, approve / request revision.
   Add in App.tsx wherever you want, e.g. after <Services />:
     import { HowItWorks } from '@/components/sections/HowItWorks';
     <HowItWorks />
   Edit SERVICES / CHECKLIST_INIT / POSTS below to change the content.
   ───────────────────────────────────────────────────────────────────────────── */

const BLUE = '#3b5bff';
const GREEN = '#10b981';
const ORANGE = '#e0772b';

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=300&q=70`;

const SERVICES = [
  { name: 'Web Development', Icon: Globe },
  { name: 'Ads Management', Icon: Megaphone },
  { name: 'SEO & AEO', Icon: Search },
  { name: 'Graphic Design', Icon: Palette },
  { name: 'Video Editing', Icon: Video },
  { name: 'AI Automation', Icon: Bot },
];

const CHECKLIST_INIT = [
  { id: 'intake', label: 'Intake form', done: true },
  { id: 'brand', label: 'Brand details', done: false },
  { id: 'media', label: 'Share media assets', done: false },
  { id: 'social', label: 'Connect social accounts', done: true },
];

type Status = 'Awaiting' | 'Approved' | 'Revision';

const POSTS: { id: string; text: string; image: string; bg: string; initial: Status }[] = [
  { id: 'p1', text: 'Post 1', image: unsplash('1556742049-0cfed4f6a45d'), bg: 'linear-gradient(160deg,#7fb7e6,#2b6cb0)', initial: 'Awaiting' },
  { id: 'p2', text: 'Post 2', image: unsplash('1611162617213-7d7a39e9b1d7'), bg: 'linear-gradient(160deg,#f6b26b,#b45309)', initial: 'Approved' },
  { id: 'p3', text: 'Post 3', image: unsplash('1556761175-b413da4baf72'), bg: 'linear-gradient(160deg,#d6c7a8,#8c7a5b)', initial: 'Revision' },
];

const StepBadge: React.FC<{ n: number }> = ({ n }) => (
  <span className="absolute left-1/2 top-0 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black text-[14px] font-bold text-white">
    {n}
  </span>
);

const StepCard: React.FC<{ n: number; title: string; desc: string; children: React.ReactNode }> = ({
  n, title, desc, children,
}) => (
  <div className="relative flex w-[264px] shrink-0 snap-start flex-col rounded-[20px] border border-black/5 bg-[#FBFAF9] px-4 pb-6 pt-10 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.25)] md:w-auto md:shrink md:snap-none md:px-5">
    <StepBadge n={n} />
    <h3 className="text-center text-[21px] font-bold tracking-tight text-slate-950">{title}</h3>
    <p className="mx-auto mt-2 max-w-[280px] text-center text-[14px] leading-snug text-slate-600">{desc}</p>
    <div className="mt-5 flex-1">{children}</div>
  </div>
);

// Fixed column widths so header and every row line up (rows are separate grids).
// Slightly narrower on mobile so the table fits the slimmer card.
const POST_COLS = 'grid-cols-[88px_36px_1fr] md:grid-cols-[118px_44px_1fr]';

export const HowItWorks: React.FC = () => {
  const [selected, setSelected] = useState<Record<string, boolean>>({
    'Web Development': true,
    'SEO & AEO': true,
  });
  const [checklist, setChecklist] = useState(CHECKLIST_INIT);
  const [statuses, setStatuses] = useState<Record<string, Status>>(
    Object.fromEntries(POSTS.map((p) => [p.id, p.initial])),
  );
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 280, behavior: 'smooth' });
  };

  const toggleService = (name: string) =>
    setSelected((s) => ({ ...s, [name]: !s[name] }));

  const toggleItem = (id: string) =>
    setChecklist((list) => list.map((i) => (i.id === id ? { ...i, done: !i.done } : i)));

  const setStatus = (id: string, status: Status) =>
    setStatuses((s) => ({ ...s, [id]: s[id] === status ? 'Awaiting' : status }));

  const doneCount = checklist.filter((i) => i.done).length;

  return (
    <section id="how-it-works" className="bg-[#F5F5F7] dark:bg-[#030712] py-12 sm:py-14 transition-colors duration-300">
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
        <div className="text-center">
          <p className="font-mono text-[14px] text-slate-500 dark:text-slate-400">// how it works</p>
          <h2 className="mx-auto mt-4 max-w-[900px] text-[44px] font-bold leading-[1.04] tracking-[-0.035em] text-slate-950 dark:text-white sm:text-[62px]">
            Your content, live in about a week.
          </h2>
          <p className="mx-auto mt-5 max-w-[760px] text-[19px] leading-relaxed text-slate-600 dark:text-slate-400">
            Yawk is a <b className="font-semibold text-slate-900 dark:text-white">done-for-you digital team</b> that
            delivers web, ads and content faster, with clear pricing and nothing you have to chase.
          </p>
        </div>

        {/* Mobile: prev/next arrows */}
        <div className="mt-10 flex justify-center gap-3 md:hidden">
          <button
            type="button"
            aria-label="Previous steps"
            onClick={() => scrollBy(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-sm transition active:scale-95 dark:border-white/10 dark:bg-white/5 dark:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next steps"
            onClick={() => scrollBy(1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-sm transition active:scale-95 dark:border-white/10 dark:bg-white/5 dark:text-white"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Mobile: swipe carousel (pt-5 keeps the top step badges from being clipped). Desktop: 3-column grid. */}
        <div
          ref={scrollerRef}
          className="-mx-5 mt-2 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 pt-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-8 sm:px-8 md:mx-0 md:mt-11 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0 md:pt-0"
        >
          {/* 1. Select your service */}
          <StepCard n={1} title="Select your service" desc="Choose the services and platforms that fit your goals.">
            <ul className="flex flex-col gap-2">
              {SERVICES.map(({ name, Icon }) => {
                const on = !!selected[name];
                return (
                  <li key={name}>
                    <button
                      type="button"
                      onClick={() => toggleService(name)}
                      aria-pressed={on}
                      className="flex w-full items-center justify-between rounded-[12px] px-3.5 py-3 text-left text-[14px] font-semibold transition hover:brightness-95 active:scale-[0.99]"
                      style={on ? { background: BLUE, color: '#fff' } : { background: '#EEEDEA', color: '#8a8a90' }}
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon className="h-4 w-4" />
                        {name}
                      </span>
                      <span
                        className="flex h-5 w-5 items-center justify-center rounded-[6px] border"
                        style={on ? { background: '#fff', borderColor: '#fff' } : { borderColor: '#cfcdc8' }}
                      >
                        {on && <Check className="h-3.5 w-3.5" style={{ color: BLUE }} strokeWidth={3} />}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </StepCard>

          {/* 2. Submit your brief */}
          <StepCard n={2} title="Submit your brief" desc="A quick onboarding checklist so your team has everything it needs.">
            <div className="rounded-[14px] bg-[#EEEDEA] p-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-semibold text-slate-900">Onboarding checklist</span>
                <span className="font-mono text-[12px] text-slate-500">{doneCount} / {checklist.length}</span>
              </div>
              <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-[#dcdad5]">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${(doneCount / checklist.length) * 100}%`, background: BLUE }}
                />
              </div>
              <ul className="mt-3.5 flex flex-col gap-2">
                {checklist.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      aria-pressed={item.done}
                      className="flex w-full items-center justify-between rounded-[10px] border bg-white px-3 py-2.5 text-left text-[13px] transition hover:bg-slate-50"
                      style={{ borderColor: item.done ? '#bfe9d9' : '#e7e5e1' }}
                    >
                      <span className="flex items-center gap-2 font-semibold text-slate-900">
                        <span
                          className="flex h-5 w-5 items-center justify-center rounded-full border"
                          style={item.done ? { background: GREEN, borderColor: GREEN } : { borderColor: '#cfcdc8' }}
                        >
                          {item.done && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                        </span>
                        {item.label}
                      </span>
                      <span className={`font-mono text-[11px] ${item.done ? 'text-emerald-600' : 'text-slate-400'}`}>
                        {item.done ? 'Done' : 'To do'}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </StepCard>

          {/* 3. Review & we publish */}
          <StepCard n={3} title="Review & we publish" desc="Review everything in your dashboard. Approve, and we publish for you.">
            <div className="overflow-hidden rounded-[14px] border border-black/5 bg-white">
              <div className={`grid ${POST_COLS} items-center gap-2 bg-[#EEEDEA] px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-slate-500 md:gap-3 md:px-3.5`}>
                <span>Status</span>
                <span>Post</span>
                <span className="text-right">Review</span>
              </div>
              {POSTS.map((post) => {
                const status = statuses[post.id];
                return (
                  <div key={post.id} className={`grid ${POST_COLS} items-center gap-2 border-t border-black/5 px-3 py-2.5 md:gap-3 md:px-3.5`}>
                    <span className="whitespace-nowrap">
                      {status === 'Awaiting' && (
                        <span className="inline-block whitespace-nowrap rounded-full bg-[#FBF0D3] px-2 py-0.5 text-[11px] font-semibold text-[#8a6100]">● Awaiting</span>
                      )}
                      {status === 'Approved' && (
                        <span className="inline-block whitespace-nowrap rounded-full bg-[#dcefe4] px-2 py-0.5 text-[11px] font-semibold text-[#15803d]">✓ Approved</span>
                      )}
                      {status === 'Revision' && (
                        <span className="inline-block whitespace-nowrap rounded-full bg-[#fbe6d6] px-2 py-0.5 text-[11px] font-semibold text-[#b45309]">● Revision</span>
                      )}
                    </span>

                    <span
                      className="relative h-9 w-9 overflow-hidden rounded-[7px]"
                      style={{ background: post.bg }}
                    >
                      <img
                        src={post.image}
                        alt={post.text}
                        loading="lazy"
                        className="h-full w-full object-cover"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                      />
                    </span>

                    <span className="flex justify-end gap-1.5 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => setStatus(post.id, 'Approved')}
                        aria-label="Approve"
                        className="flex h-7 w-7 items-center justify-center rounded-[7px] border transition hover:brightness-95"
                        style={
                          status === 'Approved'
                            ? { background: GREEN, borderColor: GREEN, color: '#fff' }
                            : { borderColor: '#e2e8f0', color: '#64748b', background: '#fff' }
                        }
                      >
                        <Check className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setStatus(post.id, 'Revision')}
                        aria-label="Request revision"
                        className="flex h-7 w-7 items-center justify-center rounded-[7px] border transition hover:brightness-95"
                        style={
                          status === 'Revision'
                            ? { background: ORANGE, borderColor: ORANGE, color: '#fff' }
                            : { borderColor: '#e2e8f0', color: '#64748b', background: '#fff' }
                        }
                      >
                        <Undo2 className="h-3.5 w-3.5" />
                      </button>
                    </span>
                  </div>
                );
              })}
            </div>
          </StepCard>
        </div>
      </div>
    </section>
  );
};
