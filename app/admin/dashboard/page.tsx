‘use client’;

import { useEffect, useState } from ‘react’;
import { useRouter } from ‘next/navigation’;

export default function AdminDashboard() {
const [stats, setStats] = useState<any>(null);
const [loading, setLoading] = useState(true);
const router = useRouter();

useEffect(() => {
// Check if user is logged in
const adminUser = localStorage.getItem(‘adminUser’);
if (!adminUser) {
router.push(’/admin/login’);
return;
}

```
// Load statistics
loadStats();
```

}, []);

const loadStats = async () => {
try {
const response = await fetch(’/api/stats’);
const data = await response.json();
setStats(data);
} catch (error) {
console.error(‘Error loading stats:’, error);
} finally {
setLoading(false);
}
};

const handleLogout = () => {
localStorage.removeItem(‘adminUser’);
router.push(’/admin/login’);
};

if (loading) {
return (
<div className="min-h-screen flex items-center justify-center">
<div className="text-xl">Lädt…</div>
</div>
);
}

return (
<div className="min-h-screen bg-gray-50">
{/* Header */}
<header className="bg-white shadow">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
<h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
<button
onClick={handleLogout}
className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
>
Ausloggen
</button>
</div>
</header>

```
  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {/* Navigation */}
    <div className="bg-white rounded-lg shadow mb-6 p-4">
      <nav className="flex space-x-4">
        <a
          href="/admin/dashboard"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Dashboard
        </a>
        <a
          href="/admin/signers"
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          Signaturen
        </a>
        <a
          href="/admin/blog"
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          Blog
        </a>
      </nav>
    </div>

    {/* Statistics Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-gray-500 text-sm font-medium">Gesamt Signaturen</h3>
        <p className="text-3xl font-bold text-gray-900 mt-2">
          {stats?.total || 0}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-gray-500 text-sm font-medium">Verifiziert</h3>
        <p className="text-3xl font-bold text-green-600 mt-2">
          {stats?.verified || 0}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-gray-500 text-sm font-medium">Heute</h3>
        <p className="text-3xl font-bold text-blue-600 mt-2">
          {stats?.today || 0}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-gray-500 text-sm font-medium">Diese Woche</h3>
        <p className="text-3xl font-bold text-purple-600 mt-2">
          {stats?.thisWeek || 0}
        </p>
      </div>
    </div>

    {/* Top Countries */}
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Top Länder</h2>
      <div className="space-y-3">
        {stats?.topCountries?.map((country: any, index: number) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-gray-700">{country.country}</span>
            <span className="font-semibold text-gray-900">{country.count}</span>
          </div>
        ))}
      </div>
    </div>
  </main>
</div>
```

);
}
