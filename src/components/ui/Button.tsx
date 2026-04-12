import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  shimmer?: boolean;
  glow?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  shimmer = false,
  glow = false,
  children,
  className = '',
  ...props
}) => {
  const baseClasses = 'btn-interactive font-black rounded-2xl flex items-center justify-center gap-3 transition-all touch-manipulation active:scale-95';
  
  const variantClasses = {
    primary: 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-red-500 hover:text-white dark:hover:bg-red-500 dark:hover:text-white',
    secondary: 'bg-transparent text-slate-900 dark:text-white border border-slate-300 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5',
    ghost: 'bg-transparent text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/5',
  };

  const sizeClasses = {
    sm: 'px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm min-h-[44px]',
    md: 'px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base min-h-[48px]',
    lg: 'px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 text-base sm:text-lg min-h-[52px] sm:min-h-[56px]',
  };

  const effectClasses = [
    shimmer && 'shimmer-btn',
    glow && 'btn-primary-glow',
  ].filter(Boolean).join(' ');

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${effectClasses} ${className}`;

  return (
    <button className={classes} {...props}>
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />}
      <span className="whitespace-nowrap">{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />}
    </button>
  );
};
