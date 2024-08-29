import { relations, sql } from 'drizzle-orm';
import {
  index,
  integer,
  real,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core';
import { publicProduct } from '../public/product';
import { restockProduct } from './restockProduct';
import { restockItem } from './restockItem';
import { productSimilarities } from './productSimilarities';
import { prescriptionItem } from './prescriptionItem';

// import { prescriptionItem, accessory, productSupplier, cartItem } from './';

export type Stock = {
  // not a real relation but an array of restockProductIds
  productRestockId: number;
  stock: number;
};

export const product = sqliteTable(
  'product',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    publicProductId: integer('public_product_id').references(
      () => publicProduct.id
    ),
    name: text('name').notNull(),
    description: text('description'),
    type: text('type', {
      enum: ['medical', 'mantenience', 'consumable', 'toy', 'other'],
    }).default('other'),
    stockCount: integer('stock_count').default(0),
    stock: text('stock')
      .$type<Stock[]>()
      .default(sql`'[]'`),
    branch: text('branch'),
    department: text('department'),
    rack: text('rack'),
    publicPrice: real('public_price').default(0),
  },
  (table) => {
    return {
      productIdx: uniqueIndex('product_idx').on(table.id),
      publicProductIdx: index('public_product_idx').on(table.publicProductId),
    };
  }
);

export type InsertProduct = typeof product.$inferInsert;
export type SelectProduct = typeof product.$inferSelect;

export const productRelations = relations(product, ({ one, many }) => {
  return {
    restockProduct: many(restockProduct),
    restockItem: many(restockItem),
    productSimilarities: many(productSimilarities),
    publicProduct: one(publicProduct, {
      fields: [product.publicProductId],
      references: [publicProduct.id],
    }),
    prescriptionItem: many(prescriptionItem),
  };
});
