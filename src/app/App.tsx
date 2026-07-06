import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { FloatingCTA } from '@/components/ui/FloatingCTA';
import { Hero } from '@/components/sections/Hero';
import { TrustedByLeaders } from '@/components/sections/TrustedByLeaders';
import { Services } from '@/components/sections/Services';
import { VerticalExpertise } from '@/components/sections/VerticalExpertise';
import { Process } from '@/components/sections/Process';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { Testimonials } from '@/components/sections/Testimonials';
import { LogoCarousel } from '@/components/sections/LogoCarousel';
import { CTA } from '@/components/sections/CTA';
import { GrowthPlanModal } from '@/components/modals/GrowthPlanModal';
import { VerticalDetailModal } from '@/components/modals/VerticalDetailModal';
import { useModal } from '@/hooks/useModal';
import { VERTICAL_DETAILS } from '@/config/verticalDetails';
import '@/styles/animations.css';
import PixelManager from '@/components/pixels/PixelManager';

// ── Lazy-loaded pages (code-split into separate chunks) ──────────────────────
const CaseStudiesPage        = lazy(() => import('@/pages/CaseStudiesPage').then(m => ({ default: m.CaseStudiesPage })));
const AdminPage              = lazy(() => import('@/pages/AdminPage').then(m => ({ default: m.AdminPage })));
const AdminBlogPage          = lazy(() => import('@/pages/AdminBlogPage').then(m => ({ default: m.AdminBlogPage })));
const BlogPage               = lazy(() => import('@/pages/BlogPage').then(m => ({ default: m.BlogPage })));
const BlogPostPage           = lazy(() => import('@/pages/BlogPostPage').then(m => ({ default: m.BlogPostPage })));
const WebDevelopmentPage     = lazy(() => import('@/pages/WebDevelopmentPage').then(m => ({ default: m.WebDevelopmentPage })));
const GraphicDesignPage      = lazy(() => import('@/pages/GraphicDesignPage').then(m => ({ default: m.GraphicDesignPage })));
const AdsManagementPage      = lazy(() => import('@/pages/AdsManagementPage').then(m => ({ default: m.AdsManagementPage })));
const AIBusinessAutomationPage = lazy(() => import('@/pages/AIBusinessAutomationPage').then(m => ({ default: m.AIBusinessAutomationPage })));
const AppDevelopmentPage     = lazy(() => import('@/pages/AppDevelopmentPage').then(m => ({ default: m.AppDevelopmentPage })));
const SEOAEOPage             = lazy(() => import('@/pages/SEOAEOPage').then(m => ({ default: m.SEOAEOPage })));
const VideoEditingPage       = lazy(() => import('@/pages/VideoEditingPage').then(m => ({ default: m.VideoEditingPage })));
const ShopManagementPage     = lazy(() => import('@/pages/ShopManagementPage').then(m => ({ default: m.ShopManagementPage })));
const ReviewsPage                  = lazy(() => import('@/pages/ReviewsPage').then(m => ({ default: m.ReviewsPage })));
const ServiceGigDetailPage         = lazy(() => import('@/pages/ServiceGigDetailPage').then(m => ({ default: m.ServiceGigDetailPage })));
const VerticalPage                 = lazy(() => import('@/pages/VerticalPage').then(m => ({ default: m.VerticalPage })));
const VerticalCategoryDetailPage   = lazy(() => import('@/pages/VerticalCategoryDetailPage').then(m => ({ default: m.VerticalCategoryDetailPage })));

// Minimal full-screen loader shown while a lazy chunk loads
const PageLoader: React.FC = () => (
  <div className="min-h-screen bg-[var(--bg-primary)] dark:bg-[#030712] flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 rounded-full border-2 border-red-500 border-t-transparent animate-spin" />
      <span className="text-sm text-slate-500 font-medium tracking-widest uppercase">Loading…</span>
    </div>
  </div>
);

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const growthPlanModal = useModal();
  const contactModal = useModal();
  const [selectedVerticalId, setSelectedVerticalId] = useState<string | null>(null);

  const handleGrowthPlanOpen = () => growthPlanModal.open();
  const handleContactOpen = () => contactModal.open();
  const handleWatchProcess = () => {
    // Placeholder for video modal
    console.log('Watch process video');
  };

  const handleSuccess = () => {
    console.log('Form submitted successfully');
  };

  const handleVerticalClick = (verticalId: string) => {
    setSelectedVerticalId(verticalId);
  };

  const handleVerticalModalClose = () => {
    setSelectedVerticalId(null);
  };

  const selectedVertical = selectedVerticalId ? VERTICAL_DETAILS[selectedVerticalId] : null;

  return (
    <ThemeProvider>
      <Analytics />
      <PixelManager />
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Blog Pages */}
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogPostPage />} />

        {/* Case Studies Page */}
        <Route path="/case-studies" element={<CaseStudiesPage />} />

        {/* Admin Pages */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/blog" element={<AdminBlogPage />} />
        
        {/* Reviews Page */}
        <Route path="/reviews" element={<ReviewsPage />} />

        {/* Service Pages */}
        <Route path="/services/web-development" element={<WebDevelopmentPage />} />
        <Route path="/services/graphic-design" element={<GraphicDesignPage />} />
        <Route path="/services/ads-management" element={<AdsManagementPage />} />
        <Route path="/services/ai-business-automation" element={<AIBusinessAutomationPage />} />
        <Route path="/services/app-development" element={<AppDevelopmentPage />} />
        <Route path="/services/seo-aeo" element={<SEOAEOPage />} />
        <Route path="/services/video-editing" element={<VideoEditingPage />} />
        <Route path="/services/shop-management" element={<ShopManagementPage />} />

        {/* Individual Service/Gig Detail Pages */}
        <Route path="/services/:serviceSlug/:gigId" element={<ServiceGigDetailPage />} />

        {/* Vertical Expertise Pages */}
        <Route path="/verticals/:verticalSlug" element={<VerticalPage />} />
        <Route path="/verticals/:verticalSlug/:categoryId" element={<VerticalCategoryDetailPage />} />
        
        {/* Home Page */}
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-[var(--bg-primary)] dark:bg-[#030712] selection:bg-red-500/30 transition-colors duration-300">
              <div className="relative z-10">
              <CustomCursor />
      <Navigation onCtaClick={handleGrowthPlanOpen} />

      <main className="relative z-10">
        <Hero onCtaClick={handleGrowthPlanOpen} onWatchProcess={handleWatchProcess} />
                <TrustedByLeaders onCtaClick={handleGrowthPlanOpen} />
                <LogoCarousel />
                <Services />
                <VerticalExpertise onVerticalClick={handleVerticalClick} />
                <Process />
                <WhyChooseUs />
        <Testimonials />
        <CTA onPlanClick={handleGrowthPlanOpen} onStrategyClick={handleContactOpen} />
      </main>

      <Footer />
              <FloatingCTA onClick={handleGrowthPlanOpen} />
              </div>

      <GrowthPlanModal
        isOpen={growthPlanModal.isOpen}
        onClose={growthPlanModal.close}
        onSuccess={handleSuccess}
      />

              <VerticalDetailModal
                isOpen={!!selectedVertical}
                onClose={handleVerticalModalClose}
                vertical={selectedVertical}
                onGetStrategy={handleGrowthPlanOpen}
              />
    </div>
          }
        />
      </Routes>
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
