import { relations } from 'drizzle-orm';
import { text, integer, real, sqliteTable } from 'drizzle-orm/sqlite-core';

import { dewormer, medicine, prescription, product, vaccine } from './';

export const prescriptionItem = sqliteTable('prescription_item', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  prescriptionId: integer('prescription_id')
    .references(() => prescription.id)
    .notNull(),
  medicineId: integer('medicine_id')
    .notNull()
    .references(() => medicine.id),
  productId: integer('product_id')
    .notNull()
    .references(() => product.id),
  vaccineId: integer('vaccine_id')
    .references(() => vaccine.id)
    .notNull(),
  dewormerId: integer('dewormer_id')
    .references(() => dewormer.id)
    .notNull(),
  amount: real('amount').default(0), //! changed from text to real
  frequency: text('frequency'),
  duration: text('duration'),
  recommendations: text('recommendations'),
  type: text('type', { enum: ['medicine', 'product', 'vaccine', 'dewormer'] }),
});

export type InsertPrescriptionItem = typeof prescriptionItem.$inferInsert;
export type SelectPrescriptionItem = typeof prescriptionItem.$inferSelect;

export const prescriptionItemRelations = relations(
  prescriptionItem,
  ({ one }) => {
    return {
      prescription: one(prescription, {
        fields: [prescriptionItem.prescriptionId],
        references: [prescription.id],
      }),
      medicine: one(medicine, {
        fields: [prescriptionItem.medicineId],
        references: [medicine.id],
      }),
      product: one(product, {
        fields: [prescriptionItem.productId],
        references: [product.id],
      }),
      vaccine: one(vaccine, {
        fields: [prescriptionItem.vaccineId],
        references: [vaccine.id],
      }),
      dewormer: one(dewormer, {
        fields: [prescriptionItem.dewormerId],
        references: [dewormer.id],
      }),
    };
  }
);
