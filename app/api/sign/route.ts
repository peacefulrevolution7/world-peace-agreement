import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, birthDate, country, gender, publicName } = body;

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: 'Vorname, Nachname und E-Mail sind erforderlich' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Ungültige E-Mail-Adresse' },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO signers (
        first_name, 
        last_name, 
        email, 
        birth_date, 
        country, 
        gender, 
        public_name,
        created_at
      )
      VALUES (
        ${firstName},
        ${lastName},
        ${email},
        ${birthDate || null},
        ${country || null},
        ${gender || null},
        ${publicName || false},
        NOW()
      )
      RETURNING id
    `;

    return NextResponse.json({
      success: true,
      message: 'Signatur erfolgreich gespeichert!',
      signerId: result[0].id
    });

  } catch (error: any) {
    console.error('Error saving signature:', error);
    
    if (error.code === '23505') {
      return NextResponse.json(
        { error: 'Diese E-Mail-Adresse wurde bereits verwendet' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Fehler beim Speichern der Signatur' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');

    const signers = await sql`
      SELECT 
        id,
        first_name,
        last_name,
        country,
        created_at,
        public_name
      FROM signers
      WHERE verified = true
      ORDER BY created_at DESC
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    const countResult = await sql`
      SELECT COUNT(*) as total 
      FROM signers 
      WHERE verified = true
    `;

    return NextResponse.json({
      signers,
      total: parseInt(countResult[0].total),
      limit,
      offset
    });

  } catch (error) {
    console.error('Error fetching signatures:', error);
    return NextResponse.json(
      { error: 'Fehler beim Laden der Signaturen' },
      { status: 500 }
    );
  }
}
