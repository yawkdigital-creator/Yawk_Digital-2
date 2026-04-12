import React, { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Quote, Star, PenLine } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { TESTIMONIALS } from '@/config/constants';
import { useIntersection } from '@/hooks/useIntersection';
import { API_ENDPOINTS } from '@/config/api';

interface LiveReview {
  _id: string;
  name: string;
  role?: string;
  company?: string;
  rating: number;
  content: string;
  submittedAt: string;
}

// Simple initials avatar
function initialsAvatar(name: string) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=7f1d1d&color=fff&bold=true&size=128`;
}

export const Testimonials: React.FC = () => {
  const { ref } = useIntersection();
  const navigate = useNavigate();

  const [liveReviews, setLiveReviews] = useState<LiveReview[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [featuredTestimonials, setFeaturedTestimonials] = useState(TESTIMONIALS);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('yd_featured_testimonials');
      if (saved) setFeaturedTestimonials(JSON.parse(saved));
    } catch { /* fallback to defaults */ }
  }, []);

  const fetchApproved = useCallback(async () => {
    try {
      const res = await fetch(API_ENDPOINTS.getApprovedTestimonials);
      if (!res.ok) throw new Error('fetch failed');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setLiveReviews(data.data);
      }
    } catch {
      // silently fall back to hardcoded
    } finally {
      setLoadingReviews(false);
    }
  }, []);

  useEffect(() => {
    fetchApproved();
  }, [fetchApproved]);

  // Decide what to display: live approved reviews first, then hardcoded fill if needed
  const displayList = liveReviews.length > 0
    ? liveReviews.map(r => ({
        id: r._id,
        name: r.name,
        role: r.role || '',
        company: r.company || '',
        rating: r.rating,
        content: r.content,
        avatar: initialsAvatar(r.name),
        isLive: true,
      }))
    : featuredTestimonials.map(t => ({ ...t, isLive: false }));

  return (
    <section id="insights" className="pt-10 sm:pt-12 md:pt-16 pb-20 sm:pb-24 md:pb-32 bg-white dark:bg-[#030712] relative overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">

        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 sm:gap-8 mb-8 sm:mb-10 md:mb-12">
          <div className="max-w-3xl">
            <h2 className="text-red-500 font-bold uppercase tracking-[0.3em] text-xs mb-3 sm:mb-4">
              Client Resonance
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-black text-slate-900 dark:text-white leading-tight sm:leading-none tracking-tighter">
              What Our Clients <br />
              <span className="gradient-text">Say About Us.</span>
            </h3>
          </div>
          <div className="flex flex-col items-start gap-4 lg:mb-4">
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-sm leading-relaxed border-l-2 sm:border-l border-red-500/20 pl-4 sm:pl-6">
              We partner with visionary founders who demand ROI over optics. Our results are verifiable, aggressive, and sustainable.
            </p>
          </div>
        </div>

        {/* Loading shimmer */}
        {loadingReviews && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className="rounded-2xl border border-slate-200 dark:border-white/5 p-8 animate-pulse">
                <div className="flex gap-1 mb-6">{[0,1,2,3,4].map(s => <div key={s} className="w-4 h-4 rounded bg-slate-200 dark:bg-slate-700" />)}</div>
                <div className="space-y-2 mb-8">
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-4/5" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/5" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-slate-200 dark:bg-slate-700" />
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-28" />
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Reviews grid */}
        {!loadingReviews && (
          <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {displayList.map((testimonial, index) => (
              <Card
                key={testimonial.id}
                hover
                className="group animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Quote className="absolute top-10 right-10 w-16 h-16 text-slate-200 dark:text-white/5 group-hover:text-red-500/20 dark:group-hover:text-red-500/10 transition-colors" />

                <div className="flex items-center gap-2 mb-6">
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(s => (
                      <Star
                        key={s}
                        className={`w-4 h-4 ${s <= testimonial.rating ? 'text-red-500 fill-red-500' : 'text-slate-200 dark:text-slate-700'}`}
                      />
                    ))}
                  </div>
                  {testimonial.isLive && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-[9px] font-bold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
                      Verified
                    </span>
                  )}
                </div>

                <p className="text-base sm:text-xl text-slate-700 dark:text-slate-300 italic mb-8 sm:mb-12 relative z-10 leading-relaxed group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-5">
                  <div className="relative">
                    <div className="absolute inset-0 bg-red-500 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity" />
                    <img
                      src={testimonial.avatar}
                      className="w-14 h-14 rounded-full object-cover relative z-10 border-2 border-slate-200 dark:border-white/10 group-hover:border-red-500 transition-colors"
                      alt={testimonial.name}
                    />
                  </div>
                  <div>
                    <div className="text-slate-900 dark:text-white font-black text-lg">
                      {testimonial.name}
                    </div>
                    {(testimonial.role || testimonial.company) && (
                      <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                        {[testimonial.role, testimonial.company].filter(Boolean).join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

    </section>
  );
};
