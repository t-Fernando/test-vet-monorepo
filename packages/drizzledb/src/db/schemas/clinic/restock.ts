import { sqliteTable, text, real } from 'drizzle-orm/sqlite-core';
import { relations, sql } from 'drizzle-orm';
import {
  restockDewormer,
  restockMedicine,
  restockProduct,
  restockVaccine,
  supplier,
} from './';

export const restock = sqliteTable('restock', {
  id: text('id')
    .primaryKey()
    .$default(() => sql`uuid4()`),
  supplierId: text('supplier_id')
    .notNull()
    .references(() => supplier.id),
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
    restockVaccine: one(restockVaccine, {
      fields: [restock.id],
      references: [restockVaccine.restockId],
    }),
    restockMedicine: one(restockMedicine, {
      fields: [restock.id],
      references: [restockMedicine.restockId],
    }),
    restockDewormer: one(restockDewormer, {
      fields: [restock.id],
      references: [restockDewormer.restockId],
    }),
    restockProduct: one(restockProduct, {
      fields: [restock.id],
      references: [restockProduct.restockId],
    }),
  };
});
