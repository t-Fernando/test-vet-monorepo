import { relations } from 'drizzle-orm';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { restockProduct } from './restockProduct';
import { grooming } from './grooming';

// import { product, grooming } from './';

export const accessory = sqliteTable('accessory', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  restockProductId: integer('restock_product_id')
    .references(() => restockProduct.id)
    .notNull(),
  name: text('name').notNull(), //! added notNull
  description: text('description'),
  price: real('price').default(0),
});

export type InsertAccessory = typeof accessory.$inferInsert;
export type SelectAccessory = typeof accessory.$inferSelect;

export const accessoryRelations = relations(accessory, ({ one, many }) => {
  return {
    restockProduct: one(restockProduct, {
      fields: [accessory.restockProductId],
      references: [restockProduct.id],
    }),
    gromming: many(grooming),
  };
});
