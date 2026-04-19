'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Signer {
  id: number;
  signer_no: number;
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  profession?: string;
  organization?: string;
  city?: string;
  title?: string;
  function_title?: string;
  place?: string;
  gender?: string;
  birth_date?: string;
  public_name: boolean;
  public_approved: boolean;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

export default function AdminSigners() {
  const [signers, setSigners] = useState<Signer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editingSigner, setEditingSigner] = useState<Signer | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
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
      const response = await fetch('/api/signers');
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

  const handleEdit = (signer: Signer) => {
    setEditingSigner({ ...signer });
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    if (!editingSigner) return;

    try {
      const response = await fetch('/api/signers', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingSigner),
      });

      if (response.ok) {
        await loadSigners();
        setShowEditModal(false);
        setEditingSigner(null);
      } else {
        alert('Fehler beim Speichern');
      }
    } catch (error) {
      console.error('Error saving:', error);
      alert('Fehler beim Speichern');
    }
  };

  const handleDeleteClick = (id: number) => {
    setDeletingId(id);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingId) return;

    try {
      const response = await fetch(`/api/signers?id=${deletingId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await loadSigners();
        setShowDeleteConfirm(false);
        setDeletingId(null);
      } else {
        alert('Fehler beim Löschen');
      }
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Fehler beim Löschen');
    }
  };

  const filteredSigners = signers.filter(signer =>
    signer.first_name?.toLowerCase().includes(search.toLowerCase()) ||
    signer.last_name?.toLowerCase().includes(search.toLowerCase()) ||
    signer.email?.toLowerCase().includes(search.toLowerCase()) ||
    signer.country?.toLowerCase().includes(search.toLowerCase()) ||
    signer.profession?.toLowerCase().includes(search.toLowerCase()) ||
    signer.organization?.toLowerCase().includes(search.toLowerCase()) ||
    signer.city?.toLowerCase().includes(search.toLowerCase())
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
          <div className="flex items-center justify-between">
            <input
              type="text"
              placeholder="Suchen nach Name, E-Mail, Land, Beruf, Organisation, Stadt..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="ml-4 text-sm text-gray-600">
              <strong>{filteredSigners.length}</strong> von <strong>{signers.length}</strong> Einträgen
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nr.
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    E-Mail
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Beruf
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Organisation
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stadt
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Land
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Titel
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aktionen
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSigners.map((signer) => (
                  <tr key={signer.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {signer.signer_no}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {signer.title && <span className="text-gray-500 mr-1">{signer.title}</span>}
                        {signer.first_name} {signer.last_name}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{signer.email}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{signer.profession || '-'}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{signer.organization || '-'}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{signer.city || '-'}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{signer.country || '-'}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{signer.function_title || '-'}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        signer.verified
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {signer.verified ? 'Verifiziert' : 'Ausstehend'}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(signer)}
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                          Bearbeiten
                        </button>
                        <button
                          onClick={() => handleDeleteClick(signer.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                        >
                          Löschen
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredSigners.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              Keine Signaturen gefunden
            </div>
          )}
        </div>
      </main>

      {/* Edit Modal */}
      {showEditModal && editingSigner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Signatur bearbeiten</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vorname</label>
                <input
                  type="text"
                  value={editingSigner.first_name}
                  onChange={(e) => setEditingSigner({...editingSigner, first_name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nachname</label>
                <input
                  type="text"
                  value={editingSigner.last_name}
                  onChange={(e) => setEditingSigner({...editingSigner, last_name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
                <input
                  type="email"
                  value={editingSigner.email}
                  onChange={(e) => setEditingSigner({...editingSigner, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titel</label>
                <input
                  type="text"
                  value={editingSigner.title || ''}
                  onChange={(e) => setEditingSigner({...editingSigner, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="z.B. Dr., Prof."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Beruf</label>
                <input
                  type="text"
                  value={editingSigner.profession || ''}
                  onChange={(e) => setEditingSigner({...editingSigner, profession: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Organisation</label>
                <input
                  type="text"
                  value={editingSigner.organization || ''}
                  onChange={(e) => setEditingSigner({...editingSigner, organization: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stadt</label>
                <input
                  type="text"
                  value={editingSigner.city || ''}
                  onChange={(e) => setEditingSigner({...editingSigner, city: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Land</label>
                <input
                  type="text"
                  value={editingSigner.country || ''}
                  onChange={(e) => setEditingSigner({...editingSigner, country: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Funktion</label>
                <input
                  type="text"
                  value={editingSigner.function_title || ''}
                  onChange={(e) => setEditingSigner({...editingSigner, function_title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="z.B. CEO, Direktor"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ort</label>
                <input
                  type="text"
                  value={editingSigner.place || ''}
                  onChange={(e) => setEditingSigner({...editingSigner, place: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="col-span-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={editingSigner.verified}
                    onChange={(e) => setEditingSigner({...editingSigner, verified: e.target.checked})}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-700">Verifiziert</span>
                </label>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingSigner(null);
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Abbrechen
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Speichern
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Signatur löschen?</h2>
            <p className="text-gray-600 mb-6">
              Möchten Sie diese Signatur wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeletingId(null);
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Abbrechen
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Löschen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
