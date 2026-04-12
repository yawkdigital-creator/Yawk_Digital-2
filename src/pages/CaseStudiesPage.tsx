import React from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { CaseStudies } from '@/components/sections/CaseStudies';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useModal } from '@/hooks/useModal';
import { GrowthPlanModal } from '@/components/modals/GrowthPlanModal';

export const CaseStudiesPage: React.FC = () => {
  const growthPlanModal = useModal();

  const handleGrowthPlanOpen = () => growthPlanModal.open();

  const handleSuccess = () => {
    console.log('Form submitted successfully');
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[var(--bg-primary)] dark:bg-[#030712] selection:bg-red-500/30 transition-colors duration-300">
        <CustomCursor />
        <Navigation onCtaClick={handleGrowthPlanOpen} />

        <main>
          <CaseStudies />
        </main>

        <Footer />

        <GrowthPlanModal
          isOpen={growthPlanModal.isOpen}
          onClose={growthPlanModal.close}
          onSuccess={handleSuccess}
        />
      </div>
    </ThemeProvider>
  );
};
