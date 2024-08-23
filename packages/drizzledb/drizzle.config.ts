import { type Config } from 'drizzle-kit';

export default {
  schema: './src/db/schemas/tables.ts',
  dialect: 'sqlite',
  driver: 'turso',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.AUTH_TOKEN!,
  },
} satisfies Config;
