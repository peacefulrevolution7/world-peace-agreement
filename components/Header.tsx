'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { translations, Language, languages } from '@/lib/translations';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function Header({ currentLang, onLanguageChange }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const t = translations[currentLang];

  const languageNames: Record<Language, string> = {
    en: 'English',
    de: 'Deutsch',
    fr: 'Français',
    es: 'Español',
    ru: 'Русский',
    zh: '中文',
    pt: 'Português',
    ar: 'العربية',
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/wpa-logo.png"
              alt="World Peace Agreement Logo"
              width={60}
              height={60}
              className="object-contain"
            />
            <span className="hidden md:block text-xl font-bold text-peace-blue">
              Peace Agreement
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-peace-blue transition-colors font-medium"
            >
              {t.nav.agreement}
            </Link>
            <Link
              href="/development"
              className="text-gray-700 hover:text-peace-blue transition-colors font-medium"
            >
              {t.nav.development}
            </Link>
            <Link
              href="/support"
              className="text-gray-700 hover:text-peace-blue transition-colors font-medium"
            >
              {t.nav.support}
            </Link>
            <Link
              href="/news"
              className="text-gray-700 hover:text-peace-blue transition-colors font-medium"
            >
              {t.nav.news}
            </Link>
            <Link
              href="/signers"
              className="text-gray-700 hover:text-peace-blue transition-colors font-medium"
            >
              {t.nav.signers}
            </Link>
          </nav>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <span className="text-sm font-medium text-gray-700 uppercase">{currentLang}</span>
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {langOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      onLanguageChange(lang);
                      setLangOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors ${
                      currentLang === lang ? 'bg-peace-blue text-white hover:bg-peace-blue' : 'text-gray-700'
                    }`}
                  >
                    {languageNames[lang]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-gray-700 hover:text-peace-blue transition-colors font-medium py-2"
                onClick={() => setMenuOpen(false)}
              >
                {t.nav.agreement}
              </Link>
              <Link
                href="/development"
                className="text-gray-700 hover:text-peace-blue transition-colors font-medium py-2"
                onClick={() => setMenuOpen(false)}
              >
                {t.nav.development}
              </Link>
              <Link
                href="/support"
                className="text-gray-700 hover:text-peace-blue transition-colors font-medium py-2"
                onClick={() => setMenuOpen(false)}
              >
                {t.nav.support}
              </Link>
              <Link
                href="/news"
                className="text-gray-700 hover:text-peace-blue transition-colors font-medium py-2"
                onClick={() => setMenuOpen(false)}
              >
                {t.nav.news}
              </Link>
              <Link
                href="/signers"
                className="text-gray-700 hover:text-peace-blue transition-colors font-medium py-2"
                onClick={() => setMenuOpen(false)}
              >
                {t.nav.signers}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
