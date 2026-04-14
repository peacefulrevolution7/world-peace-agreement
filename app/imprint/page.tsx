'use client';

export default function ImprintPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-peace-blue mb-8">Impressum</h1>

      <div className="prose prose-lg max-w-none">
        <h2>Angaben gemäß § 5 TMG</h2>
        
        <h3>Betreiber dieser Website</h3>
        <p>Diese Website ist ein Projekt von:</p>
        <p>
          <strong>Gaiamocracy e.V.</strong> (gemeinnützig)<br />
          Vertreten durch den Vorstand:<br />
          Markus Möller
        </p>

        <h3>Kontakt</h3>
        <p>
          Gaiamocracy e.V.<br />
          Postfach 1224<br />
          34468 Volkmarsen<br />
          Deutschland
        </p>
        <p>
          Telefon: +49 1523 35 480 99<br />
          E-Mail: info@gaiamocracy.org
        </p>
        <p>
          Websites: <a href="https://www.gaiamocracy.org" target="_blank" className="text-peace-blue">www.gaiamocracy.org</a> | <a href="https://www.gm-wiki.gaiamocracy.org" target="_blank" className="text-peace-blue">www.gm-wiki.gaiamocracy.org</a> (Vereins- und Projekt-WIKI)
        </p>

        <h3>Registereintrag</h3>
        <p>
          Eintragung im Vereinsregister<br />
          Registergericht: Amtsgericht Korbach<br />
          Registernummer: VR 1646
        </p>

        <h3>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
        <p>
          Markus Möller<br />
          (Anschrift wie oben)
        </p>

        <h3>Hinweis zum Projekt</h3>
        <p>
          Das „Weltfriedensabkommen" ist ein Projekt von Gaiamocracy e.V.
        </p>
      </div>
    </div>
  );
}
