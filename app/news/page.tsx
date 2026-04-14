'use client';

export default function NewsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-peace-blue mb-8">Aktuelles</h1>

      <div className="card mb-8">
        <div className="text-center py-16">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Noch keine Blog-Einträge
          </h2>
          <p className="text-gray-600 mb-6">
            Sobald es Neuigkeiten gibt, werden diese hier erscheinen.
          </p>
          <a href="/" className="btn-secondary inline-block">
            Zurück zur Startseite
          </a>
        </div>
      </div>

      <div className="bg-blue-50 rounded-2xl p-6 text-center">
        <p className="text-gray-700 mb-4">
          Du möchtest über Updates informiert werden?
        </p>
        <a href="/support" className="btn-primary inline-block">
          Jetzt unterstützen und informiert bleiben
        </a>
      </div>
    </div>
  );
}
