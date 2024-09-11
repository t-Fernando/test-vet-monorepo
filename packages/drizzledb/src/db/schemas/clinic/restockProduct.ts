import { sqliteTable, text, real } from 'drizzle-orm/sqlite-core';
import { relations, sql } from 'drizzle-orm';
import { accessory, cartItem, product, restock } from './';

export const restockProduct = sqliteTable('restock_product', {
  id: text('id')
    .primaryKey()
    .$default(() => sql`uuid4()`),
  productId: text('product_id')
    .notNull()
    .references(() => product.id),
  restockId: text('restock_id')
    .notNull()
    .references(() => restock.id),
  commercialName: text('commercial_name'),
  stock: real('stock').default(0),
  expirityDate: text('expirity_date'),
  purchasePrice: real('purchase_price').default(0),
  discountPercentage: real('discount_percentage').default(0),
});

export type InsertRestockProduct = typeof restockProduct.$inferInsert;
export type SelectRestockProduct = typeof restockProduct.$inferSelect;

export const restockProductRelations = relations(
  restockProduct,
  ({ one, many }) => {
    return {
      product: one(product, {
        fields: [restockProduct.productId],
        references: [product.id],
      }),
      restock: one(restock, {
        fields: [restockProduct.restockId],
        references: [restock.id],
      }),
      cartItem: many(cartItem),
      accessory: many(accessory),
    };
  }
);
