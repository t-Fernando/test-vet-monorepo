import { sql } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const publicCategory = sqliteTable('public_category', {
  id: text('id')
    .primaryKey()
    .$default(() => sql`uuid4()`),
  name: text('name'),
});

export type InsertPublicCategory = typeof publicCategory.$inferInsert;
export type SelectPublicCategory = typeof publicCategory.$inferSelect;
