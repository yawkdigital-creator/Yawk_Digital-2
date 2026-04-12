import { Code2, Palette, TrendingUp, Layers, Smartphone, Search, Video, ShoppingCart } from 'lucide-react';
import { Service, Metric, Testimonial, CaseStudy } from '@/types';

export const SERVICES: Service[] = [
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'High-performance, conversion-first digital architectures. Blazing fast, SEO-optimized Next.js engines.',
    outcome: 'High-Performance Digital Hubs',
    icon: Code2,
    tags: ['WordPress', 'Shopify', 'React', 'Node.js'],
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    description: 'Premium visual assets designed for emotional resonance. From high-converting ad creative to sophisticated 3D product renders.',
    outcome: 'Billion-Dollar Aesthetic',
    icon: Palette,
    tags: ['Branding', 'Content Strategy', 'Social Media Content'],
  },
  {
    id: 'ads-mgmt',
    title: 'Ads Management',
    description: 'Capital velocity through ROI engineering. We deploy aggressive scaling systems across Meta, Google, and TikTok.',
    outcome: 'Predictable Revenue Scale',
    icon: TrendingUp,
    tags: ['Meta Ads', 'Media Buying', 'TikTok Ads', 'Google Ads', 'LinkedIn Ads'],
  },
  {
    id: 'growth-systems',
    title: 'AI Business Automation',
    description: 'The "Digital Brain" for your brand. Custom CRM automation and sales workflows.',
    outcome: 'Automated Profitability',
    icon: Layers,
    tags: ['Task/Workflow Automation', 'AI Business Integration'],
  },
  {
    id: 'app-dev',
    title: 'App Development',
    description: 'Powerful, user-first mobile apps for iOS and Android. Built with Flutter for lightning-fast cross-platform performance.',
    outcome: 'High-Impact Mobile Products',
    icon: Smartphone,
    tags: ['Flutter', 'iOS App', 'Android App', 'Cross-Platform App', 'UI/UX for Mobile'],
  },
  {
    id: 'seo-aeo',
    title: 'SEO / AEO',
    description: 'Dominate search and AI-powered answer engines. We engineer visibility that compounds month over month.',
    outcome: 'Sustainable Organic Growth',
    icon: Search,
    tags: ['On-Page SEO', 'Technical SEO', 'Local SEO', 'AI Engine Optimization', 'Keyword Research', 'Link Building'],
  },
  {
    id: 'video-editing',
    title: 'Video Editing',
    description: 'Scroll-stopping video content crafted for YouTube, Reels, and TikTok. Motion graphics, color grading, and captions included.',
    outcome: 'Viral-Ready Content',
    icon: Video,
    tags: ['YouTube Videos', 'Reels / TikTok', 'Product Videos', 'Motion Graphics', 'Color Grading', 'Subtitles & Captions'],
  },
  {
    id: 'shop-management',
    title: 'Shop Management',
    description: 'End-to-end marketplace management for Amazon, TikTok Shop, eBay, and Daraz. Product listings, inventory, and growth.',
    outcome: 'Marketplace Dominance',
    icon: ShoppingCart,
    tags: ['Amazon Store', 'TikTok Shop', 'eBay Store', 'Daraz Store', 'Product Listing', 'Inventory Management'],
  },
];

export const HERO_METRICS: Metric[] = [
  { label: 'Market Cap Impact', value: 2.4, suffix: 'B+', prefix: '$' },
  { label: 'Monthly Ad Spend', value: 25, suffix: 'M+', prefix: '$' },
  { label: 'Avg. Revenue Lift', value: 142, suffix: '%' },
  { label: 'Partner Retention', value: 98, suffix: '%' },
];

export const NAVIGATION_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Insights', href: '#insights' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Marcus Thorne',
    role: 'CEO',
    company: 'Elevate Group',
    content: 'Yawk Digital transformed our brand from "just another vendor" to an industry leader. Their design-first approach combined with data-driven strategy delivered results we never thought possible.',
    avatar: 'https://i.pravatar.cc/150?u=marcus',
    rating: 5,
  },
  {
    id: '2',
    name: 'Sarah Chen',
    role: 'Founder',
    company: 'Lumina Skin',
    content: 'The level of creative mastery and conversion engineering here is unmatched. They built a system that works while we sleep. Our revenue increased by 240% in just 6 months.',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    rating: 5,
  },
  {
    id: '3',
    name: 'David Rodriguez',
    role: 'CMO',
    company: 'TechFlow Solutions',
    content: 'Working with Yawk Digital was a game-changer. Their attention to detail and strategic thinking helped us scale from $500K to $2.5M in monthly revenue. Highly recommend!',
    avatar: 'https://i.pravatar.cc/150?u=david',
    rating: 5,
  },
  {
    id: '4',
    name: 'Emily Watson',
    role: 'VP Marketing',
    company: 'Growth Dynamics',
    content: 'Best investment we made. The team understands both the creative and technical sides of marketing. Our conversion rates improved by 180% and customer acquisition cost dropped by 45%.',
    avatar: 'https://i.pravatar.cc/150?u=emily',
    rating: 5,
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'apex-fintech',
    client: 'Apex Fintech',
    industry: 'Financial Services',
    challenge: 'Dated visual identity, high cost-per-acquisition (CPA), and zero-conversion website that felt like a brochure from 1998.',
    solution: 'Full visual rebranding paired with conversion-optimized Next.js web architecture and targeted paid search dominance campaign.',
    serviceUsed: 'Branding + Web Dev + Ads',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=90&w=1600&h=900',
    results: [
      { label: 'Revenue Growth', value: 312, suffix: '%' },
      { label: 'CPA Reduction', value: 45, suffix: '%' },
      { label: 'ROAS', value: 8.4, suffix: 'x' },
      { label: 'Conversion Rate', value: 4.8, suffix: '%' },
    ],
  },
  {
    id: 'lumina-wellness',
    client: 'Lumina Wellness',
    industry: 'Consumer Goods',
    challenge: 'Ad fatigue was killing their margins, and their Shopify store had a bounce rate of over 65% on product pages.',
    solution: 'Engineered a "Content Engine" for high-velocity social ads and redesigned the e-commerce UX using high-end 3D graphics and social proof triggers.',
    serviceUsed: 'Graphic Design + Social + Web Dev',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1200',
    results: [
      { label: 'Revenue Lift', value: 240, suffix: '%' },
      { label: 'Retention Rate', value: 52, suffix: '%' },
      { label: 'Conversion Rate', value: 4.8, suffix: '%' },
      { label: 'Bounce Rate', value: 65, suffix: '%', prefix: '-' },
    ],
  },
  {
    id: 'techflow-solutions',
    client: 'TechFlow Solutions',
    industry: 'SaaS',
    challenge: 'Struggling with low trial-to-paid conversion rates and high customer acquisition costs in a competitive market.',
    solution: 'Implemented product-led growth strategy with optimized onboarding flows, automated email sequences, and targeted LinkedIn advertising campaigns.',
    serviceUsed: 'Revenue Systems + Ads + Web Dev',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    results: [
      { label: 'Monthly Revenue', value: 2.5, suffix: 'M+', prefix: '$' },
      { label: 'Trial Conversion', value: 28, suffix: '%' },
      { label: 'CAC Reduction', value: 42, suffix: '%' },
      { label: 'LTV Increase', value: 65, suffix: '%' },
    ],
  },
];
