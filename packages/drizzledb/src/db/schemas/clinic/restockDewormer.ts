import { relations, sql } from 'drizzle-orm';
import { sqliteTable, text, real } from 'drizzle-orm/sqlite-core';
import { cartItem, dewormer, petDeworming, restock } from './';

export const restockDewormer = sqliteTable('restock_dewormer', {
  id: text('id')
    .primaryKey()
    .$default(() => sql`uuid4()`),
  dewormerId: text('dewormer_id')
    .notNull()
    .references(() => dewormer.id),
  restockId: text('restock_id')
    .notNull()
    .references(() => restock.id),
  commercialName: text('commercial_name'),
  stock: real('stock').default(0),
  lot: text('lot'),
  expirityDate: text('expirity_date'), // Date
  purchasePrice: real('purchase_price').default(0),
  discountPercentage: real('discount_percentage').default(0),
});

export type InsertRestockDewormer = typeof restockDewormer.$inferInsert;
export type SelectRestockDewormer = typeof restockDewormer.$inferSelect;

export const restockDewormerRelations = relations(
  restockDewormer,
  ({ one, many }) => {
    return {
      dewormer: one(dewormer, {
        fields: [restockDewormer.dewormerId],
        references: [dewormer.id],
      }),
      restock: one(restock, {
        fields: [restockDewormer.restockId],
        references: [restock.id],
      }),
      cartItem: many(cartItem),
      petDeworming: many(petDeworming),
    };
  }
);
