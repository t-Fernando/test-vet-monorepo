import { relations } from 'drizzle-orm';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { prescriptionItem } from './prescriptionItem';
import { accessory } from './accessory';
import { productSupplier } from './productSupplier';

export const product = sqliteTable('product', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  productId: integer('product_id').notNull(), // id from public db
  stock: integer('stock').default(0),
  purchaseDate: text('purchase_date'), //Date
  expirityDate: text('expirity_date'), //Date
  branch: text('branch'),
  department: text('department'),
  rack: text('rack'),
  purchacePrice: real('purchace_price').default(0),
  utility: real('utility').default(0),
  discountPercentage: real('discount_percentage').default(0),
  discountCode: text('discount_code'),
  publicPrice: real('public_price').default(0),
});

export type InsertProduct = typeof product.$inferInsert;
export type SelectProduct = typeof product.$inferSelect;

export const productRelations = relations(product, ({ many }) => {
  return {
    prescriptionItem: many(prescriptionItem),
    accesory: many(accessory),
    productSupplier: many(productSupplier),
  };
});
