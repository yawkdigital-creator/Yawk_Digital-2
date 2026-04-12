import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useModal } from '@/hooks/useModal';
import { GrowthPlanModal } from '@/components/modals/GrowthPlanModal';
import { API_ENDPOINTS } from '@/config/api';
import {
  Database,
  User,
  Mail,
  MessageCircle,
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowLeft,
  RefreshCw,
  Filter,
  FileText,
  Star,
  MessageSquareQuote,
  Trash2,
  ThumbsUp,
  ThumbsDown,
  Pencil,
  X,
  Save,
  Layers,
  Plus,
  RotateCcw,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Package,
  Image,
  BarChart2,
  TrendingUp,
  Zap,
} from 'lucide-react';
import {
  DEFAULT_INSIGHTS,
  INSIGHT_ICONS,
  type InsightMetric,
  type InsightIconName,
} from '@/components/sections/TrustedByLeaders';
import { CASE_STUDIES } from '@/config/constants';
import type { CaseStudy } from '@/types';
import { SERVICES, TESTIMONIALS } from '@/config/constants';
import type { Testimonial } from '@/types';
import {
  ALL_SERVICE_SLUGS,
  loadSnapshot,
  loadOverride,
  saveOverride,
  resetOverride,
  hasOverride,
  type ServiceSnapshot,
} from '@/utils/serviceStore';
import type { SubServiceGig, GigPackage } from '@/components/templates/ServiceGigPage';

interface Submission {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  serviceInterest: string;
  estimatedBudget: string;
  projectDescription: string;
  subOptions?: string[];
  submittedAt: string;
  status: 'new' | 'contacted' | 'scheduled' | 'completed';
  createdAt: string;
  updatedAt: string;
}

interface TestimonialEntry {
  _id: string;
  name: string;
  email: string;
  role: string;
  company: string;
  rating: number;
  content: string;
  service?: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

type Tab = 'submissions' | 'reviews' | 'services' | 'casestudies' | 'insights' | 'featured';

export const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const growthPlanModal = useModal();

  // Tab
  const [activeTab, setActiveTab] = useState<Tab>('submissions');

