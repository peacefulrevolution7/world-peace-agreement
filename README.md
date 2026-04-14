# World Peace Agreement Website 🌍✌️

Eine moderne, mehrsprachige Website für das Weltfriedensabkommen zwischen Weltbürger/-innen.

## Features

✅ **8 Sprachen**: Englisch, Deutsch, Französisch, Spanisch, Russisch, Chinesisch, Portugiesisch, Arabisch
✅ **Unterzeichner-System**: Zweistufiges Formular mit Datenbankanbindung
✅ **Öffentliche Liste**: Unterzeichner können sich öffentlich zeigen
✅ **Statistiken**: Zähler und Länder-Übersicht
✅ **Responsive Design**: Funktioniert auf Desktop & Mobile
✅ **Modernes Design**: Friedlich-Blau & Weiß Farbschema

## Technologie

- **Framework**: Next.js 14 + TypeScript
- **Styling**: Tailwind CSS
- **Datenbank**: MySQL/MariaDB (Strato-kompatibel)
- **Hosting**: Vercel (empfohlen) oder Node.js Server

---

## 📦 Installation

### Schritt 1: Datenbank einrichten

1. **Bei Strato einloggen** und zur Datenbank-Verwaltung gehen
2. **Datenbank auswählen**: `dbs15275768`
3. **SQL-Datei importieren**:
   - Öffne `database/setup.sql`
   - Kopiere den gesamten Inhalt
   - In Strato: phpMyAdmin öffnen → SQL-Tab → Einfügen → Ausführen

### Schritt 2: Umgebungsvariablen konfigurieren

1. Kopiere `.env.example` zu `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Öffne `.env.local` und trage deine Datenbank-Zugangsdaten ein:
   ```
   DB_HOST=rdbms.strato.de
   DB_USER=dbu1089610
   DB_PASSWORD=DEIN_PASSWORT_HIER
   DB_NAME=dbs15275768
   ```

### Schritt 3: Abhängigkeiten installieren

```bash
npm install
```

### Schritt 4: Lokal testen

```bash
npm run dev
```

Öffne http://localhost:3000 im Browser.

---

## 🚀 Deployment auf Vercel (EMPFOHLEN)

Vercel ist die einfachste und schnellste Lösung!

### 1. Vercel Account erstellen

1. Gehe zu [vercel.com](https://vercel.com)
2. Klicke "Sign Up"
3. Melde dich mit GitHub, Google oder Email an

### 2. Projekt hochladen

**Option A: Mit GitHub (empfohlen)**
1. Erstelle ein GitHub Repository
2. Pushe deinen Code dorthin
3. In Vercel: "Import Project" → GitHub Repository auswählen
4. Fertig! Vercel baut automatisch

**Option B: Direkter Upload**
1. Installiere Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Im Projektordner ausführen:
   ```bash
   vercel
   ```
3. Folge den Anweisungen

### 3. Umgebungsvariablen in Vercel eintragen

1. Im Vercel Dashboard: Dein Projekt öffnen
2. Gehe zu "Settings" → "Environment Variables"
3. Füge hinzu:
   - `DB_HOST` → `rdbms.strato.de`
   - `DB_USER` → `dbu1089610`
   - `DB_PASSWORD` → (dein Passwort)
   - `DB_NAME` → `dbs15275768`
   - `SESSION_SECRET` → (zufälliger String)

4. Klicke "Save"
5. Gehe zu "Deployments" → "Redeploy"

### 4. Domain verbinden

1. In Vercel: "Domains" → "Add Domain"
2. Gib ein: `worldpeaceagreement.info`
3. Vercel zeigt dir DNS-Einstellungen

4. **Bei Strato**:
   - Gehe zur Domain-Verwaltung
   - Öffne DNS-Einstellungen
   - Füge die von Vercel angezeigten Records hinzu:
     - Type: `A` → Value: `76.76.21.21`
     - Type: `CNAME` → Value: `cname.vercel-dns.com`

5. Warte 5-60 Minuten → Fertig! 🎉

---

## 📁 Projektstruktur

```
world-peace-agreement/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Startseite (Abkommen)
│   ├── sign/              # Unterzeichner-Formular
│   ├── development/       # Entwicklung-Seite
│   ├── support/           # Unterstützung-Seite
│   ├── signers/           # Öffentliche Liste
│   ├── news/              # Blog
│   ├── api/               # API Routes
│   └── ...                # Footer-Seiten
├── components/            # React Komponenten
│   ├── Header.tsx         # Navigation
│   └── Footer.tsx         # Footer
├── lib/                   # Hilfsfunktionen
│   └── translations.ts    # Übersetzungen
├── public/                # Statische Dateien
│   └── images/            # Logos
└── database/              # Datenbank
    └── setup.sql          # SQL Setup
