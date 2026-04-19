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
        signer_no,
        first_name,
        last_name,
        email,
        country,
        profession,
        organization,
        city,
        title_field as title,
        function_title,
        place,
        gender,
        birth_date,
        public_name,
        public_approved,
        verified,
        created_at,
        updated_at
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
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'ID erforderlich' },
        { status: 400 }
      );
    }

    // Build dynamic update query
    const updateFields = Object.keys(updates)
      .filter(key => updates[key] !== undefined)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ');

    if (!updateFields) {
      return NextResponse.json(
        { error: 'Keine Aktualisierungen angegeben' },
        { status: 400 }
      );
    }

    const values = [id, ...Object.values(updates).filter(v => v !== undefined)];

    const result = await sql`
      UPDATE signers 
      SET ${sql.unsafe(updateFields)}, updated_at = NOW()
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

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID erforderlich' },
        { status: 400 }
      );
    }

    await sql`
      DELETE FROM signers 
      WHERE id = ${id}
    `;

    return NextResponse.json({
      success: true,
      message: 'Signatur erfolgreich gelöscht'
    });

  } catch (error) {
    console.error('Error deleting signer:', error);
    return NextResponse.json(
      { error: 'Fehler beim Löschen' },
      { status: 500 }
    );
  }
}
