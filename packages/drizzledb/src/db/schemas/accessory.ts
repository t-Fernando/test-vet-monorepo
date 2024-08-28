import { relations } from 'drizzle-orm';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { product, grooming } from './';

export const accessory = sqliteTable('accessory', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  productId: integer('product_id')
    .references(() => product.id)
    .notNull(),
  name: text('name').notNull(), //! added notNull
  description: text('description'),
  price: real('price').default(0),
});

export type InsertAccessory = typeof accessory.$inferInsert;
export type SelectAccessory = typeof accessory.$inferSelect;

export const accessoryRelations = relations(accessory, ({ one, many }) => {
  return {
    product: one(product, {
      fields: [accessory.productId],
      references: [product.id],
    }),
    gromming: many(grooming),
  };
});
