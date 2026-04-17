'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminSigners() {
  const [signers, setSigners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    const adminUser = localStorage.getItem('adminUser');
    if (!adminUser) {
      router.push('/admin/login');
      return;
    }
    loadSigners();
  }, []);

  const loadSigners = async () => {
    try {
      const response = await fetch('/api/sign');
      const data = await response.json();
      setSigners(data.signers || []);
    } catch (error) {
      console.error('Error loading signers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  const filteredSigners = signers.filter(signer =>
    signer.first_name?.toLowerCase().includes(search.toLowerCase()) ||
    signer.last_name?.toLowerCase().includes(search.toLowerCase()) ||
    signer.email?.toLowerCase().includes(search.toLowerCase()) ||
    signer.country?.toLowerCase().includes(search.toLowerCase())
  );

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
          <h1 className="text-2xl font-bold text-gray-900">Signaturen-Verwaltung</h1>
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
            <a href="/admin/signers" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              Signaturen
            </a>
            <a href="/admin/blog" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
              Blog
            </a>
          </nav>
        </div>

        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <input
            type="text"
