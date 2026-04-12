import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { saveSnapshot, loadOverride } from '@/utils/serviceStore';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useModal } from '@/hooks/useModal';
import { GrowthPlanModal } from '@/components/modals/GrowthPlanModal';
import {
  Clock, CheckCircle2, ChevronDown,
  Award, Shield, Zap, ChevronRight,
  MessageSquare, X, RefreshCw,
} from 'lucide-react';

export interface GigPackage {
  name: string;
  label: string;
  price: number;
  originalPrice: number;
  delivery: string;
  revisions: string;
  description: string;
  features: string[];
}

export interface SubServiceGig {
  id: string;
  name: string;
  description: string;
  detailDescription?: string; // richer copy shown inside the detail modal
  image: string;
  images?: string[];
  badge?: string;
  deliveryDays: number;
  startingPrice: number;
  features: string[];
  subOptionKey?: string;
}

export interface GigFAQ {
  q: string;
  a: string;
}

export interface ServiceGigPageProps {
  serviceName: string;
  tagline: string;
  icon: React.ReactNode;
  tags: string[];
  heroImage: string;
  galleryImages: string[];
  about: string;
  packages: [GigPackage, GigPackage, GigPackage];
  subServices: SubServiceGig[];
  faqs: GigFAQ[];
  reviewCount?: number;
  totalOrders?: string;
  /** URL slug used to snapshot defaults and apply admin overrides, e.g. "web-development" */
  serviceSlug?: string;
}

const badgeColors: Record<string, string> = {
  'Most Popular': 'bg-amber-500 text-black',
  'Bestseller':   'bg-red-600 text-white',
  'New':          'bg-emerald-500 text-white',
  'Hot':          'bg-orange-500 text-white',
};

