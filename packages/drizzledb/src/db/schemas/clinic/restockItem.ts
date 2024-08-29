import { relations } from 'drizzle-orm';
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { product } from './product';
import { dewormer } from './dewormer';
import { medicine } from './medicine';
import { vaccine } from './vaccine';
import { restock } from './restock';

//! changed from RestockProduct to RestockItem
export const restockItem = sqliteTable('restock_item', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  itemId: integer('item_id').notNull(), // product, vaccine, dewormer or medicine id
  type: text('type', { enum: ['medicine', 'vaccine', 'dewormer', 'product'] }),
});

export type InsertRestockItem = typeof restockItem.$inferInsert;
export type SelectRestockItem = typeof restockItem.$inferSelect;

export const restockItemRelations = relations(restockItem, ({ one, many }) => {
  return {
    product: one(product, {
      fields: [restockItem.itemId],
      references: [product.id],
    }),
    dewormer: one(dewormer, {
      fields: [restockItem.itemId],
      references: [dewormer.id],
    }),
    medicine: one(medicine, {
      fields: [restockItem.itemId],
      references: [medicine.id],
    }),
    vaccine: one(vaccine, {
      fields: [restockItem.itemId],
      references: [vaccine.id],
    }),
  };
});
