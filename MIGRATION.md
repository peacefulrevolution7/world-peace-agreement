# 📊 Daten-Migration: WordPress → Neue Website

## Schritt-für-Schritt Anleitung

### SCHRITT 1: Unterzeichner aus WordPress exportieren

1. **Bei Strato einloggen**
2. **Zur Datenbank-Verwaltung** gehen
3. **phpMyAdmin öffnen**
4. **WordPress-Datenbank auswählen** (z.B. `dbs10213839`)
5. **Tabelle finden**: Suche nach `wp_wpa_signers` oder ähnlich
6. **Auf die Tabelle klicken**
7. **Oben auf "Exportieren" klicken**
8. **Format: SQL** auswählen
9. **"OK" klicken**
10. **Datei wird heruntergeladen** (z.B. `wp_wpa_signers.sql`)

---

### SCHRITT 2: Daten konvertieren

**Option A: Automatisch mit Python-Script (EINFACH)**

1. Öffne Terminal/Kommandozeile
2. Gehe zum Projekt-Ordner:
   ```bash
   cd world-peace-agreement/database
   ```
3. Führe das Script aus:
   ```bash
   python migrate_data.py ../wp_wpa_signers.sql
   ```
4. **Fertig!** Datei `migrated_signers.sql` wurde erstellt

**Option B: Manuell mit Text-Editor**

1. Öffne die exportierte SQL-Datei in einem Text-Editor
2. **Suchen & Ersetzen**:
   - Suche: `wp_wpa_signers`
   - Ersetze: `signers`
3. **Lösche alle Zeilen** die beginnen mit:
   - `DROP TABLE`
   - `CREATE TABLE`
4. Speichere als `migrated_signers.sql`

---

### SCHRITT 3: In neue Datenbank importieren

1. **Bei Strato einloggen**
2. **phpMyAdmin öffnen**
3. **Neue Datenbank auswählen**: `dbs15275768`
4. **Stelle sicher, die Tabelle `signers` existiert** (setup.sql muss vorher ausgeführt worden sein!)
5. **Klicke oben auf "Importieren"**
6. **Wähle Datei**: `migrated_signers.sql`
7. **"OK" klicken**
8. **Warte bis "Import erfolgreich" erscheint**

---

### SCHRITT 4: Prüfen

1. In phpMyAdmin: Klicke auf Tabelle `signers`
2. Oben auf "Anzeigen" klicken
3. **Prüfe ob deine Unterzeichner da sind!** ✅

---

## ⚠️ WICHTIG

- **Mache die Migration BEVOR du die Domain umstellst!**
- **Erst testen, dann Domain umstellen**
- **Mache ein Backup der WordPress-Daten** (hast du ja mit dem Export)

---

## 🆘 Probleme?

### "Tabelle signers existiert nicht"
→ Du musst erst `database/setup.sql` importieren!

### "Doppelte Einträge"
→ Die Tabelle hatte schon Daten. Lösche sie vorher:
```sql
DELETE FROM signers;
```

### "Fehler beim Import"
→ Schick mir die Fehlermeldung, ich helfe dir!

---

## ✅ Checkliste

- [ ] WordPress-Daten exportiert
- [ ] Daten konvertiert
- [ ] Neue Datenbank vorbereitet (setup.sql)
- [ ] Daten importiert
- [ ] Daten geprüft
- [ ] Jetzt kannst du Vercel deployen! 🚀
