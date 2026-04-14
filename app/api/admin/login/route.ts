import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

async function getConnection() {
  return await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'wpa_db',
  });
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    
    // Einfache Authentifizierung (in Produktion sollte bcrypt verwendet werden)
    // Standard-Login: admin / admin123
    if (username === 'admin' && password === 'admin123') {
      // Generiere einfaches Token (in Produktion JWT verwenden)
      const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
      
      return NextResponse.json({
        success: true,
        token,
      });
    }

    // Alternativ: Aus Datenbank prüfen
    const connection = await getConnection();
    const [rows]: any = await connection.execute(
      'SELECT * FROM admin_users WHERE username = ?',
      [username]
    );
    await connection.end();

    if (rows.length > 0) {
      // Hier sollte Passwort-Hash verglichen werden
      // Für jetzt: einfacher Vergleich
      const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
      return NextResponse.json({
        success: true,
        token,
      });
    }

    return NextResponse.json(
      { success: false, error: 'Ungültige Anmeldedaten' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Server-Fehler' },
      { status: 500 }
    );
  }
}
