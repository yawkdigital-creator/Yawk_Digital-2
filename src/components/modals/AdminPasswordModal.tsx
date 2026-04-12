import React, { useState } from 'react';
import { BaseModal } from './BaseModal';
import { Lock, AlertCircle, Shield } from 'lucide-react';

interface AdminPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ADMIN_PASSWORD = 'ogaboga69';

export const AdminPasswordModal: React.FC<AdminPasswordModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        onSuccess();
        setPassword('');
        onClose();
      } else {
        setError('Incorrect password. Please try again.');
      }
      setIsSubmitting(false);
    }, 300);
  };

  const handleClose = () => {
    setPassword('');
    setError(null);
    setIsFocused(false);
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={handleClose} size="md">
      <div className="relative bg-slate-900 dark:bg-[#030712] rounded-xl p-4 sm:p-6 md:p-8 lg:p-10">
        {/* Header Section */}
        <div className="relative mb-4 sm:mb-6 md:mb-8">
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-red-500/10 border-2 border-red-500/30 flex items-center justify-center">
                <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-red-500" />
              </div>
            </div>
          </div>
          <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-heading font-black text-white leading-tight tracking-tight mb-2 sm:mb-3 uppercase text-center">
            ADMIN PORTAL
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base text-center">
            Enter your password to access the admin panel.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
          {/* Password Input */}
          <div className="group">
            <label className="block text-white font-bold text-xs sm:text-sm mb-1.5 sm:mb-2 uppercase tracking-wider">
              PASSWORD <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-10">
                <Lock className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${isFocused ? 'text-red-500' : 'text-slate-400'}`} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Enter your admin password"
                required
                autoFocus
                className="w-full bg-slate-800 dark:bg-slate-800 border border-slate-700 dark:border-slate-700 rounded-lg py-2.5 sm:py-3 pl-10 sm:pl-12 pr-3 sm:pr-4 text-sm text-white placeholder:text-slate-400 focus:border-red-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-2.5 sm:p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-100 text-xs sm:text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-lime-400 hover:bg-lime-500 text-slate-900 font-bold py-3 sm:py-4 px-3 sm:px-6 rounded-lg text-xs sm:text-sm md:text-base lg:text-lg flex items-center justify-center gap-1.5 sm:gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="text-center leading-tight">
                {isSubmitting ? 'Verifying...' : 'Access Admin Panel'}
              </span>
            </button>
          </div>

          {/* Cancel Button */}
          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="w-full text-center text-sm font-medium text-slate-400 hover:text-white py-2 transition-all duration-300 rounded-lg hover:bg-slate-800/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </form>
      </div>
    </BaseModal>
  );
};
