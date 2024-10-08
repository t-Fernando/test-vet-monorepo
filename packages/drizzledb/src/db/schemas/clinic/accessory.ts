import { relations, sql } from 'drizzle-orm';
import { real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { restockProduct, grooming } from './';

export const accessory = sqliteTable('accessory', {
  id: text('id')
    .primaryKey()
    .$default(() => sql`uuid4()`),
  restockProductId: text('restock_product_id')
    .references(() => restockProduct.id)
    .notNull(),
  name: text('name').notNull(),
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
