import React from 'react';
import { Bot } from 'lucide-react';
import { ServiceGigPage, ServiceGigPageProps } from '@/components/templates/ServiceGigPage';

const data: ServiceGigPageProps = {
  serviceName: 'AI Business Automation',
  tagline: 'I will automate your business operations with AI so your team focuses only on what humans do best',
  icon: <Bot className="w-6 h-6 text-red-500" />,
  tags: ['Task / Workflow Automation', 'AI Business Integration'],
  heroImage: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&h=675&fit=crop',
  galleryImages: [
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=675&fit=crop',
    'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=1200&h=675&fit=crop',
    'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1200&h=675&fit=crop',
  ],
  about:
    'We eliminate the manual, repetitive work that drains your team\'s time and kills productivity. Using tools like n8n, Make, Zapier, OpenAI, and custom-built AI agents, we design and deploy automation systems that handle lead qualification, CRM updates, reporting, customer support, invoicing, and more — 24/7 without error. Businesses we automate reclaim 20–40 hours per week on average within the first month.',
  packages: [
    {
      name: 'Basic',
      label: 'Starter',
      price: 349,
      originalPrice: 499,
      delivery: '10 Days',
      revisions: '2',
      description: 'One end-to-end automation workflow designed, built, and deployed for your business.',
      features: [
        '1 custom automation workflow',
        'Up to 5 connected apps / triggers',
        'n8n, Make, or Zapier setup',
        'Testing & documentation',
        '2-week post-deployment support',
      ],
    },
    {
      name: 'Standard',
      label: 'Growth',
      price: 699,
      originalPrice: 999,
      delivery: '20 Days',
      revisions: '3',
      description: '3 automation workflows across your core business operations.',
      features: [
        '3 custom workflows',
        'CRM & lead pipeline automation',
        'Email / Slack / Notion integrations',
        'AI-powered data processing',
        'Workflow monitoring dashboard',
        '1-month post-deployment support',
      ],
    },
    {
      name: 'Premium',
      label: 'Enterprise',
      price: 1749,
      originalPrice: 2499,
      delivery: '30 Days',
      revisions: 'Unlimited',
      description: 'Full business automation suite — every repetitive operation in your company, automated.',
      features: [
        'Unlimited workflows',
        'Custom AI agent development',
        'OpenAI / LLM integration',
        'Full CRM + sales pipeline automation',
        'Customer support bot',
        'Analytics & reporting automation',
        '3-month dedicated support',
      ],
    },
  ],
  subServices: [
    {
      id: 'workflow-automation',
      name: 'Task & Workflow Automation',
      description: 'Map and automate your repetitive business processes — from lead capture to invoice generation to team notifications.',
      detailDescription: 'If your team repeats the same task more than three times a day, it\'s a candidate for automation. We map your operations, identify the highest-impact bottlenecks, and build multi-step workflows using n8n, Make, or Zapier that run 24/7 without human error. Most clients reclaim 20+ hours per week within the first month.',
      image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&h=500&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&h=500&fit=crop',
        'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=500&fit=crop',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
      ],
      badge: 'Most Popular',
      deliveryDays: 10,
      startingPrice: 349,
      subOptionKey: 'Task/Workflow Automation',
      features: ['Multi-step workflow design', 'App integrations (CRM, email, Slack)', 'Error handling & monitoring'],
    },
    {
      id: 'ai-integration',
      name: 'AI Business Integration',
      description: 'Embed GPT-powered AI into your existing tools — customer support bots, document processors, lead scorers, and more.',
      detailDescription: 'AI isn\'t a feature — it\'s a competitive advantage, if it\'s implemented properly. We embed GPT-powered tools directly into your existing systems: support bots that resolve tickets instantly, document processors that extract data automatically, and lead scorers that prioritise your pipeline. Your team gets the results of AI without needing to learn prompt engineering.',
      image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=500&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=500&fit=crop',
        'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=500&fit=crop',
        'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&h=500&fit=crop',
      ],
      badge: 'Hot',
      deliveryDays: 14,
      startingPrice: 599,
      subOptionKey: 'AI Business Integration',
      features: ['Custom GPT agent setup', 'Data parsing & AI responses', 'Integration with your existing stack'],
    },
  ],
  faqs: [
    { q: 'What tools do you use for automation?', a: 'We primarily use n8n (self-hosted), Make (Integromat), and Zapier for no-code automation. For AI features, we integrate OpenAI GPT-4, Claude, and custom fine-tuned models.' },
    { q: 'Do I need technical knowledge to use the automations?', a: 'No. We build everything and hand it over with clear documentation and a recorded walkthrough. You just need to know what the automation does, not how.' },
    { q: 'What if a workflow breaks after delivery?', a: 'We include post-deployment support in every package. If a workflow fails due to our implementation, we fix it at no charge within the support window.' },
    { q: 'Can you automate my specific tool stack?', a: 'Most likely yes. We support 500+ apps including Salesforce, HubSpot, Notion, Airtable, Gmail, Slack, Shopify, WooCommerce, and custom APIs.' },
    { q: 'How do I know if my business is ready for automation?', a: 'If your team does the same task more than 3 times per day, it\'s a candidate for automation. We offer a free workflow audit call before you commit.' },
  ],
  reviewCount: 143,
  totalOrders: '250+',
};

export const AIBusinessAutomationPage: React.FC = () => <ServiceGigPage {...data} serviceSlug="ai-business-automation" />;