```

---

## 🔧 Verwaltung

### Admin-Backend Zugang

Das Admin-Backend ist unter `/admin/login` erreichbar:

**Standard Login-Daten:**
- **Benutzername**: `admin`
- **Passwort**: `admin123`

**⚠️ WICHTIG: Passwort nach erstem Login ändern!**

**Was du im Admin-Backend machen kannst:**
- ✅ Alle Unterzeichner/-innen ansehen
- ✅ Unterzeichner bearbeiten
- ✅ Unterzeichner löschen
- ✅ Öffentliche Freigabe erteilen/widerrufen
- ✅ Statistiken sehen (Gesamt, Öffentlich, Postversand)

**Admin-URL:**
```
https://worldpeaceagreement.info/admin/login
```

### Öffentliche Freigabe

Wenn jemand bei der Unterzeichnung "Öffentlich genannt werden" anklickt:
1. Eintrag erscheint im Admin-Backend als "Warten auf Freigabe"
2. Du klickst auf den Button → wird zu "Freigegeben"
3. Eintrag erscheint dann in der öffentlichen Liste auf `/signers`

### Neue Blog-Posts hinzufügen

Aktuell Platzhalter. Backend für Blog-Posts folgt in Version 2.

---

## 🌐 Übersetzungen ergänzen

Die Übersetzungen sind in `lib/translations.ts`.

Aktuell sind EN und DE komplett. Die anderen Sprachen haben nur die Navigation übersetzt.

Um weitere Übersetzungen hinzuzufügen:
1. Öffne `lib/translations.ts`
2. Kopiere die Struktur von `de`
3. Übersetze die Texte
4. Speichern & neu deployen

---

## 🛠️ Entwicklung

### Lokalen Server starten
```bash
npm run dev
```

### Produktions-Build testen
```bash
npm run build
npm start
```

### Code formatieren
```bash
npm run lint
```

---

## 📊 Datenbank-Schema

### Tabelle: `signers`

Speichert alle Unterzeichner/-innen

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| id | INT | Primärschlüssel |
| signer_no | INT | Fortlaufende Nummer |
| first_name | VARCHAR | Vorname |
| last_name | VARCHAR | Nachname |
| email | VARCHAR | E-Mail |
| birth_date | DATE | Geburtsdatum |
| country | VARCHAR | Land |
| public_name | BOOLEAN | Öffentlich sichtbar? |
| created_at | TIMESTAMP | Unterzeichnungsdatum |

---

## 🆘 Problemlösung

### "Database connection failed"
- Prüfe `.env.local` Zugangsdaten
- Teste Datenbank-Verbindung in phpMyAdmin
- Stelle sicher, dass IP-Whitelist korrekt ist

### "Page not found"
- Nach Deployment: Warte 2-3 Minuten
- Prüfe ob Build erfolgreich war in Vercel Dashboard

### Übersetzung fehlt
- Prüfe `lib/translations.ts`
- Stelle sicher, alle Keys vorhanden sind

---

## 📞 Support

Bei Fragen oder Problemen:
- **E-Mail**: info@gaiamocracy.org
- **Telefon**: +49 1523 35 480 99

---

## 📝 Lizenz

Dieses Projekt ist entwickelt für Gaiamocracy e.V.

---

## 🎯 Nächste Schritte (Roadmap)

- [ ] Admin-Panel für Unterzeichner-Verwaltung
- [ ] Blog-System mit Editor
- [ ] Newsletter-Integration
- [ ] Mehrsprachige Übersetzungen vervollständigen
- [ ] PDF-Download des Abkommens
- [ ] Statistik-Dashboard
- [ ] Email-Benachrichtigungen

---

**Viel Erfolg! 🌍✌️💙**
