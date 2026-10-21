import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Palette, Code2, Search, Megaphone, Bot, Video, ArrowRight, type LucideIcon } from 'lucide-react';
import webImg from '@/assets/images/web.jpg';
import seoImg from '@/assets/images/seo.jpg';
import adsImg from '@/assets/images/ads.jpg';
import aiImg from '@/assets/images/ai.jpg';
import graphicImg from '@/assets/images/graphic.jpg';
import editingImg from '@/assets/images/editing.jpg';

interface Service {
  title: string;
  tags: string[];
  description: string;
  icon: LucideIcon;
  gradient: string;
  image?: string;
  path: string;
}

const SERVICES: Service[] = [
  {
    title: 'Web Development',
    tags: ['Websites', 'Landing Pages', 'Performance'],
    description:
      'Fast, conversion-focused websites built to turn visitors into leads. Clean code, mobile-first layouts, and a structure your team can actually update.',
    icon: Code2,
    gradient: 'from-red-600 to-purple-600',
    image: webImg,
    path: '/services/web-development',
  },
  {
    title: 'SEO & AEO',
    tags: ['Search', 'Answer Engines', 'Content'],
    description:
      'Get found on Google and inside AI answer engines. Technical SEO, content strategy, and structured data that compounds month over month.',
    icon: Search,
    gradient: 'from-purple-600 to-indigo-600',
    image: seoImg,
    path: '/services/seo-aeo',
  },
  {
    title: 'Performance Ads',
    tags: ['Meta Ads', 'Google Ads', 'TikTok'],
    description:
      'Paid campaigns obsessed with return. We audit first, test creative relentlessly, and cut what does not earn its spend.',
    icon: Megaphone,
    gradient: 'from-red-500 to-orange-500',
    image: adsImg,
    path: '/services/ads-management',
  },
  {
    title: 'AI Business Automation',
    tags: ['Workflows', 'CRM', 'Integrations'],
    description:
      'Stop doing repetitive work by hand. We connect your tools, automate follow-ups, and build the systems that run while you sleep.',
    icon: Bot,
    gradient: 'from-purple-600 to-pink-600',
    image: aiImg,
    path: '/services/ai-business-automation',
  },
  {
    title: 'Graphic Design',
    tags: ['Branding', 'Social Creatives', 'Print'],
    description:
      'Visual identity and creatives that look sharp and stay on brand. From logos to ad sets, every asset works together.',
    icon: Palette,
    gradient: 'from-pink-600 to-red-500',
    image: graphicImg,
    path: '/services/graphic-design',
  },
  {
    title: 'Video Editing',
    tags: ['Short-form', 'Ads', 'Explainers'],
    description:
      'Scroll-stopping edits for reels, ads, and product videos. Tight pacing, strong hooks, and captions that get watched to the end.',
    icon: Video,
    gradient: 'from-indigo-600 to-purple-600',
    image: editingImg,
    path: '/services/video-editing',
  },
];

const STICKY_TOP = 112;
const STACK_OFFSET = 16;

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

export const ServicesShowcase: React.FC = () => {
  const wrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;

      cardRefs.current.forEach((card, i) => {
        const wrap = wrapRefs.current[i];
        if (!card || !wrap) return;

        const wrapTop = wrap.getBoundingClientRect().top;
        const enter = reduceMotion ? 1 : clamp((vh - wrapTop) / (vh * 0.55));
        const nextWrap = wrapRefs.current[i + 1];
        let cover = 0;
        if (nextWrap && !reduceMotion) {
          const nextTop = nextWrap.getBoundingClientRect().top;
          const stickyTop = STICKY_TOP + i * STACK_OFFSET;
          cover = clamp((stickyTop + card.offsetHeight - nextTop) / card.offsetHeight);
        }

        const rotateIn = (1 - enter) * 8;
        const translateIn = (1 - enter) * 80;
        const scale = 1 - cover * 0.06;
        const rotateOut = cover * -4;
        const translateOut = cover * -24;

        card.style.opacity = String(enter * (1 - cover * 0.5));
        card.style.transform = `translate3d(0, ${translateIn + translateOut}px, 0) rotate(${rotateIn + rotateOut}deg) scale(${scale})`;
      });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="services" className="py-20 sm:py-28 bg-white dark:bg-[#030712]">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-8 items-end mb-16">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-900 dark:text-slate-100 mb-4">
              <span className="w-2 h-2 rounded-sm bg-red-500" />
              What we do
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black tracking-tight leading-[1.1] text-slate-900 dark:text-slate-50">
              Six services. One team that actually moves your numbers.
            </h2>
          </div>

          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed md:justify-self-end md:max-w-xl">
            Start with the service that fixes your biggest problem today, or bundle several and let one team run them together so nothing slips through the cracks.
          </p>
        </div>

        <div>
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            const isEven = i % 2 === 1;

            return (
              <div
                key={service.title}
                ref={(el) => {
                  wrapRefs.current[i] = el;
                }}
                className="sticky mb-[25vh] last:mb-0"
                style={{ top: `${STICKY_TOP + i * STACK_OFFSET}px`, zIndex: i + 1 }}
              >
                <div
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className="grid md:grid-cols-2 gap-6 md:gap-10 items-center rounded-3xl bg-slate-50 dark:bg-slate-900 p-6 sm:p-8 md:p-10 shadow-2xl origin-top will-change-transform"
                  style={{ opacity: 0 }}
                >
                  <div className={isEven ? 'md:order-2' : ''}>
                    <p className="font-mono text-xs text-slate-500 mb-4">
                      {String(i + 1).padStart(2, '0')} / {String(SERVICES.length).padStart(2, '0')}
                    </p>

                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black tracking-tight text-slate-900 dark:text-slate-50 mb-5">
                      {service.title}
                    </h3>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-300 shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                      {service.description}
                    </p>

                    <Link
                      to={service.path}
                      className={`inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full text-white text-sm font-semibold bg-gradient-to-r ${service.gradient} shadow-lg hover:scale-[1.02] transition-transform`}
                    >
                      Explore {service.title}
                      <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
                        <ArrowRight size={16} className="text-slate-900" />
                      </span>
                    </Link>
                  </div>

                  <div
                    className={`relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br ${service.gradient} flex items-center justify-center ${isEven ? 'md:order-1' : ''}`}
                  >
                    {service.image && (
                      <img
                        src={service.image}
                        alt={service.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                      />
                    )}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-60 mix-blend-multiply`} />
                    <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
                    <div className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-black/20 blur-3xl" />
                    <div className="relative w-28 h-28 rounded-3xl bg-white/15 backdrop-blur flex items-center justify-center shadow-2xl">
                      <Icon size={48} className="text-white" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
