'use client';

import Link from 'next/link';
import Image from 'next/image';
import { translations, Language } from '@/lib/translations';

interface FooterProps {
  currentLang: Language;
}

export default function Footer({ currentLang }: FooterProps) {
  const t = translations[currentLang];

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src="/images/wpa-logo.png"
                alt="World Peace Agreement"
                width={50}
                height={50}
                className="object-contain"
              />
              <span className="text-lg font-bold text-peace-blue">
                World Peace Agreement
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {currentLang === 'de' 
                ? 'Ein Projekt von Gaiamocracy e.V.' 
                : 'A project by Gaiamocracy e.V.'}
            </p>
          </div>

          {/* Partner Logos */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <Image
              src="/images/gaiamocracy-logo.jpg"
              alt="Gaiamocracy"
              width={200}
              height={80}
              className="object-contain"
            />
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              {currentLang === 'de' ? 'Rechtliches' : 'Legal'}
            </h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/imprint"
                className="text-sm text-gray-600 hover:text-peace-blue transition-colors"
              >
                {t.footer.imprint}
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-gray-600 hover:text-peace-blue transition-colors"
              >
                {t.footer.privacy}
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-600 hover:text-peace-blue transition-colors"
              >
                {t.footer.terms}
              </Link>
              <Link
                href="/contact"
                className="text-sm text-gray-600 hover:text-peace-blue transition-colors"
              >
                {t.footer.contact}
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Gaiamocracy e.V. 
            {currentLang === 'de' ? ' Alle Rechte vorbehalten.' : ' All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
