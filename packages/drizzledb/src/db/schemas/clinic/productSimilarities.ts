// import { index, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
// import { product } from './product';
// import { relations } from 'drizzle-orm';

// export const productSimilarities = sqliteTable(
//   'product_similarities',
//   {
//     productAId: integer('product_a_id')
//       .notNull()
//       .references(() => product.id),
//     productBId: integer('product_b_id')
//       .notNull()
//       .references(() => product.id),
//   },
//   (table) => {
//     return {
//       productAIdx: index('product_a_idx').on(table.productAId),
//       productBIdx: index('product_b_idx').on(table.productBId),
//     };
//   }
// );

// export type InsertProductSimilarities = typeof productSimilarities.$inferInsert;
// export type SelectProductSimilarities = typeof productSimilarities.$inferSelect;

// export const productSimilaritiesRelations = relations(
//   productSimilarities,
//   ({ one }) => {
//     return {
//       productA: one(product, {
//         fields: [productSimilarities.productAId],
//         references: [product.id],
//       }),
//       productB: one(product, {
//         fields: [productSimilarities.productBId],
//         references: [product.id],
//       }),
//     };
//   }
// );
