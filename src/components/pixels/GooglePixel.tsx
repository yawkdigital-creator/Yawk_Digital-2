// src/components/pixels/GooglePixel.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import pixelConfig from '@/config/pixels';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function GooglePixel() {
  const { pathname } = useLocation();
  const { enabled, measurementId, adsId } = pixelConfig.google;

  // Inject gtag script once on mount
  useEffect(() => {
    if (!enabled || !measurementId) return;
    if (window.gtag) return;

    // Load gtag.js
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(gtagScript);

    // Initialise dataLayer + gtag function
    const initScript = document.createElement('script');
    initScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${measurementId}');
      ${adsId ? `gtag('config', '${adsId}');` : ''}
    `;
    document.head.appendChild(initScript);
  }, [enabled, measurementId, adsId]);

  // Track page views on SPA navigation
  useEffect(() => {
    if (!enabled || !window.gtag) return;
    window.gtag('config', measurementId, { page_path: pathname });
    if (adsId) window.gtag('config', adsId);
  }, [pathname, enabled, measurementId, adsId]);

  return null;
}