  // Submissions
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [subLoading, setSubLoading] = useState(true);
  const [subError, setSubError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Reviews
  const [reviews, setReviews] = useState<TestimonialEntry[]>([]);
  const [revLoading, setRevLoading] = useState(false);
  const [revError, setRevError] = useState<string | null>(null);
  const [revFilter, setRevFilter] = useState<string>('all');

  // Services editor state
  const [selectedServiceSlug, setSelectedServiceSlug] = useState<string | null>(null);
  const [serviceEditData, setServiceEditData] = useState<ServiceSnapshot | null>(null);
  const [serviceEditSection, setServiceEditSection] = useState<'overview' | 'subservices' | 'packages' | 'faqs'>('subservices');
  const [editingSubServiceIdx, setEditingSubServiceIdx] = useState<number | null>(null);
  const [editingPackageIdx, setEditingPackageIdx] = useState<number | null>(null);
  const [serviceSaveMsg, setServiceSaveMsg] = useState<string | null>(null);

  // Case Studies state
  const [csStudies, setCsStudies] = useState<CaseStudy[]>(() => {
    try { const s = localStorage.getItem('yd_case_studies'); return s ? JSON.parse(s) : CASE_STUDIES; } catch { return CASE_STUDIES; }
  });
  const [csEditIdx, setCsEditIdx] = useState<number | null>(null);
  const [csEditForm, setCsEditForm] = useState<Partial<CaseStudy & { resultsRaw: string }>>({});
  const [csAddMode, setCsAddMode] = useState(false);
  const [csSaveMsg, setCsSaveMsg] = useState<string | null>(null);

  const saveCaseStudies = (list: CaseStudy[]) => {
    localStorage.setItem('yd_case_studies', JSON.stringify(list));
    setCsStudies(list);
    setCsSaveMsg('✓ Saved! Case studies updated live.');
    setTimeout(() => setCsSaveMsg(null), 3000);
  };
  const csResultsToRaw = (results: CaseStudy['results']) =>
    results.map(r => `${r.prefix ?? ''}${r.value}${r.suffix ?? ''} | ${r.label}`).join('\n');
  const rawToResults = (raw: string): CaseStudy['results'] =>
    raw.split('\n').filter(Boolean).map(line => {
      const [valPart, label] = line.split('|').map(s => s.trim());
      const prefixMatch = valPart.match(/^([^0-9]*)/);
      const suffixMatch = valPart.match(/[0-9.]+([^0-9.]*)$/);
      const numMatch = valPart.match(/[0-9.]+/);
      return {
        label: label || valPart,
        value: numMatch ? parseFloat(numMatch[0]) : 0,
        prefix: prefixMatch?.[1] || undefined,
        suffix: suffixMatch?.[1] || undefined,
      };
    });
  const startCsEdit = (idx: number) => {
    const s = csStudies[idx];
    setCsEditIdx(idx);
    setCsEditForm({ ...s, resultsRaw: csResultsToRaw(s.results) });
    setCsAddMode(false);
  };
  const startCsAdd = () => {
    setCsEditIdx(null);
    setCsEditForm({ id: `study-${Date.now()}`, client: '', industry: '', challenge: '', solution: '', serviceUsed: '', imageUrl: '', resultsRaw: '312% | Revenue Growth\n45% | CPA Reduction' });
    setCsAddMode(true);
  };
  const saveCsEdit = () => {
    const { resultsRaw, ...rest } = csEditForm as CaseStudy & { resultsRaw: string };
    const entry: CaseStudy = { ...rest as CaseStudy, results: rawToResults(resultsRaw) };
    let updated: CaseStudy[];
    if (csAddMode) { updated = [...csStudies, entry]; }
    else { updated = csStudies.map((s, i) => i === csEditIdx ? entry : s); }
    saveCaseStudies(updated);
    setCsEditIdx(null); setCsAddMode(false); setCsEditForm({});
  };
  const deleteCsStudy = (idx: number) => {
    if (!confirm('Delete this case study?')) return;
    saveCaseStudies(csStudies.filter((_, i) => i !== idx));
  };
  const resetCaseStudies = () => {
    if (!confirm('Reset to default case studies?')) return;
    localStorage.removeItem('yd_case_studies');
    setCsStudies(CASE_STUDIES);
    setCsSaveMsg('✓ Reset to defaults.');
    setTimeout(() => setCsSaveMsg(null), 3000);
  };

  // Insights state
  const [insights, setInsights] = useState<InsightMetric[]>(() => {
    try { const s = localStorage.getItem('yd_insights'); return s ? JSON.parse(s) : DEFAULT_INSIGHTS; } catch { return DEFAULT_INSIGHTS; }
  });
  const [insightEditIdx, setInsightEditIdx] = useState<number | null>(null);
  const [insightForm, setInsightForm] = useState<Partial<InsightMetric>>({});
  const [insightAddMode, setInsightAddMode] = useState(false);
  const [insightSaveMsg, setInsightSaveMsg] = useState<string | null>(null);

  const saveInsights = (list: InsightMetric[]) => {
    localStorage.setItem('yd_insights', JSON.stringify(list));
    setInsights(list);
    setInsightSaveMsg('✓ Saved! Insights updated live on homepage.');
    setTimeout(() => setInsightSaveMsg(null), 3000);
  };
  const startInsightEdit = (idx: number) => { setInsightEditIdx(idx); setInsightForm({ ...insights[idx] }); setInsightAddMode(false); };
  const startInsightAdd = () => { setInsightEditIdx(null); setInsightForm({ id: `insight-${Date.now()}`, iconName: 'Star', value: '', label: '' }); setInsightAddMode(true); };
  const saveInsightEdit = () => {
    const entry = insightForm as InsightMetric;
    let updated: InsightMetric[];
    if (insightAddMode) { updated = [...insights, entry]; }
    else { updated = insights.map((m, i) => i === insightEditIdx ? entry : m); }
    saveInsights(updated);
    setInsightEditIdx(null); setInsightAddMode(false); setInsightForm({});
  };
  const deleteInsight = (idx: number) => {
    if (!confirm('Delete this insight card?')) return;
    saveInsights(insights.filter((_, i) => i !== idx));
  };
  const resetInsights = () => {
    if (!confirm('Reset to default insight cards?')) return;
    localStorage.removeItem('yd_insights');
    setInsights(DEFAULT_INSIGHTS);
    setInsightSaveMsg('✓ Reset to defaults.');
    setTimeout(() => setInsightSaveMsg(null), 3000);
  };

  // Featured Testimonials state
  const [featuredT, setFeaturedT] = useState<Testimonial[]>(() => {
    try { const s = localStorage.getItem('yd_featured_testimonials'); return s ? JSON.parse(s) : TESTIMONIALS; } catch { return TESTIMONIALS; }
  });
  const [ftEditIdx, setFtEditIdx] = useState<number | null>(null);
  const [ftForm, setFtForm] = useState<Partial<Testimonial>>({});
  const [ftAddMode, setFtAddMode] = useState(false);
  const [ftSaveMsg, setFtSaveMsg] = useState<string | null>(null);
  const [ftHoverRating, setFtHoverRating] = useState(0);

  const saveFeatured = (list: Testimonial[]) => {
    localStorage.setItem('yd_featured_testimonials', JSON.stringify(list));
    setFeaturedT(list);
    setFtSaveMsg('✓ Saved! Homepage testimonials updated.');
    setTimeout(() => setFtSaveMsg(null), 3000);
  };
  const startFtEdit = (idx: number) => { setFtEditIdx(idx); setFtForm({ ...featuredT[idx] }); setFtAddMode(false); setFtHoverRating(0); };
  const startFtAdd = () => {
    setFtEditIdx(null);
    setFtForm({ id: `ft-${Date.now()}`, name: '', role: '', company: '', content: '', avatar: '', rating: 5 });
    setFtAddMode(true); setFtHoverRating(0);
  };
  const saveFtEdit = () => {
    const entry = { ...ftForm, avatar: ftForm.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(ftForm.name || 'U')}&background=7f1d1d&color=fff&bold=true&size=128` } as Testimonial;
    const updated = ftAddMode ? [...featuredT, entry] : featuredT.map((t, i) => i === ftEditIdx ? entry : t);
    saveFeatured(updated);
    setFtEditIdx(null); setFtAddMode(false); setFtForm({}); setFtHoverRating(0);
  };
  const deleteFt = (idx: number) => {
    if (!confirm('Delete this testimonial?')) return;
    saveFeatured(featuredT.filter((_, i) => i !== idx));
  };
  const resetFeatured = () => {
    if (!confirm('Reset to default testimonials?')) return;
    localStorage.removeItem('yd_featured_testimonials');
    setFeaturedT(TESTIMONIALS);
    setFtSaveMsg('✓ Reset to defaults.');
    setTimeout(() => setFtSaveMsg(null), 3000);
  };

  // Inline edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<TestimonialEntry>>({});
  const [editHoverRating, setEditHoverRating] = useState(0);
  const [editSaving, setEditSaving] = useState(false);

  const handleSuccess = () => console.log('Form submitted successfully');

  /* ── SERVICE EDITOR ──────────────────────────────── */
  const openServiceEditor = (slug: string) => {
    const data = loadOverride(slug) ?? loadSnapshot(slug);
    setServiceEditData(data ? JSON.parse(JSON.stringify(data)) : null);
    setSelectedServiceSlug(slug);
    setServiceEditSection('subservices');
    setEditingSubServiceIdx(null);
    setEditingPackageIdx(null);
    setServiceSaveMsg(null);
  };

  const saveServiceEdits = () => {
    if (!selectedServiceSlug || !serviceEditData) return;
    saveOverride(selectedServiceSlug, serviceEditData);
    setServiceSaveMsg('✓ Saved! Changes are live on the service page.');
    setTimeout(() => setServiceSaveMsg(null), 4000);
  };

  const resetServiceEdits = (slug: string) => {
    if (!confirm('Reset all customisations for this service and restore defaults?')) return;
    resetOverride(slug);
    const snap = loadSnapshot(slug);
    setServiceEditData(snap ? JSON.parse(JSON.stringify(snap)) : null);
    setServiceSaveMsg('✓ Reset to defaults.');
    setTimeout(() => setServiceSaveMsg(null), 3000);
  };

  const updateSubService = (idx: number, field: keyof SubServiceGig, value: string | string[]) => {
    if (!serviceEditData) return;
    const updated = [...serviceEditData.subServices];
    updated[idx] = { ...updated[idx], [field]: value };
    setServiceEditData({ ...serviceEditData, subServices: updated });
  };

  const updatePackage = (idx: number, field: keyof GigPackage, value: string | number | string[]) => {
    if (!serviceEditData) return;
    const updated = [...serviceEditData.packages] as [GigPackage, GigPackage, GigPackage];
    updated[idx] = { ...updated[idx], [field]: value };
    setServiceEditData({ ...serviceEditData, packages: updated });
  };

  /* ── SUBMISSIONS ─────────────────────────────────── */
  const fetchSubmissions = async () => {
    setSubLoading(true);
    setSubError(null);
    try {
      const response = await fetch(API_ENDPOINTS.getSubmissions(100));
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (data.success) setSubmissions(data.data);
      else setSubError('Failed to fetch submissions');
    } catch (err) {
      setSubError(`Cannot connect to server. Please make sure the backend is running.`);
    } finally {
      setSubLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(API_ENDPOINTS.updateStatus(id), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      if (data.success) {
        setSubmissions(prev => prev.map(s => s._id === id ? { ...s, status: newStatus as any } : s));
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  /* ── REVIEWS ──────────────────────────────────────── */
  const fetchReviews = async () => {
    setRevLoading(true);
    setRevError(null);
    try {
      const response = await fetch(API_ENDPOINTS.getTestimonials('all'));
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (data.success) setReviews(data.data);
      else setRevError('Failed to fetch reviews');
    } catch (err) {
      setRevError('Cannot connect to server. Please make sure the backend is running.');
    } finally {
      setRevLoading(false);
    }
  };

  const updateReviewStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const response = await fetch(API_ENDPOINTS.updateTestimonialStatus(id), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      if (data.success) {
        setReviews(prev => prev.map(r => r._id === id ? { ...r, status } : r));
      }
    } catch (err) {
      console.error('Error updating review:', err);
    }
  };

  const deleteReview = async (id: string) => {
    if (!confirm('Delete this review permanently?')) return;
    try {
      const response = await fetch(API_ENDPOINTS.deleteTestimonial(id), { method: 'DELETE' });
      const data = await response.json();
      if (data.success) setReviews(prev => prev.filter(r => r._id !== id));
    } catch (err) {
      console.error('Error deleting review:', err);
    }
  };

  const startEdit = (rev: TestimonialEntry) => {
    setEditingId(rev._id);
    setEditForm({
      name: rev.name,
      role: rev.role,
      company: rev.company,
      rating: rev.rating,
      content: rev.content,
      service: rev.service || '',
      status: rev.status,
    });
    setEditHoverRating(0);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
    setEditHoverRating(0);
  };

  const saveEdit = async (id: string) => {
    setEditSaving(true);
    try {
      const response = await fetch(API_ENDPOINTS.editTestimonial(id), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });
      const data = await response.json();
      if (data.success) {
        setReviews(prev => prev.map(r => r._id === id ? { ...r, ...editForm } as TestimonialEntry : r));
        cancelEdit();
      }
    } catch (err) {
      console.error('Error saving edit:', err);
    } finally {
      setEditSaving(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchSubmissions();
    fetchReviews();
  }, []);

  // Auto-refresh reviews every 30 s while the Reviews tab is active
  useEffect(() => {
    if (activeTab !== 'reviews') return;
    const interval = setInterval(fetchReviews, 30_000);
    return () => clearInterval(interval);
  }, [activeTab]);

  /* ── HELPERS ──────────────────────────────────────── */
  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

  const getStatusBadge = (status: string, type: 'sub' | 'rev' = 'sub') => {
    const subStyles: Record<string, string> = {
      new: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      contacted: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      scheduled: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      completed: 'bg-green-500/20 text-green-400 border-green-500/30',
    };
    const revStyles: Record<string, string> = {
      pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      approved: 'bg-green-500/20 text-green-400 border-green-500/30',
      rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
    };
    const styles = type === 'sub' ? subStyles : revStyles;
    const subIcons: Record<string, React.ElementType> = { new: Clock, contacted: MessageCircle, scheduled: Calendar, completed: CheckCircle2 };
    const revIcons: Record<string, React.ElementType> = { pending: Clock, approved: CheckCircle2, rejected: XCircle };
    const icons = type === 'sub' ? subIcons : revIcons;
    const Icon = icons[status] || Clock;
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${styles[status] || ''}`}>
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const filteredSubmissions = statusFilter === 'all' ? submissions : submissions.filter(s => s.status === statusFilter);
  const filteredReviews = revFilter === 'all' ? reviews : reviews.filter(r => r.status === revFilter);

  const subStats = {
    total: submissions.length,
    new: submissions.filter(s => s.status === 'new').length,
    contacted: submissions.filter(s => s.status === 'contacted').length,
    scheduled: submissions.filter(s => s.status === 'scheduled').length,
    completed: submissions.filter(s => s.status === 'completed').length,
  };

  const revStats = {
    total: reviews.length,
    pending: reviews.filter(r => r.status === 'pending').length,
    approved: reviews.filter(r => r.status === 'approved').length,
    rejected: reviews.filter(r => r.status === 'rejected').length,
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[var(--bg-primary)] dark:bg-[#030712] selection:bg-red-500/30 transition-colors duration-300">
        <CustomCursor />
        <Navigation onCtaClick={growthPlanModal.open} />

        <main className="pt-24 sm:pt-28 pb-12">
          <div className="container mx-auto px-4 sm:px-6 md:px-12">

            {/* Header */}
            <div className="mb-8">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200/60 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-500 transition-all duration-300 group mb-6"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-semibold">Back to Home</span>
              </button>

              <div className="flex items-start sm:items-center justify-between flex-wrap gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center">
                      <Database className="w-5 h-5 text-red-500" />
                    </div>
                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-heading font-black text-slate-900 dark:text-white">
                      Admin Panel
                    </h1>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">Manage submissions and client reviews</p>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    onClick={() => navigate('/admin/blog')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 hover:bg-purple-500 hover:text-white transition-all"
                  >
                    <FileText className="w-4 h-4" />
                    <span className="text-sm font-semibold">Manage Blog</span>
                  </button>
                  <button
                    onClick={() => { fetchSubmissions(); fetchReviews(); }}
                    disabled={subLoading || revLoading}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-red-500 dark:hover:bg-red-500 dark:hover:text-white transition-all disabled:opacity-50"
                  >
                    <RefreshCw className={`w-4 h-4 ${(subLoading || revLoading) ? 'animate-spin' : ''}`} />
                    <span className="text-sm font-semibold">Refresh</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-8 bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl w-fit flex-wrap">
              <button
                onClick={() => setActiveTab('submissions')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'submissions'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                <Database className="w-4 h-4" />
                Submissions
                <span className="ml-1 px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-500 text-[10px] font-black">{subStats.total}</span>
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'reviews'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                <MessageSquareQuote className="w-4 h-4" />
                Reviews
                {revStats.pending > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 rounded-full bg-yellow-500/20 text-yellow-500 text-[10px] font-black">{revStats.pending} pending</span>
                )}
                {activeTab === 'reviews' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" title="Auto-refreshing every 30s" />
                )}
              </button>
              <button
                onClick={() => { setActiveTab('services'); setSelectedServiceSlug(null); }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'services'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                <Layers className="w-4 h-4" />
                Services
              </button>
              <button
                onClick={() => { setActiveTab('casestudies'); setCsEditIdx(null); setCsAddMode(false); }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'casestudies'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                <BarChart2 className="w-4 h-4" />
                Case Studies
                <span className="ml-1 px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-500 text-[10px] font-black">{csStudies.length}</span>
              </button>
              <button
                onClick={() => { setActiveTab('insights'); setInsightEditIdx(null); setInsightAddMode(false); }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'insights'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                Insights
                <span className="ml-1 px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-500 text-[10px] font-black">{insights.length}</span>
              </button>
              <button
                onClick={() => { setActiveTab('featured'); setFtEditIdx(null); setFtAddMode(false); }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'featured'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                <MessageSquareQuote className="w-4 h-4" />
                Homepage Reviews
                <span className="ml-1 px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-500 text-[10px] font-black">{featuredT.length}</span>
              </button>
            </div>

            {/* ── SUBMISSIONS TAB ── */}
            {activeTab === 'submissions' && (
              <>
                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8">
                  {[
                    { label: 'Total', value: subStats.total, cls: 'bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white' },
                    { label: 'New', value: subStats.new, cls: 'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400' },
                    { label: 'Contacted', value: subStats.contacted, cls: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-600 dark:text-yellow-400' },
                    { label: 'Scheduled', value: subStats.scheduled, cls: 'bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400' },
                    { label: 'Completed', value: subStats.completed, cls: 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400' },
                  ].map(({ label, value, cls }) => (
                    <div key={label} className={`p-3 sm:p-4 border rounded-xl ${cls}`}>
                      <div className="text-xl sm:text-2xl font-black">{value}</div>
                      <div className="text-xs font-semibold uppercase tracking-wider mt-1 opacity-80">{label}</div>
                    </div>
                  ))}
                </div>

                {/* Filter */}
                <div className="mb-6 flex items-center gap-3 flex-wrap">
                  <Filter className="w-4 h-4 text-slate-500" />
                  <div className="flex gap-2 flex-wrap">
                    {['all', 'new', 'contacted', 'scheduled', 'completed'].map(s => (
                      <button key={s} onClick={() => setStatusFilter(s)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${statusFilter === s ? 'bg-red-500 text-white' : 'bg-white/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {subError && <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-600 dark:text-red-400 mb-6">{subError}</div>}
                {subLoading && <div className="text-center py-12"><RefreshCw className="w-8 h-8 animate-spin text-slate-400 mx-auto mb-4" /><p className="text-slate-500">Loading submissions...</p></div>}

                {!subLoading && !subError && (
                  <div className="space-y-4">
                    {filteredSubmissions.length === 0 ? (
                      <div className="text-center py-12 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                        <Database className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                        <p className="text-slate-500">No submissions found</p>
                      </div>
                    ) : filteredSubmissions.map(sub => (
                      <div key={sub._id} className="bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                          <div className="flex-1 space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                              <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                                  <User className="w-5 h-5 text-red-500" />
                                </div>
                                <div>
                                  <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">{sub.firstName} {sub.lastName}</h3>
                                  <div className="flex items-center gap-2 mt-1"><Mail className="w-3 h-3 text-slate-500" /><span className="text-sm text-slate-500 break-all">{sub.email}</span></div>
                                </div>
                              </div>
                              {getStatusBadge(sub.status, 'sub')}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {sub.phone && <div><p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Phone</p><p className="text-sm text-slate-900 dark:text-white font-medium">{sub.phone}</p></div>}
                              {sub.company && <div><p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Company</p><p className="text-sm text-slate-900 dark:text-white font-medium">{sub.company}</p></div>}
                              <div><p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Service</p><p className="text-sm text-slate-900 dark:text-white font-medium">{sub.serviceInterest}</p></div>
                              <div><p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Budget</p><p className="text-sm text-slate-900 dark:text-white font-medium">{sub.estimatedBudget}</p></div>
                              {sub.subOptions && sub.subOptions.length > 0 && (
                                <div><p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Sub-Options</p>
                                  <div className="flex flex-wrap gap-1.5">{sub.subOptions.map((o, i) => <span key={i} className="px-2 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-xs text-red-500 font-medium">{o}</span>)}</div>
                                </div>
                              )}
                              <div className="sm:col-span-2"><p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Project Description</p><p className="text-sm text-slate-900 dark:text-white">{sub.projectDescription}</p></div>
                              <div><p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Submitted</p><p className="text-sm text-slate-900 dark:text-white">{formatDate(sub.submittedAt)}</p></div>
                            </div>
                          </div>
                          <div className="lg:w-48 flex-shrink-0">
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Update Status</p>
                            <select value={sub.status} onChange={e => updateStatus(sub._id, e.target.value)}
                              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-red-500 outline-none">
                              {['new', 'contacted', 'scheduled', 'completed'].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* ── REVIEWS TAB ── */}
            {activeTab === 'reviews' && (
              <>
                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
                  {[
                    { label: 'Total', value: revStats.total, cls: 'bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white' },
                    { label: 'Pending', value: revStats.pending, cls: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-600 dark:text-yellow-400' },
                    { label: 'Approved', value: revStats.approved, cls: 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400' },
                    { label: 'Rejected', value: revStats.rejected, cls: 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400' },
                  ].map(({ label, value, cls }) => (
                    <div key={label} className={`p-3 sm:p-4 border rounded-xl ${cls}`}>
                      <div className="text-xl sm:text-2xl font-black">{value}</div>
                      <div className="text-xs font-semibold uppercase tracking-wider mt-1 opacity-80">{label}</div>
                    </div>
                  ))}
                </div>

                {/* Filter */}
                <div className="mb-6 flex items-center gap-3 flex-wrap">
                  <Filter className="w-4 h-4 text-slate-500" />
                  <div className="flex gap-2 flex-wrap">
                    {['all', 'pending', 'approved', 'rejected'].map(s => (
                      <button key={s} onClick={() => setRevFilter(s)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${revFilter === s ? 'bg-red-500 text-white' : 'bg-white/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {revError && <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-600 dark:text-red-400 mb-6">{revError}</div>}
                {revLoading && <div className="text-center py-12"><RefreshCw className="w-8 h-8 animate-spin text-slate-400 mx-auto mb-4" /><p className="text-slate-500">Loading reviews...</p></div>}

                {!revLoading && !revError && (
                  <div className="space-y-4">
                    {filteredReviews.length === 0 ? (
                      <div className="text-center py-12 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                        <MessageSquareQuote className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                        <p className="text-slate-500">No reviews found</p>
                      </div>
                    ) : filteredReviews.map(rev => {
                      const isEditing = editingId === rev._id;
                      return (
                      <div key={rev._id} className={`border rounded-xl p-4 sm:p-6 transition-all ${isEditing ? 'bg-slate-800/80 border-red-500/40 shadow-[0_0_20px_rgba(239,68,68,0.1)]' : 'bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:shadow-lg'}`}>

                        {isEditing ? (
                          /* ── EDIT MODE ── */
                          <div className="space-y-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2"><Pencil className="w-4 h-4 text-red-500" /> Editing Review</h4>
                              <button onClick={cancelEdit} className="w-7 h-7 rounded-full bg-slate-700 hover:bg-red-500 flex items-center justify-center text-slate-300 hover:text-white transition-all"><X className="w-3.5 h-3.5" /></button>
                            </div>

                            {/* Name + Role */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Name</label>
                                <input value={editForm.name || ''} onChange={e => setEditForm(p => ({...p, name: e.target.value}))}
                                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-sm text-white placeholder:text-slate-500 focus:border-red-500/50 focus:outline-none" />
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Role / Title</label>
                                <input value={editForm.role || ''} onChange={e => setEditForm(p => ({...p, role: e.target.value}))}
                                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-sm text-white focus:border-red-500/50 focus:outline-none" />
                              </div>
                            </div>

                            {/* Company + Service */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Company</label>
                                <input value={editForm.company || ''} onChange={e => setEditForm(p => ({...p, company: e.target.value}))}
                                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-sm text-white focus:border-red-500/50 focus:outline-none" />
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Service Used</label>
                                <select value={editForm.service || ''} onChange={e => setEditForm(p => ({...p, service: e.target.value}))}
                                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-sm text-white focus:border-red-500/50 focus:outline-none appearance-none cursor-pointer">
                                  <option value="">None</option>
                                  {SERVICES.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                                </select>
                              </div>
                            </div>

                            {/* Rating + Status */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
                              <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Rating</label>
                                <div className="flex items-center gap-1">
                                  {[1,2,3,4,5].map(s => (
                                    <button key={s} type="button"
                                      onClick={() => setEditForm(p => ({...p, rating: s}))}
                                      onMouseEnter={() => setEditHoverRating(s)}
                                      onMouseLeave={() => setEditHoverRating(0)}
                                      className="transition-transform hover:scale-125">
                                      <Star className={`w-6 h-6 transition-colors ${s <= (editHoverRating || (editForm.rating ?? 0)) ? 'text-red-500 fill-red-500' : 'text-slate-600 fill-slate-700'}`} />
                                    </button>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Status</label>
                                <select value={editForm.status || 'pending'} onChange={e => setEditForm(p => ({...p, status: e.target.value as any}))}
                                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-sm text-white focus:border-red-500/50 focus:outline-none appearance-none cursor-pointer">
                                  <option value="pending">Pending</option>
                                  <option value="approved">Approved</option>
                                  <option value="rejected">Rejected</option>
                                </select>
                              </div>
                            </div>

                            {/* Review Text */}
                            <div>
                              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Review Text</label>
                              <textarea value={editForm.content || ''} onChange={e => setEditForm(p => ({...p, content: e.target.value}))}
                                rows={4} className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-sm text-white focus:border-red-500/50 focus:outline-none resize-none" />
                            </div>

                            {/* Save / Cancel */}
                            <div className="flex items-center gap-3 pt-1">
                              <button onClick={() => saveEdit(rev._id)} disabled={editSaving}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-all disabled:opacity-50">
                                <Save className="w-4 h-4" /> {editSaving ? 'Saving...' : 'Save Changes'}
                              </button>
                              <button onClick={cancelEdit} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 font-bold text-sm transition-all">
                                <X className="w-4 h-4" /> Cancel
                              </button>
                              <button onClick={() => deleteReview(rev._id)}
                                className="ml-auto flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white font-bold text-sm transition-all">
                                <Trash2 className="w-4 h-4" /> Delete
                              </button>
                            </div>
                          </div>
                        ) : (
                          /* ── VIEW MODE ── */
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                            <div className="flex-1 space-y-3">
                              {/* Top row */}
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                <div className="flex items-start gap-3">
                                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                                    <User className="w-5 h-5 text-red-500" />
                                  </div>
                                  <div>
                                    <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">{rev.name}</h3>
                                    <p className="text-sm text-slate-500">{rev.role} · {rev.company}</p>
                                    <div className="flex items-center gap-1 mt-1"><Mail className="w-3 h-3 text-slate-500" /><span className="text-xs text-slate-500">{rev.email}</span></div>
                                  </div>
                                </div>
                                {getStatusBadge(rev.status, 'rev')}
                              </div>

                              {/* Stars */}
                              <div className="flex items-center gap-1">
                                {[1,2,3,4,5].map(s => (
                                  <Star key={s} className={`w-4 h-4 ${s <= rev.rating ? 'text-red-500 fill-red-500' : 'text-slate-300 dark:text-slate-600'}`} />
                                ))}
                                <span className="text-xs text-slate-500 ml-1">{rev.rating}/5</span>
                              </div>

                              {/* Review */}
                              <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed border-l-2 border-red-500/30 pl-3">
                                "{rev.content}"
                              </p>

                              {/* Meta */}
                              <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                                {rev.service && <span>Service: <span className="text-slate-700 dark:text-slate-300 font-medium">{rev.service}</span></span>}
                                <span>Submitted: <span className="text-slate-700 dark:text-slate-300 font-medium">{formatDate(rev.submittedAt)}</span></span>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex lg:flex-col gap-2 flex-shrink-0 lg:w-36">
                              <button onClick={() => startEdit(rev)}
                                className="flex-1 lg:flex-none flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-400 hover:bg-blue-500 hover:text-white text-xs font-bold transition-all">
                                <Pencil className="w-3.5 h-3.5" /> Edit
                              </button>
                              {rev.status !== 'approved' && (
                                <button onClick={() => updateReviewStatus(rev._id, 'approved')}
                                  className="flex-1 lg:flex-none flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400 hover:bg-green-500 hover:text-white text-xs font-bold transition-all">
                                  <ThumbsUp className="w-3.5 h-3.5" /> Approve
                                </button>
                              )}
                              {rev.status !== 'rejected' && (
                                <button onClick={() => updateReviewStatus(rev._id, 'rejected')}
                                  className="flex-1 lg:flex-none flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500 hover:text-white text-xs font-bold transition-all">
                                  <ThumbsDown className="w-3.5 h-3.5" /> Reject
                                </button>
                              )}
                              <button onClick={() => deleteReview(rev._id)}
                                className="flex-1 lg:flex-none flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white text-xs font-bold transition-all">
                                <Trash2 className="w-3.5 h-3.5" /> Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}

            {/* ── SERVICES TAB ── */}
            {activeTab === 'services' && (
              <>
                {!selectedServiceSlug ? (
                  /* ── Service List ── */
                  <>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                      Select a service to edit its cards, descriptions, images, features and pricing packages.
                      <span className="block mt-1 text-xs text-amber-500 dark:text-amber-400">
                        ⚠ Visit each service page at least once to load its default data before editing.
                      </span>
                    </p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {ALL_SERVICE_SLUGS.map(svc => {
                        const snap = loadSnapshot(svc.slug);
                        const overridden = hasOverride(svc.slug);
                        return (
                          <div key={svc.slug} className="bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-5 flex flex-col gap-3 hover:shadow-lg transition-all">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h3 className="font-bold text-slate-900 dark:text-white text-sm">{svc.name}</h3>
                                <p className="text-xs text-slate-500 mt-0.5">{svc.path}</p>
                              </div>
                              {overridden && (
                                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-500 text-[10px] font-black border border-amber-500/30 flex-shrink-0">
                                  Edited
                                </span>
                              )}
                            </div>
                            {snap ? (
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                {snap.subServices.length} sub-services · {snap.packages.length} packages
                              </p>
                            ) : (
                              <p className="text-xs text-amber-500">Not initialised yet</p>
                            )}
                            <div className="flex gap-2 mt-auto">
                              <button
                                onClick={() => openServiceEditor(svc.slug)}
                                disabled={!snap}
                                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                              >
                                <Pencil className="w-3.5 h-3.5" /> Edit
                              </button>
                              <a
                                href={svc.path}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-blue-500/10 hover:border-blue-500/30 hover:text-blue-500 text-xs font-bold transition-all"
                                title="Open page to initialise"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                              {overridden && (
                                <button
                                  onClick={() => resetServiceEdits(svc.slug)}
                                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-500 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-500 text-xs font-bold transition-all"
                                  title="Reset to defaults"
                                >
                                  <RotateCcw className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  /* ── Service Editor ── */
                  <>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setSelectedServiceSlug(null)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-red-500/30 hover:text-red-500 text-sm font-bold transition-all"
                        >
                          <ArrowLeft className="w-4 h-4" /> All Services
                        </button>
                        <h3 className="text-lg font-black text-slate-900 dark:text-white">
                          {ALL_SERVICE_SLUGS.find(s => s.slug === selectedServiceSlug)?.name}
                        </h3>
                        {hasOverride(selectedServiceSlug) && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-500 text-[10px] font-black border border-amber-500/30">Edited</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {serviceSaveMsg && (
                          <span className="text-sm text-emerald-500 font-bold">{serviceSaveMsg}</span>
                        )}
                        <button
                          onClick={() => resetServiceEdits(selectedServiceSlug)}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:text-red-500 text-sm font-bold transition-all"
                        >
                          <RotateCcw className="w-4 h-4" /> Reset
                        </button>
                        <button
                          onClick={saveServiceEdits}
                          disabled={!serviceEditData}
                          className="flex items-center gap-2 px-5 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm font-bold transition-all disabled:opacity-40"
                        >
                          <Save className="w-4 h-4" /> Save Changes
                        </button>
                      </div>
                    </div>

                    {!serviceEditData ? (
                      <div className="text-center py-16 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                        <Layers className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                        <p className="text-slate-500 font-medium mb-2">No data loaded yet</p>
                        <p className="text-sm text-slate-400">
                          Visit{' '}
                          <a
                            href={ALL_SERVICE_SLUGS.find(s => s.slug === selectedServiceSlug)?.path}
                            target="_blank"
                            rel="noreferrer"
                            className="text-red-500 hover:underline"
                          >
                            {ALL_SERVICE_SLUGS.find(s => s.slug === selectedServiceSlug)?.path}
                          </a>{' '}
                          to initialise the data, then come back.
                        </p>
                      </div>
                    ) : (
                      <>
                        {/* Section tabs */}
                        <div className="flex gap-1 mb-6 bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl w-fit flex-wrap">
                          {(['overview', 'subservices', 'packages'] as const).map(sec => (
                            <button
                              key={sec}
                              onClick={() => { setServiceEditSection(sec); setEditingSubServiceIdx(null); setEditingPackageIdx(null); }}
                              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                                serviceEditSection === sec
                                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow'
                                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                              }`}
                            >
                              {sec === 'overview' && <FileText className="w-3.5 h-3.5" />}
                              {sec === 'subservices' && <Layers className="w-3.5 h-3.5" />}
                              {sec === 'packages' && <Package className="w-3.5 h-3.5" />}
                              {sec === 'overview' ? 'Overview' : sec === 'subservices' ? 'Service Cards' : 'Packages'}
                            </button>
                          ))}
                        </div>

                        {/* ── OVERVIEW ── */}
                        {serviceEditSection === 'overview' && (
                          <div className="space-y-4 max-w-2xl">
                            <div>
                              <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">Service Name</label>
                              <input
                                value={serviceEditData.serviceName}
                                onChange={e => setServiceEditData({ ...serviceEditData, serviceName: e.target.value })}
                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 px-4 text-sm text-slate-900 dark:text-white focus:border-red-500 outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">Tagline</label>
                              <textarea
                                value={serviceEditData.tagline}
                                onChange={e => setServiceEditData({ ...serviceEditData, tagline: e.target.value })}
                                rows={2}
                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 px-4 text-sm text-slate-900 dark:text-white focus:border-red-500 outline-none resize-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">About (service overview paragraph)</label>
                              <textarea
                                value={serviceEditData.about}
                                onChange={e => setServiceEditData({ ...serviceEditData, about: e.target.value })}
                                rows={5}
                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 px-4 text-sm text-slate-900 dark:text-white focus:border-red-500 outline-none resize-none"
                              />
                            </div>
                          </div>
                        )}

                        {/* ── SUB-SERVICES ── */}
                        {serviceEditSection === 'subservices' && (
                          <div className="space-y-3">
                            {serviceEditData.subServices.map((sub, idx) => (
                              <div key={sub.id} className={`border rounded-xl overflow-hidden transition-all ${editingSubServiceIdx === idx ? 'border-red-500/40 bg-slate-50 dark:bg-slate-800/80' : 'border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/30'}`}>
                                {/* Card header */}
                                <button
                                  onClick={() => setEditingSubServiceIdx(editingSubServiceIdx === idx ? null : idx)}
                                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
                                >
                                  <div className="flex items-center gap-3">
                                    {sub.image && (
                                      <img src={sub.image} alt="" className="w-12 h-9 rounded-lg object-cover flex-shrink-0" />
                                    )}
                                    <div>
                                      <p className="font-bold text-sm text-slate-900 dark:text-white">{sub.name}</p>
                                      <p className="text-xs text-slate-500 truncate max-w-xs">{sub.description.slice(0, 80)}…</p>
                                    </div>
                                    {sub.badge && (
                                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-black border border-amber-500/30">{sub.badge}</span>
                                    )}
                                  </div>
                                  {editingSubServiceIdx === idx ? <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />}
                                </button>

                                {/* Edit form */}
                                {editingSubServiceIdx === idx && (
                                  <div className="px-5 pb-6 pt-2 border-t border-slate-200 dark:border-slate-700 space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                      <div>
                                        <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">Card Title</label>
                                        <input
                                          value={sub.name}
                                          onChange={e => updateSubService(idx, 'name', e.target.value)}
                                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-red-500 outline-none"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">Badge (leave blank for none)</label>
                                        <select
                                          value={sub.badge ?? ''}
                                          onChange={e => updateSubService(idx, 'badge', e.target.value)}
                                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-red-500 outline-none"
                                        >
                                          <option value="">None</option>
                                          <option value="Bestseller">Bestseller</option>
                                          <option value="Most Popular">Most Popular</option>
                                          <option value="Hot">Hot</option>
                                          <option value="New">New</option>
                                        </select>
                                      </div>
                                    </div>

                                    <div>
                                      <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">
                                        <Image className="w-3 h-3 inline mr-1" />Image URL
                                      </label>
                                      <input
                                        value={sub.image}
                                        onChange={e => updateSubService(idx, 'image', e.target.value)}
                                        placeholder="https://..."
                                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-red-500 outline-none font-mono"
                                      />
                                      {sub.image && <img src={sub.image} alt="preview" className="mt-2 h-24 w-full object-cover rounded-lg border border-slate-200 dark:border-slate-700" />}
                                    </div>

                                    <div>
                                      <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">Short Description (card)</label>
                                      <textarea
                                        value={sub.description}
                                        onChange={e => updateSubService(idx, 'description', e.target.value)}
                                        rows={2}
                                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-red-500 outline-none resize-none"
                                      />
                                    </div>

                                    <div>
                                      <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">Full Description (detail page)</label>
                                      <textarea
                                        value={sub.detailDescription ?? ''}
                                        onChange={e => updateSubService(idx, 'detailDescription', e.target.value)}
                                        rows={4}
                                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-red-500 outline-none resize-none"
                                      />
                                    </div>

                                    <div>
                                      <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">Features (one per line)</label>
                                      <textarea
                                        value={sub.features.join('\n')}
                                        onChange={e => updateSubService(idx, 'features', e.target.value.split('\n').filter(Boolean))}
                                        rows={4}
                                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-red-500 outline-none resize-none font-mono"
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* ── PACKAGES ── */}
                        {serviceEditSection === 'packages' && (
                          <div className="space-y-4">
                            {serviceEditData.packages.map((pkg, idx) => (
                              <div key={idx} className={`border rounded-xl overflow-hidden transition-all ${editingPackageIdx === idx ? 'border-red-500/40 bg-slate-50 dark:bg-slate-800/80' : 'border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/30'}`}>
                                <button
                                  onClick={() => setEditingPackageIdx(editingPackageIdx === idx ? null : idx)}
                                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
                                >
                                  <div className="flex items-center gap-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${idx === 0 ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300' : idx === 1 ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30' : 'bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30'}`}>
                                      {pkg.name}
                                    </span>
                                    <span className="font-bold text-slate-900 dark:text-white">${pkg.price}</span>
                                    <span className="text-xs text-slate-500">{pkg.delivery} delivery · {pkg.revisions} revisions</span>
                                  </div>
                                  {editingPackageIdx === idx ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                                </button>

                                {editingPackageIdx === idx && (
                                  <div className="px-5 pb-6 pt-2 border-t border-slate-200 dark:border-slate-700 space-y-4">
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                      <div>
                                        <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">Price ($)</label>
                                        <input
                                          type="number"
                                          value={pkg.price}
                                          onChange={e => updatePackage(idx, 'price', Number(e.target.value))}
                                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-red-500 outline-none"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">Original ($)</label>
                                        <input
                                          type="number"
                                          value={pkg.originalPrice}
                                          onChange={e => updatePackage(idx, 'originalPrice', Number(e.target.value))}
                                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-red-500 outline-none"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">Delivery</label>
                                        <input
                                          value={pkg.delivery}
                                          onChange={e => updatePackage(idx, 'delivery', e.target.value)}
                                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-red-500 outline-none"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">Revisions</label>
                                        <input
                                          value={pkg.revisions}
                                          onChange={e => updatePackage(idx, 'revisions', e.target.value)}
                                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-red-500 outline-none"
                                        />
                                      </div>
                                    </div>

                                    <div>
                                      <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">Package Label (e.g. "Growth")</label>
                                      <input
                                        value={pkg.label}
                                        onChange={e => updatePackage(idx, 'label', e.target.value)}
                                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-red-500 outline-none"
                                      />
                                    </div>

                                    <div>
                                      <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">Package Description</label>
                                      <textarea
                                        value={pkg.description}
                                        onChange={e => updatePackage(idx, 'description', e.target.value)}
                                        rows={2}
                                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-red-500 outline-none resize-none"
                                      />
                                    </div>

                                    <div>
                                      <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">Package Features (one per line)</label>
                                      <textarea
                                        value={pkg.features.join('\n')}
                                        onChange={e => updatePackage(idx, 'features', e.target.value.split('\n').filter(Boolean))}
                                        rows={6}
                                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-red-500 outline-none resize-none font-mono"
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Save reminder */}
                        <div className="mt-8 flex items-center justify-between p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                          <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                            Remember to click <strong>Save Changes</strong> to apply your edits to the live service pages.
                          </p>
                          <button
                            onClick={saveServiceEdits}
                            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm font-bold transition-all"
                          >
                            <Save className="w-4 h-4" /> Save Changes
                          </button>
                        </div>
                      </>
                    )}
                  </>
                )}
              </>
            )}

            {/* ── CASE STUDIES TAB ── */}
            {activeTab === 'casestudies' && (
              <>
                <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Add, edit or remove case studies displayed on the Case Studies page.</p>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    {csSaveMsg && <span className="text-sm text-emerald-500 font-bold">{csSaveMsg}</span>}
                    <button onClick={resetCaseStudies} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:text-red-500 text-sm font-bold transition-all">
                      <RotateCcw className="w-4 h-4" /> Reset Defaults
                    </button>
                    <button onClick={startCsAdd} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm font-bold transition-all">
                      <Plus className="w-4 h-4" /> Add Case Study
                    </button>
                  </div>
                </div>

                {/* Add form */}
                {csAddMode && (
                  <div className="mb-6 border border-red-500/40 bg-slate-50 dark:bg-slate-800/80 rounded-xl p-5 space-y-4">
                    <h4 className="font-black text-slate-900 dark:text-white text-sm uppercase tracking-wider flex items-center gap-2"><Plus className="w-4 h-4 text-red-500" /> New Case Study</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {(['client','industry','serviceUsed'] as const).map(field => (
                        <div key={field}>
                          <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">{field === 'serviceUsed' ? 'Service Used' : field.charAt(0).toUpperCase()+field.slice(1)}</label>
                          <input value={(csEditForm as any)[field] ?? ''} onChange={e => setCsEditForm(p => ({...p, [field]: e.target.value}))}
                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-red-500 outline-none" />
                        </div>
                      ))}
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">Image URL</label>
                        <input value={csEditForm.imageUrl ?? ''} onChange={e => setCsEditForm(p => ({...p, imageUrl: e.target.value}))}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-red-500 outline-none font-mono" />
                      </div>
                    </div>
                    {(['challenge','solution'] as const).map(field => (
                      <div key={field}>
                        <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">{field.charAt(0).toUpperCase()+field.slice(1)}</label>
                        <textarea value={(csEditForm as any)[field] ?? ''} onChange={e => setCsEditForm(p => ({...p, [field]: e.target.value}))} rows={2}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-red-500 outline-none resize-none" />
                      </div>
                    ))}
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1">
                        Results Metrics <span className="normal-case font-normal text-slate-400">(one per line: <code>312% | Revenue Growth</code>)</span>
                      </label>
                      <textarea value={(csEditForm as any).resultsRaw ?? ''} onChange={e => setCsEditForm(p => ({...p, resultsRaw: e.target.value}))} rows={4}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-red-500 outline-none resize-none font-mono" />
                    </div>
                    <div className="flex gap-3 pt-1">
                      <button onClick={saveCsEdit} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-sm"><Save className="w-4 h-4" /> Save</button>
                      <button onClick={() => setCsAddMode(false)} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm"><X className="w-4 h-4" /> Cancel</button>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {csStudies.map((study, idx) => (
                    <div key={study.id} className={`border rounded-xl overflow-hidden transition-all ${csEditIdx === idx ? 'border-red-500/40 bg-slate-50 dark:bg-slate-800/80' : 'border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/30'}`}>
                      <button onClick={() => csEditIdx === idx ? setCsEditIdx(null) : startCsEdit(idx)}
                        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                        <div className="flex items-center gap-4">
                          {study.imageUrl && <img src={study.imageUrl} alt="" className="w-16 h-11 rounded-lg object-cover flex-shrink-0" />}
                          <div>
                            <p className="font-bold text-sm text-slate-900 dark:text-white">{study.client}</p>
                            <p className="text-xs text-slate-500">{study.industry} · {study.serviceUsed}</p>
                          </div>
                          <div className="hidden sm:flex gap-2 flex-wrap">
                            {study.results.slice(0,2).map((r,ri) => (
                              <span key={ri} className="px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black">
                                {r.prefix}{r.value}{r.suffix} {r.label}
                              </span>
                            ))}
                          </div>
                        </div>
                        {csEditIdx === idx ? <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />}
                      </button>

                      {csEditIdx === idx && (
                        <div className="px-5 pb-6 pt-2 border-t border-slate-200 dark:border-slate-700 space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {(['client','industry','serviceUsed'] as const).map(field => (
                              <div key={field}>
                                <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">{field === 'serviceUsed' ? 'Service Used' : field.charAt(0).toUpperCase()+field.slice(1)}</label>
                                <input value={(csEditForm as any)[field] ?? ''} onChange={e => setCsEditForm(p => ({...p, [field]: e.target.value}))}
                                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-red-500 outline-none" />
                              </div>
                            ))}
                            <div>
                              <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">Image URL</label>
                              <input value={csEditForm.imageUrl ?? ''} onChange={e => setCsEditForm(p => ({...p, imageUrl: e.target.value}))}
                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-red-500 outline-none font-mono" />
                              {csEditForm.imageUrl && <img src={csEditForm.imageUrl} alt="preview" className="mt-2 h-20 w-full object-cover rounded-lg border border-slate-200 dark:border-slate-700" />}
                            </div>
                          </div>
                          {(['challenge','solution'] as const).map(field => (
                            <div key={field}>
                              <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">{field.charAt(0).toUpperCase()+field.slice(1)}</label>
                              <textarea value={(csEditForm as any)[field] ?? ''} onChange={e => setCsEditForm(p => ({...p, [field]: e.target.value}))} rows={2}
                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-red-500 outline-none resize-none" />
                            </div>
                          ))}
                          <div>
                            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1">
                              Results Metrics <span className="normal-case font-normal text-slate-400">(one per line: <code>312% | Revenue Growth</code>)</span>
                            </label>
                            <textarea value={(csEditForm as any).resultsRaw ?? ''} onChange={e => setCsEditForm(p => ({...p, resultsRaw: e.target.value}))} rows={4}
                              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-red-500 outline-none resize-none font-mono" />
                          </div>
                          <div className="flex gap-3 pt-1">
                            <button onClick={saveCsEdit} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-sm"><Save className="w-4 h-4" /> Save</button>
                            <button onClick={() => { setCsEditIdx(null); setCsEditForm({}); }} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm"><X className="w-4 h-4" /> Cancel</button>
                            <button onClick={() => deleteCsStudy(idx)} className="ml-auto flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white font-bold text-sm"><Trash2 className="w-4 h-4" /> Delete</button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ── INSIGHTS TAB ── */}
            {activeTab === 'insights' && (
              <>
                <div className="flex items-center justify-between mb-2 flex-wrap gap-3">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Edit the stat cards shown in the <strong>"Trusted by Industry Leaders"</strong> section on the homepage.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    {insightSaveMsg && <span className="text-sm text-emerald-500 font-bold">{insightSaveMsg}</span>}
                    <button onClick={resetInsights} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:text-red-500 text-sm font-bold transition-all">
                      <RotateCcw className="w-4 h-4" /> Reset Defaults
                    </button>
                    <button onClick={startInsightAdd} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm font-bold transition-all">
                      <Plus className="w-4 h-4" /> Add Card
                    </button>
                  </div>
                </div>

                {/* Live preview hint */}
                <div className="mb-6 p-3 bg-blue-500/5 border border-blue-500/20 rounded-xl flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                    Changes are <strong>instant</strong> — save and refresh the homepage to see them live.
                  </p>
                </div>

                {/* Add form */}
                {insightAddMode && (
                  <div className="mb-6 border border-red-500/40 bg-slate-50 dark:bg-slate-800/80 rounded-xl p-5 space-y-4">
                    <h4 className="font-black text-slate-900 dark:text-white text-sm uppercase tracking-wider flex items-center gap-2">
                      <Plus className="w-4 h-4 text-red-500" /> New Insight Card
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">Value (e.g. 98%)</label>
                        <input value={insightForm.value ?? ''} onChange={e => setInsightForm(p => ({...p, value: e.target.value}))}
                          placeholder="10+" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-red-500 outline-none font-bold" />
                      </div>
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">Label</label>
                        <input value={insightForm.label ?? ''} onChange={e => setInsightForm(p => ({...p, label: e.target.value.toUpperCase()}))}
                          placeholder="BRANDS SCALED" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-red-500 outline-none uppercase" />
                      </div>
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">Icon</label>
                        <select value={insightForm.iconName ?? 'Star'} onChange={e => setInsightForm(p => ({...p, iconName: e.target.value as InsightIconName}))}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-red-500 outline-none">
                          {(Object.keys(INSIGHT_ICONS) as InsightIconName[]).map(name => (
                            <option key={name} value={name}>{name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {/* Preview */}
                    {insightForm.value && (
                      <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 w-fit">
                        {(() => { const Icon = INSIGHT_ICONS[insightForm.iconName ?? 'Star']; return <Icon className="w-6 h-6 text-red-500" />; })()}
                        <div>
                          <div className="text-xl font-black text-slate-900 dark:text-white">{insightForm.value}</div>
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{insightForm.label}</div>
                        </div>
                      </div>
                    )}
                    <div className="flex gap-3 pt-1">
                      <button onClick={saveInsightEdit} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-sm"><Save className="w-4 h-4" /> Save</button>
                      <button onClick={() => setInsightAddMode(false)} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm"><X className="w-4 h-4" /> Cancel</button>
                    </div>
                  </div>
                )}

                {/* Cards grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {insights.map((metric, idx) => {
                    const Icon = INSIGHT_ICONS[metric.iconName] ?? INSIGHT_ICONS['Star'];
                    const isEditing = insightEditIdx === idx;
                    return (
                      <div key={metric.id} className={`border rounded-xl overflow-hidden transition-all ${isEditing ? 'border-red-500/40 bg-slate-50 dark:bg-slate-800/80' : 'border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/30'}`}>
                        {/* Card preview */}
                        <button onClick={() => isEditing ? setInsightEditIdx(null) : startInsightEdit(idx)}
                          className="w-full flex items-center gap-4 px-4 py-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                          <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-red-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xl font-black text-slate-900 dark:text-white">{metric.value}</div>
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate">{metric.label}</div>
                          </div>
                          {isEditing ? <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />}
                        </button>

                        {/* Edit form */}
                        {isEditing && (
                          <div className="px-4 pb-5 pt-2 border-t border-slate-200 dark:border-slate-700 space-y-3">
                            <div>
                              <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1">Value</label>
                              <input value={insightForm.value ?? ''} onChange={e => setInsightForm(p => ({...p, value: e.target.value}))}
                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm font-bold text-slate-900 dark:text-white focus:border-red-500 outline-none" />
                            </div>
                            <div>
                              <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1">Label</label>
                              <input value={insightForm.label ?? ''} onChange={e => setInsightForm(p => ({...p, label: e.target.value.toUpperCase()}))}
                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-red-500 outline-none uppercase" />
                            </div>
                            <div>
                              <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1">Icon</label>
                              <select value={insightForm.iconName ?? 'Star'} onChange={e => setInsightForm(p => ({...p, iconName: e.target.value as InsightIconName}))}
                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-red-500 outline-none">
                                {(Object.keys(INSIGHT_ICONS) as InsightIconName[]).map(name => (
                                  <option key={name} value={name}>{name}</option>
                                ))}
                              </select>
                            </div>
                            {/* Live preview */}
                            <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                              {(() => { const PreviewIcon = INSIGHT_ICONS[insightForm.iconName ?? 'Star']; return <PreviewIcon className="w-6 h-6 text-red-500" />; })()}
                              <div>
                                <div className="text-lg font-black text-slate-900 dark:text-white">{insightForm.value}</div>
                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{insightForm.label}</div>
                              </div>
                            </div>
                            <div className="flex gap-2 pt-1">
                              <button onClick={saveInsightEdit} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs"><Save className="w-3.5 h-3.5" /> Save</button>
                              <button onClick={() => { setInsightEditIdx(null); setInsightForm({}); }} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs"><X className="w-3.5 h-3.5" /> Cancel</button>
                              <button onClick={() => deleteInsight(idx)} className="ml-auto flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white font-bold text-xs"><Trash2 className="w-3.5 h-3.5" /> Delete</button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* ── HOMEPAGE REVIEWS TAB ── */}
            {activeTab === 'featured' && (
              <>
                <div className="flex items-center justify-between mb-2 flex-wrap gap-3">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Edit the <strong>"What Our Clients Say"</strong> cards on the homepage. These show when no backend reviews are live.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    {ftSaveMsg && <span className="text-sm text-emerald-500 font-bold">{ftSaveMsg}</span>}
                    <button onClick={resetFeatured} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:text-red-500 text-sm font-bold transition-all">
                      <RotateCcw className="w-4 h-4" /> Reset Defaults
                    </button>
                    <button onClick={startFtAdd} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm font-bold transition-all">
                      <Plus className="w-4 h-4" /> Add Review
                    </button>
                  </div>
                </div>

                <div className="mb-6 p-3 bg-amber-500/5 border border-amber-500/20 rounded-xl flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                    These are the <strong>featured/fallback</strong> reviews. If backend reviews exist and are approved, those will show instead.
                  </p>
                </div>

                {/* Add form */}
                {ftAddMode && (
                  <div className="mb-6 border border-red-500/40 bg-slate-50 dark:bg-slate-800/80 rounded-xl p-5 space-y-4">
                    <h4 className="font-black text-slate-900 dark:text-white text-sm uppercase tracking-wider flex items-center gap-2">
                      <Plus className="w-4 h-4 text-red-500" /> New Featured Review
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">Client Name</label>
                        <input value={ftForm.name ?? ''} onChange={e => setFtForm(p => ({...p, name: e.target.value}))}
                          placeholder="Marcus Thorne" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-red-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">Role / Title</label>
                        <input value={ftForm.role ?? ''} onChange={e => setFtForm(p => ({...p, role: e.target.value}))}
                          placeholder="CEO" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-red-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">Company</label>
                        <input value={ftForm.company ?? ''} onChange={e => setFtForm(p => ({...p, company: e.target.value}))}
                          placeholder="Elevate Group" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-red-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">Photo URL <span className="normal-case font-normal text-slate-400">(optional)</span></label>
                        <input value={ftForm.avatar ?? ''} onChange={e => setFtForm(p => ({...p, avatar: e.target.value}))}
                          placeholder="https://... (leave blank for auto-avatar)" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-red-500 outline-none font-mono text-xs" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">Review Text</label>
                      <textarea value={ftForm.content ?? ''} onChange={e => setFtForm(p => ({...p, content: e.target.value}))} rows={3}
                        placeholder="Write the client review here..." className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-red-500 outline-none resize-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">Rating</label>
                      <div className="flex items-center gap-1">
                        {[1,2,3,4,5].map(s => (
                          <button key={s} type="button" onClick={() => setFtForm(p => ({...p, rating: s}))}
                            onMouseEnter={() => setFtHoverRating(s)} onMouseLeave={() => setFtHoverRating(0)}
                            className="transition-transform hover:scale-125">
                            <Star className={`w-6 h-6 ${s <= (ftHoverRating || (ftForm.rating ?? 5)) ? 'text-red-500 fill-red-500' : 'text-slate-300 dark:text-slate-600'}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3 pt-1">
                      <button onClick={saveFtEdit} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-sm"><Save className="w-4 h-4" /> Save</button>
                      <button onClick={() => setFtAddMode(false)} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm"><X className="w-4 h-4" /> Cancel</button>
                    </div>
                  </div>
                )}

                {/* Cards list */}
                <div className="space-y-4">
                  {featuredT.map((t, idx) => {
                    const isEditing = ftEditIdx === idx;
                    const avatarSrc = t.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=7f1d1d&color=fff&bold=true&size=128`;
                    return (
                      <div key={t.id} className={`border rounded-xl overflow-hidden transition-all ${isEditing ? 'border-red-500/40 bg-slate-50 dark:bg-slate-800/80' : 'border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/30'}`}>
                        {/* Preview row */}
                        <button onClick={() => isEditing ? setFtEditIdx(null) : startFtEdit(idx)}
                          className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                          <img src={avatarSrc} alt={t.name} className="w-11 h-11 rounded-full object-cover border-2 border-slate-200 dark:border-slate-700 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <p className="font-bold text-sm text-slate-900 dark:text-white">{t.name}</p>
                              <span className="text-xs text-slate-500">{t.role}{t.company ? ` · ${t.company}` : ''}</span>
                            </div>
                            <div className="flex items-center gap-0.5 mb-1">
                              {[1,2,3,4,5].map(s => <Star key={s} className={`w-3 h-3 ${s <= t.rating ? 'text-red-500 fill-red-500' : 'text-slate-300 dark:text-slate-600'}`} />)}
                            </div>
                            <p className="text-xs text-slate-500 truncate italic">"{t.content}"</p>
                          </div>
                          {isEditing ? <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />}
                        </button>

                        {/* Edit form */}
                        {isEditing && (
                          <div className="px-5 pb-6 pt-2 border-t border-slate-200 dark:border-slate-700 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">Client Name</label>
                                <input value={ftForm.name ?? ''} onChange={e => setFtForm(p => ({...p, name: e.target.value}))}
                                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-red-500 outline-none" />
                              </div>
                              <div>
                                <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">Role</label>
                                <input value={ftForm.role ?? ''} onChange={e => setFtForm(p => ({...p, role: e.target.value}))}
                                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-red-500 outline-none" />
                              </div>
                              <div>
                                <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">Company</label>
                                <input value={ftForm.company ?? ''} onChange={e => setFtForm(p => ({...p, company: e.target.value}))}
                                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-red-500 outline-none" />
                              </div>
                              <div>
                                <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">Photo URL <span className="normal-case font-normal text-slate-400">(optional)</span></label>
                                <input value={ftForm.avatar ?? ''} onChange={e => setFtForm(p => ({...p, avatar: e.target.value}))}
                                  placeholder="Leave blank for auto-avatar" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-red-500 outline-none font-mono text-xs" />
                              </div>
                            </div>
                            {/* Avatar preview */}
                            <div className="flex items-center gap-3">
                              <img src={ftForm.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(ftForm.name || 'U')}&background=7f1d1d&color=fff&bold=true&size=128`}
                                alt="preview" className="w-12 h-12 rounded-full object-cover border-2 border-slate-200 dark:border-slate-700" />
                              <p className="text-xs text-slate-400">Avatar preview</p>
                            </div>
                            <div>
                              <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">Review Text</label>
                              <textarea value={ftForm.content ?? ''} onChange={e => setFtForm(p => ({...p, content: e.target.value}))} rows={3}
                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-900 dark:text-white focus:border-red-500 outline-none resize-none" />
                            </div>
                            <div>
                              <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">Rating</label>
                              <div className="flex items-center gap-1">
                                {[1,2,3,4,5].map(s => (
                                  <button key={s} type="button" onClick={() => setFtForm(p => ({...p, rating: s}))}
                                    onMouseEnter={() => setFtHoverRating(s)} onMouseLeave={() => setFtHoverRating(0)}
                                    className="transition-transform hover:scale-125">
                                    <Star className={`w-6 h-6 ${s <= (ftHoverRating || (ftForm.rating ?? 5)) ? 'text-red-500 fill-red-500' : 'text-slate-300 dark:text-slate-600'}`} />
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div className="flex gap-3 pt-1">
                              <button onClick={saveFtEdit} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-sm"><Save className="w-4 h-4" /> Save</button>
                              <button onClick={() => { setFtEditIdx(null); setFtForm({}); setFtHoverRating(0); }} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm"><X className="w-4 h-4" /> Cancel</button>
                              <button onClick={() => deleteFt(idx)} className="ml-auto flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white font-bold text-sm"><Trash2 className="w-4 h-4" /> Delete</button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}

          </div>
        </main>

        <Footer />
        <GrowthPlanModal isOpen={growthPlanModal.isOpen} onClose={growthPlanModal.close} onSuccess={handleSuccess} />
      </div>
    </ThemeProvider>
  );
};
