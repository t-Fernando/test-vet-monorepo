import { relations, sql } from 'drizzle-orm';
import { text, integer, real, sqliteTable } from 'drizzle-orm/sqlite-core';
import { prescription } from './prescription';
import { product } from './product';
import { vaccine } from './vaccine';
import { medicine } from './medicine';
import { dewormer } from './dewormer';

// import { dewormer, medicine, product, vaccine } from './';

export const prescriptionItem = sqliteTable('prescription_item', {
  id: text('id')
    .primaryKey()
    .$default(() => sql`uuid4()`),
  prescriptionId: text('prescription_id')
    .references(() => prescription.id)
    .notNull(),
  itemId: text('item_id')
    .notNull()
    .references(() => product.id)
    .references(() => vaccine.id)
    .references(() => medicine.id)
    .references(() => dewormer.id),
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
