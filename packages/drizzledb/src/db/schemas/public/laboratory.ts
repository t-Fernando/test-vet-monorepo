import { sql } from 'drizzle-orm';
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const publicLaboratory = sqliteTable('public_laboratory', {
  id: text('id')
    .primaryKey()
    .$default(() => sql`uuid4()`),
  name: text('name'),
  address: text('address'),
  phone: text('phone'),
  email: text('email'),
});

export type InsertPublicLaboratory = typeof publicLaboratory.$inferInsert;
export type SelectPublicLaboratory = typeof publicLaboratory.$inferSelect;
