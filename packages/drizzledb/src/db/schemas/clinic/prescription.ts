import { relations, sql } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { consultation, user, prescriptionItem } from './';

export const prescription = sqliteTable('prescription', {
  id: text('id')
    .primaryKey()
    .$default(() => sql`uuid4()`),
  consultationId: text('consultation_id')
    .references(() => consultation.id)
    .notNull(),
  veterinarianId: text('veterinarian_id')
    .references(() => user.id)
    .notNull(),
  medicalInstructions: text('medical_instructions'),
  createdAt: text('created_at').notNull(), //Date
});

export type InsertPrescription = typeof prescription.$inferInsert;
export type SelectPrescription = typeof prescription.$inferSelect;

export const prescriptionRelations = relations(
  prescription,
  ({ many, one }) => {
    return {
      prescriptionItem: many(prescriptionItem),
      consultation: one(consultation, {
        fields: [prescription.consultationId],
        references: [consultation.id],
      }),
      user: one(user, {
        fields: [prescription.veterinarianId],
        references: [user.id],
      }),
    };
  }
);
