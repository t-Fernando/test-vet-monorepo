import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const publicLaboratory = sqliteTable('public_laboratory', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name'),
  address: text('address'),
  phone: text('phone'),
  email: text('email'),
});

export type InsertPublicLaboratory = typeof publicLaboratory.$inferInsert;
export type SelectPublicLaboratory = typeof publicLaboratory.$inferSelect;
