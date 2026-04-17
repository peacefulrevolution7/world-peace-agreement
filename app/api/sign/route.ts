import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '100');
    
    const signers = await sql`
      SELECT 
        id,
        first_name,
        last_name,
        email,
        birth_date,
        country,
        gender,
        public_name,
        created_at,
        verified
      FROM signers 
      ORDER BY created_at DESC 
      LIMIT ${limit}
    `;

    return NextResponse.json({ signers });
  } catch (error: any) {
    console.error('Error fetching signers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch signers' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      birthDate,
      country,
      gender,
      publicName
    } = body;

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: 'First name, last name, and email are required' },
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
        verified
      ) VALUES (
        ${firstName},
        ${lastName},
        ${email},
        ${birthDate || null},
        ${country || null},
        ${gender || null},
        ${publicName || null},
        false
      )
      RETURNING id
    `;

    return NextResponse.json({
      success: true,
      id: result[0].id
    });
  } catch (error: any) {
    console.error('Error adding signer:', error);
    
    if (error.code === '23505') {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to add signature' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, firstName, lastName, email, birthDate, country, gender, publicName, verified } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }

    await sql`
      UPDATE signers SET
        first_name = ${firstName},
        last_name = ${lastName},
        email = ${email},
        birth_date = ${birthDate || null},
        country = ${country || null},
        gender = ${gender || null},
        public_name = ${publicName || null},
        verified = ${verified !== undefined ? verified : false}
      WHERE id = ${id}
    `;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error updating signer:', error);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }

    await sql`DELETE FROM signers WHERE id = ${id}`;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting signer:', error);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
