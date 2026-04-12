import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Tag, Share2, ArrowRight } from 'lucide-react';
import { useBlog } from '@/hooks/useBlog';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { GrowthPlanModal } from '@/components/modals/GrowthPlanModal';
import { useModal } from '@/hooks/useModal';
import { CustomCursor } from '@/components/ui/CustomCursor';

export const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { posts, getPost } = useBlog();
  const growthPlanModal = useModal();
  const post = getPost(id || '');

  if (!post) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] dark:bg-[#030712] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Post not found</h1>
          <button onClick={() => navigate('/blog')} className="text-red-500 hover:underline">
            ← Back to Blog
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });

  // Convert markdown-like content to HTML-ish JSX
  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('## ')) {
        return (
          <h2 key={i} className="text-2xl sm:text-3xl font-heading font-black text-slate-900 dark:text-white mt-10 mb-4 tracking-tight">
            {line.replace('## ', '')}
          </h2>
        );
      }
      if (line.startsWith('---')) {
        return <hr key={i} className="border-slate-200 dark:border-white/10 my-8" />;
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <p key={i} className="font-bold text-slate-900 dark:text-white text-base sm:text-lg my-3">
            {line.replace(/\*\*/g, '')}
          </p>
        );
      }
      if (line.startsWith('- ')) {
        return (
          <li key={i} className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed ml-4 mb-1 list-disc">
            {line.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '$1')}
          </li>
        );
      }
      if (line.trim() === '') {
        return <div key={i} className="h-2" />;
      }
      // Parse inline bold
      const parsed = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return (
        <p
          key={i}
          className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed mb-2"
          dangerouslySetInnerHTML={{ __html: parsed }}
        />
      );
    });
  };

  const relatedPosts = posts.filter(p => p.id !== post.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] dark:bg-[#030712]">
      <CustomCursor />
      <Navigation onCtaClick={growthPlanModal.open} />

      {/* Hero Image */}
      <div className="relative h-[45vh] sm:h-[55vh] mt-16 sm:mt-20 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 md:p-16">
          <div className="container mx-auto max-w-4xl">
            <span className="inline-block mb-3 px-3 py-1 bg-red-500 text-white text-xs font-bold uppercase tracking-wider rounded-full">
              {post.category}
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-heading font-black text-white leading-tight tracking-tighter">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Article */}
      <article className="container mx-auto px-4 sm:px-6 md:px-12 max-w-4xl py-12 sm:py-16">
        {/* Meta */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-8 border-b border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map(tag => (
              <span key={tag} className="flex items-center gap-1 px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs rounded-full">
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="prose-custom">
          {renderContent(post.content)}
        </div>

        {/* CTA Card */}
        <div className="mt-16 p-6 sm:p-10 rounded-2xl bg-gradient-to-br from-red-500/10 via-purple-500/5 to-transparent border border-red-500/20 text-center">
          <h3 className="text-xl sm:text-2xl font-heading font-black text-slate-900 dark:text-white mb-3">
            Ready to Implement This in Your Business?
          </h3>
          <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm sm:text-base max-w-xl mx-auto">
            Book a free strategy call and we'll show you exactly how to apply these strategies to your brand.
          </p>
          <button
            onClick={growthPlanModal.open}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl text-sm sm:text-base transition-all hover:shadow-lg hover:shadow-red-500/30 inline-flex items-center gap-2"
          >
            Book My Free Strategy Call <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Back + Share */}
        <div className="flex items-center justify-between mt-10 pt-8 border-t border-slate-200 dark:border-white/10">
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-red-500 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </button>
          <button
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-red-500 transition-colors text-sm font-medium"
          >
            <Share2 className="w-4 h-4" />
            Copy Link
          </button>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-slate-200 dark:border-white/5 py-16">
          <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-4xl">
            <h3 className="text-xl font-heading font-black text-slate-900 dark:text-white mb-8">
              More Articles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map(rp => (
                <div
                  key={rp.id}
                  onClick={() => { navigate(`/blog/${rp.id}`); window.scrollTo(0, 0); }}
                  className="group cursor-pointer bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-xl overflow-hidden hover:border-red-500/30 transition-all"
                >
                  <img src={rp.image} alt={rp.title} className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="p-4">
                    <span className="text-[10px] font-bold uppercase text-red-500 tracking-wider">{rp.category}</span>
                    <h4 className="mt-1 font-bold text-slate-900 dark:text-white text-sm leading-snug group-hover:text-red-500 transition-colors line-clamp-2">
                      {rp.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />

      <GrowthPlanModal
        isOpen={growthPlanModal.isOpen}
        onClose={growthPlanModal.close}
      />
    </div>
  );
};
