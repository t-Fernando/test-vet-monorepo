import { type Config } from 'drizzle-kit';

export default {
  schema: './db/schemas',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
} satisfies Config;
