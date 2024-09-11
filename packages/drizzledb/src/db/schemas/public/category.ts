import { relations, sql } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import {
  publicMedicine,
  publicVaccine,
  publicDewormer,
  publicProduct,
} from './';

export const publicCategory = sqliteTable('public_category', {
  id: text('id')
    .primaryKey()
    .$default(() => sql`uuid4()`),
  name: text('name'),
});

export type InsertPublicCategory = typeof publicCategory.$inferInsert;
export type SelectPublicCategory = typeof publicCategory.$inferSelect;

export const publicCategoryRelations = relations(
  publicCategory,
  ({ many }) => ({
    publicMedicine: many(publicMedicine),
    publicVaccine: many(publicVaccine),
    publicDewormer: many(publicDewormer),
    publicProduct: many(publicProduct),
  })
);
