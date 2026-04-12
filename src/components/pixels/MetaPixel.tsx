// src/components/pixels/MetaPixel.tsx
// ─────────────────────────────────────────────────────────────────────────────
// The META PIXEL BASE CODE is loaded directly in index.html <head> for
// earliest possible firing (as recommended by Meta's official docs).
//
// This component's ONLY job is to fire a PageView on every SPA route change
// (i.e. when the user navigates between pages without a full page reload).
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import pixelConfig from '@/config/pixels';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

export default function MetaPixel() {
  const { pathname } = useLocation();
  const { enabled, pixelId } = pixelConfig.meta;

  useEffect(() => {
    if (!enabled || !pixelId) return;

    if (!window.fbq) {
      const script = document.createElement('script');
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
      `;
      document.head.appendChild(script);
    }

    window.fbq?.('init', pixelId);
  }, [enabled, pixelId]);

  // Fire PageView on every client-side route change (SPA navigation)
  useEffect(() => {
    if (!enabled || !pixelId || !window.fbq) return;
    window.fbq('track', 'PageView');
  }, [pathname, enabled, pixelId]);

  return null;
}
