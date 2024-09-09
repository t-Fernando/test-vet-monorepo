// import { sqliteTable, integer, index } from 'drizzle-orm/sqlite-core';
// import { medicine } from './medicine';
// import { relations } from 'drizzle-orm';

// export const medicineSimilarities = sqliteTable(
//   'medicine_similarities',
//   {
//     medicineAId: integer('medicine_a_id')
//       .notNull()
//       .references(() => medicine.id),
//     medicineBId: integer('medicine_b_id')
//       .notNull()
//       .references(() => medicine.id),
//   },
//   (table) => {
//     return {
//       medicineAIdx: index('medicine_a_idx').on(table.medicineAId),
//       medicineBIdx: index('medicine_b_idx').on(table.medicineBId),
//     };
//   }
// );

// export type InsertMedicineSimilarities =
//   typeof medicineSimilarities.$inferInsert;
// export type SelectMedicineSimilarities =
//   typeof medicineSimilarities.$inferSelect;

// export const medicineSimilaritiesRelations = relations(
//   medicineSimilarities,
//   ({ one }) => {
//     return {
//       medicineA: one(medicine, {
//         fields: [medicineSimilarities.medicineAId],
//         references: [medicine.id],
//       }),
//       medicineB: one(medicine, {
//         fields: [medicineSimilarities.medicineBId],
//         references: [medicine.id],
//       }),
//     };
//   }
// );
