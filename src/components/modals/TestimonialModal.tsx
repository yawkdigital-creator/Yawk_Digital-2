import React, { useState } from 'react';
import { BaseModal } from './BaseModal';
import { Star, CheckCircle2, Rocket, Lock, MessageSquareQuote } from 'lucide-react';
import { API_ENDPOINTS } from '@/config/api';
import { SERVICES } from '@/config/constants';

interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TestimonialModal: React.FC<TestimonialModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    company: '',
    service: '',
    rating: 0,
    content: '',
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
    if (formData.rating === 0) {
      setSubmitError('Please select a star rating.');
      return;
    }
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch(API_ENDPOINTS.submitTestimonial, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to submit review');
      }

      setSubmitSuccess(true);
      setFormData({ name: '', email: '', role: '', company: '', service: '', rating: 0, content: '' });

      setTimeout(() => {
        onClose();
        setSubmitSuccess(false);
      }, 4000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = 'w-full bg-slate-800 border border-slate-700 rounded-lg py-2.5 sm:py-3 px-3 sm:px-4 text-sm text-white placeholder:text-slate-400 focus:border-red-500/50 focus:outline-none transition-all';
  const labelClass = 'block text-white font-bold text-xs sm:text-sm mb-1.5 sm:mb-2 uppercase tracking-wider';

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} size="md">
      <div className="bg-slate-900 rounded-xl p-4 sm:p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center flex-shrink-0">
            <MessageSquareQuote className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-black text-white uppercase tracking-tight">
              Share Your Experience
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
              Your review will be published after approval.
            </p>
          </div>
        </div>

        {submitSuccess ? (
          <div className="py-8 flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500/50 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-400" />
            </div>
            <div>
              <h3 className="text-white font-black text-lg mb-1">Review Submitted!</h3>
              <p className="text-slate-400 text-sm">Thank you! Your review is pending approval and will go live shortly.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">

            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className={labelClass}>Full Name <span className="text-red-500">*</span></label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Jane Smith" required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Email <span className="text-red-500">*</span></label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="jane@company.com" required className={inputClass} />
              </div>
            </div>

            {/* Role + Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className={labelClass}>Role / Title <span className="text-slate-500 normal-case font-normal">(optional)</span></label>
                <input type="text" name="role" value={formData.role} onChange={handleChange} placeholder="CEO, Founder, CMO..." className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Company <span className="text-slate-500 normal-case font-normal">(optional)</span></label>
                <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Your Company" className={inputClass} />
              </div>
            </div>

            {/* Service Used */}
            <div>
              <label className={labelClass}>Service Used</label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className={inputClass + ' appearance-none cursor-pointer'}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffffff' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.75rem center',
                  paddingRight: '2.25rem',
                }}
              >
                <option value="" className="bg-slate-800">Select service (optional)</option>
                {SERVICES.map(s => (
                  <option key={s.id} value={s.title} className="bg-slate-800">{s.title}</option>
                ))}
              </select>
            </div>

            {/* Star Rating */}
            <div>
              <label className={labelClass}>Your Rating <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform hover:scale-125 focus:outline-none"
                  >
                    <Star
                      className={`w-7 h-7 transition-colors duration-150 ${
                        star <= (hoverRating || formData.rating)
                          ? 'text-red-500 fill-red-500'
                          : 'text-slate-600 fill-slate-700'
                      }`}
                    />
                  </button>
                ))}
                {formData.rating > 0 && (
                  <span className="text-slate-400 text-xs ml-1">
                    {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'][formData.rating]}
                  </span>
                )}
              </div>
            </div>

            {/* Review Text */}
            <div>
              <label className={labelClass}>Your Review <span className="text-red-500">*</span></label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Share your experience working with Yawk Digital — what results did you achieve, what did you love most?"
                required
                rows={4}
                className={inputClass + ' resize-none'}
              />
              <p className="text-slate-500 text-[10px] mt-1">Be specific — it helps future clients make decisions.</p>
            </div>

            {/* Error */}
            {submitError && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-xs sm:text-sm">
                {submitError}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 sm:py-4 px-6 rounded-lg text-sm sm:text-base flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]"
            >
              <Rocket className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              {isSubmitting ? 'Submitting...' : 'Submit My Review'}
            </button>

            {/* Privacy */}
            <div className="flex items-center justify-center gap-1.5 text-slate-500 text-[10px] sm:text-xs">
              <Lock className="w-3 h-3 flex-shrink-0" />
              <span>Your email is private and will never be displayed publicly.</span>
            </div>
          </form>
        )}
      </div>
    </BaseModal>
  );
};
