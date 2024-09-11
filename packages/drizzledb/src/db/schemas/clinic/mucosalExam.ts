import { relations, sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { consultation } from './';

export const mucosalExam = sqliteTable('mucosal_exam', {
  id: text('id')
    .primaryKey()
    .$default(() => sql`uuid4()`),
  consultationId: text('consultation_id')
    .references(() => consultation.id)
    .notNull(),
  trachea: text('trachea'),
  lungFields: text('lung_fields'),
  heartRate: text('heart_rate'),
  bite: text('bite'),
  pp: integer('pp', { mode: 'boolean' }),
  rd: integer('rd', { mode: 'boolean' }),
  rt: integer('rt', { mode: 'boolean' }),
  mucous: text('mucous')
    .$type<string[]>()
    .default(sql`'[]'`),
  ganglion: text('ganglion')
    .$type<string[]>()
    .default(sql`'[]'`),
});

export type InsertMucosalExam = typeof mucosalExam.$inferInsert;
export type SelectMucosalExam = typeof mucosalExam.$inferSelect;

export const mucosalExamRelations = relations(mucosalExam, ({ one }) => {
  return {
    consultation: one(consultation, {
      fields: [mucosalExam.consultationId],
      references: [consultation.id],
    }),
  };
});
