import React from 'react';
import charmiaLogo from '@/assets/images/charmia.png';
import seedsLogo from '@/assets/images/seeds.png';
import superdietLogo from '@/assets/images/superdietorganics.png';
import neelofarteaLogo from '@/assets/images/neelofartea.png';
import wildernessLogo from '@/assets/images/wilderness.png';
import zaruaratLogo from '@/assets/images/zaruarat.png';

interface TechLogo {
  name: string;
  image: string;
  href: string;
}

const TECH_LOGOS: TechLogo[] = [
  {
    name: 'Wilderness Organics',
    image: wildernessLogo,
    href: 'https://wnorganics.com'
  },
  {
    name: 'Seeds Official',
    image: seedsLogo,
    href: 'https://seedsofficial.store'
  },
  {
    name: 'Charmia',
    image: charmiaLogo,
    href: 'https://charmia.org'
  },
  {
    name: 'Super Diet Organics',
    image: superdietLogo,
    href: 'https://superdietorganics.com'
  },
  {
    name: 'Neelofar Tea',
    image: neelofarteaLogo,
    href: 'https://neelofartea.com'
  },
  {
    name: 'Zaruarat',
    image: zaruaratLogo,
    href: 'https://zaruarat.org'
  }
];

export const LogoCarousel: React.FC = () => {
  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...TECH_LOGOS, ...TECH_LOGOS, ...TECH_LOGOS];

  return (
    <section className="py-6 sm:py-12 md:py-16 bg-slate-50 dark:bg-[#030712] border-y border-slate-200 dark:border-white/5 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <div className="mb-5 sm:mb-8 md:mb-10 text-center">
          <h3 className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 mb-1 sm:mb-2">
            Trusted by Elite Brands
          </h3>
          <p className="text-xs sm:text-base text-slate-600 dark:text-slate-500">
            Scaling revenue for industry-leading e-commerce and wellness brands
          </p>
        </div>
      </div>

      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 sm:w-48 md:w-64 bg-gradient-to-r from-slate-50 dark:from-slate-950/50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 sm:w-48 md:w-64 bg-gradient-to-l from-slate-50 dark:from-slate-950/50 to-transparent z-10 pointer-events-none"></div>

        {/* Scrolling container */}
        <div className="flex animate-scroll">
          {duplicatedLogos.map((logo, index) => (
            <a
              key={index}
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 mx-4 sm:mx-8 md:mx-10 flex items-center justify-center group"
            >
              <div className="px-3 sm:px-6 py-2 sm:py-4 rounded-lg sm:rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-white/10 group-hover:border-red-500/50 dark:group-hover:border-red-500/30 transition-all duration-300 group-hover:shadow-lg group-hover:scale-105 flex items-center justify-center">
                <div className="h-28 sm:h-48 w-auto flex items-center justify-center transition-all duration-300 grayscale group-hover:grayscale-0">
                  <img 
                    src={logo.image} 
                    alt={logo.name} 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
