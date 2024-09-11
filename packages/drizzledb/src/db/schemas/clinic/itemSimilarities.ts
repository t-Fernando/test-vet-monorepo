import { relations, sql } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { dewormer, medicine, product, vaccine } from './';

export const itemSimilarities = sqliteTable('item_similarities', {
  id: text('id')
    .primaryKey()
    .$default(() => sql`uuid4()`),
  itemAId: text('item_a_id')
    .notNull()
    .references(() => dewormer.id)
    .references(() => vaccine.id)
    .references(() => product.id)
    .references(() => medicine.id),
  itemBId: text('item_b_id')
    .notNull()
    .references(() => dewormer.id)
    .references(() => vaccine.id)
    .references(() => product.id)
    .references(() => medicine.id),
  type: text('type', { enum: ['medicine', 'vaccine', 'dewormer', 'product'] }),
});

export type InsertItemSimilarities = typeof itemSimilarities.$inferInsert;
export type SelectItemSimilarities = typeof itemSimilarities.$inferSelect;

export const itemSimilaritiesRelations = relations(
  itemSimilarities,
  ({ one }) => ({
    dewormer: one(dewormer, {
      fields: [itemSimilarities.itemAId, itemSimilarities.itemBId],
      references: [dewormer.id, dewormer.id],
    }),
    medicine: one(medicine, {
      fields: [itemSimilarities.itemAId, itemSimilarities.itemBId],
      references: [medicine.id, medicine.id],
    }),
    vaccine: one(vaccine, {
      fields: [itemSimilarities.itemAId, itemSimilarities.itemBId],
      references: [vaccine.id, vaccine.id],
    }),
    product: one(product, {
      fields: [itemSimilarities.itemAId, itemSimilarities.itemBId],
      references: [product.id, product.id],
    }),
  })
);
