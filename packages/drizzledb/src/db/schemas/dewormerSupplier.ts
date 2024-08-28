import { relations } from 'drizzle-orm';
import { sqliteTable, integer } from 'drizzle-orm/sqlite-core';

import { dewormer, supplier } from './';

export const dewormerSupplier = sqliteTable('dewormer_supplier', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  dewormerId: integer('dewormerId')
    .references(() => dewormer.id)
    .notNull(),
  supplierId: integer('supplierId')
    .references(() => supplier.id)
    .notNull(),
});

export type InsertDewormerSupplier = typeof dewormerSupplier.$inferInsert;
export type SelectDewormerSupplier = typeof dewormerSupplier.$inferSelect;

export const sewormerSupplierRelations = relations(
  dewormerSupplier,
  ({ one }) => {
    return {
      dewormer: one(dewormer, {
        fields: [dewormerSupplier.dewormerId],
        references: [dewormer.id],
      }),
      supplier: one(supplier, {
        fields: [dewormerSupplier.supplierId],
        references: [supplier.id],
      }),
    };
  }
);
