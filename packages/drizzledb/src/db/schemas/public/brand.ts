import { relations } from 'drizzle-orm';
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { publicProduct } from './product';

export const publicBrand = sqliteTable('public_brand', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name'),
});

export type InsertPublicBrand = typeof publicBrand.$inferInsert;
export type SelectPublicBrand = typeof publicBrand.$inferSelect;

export const publicBrandRelations = relations(publicBrand, ({ many }) => {
  return {
    publicProduct: many(publicProduct),
  };
});
