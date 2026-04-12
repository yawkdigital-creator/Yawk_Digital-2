// src/components/pixels/TwitterPixel.tsx
import { useEffect } from 'react';
import pixelConfig from '@/config/pixels';

declare global {
  interface Window {
    twq?: (action: string, event?: string, data?: unknown) => void;
  }
}

export default function TwitterPixel() {
  const { enabled, pixelId } = pixelConfig.twitter;

  useEffect(() => {
    if (!enabled || !pixelId) return;
    if (window.twq) return;

    const script = document.createElement('script');
    script.innerHTML = `
      !function(e,t,n,s,u,a){
        e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);},
        s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,
        u.src='https://static.ads-twitter.com/uwt.js',
        a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))
      }(window,document,'script');
      twq('config','${pixelId}');
    `;
    document.head.appendChild(script);
  }, [enabled, pixelId]);

  return null;
}
