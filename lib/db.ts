import { neon } from '@neondatabase/serverless';

// Neon PostgreSQL Connection
export const sql = neon(process.env.DATABASE_URL!);
