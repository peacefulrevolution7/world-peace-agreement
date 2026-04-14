'use client';

import { useState } from 'react';
import Link from 'next/link';
import { translations } from '@/lib/translations';

export default function HomePage() {
  const [currentLang] = useState<'en' | 'de'>('en'); // Wird später dynamisch
  const [openArticle, setOpenArticle] = useState<number | null>(null);
  const t = translations[currentLang].agreement;

  const toggleArticle = (index: number) => {
    setOpenArticle(openArticle === index ? null : index);
  };

  const articles = [
    { title: t.article1Title, text: t.article1Text },
    { title: t.article2Title, text: t.article2Text },
    { title: t.article3Title, text: t.article3Text },
    { title: t.article4Title, text: t.article4Text },
    { title: t.article5Title, text: t.article5Text },
    { title: t.article6Title, text: t.article6Text },
    { title: t.article7Title, text: t.article7Text },
    { title: t.article8Title, text: t.article8Text },
    { title: t.article9Title, text: t.article9Text },
    { title: t.article10Title, text: t.article10Text },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-peace-blue mb-6">
          {t.title}
        </h1>
        <h2 className="text-2xl md:text-3xl text-peace-light mb-8">
          {t.subtitle}
        </h2>
        
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6 mb-8">
          <p className="text-lg leading-relaxed">{t.intro1}</p>
          <p className="text-lg leading-relaxed">{t.intro2}</p>
          <p className="text-lg leading-relaxed">{t.intro3}</p>
        </div>

        <div className="mb-8">
          <a
            href="/world-peace-agreement.pdf"
            className="text-peace-blue hover:text-peace-light underline font-medium"
            target="_blank"
          >
            {t.pdfLink}
          </a>
        </div>
      </div>

      {/* Articles Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-peace-blue mb-8 text-center">
          {t.goalsTitle}
        </h2>

        <div className="space-y-4">
          {articles.map((article, index) => (
            <div key={index} className="accordion-item">
              <button
                onClick={() => toggleArticle(index)}
                className="accordion-header"
              >
                <span>{article.title}</span>
                <svg
                  className={`w-6 h-6 transition-transform duration-300 ${
                    openArticle === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              
              {openArticle === index && (
                <div className="accordion-content">
                  <p className="text-gray-700 leading-relaxed">{article.text}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Closing Text */}
      <div className="prose prose-lg max-w-none mb-12">
        <p className="text-gray-700 leading-relaxed text-center">
          {t.closingText}
        </p>
      </div>

      {/* CTA Section */}
      <div className="text-center space-y-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            {t.signButton}
          </h3>
          <Link href="/sign" className="btn-primary inline-block">
            {t.signButton}
          </Link>
        </div>

        {/* Counter Placeholder */}
        <div className="bg-gradient-to-r from-peace-blue to-peace-light text-white rounded-2xl p-8 shadow-lg">
          <div className="text-5xl font-bold mb-2">1,234</div>
          <div className="text-lg opacity-90">
            {currentLang === 'de' ? 'Unterzeichner/-innen weltweit' : 'Signatories worldwide'}
          </div>
          <button className="mt-4 text-sm underline opacity-80 hover:opacity-100">
            {currentLang === 'de' ? 'Nach Ländern anzeigen' : 'View by country'}
          </button>
        </div>

        <div className="mt-8">
          <p className="text-gray-700 mb-4">{t.closingQuestion}</p>
          <Link href="/support" className="btn-secondary inline-block">
            {currentLang === 'de' ? 'Jetzt unterstützen' : 'Support now'}
          </Link>
        </div>
      </div>
    </div>
  );
}
