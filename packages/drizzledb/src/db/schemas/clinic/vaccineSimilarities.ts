// import { index, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
// import { vaccine } from './vaccine';
// import { relations } from 'drizzle-orm';

// export const vaccineSimilarities = sqliteTable(
//   'vaccine_similarities',
//   {
//     vaccineAId: integer('vaccine_a_id')
//       .notNull()
//       .references(() => vaccine.id),
//     vaccineBId: integer('vaccine_b_id')
//       .notNull()
//       .references(() => vaccine.id),
//   },
//   (table) => {
//     return {
//       vaccineAIdx: index('vaccine_a_idx').on(table.vaccineAId),
//       vaccineBIdx: index('vaccine_b_idx').on(table.vaccineBId),
//     };
//   }
// );

// export type InsertVaccineSimilarities = typeof vaccineSimilarities.$inferInsert;
// export type SelectVaccineSimilarities = typeof vaccineSimilarities.$inferSelect;

// export const vaccineSimilaritiesRelations = relations(
//   vaccineSimilarities,
//   ({ one }) => {
//     return {
//       vaccineA: one(vaccine, {
//         fields: [vaccineSimilarities.vaccineAId],
//         references: [vaccine.id],
//       }),
//       vaccineB: one(vaccine, {
//         fields: [vaccineSimilarities.vaccineBId],
//         references: [vaccine.id],
//       }),
//     };
//   }
// );
