'use client';

import { useState } from 'react';

export default function SupportPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    supportType: [] as string[],
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleCheckbox = (value: string) => {
    if (formData.supportType.includes(value)) {
      setFormData({
        ...formData,
        supportType: formData.supportType.filter(t => t !== value)
      });
    } else {
      setFormData({
        ...formData,
        supportType: [...formData.supportType, value]
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send to API
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center">
          <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Vielen Dank!</h2>
          <p className="text-gray-700 mb-6">Wir haben deine Nachricht erhalten und melden uns bald bei dir.</p>
          <a href="/" className="btn-primary inline-block">Zurück zur Startseite</a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-peace-blue mb-8">Unterstützung</h1>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className="text-2xl font-bold text-peace-blue mb-4">Gemeinsam Verantwortung übernehmen</h2>
        <p className="text-gray-700 leading-relaxed">
          Frieden entsteht durch Menschen, die bereit sind, Verantwortung zu übernehmen. Unsere Initiative möchte eine Plattform für Zusammenarbeit, Dialog und langfristige Lösungen schaffen. Da wir ganz am Anfang stehen brauchen wir Unterstützer/-innen.
        </p>
      </div>

      <div className="space-y-12">
        {/* Financial Support */}
        <section className="card bg-gradient-to-br from-blue-50 to-white">
          <h2 className="text-2xl font-bold text-peace-blue mb-4">Finanzielle Unterstützung</h2>
          
          <p className="text-gray-700 mb-4 font-semibold">Spenden helfen uns dabei:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li>Informationsarbeit und Öffentlichkeitsarbeit zu leisten</li>
            <li>Veranstaltungen und Projekte umzusetzen</li>
            <li>digitale Plattformen und Inhalte zu entwickeln</li>
            <li>unsere Initiative langfristig aufzubauen</li>
          </ul>

          <div className="bg-white rounded-xl p-6 border-2 border-peace-blue">
            <p className="text-gray-700 mb-4">
              Wenn du unsere Arbeit finanziell unterstützen möchtest, nutze bitte die IBAN und BIC von Gaiamocracy e.V. bei der Triodos Bank für eine Überweisung:
            </p>
            <div className="space-y-2">
              <p className="font-mono text-lg font-bold text-peace-blue">
                IBAN: DE66 5003 1000 1092 3740 05
              </p>
              <p className="font-mono text-lg font-bold text-peace-blue">
                BIC: TRODDEF1
              </p>
            </div>
          </div>
        </section>

        {/* Skills Support */}
        <section className="card">
          <h2 className="text-2xl font-bold text-peace-blue mb-4">Fähigkeiten einbringen</h2>
          
          <p className="text-gray-700 mb-4">
            Wir freuen uns über jeden Menschen, der seine Fähigkeiten einbringen möchte.
          </p>

          <p className="text-gray-700 font-semibold mb-3">Aktuell suchen wir dringend nach:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li>Grafikdesigner:in</li>
            <li>Webentwickler:in</li>
            <li>Übersetzer:in</li>
            <li>Social-Media-Unterstützung</li>
            <li>Organisations- und Projektmanagement</li>
            <li>Kommunikation und Öffentlichkeitsarbeit</li>
          </ul>

          <p className="text-gray-700 mb-6">
            Aber auch alle anderen Fähigkeiten können wertvoll sein.
          </p>

          <p className="text-gray-700 font-semibold mb-6">
            Wenn du dich engagieren möchtest, freuen wir uns über deine Nachricht.
          </p>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Vorname *
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-peace-blue focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nachname *
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-peace-blue focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                E-Mail-Adresse *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-peace-blue focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                So kann ich unterstützen
              </label>
              <div className="space-y-2">
                {['Spenden', 'Ehrenamtliche Mitarbeit', 'Kooperationen', 'Ehrenamtliche Beratung', 'Sonstiges'].map((type) => (
                  <label key={type} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.supportType.includes(type)}
                      onChange={() => handleCheckbox(type)}
                      className="w-5 h-5 text-peace-blue border-gray-300 rounded focus:ring-peace-blue"
                    />
                    <span className="text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Deine Nachricht an uns
              </label>
              <textarea
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-peace-blue focus:border-transparent"
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              Absenden
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
