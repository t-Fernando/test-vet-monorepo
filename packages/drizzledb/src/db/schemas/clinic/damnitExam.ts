import { relations, sql } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { consultation } from './';

export const damnitExam = sqliteTable('damnit_exam', {
  id: text('id')
    .primaryKey()
    .$default(() => sql`uuid4()`),
  consultationId: text('consultation_id')
    .references(() => consultation.id)
    .notNull(),
  degenerativeDisorders: text('degenerative_disorders'),
  eatingDisorders: text('eating_disorders'),
  metabolicDisorders: text('metabolic_disorders'),
  neoplasticDisorders: text('neoplastic_disorders'),
  infectiousDiseases: text('infectious_diseases'),
  traumaticConditions: text('traumatic_conditions'),
});

export type InsertDamnitExam = typeof damnitExam.$inferInsert;
export type SelectDamnitExam = typeof damnitExam.$inferSelect;

export const damnitExamRelations = relations(damnitExam, ({ one }) => {
  return {
    consultation: one(consultation, {
      fields: [damnitExam.consultationId],
      references: [consultation.id],
    }),
  };
});
