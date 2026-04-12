// src/config/pixels.ts
// ─────────────────────────────────────────────────────────────────────────────
// YAWK DIGITAL — Pixel Control Panel
//
// To activate any pixel:  paste its ID into .env.local  → save → redeploy
// To deactivate any pixel: clear the ID in .env.local   → save → redeploy
//
// NOTE: This project uses Vite, so all public env vars use the VITE_ prefix.
//       They are automatically read from .env.local during the build.
// ─────────────────────────────────────────────────────────────────────────────

const pixelConfig = {
  meta: {
    enabled: !!import.meta.env.VITE_META_PIXEL_ID,
    pixelId: import.meta.env.VITE_META_PIXEL_ID as string ?? '',
  },
  tiktok: {
    enabled: !!import.meta.env.VITE_TIKTOK_PIXEL_ID,
    pixelId: import.meta.env.VITE_TIKTOK_PIXEL_ID as string ?? '',
  },
  google: {
    enabled: !!import.meta.env.VITE_GOOGLE_MEASUREMENT_ID,
    measurementId: import.meta.env.VITE_GOOGLE_MEASUREMENT_ID as string ?? '',
    adsId: import.meta.env.VITE_GOOGLE_ADS_ID as string ?? '',
  },
  linkedin: {
    enabled: !!import.meta.env.VITE_LINKEDIN_PARTNER_ID,
    partnerId: import.meta.env.VITE_LINKEDIN_PARTNER_ID as string ?? '',
  },
  snapchat: {
    enabled: !!import.meta.env.VITE_SNAPCHAT_PIXEL_ID,
    pixelId: import.meta.env.VITE_SNAPCHAT_PIXEL_ID as string ?? '',
  },
  pinterest: {
    enabled: !!import.meta.env.VITE_PINTEREST_TAG_ID,
    tagId: import.meta.env.VITE_PINTEREST_TAG_ID as string ?? '',
  },
  twitter: {
    enabled: !!import.meta.env.VITE_TWITTER_PIXEL_ID,
    pixelId: import.meta.env.VITE_TWITTER_PIXEL_ID as string ?? '',
  },
} as const;

export default pixelConfig;
