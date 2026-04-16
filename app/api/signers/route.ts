import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

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
        email,
        country,
        created_at,
        verified,
        public_name
      FROM signers
      ORDER BY created_at DESC
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    const countResult = await sql`
      SELECT COUNT(*) as total FROM signers
    `;

    return NextResponse.json({
      signers,
      total: parseInt(countResult[0].total),
      limit,
      offset
    });

  } catch (error) {
    console.error('Error fetching signers:', error);
    return NextResponse.json(
      { error: 'Fehler beim Laden der Signaturen' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, verified } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'ID erforderlich' },
        { status: 400 }
      );
    }

    const result = await sql`
      UPDATE signers 
      SET verified = ${verified}
      WHERE id = ${id}
      RETURNING *
    `;

    return NextResponse.json({
      success: true,
      signer: result[0]
    });

  } catch (error) {
    console.error('Error updating signer:', error);
    return NextResponse.json(
      { error: 'Fehler beim Aktualisieren' },
      { status: 500 }
    );
  }
}
