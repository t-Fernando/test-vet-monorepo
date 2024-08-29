import { relations } from 'drizzle-orm';
import { text, integer, real, sqliteTable } from 'drizzle-orm/sqlite-core';

import { dewormer, medicine, prescription, product, vaccine } from './';

export const prescriptionItem = sqliteTable('prescription_item', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  prescriptionId: integer('prescription_id')
    .references(() => prescription.id)
    .notNull(),
  itemId: integer('item_id').notNull(), // references to medicine, product, vaccine, or dewormer
  type: text('type', {
    enum: ['medicine', 'product', 'vaccine', 'dewormer'],
  }).notNull(),
  amount: real('amount').default(0), //! changed from text to real
  frequency: text('frequency'),
  duration: text('duration'),
  recommendations: text('recommendations'),
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
        fields: [prescriptionItem.itemId],
        references: [medicine.id],
      }),
      product: one(product, {
        fields: [prescriptionItem.itemId],
        references: [product.id],
      }),
      vaccine: one(vaccine, {
        fields: [prescriptionItem.itemId],
        references: [vaccine.id],
      }),
      dewormer: one(dewormer, {
        fields: [prescriptionItem.itemId],
        references: [dewormer.id],
      }),
    };
  }
);
