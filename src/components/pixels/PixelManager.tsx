// src/components/pixels/PixelManager.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Master switch — loads every enabled pixel.
// This component is added ONCE in App.tsx and never touched again.
// To turn a pixel on/off → just edit .env.local and redeploy.
// ─────────────────────────────────────────────────────────────────────────────
import MetaPixel      from './MetaPixel';
import TikTokPixel    from './TikTokPixel';
import GooglePixel    from './GooglePixel';
import LinkedInPixel  from './LinkedInPixel';
import SnapchatPixel  from './SnapchatPixel';
import PinterestPixel from './PinterestPixel';
import TwitterPixel   from './TwitterPixel';

export default function PixelManager() {
  return (
    <>
      <MetaPixel />
      <TikTokPixel />
      <GooglePixel />
      <LinkedInPixel />
      <SnapchatPixel />
      <PinterestPixel />
      <TwitterPixel />
    </>
  );
}
