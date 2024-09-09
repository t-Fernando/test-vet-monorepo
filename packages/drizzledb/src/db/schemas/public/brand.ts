import { relations, sql } from 'drizzle-orm';
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { publicProduct } from './product';

export const publicBrand = sqliteTable('public_brand', {
  id: text('id')
    .primaryKey()
    .$default(() => sql`uuid4()`),
  name: text('name'),
});

export type InsertPublicBrand = typeof publicBrand.$inferInsert;
export type SelectPublicBrand = typeof publicBrand.$inferSelect;

// export const publicBrandRelations = relations(publicBrand, ({ many }) => {
//   return {
//     publicProduct: many(publicProduct),
//   };
// });
