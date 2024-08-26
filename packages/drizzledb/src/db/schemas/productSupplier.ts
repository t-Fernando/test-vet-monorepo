import { relations } from 'drizzle-orm';
import { sqliteTable, integer } from 'drizzle-orm/sqlite-core';

import { product, supplier } from './';

export const productSupplier = sqliteTable('product_supplier', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  productId: integer('productId')
    .references(() => product.id)
    .notNull(),
  supplierId: integer('supplierId')
    .references(() => supplier.id)
    .notNull(),
});

export type InsertProductSupplier = typeof productSupplier.$inferInsert;
export type SelectProductSupplier = typeof productSupplier.$inferSelect;

export const productSupplierRelations = relations(
  productSupplier,
  ({ one }) => {
    return {
      product: one(product, {
        fields: [productSupplier.productId],
        references: [product.id],
      }),
      supplier: one(supplier, {
        fields: [productSupplier.supplierId],
        references: [supplier.id],
      }),
    };
  }
);
