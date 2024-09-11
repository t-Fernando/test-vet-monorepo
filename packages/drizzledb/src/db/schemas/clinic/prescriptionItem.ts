import { relations, sql } from 'drizzle-orm';
import { text, integer, real, sqliteTable } from 'drizzle-orm/sqlite-core';

import { dewormer, medicine, prescription, product, vaccine } from './';

export const prescriptionItem = sqliteTable('prescription_item', {
  id: text('id')
    .primaryKey()
    .$default(() => sql`uuid4()`),
  // prescriptionId: integer('prescription_id')
  //   .references(() => prescription.id)
  //   .notNull(),
  itemId: text('item_id').notNull(), // references to medicine, product, vaccine, or dewormer
  itemType: text('type', {
    enum: ['medicine', 'product', 'vaccine', 'dewormer'],
  }).notNull(),
  amount: text('amount'),
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
