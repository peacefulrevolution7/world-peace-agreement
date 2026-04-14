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

// GET - Alle Unterzeichner abrufen
export async function GET(request: NextRequest) {
  try {
    const connection = await getConnection();
    
    const [rows]: any = await connection.execute(
      `SELECT * FROM signers ORDER BY created_at DESC`
    );

    await connection.end();

    return NextResponse.json({
      success: true,
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

// PUT - Unterzeichner aktualisieren
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const connection = await getConnection();

    await connection.execute(
      `UPDATE signers SET
        first_name = ?,
        last_name = ?,
        email = ?,
        country = ?,
        public_name = ?,
        public_approved = ?
      WHERE id = ?`,
      [
        data.first_name,
        data.last_name,
        data.email,
        data.country,
        data.public_name,
        data.public_approved,
        data.id,
      ]
    );

    await connection.end();

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error('Error updating signer:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update signer' },
      { status: 500 }
    );
  }
}

// DELETE - Unterzeichner löschen
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Missing ID' },
        { status: 400 }
      );
    }

    const connection = await getConnection();

    await connection.execute('DELETE FROM signers WHERE id = ?', [id]);

    await connection.end();

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error('Error deleting signer:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete signer' },
      { status: 500 }
    );
  }
}
