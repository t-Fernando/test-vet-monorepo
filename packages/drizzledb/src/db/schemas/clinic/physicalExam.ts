import { relations, sql } from 'drizzle-orm';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// import { consultation } from './';

export const physicalExam = sqliteTable('physical_exam', {
  id: text('id')
    .primaryKey()
    .$default(() => sql`uuid4()`),
  // consultationId: integer('consultation_id')
  //   .references(() => consultation.id)
  //   .notNull(),
  mentalState: text('mental_state'),
  weight: real('weight'),
  dehydration: real('dehydration'),
  mucous: text('mucous'),
  tllc: text('tllc', { enum: ['less_than_2s', 'more_than_2s'] }),
  rd: integer('rd', { mode: 'boolean' }),
  rt: integer('rt', { mode: 'boolean' }),
  ln: text('ln'),
  fr: integer('fr'),
  fc: integer('fc'),
  cp: text('cp'),
  pp: integer('pp', { mode: 'boolean' }),
  cc: integer('cc'),
  pa: text('pa'),
  pulse: text('pulse'),
  temperature: text('temperature'),
});

export type InsertPhysicalExam = typeof physicalExam.$inferInsert;
export type SelectPhysicalExam = typeof physicalExam.$inferSelect;

// export const physicalExamRelations = relations(physicalExam, ({ one }) => {
//   return {
//     consultation: one(consultation, {
//       fields: [physicalExam.consultationId],
//       references: [consultation.id],
//     }),
//   };
// });
