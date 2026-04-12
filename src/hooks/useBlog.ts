import { useState, useEffect } from 'react';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  tags: string[];
  readTime: string;
}

const DUMMY_POSTS: BlogPost[] = [
  {
    id: '1',
    title: '5 Ways AI is Transforming E-Commerce in 2026',
    excerpt: 'Artificial intelligence is no longer a future concept — it\'s the engine driving the most successful e-commerce brands today. From personalised product recommendations to automated customer service, here\'s how AI is reshaping the game.',
    content: `Artificial intelligence is no longer a future concept — it's the engine driving the most successful e-commerce brands today. The brands that are winning aren't the ones with the biggest budgets. They're the ones deploying the smartest systems.

## 1. Hyper-Personalised Product Recommendations

Gone are the days of "Customers also bought..." AI models now analyse browsing patterns, purchase history, time-of-day behaviour, and even social media activity to serve the exact product a customer is most likely to buy — before they even search for it.

Brands using AI recommendations see an average of **35% increase in average order value** compared to manual merchandising.

## 2. Predictive Inventory Management

AI algorithms can now predict demand surges weeks in advance by analysing weather, trending topics, competitor stock levels, and historical sales data. This means zero stockouts during peak periods and dramatically reduced overstock costs.

## 3. Dynamic Pricing Engines

Just like airlines, e-commerce brands are now using AI to adjust prices in real time based on demand, competitor pricing, and conversion probability. This alone can increase revenue by 8-12% without changing a single product.

## 4. Automated Customer Service (That Actually Works)

The new generation of AI chatbots powered by large language models can resolve 80% of customer queries without human intervention — with CSAT scores matching or exceeding human agents.

## 5. AI-Generated Ad Creative

Generative AI tools are now producing high-performing ad creative at a fraction of the traditional cost. Some brands are running 500+ ad variations simultaneously, with AI automatically scaling the winners.

---

The question isn't whether AI will transform your e-commerce business. It's whether you'll adopt it before your competitors do.

**Ready to deploy AI in your business?** [Book a free strategy call with our team.](#)`,
    author: 'Yawk Digital Team',
    date: '2026-03-05',
    category: 'AI & Automation',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&q=80&w=1200',
    tags: ['AI', 'E-Commerce', 'Automation', 'Growth'],
    readTime: '5 min read',
  },
  {
    id: '2',
    title: 'Why Your Shopify Store Is Leaving 40% of Revenue on the Table',
    excerpt: 'Most Shopify stores are set up once and never optimised. If your conversion rate is below 3%, your checkout is leaking money. Here are the exact fixes that take stores from average to high-performing.',
    content: `Most Shopify stores are set up once and never optimised. They're live, they look fine, and they get some sales. But "some sales" isn't a growth strategy — it's a slow leak.

If your store converts at less than 3%, you are actively leaving 40% or more of your potential revenue on the table. Here's why — and how to fix it.

## The Checkout Drop-Off Problem

The average Shopify checkout abandonment rate is **69.8%**. For every 10 people who add something to their cart, only 3 complete the purchase. The other 7 leave because of:

- Too many checkout steps
- Unexpected shipping costs
- No trust signals at payment
- Slow load times on mobile
- No urgency triggers

## Fix 1: One-Page Checkout + Shop Pay

Shopify's native one-page checkout combined with Shop Pay (which auto-fills for returning customers) reduces friction dramatically. Stores that switch see a **15-25% improvement** in checkout completion immediately.

## Fix 2: Dynamic Shipping Thresholds

Display a real-time progress bar: "Add $12 more for free shipping." This single element increases average order value by 18-22% consistently.

## Fix 3: Post-Purchase Upsells

The moment after purchase is when a customer's trust is highest. A well-designed post-purchase upsell (not a pop-up before checkout) converts at 10-15%. Most stores don't have one.

## Fix 4: Mobile-First Product Pages

60-70% of your traffic is on mobile. Yet most Shopify themes are designed desktop-first. Your product images should load in under 1.5 seconds on 4G. Your CTA button should be thumb-reachable. Your description should be scannable, not a wall of text.

## Fix 5: Social Proof Architecture

Reviews aren't enough. You need:
- Star rating visible above the fold
- Photo reviews from real customers
- "X people bought this today" counters
- Trust badges at the point of decision

---

These aren't complex changes. They're systematic optimisations that compound. A 1% conversion improvement on $100K/month revenue is an extra $1,000/month. On $1M/month, it's $10,000.

**Want us to audit your Shopify store?** Our team identifies exactly where you're losing revenue and builds the fixes.`,
    author: 'Yawk Digital Team',
    date: '2026-02-20',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200',
    tags: ['Shopify', 'Conversion Rate', 'E-Commerce', 'Web Dev'],
    readTime: '6 min read',
  },
  {
    id: '3',
    title: 'Meta Ads vs Google Ads in 2026: Where to Put Your Budget',
    excerpt: 'The eternal debate — Meta or Google? The honest answer is: it depends on your funnel stage. Here\'s a data-driven breakdown of where each platform wins, and how to split your budget for maximum ROI.',
    content: `The eternal debate — Meta or Google? Every marketing agency will tell you something different. Here's the honest, data-driven answer that we give our clients.

## The Core Difference Nobody Explains Clearly

**Google Ads** = Capturing existing demand  
**Meta Ads** = Creating new demand

Google catches people who are already searching for what you sell. Meta shows your product to people who didn't know they wanted it yet. Both are powerful. Both are essential at different stages.

## When to Prioritise Google Ads

Google wins when:
- You have **proven product-market fit** and people are actively searching for your solution
- Your **average order value** is above $100 (the economics work better)
- You're in **B2B** where decision-makers research on Google
- You want **purchase-intent traffic** — people ready to buy now

**What you'll pay:** CPCs range from $0.50 (low competition) to $15+ (high competition keywords). Average ROAS across e-commerce is 4-5x.

## When to Prioritise Meta Ads

Meta wins when:
- You have a **visually compelling product** that benefits from demonstration
- You want to **build brand awareness** at scale efficiently
- Your **customer avatar** is a clear demographic you can target
- You're launching something **new** where no search demand exists yet

**What you'll pay:** CPMs of $8-20 on average. Cost-per-purchase varies wildly — $5 for viral products, $80+ for high-consideration purchases.

## The Budget Split Framework We Use

**Early Stage (Under $5K/month):** 70% Meta, 30% Google  
→ Build awareness and test creative. Google retargeting only.

**Growth Stage ($5K-$30K/month):** 50/50  
→ Scale what's working. Add Google Shopping. Expand Meta to lookalikes.

**Scale Stage ($30K+/month):** 40% Meta, 40% Google, 20% YouTube  
→ Full-funnel dominance. Each platform handles a different stage.

## The Creative Factor

In 2026, the most important variable isn't your targeting. It's your creative. Brands that produce 20-30 ad variations per month and let the algorithm find winners consistently outperform those running 3-5 static ads.

---

The right answer for your business depends on your product, margins, and growth stage. That's why we audit before we spend.

**Book a free paid media audit** and we'll tell you exactly where your budget should go.`,
    author: 'Yawk Digital Team',
    date: '2026-02-08',
    category: 'Ads Management',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=1200',
    tags: ['Meta Ads', 'Google Ads', 'Paid Media', 'ROI'],
    readTime: '7 min read',
  },
];

const STORAGE_KEY = 'yawk_blog_posts';

export const useBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : DUMMY_POSTS;
    } catch {
      return DUMMY_POSTS;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  const addPost = (post: Omit<BlogPost, 'id'>) => {
    const newPost: BlogPost = {
      ...post,
      id: Date.now().toString(),
    };
    setPosts(prev => [newPost, ...prev]);
    return newPost;
  };

  const updatePost = (id: string, updates: Partial<BlogPost>) => {
    setPosts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  const getPost = (id: string) => posts.find(p => p.id === id);

  return { posts, addPost, updatePost, deletePost, getPost };
};
