import { createClient, type Client } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { config } from 'dotenv';
import * as schema from './schemas/tables';

config({ path: '.env' });

const globalForDb = globalThis as unknown as {
  client: Client | undefined;
};

export const client =
  globalForDb.client ??
  createClient({
    url: process.env.DATABASE_URL!,
    authToken: process.env.AUTH_TOKEN!,
  });
if (process.env.NODE_ENV !== 'production') globalForDb.client = client;

export const db = drizzle(client, { schema });
