import React from 'react';
import { Logo } from '@/components/ui/Logo';
import { Linkedin, Twitter, Youtube, ArrowUpRight, Phone, Sparkles } from 'lucide-react';
import { NAVIGATION_LINKS } from '@/config/constants';

export const Footer: React.FC = () => {
  const socialIcons = [
    { Icon: Linkedin, href: '#', label: 'LinkedIn' },
    { Icon: Twitter, href: '#', label: 'Twitter' },
    { Icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-950 dark:to-[#030712] pt-8 sm:pt-16 md:pt-20 pb-6 sm:pb-10 md:pb-12 border-t border-slate-200 dark:border-white/5 transition-colors duration-300 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-500/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-red-500/3 to-purple-500/3 blur-[150px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-12 lg:gap-16 mb-6 sm:mb-12 md:mb-16">
          {/* Brand Section */}
          <div className="col-span-2 lg:col-span-2">
            <div className="mb-3 sm:mb-6 md:mb-8">
              <Logo className="h-8 sm:h-10 md:h-12 mb-2 sm:mb-4 md:mb-6" />
              <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-red-500 via-purple-500 to-red-500 rounded-full"></div>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-[11px] sm:text-sm md:text-base lg:text-lg max-w-lg mb-3 sm:mb-6 md:mb-8 leading-relaxed">
              We engineer revenue systems for companies that are tired of agencies who just "do things" without moving the needle. Strategy first. Results always.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-1.5 sm:gap-3 md:gap-4">
              {socialIcons.map(({ Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  aria-label={label}
                  className="group relative w-8 h-8 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-3 hover:border-red-500/50 hover:bg-gradient-to-br hover:from-red-500 hover:to-purple-500 hover:shadow-lg hover:shadow-red-500/25"
                >
                  <Icon className="w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6 relative z-10" />
                  <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-br from-red-500/0 to-purple-500/0 group-hover:from-red-500/20 group-hover:to-purple-500/20 transition-all duration-300"></div>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Section */}
          <div>
            <h5 className="text-slate-900 dark:text-white font-black uppercase tracking-[0.15em] text-[10px] sm:text-xs mb-2 sm:mb-4 md:mb-6 relative inline-block">
              Navigation
              <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 to-purple-500"></span>
            </h5>
            <ul className="space-y-1.5 sm:space-y-3 md:space-y-4">
              {NAVIGATION_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group relative text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all duration-300 flex items-center gap-1.5 sm:gap-2 py-0.5 sm:py-1.5 text-[11px] sm:text-sm md:text-base hover:translate-x-1"
                  >
                    <span className="relative z-10">{link.label}</span>
                    <ArrowUpRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-red-500" />
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h5 className="text-slate-900 dark:text-white font-black uppercase tracking-[0.15em] text-[10px] sm:text-xs mb-2 sm:mb-4 md:mb-6 relative inline-block">
              Legal
              <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 to-purple-500"></span>
            </h5>
            <ul className="space-y-1.5 sm:space-y-3 md:space-y-4">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <li key={item}>
                  <button className="group relative text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all duration-300 block py-0.5 sm:py-1.5 text-left hover:translate-x-1 w-full text-[11px] sm:text-sm md:text-base">
                    <span className="relative z-10">{item}</span>
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-3 sm:pt-6 md:pt-8 border-t border-slate-200 dark:border-white/5">
          <div className="flex items-center justify-between gap-4">
            {/* Copyright — left */}
            <div className="text-slate-500 dark:text-slate-600 text-[9px] sm:text-xs font-medium leading-tight whitespace-nowrap">
              &copy; {new Date().getFullYear()} Yawk Digital Growth Systems. All Rights Reserved.
            </div>

            {/* Logo — center */}
            <div className="flex-shrink-0">
              <Logo className="h-6 sm:h-8" />
            </div>

            {/* Status — right */}
            <div className="flex items-center gap-1.5 sm:gap-2 group cursor-pointer">
              <span className="relative w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 flex-shrink-0">
                <span className="absolute inset-0 rounded-full bg-red-500 group-hover:animate-ping opacity-75"></span>
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-[9px] sm:text-xs font-medium group-hover:text-red-500 transition-colors duration-300 whitespace-nowrap">
                All systems operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