/* ─────────────────────────────────────────────────────────────
   Premium Service Card with per-card slideshow state
───────────────────────────────────────────────────────────── */
interface ServiceCardProps {
  gig: SubServiceGig;
  onSelect: () => void;
  onOrder: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ gig, onSelect, onOrder }) => {
  return (
    <div
      onClick={onSelect}
      className="group relative rounded-2xl overflow-hidden bg-white dark:bg-[#0b0f17] border border-slate-200 dark:border-white/[0.07] hover:border-red-500/40 transition-all duration-500 flex flex-col cursor-pointer hover:shadow-[0_8px_40px_rgba(239,68,68,0.12)] hover:-translate-y-1.5"
    >
      {/* Subtle gradient glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/0 to-transparent group-hover:from-red-500/[0.04] transition-all duration-500 pointer-events-none z-0" />

      {/* ── Image ── */}
      <div className="relative h-56 overflow-hidden flex-shrink-0">
        <img
          src={gig.image}
          alt={gig.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />

        {/* Badge */}
        {gig.badge && (
          <span className={`absolute top-3 left-3 z-20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg ${badgeColors[gig.badge] ?? 'bg-slate-700 text-white'}`}>
            {gig.badge}
          </span>
        )}

      </div>

      {/* ── Card Content ── */}
      <div className="p-5 flex flex-col flex-1 relative z-10">
        <h3 className="font-black text-slate-900 dark:text-white text-[15px] mb-2 leading-snug">{gig.name}</h3>
        <p className="text-[13px] text-slate-500 dark:text-slate-500 mb-4 leading-relaxed flex-1">{gig.description}</p>

        {/* Feature list */}
        <ul className="space-y-2 mb-5">
          {gig.features.slice(0, 3).map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-[13px] text-slate-600 dark:text-slate-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={(e) => { e.stopPropagation(); onOrder(); }}
          className="w-full mt-auto py-3.5 rounded-xl bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white text-[13px] font-black uppercase tracking-[0.1em] transition-all duration-300 hover:shadow-[0_0_24px_rgba(239,68,68,0.45)] hover:-translate-y-0.5 active:translate-y-0"
        >
          Order This Service
        </button>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   Sub-Service Detail Modal — Fiverr-style full layout
───────────────────────────────────────────────────────────── */
interface DetailModalProps {
  gig: SubServiceGig | null;
  serviceName: string;
  packages: [GigPackage, GigPackage, GigPackage];
  totalOrders: string;
  reviewCount: number;
  onClose: () => void;
  onOrder: (service: string, subOptionKey?: string, gigName?: string) => void;
}

const SubServiceDetailModal: React.FC<DetailModalProps> = ({
  gig, serviceName, packages, totalOrders, reviewCount, onClose, onOrder,
}) => {
  const [activePkg, setActivePkg] = useState(1);

  if (!gig) return null;

  const pkg = packages[activePkg];

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-start justify-center p-4 pt-8 overflow-y-auto"
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-black/85 backdrop-blur-sm" />

      <div
        className="relative z-10 w-full max-w-5xl rounded-2xl bg-white dark:bg-[#0b0f17] border border-slate-200 dark:border-white/10 shadow-2xl shadow-black/30 dark:shadow-black/70 flex flex-col lg:flex-row overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── LEFT: Image + description ── */}
        <div className="flex-1 min-w-0 overflow-y-auto">

          {/* Image */}
          <div className="relative overflow-hidden">
            <img
              src={gig.image}
              alt={gig.name}
              className="w-full aspect-video object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Badge */}
            {gig.badge && (
              <span className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider shadow-lg ${badgeColors[gig.badge] ?? 'bg-slate-700 text-white'}`}>
                {gig.badge}
              </span>
            )}

            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* About */}
          <div className="p-6 sm:p-8">
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-4 pb-3 border-b border-slate-200 dark:border-white/10 flex items-center gap-2">
              <span className="text-red-500">◈</span>
              About This Service
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm mb-6">{gig.detailDescription ?? gig.description}</p>

            <h3 className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 dark:text-slate-600 mb-3">What's Included</h3>
            <ul className="space-y-2.5">
              {gig.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── RIGHT: Sticky Pricing Card ── */}
        <div className="lg:w-[340px] xl:w-[360px] shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-white/10 flex flex-col bg-slate-50 dark:bg-transparent">
          <div className="sticky top-0 overflow-y-auto max-h-screen">

            {/* Package Tabs */}
            <div className="grid grid-cols-3 border-b border-slate-200 dark:border-white/10">
              {packages.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setActivePkg(i)}
                  className={`py-4 text-xs font-black uppercase tracking-wider transition-all ${
                    activePkg === i
                      ? 'bg-red-600 text-white'
                      : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>

            <div className="p-5">

              {/* Chips */}
              <div className="flex gap-2 mb-5">
                <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 px-3 py-2 rounded-xl flex-1 justify-center">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-bold">{pkg.delivery}</span>
                  <span className="text-slate-400 dark:text-slate-500">delivery</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 px-3 py-2 rounded-xl flex-1 justify-center">
                  <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-bold">{pkg.revisions}</span>
                  <span className="text-slate-400 dark:text-slate-500">revisions</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-2.5 mb-5">
                {pkg.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <button
                onClick={() => { onOrder(serviceName, gig.subOptionKey, `${gig.name} — ${pkg.label} Package`); onClose(); }}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-black text-sm uppercase tracking-widest transition-all duration-200 hover:shadow-xl hover:shadow-red-500/40 hover:-translate-y-0.5 active:translate-y-0 mb-2"
              >
                Get Started Now →
              </button>
              <button
                onClick={() => { onOrder(serviceName, gig.subOptionKey, gig.name); onClose(); }}
                className="w-full py-2.5 rounded-2xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 font-bold text-xs hover:border-red-500/50 hover:text-red-500 dark:hover:text-red-400 transition-all duration-200"
              >
                Contact Us First
              </button>

              {/* Trust badges */}
              <div className="mt-5 pt-4 border-t border-slate-200 dark:border-white/5 space-y-2.5">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Shield className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  <span>100% satisfaction guarantee — revise until perfect</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Zap className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                  <span>Response within 2 hours on business days</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Award className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                  <span>Top Rated Agency — 5.0 across {reviewCount}+ reviews</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   Main Page
───────────────────────────────────────────────────────────── */
export const ServiceGigPage: React.FC<ServiceGigPageProps> = ({
  serviceName: _serviceName,
  tagline: _tagline,
  icon,
  tags,
  about: _about,
  packages: _packages,
  subServices: _subServices,
  faqs: _faqs,
  reviewCount = 248,
  totalOrders = '500+',
  serviceSlug,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const growthPlanModal = useModal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // ── Snapshot defaults + apply overrides ────────────────────────────
  const slug = serviceSlug ?? pathname.split('/services/')[1]?.split('/')[0] ?? '';

  // Snapshot the hardcoded defaults once so admin can read them
  useEffect(() => {
    if (!slug) return;
    saveSnapshot(slug, {
      serviceName: _serviceName,
      tagline: _tagline,
      about: _about,
      packages: _packages,
      subServices: _subServices,
      faqs: _faqs,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  // Merge override (if admin has edited this service)
  const override = slug ? loadOverride(slug) : null;
  const serviceName  = override?.serviceName  ?? _serviceName;
  const tagline      = override?.tagline      ?? _tagline;
  const about        = override?.about        ?? _about;
  const packages     = (override?.packages    ?? _packages) as [GigPackage, GigPackage, GigPackage];
  const subServices  = override?.subServices  ?? _subServices;
  const faqs         = override?.faqs         ?? _faqs;

  const [preService, setPreService] = useState<string | undefined>(undefined);
  const [preSubOption, setPreSubOption] = useState<string | undefined>(undefined);
  const [preGigName, setPreGigName] = useState<string | undefined>(undefined);

  const openModalFor = (service: string, subOptionKey?: string, gigName?: string) => {
    setPreService(service);
    setPreSubOption(subOptionKey);
    setPreGigName(gigName ?? service);
    growthPlanModal.open();
  };

  const openGigPage = (gig: SubServiceGig) => {
    navigate(`${pathname}/${gig.id}`, {
      state: {
        gig,
        packages,
        serviceName,
        totalOrders,
        reviewCount,
        parentPath: pathname,
      },
    });
  };

  void tagline; void icon; void tags; void about;

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[var(--bg-primary)] dark:bg-[#030712] selection:bg-red-500/30 transition-colors duration-300">
        <CustomCursor />
        <Navigation onCtaClick={growthPlanModal.open} />

        <main className="pt-24 sm:pt-28 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-6 flex-wrap">
              <button onClick={() => navigate('/')} className="hover:text-red-500 transition-colors font-medium">
                Home
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="hover:text-red-500 cursor-pointer transition-colors font-medium">Services</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-slate-900 dark:text-white font-bold">{serviceName}</span>
            </div>

            {/* Service Cards */}
            <div className="mb-14">
              <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6 pb-3 border-b border-slate-200 dark:border-white/10 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-red-500" />
                Individual Service Packages
              </h2>

              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {subServices.map((gig) => (
                  <ServiceCard
                    key={gig.id}
                    gig={gig}
                    onSelect={() => openGigPage(gig)}
                    onOrder={() => openModalFor(serviceName, gig.subOptionKey, gig.name)}
                  />
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6 pb-3 border-b border-slate-200 dark:border-white/10">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <div key={i} className="rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                    >
                      <span className="font-bold text-sm text-slate-900 dark:text-white pr-4">{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-500 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaq === i && (
                      <div className="px-5 py-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed bg-white dark:bg-slate-900/50 border-t border-slate-100 dark:border-white/5">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>

        <Footer />

        <GrowthPlanModal
          isOpen={growthPlanModal.isOpen}
          onClose={growthPlanModal.close}
          onSuccess={() => {}}
          preSelectedService={preService}
          preSelectedSubOption={preSubOption}
          preSelectedGigName={preGigName}
        />
      </div>
    </ThemeProvider>
  );
};
