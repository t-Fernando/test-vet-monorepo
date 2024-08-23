import { text, integer, real, sqliteTable } from 'drizzle-orm/sqlite-core';
import { prescription } from './prescription';
import { relations } from 'drizzle-orm';

export const prescriptionItem = sqliteTable('prescription_item', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  prescriptionId: integer('prescription_id')
    .references(() => prescription.id)
    .notNull(),
  // medicineId
  // productId
  // vaccineId
  // dewormerId
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
    };
  }
);
