// src/components/pixels/PinterestPixel.tsx
import { useEffect } from 'react';
import pixelConfig from '@/config/pixels';

declare global {
  interface Window {
    pintrk?: (action: string, event?: string, data?: unknown) => void;
  }
}

export default function PinterestPixel() {
  const { enabled, tagId } = pixelConfig.pinterest;

  useEffect(() => {
    if (!enabled || !tagId) return;
    if (window.pintrk) return;

    const script = document.createElement('script');
    script.innerHTML = `
      !function(e){
        if(!window.pintrk){
          window.pintrk=function(){window.pintrk.queue.push(Array.prototype.slice.call(arguments))};
          var n=window.pintrk;n.queue=[],n.version='3.0';
          var t=document.createElement('script');
          t.async=!0,t.src=e;
          var r=document.getElementsByTagName('script')[0];
          r.parentNode.insertBefore(t,r)
        }
      }('https://s.pinimg.com/ct/core.js');
      pintrk('load', '${tagId}');
      pintrk('page');
    `;
    document.head.appendChild(script);
  }, [enabled, tagId]);

  return null;
}
