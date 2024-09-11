import { relations, sql } from 'drizzle-orm';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { publicProduct } from '../public';
import { itemSimilarities, prescriptionItem, restockProduct } from './';

export type Stock = {
  // not a real relation but an array of restockProductIds
  productRestockId: number;
  stock: number;
};

export const product = sqliteTable('product', {
  id: text('id')
    .primaryKey()
    .$default(() => sql`uuid4()`),
  publicProductId: text('public_product_id').references(() => publicProduct.id),
  name: text('name').notNull(),
  description: text('description'),
  type: text('type', {
    enum: ['simple', 'multiple'],
  }),
  stockCount: integer('stock_count').default(0),
  stock: text('stock')
    .$type<Stock[]>()
    .default(sql`'[]'`),
  branch: text('branch'),
  department: text('department'),
  rack: text('rack'),
  publicPrice: real('public_price').default(0),
});

export type InsertProduct = typeof product.$inferInsert;
export type SelectProduct = typeof product.$inferSelect;

export const productRelations = relations(product, ({ one, many }) => {
  return {
    restockProduct: many(restockProduct),
    itemSimilarities: many(itemSimilarities),
    publicProduct: one(publicProduct, {
      fields: [product.publicProductId],
      references: [publicProduct.id],
    }),
    prescriptionItem: many(prescriptionItem),
  };
});
