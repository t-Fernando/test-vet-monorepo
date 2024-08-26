import { sqliteTable, integer } from 'drizzle-orm/sqlite-core';
import { medicine } from './medicine';
import { supplier } from './supplier';
import { relations } from 'drizzle-orm';

export const medicineSupplier = sqliteTable('medicine_supplier', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  medicineId: integer('medicineId')
    .references(() => medicine.id)
    .notNull(),
  supplierId: integer('supplierId')
    .references(() => supplier.id)
    .notNull(),
});

export type InsertMedicineSupplier = typeof medicineSupplier.$inferInsert;
export type SelectMedicineSupplier = typeof medicineSupplier.$inferSelect;

export const medicineSupplierRelations = relations(
  medicineSupplier,
  ({ one }) => {
    return {
      medicine: one(medicine, {
        fields: [medicineSupplier.medicineId],
        references: [medicine.id],
      }),
      supplier: one(supplier, {
        fields: [medicineSupplier.supplierId],
        references: [supplier.id],
      }),
    };
  }
);
