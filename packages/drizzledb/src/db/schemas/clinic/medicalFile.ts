import { relations, sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// import { medicalStudy } from './';

export const medicalFile = sqliteTable('medical_file', {
  id: text('id')
    .primaryKey()
    .$default(() => sql`uuid4()`),
  // medicalStudyId: integer('medical_study_id')
  //   .references(() => medicalStudy.id)
  //   .notNull(),
  url: text('url'),
  description: text('description'),
});

export type InsertMedicalFile = typeof medicalFile.$inferInsert;
export type SelectMedicalFile = typeof medicalFile.$inferSelect;

// export const medicalFileRelations = relations(medicalFile, ({ one }) => {
//   return {
//     medicalStudy: one(medicalStudy, {
//       fields: [medicalFile.medicalStudyId],
//       references: [medicalStudy.id],
//     }),
//   };
// });
