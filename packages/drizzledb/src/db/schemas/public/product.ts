import { relations, sql } from 'drizzle-orm';
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { product } from '../clinic';
import { publicBrand } from './brand';

export const publicProduct = sqliteTable('public_product', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description'),
  type: text('type', {
    enum: ['medical', 'mantenience', 'consumable', 'toy', 'other'],
  }).default('other'),
  satKey: text('sat_key'),
  brandId: integer('brand_id')
    .notNull()
    .references(() => publicBrand.id),
  barcode: text('barcode'),
  categoriesIds: text('categories_ids', { mode: 'json' })
    .$type<string[]>()
    .default(sql`'[]'`), // not a real relationship, just a list of ids
  sku: text('sku'),
  image: text('image'),
  searchKeywords: text('search_keywords', { mode: 'json' }).default(sql`'[]'`),
  similarProducts: text('similar_products', { mode: 'json' }).default(
    sql`'[]'`
  ),
});

export type InsertPublicProduct = typeof publicProduct.$inferInsert;
export type SelectPublicProduct = typeof publicProduct.$inferSelect;

export const publicProductRelations = relations(
  publicProduct,
  ({ many, one }) => {
    return {
      product: many(product),
      publicBrand: one(publicBrand, {
        fields: [publicProduct.brandId],
        references: [publicBrand.id],
      }),
    };
  }
);
