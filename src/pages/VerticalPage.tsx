import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { GrowthPlanModal } from '@/components/modals/GrowthPlanModal';
import { useModal } from '@/hooks/useModal';
import { getVerticalBySlug } from '@/data/verticalData';
import { ArrowRight, ChevronRight, TrendingUp, Layers } from 'lucide-react';

export const VerticalPage: React.FC = () => {
  const { verticalSlug } = useParams<{ verticalSlug: string }>();
  const navigate = useNavigate();
  const growthPlanModal = useModal();

  const vertical = getVerticalBySlug(verticalSlug ?? '');

  if (!vertical) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-[var(--bg-primary)] dark:bg-[#030712] flex items-center justify-center">
          <div className="text-center">
            <p className="text-slate-500 text-lg mb-4">Vertical not found.</p>
            <Link to="/" className="text-red-500 hover:underline">← Back to Home</Link>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[var(--bg-primary)] dark:bg-[#030712] transition-colors duration-300">
        <CustomCursor />
        <Navigation onCtaClick={growthPlanModal.open} />

        <main className="pt-24 sm:pt-28 pb-20">
          {/* ── Hero ── */}
          <section className="relative py-14 sm:py-20 overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/4 w-[500px] h-[350px] bg-red-500/8 rounded-full blur-[120px]" />
              <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-purple-500/8 rounded-full blur-[120px]" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500 mb-8 sm:mb-10">
                <Link to="/" className="hover:text-red-500 transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-slate-400 dark:text-slate-400">Verticals</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-slate-700 dark:text-slate-300 font-semibold">{vertical.title}</span>
              </nav>

              <div className="flex flex-col lg:flex-row gap-10 items-start">
                {/* Left: heading */}
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest mb-5">
                    <Layers className="w-3 h-3" />
                    Vertical Expertise
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-5">
                    {vertical.title}
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl mb-6">
                    {vertical.description}
                  </p>
                  <button
                    onClick={growthPlanModal.open}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-bold text-sm rounded-xl transition-all hover:shadow-[0_0_24px_rgba(239,68,68,0.35)] hover:-translate-y-0.5"
                  >
                    <ArrowRight className="w-4 h-4" />
                    Get a Free Strategy Call
                  </button>
                </div>

                {/* Right: stat card */}
                <div className="shrink-0">
                  <div className="rounded-2xl border border-white/10 dark:border-white/10 border-slate-200 bg-white dark:bg-slate-900/60 p-6 sm:p-8 text-center min-w-[180px] shadow-xl shadow-black/5 dark:shadow-black/30">
                    <div className="text-4xl sm:text-5xl font-heading font-black text-red-500 mb-1">{vertical.metric}</div>
                    <div className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">{vertical.metricLabel}</div>
                    <div className="mt-4 flex items-center justify-center gap-1.5 text-emerald-500 text-xs font-semibold">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>Avg. Client Result</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── Sub-category Cards Grid ── */}
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="mb-8 sm:mb-10">
              <h2 className="text-xl sm:text-2xl font-heading font-black text-slate-900 dark:text-white mb-1.5">
                Choose Your Category
              </h2>
              <p className="text-slate-500 dark:text-slate-500 text-sm">
                Select a category below to explore how we scale it.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {vertical.subCategories.map((cat, index) => {
                const Icon = cat.Icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => navigate(`/verticals/${vertical.slug}/${cat.id}`)}
                    className="group relative text-left rounded-2xl border border-slate-200 dark:border-white/8 bg-white dark:bg-[#0b0f17] hover:border-red-500/40 dark:hover:border-red-500/30 hover:shadow-xl hover:shadow-red-500/8 dark:hover:shadow-red-500/10 transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
                    style={{ animationDelay: `${index * 40}ms` }}
                  >
                    {/* ── Image ── */}
                    <div className="relative h-44 sm:h-48 overflow-hidden">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      {/* Dark overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                      {/* Icon badge — bottom-left of image */}
                      <div className={`absolute bottom-3 left-3 w-9 h-9 rounded-xl ${cat.bgGlow} backdrop-blur-sm border border-white/20 flex items-center justify-center`}>
                        <Icon className={`w-4 h-4 ${cat.accentColor}`} />
                      </div>

                      {/* Niches count badge — top-right */}
                      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider">
                        {cat.items.length} niches
                      </span>
                    </div>

                    {/* ── Content ── */}
                    <div className="p-4 sm:p-5">
                      {/* Name */}
                      <h3 className="text-base sm:text-lg font-heading font-black text-slate-900 dark:text-white mb-1.5 group-hover:text-red-500 transition-colors duration-200">
                        {cat.name}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4">
                        {cat.description}
                      </p>

                      {/* Explore link */}
                      <span className="flex items-center gap-1.5 text-red-500 text-xs font-bold">
                        Explore
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        </main>

        <Footer />

        <GrowthPlanModal
          isOpen={growthPlanModal.isOpen}
          onClose={growthPlanModal.close}
          onSuccess={() => {}}
        />
      </div>
    </ThemeProvider>
  );
};
