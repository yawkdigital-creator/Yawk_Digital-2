import type { SubServiceGig, GigPackage, GigFAQ } from '@/components/templates/ServiceGigPage';

/* ────────────────────────────────────────────────────
   Types
──────────────────────────────────────────────────── */

/** Serialisable slice of a service page (no JSX icons). */
export interface ServiceSnapshot {
  serviceName: string;
  tagline: string;
  about: string;
  packages: [GigPackage, GigPackage, GigPackage];
  subServices: SubServiceGig[];
  faqs: GigFAQ[];
}

/* ────────────────────────────────────────────────────
   Keys
──────────────────────────────────────────────────── */
const SNAP_KEY     = (slug: string) => `yd_snap_${slug}`;    // defaults saved by the live page
const OVERRIDE_KEY = (slug: string) => `yd_override_${slug}`; // edits saved by admin

/* ────────────────────────────────────────────────────
   Snapshot helpers  (written by ServiceGigPage on mount)
──────────────────────────────────────────────────── */
export function saveSnapshot(slug: string, data: ServiceSnapshot): void {
  try { localStorage.setItem(SNAP_KEY(slug), JSON.stringify(data)); } catch { /* noop */ }
}

export function loadSnapshot(slug: string): ServiceSnapshot | null {
  try {
    const raw = localStorage.getItem(SNAP_KEY(slug));
    return raw ? (JSON.parse(raw) as ServiceSnapshot) : null;
  } catch { return null; }
}

/* ────────────────────────────────────────────────────
   Override helpers  (written by admin, read by the live page)
──────────────────────────────────────────────────── */
export function saveOverride(slug: string, data: ServiceSnapshot): void {
  try { localStorage.setItem(OVERRIDE_KEY(slug), JSON.stringify(data)); } catch { /* noop */ }
}

export function loadOverride(slug: string): ServiceSnapshot | null {
  try {
    const raw = localStorage.getItem(OVERRIDE_KEY(slug));
    return raw ? (JSON.parse(raw) as ServiceSnapshot) : null;
  } catch { return null; }
}

export function resetOverride(slug: string): void {
  localStorage.removeItem(OVERRIDE_KEY(slug));
}

/** Returns the effective data: override (if any) else snapshot (if any) else null. */
export function loadEffective(slug: string): ServiceSnapshot | null {
  return loadOverride(slug) ?? loadSnapshot(slug);
}

/** True if an admin override exists for this slug. */
export function hasOverride(slug: string): boolean {
  return localStorage.getItem(OVERRIDE_KEY(slug)) !== null;
}

/* ────────────────────────────────────────────────────
   All known services
──────────────────────────────────────────────────── */
export const ALL_SERVICE_SLUGS: { slug: string; name: string; path: string }[] = [
  { slug: 'web-development',        name: 'Web Development',        path: '/services/web-development' },
  { slug: 'graphic-design',         name: 'Graphic Design',         path: '/services/graphic-design' },
  { slug: 'ads-management',         name: 'Ads Management',         path: '/services/ads-management' },
  { slug: 'ai-business-automation', name: 'AI Business Automation', path: '/services/ai-business-automation' },
  { slug: 'app-development',        name: 'App Development',        path: '/services/app-development' },
  { slug: 'seo-aeo',                name: 'SEO / AEO',              path: '/services/seo-aeo' },
  { slug: 'video-editing',          name: 'Video Editing',          path: '/services/video-editing' },
  { slug: 'shop-management',        name: 'Shop Management',        path: '/services/shop-management' },
];
