import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}) => {
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      
      // Calculate scrollbar width to prevent layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
  };

  const modalContent = (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      <div
        className="absolute inset-0 bg-black/50 dark:bg-black/70 transition-opacity animate-fade-in touch-none"
        onClick={onClose}
      />

      <div
        className={`relative w-full ${sizeClasses[size]} max-w-[calc(100vw-1.5rem)] sm:max-w-[calc(100vw-2rem)] md:max-w-none rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl animate-zoom-in bg-white dark:bg-slate-900 flex flex-col max-h-[90vh] sm:max-h-[92vh] overflow-hidden my-auto`}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 touch-manipulation w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-200/80 dark:bg-slate-700/80 hover:bg-red-500 border border-slate-300 dark:border-slate-600 hover:border-red-400 text-slate-500 dark:text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-[0_0_12px_rgba(239,68,68,0.5)] active:scale-95"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" strokeWidth={2.5} />
        </button>

        <div 
          className="flex-1 overflow-y-auto custom-scrollbar min-h-0"
        >
          {title && (
            <div className="p-4 sm:p-5 md:p-6 pb-0">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-black text-slate-900 dark:text-white mb-4 sm:mb-6">
                {title}
              </h2>
            </div>
          )}
          <div className={title ? "p-4 sm:p-5 md:p-6 pt-0" : "p-4 sm:p-5 md:p-6"}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );

  // Render modal using React Portal to document.body to ensure it's always on top
  return createPortal(modalContent, document.body);
};
