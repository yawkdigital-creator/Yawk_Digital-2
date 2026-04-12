import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Logo } from '@/components/ui/Logo';
import { useScroll } from '@/hooks/useScroll';
import { useActiveSection } from '@/hooks/useActiveSection';
import { NAVIGATION_LINKS } from '@/config/constants';
import { AdminPasswordModal } from '@/components/modals/AdminPasswordModal';
import { Shield, Menu, X } from 'lucide-react';

interface NavigationProps {
  onCtaClick: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onCtaClick }) => {
  const isScrolled = useScroll(20);
  const navigate = useNavigate();
  const location = useLocation();
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get section IDs from navigation links
  const sectionIds = NAVIGATION_LINKS.map(link => link.href);
  const activeSection = useActiveSection(sectionIds, 150);

  // Smooth scroll handler
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const scrollToTarget = () => {
      const targetElement = document.getElementById(targetId);
      if (!targetElement) return;
      const navHeight = 80;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    };

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(scrollToTarget, 150);
    } else {
      scrollToTarget();
    }
    setMobileMenuOpen(false);
  };

  // Handle Case Studies navigation
  const handleCaseStudiesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/case-studies');
    setMobileMenuOpen(false);
  };

  // Handle Blog navigation
  const handleBlogClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/blog');
    setMobileMenuOpen(false);
  };

  // Handle Reviews navigation
  const handleReviewsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/reviews');
    setMobileMenuOpen(false);
  };

  // Handle Admin button click
  const handleAdminClick = () => {
    setAdminModalOpen(true);
    setMobileMenuOpen(false);
  };

  // Handle successful admin password
  const handleAdminSuccess = () => {
    navigate('/admin');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 shadow-sm'
        : 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl'
        }`}
    >
      <div className="container mx-auto px-4 sm:px-5 md:px-8 xl:px-10">
        <div className="h-20 sm:h-24 flex items-center justify-between gap-3">
          <button
            onClick={() => navigate('/')}
            className="flex items-center"
            aria-label="Go to homepage"

          >
            <Logo className="h-20 sm:h-20 md:h-20" />
          </button>

          <div className="hidden md:flex items-center gap-0.5 lg:gap-1 flex-1 justify-center">
            {NAVIGATION_LINKS.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${isActive
                    ? 'text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                >
                  {link.label}
                </a>
              );
            })}
            <a
              href="/case-studies"
              onClick={handleCaseStudiesClick}
              className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${location.pathname === '/case-studies'
                ? 'text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
            >
              Case Studies
            </a>
            <a
              href="/blog"
              onClick={handleBlogClick}
              className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${location.pathname === '/blog' || location.pathname.startsWith('/blog/')
                ? 'text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
            >
              Blog
            </a>
            <a
              href="/reviews"
              onClick={handleReviewsClick}
              className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${location.pathname === '/reviews'
                ? 'text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
            >
              Reviews
            </a>
          </div>

          <div className="flex items-center justify-end gap-1.5 sm:gap-2 flex-shrink-0">
            <ThemeToggle />
            <button
              onClick={handleAdminClick}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Admin Panel"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
            <Button
              variant="primary"
              size="sm"
              onClick={onCtaClick}
              className="hidden md:flex text-xs px-3 py-2 whitespace-nowrap"
            >
              Get Free Growth Plan
            </Button>

            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-1.5 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-slate-200 dark:border-white/10">
            <div className="pt-3 space-y-1">
              {NAVIGATION_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/case-studies"
                onClick={handleCaseStudiesClick}
                className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Case Studies
              </a>
              <a
                href="/blog"
                onClick={handleBlogClick}
                className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Blog
              </a>
              <a
                href="/reviews"
                onClick={handleReviewsClick}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === '/reviews'
                  ? 'text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
              >
                Reviews
              </a>
              <button
                onClick={handleAdminClick}
                className="w-full mt-2 px-3 py-2 rounded-md text-sm font-medium text-left text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Admin
              </button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  onCtaClick();
                  setMobileMenuOpen(false);
                }}
                className="w-full mt-2"
              >
                Get Free Growth Plan
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Admin Password Modal */}
      <AdminPasswordModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        onSuccess={handleAdminSuccess}
      />
    </nav>
  );
};
