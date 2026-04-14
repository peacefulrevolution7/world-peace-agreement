'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Signer {
  id: number;
  signer_no: number;
  first_name: string;
  last_name: string;
  email: string;
  birth_date: string;
  country: string;
  gender?: string;
  title_field?: string;
  profession?: string;
  function_title?: string;
  organization?: string;
  place?: string;
  public_name: number;
  public_approved: number;
  wants_postal: number;
  street?: string;
  postal_code?: string;
  city?: string;
  country_address?: string;
  created_at: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [signers, setSigners] = useState<Signer[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSigner, setEditingSigner] = useState<Signer | null>(null);
  const [stats, setStats] = useState({ total: 0, public: 0, postal: 0 });

  useEffect(() => {
    checkAuth();
    fetchSigners();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
    }
  };

  const fetchSigners = async () => {
    try {
      const response = await fetch('/api/admin/signers');
      const data = await response.json();
      setSigners(data.signers || []);
      
      // Statistiken berechnen
      const total = data.signers?.length || 0;
      const publicCount = data.signers?.filter((s: Signer) => s.public_name === 1).length || 0;
      const postalCount = data.signers?.filter((s: Signer) => s.wants_postal === 1).length || 0;
      setStats({ total, public: publicCount, postal: postalCount });
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching signers:', error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  const handleEdit = (signer: Signer) => {
    setEditingSigner(signer);
  };

  const handleSave = async () => {
    if (!editingSigner) return;

    try {
      const response = await fetch('/api/admin/signers', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingSigner),
      });

      if (response.ok) {
        setEditingSigner(null);
        fetchSigners();
        alert('Erfolgreich gespeichert!');
      }
    } catch (error) {
      console.error('Error saving:', error);
      alert('Fehler beim Speichern');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Wirklich löschen?')) return;

    try {
      const response = await fetch(`/api/admin/signers?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchSigners();
        alert('Gelöscht!');
      }
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Fehler beim Löschen');
    }
  };

  const togglePublicApproval = async (signer: Signer) => {
    try {
      const response = await fetch('/api/admin/signers', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...signer,
          public_approved: signer.public_approved === 1 ? 0 : 1,
        }),
      });

      if (response.ok) {
        fetchSigners();
      }
    } catch (error) {
      console.error('Error toggling approval:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-peace-blue text-xl">Laden...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-peace-blue">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <a href="/" className="text-gray-600 hover:text-peace-blue" target="_blank">
              → Website öffnen
            </a>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Abmelden
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Statistiken */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-4xl font-bold text-peace-blue mb-2">{stats.total}</div>
            <div className="text-gray-600">Gesamt Unterzeichner/-innen</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-4xl font-bold text-green-600 mb-2">{stats.public}</div>
            <div className="text-gray-600">Öffentlich gewünscht</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">{stats.postal}</div>
            <div className="text-gray-600">Postversand gewünscht</div>
          </div>
        </div>

        {/* Unterzeichner Tabelle */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Alle Unterzeichner/-innen</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Nr</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">E-Mail</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Land</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Datum</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Öffentlich</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Aktionen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {signers.map((signer) => (
                  <tr key={signer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{signer.signer_no}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {signer.first_name} {signer.last_name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{signer.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{signer.country}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(signer.created_at).toLocaleDateString('de-DE')}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {signer.public_name === 1 ? (
                        <button
                          onClick={() => togglePublicApproval(signer)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            signer.public_approved === 1
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {signer.public_approved === 1 ? 'Freigegeben' : 'Warten auf Freigabe'}
                        </button>
                      ) : (
                        <span className="text-gray-400 text-xs">Nicht gewünscht</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <button
                        onClick={() => handleEdit(signer)}
                        className="text-peace-blue hover:underline"
                      >
                        Bearbeiten
                      </button>
                      <button
                        onClick={() => handleDelete(signer.id)}
                        className="text-red-600 hover:underline"
                      >
                        Löschen
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingSigner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                Unterzeichner/-in bearbeiten
              </h2>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Vorname
                  </label>
                  <input
                    type="text"
                    value={editingSigner.first_name}
                    onChange={(e) =>
                      setEditingSigner({ ...editingSigner, first_name: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nachname
                  </label>
                  <input
                    type="text"
                    value={editingSigner.last_name}
                    onChange={(e) =>
                      setEditingSigner({ ...editingSigner, last_name: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    E-Mail
                  </label>
                  <input
                    type="email"
                    value={editingSigner.email}
                    onChange={(e) =>
                      setEditingSigner({ ...editingSigner, email: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Land
                  </label>
                  <input
                    type="text"
                    value={editingSigner.country}
                    onChange={(e) =>
                      setEditingSigner({ ...editingSigner, country: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={editingSigner.public_name === 1}
                    onChange={(e) =>
                      setEditingSigner({
                        ...editingSigner,
                        public_name: e.target.checked ? 1 : 0,
                      })
                    }
                    className="w-5 h-5"
                  />
                  <span className="text-sm font-medium text-gray-700">Öffentlich gewünscht</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={editingSigner.public_approved === 1}
                    onChange={(e) =>
                      setEditingSigner({
                        ...editingSigner,
                        public_approved: e.target.checked ? 1 : 0,
                      })
                    }
                    className="w-5 h-5"
                  />
                  <span className="text-sm font-medium text-gray-700">Öffentlich freigegeben</span>
                </label>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
              <button
                onClick={() => setEditingSigner(null)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Abbrechen
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-peace-blue text-white rounded-lg hover:opacity-90"
              >
                Speichern
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
