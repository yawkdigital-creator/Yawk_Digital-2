// src/utils/tracking.ts
// ─────────────────────────────────────────────────────────────────────────────
// Call these functions anywhere in your React components to fire conversion
// events on ALL active ad platforms simultaneously.
//
// Usage example (contact form submit):
//   import { trackLead } from '@/utils/tracking';
//   trackLead();
// ─────────────────────────────────────────────────────────────────────────────

/** Someone submits a contact / enquiry form */
export function trackLead(data: Record<string, unknown> = {}): void {
  if (window.fbq)    window.fbq('track', 'Lead', data);
  if (window.ttq)    window.ttq.track('SubmitForm', data);
  if (window.gtag)   window.gtag('event', 'generate_lead', data);
  if (window.lintrk) window.lintrk('track', { conversion_id: data.linkedinConversionId });
  if (window.snaptr) window.snaptr('track', 'SIGN_UP', data);
  if (window.pintrk) window.pintrk('track', 'lead', data);
  if (window.twq)    window.twq('event', 'tw-lead', data);
}

/** Someone books a free strategy call / consultation */
export function trackSchedule(): void {
  if (window.fbq)    window.fbq('track', 'Schedule');
  if (window.ttq)    window.ttq.track('Subscribe');
  if (window.gtag)   window.gtag('event', 'schedule', {});
  if (window.snaptr) window.snaptr('track', 'SUBSCRIBE');
}

/** Someone views a service or gig detail page */
export function trackViewContent(contentName = ''): void {
  if (window.fbq)    window.fbq('track', 'ViewContent', { content_name: contentName });
  if (window.ttq)    window.ttq.track('ViewContent', { content_name: contentName });
  if (window.gtag)   window.gtag('event', 'view_item', { item_name: contentName });
  if (window.pintrk) window.pintrk('track', 'pagevisit');
}

/** Someone clicks an email or phone link */
export function trackContact(method: 'email' | 'phone' | 'whatsapp' = 'email'): void {
  if (window.fbq)    window.fbq('track', 'Contact');
  if (window.ttq)    window.ttq.track('Contact');
  if (window.gtag)   window.gtag('event', 'contact', { method });
  if (window.snaptr) window.snaptr('track', 'PAGE_VIEW');
}

/** Manual page view fire (auto-handled by pixel components, but available if needed) */
export function trackPageView(url: string): void {
  if (window.fbq)    window.fbq('track', 'PageView');
  if (window.ttq)    window.ttq.page();
  if (window.gtag)   window.gtag('config', import.meta.env.VITE_GOOGLE_MEASUREMENT_ID, { page_path: url });
  if (window.snaptr) window.snaptr('track', 'PAGE_VIEW');
  if (window.pintrk) window.pintrk('page');
}
