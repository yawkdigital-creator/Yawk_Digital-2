import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useModal } from '@/hooks/useModal';
import { GrowthPlanModal } from '@/components/modals/GrowthPlanModal';
import {
  Clock, CheckCircle2, ChevronRight,
  Award, Shield, Zap, RefreshCw,
  ChevronLeft, ChevronRight as ChevronRightIcon,
} from 'lucide-react';
import type { SubServiceGig, GigPackage } from '@/components/templates/ServiceGigPage';

interface DetailPageState {
  gig: SubServiceGig;
  packages: [GigPackage, GigPackage, GigPackage];
  serviceName: string;
  totalOrders: string;
  reviewCount: number;
  parentPath: string; // e.g. /services/web-development
}

const badgeColors: Record<string, string> = {
  'Most Popular': 'bg-amber-500 text-black',
  'Bestseller':   'bg-red-600 text-white',
  'New':          'bg-emerald-500 text-white',
  'Hot':          'bg-orange-500 text-white',
};

export const ServiceGigDetailPage: React.FC = () => {
  const { state } = useLocation() as { state: DetailPageState | null };
  const navigate = useNavigate();
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const growthPlanModal = useModal();

  const [activePkg, setActivePkg] = useState(1);
  const [preService, setPreService] = useState<string | undefined>(undefined);
  const [preSubOption, setPreSubOption] = useState<string | undefined>(undefined);
  const [preGigName, setPreGigName] = useState<string | undefined>(undefined);
  const [activeImg, setActiveImg] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Build images list early (before early-return) so hooks aren't skipped
  const allImages = state?.gig
    ? ((state.gig.images && state.gig.images.length > 0) ? state.gig.images : [state.gig.image])
    : [];

  const goToImg = useCallback((idx: number) => {
    if (idx === activeImg || allImages.length <= 1) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveImg(idx);
      setIsTransitioning(false);
    }, 180);
  }, [activeImg, allImages.length]);

  const prevImg = useCallback(() => goToImg((activeImg - 1 + allImages.length) % allImages.length), [activeImg, allImages.length, goToImg]);
  const nextImg = useCallback(() => goToImg((activeImg + 1) % allImages.length), [activeImg, allImages.length, goToImg]);

  // Auto-advance slideshow every 5s
  useEffect(() => {
    if (allImages.length <= 1) return;
    const t = setInterval(nextImg, 5000);
    return () => clearInterval(t);
  }, [allImages.length, nextImg]);

  // If no state (e.g. direct URL hit), redirect back to the service page
  if (!state?.gig) {
    const parentPath = serviceSlug ? `/services/${serviceSlug}` : '/';
    setTimeout(() => navigate(parentPath, { replace: true }), 0);
    return null;
  }

  const { gig, packages, serviceName, totalOrders, reviewCount, parentPath } = state;
  const pkg = packages[activePkg];

  const openOrder = (service: string, subOptionKey?: string, gigName?: string) => {
    setPreService(service);
    setPreSubOption(subOptionKey);
    setPreGigName(gigName ?? service);
    growthPlanModal.open();
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[var(--bg-primary)] dark:bg-[#030712] selection:bg-red-500/30 transition-colors duration-300">
        <CustomCursor />
        <Navigation onCtaClick={growthPlanModal.open} />

        <main className="pt-24 sm:pt-28 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-8 flex-wrap">
              <button onClick={() => navigate('/')} className="hover:text-red-500 transition-colors font-medium">
                Home
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="hover:text-red-500 cursor-pointer transition-colors font-medium">Services</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              <button onClick={() => navigate(parentPath)} className="hover:text-red-500 transition-colors font-medium">
                {serviceName}
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-slate-900 dark:text-white font-bold">{gig.name}</span>
            </div>

            {/* Main Two-Column Layout */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

              {/* ── LEFT: Image + Description ── */}
              <div className="flex-1 min-w-0">

                {/* ── Etsy-style Gallery: vertical thumbs left + large image right ── */}
                <div className="flex gap-3 mb-8" style={{ minHeight: 360 }}>

                  {/* Vertical thumbnail column */}
                  {allImages.length > 1 && (
                    <div className="flex flex-col gap-2 overflow-y-auto max-h-[480px] pr-0.5 flex-shrink-0"
                         style={{ width: 84 }}>
                      {allImages.map((src, i) => (
                        <button
                          key={i}
                          onClick={() => goToImg(i)}
                          className={`relative flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200 focus:outline-none group/thumb`}
                          style={{ width: 80, height: 64 }}
                        >
                          <img
                            src={src}
                            alt={`View ${i + 1}`}
                            className={`w-full h-full object-cover transition-all duration-200 ${i === activeImg ? '' : 'group-hover/thumb:scale-105'}`}
                          />
                          {/* Active border overlay */}
                          <span className={`absolute inset-0 rounded-[10px] border-2 pointer-events-none transition-all duration-200 ${
                            i === activeImg
                              ? 'border-slate-900 dark:border-white opacity-100'
                              : 'border-transparent group-hover/thumb:border-slate-400 dark:group-hover/thumb:border-slate-500'
                          }`} />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Main image with side arrows */}
                  <div className="relative flex-1 min-w-0 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 group"
                       style={{ minHeight: 300 }}>

                    {/* Image */}
                    <div className={`transition-opacity duration-180 w-full h-full ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                      <img
                        src={allImages[activeImg]}
                        alt={`${gig.name} — ${activeImg + 1}`}
                        className="w-full h-full object-cover"
                        style={{ aspectRatio: '4/3', maxHeight: 480 }}
                      />
                    </div>

                    {/* Badge */}
                    {gig.badge && (
                      <span className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider shadow-lg z-10 ${badgeColors[gig.badge] ?? 'bg-slate-700 text-white'}`}>
                        {gig.badge}
                      </span>
                    )}

                    {/* Left arrow — always visible, large, outside-ish */}
                    {allImages.length > 1 && (
                      <>
                        <button
                          onClick={prevImg}
                          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                          aria-label="Previous"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          onClick={nextImg}
                          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                          aria-label="Next"
                        >
                          <ChevronRightIcon className="w-6 h-6" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
                  {gig.name}
                </h1>

                {/* About */}
                <div className="mb-8">
                  <h2 className="text-[10px] font-black uppercase tracking-[0.15em] text-red-500 mb-3">
                    About This Service
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
                    {gig.detailDescription ?? gig.description}
                  </p>
                </div>

                {/* What's Included */}
                <div className="bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-6">
                  <h2 className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 mb-4">
                    What's Included
                  </h2>
                  <ul className="grid sm:grid-cols-2 gap-3">
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
              <div className="lg:w-[340px] xl:w-[370px] shrink-0 w-full">
                <div className="sticky top-28 rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-xl shadow-black/5 dark:shadow-black/40 bg-white dark:bg-[#0b0f17]">

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
                      <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-3 py-2 rounded-xl flex-1 justify-center">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-bold">{pkg.delivery}</span>
                        <span className="text-slate-400 dark:text-slate-500">delivery</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-3 py-2 rounded-xl flex-1 justify-center">
                        <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-bold">{pkg.revisions}</span>
                        <span className="text-slate-400 dark:text-slate-500">revisions</span>
                      </div>
                    </div>

                    {/* Package Features */}
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
                      onClick={() => openOrder(serviceName, gig.subOptionKey, `${gig.name} — ${pkg.label} Package`)}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-black text-sm uppercase tracking-widest transition-all duration-200 hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-0.5 active:translate-y-0 mb-2"
                    >
                      Get Started Now →
                    </button>
                    <button
                      onClick={() => openOrder(serviceName, gig.subOptionKey, gig.name)}
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
