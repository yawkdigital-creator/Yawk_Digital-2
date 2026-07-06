import React, { useState, useEffect, useRef } from 'react';
import { BaseModal } from './BaseModal';
import { trackLead, trackSchedule } from '@/utils/tracking';
import {
  CheckCircle2,
  Database,
  Rocket,
  Lock,
  Globe,
  PenLine,
  Check,
  ChevronDown,
} from 'lucide-react';
import { SERVICES } from '@/config/constants';
import { API_ENDPOINTS } from '@/config/api';

// Country → currency map
const COUNTRIES = [
  { code: 'US',    flagCode: 'us', name: 'United States',  symbol: '$',    rate: 1      },
  { code: 'PK',    flagCode: 'pk', name: 'Pakistan',        symbol: '₨',   rate: 280    },
  { code: 'AE',    flagCode: 'ae', name: 'UAE',             symbol: 'AED', rate: 3.67   },
  { code: 'SA',    flagCode: 'sa', name: 'Saudi Arabia',    symbol: 'SAR', rate: 3.75   },
  { code: 'GB',    flagCode: 'gb', name: 'United Kingdom',  symbol: '£',   rate: 0.79   },
  { code: 'EU',    flagCode: 'eu', name: 'Europe',          symbol: '€',   rate: 0.92   },
  { code: 'CA',    flagCode: 'ca', name: 'Canada',          symbol: 'CA$', rate: 1.37   },
  { code: 'AU',    flagCode: 'au', name: 'Australia',       symbol: 'A$',  rate: 1.55   },
  { code: 'IN',    flagCode: 'in', name: 'India',           symbol: '₹',   rate: 83     },
  { code: 'BD',    flagCode: 'bd', name: 'Bangladesh',      symbol: '৳',   rate: 110    },
  { code: 'NG',    flagCode: 'ng', name: 'Nigeria',         symbol: '₦',   rate: 1580   },
  { code: 'ZA',    flagCode: 'za', name: 'South Africa',    symbol: 'R',   rate: 18.5   },
  { code: 'OTHER', flagCode: '',   name: 'Other',           symbol: '$',   rate: 1      },
];

// USD budget tier boundaries (used for every country EXCEPT the overrides below)
const USD_TIERS = [500, 1500, 5000];

// Country-specific budget tier overrides, given directly in local currency
// (bypasses the USD -> local rate conversion entirely for these countries).
const COUNTRY_TIER_OVERRIDES: Record<string, number[]> = {
  PK: [50000, 100000, 250000], // Rs: Under 50K, 50K-100K, 100K-250K, 250K+
};

