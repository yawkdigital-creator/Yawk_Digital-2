// src/components/pixels/TikTokPixel.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import pixelConfig from '@/config/pixels';

declare global {
  interface Window {
    ttq?: { page: () => void; track: (event: string, data?: unknown) => void };
    TiktokAnalyticsObject?: string;
  }
}

export default function TikTokPixel() {
  const { pathname } = useLocation();
  const { enabled, pixelId } = pixelConfig.tiktok;

  // Inject base script once
  useEffect(() => {
    if (!enabled || !pixelId) return;
    if (window.ttq) return;

    const script = document.createElement('script');
    script.innerHTML = `
      !function (w, d, t) {
        w.TiktokAnalyticsObject=t;
        var ttq=w[t]=w[t]||[];
        ttq.methods=['page','track','identify','instances','debug','on','off','once','ready','alias','group','enableCookie','disableCookie'];
        ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
        for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
        ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
        ttq.load=function(e,n){
          var i='https://analytics.tiktok.com/i18n/pixel/events.js';
          ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=i;
          ttq._o=ttq._o||{};ttq._o[e]=n||{};
          var o=document.createElement('script');o.type='text/javascript';o.async=!0;
          o.src=i+'?sdkid='+e+'&lib='+t;
          var a=document.getElementsByTagName('script')[0];a.parentNode.insertBefore(o,a)
        };
        ttq.load('${pixelId}');
        ttq.page();
      }(window, document, 'ttq');
    `;
    document.head.appendChild(script);
  }, [enabled, pixelId]);

  // Track page views on SPA navigation
  useEffect(() => {
    if (!enabled || !window.ttq) return;
    window.ttq.page();
  }, [pathname, enabled]);

  return null;
}
