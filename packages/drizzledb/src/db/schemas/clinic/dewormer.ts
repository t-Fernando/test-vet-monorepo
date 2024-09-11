import { relations, sql } from 'drizzle-orm';
import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';
import { publicDewormer } from '../public';
import { itemSimilarities, prescriptionItem, restockDewormer } from './';

export type Stock = {
  // not a real relationship, just a list of restockDewormerIds
  dewormerRestockId: number;
  stock: number;
};

export const dewormer = sqliteTable('dewormer', {
  id: text('id')
    .primaryKey()
    .$default(() => sql`uuid4()`),
  publicDewormerId: text('public_dewormer_id').references(
    () => publicDewormer.id
  ),
  laboratoryIds: text('laboratory_ids') // not a real relationship, just a list of laboratory ids
    .default(sql`'[]'`)
    .notNull(),
  name: text('name').notNull(),
  description: text('description'),
  type: text('type', { enum: ['healing', 'maintenance'] }),
  stockCount: integer('stock_count').default(0),
  stock: text('stock')
    .$type<Stock[]>()
    .default(sql`'[]'`),
  branch: text('branch'),
  department: text('department'),
  rack: text('rack'),
  publicPrice: real('public_price').default(0),
});

export const dewormerRelations = relations(dewormer, ({ one, many }) => {
  return {
    restockDewormer: many(restockDewormer),
    itemSimilarities: many(itemSimilarities),
    prescriptionItem: many(prescriptionItem),
    publicDewormer: one(publicDewormer, {
      fields: [dewormer.publicDewormerId],
      references: [publicDewormer.id],
    }),
  };
});
