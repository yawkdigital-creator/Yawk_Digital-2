export const theme = {
  colors: {
    dark: {
      background: {
        primary: '#030712',
        secondary: '#020617',
        glass: 'rgba(15, 23, 42, 0.6)',
        glassHover: 'rgba(15, 23, 42, 0.8)',
      },
      text: {
        primary: '#f8fafc',
        secondary: '#cbd5e1',
        muted: '#64748b',
        dark: '#475569',
      },
    },
    light: {
      background: {
        primary: '#ffffff',
        secondary: '#f8fafc',
        glass: 'rgba(255, 255, 255, 0.7)',
        glassHover: 'rgba(255, 255, 255, 0.9)',
      },
      text: {
        primary: '#0f172a',
        secondary: '#334155',
        muted: '#64748b',
        dark: '#94a3b8',
      },
    },
    accent: {
      red: '#ef4444',
      purple: '#7c3aed',
    },
  },
  spacing: {
    section: {
      vertical: 'py-24 md:py-32',
      horizontal: 'px-6 md:px-12',
    },
  },
  borderRadius: {
    sm: 'rounded-xl',
    md: 'rounded-2xl',
    lg: 'rounded-3xl',
    xl: 'rounded-[32px]',
    '2xl': 'rounded-[40px]',
    '3xl': 'rounded-[48px]',
    full: 'rounded-full',
  },
} as const;
