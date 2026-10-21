import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    q: 'How much does working with Yawk Digital cost?',
    a: 'Pricing depends on the services and scope you pick. Book a free strategy call and we will give you a clear quote, with no hidden fees. [Add your starting price or package range here.]',
  },
  {
    q: 'Do you use AI to create the content?',
    a: 'We use AI as a tool to speed up research and drafts, but every piece is reviewed and shaped by our team before it reaches you. [Adjust this to match your actual process.]',
  },
  {
    q: 'What services do you offer?',
    a: 'Web development, SEO and AEO, performance ads, shop management, AI business automation, app development, graphic design, and video editing. Take a look at the services page for the full list.',
  },
  {
    q: 'Can I combine multiple services?',
    a: 'Yes. Most clients start with one service and add more as they grow. We will map out how the pieces fit together on your strategy call.',
  },
  {
    q: 'Is there a contract?',
    a: '[Add your contract terms here, for example: monthly rolling agreement with 30 days notice, or minimum commitment of X months.]',
  },
  {
    q: 'What if I am not happy with the work?',
    a: 'We include a revision round in every project so the result matches what you asked for. [Add your guarantee or refund wording here.]',
  },
  {
    q: 'How do I get started, and how fast will I see results?',
    a: 'Book a strategy call, share your goals and current setup, and we will confirm a plan. Timelines depend on the service, but you will get a clear milestone schedule from day one.',
  },
  {
    q: 'How do I communicate with your team?',
    a: 'You get a dedicated point of contact and regular updates through your preferred channel. [Add the channels you actually use, such as email, WhatsApp, or a shared workspace.]',
  },
  {
    q: 'What is your refund policy?',
    a: '[Add your refund policy here.]',
  },
  {
    q: 'Who is Yawk Digital, and where are you based?',
    a: 'Yawk Digital is a performance-focused digital marketing and tech agency. [Add your location and team details here.]',
  },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 sm:py-24 bg-[#f3f2f0] dark:bg-[#030712]">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="font-mono text-xs uppercase tracking-widest text-slate-500 mb-4">
            // no surprises
          </p>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black tracking-tight leading-[1.05] text-slate-900 dark:text-slate-50">
            Questions, answered.
          </h2>

          <p className="mt-5 text-lg text-slate-600 dark:text-slate-400">
            Straight answers on pricing, timelines, revisions, and how we work.
          </p>
        </div>

        <div className="max-w-4xl mx-auto rounded-2xl bg-[#faf9f7] dark:bg-slate-900 shadow-sm overflow-hidden">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={item.q}
                className="border-b border-slate-200 dark:border-slate-800 last:border-b-0"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center gap-4 px-6 py-5 text-left"
                >
                  <span className="font-mono text-xs text-slate-500 w-6 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <span className="flex-1 font-heading font-semibold text-lg text-slate-900 dark:text-slate-100">
                    {item.q}
                  </span>

                  {isOpen ? (
                    <Minus size={18} className="text-slate-500 shrink-0" />
                  ) : (
                    <Plus size={18} className="text-slate-500 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pl-16 text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
