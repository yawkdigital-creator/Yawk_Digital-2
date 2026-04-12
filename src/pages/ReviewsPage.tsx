import React, { useState, useEffect, useCallback } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useModal } from '@/hooks/useModal';
import { GrowthPlanModal } from '@/components/modals/GrowthPlanModal';
import { API_ENDPOINTS } from '@/config/api';
import { SERVICES } from '@/config/constants';
import {
  Star, CheckCircle2, Rocket, Lock, MessageSquareQuote,
  Quote, Shield, Award, Zap, Users,
} from 'lucide-react';

// ── Simple initials avatar ────────────────────────────────────────────────────
function initialsAvatar(name: string) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=7f1d1d&color=fff&bold=true&size=128`;
}

// ── Approved review shape ─────────────────────────────────────────────────────
interface ApprovedReview {
  _id: string;
  name: string;
  role?: string;
  company?: string;
  rating: number;
  content: string;
  submittedAt: string;
}

// ── Review Form ───────────────────────────────────────────────────────────────
const ReviewForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', role: '', company: '', service: '', rating: 0, content: '',
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (submitError) setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.rating === 0) { setSubmitError('Please select a star rating.'); return; }
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch(API_ENDPOINTS.submitTestimonial, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to submit review');
      }
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', role: '', company: '', service: '', rating: 0, content: '' });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputCls = 'w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-sm text-white placeholder:text-slate-500 focus:border-red-500/60 focus:ring-1 focus:ring-red-500/30 focus:outline-none transition-all';
  const labelCls = 'block text-white font-bold text-xs mb-2 uppercase tracking-wider';

  if (submitSuccess) {
    return (
      <div className="py-16 flex flex-col items-center gap-5 text-center">
        <div className="w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500/50 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-green-400" />
        </div>
        <div>
          <h3 className="text-white font-black text-2xl mb-2">Review Submitted!</h3>
          <p className="text-slate-400 text-base max-w-md">
            Thank you! Your review is pending approval and will go live shortly after our team verifies it.
          </p>
        </div>
        <button
          onClick={() => setSubmitSuccess(false)}
          className="mt-4 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-all"
        >
          Submit Another Review
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Full Name <span className="text-red-500">*</span></label>
          <input type="text" name="name" value={formData.name} onChange={handleChange}
            placeholder="Jane Smith" required className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Email <span className="text-red-500">*</span></label>
          <input type="email" name="email" value={formData.email} onChange={handleChange}
            placeholder="jane@company.com" required className={inputCls} />
        </div>
      </div>

      {/* Role + Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Role / Title <span className="text-slate-500 normal-case font-normal">(optional)</span></label>
          <input type="text" name="role" value={formData.role} onChange={handleChange}
            placeholder="CEO, Founder, CMO..." className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Company <span className="text-slate-500 normal-case font-normal">(optional)</span></label>
          <input type="text" name="company" value={formData.company} onChange={handleChange}
            placeholder="Your Company" className={inputCls} />
        </div>
      </div>

      {/* Service Used */}
      <div>
        <label className={labelCls}>Service Used <span className="text-slate-500 normal-case font-normal">(optional)</span></label>
        <select name="service" value={formData.service} onChange={handleChange}
          className={inputCls + ' appearance-none'}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffffff' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 1rem center',
            paddingRight: '2.5rem',
          }}
        >
          <option value="" className="bg-slate-800">Select a service…</option>
          {SERVICES.map(s => (
            <option key={s.id} value={s.title} className="bg-slate-800">{s.title}</option>
          ))}
        </select>
      </div>

      {/* Star Rating */}
      <div>
        <label className={labelCls}>Your Rating <span className="text-red-500">*</span></label>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map(star => (
            <button key={star} type="button"
              onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="transition-transform hover:scale-125 focus:outline-none"
            >
              <Star className={`w-8 h-8 transition-colors duration-150 ${
                star <= (hoverRating || formData.rating)
                  ? 'text-red-500 fill-red-500'
                  : 'text-slate-600 fill-slate-700'
              }`} />
            </button>
          ))}
          {formData.rating > 0 && (
            <span className="text-slate-400 text-sm ml-2 font-semibold">
              {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent!'][formData.rating]}
            </span>
          )}
        </div>
      </div>

      {/* Review Text */}
      <div>
        <label className={labelCls}>Your Review <span className="text-red-500">*</span></label>
        <textarea name="content" value={formData.content} onChange={handleChange}
          placeholder="Share your experience working with Yawk Digital — what results did you achieve, what did you love most?"
          required rows={5}
          className={inputCls + ' resize-none'}
        />
        <p className="text-slate-500 text-xs mt-1.5">Be specific — it helps future clients make decisions.</p>
      </div>

      {/* Error */}
      {submitError && (
        <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-sm">
          {submitError}
        </div>
      )}

      {/* Submit */}
      <button type="submit" disabled={isSubmitting}
        className="w-full bg-red-600 hover:bg-red-500 text-white font-black py-4 px-6 rounded-xl text-base flex items-center justify-center gap-2.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] hover:-translate-y-0.5 active:translate-y-0"
      >
        <Rocket className="w-5 h-5 flex-shrink-0" />
        {isSubmitting ? 'Submitting…' : 'Submit My Review'}
      </button>

      {/* Privacy note */}
      <div className="flex items-center justify-center gap-2 text-slate-500 text-xs">
        <Lock className="w-3.5 h-3.5 flex-shrink-0" />
        <span>Your email is private and will never be displayed publicly.</span>
      </div>
    </form>
  );
};

// ── Main Page ─────────────────────────────────────────────────────────────────
export const ReviewsPage: React.FC = () => {
  const growthPlanModal = useModal();

  const [reviews, setReviews] = useState<ApprovedReview[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch(API_ENDPOINTS.getApprovedTestimonials);
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) setReviews(data.data);
    } catch { /* silent */ } finally {
      setLoadingReviews(false);
    }
  }, []);

  useEffect(() => { fetchReviews(); }, [fetchReviews]);

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[var(--bg-primary)] dark:bg-[#030712] selection:bg-red-500/30 transition-colors duration-300">
        <CustomCursor />
        <Navigation onCtaClick={growthPlanModal.open} />

        <main className="pt-24 sm:pt-28 pb-20">

          {/* ── Hero ── */}
          <section className="relative py-16 sm:py-20 overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-red-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-black uppercase tracking-widest mb-6">
                <MessageSquareQuote className="w-3.5 h-3.5" />
                Client Reviews
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-slate-900 dark:text-white leading-tight tracking-tighter mb-6">
                Share Your <span className="bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">Experience</span>
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
                Your honest feedback helps us grow and helps other businesses make informed decisions. Every review is personally read by our team.
              </p>

            </div>
          </section>

          {/* ── Main Content ── */}
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex flex-col lg:flex-row gap-12 items-start">

              {/* ── LEFT: Form ── */}
              <div className="w-full lg:max-w-xl shrink-0">
                <div className="sticky top-28">
                  <div className="rounded-2xl bg-slate-900 border border-white/10 p-6 sm:p-8 shadow-2xl shadow-black/40">
                    {/* Form header */}
                    <div className="flex items-center gap-3 mb-7">
                      <div className="w-11 h-11 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center flex-shrink-0">
                        <MessageSquareQuote className="w-5 h-5 text-red-500" />
                      </div>
                      <div>
                        <h2 className="text-xl font-heading font-black text-white">Write a Review</h2>
                        <p className="text-slate-400 text-xs mt-0.5">Published after approval · takes ~2 min</p>
                      </div>
                    </div>

                    <ReviewForm />
                  </div>

                  {/* Trust badges */}
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {[
                      { icon: <Shield className="w-4 h-4 text-emerald-400" />, label: 'Privacy Protected' },
                      { icon: <Zap className="w-4 h-4 text-amber-400" />, label: 'Fast Approval' },
                      { icon: <CheckCircle2 className="w-4 h-4 text-red-400" />, label: 'Verified' },
                    ].map(b => (
                      <div key={b.label} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-slate-900/60 border border-white/5 text-center">
                        {b.icon}
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">{b.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── RIGHT: Approved Reviews ── */}
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6 pb-3 border-b border-slate-200 dark:border-white/10 flex items-center gap-2">
                  <Quote className="w-5 h-5 text-red-500" />
                  What Clients Are Saying
                  {reviews.length > 0 && (
                    <span className="ml-auto text-sm font-bold text-slate-500">{reviews.length} reviews</span>
                  )}
                </h2>

                {/* Loading shimmer */}
                {loadingReviews && (
                  <div className="space-y-5">
                    {[0, 1, 2].map(i => (
                      <div key={i} className="rounded-2xl border border-slate-200 dark:border-white/5 p-6 animate-pulse">
                        <div className="flex gap-1 mb-4">{[0,1,2,3,4].map(s => <div key={s} className="w-4 h-4 rounded bg-slate-200 dark:bg-slate-700" />)}</div>
                        <div className="space-y-2 mb-5">
                          <div className="h-3.5 bg-slate-200 dark:bg-slate-700 rounded w-full" />
                          <div className="h-3.5 bg-slate-200 dark:bg-slate-700 rounded w-4/5" />
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700" />
                          <div className="space-y-1.5">
                            <div className="h-3.5 bg-slate-200 dark:bg-slate-700 rounded w-24" />
                            <div className="h-2.5 bg-slate-200 dark:bg-slate-700 rounded w-16" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* No reviews yet */}
                {!loadingReviews && reviews.length === 0 && (
                  <div className="text-center py-16 rounded-2xl border border-dashed border-slate-200 dark:border-white/10">
                    <MessageSquareQuote className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-500 font-semibold">No approved reviews yet.</p>
                    <p className="text-slate-400 text-sm mt-1">Be the first to share your experience!</p>
                  </div>
                )}

                {/* Reviews list */}
                {!loadingReviews && reviews.length > 0 && (
                  <div className="space-y-5">
                    {reviews.map((review, i) => (
                      <div
                        key={review._id}
                        className="group relative rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-6 hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/5 transition-all duration-300"
                        style={{ animationDelay: `${i * 0.05}s` }}
                      >
                        <Quote className="absolute top-5 right-5 w-10 h-10 text-slate-100 dark:text-white/5 group-hover:text-red-500/10 transition-colors" />

                        {/* Stars + Verified */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex gap-0.5">
                            {[1,2,3,4,5].map(s => (
                              <Star key={s} className={`w-4 h-4 ${s <= review.rating ? 'text-red-500 fill-red-500' : 'text-slate-200 dark:text-slate-700'}`} />
                            ))}
                          </div>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-[9px] font-bold uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
                            Verified
                          </span>
                          <span className="ml-auto text-slate-400 text-xs">
                            {new Date(review.submittedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                          </span>
                        </div>

                        {/* Review text */}
                        <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed italic mb-5 relative z-10">
                          "{review.content}"
                        </p>

                        {/* Author */}
                        <div className="flex items-center gap-3">
                          <img
                            src={initialsAvatar(review.name)}
                            className="w-10 h-10 rounded-full object-cover border-2 border-slate-100 dark:border-white/10 group-hover:border-red-500/50 transition-colors"
                            alt={review.name}
                          />
                          <div>
                            <div className="font-black text-slate-900 dark:text-white text-sm">{review.name}</div>
                            {(review.role || review.company) && (
                              <div className="text-slate-500 text-xs font-semibold">
                                {[review.role, review.company].filter(Boolean).join(', ')}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>

        <Footer />

        <GrowthPlanModal
          isOpen={growthPlanModal.isOpen}
          onClose={growthPlanModal.close}
          onSuccess={() => {}}
        />
      </div>
    </ThemeProvider>
  );
};
