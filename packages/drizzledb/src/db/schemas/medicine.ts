import { relations, sql } from 'drizzle-orm';
import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';

import { medicineSupplier, cartItem, prescriptionItem } from './';

export const medicine = sqliteTable('medicine', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  medicineId: integer('medicine_id')
    .notNull()
    .$type<number[]>()
    .default(sql`'[]'`), // id from public db
  stock: integer('stock').default(0),
  lot: text('lot'), //! not index on Medicine?
  purchaseDate: text('purchase_date'), //Date
  expirityDate: text('expirity_date'), //Date
  branch: text('branch'),
  department: text('department'),
  rack: text('rack'),
  purchacePrice: real('purchace_price').default(0),
  utility: real('utility').default(0),
  discountPercentage: real('discount_percentage').default(0),
  discountCode: text('discount_code'),
  publicPrice: real('public_price').default(0),
});

export type InsertMedicine = typeof medicine.$inferInsert;
export type SelectMedicine = typeof medicine.$inferSelect;

export const medicineRelations = relations(medicine, ({ many }) => {
  return {
    medicineSupplier: many(medicineSupplier),
    cartItem: many(cartItem),
    prescriptionItem: many(prescriptionItem),
  };
});
