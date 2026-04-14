'use client';

import { useState } from 'react';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Language } from '@/lib/translations';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentLang, setCurrentLang] = useState<Language>('en');

  return (
    <html lang={currentLang}>
      <head>
        <title>World Peace Agreement</title>
        <meta name="description" content="A global movement for peace between world citizens" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Header currentLang={currentLang} onLanguageChange={setCurrentLang} />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer currentLang={currentLang} />
      </body>
    </html>
  );
}
