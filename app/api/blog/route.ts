import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published') !== 'false';

    let posts;
    
    if (published) {
      posts = await sql`
        SELECT 
          id,
          title,
          content,
          author,
          created_at,
          published
        FROM blog_posts
        WHERE published = true
        ORDER BY created_at DESC
      `;
    } else {
      posts = await sql`
        SELECT 
          id,
          title,
          content,
          author,
          created_at,
          published
        FROM blog_posts
        ORDER BY created_at DESC
      `;
    }

    return NextResponse.json({ posts });

  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Fehler beim Laden der Blog-Posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, author, published } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Titel und Inhalt sind erforderlich' },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO blog_posts (
        title,
        content,
        author,
        published,
        created_at
      )
      VALUES (
        ${title},
        ${content},
        ${author || 'Anonymous'},
        ${published || false},
        NOW()
      )
      RETURNING id
    `;

    return NextResponse.json({
      success: true,
      message: 'Blog-Post erfolgreich erstellt',
      postId: result[0].id
    });

  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Fehler beim Erstellen des Blog-Posts' },
      { status: 500 }
    );
  }
}
