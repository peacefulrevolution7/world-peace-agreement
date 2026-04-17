'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminBlog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [currentPost, setCurrentPost] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const router = useRouter();

  useEffect(() => {
    const adminUser = localStorage.getItem('adminUser');
    if (!adminUser) {
      router.push('/admin/login');
      return;
    }
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response = await fetch('/api/blog');
      const data = await response.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  const handleNewPost = () => {
    setCurrentPost(null);
    setTitle('');
    setContent('');
    setAuthor('');
    setShowEditor(true);
  };

  const handleEditPost = (post: any) => {
    setCurrentPost(post);
    setTitle(post.title);
    setContent(post.content);
    setAuthor(post.author);
    setShowEditor(true);
  };

  const handleSavePost = async (published: boolean) => {
    try {
      const method = currentPost ? 'PUT' : 'POST';
      const body: any = { title, content, author, published };
      if (currentPost) {
        body.id = currentPost.id;
      }

      const response = await fetch('/api/blog', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setShowEditor(false);
        loadPosts();
      } else {
        alert('Fehler beim Speichern');
      }
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Fehler beim Speichern');
    }
  };

  const handleDeletePost = async (id: number) => {
    if (!confirm('Post wirklich löschen?')) return;

    try {
      const response = await fetch('/api/blog', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        loadPosts();
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Lädt...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Blog-Verwaltung</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Ausloggen
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow mb-6 p-4">
          <nav className="flex space-x-4">
            <a href="/admin/dashboard" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
              Dashboard
            </a>
            <a href="/admin/signers" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
              Signaturen
            </a>
            <a href="/admin/blog" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              Blog
            </a>
          </nav>
        </div>

        {!showEditor ? (
          <>
            <div className="mb-6">
              <button
                onClick={handleNewPost}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
              >
                + Neuer Blog-Post
              </button>
            </div>

            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{post.content}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Von: {post.author}</span>
                        <span>•</span>
                        <span>{new Date(post.created_at).toLocaleDateString('de-DE')}</span>
                        <span>•</span>
                        <span className={post.published ? 'text-green-600' : 'text-yellow-600'}>
                          {post.published ? 'Veröffentlicht' : 'Entwurf'}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEditPost(post)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        Bearbeiten
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                      >
                        Löschen
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {posts.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  Noch keine Blog-Posts vorhanden
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {currentPost ? 'Post bearbeiten' : 'Neuer Blog-Post'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Titel</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Post-Titel eingeben..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Autor</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Dein Name..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Inhalt</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={12}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Post-Inhalt schreiben..."
                />
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => handleSavePost(false)}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-semibold"
                >
                  Als Entwurf speichern
                </button>
                <button
                  onClick={() => handleSavePost(true)}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
                >
                  Veröffentlichen
                </button>
                <button
                  onClick={() => setShowEditor(false)}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
                >
                  Abbrechen
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
