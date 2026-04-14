import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// Datenbank-Verbindung
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
    const data = await request.json();
    const connection = await getConnection();

    // Nächste Signatur-Nummer ermitteln
    const [rows]: any = await connection.execute(
      'SELECT MAX(signer_no) as max_no FROM signers'
    );
    const nextNo = (rows[0]?.max_no || 0) + 1;

    // Unterzeichner in Datenbank speichern
    await connection.execute(
      `INSERT INTO signers (
        signer_no, first_name, last_name, email, birth_date, country, gender,
        title_field, profession, function_title, organization, place,
        public_name, wants_postal, street, postal_code, city, country_address,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        nextNo,
        data.firstName,
        data.lastName,
        data.email,
        data.birthDate,
        data.country,
        data.gender || null,
        data.titleField || null,
        data.profession || null,
        data.functionTitle || null,
        data.organization || null,
        data.publicCity || null,
        data.publicName ? 1 : 0,
        data.wantsPostal ? 1 : 0,
        data.street || null,
        data.postalCode || null,
        data.city || null,
        data.countryAddress || null,
      ]
    );

    await connection.end();

    return NextResponse.json({ 
      success: true, 
      signerNo: nextNo 
    });
  } catch (error) {
    console.error('Error saving signature:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save signature' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const connection = await getConnection();
    
    // Gesamtzahl der Unterzeichner
    const [countRows]: any = await connection.execute(
      'SELECT COUNT(*) as total FROM signers'
    );
    
    // Unterzeichner nach Ländern
    const [countryRows]: any = await connection.execute(
      'SELECT country, COUNT(*) as count FROM signers GROUP BY country ORDER BY count DESC'
    );

    await connection.end();

    return NextResponse.json({
      total: countRows[0].total,
      byCountry: countryRows,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
