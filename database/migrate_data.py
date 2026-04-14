#!/usr/bin/env python3
"""
WordPress zu neue Datenbank - Migrations-Script
Konvertiert die exportierte WordPress SQL-Datei für die neue Datenbank
"""

import re
import sys

def convert_wordpress_export(input_file, output_file):
    """
    Konvertiert WordPress SQL Export zur neuen Datenbank-Struktur
    """
    print(f"📖 Lese WordPress Export: {input_file}")
    
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        print(f"❌ Datei nicht gefunden: {input_file}")
        print("💡 Stelle sicher, dass die Datei im gleichen Ordner ist!")
        return False
    
    print("🔄 Konvertiere Daten...")
    
    # Entferne DROP TABLE und CREATE TABLE Statements
    content = re.sub(r'DROP TABLE.*?;', '', content, flags=re.DOTALL)
    content = re.sub(r'CREATE TABLE.*?;', '', content, flags=re.DOTALL)
    
    # Ersetze Tabellennamen
    content = content.replace('wp_wpa_signers', 'signers')
    content = content.replace('`wp_wpa_signers`', '`signers`')
    
    # Entferne AUTO_INCREMENT Werte für ID
    content = re.sub(r"INSERT INTO `signers` \(id,", "INSERT INTO `signers` (", content)
    
    # Bereinige überflüssige Leerzeilen
    content = re.sub(r'\n\s*\n', '\n\n', content)
    
    print(f"💾 Speichere konvertierte Datei: {output_file}")
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("-- Konvertierte Daten von WordPress\n")
        f.write("-- Erstellt mit Migration Script\n\n")
        f.write(content)
    
    print("✅ Fertig!")
    print(f"\n📁 Konvertierte Datei: {output_file}")
    print("\n🚀 Nächster Schritt:")
    print("   1. Gehe zu Strato phpMyAdmin")
    print("   2. Wähle Datenbank: dbs15275768")
    print(f"   3. Klicke auf 'Importieren' und wähle: {output_file}")
    print("   4. Klicke 'OK'")
    
    return True

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("📝 VERWENDUNG:")
        print("   python migrate_data.py deine_wordpress_export.sql")
        print("\nBeispiel:")
        print("   python migrate_data.py wp_wpa_signers.sql")
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = "migrated_signers.sql"
    
    convert_wordpress_export(input_file, output_file)
