import { type Config } from 'drizzle-kit';

export default {
  schema: './src/server/db/schema/',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
  tablesFilter: ['drizzle-postgresql-verceldb_*'],
} satisfies Config;
