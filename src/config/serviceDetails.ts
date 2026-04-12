import { Service, LucideIcon } from '@/types';
import { Code2, Palette, TrendingUp, Layers } from 'lucide-react';

export interface ServiceDetail extends Omit<Service, 'icon'> {
  icon: LucideIcon;
  detailedDescription: string;
  whatsIncluded: string[];
  whyBetter: string;
  metrics: {
    label: string;
    value: string | number;
    suffix?: string;
  }[];
  refId: string;
}

export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  'web-dev': {
    id: 'web-dev',
    title: 'Web Development',
    description: 'High-performance, conversion-first digital architectures. Blazing fast, SEO-optimized Next.js engines.',
    outcome: 'High-Performance Digital Hubs',
    icon: Code2,
    tags: ['WordPress', 'Shopify', 'React', 'Node.js'],
    detailedDescription: 'Most websites are digital brochures. Ours are high-velocity revenue engines. We use Next.js and Headless architectures to ensure sub-1s load times, perfect Core Web Vitals, and conversion paths engineered through heat-map data.',
    whatsIncluded: [
      'Custom Headless Architecture',
      'Conversion Rate Optimization (CRO)',
      'Global Edge CDN Deployment',
      'Advanced SEO Infrastructure',
      'API-First Integrations',
    ],
    whyBetter: "We don't use templates. We build custom-coded performance assets. While others worry about how it looks, we worry about how it converts and scales. Every millisecond saved is capital earned.",
    metrics: [
      { label: 'Page Speed Score', value: 99, suffix: '/100' },
      { label: 'Bounce Rate Reduction', value: -35, suffix: '%' },
      { label: 'Conversion Lift', value: '+42', suffix: '%' },
    ],
    refId: 'SYST_WEB-DEV_v4',
  },
  'graphic-design': {
    id: 'graphic-design',
    title: 'Graphic Design',
    description: 'Premium visual assets designed for emotional resonance. From high-converting ad creative to sophisticated 3D product renders.',
    outcome: 'Billion-Dollar Aesthetic',
    icon: Palette,
    tags: ['Branding', 'Content Strategy', 'Social Media Content'],
    detailedDescription: 'Visual design that doesn\'t just look good—it converts. We create premium visual assets engineered for emotional resonance and conversion. From high-converting ad creative to sophisticated 3D product renders that stop scroll and drive action.',
    whatsIncluded: [
      'Brand Identity Systems',
      'High-Converting Ad Creative',
      '3D Product Renders',
      'UGC Content Templates',
      'Motion Graphics & Animation',
    ],
    whyBetter: 'We don\'t just make things pretty. Every visual asset is tested against conversion data. Our designs are engineered to trigger emotional responses that lead to purchases, not just likes.',
    metrics: [
      { label: 'Creative ROAS', value: 4.2, suffix: 'x' },
      { label: 'Engagement Rate', value: '+68', suffix: '%' },
      { label: 'Brand Recall', value: 89, suffix: '%' },
    ],
    refId: 'SYST_GRAPHIC-DESIGN_v4',
  },
  'ads-mgmt': {
    id: 'ads-mgmt',
    title: 'Ads Management',
    description: 'Capital velocity through ROI engineering. We deploy aggressive scaling systems across Meta, Google, and TikTok.',
    outcome: 'Predictable Revenue Scale',
    icon: TrendingUp,
    tags: ['Meta Ads', 'Media Buying', 'TikTok Ads', 'Google Ads', 'LinkedIn Ads'],
    detailedDescription: 'Capital velocity through ROI engineering. We deploy aggressive scaling systems across Meta, Google, and TikTok. Every dollar spent is optimized for maximum return, not just impressions.',
    whatsIncluded: [
      'Multi-Platform Campaign Management',
      'Advanced Retargeting Systems',
      'Funnel Optimization',
      'A/B Testing & Iteration',
      'Real-Time Performance Monitoring',
    ],
    whyBetter: 'We don\'t just run ads—we engineer capital velocity. Our systems are built to scale profitably, not just spend budgets. Every campaign is optimized for ROI, not vanity metrics.',
    metrics: [
      { label: 'Average ROAS', value: 6.8, suffix: 'x' },
      { label: 'CPA Reduction', value: -42, suffix: '%' },
      { label: 'Revenue Scale', value: '+312', suffix: '%' },
    ],
    refId: 'SYST_ADS-MGMT_v4',
  },
  'growth-systems': {
    id: 'growth-systems',
    title: 'AI Business Automation',
    description: 'The "Digital Brain" for your brand. Custom CRM automation and sales workflows.',
    outcome: 'Automated Profitability',
    icon: Layers,
    tags: ['Task/Workflow Automation', 'AI Business Integration'],
    detailedDescription: 'The "Digital Brain" for your brand. Custom CRM automation and sales workflows that work while you sleep. We build systems that capture, nurture, and convert leads automatically.',
    whatsIncluded: [
      'Custom CRM Setup (HubSpot/GHL)',
      'API Automation & Integrations',
      'Sales Workflow Engineering',
      'Lead Scoring & Nurturing',
      'Revenue Attribution Tracking',
    ],
    whyBetter: 'We don\'t just set up CRMs—we engineer revenue systems. Our automations are built to scale your business without scaling your team. Every workflow is optimized for conversion.',
    metrics: [
      { label: 'Automation Efficiency', value: '+78', suffix: '%' },
      { label: 'Lead Conversion', value: '+45', suffix: '%' },
      { label: 'Sales Cycle Reduction', value: -32, suffix: '%' },
    ],
    refId: 'SYST_REV-SYSTEMS_v4',
  },
};
