import React from 'react';
import { Search, Zap, TrendingUp, ShoppingBag, Globe, Database } from 'lucide-react';

export interface VerticalDetail {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  primaryMetric: {
    value: string;
    label: string;
  };
  metrics: {
    label: string;
    value: string;
  }[];
  features: {
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
}

export const VERTICAL_DETAILS: Record<string, VerticalDetail> = {
  'saas-tech': {
    id: 'saas-tech',
    title: 'SaaS & Tech',
    subtitle: 'Revenue Architecture.',
    description: 'Our SaaS protocol focuses on optimizing the entire customer journey from "Curiosity to Churn-Proof." We implement technical SEO alongside high-intent search ads and automated demo scheduling to compress the sales cycle by up to 40%.',
    primaryMetric: {
      value: '4.2x',
      label: 'LTV:CAC'
    },
    metrics: [
      { label: 'AVG. CAC REDUCTION', value: '32%' },
      { label: 'TRIAL-TO-PAID RATE', value: '18%' },
      { label: 'PLATFORM RETENTION', value: '94%' }
    ],
    features: [
      {
        title: 'INTENT ENGINES',
        description: 'Capturing users at the precise moment of software evaluation.',
        icon: Search
      },
      {
        title: 'DEMO AUTOMATION',
        description: 'Removing human friction from the scheduling and sales process.',
        icon: Zap
      },
      {
        title: 'PRODUCT-LED OPS',
        description: 'Using product usage data to trigger contextual upsell emails.',
        icon: TrendingUp
      }
    ]
  },
  'ecommerce': {
    id: 'ecommerce',
    title: 'Ecommerce Brands',
    subtitle: 'Revenue Architecture.',
    description: 'We engineer high-volume retail growth through advanced AOV optimization, strategic retention loops, and multi-channel attribution. Our systems transform one-time buyers into lifetime customers.',
    primaryMetric: {
      value: '5.4x',
      label: 'Average ROI'
    },
    metrics: [
      { label: 'AOV INCREASE', value: '28%' },
      { label: 'RETENTION RATE', value: '42%' },
      { label: 'CUSTOMER LTV', value: '+156%' }
    ],
    features: [
      {
        title: 'AOV ENGINEERING',
        description: 'Strategic bundling and upsell systems that maximize transaction value.',
        icon: ShoppingBag
      },
      {
        title: 'RETENTION LOOPS',
        description: 'Automated re-engagement campaigns that turn buyers into repeat customers.',
        icon: TrendingUp
      },
      {
        title: 'MULTI-CHANNEL ATTRIBUTION',
        description: 'Precise tracking across all touchpoints to optimize ad spend efficiency.',
        icon: Database
      }
    ]
  },
  'd2c': {
    id: 'd2c',
    title: 'D2C Brands',
    subtitle: 'Revenue Architecture.',
    description: 'We scale lifestyle and wellness brands from search to social dominance. Our approach combines content-driven SEO, influencer partnerships, and performance marketing to build sustainable growth.',
    primaryMetric: {
      value: '8.4x',
      label: 'Average ROAS'
    },
    metrics: [
      { label: 'ORGANIC TRAFFIC GROWTH', value: '+240%' },
      { label: 'SOCIAL CONVERSION RATE', value: '6.8%' },
      { label: 'INFLUENCER ROI', value: '12.5x' }
    ],
    features: [
      {
        title: 'CONTENT-DRIVEN SEO',
        description: 'Authority-building content that ranks and converts across search engines.',
        icon: Search
      },
      {
        title: 'INFLUENCER PARTNERSHIPS',
        description: 'Strategic creator relationships that drive authentic brand awareness.',
        icon: TrendingUp
      },
      {
        title: 'PERFORMANCE MARKETING',
        description: 'Data-driven campaigns across Meta, TikTok, and Google that scale profitably.',
        icon: Zap
      }
    ]
  },
  'professional-services': {
    id: 'professional-services',
    title: 'Professional Services',
    subtitle: 'Revenue Architecture.',
    description: 'Authority-based marketing for consultants and enterprise firms. We build thought leadership, optimize lead generation, and create systems that turn expertise into predictable revenue.',
    primaryMetric: {
      value: '60%',
      label: 'More Bookings'
    },
    metrics: [
      { label: 'LEAD QUALITY SCORE', value: '+85%' },
      { label: 'CLIENT ACQUISITION COST', value: '-45%' },
      { label: 'AUTHORITY DOMAIN RATING', value: '+32' }
    ],
    features: [
      {
        title: 'THOUGHT LEADERSHIP',
        description: 'Content strategies that establish you as the go-to expert in your field.',
        icon: Globe
      },
      {
        title: 'LEAD GENERATION SYSTEMS',
        description: 'Automated funnels that attract and qualify high-value prospects.',
        icon: Zap
      },
      {
        title: 'AUTHORITY BUILDING',
        description: 'SEO and PR strategies that elevate your brand above competitors.',
        icon: TrendingUp
      }
    ]
  }
};
