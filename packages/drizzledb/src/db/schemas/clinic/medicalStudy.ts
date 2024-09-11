import { relations, sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { provider, consultation, medicalFile } from './';

export const medicalStudy = sqliteTable('medical_study', {
  id: text('id')
    .primaryKey()
    .$default(() => sql`uuid4()`),
  providerId: text('provider_id')
    .references(() => provider.id)
    .notNull(),
  consultationId: text('consultation_id')
    .references(() => consultation.id)
    .notNull(),
  diagnosis: text('diagnosis'),
  studyDate: text('study_date').default(sql`(current_timestamp)`), //Date
  generalState: text('general_state', {
    enum: ['very_good', 'regular', 'bad'],
  }),
});

export type InsertMedicalStudy = typeof medicalStudy.$inferInsert;
export type SelectMedicalStudy = typeof medicalStudy.$inferSelect;

export const medicalStudyRelations = relations(
  medicalStudy,
  ({ many, one }) => {
    return {
      medicalFile: many(medicalFile),
      provider: one(provider, {
        fields: [medicalStudy.providerId],
        references: [provider.id],
      }),
      consultation: one(consultation, {
        fields: [medicalStudy.consultationId],
        references: [consultation.id],
      }),
    };
  }
);
