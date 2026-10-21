import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, Clock } from 'lucide-react';
import { useBlog, type BlogPost } from '@/hooks/useBlog';

/* ─────────────────────────────────────────────────────────────────────────────
   BlogSection: homepage teaser showing the 3 most recent blog posts.
   Data comes from the same useBlog hook the /blog pages use, so posts added
   in the admin panel appear here automatically. Cards link to /blog/:id.
   ───────────────────────────────────────────────────────────────────────────── */

const formatDate = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const sortByNewest = (a: BlogPost, b: BlogPost) =>
  new Date(b.date).getTime() - new Date(a.date).getTime();

export const BlogSection: React.FC = () => {
  const { posts } = useBlog();

  // useBlog already falls back to the built-in posts if storage is unreadable.
  const latest = (Array.isArray(posts) ? posts : [])
    .filter((post): post is BlogPost => Boolean(post?.id))
    .slice()
    .sort(sortByNewest)
    .slice(0, 3);

  return (
    <section id="blog" className="bg-white dark:bg-[#030712] py-16 sm:py-24 transition-colors duration-300">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="font-mono text-[11px] text-slate-500 dark:text-slate-400">// insights</p>
            <h2 className="mt-2 text-[30px] font-bold leading-[1.05] tracking-[-0.03em] text-slate-950 dark:text-white sm:text-[38px]">
              Ideas worth
              <br />
              acting on.
            </h2>
          </div>
          <p className="max-w-[340px] text-[13px] leading-relaxed text-slate-600 dark:text-slate-400">
            Practical breakdowns on growth, AI, paid media and building a brand that compounds. No fluff — just what we use with clients.
          </p>
        </div>

        {latest.length > 0 ? (
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {latest.map((post) => (
              <article
                key={post.id}
                className="group flex min-w-0 flex-col overflow-hidden rounded-[16px] border border-black/5 bg-[#FBFAF9] shadow-[0_12px_26px_-22px_rgba(15,23,42,0.35)] transition duration-300 hover:-translate-y-0.5 hover:border-slate-900 hover:shadow-[0_20px_34px_-22px_rgba(15,23,42,0.4)] dark:border-white/10 dark:bg-white/5"
              >
                <Link
                  to={`/blog/${post.id}`}
                  className="relative block h-[170px] overflow-hidden"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <img
                    src={post.image}
                    alt=""
                    loading="lazy"
                    draggable={false}
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
                  {post.category && (
                    <span className="absolute left-3 top-3 rounded-full bg-black/75 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-white backdrop-blur">
                      {post.category}
                    </span>
                  )}
                </Link>

                <div className="flex flex-1 flex-col p-4">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="h-3 w-3" /> {formatDate(post.date)}
                    </span>
                    {post.readTime && (
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {post.readTime}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-2 text-[15px] font-bold leading-snug text-slate-950 dark:text-white">
                    <Link to={`/blog/${post.id}`} className="transition hover:text-slate-600">
                      {post.title}
                    </Link>
                  </h3>

                  <p className="mt-1.5 line-clamp-3 flex-1 text-[12px] leading-relaxed text-slate-600 dark:text-slate-400">
                    {post.excerpt}
                  </p>

                  <Link
                    to={`/blog/${post.id}`}
                    className="mt-3 flex items-center justify-center gap-1.5 rounded-[10px] border border-slate-200 bg-white py-2 text-[12px] font-semibold text-slate-900 transition duration-300 group-hover:border-slate-950 group-hover:bg-slate-950 group-hover:text-white hover:bg-slate-950 hover:text-white dark:border-white/10 dark:bg-transparent dark:text-white dark:group-hover:bg-white dark:group-hover:text-slate-950"
                  >
                    Read article <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-7 rounded-[16px] border-2 border-dashed border-slate-300 p-8 text-center dark:border-white/15">
            <p className="text-[14px] font-bold text-slate-950 dark:text-white">New articles are on the way.</p>
            <p className="mt-1 text-[12px] text-slate-600 dark:text-slate-400">
              Check back soon — or visit the blog to see everything we&apos;ve published so far.
            </p>
          </div>
        )}

        <div className="mt-6 flex justify-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-[#FBFAF9] px-4 py-2 text-[13px] font-semibold text-slate-900 shadow-sm transition hover:bg-white hover:shadow dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
          >
            View all posts <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
