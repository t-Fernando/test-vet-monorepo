import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';
import { supplier } from './supplier';
import { relations } from 'drizzle-orm';

export const restock = sqliteTable('restock', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  supplierId: integer('supplier_id')
    .notNull()
    .references(() => supplier.id),
  // not a real reference, but array of vaccine, dewormer, medicine, products or restockItems ids
  products: integer('products').$type<number[]>().default([]),
  restockDate: text('restock_date'), // Date
  total: real('total').default(0),
});

export type InsertRestock = typeof restock.$inferInsert;
export type SelectRestock = typeof restock.$inferSelect;

export const restockRelations = relations(restock, ({ one }) => {
  return {
    supplier: one(supplier, {
      fields: [restock.supplierId],
      references: [supplier.id],
    }),
  };
});
