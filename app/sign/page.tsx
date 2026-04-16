'use client';

import { useState } from 'react';
import { translations } from '@/lib/translations';

export default function SignPage() {
  const [lang] = useState<'en' | 'de' | 'fr' | 'es' | 'ru' | 'zh' | 'pt' | 'ar'>('de');
  const t = translations[lang].sign;
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    country: '',
    gender: '',
    publicName: false,
    privacyConsent: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit to API
    alert('Vielen Dank für Ihre Unterschrift!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-peace-blue mb-8 text-center">
            {t.title}
          </h1>

          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div className={`flex-1 ${step >= 1 ? 'text-peace-blue font-bold' : 'text-gray-400'}`}>
                {t.step1}
              </div>
              <div className={`flex-1 ${step >= 2 ? 'text-peace-blue font-bold' : 'text-gray-400'}`}>
                {t.step2}
              </div>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full mt-4">
              <div 
                className="bg-peace-blue h-2 rounded-full transition-all"
                style={{ width: `${(step / 2) * 100}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.firstName} *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.lastName} *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.email} *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.birthDate}
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.country}
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.gender}
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  >
                    <option value="">Bitte wählen</option>
                    <option value="male">{t.male}</option>
                    <option value="female">{t.female}</option>
                    <option value="diverse">{t.diverse}</option>
                  </select>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="publicName"
                    className="mt-1 mr-3"
                    checked={formData.publicName}
                    onChange={(e) => setFormData({...formData, publicName: e.target.checked})}
                  />
                  <label htmlFor="publicName" className="text-sm text-gray-700">
                    {t.publicName}
                  </label>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="privacy"
                    required
                    className="mt-1 mr-3"
                    checked={formData.privacyConsent}
                    onChange={(e) => setFormData({...formData, privacyConsent: e.target.checked})}
                  />
                  <label htmlFor="privacy" className="text-sm text-gray-700">
                    {t.privacyConsent} *
                  </label>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full bg-peace-blue hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg"
                >
                  {t.nextStep}
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <p className="text-gray-600 mb-6">
                  Optionale zusätzliche Informationen
                </p>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3 px-8 rounded-lg mb-4"
                >
                  {t.previousStep}
                </button>

                <button
                  type="submit"
                  className="w-full bg-peace-green hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg"
                >
                  {t.submit}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
