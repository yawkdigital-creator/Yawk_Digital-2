import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { GrowthPlanModal } from '@/components/modals/GrowthPlanModal';
import { useModal } from '@/hooks/useModal';
import { getVerticalBySlug, getSubCategoryById } from '@/data/verticalData';
import {
  ArrowRight, ChevronRight, CheckCircle2, Rocket,
  Search, Zap, TrendingUp, Target, BarChart2, MessageCircle,
} from 'lucide-react';

const UNS = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=80`;

const HOW_WE_HELP = [
  {
    Icon: Search,
    title: 'Search Domination',
    desc: 'We capture high-intent buyers the moment they search — ranking your brand at the top of Google, Bing, and AI-powered search engines.',
    image: UNS('1432888498266-38ffec3eaf0a'),
  },
  {
    Icon: Target,
    title: 'Precision Paid Media',
    desc: 'Multi-platform ad campaigns (Meta, Google, TikTok, LinkedIn) engineered for maximum ROAS with granular audience targeting and creative testing.',
    image: UNS('1611162617474-c301d96d7ce5'),
  },
  {
    Icon: TrendingUp,
    title: 'Conversion Optimization',
    desc: 'We optimise every funnel stage — landing pages, email sequences, retargeting — to turn traffic into paying customers at scale.',
    image: UNS('1460925895917-afdab827c52f'),
  },
  {
    Icon: BarChart2,
    title: 'Data-Driven Growth',
    desc: "Real-time dashboards and attribution models give you full visibility into what's working, ensuring every marketing dollar is accountable.",
    image: UNS('1551288049-bebda4e38f71'),
  },
  {
    Icon: MessageCircle,
    title: 'Content & Authority',
    desc: 'Thought leadership content, case studies, and PR that position your brand as the trusted, obvious choice in your niche.',
    image: UNS('1499951360447-b19be8fe80f5'),
  },
  {
    Icon: Zap,
    title: 'Automation & Scale',
    desc: 'AI-powered workflows and marketing automation that let you scale without proportionally scaling your team or budget.',
    image: UNS('1485827404703-89b55fcc595e'),
  },
];

export const VerticalCategoryDetailPage: React.FC = () => {
  const { verticalSlug, categoryId } = useParams<{ verticalSlug: string; categoryId: string }>();
  const navigate = useNavigate();
  const growthPlanModal = useModal();

  const vertical = getVerticalBySlug(verticalSlug ?? '');
  const category = getSubCategoryById(verticalSlug ?? '', categoryId ?? '');

  if (!vertical || !category) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-[var(--bg-primary)] dark:bg-[#030712] flex items-center justify-center">
          <div className="text-center">
            <p className="text-slate-500 text-lg mb-4">Category not found.</p>
            <Link to="/" className="text-red-500 hover:underline">← Back to Home</Link>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  const Icon = category.Icon;

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[var(--bg-primary)] dark:bg-[#030712] transition-colors duration-300">
        <CustomCursor />
        <Navigation onCtaClick={growthPlanModal.open} />

        <main className="pt-24 sm:pt-28 pb-20">

          {/* ── Hero ── */}
          <section className="relative py-12 sm:py-16 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/3 w-[500px] h-[300px] bg-red-500/8 rounded-full blur-[120px]" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8 flex-wrap">
                <Link to="/" className="hover:text-red-500 transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3 flex-shrink-0" />
                <button
                  onClick={() => navigate(`/verticals/${vertical.slug}`)}
                  className="hover:text-red-500 transition-colors"
                >
                  {vertical.title}
                </button>
                <ChevronRight className="w-3 h-3 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300 font-semibold">{category.name}</span>
              </nav>

              {/* Header card */}
              <div className="rounded-2xl border border-slate-200 dark:border-white/8 bg-white dark:bg-[#0b0f17] mb-12 shadow-xl shadow-black/5 dark:shadow-black/30 overflow-hidden">
                {/* Banner image */}
                <div className="relative h-48 sm:h-64 md:h-72 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  {/* Title overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-red-500/80 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-widest">
                        {vertical.title}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white/80 text-[10px] font-bold uppercase tracking-wider">
                        {category.items.length} niches covered
                      </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-white tracking-tighter">
                      {category.name}
                    </h1>
                  </div>
                  {/* Icon badge */}
                  <div className={`absolute top-4 right-4 w-12 h-12 rounded-2xl ${category.bgGlow} backdrop-blur-sm border border-white/20 flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${category.accentColor}`} />
                  </div>
                </div>

                {/* Description below image */}
                <div className="p-5 sm:p-7">
                  <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Two-column layout */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 xl:gap-12 items-start">

                {/* ── LEFT: Niches covered + How we help ── */}
                <div className="space-y-10">

                  {/* Niches Grid */}
                  <div>
                    <h2 className="text-lg sm:text-xl font-heading font-black text-slate-900 dark:text-white mb-5 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-red-500" />
                      Niches We Serve
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {category.items.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 dark:border-white/8 bg-white dark:bg-[#0b0f17] hover:border-red-500/30 hover:bg-red-500/5 transition-all duration-200 group"
                        >
                          <div className="w-5 h-5 rounded-full bg-red-500/15 flex items-center justify-center flex-shrink-0 group-hover:bg-red-500/25 transition-colors">
                            <CheckCircle2 className="w-3 h-3 text-red-500" />
                          </div>
                          <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* How We Help */}
                  <div>
                    <h2 className="text-lg sm:text-xl font-heading font-black text-slate-900 dark:text-white mb-5">
                      How We Grow Your{' '}
                      <span className="bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
                        {category.name}
                      </span>{' '}
                      Business
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {HOW_WE_HELP.map(({ Icon: HIcon, title, desc, image }) => (
                        <div
                          key={title}
                          className="group rounded-2xl border border-slate-200 dark:border-white/8 bg-white dark:bg-[#0b0f17] hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/5 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
                        >
                          {/* Image */}
                          <div className="relative h-36 overflow-hidden">
                            <img
                              src={image}
                              alt={title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                            {/* Icon badge */}
                            <div className="absolute bottom-3 left-3 w-8 h-8 rounded-xl bg-red-500/80 backdrop-blur-sm flex items-center justify-center">
                              <HIcon className="w-4 h-4 text-white" />
                            </div>
                          </div>
                          {/* Content */}
                          <div className="p-4">
                            <h3 className="text-slate-900 dark:text-white font-black text-sm mb-1.5 group-hover:text-red-500 transition-colors duration-200">{title}</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── RIGHT: Sticky CTA card ── */}
                <div className="lg:sticky lg:top-28">
                  <div className="rounded-2xl border border-white/10 dark:border-white/10 border-slate-200 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-2xl shadow-black/10 dark:shadow-black/40">
                    {/* Header */}
                    <div className="text-center mb-6 pb-5 border-b border-slate-100 dark:border-white/8">
                      <div className={`w-14 h-14 rounded-2xl ${category.bgGlow} flex items-center justify-center mx-auto mb-3`}>
                        <Icon className={`w-7 h-7 ${category.accentColor}`} />
                      </div>
                      <h3 className="text-lg font-heading font-black text-slate-900 dark:text-white">
                        Ready to Scale Your<br />{category.name} Business?
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 text-xs mt-1.5">
                        Book a free strategy call with our team.
                      </p>
                    </div>

                    {/* Benefits */}
                    <ul className="space-y-2.5 mb-6">
                      {[
                        'Free 30-minute strategy session',
                        'Personalised growth roadmap',
                        'No commitment required',
                        'Industry-specific insights',
                        'Competitor analysis included',
                      ].map(b => (
                        <li key={b} className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <button
                      onClick={growthPlanModal.open}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-black py-3.5 rounded-xl text-sm uppercase tracking-widest transition-all hover:shadow-[0_0_30px_rgba(239,68,68,0.35)] hover:-translate-y-0.5 active:translate-y-0 mb-3"
                    >
                      <Rocket className="w-4 h-4" />
                      Book Free Strategy Call
                    </button>
                    <button
                      onClick={() => navigate(`/verticals/${vertical.slug}`)}
                      className="w-full flex items-center justify-center gap-2 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:border-red-500/30 font-bold py-3 rounded-xl text-sm transition-all"
                    >
                      <ArrowRight className="w-4 h-4 rotate-180" />
                      Back to {vertical.title}
                    </button>
                  </div>
                </div>
              </div>
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
