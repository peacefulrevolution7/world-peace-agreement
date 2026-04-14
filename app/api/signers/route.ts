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

export async function GET(request: NextRequest) {
  try {
    const connection = await getConnection();
    
    // Nur öffentlich freigegebene Unterzeichner
    const [rows]: any = await connection.execute(
      `SELECT 
        id, first_name, last_name, country, place,
        title_field, profession, function_title, organization,
        created_at
      FROM signers 
      WHERE public_name = 1 AND public_approved = 1
      ORDER BY created_at DESC
      LIMIT 100`
    );

    await connection.end();

    return NextResponse.json({
      signers: rows,
    });
  } catch (error) {
    console.error('Error fetching signers:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch signers' },
      { status: 500 }
    );
  }
}
