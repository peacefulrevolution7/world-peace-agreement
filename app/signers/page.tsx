'use client';

import { useState, useEffect } from 'react';

interface Signer {
  id: number;
  first_name: string;
  last_name: string;
  country: string;
  place?: string;
  title_field?: string;
  profession?: string;
  organization?: string;
  created_at: string;
}

export default function SignersPage() {
  const [signers, setSigners] = useState<Signer[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, byCountry: [] });

  useEffect(() => {
    fetchSigners();
    fetchStats();
  }, []);

  const fetchSigners = async () => {
    try {
      const response = await fetch('/api/signers');
      const data = await response.json();
      setSigners(data.signers || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching signers:', error);
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/sign');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <div className="text-peace-blue">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-peace-blue mb-8 text-center">
        Öffentliche Unterzeichner/-innen
      </h1>

      {/* Stats */}
      <div className="bg-gradient-to-r from-peace-blue to-peace-light text-white rounded-2xl p-8 shadow-lg mb-12 text-center">
        <div className="text-5xl font-bold mb-2">{stats.total}</div>
        <div className="text-lg opacity-90">Unterzeichner/-innen weltweit</div>
      </div>

      {/* Signers List */}
      {signers.length === 0 ? (
        <div className="card text-center py-16">
          <p className="text-gray-600 text-lg">
            Noch keine öffentlichen Unterzeichner/-innen vorhanden.
          </p>
          <a href="/sign" className="btn-primary inline-block mt-6">
            Sei die/der Erste!
          </a>
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Land</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Stadt</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Titel/Beruf</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Organisation</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Datum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {signers.map((signer) => (
                <tr key={signer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {signer.title_field && <span className="text-gray-600">{signer.title_field} </span>}
                    {signer.first_name} {signer.last_name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{signer.country}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{signer.place || '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{signer.profession || '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{signer.organization || '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {new Date(signer.created_at).toLocaleDateString('de-DE')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="text-center mt-12">
        <a href="/sign" className="btn-primary inline-block">
          Jetzt unterzeichnen
        </a>
      </div>
    </div>
  );
}
