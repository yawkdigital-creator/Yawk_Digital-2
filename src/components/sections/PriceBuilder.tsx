import React, { useMemo, useState } from 'react';
import { Check, Plus, Minus, Info, Link as LinkIcon, ArrowRight, Image as ImageIcon, Video, Wand2, ThumbsUp, Megaphone, Search, Monitor } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   PricingBuilder: pick services, adjust quantities, live total in the summary.
   Mobile: single-column stack (Posts card on top, then full-width service rows,
           then the ticket-style summary). Post previews are smaller and sit in
           a row under the copy. A sticky bottom bar shows the running total
           with a Start button once something is selected.
   Desktop/tablet: unchanged two-column layout.
   Add in App.tsx wherever you want, e.g. after <Services />:
     import { PricingBuilder } from '@/components/sections/PricingBuilder';
     <PricingBuilder onStartPlan={handleGrowthPlanOpen} />
   PRICES ARE PLACEHOLDERS. Edit `price` / `flat` / `step` / `min` in SERVICES.
   Replace the three POST_IMAGES with your real post designs.
   Set TERMS_URL / REFUND_URL to your real legal page links.
   ───────────────────────────────────────────────────────────────────────────── */

const BLUE = '#3b5bff';
const TERMS_URL = '#terms';
const REFUND_URL = '#refund';

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=400&q=70`;

const POST_IMAGES = [
  { image: unsplash('1556742049-0cfed4f6a45d'), bg: 'linear-gradient(160deg,#f6b26b,#b45309)' },
  { image: unsplash('1611162617213-7d7a39e9b1d7'), bg: 'linear-gradient(160deg,#7fb7e6,#2b6cb0)' },
  { image: unsplash('1556761175-b413da4baf72'), bg: 'linear-gradient(160deg,#d6c7a8,#8c7a5b)' },
];

type Service = {
  id: string;
  name: string;
  Icon: React.FC<{ className?: string }>;
  price: number;
  min?: number;
  step?: number;
  unit?: string;
  flat?: number;
  note: string;
  popular?: boolean;
  defaultOn?: boolean;
  defaultQty?: number;
};

const SERVICES: Service[] = [
  { id: 'posts', name: 'Social Media Posts', Icon: ImageIcon, price: 99, min: 10, step: 10, unit: 'posts', note: 'Custom-branded posts, captions and a calendar you approve.', popular: true, defaultOn: true, defaultQty: 10 },
  { id: 'short', name: 'Short-Form Videos', Icon: Video, price: 149, min: 5, step: 5, unit: 'videos', note: 'Reels, TikToks and Shorts edited for your brand.', defaultOn: true, defaultQty: 5 },
  { id: 'ai', name: 'AI Videos', Icon: Wand2, price: 149, min: 2, step: 2, unit: 'videos', note: 'AI-generated video ads and explainers.', defaultOn: true, defaultQty: 2 },
  { id: 'ig', name: 'Instagram Growth', Icon: ThumbsUp, flat: 149, price: 0, note: 'Audience growth and engagement on Instagram.' },
  { id: 'meta', name: 'Meta Ads Management', Icon: Megaphone, flat: 499, price: 0, note: 'Facebook and Instagram ad setup, testing and optimisation.' },
  { id: 'google', name: 'Google Ads Management', Icon: Search, flat: 499, price: 0, note: 'Search and display campaigns managed end to end.' },
  { id: 'seo', name: 'Managed SEO', Icon: Monitor, flat: 499, price: 0, note: 'Ongoing on-page and technical SEO with monthly reporting.' },
];

const ADDONS = ['Email', 'UGC', 'SEO', 'Landing pages & more'];

const fmt = (n: number) => `$${n.toLocaleString('en-US')}`;

type Sel = { on: boolean; qty: number };

const initialState = (): Record<string, Sel> =>
  Object.fromEntries(SERVICES.map((s) => [s.id, { on: !!s.defaultOn, qty: s.defaultQty ?? s.min ?? 0 }]));

const lineTotal = (s: Service, sel: Sel) => {
  if (!sel.on) return 0;
  if (s.flat) return s.flat;
  const blocks = Math.max(1, Math.round(sel.qty / (s.step ?? 1)));
  return blocks * s.price;
};

const QtyRow: React.FC<{ s: Service; sel: Sel; onChange: (qty: number) => void }> = ({ s, sel, onChange }) => {
  const step = s.step ?? 1;
  const min = s.min ?? step;
  const btn = 'flex h-5 w-5 items-center justify-center rounded-full bg-white text-slate-700 ring-1 ring-black/10 transition hover:bg-slate-50 disabled:opacity-40';
  return (
    <div className="mt-1.5 flex items-center gap-1.5 whitespace-nowrap">
      <button type="button" className={btn} onClick={() => onChange(Math.max(min, sel.qty - step))} disabled={sel.qty <= min} aria-label="Decrease">
        <Minus className="h-2.5 w-2.5" />
      </button>
      <span className="min-w-[56px] text-center text-[11px] font-semibold text-slate-900">{sel.qty} {s.unit}</span>
      <button type="button" className={btn} onClick={() => onChange(sel.qty + step)} aria-label="Increase">
        <Plus className="h-2.5 w-2.5" />
      </button>
    </div>
  );
};

const SmallCard: React.FC<{ s: Service; sel: Sel; onToggle: () => void; onQty: (q: number) => void }> = ({ s, sel, onToggle, onQty }) => {
  const { Icon } = s;
  const subtitle = s.flat ? `${fmt(s.flat)}/mo` : `from ${fmt(s.price)}/mo · ${s.min} ${s.unit}`;
  return (
    <div
      className="flex min-w-0 items-center gap-2.5 rounded-[14px] border bg-[#FBFAF9] px-3 py-2.5 transition"
      style={{ borderColor: sel.on ? '#0f172a' : '#e7e5e1', borderWidth: sel.on ? 2 : 1 }}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-[#F1F0EE] text-slate-700">
        <Icon className="h-3.5 w-3.5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold leading-snug text-slate-950">{s.name}</p>
        <p className="text-[12px] text-slate-500">{subtitle}</p>
        {sel.on && !s.flat && <QtyRow s={s} sel={sel} onChange={onQty} />}
      </div>
      <span title={s.note} aria-label={s.note} className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EEF1FF] text-[#3b5bff]">
        <Info className="h-3 w-3" />
      </span>
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={sel.on}
        aria-label={sel.on ? `Remove ${s.name}` : `Add ${s.name}`}
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px] border transition"
        style={sel.on ? { background: '#0f172a', borderColor: '#0f172a', color: '#fff' } : { background: '#fff', borderColor: '#cbd5e1', color: '#334155' }}
      >
        {sel.on ? <Check className="h-3 w-3" strokeWidth={3} /> : <Plus className="h-3 w-3" />}
      </button>
    </div>
  );
};

const PostsCard: React.FC<{ s: Service; sel: Sel; onToggle: () => void; onQty: (q: number) => void }> = ({ s, sel, onToggle, onQty }) => {
  const { Icon } = s;
  return (
    <div className="relative min-w-0 rounded-[16px] border-2 bg-[#EDECEA] p-4 transition md:col-span-2" style={{ borderColor: '#0f172a' }}>
      <span className="absolute -top-2.5 left-4 rounded-full bg-black px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
        Most popular
      </span>
      <div className="flex min-w-0 flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-3">
        <div className="min-w-0 flex-1">
          <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#E2E0DB] text-slate-700">
            <Icon className="h-4 w-4" />
          </span>
          <p className="mt-2.5 text-[17px] font-bold leading-tight text-slate-950">{s.name}</p>
          <p className="mt-0.5 text-[12px] font-semibold text-slate-800">from {fmt(s.price)}/mo · {s.min} posts</p>
          <p className="mt-1.5 text-[12px] leading-relaxed text-slate-600 md:max-w-[240px]">{s.note} The simplest place to start.</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-2 md:flex-nowrap md:whitespace-nowrap">
            <div className="flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-1 py-0.5">
              <button type="button" className="flex h-5 w-5 items-center justify-center rounded-full text-slate-700 hover:bg-slate-100 disabled:opacity-40" disabled={sel.qty <= (s.min ?? 1)} onClick={() => onQty(Math.max(s.min ?? 1, sel.qty - (s.step ?? 1)))} aria-label="Decrease">
                <Minus className="h-2.5 w-2.5" />
              </button>
              <span className="min-w-[60px] text-center text-[11px] font-semibold text-slate-900">{sel.qty} posts</span>
              <button type="button" className="flex h-5 w-5 items-center justify-center rounded-full text-slate-700 hover:bg-slate-100" onClick={() => onQty(sel.qty + (s.step ?? 1))} aria-label="Increase">
                <Plus className="h-2.5 w-2.5" />
              </button>
            </div>
            <span className="flex items-center gap-1 text-[12px] font-bold text-slate-950">
              <Check className="h-3 w-3" /> {fmt(lineTotal(s, sel))}/mo
            </span>
            <button type="button" onClick={onToggle} className="text-[11px] font-semibold text-slate-500 underline underline-offset-2 hover:text-slate-900">
              {sel.on ? 'Remove' : 'Add'}
            </button>
          </div>
        </div>

        {/* Post previews: a row under the copy on mobile (smaller), beside it on desktop */}
        <div className="flex shrink-0 items-end justify-between gap-2 md:justify-start md:gap-2">
          {POST_IMAGES.map((p, i) => (
            <div
              key={i}
              className="relative aspect-[3/4] w-[76px] overflow-hidden rounded-[9px] shadow-[0_10px_20px_-12px_rgba(15,23,42,0.5)] sm:w-[84px] md:w-[88px]"
              style={{ background: p.bg }}
            >
              <img
                src={p.image}
                alt=""
                loading="lazy"
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const PricingBuilder: React.FC<{ onStartPlan?: () => void }> = ({ onStartPlan }) => {
  const [state, setState] = useState<Record<string, Sel>>(initialState);
  const [copied, setCopied] = useState(false);

  const setOn = (id: string) => setState((st) => ({ ...st, [id]: { ...st[id], on: !st[id].on } }));
  const setQty = (id: string, qty: number) => setState((st) => ({ ...st, [id]: { ...st[id], qty } }));

  const lines = useMemo(
    () => SERVICES.map((s) => ({ s, sel: state[s.id], total: lineTotal(s, state[s.id]) })).filter((l) => l.sel.on),
    [state],
  );
  const subtotal = lines.reduce((sum, l) => sum + l.total, 0);

  const copyLink = async () => {
    const plan = lines.map((l) => `${l.s.id}:${l.sel.qty}`).join(',');
    const url = `${window.location.origin}${window.location.pathname}?plan=${encodeURIComponent(plan)}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const popular = SERVICES.find((s) => s.popular)!;
  const rest = SERVICES.filter((s) => !s.popular);

  return (
    <section id="plan-builder" className="overflow-hidden bg-[#F5F5F7] dark:bg-[#030712] py-12 pb-28 sm:py-14 sm:pb-14 transition-colors duration-300">
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
        <div className="text-center">
          <p className="font-mono text-[12px] text-slate-500 dark:text-slate-400">// build your plan</p>
          <h2 className="mx-auto mt-3 max-w-[760px] text-[36px] font-bold leading-[1.05] tracking-[-0.03em] text-slate-950 dark:text-white sm:text-[46px]">
            Marketing plans, priced clearly.
          </h2>
          <p className="mx-auto mt-3 max-w-[560px] text-[13px] leading-relaxed text-slate-600 dark:text-slate-400">
            Build a custom package in about 30 seconds. Add the services you want handled, change quantities, and adjust your plan anytime.
          </p>
        </div>

        <div className="mt-8 grid min-w-0 gap-4 lg:grid-cols-[1.6fr_1fr]">
          {/* Left: services. One column on mobile, two from tablet up. */}
          <div className="grid min-w-0 grid-cols-1 gap-2.5 md:grid-cols-2">
            <PostsCard
              s={popular}
              sel={state[popular.id]}
              onToggle={() => setOn(popular.id)}
              onQty={(q) => setQty(popular.id, q)}
            />
            {rest.map((s) => (
              <SmallCard key={s.id} s={s} sel={state[s.id]} onToggle={() => setOn(s.id)} onQty={(q) => setQty(s.id, q)} />
            ))}

            <div className="flex min-w-0 items-center justify-between gap-3 rounded-[14px] border border-dashed border-slate-300 bg-[#EEEDEA] px-3.5 py-2.5 md:col-span-2">
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-slate-900">More add-ons & services</p>
                <p className="font-mono text-[11px] text-slate-500">{ADDONS.join(' · ')}</p>
              </div>
              <a href="#services" className="shrink-0 text-[12px] font-semibold text-[#3b5bff] hover:underline">Show all</a>
            </div>
          </div>

          {/* Right: summary. Full-width ticket on mobile, sticky sidebar on desktop. */}
          <aside className="relative h-fit min-w-0 rounded-[18px] border border-black/5 bg-[#FBFAF9] p-5 pb-6 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.3)] md:rounded-t-[18px] lg:sticky lg:top-24">
            <div className="flex items-center justify-between">
              <p className="text-[16px] font-bold text-slate-950">Yawk plan</p>
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Estimate</span>
            </div>
            <p className="mt-0.5 text-[11px] text-slate-500">Monthly plan · billed after approval</p>

            <div className="mt-3 border-t border-dashed border-slate-300 pt-3">
              {lines.length === 0 && <p className="text-[12px] text-slate-500">Nothing selected yet. Add a service to start.</p>}
              <ul className="flex flex-col gap-2">
                {lines.map(({ s, sel, total }) => (
                  <li key={s.id} className="flex items-center justify-between gap-3 text-[13px]">
                    <span className="flex min-w-0 items-center gap-2 text-slate-800">
                      <s.Icon className="h-3 w-3 shrink-0 text-slate-500" />
                      <span className="truncate">{s.name}</span>
                      {!s.flat && <span className="shrink-0 text-slate-400">· {sel.qty} {s.unit}</span>}
                    </span>
                    <span className="shrink-0 font-mono font-semibold text-slate-900">{fmt(total)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 rounded-[10px] border border-dashed border-slate-300 bg-white p-3">
              <ul className="flex flex-col gap-1.5 text-[11px] text-slate-600">
                <li className="flex items-center gap-2"><Check className="h-3 w-3 shrink-0 text-[#3b5bff]" /> Includes posting to 1 social set, one of each social channel.</li>
                <li className="flex items-center gap-2"><Check className="h-3 w-3 shrink-0 text-[#3b5bff]" /> Onboarding and monthly meetings available.</li>
                <li className="flex items-center gap-2"><Check className="h-3 w-3 shrink-0 text-[#3b5bff]" /> 14-day money-back, cancel anytime.</li>
              </ul>
            </div>

            <div className="mt-4 flex items-end justify-between border-t border-dashed border-slate-300 pt-3">
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500">Subtotal / mo</span>
              <span className="text-[28px] font-bold leading-none tracking-tight text-slate-950">{fmt(subtotal)}</span>
            </div>

            <button
              type="button"
              onClick={onStartPlan}
              disabled={lines.length === 0}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-[14px] font-semibold text-white transition hover:brightness-110 disabled:opacity-40"
              style={{ background: BLUE }}
            >
              Start with this plan <ArrowRight className="h-3.5 w-3.5" />
            </button>

            <button
              type="button"
              onClick={copyLink}
              disabled={lines.length === 0}
              className="mt-2.5 flex w-full items-center justify-center gap-1.5 font-mono text-[12px] text-[#3b5bff] hover:underline disabled:opacity-40"
            >
              <LinkIcon className="h-3 w-3" />
              {copied ? 'Link copied!' : 'Copy a shareable link to this build'}
            </button>
            <p className="mt-0.5 text-center font-mono text-[10px] text-slate-500">Send a client or teammate a link to this exact plan.</p>

            <p className="mt-4 text-center text-[10px] leading-relaxed text-slate-500">
              Pricing is in USD. Your plan renews automatically each month, and you can cancel anytime. By subscribing, you agree to our{' '}
              <a href={TERMS_URL} className="underline underline-offset-2 hover:text-slate-800">Terms & Conditions</a> and{' '}
              <a href={REFUND_URL} className="underline underline-offset-2 hover:text-slate-800">Refund Policy</a>.
            </p>

            {/* Scalloped (ticket) bottom edge */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 -bottom-[7px] h-[8px]"
              style={{
                background: 'radial-gradient(circle at 10px 0, #FBFAF9 7px, transparent 7.5px) 0 0 / 20px 8px repeat-x',
              }}
            />
          </aside>
        </div>
      </div>

      {/* Mobile sticky bar: running total + start, shown once something is selected */}
      {lines.length > 0 && (
        <div className="fixed inset-x-3 bottom-4 z-40 flex items-center justify-between gap-3 rounded-[18px] bg-[#0f172a] px-4 py-3 text-white shadow-[0_18px_40px_-14px_rgba(15,23,42,0.6)] md:hidden">
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-wider text-slate-300">
              {lines.length} {lines.length === 1 ? 'service' : 'services'} selected
            </p>
            <p className="text-[15px] font-bold">from {fmt(subtotal)}/mo</p>
          </div>
          <button
            type="button"
            onClick={onStartPlan}
            className="flex shrink-0 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[14px] font-semibold text-slate-950"
          >
            Start <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </section>
  );
};
