'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Speichere Token in localStorage
        localStorage.setItem('admin_token', data.token);
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Login fehlgeschlagen');
      }
    } catch (error) {
      setError('Verbindungsfehler');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-peace-blue to-peace-light flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-peace-blue mb-2">Admin Login</h1>
          <p className="text-gray-600">World Peace Agreement</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Benutzername
            </label>
            <input
              type="text"
              required
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-peace-blue focus:border-transparent"
              placeholder="admin"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Passwort
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-peace-blue focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-peace-blue to-peace-light text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Anmeldung...' : 'Anmelden'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-gray-600 hover:text-peace-blue">
            ← Zurück zur Website
          </a>
        </div>
      </div>
    </div>
  );
}
