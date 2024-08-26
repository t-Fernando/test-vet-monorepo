import { relations } from 'drizzle-orm';
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { medicineSupplier } from './medicineSupplier';
import { vaccineSupplier } from './vaccineSupplier';
import { dewormerSupplier } from './dewormerSupplier';
import { productSupplier } from './productSupplier';

export const supplier = sqliteTable('supplier', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(), //! added notNull
  address: text('address'),
  phone: text('phone'),
  email: text('email'),
});

export type InsertSupplier = typeof supplier.$inferInsert;
export type SelectSupplier = typeof supplier.$inferSelect;

export const supplierRelations = relations(supplier, ({ many }) => {
  return {
    medicineSupplier: many(medicineSupplier),
    vaccineSupplier: many(vaccineSupplier),
    dewormerSupplier: many(dewormerSupplier),
    productSupplier: many(productSupplier),
  };
});
