'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">Weltfriedensabkommen</h3>
            <p className="text-sm text-gray-400">
              Ein Friedensvertrag zwischen Weltbürgern
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-gray-300">Abkommen</Link></li>
              <li><Link href="/development" className="hover:text-gray-300">Entwicklung</Link></li>
              <li><Link href="/support" className="hover:text-gray-300">Unterstützen</Link></li>
              <li><Link href="/news" className="hover:text-gray-300">Neuigkeiten</Link></li>
              <li><Link href="/signers" className="hover:text-gray-300">Unterzeichner</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Rechtliches</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-gray-300">Über uns</Link></li>
              <li><Link href="/imprint" className="hover:text-gray-300">Impressum</Link></li>
              <li><Link href="/privacy" className="hover:text-gray-300">Datenschutz</Link></li>
              <li><Link href="/terms" className="hover:text-gray-300">AGB</Link></li>
              <li><Link href="/contact" className="hover:text-gray-300">Kontakt</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Kontakt</h4>
            <p className="text-sm text-gray-400">
              Für Fragen und Anregungen erreichen Sie uns über unser Kontaktformular.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Weltfriedensabkommen. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
}
