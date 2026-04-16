'use client';

import { useState } from 'react';
import Link from 'next/link';
import { translations } from '@/lib/translations';

export default function Home() {
  const [lang] = useState<'en' | 'de' | 'fr' | 'es' | 'ru' | 'zh' | 'pt' | 'ar'>('de');
  const t = translations[lang];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-peace-sky to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-peace-blue mb-6">
            {t.agreement.title}
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            {t.agreement.subtitle}
          </p>
          <Link 
            href="/sign" 
            className="inline-block bg-peace-green hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            {t.agreement.signButton}
          </Link>
          <p className="mt-4 text-gray-600">
            12,345 {t.agreement.signaturesCount}
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-peace-blue">
            Das Weltfriedensabkommen
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Artikel 1: Friedliche Konfliktlösung</h3>
              <p className="text-gray-700">
                Alle Unterzeichner verpflichten sich, Konflikte ausschließlich durch friedliche Mittel zu lösen 
                und auf jegliche Form von Gewalt zu verzichten.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Artikel 2: Respekt und Toleranz</h3>
              <p className="text-gray-700">
                Wir respektieren die Würde aller Menschen unabhängig von Herkunft, Religion, Geschlecht oder 
                politischer Überzeugung und fördern gegenseitiges Verständnis.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Artikel 3: Globale Zusammenarbeit</h3>
              <p className="text-gray-700">
                Wir setzen uns für internationale Zusammenarbeit ein, um gemeinsame Herausforderungen wie 
                Klimawandel, Armut und Ungerechtigkeit zu bewältigen.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Artikel 4: Schutz der Umwelt</h3>
              <p className="text-gray-700">
                Wir verpflichten uns zum Schutz unserer Umwelt und zur nachhaltigen Nutzung der natürlichen 
                Ressourcen für zukünftige Generationen.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/sign" 
              className="inline-block bg-peace-green hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              {t.agreement.signButton}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
