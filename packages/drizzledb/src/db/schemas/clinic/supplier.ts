import { relations, sql } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { restock } from './';

export const supplier = sqliteTable('supplier', {
  id: text('id')
    .primaryKey()
    .$default(() => sql`uuid4()`),
  name: text('name').notNull(),
  address: text('address'),
  phone: text('phone'),
  email: text('email'),
});

export type InsertSupplier = typeof supplier.$inferInsert;
export type SelectSupplier = typeof supplier.$inferSelect;

export const supplierRelations = relations(supplier, ({ many }) => {
  return {
    restock: many(restock),
  };
});
