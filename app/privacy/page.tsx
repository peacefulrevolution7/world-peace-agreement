'use client';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-peace-blue mb-8">Datenschutzerklärung</h1>

      <div className="prose prose-lg max-w-none space-y-6">
        <section>
          <h2>1. Verantwortlicher</h2>
          <p>Verantwortlich für die Datenverarbeitung auf dieser Website ist:</p>
          <p>
            Gaiamocracy e.V.<br />
            Postfach 1224<br />
            34468 Volkmarsen<br />
            Deutschland
          </p>
          <p>
            Vertreten durch den Vorstand: Markus Möller<br />
            Telefon: +49 1523 35 480 99<br />
            E-Mail: info@gaiamocracy.org
          </p>
        </section>

        <section>
          <h2>2. Hosting</h2>
          <p>Diese Website wird bei folgendem Anbieter betrieben:</p>
          <p>
            STRATO AG<br />
            Pascalstraße 10<br />
            10587 Berlin<br />
            Deutschland
          </p>
          <p>Beim Aufruf der Website werden automatisch Server-Logfiles erfasst:</p>
          <ul>
            <li>IP-Adresse</li>
            <li>Datum und Uhrzeit der Anfrage</li>
            <li>Browsertyp</li>
            <li>Betriebssystem</li>
            <li>Referrer-URL</li>
          </ul>
          <p>Diese Daten dienen ausschließlich der technischen Sicherheit und Stabilität der Website.</p>
          <p>Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)</p>
        </section>

        <section>
          <h2>3. SSL- bzw. TLS-Verschlüsselung</h2>
          <p>Diese Website nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung, um die Übertragung vertraulicher Inhalte zu schützen.</p>
        </section>

        <section>
          <h2>4. Unterzeichnung des Weltfriedensabkommens</h2>
          <p>Wenn du das Weltfriedensabkommen unterzeichnest, werden folgende personenbezogene Daten verarbeitet:</p>
          <ul>
            <li>Nachname, Vorname</li>
            <li>Adresse</li>
            <li>E-Mail-Adresse</li>
            <li>Geburtsdatum</li>
            <li>Land</li>
            <li>Datum der Unterzeichnung</li>
          </ul>
          <p>Die Verarbeitung erfolgt ausschließlich zur:</p>
          <ul>
            <li>Dokumentation der Zustimmung</li>
            <li>Verwaltung und Organisation des Projekts</li>
            <li>statistischen Ermittlung der Anzahl der Unterzeichner</li>
          </ul>
          <p>Die Namen der Unterzeichner/-innen werden nicht öffentlich angezeigt, außer die Unterzeichner/-innen möchten dies.</p>
          <p>Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)</p>
          <p>Die Einwilligung kann jederzeit mit Wirkung für die Zukunft widerrufen werden per E-Mail an: info@gaiamocracy.org</p>
        </section>

        <section>
          <h2>5. Spenden</h2>
          <p>Wenn du eine Spende tätigst, werden zusätzlich folgende Daten verarbeitet:</p>
          <ul>
            <li>Zahlungsinformationen</li>
            <li>Transaktionsdaten</li>
            <li>ggf. Kontodaten</li>
            <li>Name und Anschrift (für Spendenquittung, falls erforderlich)</li>
          </ul>
          <p>
            Rechtsgrundlage:<br />
            Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)<br />
            Art. 6 Abs. 1 lit. c DSGVO (steuerrechtliche Verpflichtung)
          </p>
        </section>

        <section>
          <h2>6. Speicherdauer</h2>
          <p>Die personenbezogenen Daten werden nur solange gespeichert, wie dies zur Erfüllung der jeweiligen Zwecke erforderlich ist oder gesetzliche Aufbewahrungsfristen bestehen.</p>
          <p>Spendenrelevante Daten werden gemäß steuerrechtlicher Vorgaben 10 Jahre aufbewahrt.</p>
        </section>

        <section>
          <h2>7. Keine Weitergabe an Dritte</h2>
          <p>Eine Weitergabe personenbezogener Daten an Dritte erfolgt nicht, außer:</p>
          <ul>
            <li>zur Zahlungsabwicklung (z. B. PayPal)</li>
            <li>aufgrund gesetzlicher Verpflichtungen</li>
          </ul>
        </section>

        <section>
          <h2>8. Deine Rechte</h2>
          <p>Du hast das Recht auf:</p>
          <ul>
            <li>Auskunft (Art. 15 DSGVO)</li>
            <li>Berichtigung (Art. 16 DSGVO)</li>
            <li>Löschung (Art. 17 DSGVO)</li>
            <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>Widerruf einer Einwilligung (Art. 7 Abs. 3 DSGVO)</li>
            <li>Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
          </ul>
          <p>Zuständige Aufsichtsbehörde: Der Hessische Beauftragte für Datenschutz und Informationsfreiheit</p>
        </section>
      </div>
    </div>
  );
}
