import { relations } from 'drizzle-orm';
import { sqliteTable, integer } from 'drizzle-orm/sqlite-core';

import { vaccine, supplier } from './';

export const vaccineSupplier = sqliteTable('vaccine_supplier', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  vaccineId: integer('vaccineId')
    .references(() => vaccine.id)
    .notNull(),
  supplierId: integer('supplierId')
    .references(() => supplier.id)
    .notNull(),
});

export type InsertVaccineSupplier = typeof vaccineSupplier.$inferInsert;
export type SelectVaccineSupplier = typeof vaccineSupplier.$inferSelect;

export const vaccineSupplierRelations = relations(
  vaccineSupplier,
  ({ one }) => {
    return {
      vaccine: one(vaccine, {
        fields: [vaccineSupplier.vaccineId],
        references: [vaccine.id],
      }),
      supplier: one(supplier, {
        fields: [vaccineSupplier.supplierId],
        references: [supplier.id],
      }),
    };
  }
);
