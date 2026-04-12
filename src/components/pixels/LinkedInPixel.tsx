// src/components/pixels/LinkedInPixel.tsx
import { useEffect } from 'react';
import pixelConfig from '@/config/pixels';

declare global {
  interface Window {
    lintrk?: (action: string, data?: unknown) => void;
    _linkedin_partner_id?: string;
    _linkedin_data_partner_ids?: string[];
  }
}

export default function LinkedInPixel() {
  const { enabled, partnerId } = pixelConfig.linkedin;

  useEffect(() => {
    if (!enabled || !partnerId) return;
    if (window.lintrk) return;

    const script = document.createElement('script');
    script.innerHTML = `
      _linkedin_partner_id = '${partnerId}';
      window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
      window._linkedin_data_partner_ids.push(_linkedin_partner_id);
      (function(l) {
        if (!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};
        window.lintrk.q=[]}
        var s = document.getElementsByTagName('script')[0];
        var b = document.createElement('script');
        b.type = 'text/javascript'; b.async = true;
        b.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
        s.parentNode.insertBefore(b, s);
      })(window.lintrk);
    `;
    document.head.appendChild(script);

    // noscript fallback
    const noscript = document.createElement('noscript');
    const img = document.createElement('img');
    img.height = 1;
    img.width = 1;
    img.style.display = 'none';
    img.alt = '';
    img.src = `https://px.ads.linkedin.com/collect/?pid=${partnerId}&fmt=gif`;
    noscript.appendChild(img);
    document.body.appendChild(noscript);
  }, [enabled, partnerId]);

  return null;
}
