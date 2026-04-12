// src/components/pixels/SnapchatPixel.tsx
import { useEffect } from 'react';
import pixelConfig from '@/config/pixels';

declare global {
  interface Window {
    snaptr?: (action: string, event?: string, data?: unknown) => void;
  }
}

export default function SnapchatPixel() {
  const { enabled, pixelId } = pixelConfig.snapchat;

  useEffect(() => {
    if (!enabled || !pixelId) return;
    if (window.snaptr) return;

    const script = document.createElement('script');
    script.innerHTML = `
      (function(e,t,n){
        if(e.snaptr)return;
        var a=e.snaptr=function(){a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
        a.queue=[];
        var s='script',r=t.createElement(s);r.async=!0;
        r.src=n;var u=t.getElementsByTagName(s)[0];
        u.parentNode.insertBefore(r,u);
      })(window,document,'https://sc-static.net/scevent.min.js');
      snaptr('init', '${pixelId}', {});
      snaptr('track', 'PAGE_VIEW');
    `;
    document.head.appendChild(script);
  }, [enabled, pixelId]);

  return null;
}
