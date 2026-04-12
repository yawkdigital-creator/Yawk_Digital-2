import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Plus, Pencil, Trash2, Eye, Save, X, ChevronDown,
  FileText, Calendar, Clock, Tag
} from 'lucide-react';
import { useBlog, BlogPost } from '@/hooks/useBlog';
import { CustomCursor } from '@/components/ui/CustomCursor';

const CATEGORIES = ['Web Development', 'Graphic Design', 'Ads Management', 'AI & Automation', 'Growth Strategy', 'Case Study'];

const EMPTY_FORM = {
  title: '',
  excerpt: '',
  content: '',
  author: 'Yawk Digital Team',
  date: new Date().toISOString().split('T')[0],
  category: 'Growth Strategy',
  image: '',
  tags: [] as string[],
  readTime: '5 min read',
};

export const AdminBlogPage: React.FC = () => {
  const navigate = useNavigate();
  const { posts, addPost, updatePost, deletePost } = useBlog();
  const [mode, setMode] = useState<'list' | 'create' | 'edit'>('list');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [tagInput, setTagInput] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const handleEdit = (post: BlogPost) => {
    setForm({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      date: post.date,
      category: post.category,
      image: post.image,
      tags: [...post.tags],
      readTime: post.readTime,
    });
    setEditingId(post.id);
    setMode('edit');
    window.scrollTo(0, 0);
  };

  const handleCreate = () => {
    setForm({ ...EMPTY_FORM, date: new Date().toISOString().split('T')[0] });
    setEditingId(null);
    setMode('create');
    window.scrollTo(0, 0);
  };

  const handleSave = () => {
    if (!form.title || !form.content || !form.excerpt) return;
    if (mode === 'edit' && editingId) {
      updatePost(editingId, form);
    } else {
      addPost(form);
    }
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setMode('list');
    }, 1200);
  };

  const handleDelete = (id: string) => {
    deletePost(id);
    setDeleteConfirm(null);
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) {
      setForm(prev => ({ ...prev, tags: [...prev.tags, t] }));
    }
    setTagInput('');
  };

  const removeTag = (tag: string) => {
    setForm(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  const inputCls = "w-full bg-slate-800 border border-slate-700 rounded-lg py-2.5 px-4 text-sm text-white placeholder:text-slate-500 focus:border-red-500/50 focus:outline-none transition-all";

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <CustomCursor />
      {/* Header */}
      <div className="border-b border-white/5 bg-slate-900/60 backdrop-blur-sm sticky top-0 z-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => mode === 'list' ? navigate('/admin') : setMode('list')}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              {mode === 'list' ? 'Back to Admin' : 'Back to Posts'}
            </button>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-red-500" />
              <span className="font-bold text-sm">Blog Manager</span>
            </div>
          </div>

          {mode === 'list' && (
            <button
              onClick={handleCreate}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg text-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              New Post
            </button>
          )}

          {(mode === 'create' || mode === 'edit') && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => window.open(`/blog`, '_blank')}
                className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-lg text-sm transition-all border border-slate-700"
              >
                <Eye className="w-4 h-4" />
                Preview Blog
              </button>
              <button
                onClick={handleSave}
                className={`flex items-center gap-2 px-4 py-2 font-semibold rounded-lg text-sm transition-all ${
                  saved ? 'bg-green-500 text-white' : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
              >
                <Save className="w-4 h-4" />
                {saved ? 'Saved!' : mode === 'edit' ? 'Update Post' : 'Publish Post'}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 py-10 max-w-5xl">

        {/* ── LIST MODE ── */}
        {mode === 'list' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-heading font-black">Blog Posts</h1>
                <p className="text-slate-400 text-sm mt-1">{posts.length} post{posts.length !== 1 ? 's' : ''} published</p>
              </div>
            </div>

            <div className="space-y-4">
              {posts.length === 0 && (
                <div className="text-center py-20 text-slate-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-30" />
                  <p>No posts yet. Create your first one!</p>
                </div>
              )}
              {posts.map(post => (
                <div
                  key={post.id}
                  className="bg-slate-900/60 border border-white/5 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-white/10 transition-all"
                >
                  <img
                    src={post.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200'}
                    alt={post.title}
                    className="w-full sm:w-24 h-24 sm:h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-2 items-center mb-1">
                      <span className="text-[10px] font-bold uppercase text-red-500 tracking-wider">{post.category}</span>
                      <span className="text-[10px] text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />{post.date}
                      </span>
                      <span className="text-[10px] text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />{post.readTime}
                      </span>
                    </div>
                    <h3 className="font-bold text-white text-sm sm:text-base leading-snug line-clamp-1">{post.title}</h3>
                    <p className="text-slate-500 text-xs mt-1 line-clamp-1">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {post.tags.map(t => (
                        <span key={t} className="px-1.5 py-0.5 bg-slate-800 text-slate-400 text-[10px] rounded">{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => window.open(`/blog/${post.id}`, '_blank')}
                      className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
                      title="View post"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(post)}
                      className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-all"
                      title="Edit post"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    {deleteConfirm === post.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="px-2.5 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-lg transition-all"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="px-2.5 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold rounded-lg transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(post.id)}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-all"
                        title="Delete post"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── CREATE / EDIT MODE ── */}
        {(mode === 'create' || mode === 'edit') && (
          <div>
            <h1 className="text-2xl font-heading font-black mb-8">
              {mode === 'edit' ? 'Edit Post' : 'Create New Post'}
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={form.title}
                    onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                    placeholder="Enter post title..."
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Excerpt / Summary <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={form.excerpt}
                    onChange={e => setForm(p => ({ ...p, excerpt: e.target.value }))}
                    placeholder="Short description shown on the blog listing page..."
                    rows={3}
                    className={inputCls + ' resize-none'}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Content <span className="text-red-500">*</span>
                    <span className="ml-2 text-slate-600 normal-case font-normal">Use ## for headings, ** text ** for bold, - for lists, --- for dividers</span>
                  </label>
                  <textarea
                    value={form.content}
                    onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
                    placeholder="Write your full article content here...&#10;&#10;## Section Heading&#10;Your paragraph text here.&#10;&#10;**Bold text** and - list items are supported."
                    rows={20}
                    className={inputCls + ' resize-y font-mono text-xs leading-relaxed'}
                  />
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-5">
                <div className="bg-slate-900/60 border border-white/5 rounded-xl p-5 space-y-4">
                  <h3 className="text-sm font-bold text-white">Post Settings</h3>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Category</label>
                    <div className="relative">
                      <select
                        value={form.category}
                        onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                        className={inputCls + ' appearance-none pr-8'}
                      >
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Author</label>
                    <input
                      value={form.author}
                      onChange={e => setForm(p => ({ ...p, author: e.target.value }))}
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Date</label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Read Time</label>
                    <input
                      value={form.readTime}
                      onChange={e => setForm(p => ({ ...p, readTime: e.target.value }))}
                      placeholder="5 min read"
                      className={inputCls}
                    />
                  </div>
                </div>

                <div className="bg-slate-900/60 border border-white/5 rounded-xl p-5 space-y-4">
                  <h3 className="text-sm font-bold text-white">Cover Image</h3>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Image URL</label>
                    <input
                      value={form.image}
                      onChange={e => setForm(p => ({ ...p, image: e.target.value }))}
                      placeholder="https://images.unsplash.com/..."
                      className={inputCls}
                    />
                  </div>
                  {form.image && (
                    <img src={form.image} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
                  )}
                </div>

                <div className="bg-slate-900/60 border border-white/5 rounded-xl p-5 space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Tag className="w-4 h-4 text-red-500" />
                    Tags
                  </h3>
                  <div className="flex gap-2">
                    <input
                      value={tagInput}
                      onChange={e => setTagInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      placeholder="Add tag..."
                      className={inputCls}
                    />
                    <button
                      onClick={addTag}
                      className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all flex-shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {form.tags.map(tag => (
                      <span key={tag} className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 border border-slate-700 text-slate-300 text-xs rounded-full">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="ml-0.5 text-slate-500 hover:text-red-400 transition-colors">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Save button bottom */}
                <button
                  onClick={handleSave}
                  disabled={!form.title || !form.content || !form.excerpt}
                  className={`w-full py-3 font-bold rounded-xl text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                    saved ? 'bg-green-500 text-white' : 'bg-red-500 hover:bg-red-600 text-white hover:shadow-lg hover:shadow-red-500/30'
                  }`}
                >
                  <Save className="w-4 h-4" />
                  {saved ? '✓ Saved!' : mode === 'edit' ? 'Update Post' : 'Publish Post'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
