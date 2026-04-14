'use client';

import { useState } from 'react';
import { translations } from '@/lib/translations';

export default function SignPage() {
  const [currentLang] = useState<'en' | 'de'>('en');
  const [step, setStep] = useState(1);
  const [showThanks, setShowThanks] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    country: '',
    gender: '',
    wantsPostal: false,
    publicName: false,
    agree: false,
    // Step 2 fields
    titleField: '',
    profession: '',
    functionTitle: '',
    organization: '',
    publicCity: '',
    street: '',
    postalCode: '',
    city: '',
    countryAddress: '',
  });

  const t = translations[currentLang].sign;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      // Validate step 1
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.birthDate || !formData.country || !formData.agree) {
        alert(currentLang === 'de' ? 'Bitte alle Pflichtfelder ausfüllen.' : 'Please fill all required fields.');
        return;
      }
      setStep(2);
    } else {
      // Submit to API
      try {
        const response = await fetch('/api/sign', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        
        if (response.ok) {
          setShowThanks(true);
        }
      } catch (error) {
        console.error('Error submitting:', error);
      }
    }
  };

  if (showThanks) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center">
          <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.thanks}</h2>
          {formData.publicName && (
            <p className="text-gray-700 mb-6">{t.followupSaved}</p>
          )}
          <a href="/" className="btn-primary inline-block">
            {currentLang === 'de' ? 'Zurück zur Startseite' : 'Back to home'}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-peace-blue mb-8 text-center">
        {t.title}
      </h1>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center mb-8">
        <div className={`flex items-center ${step >= 1 ? 'text-peace-blue' : 'text-gray-400'}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-peace-blue text-white' : 'bg-gray-200'}`}>
            1
          </div>
          <span className="ml-2 font-medium">{t.step1Title}</span>
        </div>
        <div className="w-16 h-1 mx-4 bg-gray-200"></div>
        <div className={`flex items-center ${step >= 2 ? 'text-peace-blue' : 'text-gray-400'}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-peace-blue text-white' : 'bg-gray-200'}`}>
            2
          </div>
          <span className="ml-2 font-medium">{t.step2Title}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="card space-y-6">
        {step === 1 ? (
          <>
            {/* Step 1: Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.firstName} *
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
                  {t.lastName} *
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
                {t.email} *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-peace-blue focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.birthDate} *
                </label>
                <input
                  type="date"
                  required
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-peace-blue focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.country} *
                </label>
                <select
                  required
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-peace-blue focus:border-transparent"
                >
                  <option value="">Select country...</option>
                  <option value="DE">Germany</option>
                  <option value="US">United States</option>
                  <option value="GB">United Kingdom</option>
                  <option value="FR">France</option>
                  {/* Add more countries */}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.gender}
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-peace-blue focus:border-transparent"
              >
                <option value="">{t.genderNone}</option>
                <option value="male">{t.genderMale}</option>
                <option value="female">{t.genderFemale}</option>
                <option value="diverse">{t.genderDiverse}</option>
              </select>
            </div>

            {/* Privacy & Consent */}
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-700 mb-3">{t.privacy}</p>
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.agree}
                  onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                  className="mt-1 w-5 h-5 text-peace-blue border-gray-300 rounded focus:ring-peace-blue"
                />
                <span className="text-sm text-gray-700">
                  {t.agreePrefix}
                  <a href="/privacy" className="text-peace-blue underline" target="_blank">
                    {t.agreeLink}
                  </a>
                  {t.agreeSuffix}
                </span>
              </label>
            </div>

            <button type="submit" className="btn-primary w-full">
              {currentLang === 'de' ? 'Weiter zu Schritt 2' : 'Continue to Step 2'}
            </button>
          </>
        ) : (
          <>
            {/* Step 2: Additional Information */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700">
                {currentLang === 'de' 
                  ? 'Diese Angaben sind optional und helfen uns, die Bewegung sichtbarer zu machen.' 
                  : 'This information is optional and helps us make the movement more visible.'}
              </p>
            </div>

            <label className="flex items-start space-x-3 cursor-pointer mb-6">
              <input
                type="checkbox"
                checked={formData.publicName}
                onChange={(e) => setFormData({ ...formData, publicName: e.target.checked })}
                className="mt-1 w-5 h-5 text-peace-blue border-gray-300 rounded focus:ring-peace-blue"
              />
              <span className="text-sm font-medium text-gray-700">{t.publicName}</span>
            </label>

            {formData.publicName && (
              <div className="space-y-4 pl-8 border-l-4 border-peace-light">
                <p className="text-sm text-gray-600 mb-4">{t.publicIntro}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder={t.titleField}
                    value={formData.titleField}
                    onChange={(e) => setFormData({ ...formData, titleField: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder={t.profession}
                    value={formData.profession}
                    onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder={t.functionTitle}
                    value={formData.functionTitle}
                    onChange={(e) => setFormData({ ...formData, functionTitle: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder={t.organization}
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder={t.publicCity}
                    value={formData.publicCity}
                    onChange={(e) => setFormData({ ...formData, publicCity: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            )}

            <label className="flex items-start space-x-3 cursor-pointer mb-6">
              <input
                type="checkbox"
                checked={formData.wantsPostal}
                onChange={(e) => setFormData({ ...formData, wantsPostal: e.target.checked })}
                className="mt-1 w-5 h-5 text-peace-blue border-gray-300 rounded focus:ring-peace-blue"
              />
              <span className="text-sm font-medium text-gray-700">{t.postalRequest}</span>
            </label>

            {formData.wantsPostal && (
              <div className="space-y-4 pl-8 border-l-4 border-peace-light">
                <p className="text-sm bg-yellow-50 p-3 rounded-lg text-gray-700">{t.postalHint}</p>
                
                <input
                  type="text"
                  placeholder={t.street}
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder={t.postalCode}
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder={t.city}
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <input
                  type="text"
                  placeholder={t.countryAddress}
                  value={formData.countryAddress}
                  onChange={(e) => setFormData({ ...formData, countryAddress: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn-secondary flex-1"
              >
                {currentLang === 'de' ? 'Zurück' : 'Back'}
              </button>
              <button type="submit" className="btn-primary flex-1">
                {t.submit}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
