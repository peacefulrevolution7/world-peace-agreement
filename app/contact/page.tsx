'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Nachricht gesendet!</h2>
          <p className="text-gray-700 mb-6">Wir melden uns bald bei dir.</p>
          <a href="/" className="btn-primary inline-block">Zurück zur Startseite</a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-peace-blue mb-8">Kontakt</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">So kannst du uns erreichen:</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Postadresse</h3>
              <p className="text-gray-700">
                Gaiamocracy e.V.<br />
                Postfach 1224<br />
                34468 Volkmarsen<br />
                Deutschland
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Telefon</h3>
              <p className="text-gray-700">
                <a href="tel:+4915233548099" className="text-peace-blue hover:underline">
                  +49 1523 35 480 99
                </a>
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">E-Mail</h3>
              <p className="text-gray-700">
                <a href="mailto:info@gaiamocracy.org" className="text-peace-blue hover:underline">
                  info@gaiamocracy.org
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Bei Fragen, Anmerkungen oder sonstigem, schreib uns einfach:
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Deine Nachricht an uns *
              </label>
              <textarea
                required
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
        </div>
      </div>
    </div>
  );
}
