‘use client’;

import { useState } from ‘react’;
import Link from ‘next/link’;
import { usePathname } from ‘next/navigation’;
import { languages, translations } from ‘@/lib/translations’;

export default function Header() {
const pathname = usePathname();
const [lang, setLang] = useState<‘en’ | ‘de’ | ‘fr’ | ‘es’ | ‘ru’ | ‘zh’ | ‘pt’ | ‘ar’>(‘de’);
const t = translations[lang];

return (
<header className="bg-gradient-to-r from-peace-blue to-peace-sky text-white">
<div className="container mx-auto px-4 py-6">
<div className="flex justify-between items-center">
<Link href="/" className="text-2xl font-bold hover:text-peace-light transition-colors">
{t.agreement.title}
</Link>

```
      <nav className="hidden md:flex space-x-6">
        <Link 
          href="/" 
          className={`hover:text-peace-light transition-colors ${pathname === '/' ? 'border-b-2' : ''}`}
        >
          {t.nav.agreement}
        </Link>
        <Link 
          href="/development" 
          className={`hover:text-peace-light transition-colors ${pathname === '/development' ? 'border-b-2' : ''}`}
        >
          {t.nav.development}
        </Link>
        <Link 
          href="/support" 
          className={`hover:text-peace-light transition-colors ${pathname === '/support' ? 'border-b-2' : ''}`}
        >
          {t.nav.support}
        </Link>
        <Link 
          href="/news" 
          className={`hover:text-peace-light transition-colors ${pathname === '/news' ? 'border-b-2' : ''}`}
        >
          {t.nav.news}
        </Link>
        <Link 
          href="/signers" 
          className={`hover:text-peace-light transition-colors ${pathname === '/signers' ? 'border-b-2' : ''}`}
        >
          {t.nav.signers}
        </Link>
      </nav>

      <select 
        value={lang} 
        onChange={(e) => setLang(e.target.value as any)}
        className="bg-white text-peace-blue px-3 py-1 rounded"
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
    </div>
  </div>
</header>
```

);
}
