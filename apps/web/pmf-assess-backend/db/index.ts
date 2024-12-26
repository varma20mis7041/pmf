import { drizzle } from 'drizzle-orm/neon-http';

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL not set');
}
const db = drizzle(process.env.DATABASE_URL);

export default db;