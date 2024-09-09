// import { sqliteTable, integer, index } from 'drizzle-orm/sqlite-core';
// import { dewormer } from './dewormer';
// import { relations } from 'drizzle-orm';

// export const dewormerSimilarities = sqliteTable(
//   'dewormer_similarities',
//   {
//     dewormerAId: integer('dewormer_a_id')
//       .notNull()
//       .references(() => dewormer.id),
//     dewormerBId: integer('dewormer_b_id')
//       .notNull()
//       .references(() => dewormer.id),
//   },
//   (table) => {
//     return {
//       dewormerAIdx: index('dewormer_a_idx').on(table.dewormerAId),
//       dewormerBIdx: index('dewormer_b_idx').on(table.dewormerBId),
//     };
//   }
// );

// export type InsertDewormerSimilarities =
//   typeof dewormerSimilarities.$inferInsert;
// export type SelectDewormerSimilarities =
//   typeof dewormerSimilarities.$inferSelect;

// export const dewormerSimilaritiesRelations = relations(
//   dewormerSimilarities,
//   ({ one }) => {
//     return {
//       dewormerA: one(dewormer, {
//         fields: [dewormerSimilarities.dewormerAId],
//         references: [dewormer.id],
//       }),
//       dewormerB: one(dewormer, {
//         fields: [dewormerSimilarities.dewormerBId],
//         references: [dewormer.id],
//       }),
//     };
//   }
// );