function fmt(amount: number, symbol: string, rate: number): string {
  const v = Math.round(amount * rate);
  if (v >= 1_000_000) return `${symbol}${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000)     return `${symbol}${Math.round(v / 1000)}K`;
  return `${symbol}${v.toLocaleString()}`;
}

function getBudgetTiers(symbol: string, rate: number, countryCode?: string) {
  const override = countryCode ? COUNTRY_TIER_OVERRIDES[countryCode] : undefined;
  const [a, b, c] = override ?? USD_TIERS;
  const effectiveRate = override ? 1 : rate;
  return [
    `Under ${fmt(a, symbol, effectiveRate)}`,
    `${fmt(a, symbol, effectiveRate)} – ${fmt(b, symbol, effectiveRate)}`,
    `${fmt(b, symbol, effectiveRate)} – ${fmt(c, symbol, effectiveRate)}`,
    `${fmt(c, symbol, effectiveRate)}+`,
    'Custom Budget',
  ];
}

interface GrowthPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  /** Pre-select a service (e.g. "Web Development") when opened from a service page */
  preSelectedService?: string;
  /** Pre-select a specific sub-option (e.g. "WordPress") */
  preSelectedSubOption?: string;
  /** Human-readable label shown in the pre-fill banner (e.g. "WordPress Development") */
  preSelectedGigName?: string;
}

export const GrowthPlanModal: React.FC<GrowthPlanModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  preSelectedService,
  preSelectedSubOption,
  preSelectedGigName,
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    country: '',
    selectedServices: [] as string[],
    estimatedBudget: '',
    customBudget: '',
    projectDescription: '',
    subOptions: [] as string[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const countryRef = useRef<HTMLDivElement>(null);

  // Close country dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) {
        setCountryOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Auto-fill service + sub-option when modal is opened from a gig page
  useEffect(() => {
    if (isOpen && preSelectedService) {
      setFormData(prev => ({
        ...prev,
        selectedServices: [preSelectedService],
        subOptions: preSelectedSubOption ? [preSelectedSubOption] : [],
      }));
    }
  }, [isOpen, preSelectedService, preSelectedSubOption]);

  // Derived currency info from selected country
  const selectedCountry = COUNTRIES.find(c => c.code === formData.country) || COUNTRIES[0];
  const budgetTiers = getBudgetTiers(selectedCountry.symbol, selectedCountry.rate);
  const isCustomBudget = formData.estimatedBudget === 'Custom Budget';

  // Map services to their sub-options
  const serviceSubOptions: Record<string, string[]> = {
    'Web Development':        ['WordPress', 'Shopify', 'React', 'Node.js'],
    'Graphic Design':         ['Branding', 'Content Strategy', 'Social Media Content'],
    'Ads Management':         ['Meta Ads', 'Media Buying', 'TikTok Ads', 'Google Ads', 'LinkedIn Ads'],
    'AI Business Automation': ['Task/Workflow Automation', 'AI Business Integration'],
    'App Development':        ['Flutter', 'iOS App', 'Android App', 'Cross-Platform App', 'UI/UX for Mobile'],
    'SEO / AEO':              ['On-Page SEO', 'Technical SEO', 'Local SEO', 'AI Engine Optimization', 'Keyword Research', 'Link Building'],
    'Video Editing':          ['YouTube Videos', 'Reels / TikTok', 'Product Videos', 'Motion Graphics', 'Color Grading', 'Subtitles & Captions'],
    'Shop Management':        ['Amazon Store', 'TikTok Shop', 'eBay Store', 'Daraz Store', 'Product Listing', 'Inventory Management'],
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (submitError) setSubmitError(null);
  };

  // Toggle a whole service on/off; also prune orphaned sub-options
  const handleServiceToggle = (serviceTitle: string) => {
    setFormData(prev => {
      const already = prev.selectedServices.includes(serviceTitle);
      const newServices = already
        ? prev.selectedServices.filter(s => s !== serviceTitle)
        : [...prev.selectedServices, serviceTitle];

      // Remove sub-options that belong to this service when unchecking
      const removedSubs = already ? (serviceSubOptions[serviceTitle] ?? []) : [];
      const newSubOptions = prev.subOptions.filter(o => !removedSubs.includes(o));

      return { ...prev, selectedServices: newServices, subOptions: newSubOptions };
    });
    if (submitError) setSubmitError(null);
  };

  // Toggle individual sub-option
  const handleSubOptionToggle = (subOption: string) => {
    setFormData(prev => {
      const isSelected = prev.subOptions.includes(subOption);
      return {
        ...prev,
        subOptions: isSelected
          ? prev.subOptions.filter(o => o !== subOption)
          : [...prev.subOptions, subOption],
      };
    });
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (submitError) setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Manual validation for multi-select service
    if (formData.selectedServices.length === 0) {
      setSubmitError('Please select at least one service.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      // Map to backend field name for backward compat
      const payload = {
        ...formData,
        serviceInterest: formData.selectedServices.join(', '),
        estimatedBudget: formData.estimatedBudget === 'Custom Budget'
          ? formData.customBudget
          : formData.estimatedBudget,
      };

      const response = await fetch(API_ENDPOINTS.submitForm, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        let errorMessage = 'Failed to submit form';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();

      // Success — fire conversion events on all active ad platforms
      trackLead({ content_name: 'Strategy Call Form' });
      trackSchedule();
      setSubmitSuccess(true);
    onSuccess?.();
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        country: '',
        selectedServices: [],
        estimatedBudget: '',
        customBudget: '',
        projectDescription: '',
        subOptions: [],
      });

      // Close modal after a longer delay to show success message
      setTimeout(() => {
    onClose();
        setSubmitSuccess(false);
      }, 4000);
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Handle network errors specifically
      let errorMessage = 'Failed to submit form. Please try again.';
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorMessage = 'Cannot connect to server. Please make sure the backend server is running on port 5000.';
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="relative rounded-xl p-4 sm:p-6 md:p-8 lg:p-10">
        {/* Header Section */}
        <div className="relative mb-4 sm:mb-6 md:mb-8">
          <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-heading font-black text-slate-900 dark:text-white leading-tight tracking-tight mb-2 sm:mb-3 uppercase">
            BOOK YOUR FREE STRATEGY CALL
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm md:text-base">
            Tell us about your project and we'll reach out to schedule a call.
          </p>

          {/* Pre-fill banner – shown when opened from a gig card */}
          {preSelectedGigName && (
            <div className="mt-3 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-red-500/10 border border-red-500/40">
              <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0" />
              <div>
                <span className="text-red-400 font-black text-xs uppercase tracking-wider">Pre-filled for: </span>
                <span className="text-red-300 font-bold text-xs">{preSelectedGigName}</span>
              </div>
            </div>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
          {/* First Name and Last Name - Two Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
            <div className="group">
              <label className="block text-slate-800 dark:text-white font-bold text-xs sm:text-sm mb-1.5 sm:mb-2 uppercase tracking-wider">
                FIRST NAME <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                required
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 sm:py-3 px-3 sm:px-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-red-400 dark:focus:border-slate-600 focus:outline-none transition-all"
            />
          </div>

            <div className="group">
              <label className="block text-slate-800 dark:text-white font-bold text-xs sm:text-sm mb-1.5 sm:mb-2 uppercase tracking-wider">
                LAST NAME <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Smith"
                required
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 sm:py-3 px-3 sm:px-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-red-400 dark:focus:border-slate-600 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Email Address and Phone - Two Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
            <div className="group">
              <label className="block text-slate-800 dark:text-white font-bold text-xs sm:text-sm mb-1.5 sm:mb-2 uppercase tracking-wider">
                EMAIL ADDRESS <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              placeholder="john@company.com"
                required
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 sm:py-3 px-3 sm:px-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-red-400 dark:focus:border-slate-600 focus:outline-none transition-all"
              />
            </div>

            <div className="group">
              <label className="block text-slate-800 dark:text-white font-bold text-xs sm:text-sm mb-1.5 sm:mb-2 uppercase tracking-wider">
                PHONE / WHATSAPP
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 234 567 8900"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 sm:py-3 px-3 sm:px-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-red-400 dark:focus:border-slate-600 focus:outline-none transition-all"
            />
          </div>
        </div>

          {/* Company / Brand Name + Country - Two Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
            <div className="group">
              <label className="block text-slate-800 dark:text-white font-bold text-xs sm:text-sm mb-1.5 sm:mb-2 uppercase tracking-wider">
                COMPANY / BRAND NAME
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your Company"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 sm:py-3 px-3 sm:px-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-red-400 dark:focus:border-slate-600 focus:outline-none transition-all"
              />
            </div>

            <div className="group">
              <label className="block text-slate-800 dark:text-white font-bold text-xs sm:text-sm mb-1.5 sm:mb-2 uppercase tracking-wider">
                COUNTRY <span className="text-red-500">*</span>
              </label>
              {/* Custom country dropdown with real flag images */}
              <div className="relative" ref={countryRef}>
                <button
                  type="button"
                  onClick={() => setCountryOpen(o => !o)}
                  className={`w-full flex items-center gap-2.5 bg-slate-50 dark:bg-slate-800 border rounded-lg py-2.5 sm:py-3 px-3 sm:px-4 text-sm text-left cursor-pointer transition-all ${
                    countryOpen
                      ? 'border-red-400 dark:border-slate-500'
                      : 'border-slate-200 dark:border-slate-700'
                  } ${formData.country ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}
                >
                  {formData.country && selectedCountry.flagCode ? (
                    <img
                      src={`https://flagcdn.com/w20/${selectedCountry.flagCode}.png`}
                      srcSet={`https://flagcdn.com/w40/${selectedCountry.flagCode}.png 2x`}
                      alt={selectedCountry.name}
                      className="w-5 h-3.5 object-cover rounded-sm flex-shrink-0"
                    />
                  ) : formData.country === 'OTHER' ? (
                    <Globe className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  ) : (
                    <Globe className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  )}
                  <span className="flex-1 truncate">
                    {formData.country ? selectedCountry.name : 'Select country...'}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${countryOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown list */}
                {countryOpen && (
                  <div className="absolute z-50 top-full left-0 right-0 mt-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden max-h-56 overflow-y-auto custom-scrollbar">
                    {COUNTRIES.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, country: c.code }));
                          setCountryOpen(false);
                          if (submitError) setSubmitError(null);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${
                          formData.country === c.code
                            ? 'bg-red-500/10 text-red-500 dark:text-red-400 font-semibold'
                            : 'text-slate-700 dark:text-slate-200'
                        }`}
                      >
                        {c.flagCode ? (
                          <img
                            src={`https://flagcdn.com/w20/${c.flagCode}.png`}
                            srcSet={`https://flagcdn.com/w40/${c.flagCode}.png 2x`}
                            alt={c.name}
                            className="w-5 h-3.5 object-cover rounded-sm flex-shrink-0"
                          />
                        ) : (
                          <Globe className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        )}
                        <span>{c.name}</span>
                        {formData.country === c.code && (
                          <Check className="w-3.5 h-3.5 ml-auto text-red-500 dark:text-red-400" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {formData.country && (
                <p className="mt-1.5 text-[10px] text-slate-400">
                  Prices shown in <span className="text-red-400 font-bold">{selectedCountry.symbol}</span>
                </p>
              )}
            </div>
          </div>

          {/* ── Services multi-select ── */}
          <div>
            <label className="block text-slate-800 dark:text-white font-bold text-xs sm:text-sm mb-2 sm:mb-3 uppercase tracking-wider">
              SERVICES YOU'RE INTERESTED IN <span className="text-red-500">*</span>
              {formData.selectedServices.length > 0 && (
                <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-bold normal-case tracking-normal">
                  <Check className="w-2.5 h-2.5" />
                  {formData.selectedServices.length} selected
                </span>
              )}
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {SERVICES.map((service) => {
                const Icon = service.icon;
                const isSelected = formData.selectedServices.includes(service.title);
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => handleServiceToggle(service.title)}
                    className={`relative flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl border-2 text-center transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-red-500/10 border-red-500 text-red-500 dark:text-red-400 shadow-[0_0_14px_rgba(239,68,68,0.2)]'
                        : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-500 hover:text-slate-700 dark:hover:text-slate-200'
                    }`}
                  >
                    {/* Tick badge */}
                    {isSelected && (
                      <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                      </span>
                    )}
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 ${isSelected ? 'text-red-400' : ''}`} />
                    <span className="text-[10px] sm:text-xs font-bold leading-tight">{service.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Sub-options, grouped per selected service ── */}
          {formData.selectedServices.length > 0 && (
            <div className="space-y-4">
              {formData.selectedServices.map(serviceName => {
                const subs = serviceSubOptions[serviceName];
                if (!subs || subs.length === 0) return null;
                return (
                  <div key={serviceName} className="rounded-xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 p-3 sm:p-4">
                    <p className="text-slate-600 dark:text-slate-300 font-bold text-[10px] sm:text-xs uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block"></span>
                      {serviceName}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {subs.map(sub => {
                        const isSelected = formData.subOptions.includes(sub);
                        return (
                          <button
                            key={sub}
                            type="button"
                            onClick={() => handleSubOptionToggle(sub)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                              isSelected
                                ? 'bg-red-600 text-white border-red-500'
                                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-slate-400 hover:text-slate-900 dark:hover:text-white'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3" strokeWidth={3} />}
                            {sub}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Estimated Budget - Radio Buttons */}
          <div className="group">
            <label className="block text-slate-800 dark:text-white font-bold text-xs sm:text-sm mb-2 sm:mb-3 uppercase tracking-wider">
              ESTIMATED BUDGET <span className="text-red-500">*</span>
              {!formData.country && (
                <span className="ml-2 text-slate-400 dark:text-slate-500 text-[10px] normal-case tracking-normal font-normal">(select country to see local prices)</span>
              )}
            </label>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {budgetTiers.map((option) => (
                <label
                  key={option}
                  className="flex items-center cursor-pointer group/budget"
                >
                  <input
                    type="radio"
                    name="estimatedBudget"
                    value={option}
                    checked={formData.estimatedBudget === option}
                    onChange={() => handleRadioChange('estimatedBudget', option)}
                    required
                    className="sr-only"
                  />
                  <span className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 ${
                    formData.estimatedBudget === option
                      ? 'bg-red-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}>
                    {option === 'Custom Budget' && <PenLine className="w-3 h-3" />}
                    {option}
                  </span>
                </label>
              ))}
            </div>

            {/* Custom Budget input */}
            {isCustomBudget && (
              <div className="mt-3">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-red-400 font-bold text-sm pointer-events-none">
                    {selectedCountry.symbol}
                  </span>
                  <input
                    type="text"
                    name="customBudget"
                    value={formData.customBudget}
                    onChange={handleChange}
                    placeholder="Enter your budget amount"
                    className="w-full bg-slate-800 border border-red-500/50 rounded-lg py-2.5 sm:py-3 pl-8 pr-4 text-sm text-white placeholder:text-slate-400 focus:border-red-500 focus:outline-none transition-all"
                  />
                </div>
                <p className="mt-1 text-[10px] text-slate-400 dark:text-slate-500">Enter amount in {selectedCountry.symbol || 'USD'}</p>
              </div>
            )}
          </div>

          {/* Project Description - Textarea */}
          <div className="group">
            <label className="block text-slate-800 dark:text-white font-bold text-xs sm:text-sm mb-1.5 sm:mb-2 uppercase tracking-wider">
              TELL US ABOUT YOUR PROJECT <span className="text-red-500">*</span>
            </label>
            <textarea
              name="projectDescription"
              value={formData.projectDescription}
              onChange={handleChange}
              placeholder="Briefly describe your goals, timeline, and any specific requirements..."
              required
              rows={4}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 sm:py-3 px-3 sm:px-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-red-400 dark:focus:border-slate-600 focus:outline-none transition-all resize-none"
            />
        </div>

          {/* Error Message */}
          {submitError && (
            <div className="p-2.5 sm:p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-100 text-xs sm:text-sm">
              {submitError}
            </div>
          )}

          {/* Success Message */}
          {submitSuccess && (
            <div className="p-3 sm:p-4 bg-green-500/20 border-2 border-green-500/70 rounded-lg text-green-100 space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-xs sm:text-sm text-green-50 mb-0.5">
                    Form Submitted Successfully!
                  </div>
                  <div className="text-[10px] sm:text-xs text-green-100/90">
                    Your information has been saved to MongoDB database.
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 pt-1.5 border-t border-green-500/30">
                <Database className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-400" />
                <span className="text-[10px] text-green-100/80">
                  MongoDB Updated ✓
                </span>
              </div>
              <div className="text-[10px] sm:text-xs text-green-100/90 pt-0.5">
                We'll contact you soon. Thank you!
        </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-bold py-3 sm:py-4 px-3 sm:px-6 rounded-lg text-xs sm:text-sm md:text-base lg:text-lg flex items-center justify-center gap-1.5 sm:gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(239,68,68,0.35)] hover:-translate-y-0.5 active:translate-y-0"
            >
              <Rocket className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="text-center leading-tight">
                {isSubmitting ? 'Submitting...' : 'Book My Free Strategy Call'}
              </span>
            </button>
          </div>

          {/* Privacy Text */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-slate-500 dark:text-slate-400 text-[10px] sm:text-xs md:text-sm pt-2">
            <Lock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="text-center">Your information is safe with us. No spam, ever.</span>
          </div>
        </form>
      </div>
    </BaseModal>
  );
};
