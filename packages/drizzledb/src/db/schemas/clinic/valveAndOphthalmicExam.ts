import { relations, sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// import { consultation } from './';

export const valveAndOphthalmicExam = sqliteTable('valve_and_ohthalmic_exam', {
  id: text('id')
    .primaryKey()
    .$default(() => sql`uuid4()`),
  // consultationId: integer('consultation_id')
  //   .references(() => consultation.id)
  //   .notNull(),
  abdomen: text('abdomen'),
  skin: text('skin'),
  hair: text('hair'),
  valve: text('valve')
    .$type<string[]>()
    .default(sql`'[]'`),
  leftEye: text('left_eye')
    .$type<string[]>()
    .default(sql`'[]'`),
  rightEye: text('right_eye')
    .$type<string[]>()
    .default(sql`'[]'`),
  leftEar: text('left_ear')
    .$type<string[]>()
    .default(sql`'[]'`),
  rightEar: text('right_ear')
    .$type<string[]>()
    .default(sql`'[]'`),
});

export type InsertValveAndOhthalmicExam =
  typeof valveAndOphthalmicExam.$inferInsert;
export type SelectValveAndOhthalmicExam =
  typeof valveAndOphthalmicExam.$inferSelect;

// export const valveAndOphthalmicExamRelations = relations(
//   valveAndOphthalmicExam,
//   ({ one }) => {
//     return {
//       consultation: one(consultation, {
//         fields: [valveAndOphthalmicExam.consultationId],
//         references: [consultation.id],
//       }),
//     };
//   }
// );
