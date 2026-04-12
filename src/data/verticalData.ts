import {
  Package2, Cloud, Code2, Brain, Shield, Zap,
  ShoppingBag, Sparkles, Heart, Home, Cpu, Coffee, Gift, PawPrint,
  Dumbbell, Leaf, User, Package, Wind, Star,
  Activity, Scale, DollarSign, GraduationCap, Briefcase, Building2, Palette, Wrench, Building,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface SubCategory {
  id: string;
  name: string;
  description: string;
  items: string[];
  Icon: LucideIcon;
  accentColor: string;
  bgGlow: string;
  image: string; // Unsplash image URL
}

export interface VerticalData {
  slug: string;
  title: string;
  tagline: string;
  metric: string;
  metricLabel: string;
  description: string;
  accentColor: string;
  subCategories: SubCategory[];
}

const UNS = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=80`;

export const VERTICALS_DATA: VerticalData[] = [
  // ─────────────────────────── SaaS & Tech ───────────────────────────
  {
    slug: 'saas-tech',
    title: 'SaaS & Tech',
    tagline: 'Engineering low-friction demos and automated product-led growth pipelines.',
    metric: '4.2x',
    metricLabel: 'LTV:CAC',
    description:
      'We turn complex software into compelling growth stories. From freemium signups to enterprise contracts, our systems compress sales cycles and maximise lifetime value.',
    accentColor: 'text-violet-400',
    subCategories: [
      {
        id: 'software-products',
        name: 'Software Products',
        description:
          'We drive product-led growth for SaaS tools — from freemium signups to enterprise demos, optimised at every stage of the funnel.',
        items: [
          'Project Management Tools',
          'CRM Platforms',
          'Marketing Automation Software',
          'Analytics & Data Platforms',
          'Collaboration Tools',
          'Accounting & Finance Software',
          'HR & Payroll Systems',
        ],
        Icon: Package2,
        accentColor: 'text-violet-400',
        bgGlow: 'bg-violet-500/10',
        image: UNS('1551288049-bebda4e38f71'),
      },
      {
        id: 'cloud-services',
        name: 'Cloud Services',
        description:
          'Position your cloud infrastructure competitively. We craft narratives that resonate with CIOs and DevOps teams making high-stakes buying decisions.',
        items: [
          'Cloud Storage Solutions',
          'Infrastructure as a Service (IaaS)',
          'Platform as a Service (PaaS)',
          'Backup & Disaster Recovery',
        ],
        Icon: Cloud,
        accentColor: 'text-blue-400',
        bgGlow: 'bg-blue-500/10',
        image: UNS('1558494949-5a7d73c9b0d8'),
      },
      {
        id: 'development-tools',
        name: 'Development Tools',
        description:
          'Reach developers authentically. From technical content to community-led growth, we meet devs where they live and convert with precision.',
        items: [
          'Code Editors & IDEs',
          'Version Control Systems',
          'CI/CD Platforms',
          'API Management Tools',
          'Testing & QA Software',
        ],
        Icon: Code2,
        accentColor: 'text-cyan-400',
        bgGlow: 'bg-cyan-500/10',
        image: UNS('1461749280684-dccba630e2f6'),
      },
      {
        id: 'ai-machine-learning',
        name: 'AI & Machine Learning',
        description:
          'We translate complex AI capabilities into compelling business value propositions that drive enterprise pilots and paid conversions at scale.',
        items: [
          'AI-Powered Analytics',
          'Chatbot Platforms',
          'Predictive Analytics Tools',
          'Computer Vision Solutions',
        ],
        Icon: Brain,
        accentColor: 'text-purple-400',
        bgGlow: 'bg-purple-500/10',
        image: UNS('1620712943543-bcc4688e7485'),
      },
      {
        id: 'cybersecurity',
        name: 'Cybersecurity',
        description:
          'In a trust-driven market, we build authority through educational content, compliance narratives, and targeted campaigns for security buyers.',
        items: [
          'Security Software',
          'VPN Services',
          'Identity Management',
          'Threat Detection Systems',
        ],
        Icon: Shield,
        accentColor: 'text-red-400',
        bgGlow: 'bg-red-500/10',
        image: UNS('1614064641938-3bbee52942c7'),
      },
      {
        id: 'productivity-apps',
        name: 'Productivity Apps',
        description:
          'We engineer viral adoption loops and reduce churn for productivity tools — driving daily actives and organic word-of-mouth at scale.',
        items: [
          'Task Management',
          'Time Tracking',
          'Note-Taking Apps',
          'Document Management',
        ],
        Icon: Zap,
        accentColor: 'text-amber-400',
        bgGlow: 'bg-amber-500/10',
        image: UNS('1484480974693-6ca0a78fb36b'),
      },
    ],
  },

  // ─────────────────────────── Ecommerce Brands ───────────────────────────
  {
    slug: 'ecommerce',
    title: 'Ecommerce Brands',
    tagline: 'Scaling high-volume retail through AOV engineering and retention loops.',
    metric: '5.4x',
    metricLabel: 'Average ROI',
    description:
      'We engineer high-volume retail growth through AOV optimisation, strategic retention loops, and multi-channel attribution. Our systems transform one-time buyers into lifetime customers.',
    accentColor: 'text-rose-400',
    subCategories: [
      {
        id: 'fashion-apparel',
        name: 'Fashion & Apparel',
        description:
          'We build fashion brands that dominate social feeds and search results — from first click to loyal repeat buyer, every touchpoint is engineered to convert.',
        items: [
          'Clothing Brands',
          'Footwear',
          'Accessories & Jewelry',
          'Activewear & Sportswear',
          'Sustainable Fashion',
          'Luxury Fashion',
        ],
        Icon: ShoppingBag,
        accentColor: 'text-rose-400',
        bgGlow: 'bg-rose-500/10',
        image: UNS('1441984904996-e0b6ba687e04'),
      },
      {
        id: 'beauty-cosmetics',
        name: 'Beauty & Cosmetics',
        description:
          'Beauty is visual and trust-driven. We craft content strategies and paid campaigns that make your products irresistible across every platform.',
        items: [
          'Skincare Products',
          'Makeup & Cosmetics',
          'Haircare',
          'Fragrance',
          'Beauty Tools & Devices',
          'Organic/Natural Beauty',
        ],
        Icon: Sparkles,
        accentColor: 'text-pink-400',
        bgGlow: 'bg-pink-500/10',
        image: UNS('1596462502278-27bfdc403348'),
      },
      {
        id: 'health-wellness',
        name: 'Health & Wellness',
        description:
          'We turn health products into trusted brands through educational content, influencer partnerships, and compliance-friendly advertising that converts.',
        items: [
          'Supplements & Vitamins',
          'Organic Products',
          'Herbal Remedies',
          'Fitness Equipment',
          'Yoga & Meditation Products',
        ],
        Icon: Heart,
        accentColor: 'text-emerald-400',
        bgGlow: 'bg-emerald-500/10',
        image: UNS('1512621776951-a57141f2eefd'),
      },
      {
        id: 'home-living',
        name: 'Home & Living',
        description:
          'We help home brands capture buyers in the discovery-to-purchase window — dominating Pinterest, Google Shopping, and retargeting funnels.',
        items: [
          'Furniture & Decor',
          'Kitchen & Dining',
          'Bedding & Bath',
          'Smart Home Devices',
          'Gardening Supplies',
        ],
        Icon: Home,
        accentColor: 'text-amber-400',
        bgGlow: 'bg-amber-500/10',
        image: UNS('1556909114-f6e7ad7d3136'),
      },
      {
        id: 'electronics-gadgets',
        name: 'Electronics & Gadgets',
        description:
          'Tech-savvy buyers research heavily before buying. We position your products at every comparison checkpoint to win the sale before competitors do.',
        items: [
          'Consumer Electronics',
          'Mobile Accessories',
          'Wearable Technology',
          'Gaming Accessories',
          'Audio Equipment',
        ],
        Icon: Cpu,
        accentColor: 'text-blue-400',
        bgGlow: 'bg-blue-500/10',
        image: UNS('1468495244123-6c6c332eeece'),
      },
      {
        id: 'food-beverage',
        name: 'Food & Beverage',
        description:
          'We build craveable food brands with storytelling, sampling campaigns, and subscription funnels that turn first-time buyers into passionate advocates.',
        items: [
          'Specialty Foods',
          'Coffee & Tea',
          'Snacks & Confectionery',
          'Organic & Natural Foods',
          'Meal Kits & Subscriptions',
        ],
        Icon: Coffee,
        accentColor: 'text-orange-400',
        bgGlow: 'bg-orange-500/10',
        image: UNS('1504674900247-0877df9cc836'),
      },
      {
        id: 'baby-kids',
        name: 'Baby & Kids',
        description:
          'Parents demand trust above all else. We build credibility-first marketing strategies that make your baby and kids brand the safe, obvious choice.',
        items: [
          'Baby Products',
          'Toys & Games',
          'Kids Fashion',
          'Educational Products',
          'Nursery Essentials',
        ],
        Icon: Gift,
        accentColor: 'text-yellow-400',
        bgGlow: 'bg-yellow-500/10',
        image: UNS('1515488042361-ee00e0ddd4e4'),
      },
      {
        id: 'pet-products',
        name: 'Pet Products',
        description:
          'Pet owners are passionate and loyal customers. We tap into that emotional connection to build brands that pet parents love and recommend obsessively.',
        items: [
          'Pet Food & Treats',
          'Pet Accessories',
          'Pet Care Products',
          'Pet Toys',
        ],
        Icon: PawPrint,
        accentColor: 'text-teal-400',
        bgGlow: 'bg-teal-500/10',
        image: UNS('1587300003388-59208cc962cb'),
      },
    ],
  },

  // ─────────────────────────── D2C Brands ───────────────────────────
  {
    slug: 'd2c',
    title: 'D2C Brands',
    tagline: 'Scaling lifestyle and wellness brands from search to social dominance.',
    metric: '8.4x',
    metricLabel: 'Average ROAS',
    description:
      'We scale direct-to-consumer brands with content-driven SEO, influencer partnerships, and performance marketing that builds sustainable compounding growth.',
    accentColor: 'text-emerald-400',
    subCategories: [
      {
        id: 'wellness-self-care',
        name: 'Wellness & Self-Care',
        description:
          'The wellness market is booming and crowded. We help your brand cut through the noise with authentic storytelling and high-intent search strategies.',
        items: [
          'Mental Health Apps',
          'Meditation & Mindfulness',
          'Sleep Solutions',
          'Stress Management Products',
          'Personal Development Tools',
        ],
        Icon: Heart,
        accentColor: 'text-emerald-400',
        bgGlow: 'bg-emerald-500/10',
        image: UNS('1544367567-0f2fcb009e0b'),
      },
      {
        id: 'fitness-nutrition',
        name: 'Fitness & Nutrition',
        description:
          'Results-driven buyers need proof. We build trust through transformation content, athlete partnerships, and scientific marketing that converts skeptics.',
        items: [
          'Protein & Supplements',
          'Meal Replacement Products',
          'Fitness Programs & Apps',
          'Workout Equipment',
          'Nutrition Coaching',
        ],
        Icon: Dumbbell,
        accentColor: 'text-orange-400',
        bgGlow: 'bg-orange-500/10',
        image: UNS('1571019613454-1cb2f99b2d8b'),
      },
      {
        id: 'sustainable-living',
        name: 'Sustainable Living',
        description:
          'Eco-conscious consumers choose brands aligned with their values. We tell your sustainability story in a way that drives action, not just awareness.',
        items: [
          'Eco-Friendly Products',
          'Zero-Waste Solutions',
          'Sustainable Fashion',
          'Green Home Products',
          'Renewable Energy Products',
        ],
        Icon: Leaf,
        accentColor: 'text-green-400',
        bgGlow: 'bg-green-500/10',
        image: UNS('1542601906990-b4d3fb778b09'),
      },
      {
        id: 'personal-care',
        name: 'Personal Care',
        description:
          'Personal care is intimate and habitual. We drive trial, build routines, and create switching costs through hyper-personalised marketing that sticks.',
        items: [
          'Oral Care',
          'Grooming Products',
          'Personal Hygiene',
          'Intimate Care',
          'Natural Deodorants',
        ],
        Icon: User,
        accentColor: 'text-blue-400',
        bgGlow: 'bg-blue-500/10',
        image: UNS('1556228720-195a672e8a03'),
      },
      {
        id: 'subscription-boxes',
        name: 'Subscription Boxes',
        description:
          'Subscription models live and die on unboxing experiences and churn prevention. We engineer retention funnels that keep subscribers hooked month after month.',
        items: [
          'Beauty Boxes',
          'Snack Boxes',
          'Wellness Boxes',
          'Lifestyle Curations',
          'Hobby & Craft Boxes',
        ],
        Icon: Package,
        accentColor: 'text-purple-400',
        bgGlow: 'bg-purple-500/10',
        image: UNS('1607082348824-0a96f2a4b9da'),
      },
      {
        id: 'specialty-beverages',
        name: 'Specialty Beverages',
        description:
          'Premium drinks sell on lifestyle and ritual. We build community-driven brands and performance campaigns that make your beverage part of their daily identity.',
        items: [
          'Premium Coffee',
          'Craft Tea',
          'Functional Drinks',
          'Protein Shakes',
          'Energy Drinks',
        ],
        Icon: Coffee,
        accentColor: 'text-amber-400',
        bgGlow: 'bg-amber-500/10',
        image: UNS('1509042239860-f550ce710b93'),
      },
      {
        id: 'home-wellness',
        name: 'Home Wellness',
        description:
          'The "home as sanctuary" trend is accelerating. We capture buyers seeking healthier home environments through targeted content and product-led funnels.',
        items: [
          'Air Purifiers',
          'Water Filters',
          'Aromatherapy',
          'Light Therapy',
          'Ergonomic Products',
        ],
        Icon: Wind,
        accentColor: 'text-cyan-400',
        bgGlow: 'bg-cyan-500/10',
        image: UNS('1586023492125-27b2c045efd7'),
      },
      {
        id: 'mens-womens-lifestyle',
        name: "Men's & Women's Lifestyle",
        description:
          "Lifestyle brands win on identity and aspiration. We craft brand narratives and paid strategies that speak directly to your ideal customer's self-image.",
        items: [
          'Grooming & Skincare',
          'Fashion Accessories',
          'Lifestyle Gadgets',
          'Premium Essentials',
        ],
        Icon: Star,
        accentColor: 'text-rose-400',
        bgGlow: 'bg-rose-500/10',
        image: UNS('1469334031218-e382a71b716b'),
      },
    ],
  },

  // ─────────────────────────── Professional Services ───────────────────────────
  {
    slug: 'professional-services',
    title: 'Professional Services',
    tagline: 'Authority-based marketing for consultants and enterprise firms.',
    metric: '60%',
    metricLabel: 'More Bookings',
    description:
      'Expertise must be visible to be valuable. We build authority-first digital presences that generate high-quality leads and position you as the undeniable category leader.',
    accentColor: 'text-blue-400',
    subCategories: [
      {
        id: 'healthcare-services',
        name: 'Healthcare Services',
        description:
          'Healthcare marketing requires compliance, trust, and precision. We help clinics and medical practices attract the right patients through HIPAA-conscious digital strategies.',
        items: [
          'Medical Clinics',
          'Dental Practices',
          'Dermatology Clinics',
          'Physiotherapy Centers',
          'Mental Health Practices',
          'Alternative Medicine',
          'Veterinary Clinics',
          'Telemedicine Platforms',
        ],
        Icon: Activity,
        accentColor: 'text-red-400',
        bgGlow: 'bg-red-500/10',
        image: UNS('1559757148-5c350d0d3c56'),
      },
      {
        id: 'legal-services',
        name: 'Legal Services',
        description:
          'Legal clients search with high intent and high anxiety. We position law firms as trusted authorities that prospects turn to first when they need help most.',
        items: [
          'Law Firms',
          'Legal Consultancies',
          'Immigration Services',
          'Intellectual Property',
          'Corporate Law',
          'Family Law Practices',
        ],
        Icon: Scale,
        accentColor: 'text-indigo-400',
        bgGlow: 'bg-indigo-500/10',
        image: UNS('1589829545856-d10d557cf95f'),
      },
      {
        id: 'financial-services',
        name: 'Financial Services',
        description:
          'Trust is the currency of financial services. We build credibility-first marketing systems that attract high-net-worth clients and institutional prospects.',
        items: [
          'Accounting Firms',
          'Tax Consultancies',
          'Financial Advisory',
          'Wealth Management',
          'Investment Firms',
          'Insurance Agencies',
          'Mortgage Brokers',
        ],
        Icon: DollarSign,
        accentColor: 'text-emerald-400',
        bgGlow: 'bg-emerald-500/10',
        image: UNS('1554224155-6726b3ff858f'),
      },
      {
        id: 'education-training',
        name: 'Education & Training',
        description:
          'The EdTech space demands proof of transformation. We build enrollment funnels and content ecosystems that demonstrate ROI and drive course signups at scale.',
        items: [
          'Online Courses',
          'Tutoring Services',
          'Professional Certifications',
          'Language Schools',
          'Skill Development Programs',
          'Corporate Training',
          'Test Preparation',
        ],
        Icon: GraduationCap,
        accentColor: 'text-blue-400',
        bgGlow: 'bg-blue-500/10',
        image: UNS('1524178232363-1fb2b075b655'),
      },
      {
        id: 'consulting-services',
        name: 'Consulting Services',
        description:
          'Consultants win on reputation and relationships. We engineer thought leadership strategies and lead generation systems that turn expertise into predictable revenue.',
        items: [
          'Business Consulting',
          'IT Consulting',
          'Marketing Agencies',
          'HR Consulting',
          'Management Consulting',
          'Strategy Consulting',
          'Digital Transformation',
        ],
        Icon: Briefcase,
        accentColor: 'text-violet-400',
        bgGlow: 'bg-violet-500/10',
        image: UNS('1552664730-d307ca884978'),
      },
      {
        id: 'real-estate',
        name: 'Real Estate',
        description:
          'Real estate buyers and investors research extensively before committing. We build digital dominance strategies that capture intent at every stage of the property journey.',
        items: [
          'Real Estate Agencies',
          'Property Management',
          'Commercial Real Estate',
          'Real Estate Investment',
          'Architectural Services',
        ],
        Icon: Building2,
        accentColor: 'text-amber-400',
        bgGlow: 'bg-amber-500/10',
        image: UNS('1560518883-ce09059eeffa'),
      },
      {
        id: 'creative-services',
        name: 'Creative Services',
        description:
          'Creative agencies need portfolios that convert. We build showcase-first websites and content strategies that attract dream clients and justify premium pricing.',
        items: [
          'Design Agencies',
          'Photography Studios',
          'Video Production',
          'Branding Agencies',
          'Content Creation',
          'Animation Studios',
        ],
        Icon: Palette,
        accentColor: 'text-pink-400',
        bgGlow: 'bg-pink-500/10',
        image: UNS('1558655146-9f40138edfeb'),
      },
      {
        id: 'home-services',
        name: 'Home Services',
        description:
          'Home service businesses win on local trust and fast response. We deploy hyper-local SEO, Google LSA campaigns, and review-generation systems that dominate your market.',
        items: [
          'Renovation & Remodeling',
          'Interior Design',
          'Landscaping',
          'Cleaning Services',
          'Pest Control',
          'HVAC Services',
        ],
        Icon: Wrench,
        accentColor: 'text-orange-400',
        bgGlow: 'bg-orange-500/10',
        image: UNS('1503387762-592deb58ef4e'),
      },
      {
        id: 'b2b-services',
        name: 'B2B Services',
        description:
          'B2B sales cycles are long and relationship-driven. We build account-based marketing systems and content pipelines that shorten cycles and increase deal velocity.',
        items: [
          'Software Development',
          'Managed IT Services',
          'Cloud Solutions',
          'Enterprise Software',
          'Business Intelligence',
          'Data Analytics',
        ],
        Icon: Building,
        accentColor: 'text-cyan-400',
        bgGlow: 'bg-cyan-500/10',
        image: UNS('1497366216548-37526070297c'),
      },
    ],
  },
];

export const getVerticalBySlug = (slug: string): VerticalData | undefined =>
  VERTICALS_DATA.find(v => v.slug === slug);

export const getSubCategoryById = (verticalSlug: string, categoryId: string) => {
  const vertical = getVerticalBySlug(verticalSlug);
  return vertical?.subCategories.find(c => c.id === categoryId);
};
